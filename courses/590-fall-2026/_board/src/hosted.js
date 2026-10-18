// Hosted shim (machinespirits.org only; build.py --hosted). The boards were written against the claude.ai
// artifact runtime: window.claude.use("db" | "user" | "downloads"). This provides the same calls over the
// site's /api/boards store, polling for changes instead of holding a live connection.
//
// Keys travel in the URL once and then live in this browser: ?k=<class key> (kept in the address so
// Copy link carries it) and ?admin=<instructor key> (removed from the address straight away).
(() => {
  const CFG = window.BOARD_CONFIG || {};
  const API = "/api/boards/" + CFG.board;
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  const url = new URL(location.href);
  if (url.searchParams.get("k")) ls.set("epol590-class-key", url.searchParams.get("k"));
  if (url.searchParams.get("admin")) { ls.set("epol590-admin-key", url.searchParams.get("admin")); url.searchParams.delete("admin"); }
  const classKey = ls.get("epol590-class-key") || "";
  if (classKey) url.searchParams.set("k", classKey);
  history.replaceState(null, "", url);

  let token = ls.get("epol590-board-token");
  if (!token) {
    token = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, "0")).join("");
    ls.set("epol590-board-token", token);
  }
  const adminKey = ls.get("epol590-admin-key") || "";

  async function req(method, path, body) {
    const headers = { "X-Board-Token": token };
    if (classKey) headers["X-Class-Key"] = classKey;
    if (adminKey) headers["X-Admin-Key"] = adminKey;
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const r = await fetch(API + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const err = new Error(j.error || "HTTP " + r.status); err.code = j.error; err.status = r.status;
      if (j.error === "class_key_required") askKey();
      throw err;
    }
    return j;
  }

  // ------------------------------------------------------------ class key prompt
  let asked = false;
  function askKey() {
    if (asked) return; asked = true;
    const box = document.createElement("form");
    box.className = "panel keygate";
    box.innerHTML = '<div class="eyebrow">EPOL 590</div><h2>Enter the class key</h2><p class="note">It is in the Zoom chat and on Canvas. You only need it once in this browser.</p>';
    const input = document.createElement("input"); input.autocomplete = "off"; input.required = true; input.setAttribute("aria-label", "Class key");
    const go = document.createElement("button"); go.type = "submit"; go.textContent = "Open the board";
    box.append(input, go);
    box.onsubmit = (e) => { e.preventDefault(); const u = new URL(location.href); u.searchParams.set("k", input.value.trim()); location.replace(u); };
    document.body.append(box); setTimeout(() => input.focus(), 0);
  }

  // ------------------------------------------------------------ polling cache
  const cache = new Map(); // "coll/id" -> data
  const subs = new Set();
  let seq = 0, primed = false, timer = null, inflight = false, again = false, failures = 0;
  const collOf = (p) => p.split("/")[0];

  async function poll() {
    if (inflight) { again = true; return; }
    inflight = true; clearTimeout(timer);
    let changed = null;
    try {
      const j = await req("GET", "/changes?since=" + seq);
      if (j.seq < seq) { cache.clear(); seq = 0; primed = false; inflight = false; return poll(); } // the store was reset
      for (const p of j.deleted) cache.delete(p);
      for (const d of j.docs) cache.set(d.path, d.data);
      const recovered = failures >= 3;
      changed = !primed || recovered ? null : new Set([...j.docs, ...j.deleted.map((path) => ({ path }))].map((d) => collOf(d.path)));
      seq = j.seq; primed = true; failures = 0;
    } catch (err) {
      failures++;
      if (failures === 3) for (const s of subs) s.fail && s.fail(err);
      changed = false;
    }
    inflight = false;
    if (changed !== false) for (const s of subs) if (!changed || changed.has(s.coll)) s.emit();
    if (again) { again = false; return poll(); }
    timer = setTimeout(poll, document.hidden ? 30000 : 4000);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && primed) poll(); });
  const kick = () => setTimeout(poll, 150);

  function snapshot(q) {
    let rows = [...cache.entries()].filter(([p]) => collOf(p) === q.coll).map(([p, data]) => ({ id: p.slice(q.coll.length + 1), data }));
    if (q.order) { const [f, dir] = q.order; rows.sort((a, b) => String(a.data[f] ?? "").localeCompare(String(b.data[f] ?? "")) * (dir === "desc" ? -1 : 1)); }
    if (q.limit) rows = rows.slice(0, q.limit);
    const docs = rows.map((r) => ({ id: r.id, exists: true, data: () => r.data }));
    return { docs, size: docs.length, empty: !docs.length };
  }

  function query(q) {
    return {
      orderBy: (field, dir = "asc") => query({ ...q, order: [field, dir] }),
      limit: (n) => query({ ...q, limit: n }),
      async get() { if (!primed) await poll(); return snapshot(q); },
      onSnapshot(next, fail) {
        const sub = { coll: q.coll, emit: () => next(snapshot(q)), fail };
        subs.add(sub);
        if (primed) setTimeout(sub.emit, 0); else if (!timer && !inflight) poll();
        return () => subs.delete(sub);
      },
    };
  }

  const docSnap = (id, j) => ({ id, exists: Boolean(j.exists), data: () => j.data });
  function doc(path) {
    const priv = path.match(/^data\/users\/[^/]+\/([A-Za-z0-9_-]+)$/);
    const id = path.split("/").pop();
    if (priv) {
      const at = "/private/" + priv[1];
      return {
        id,
        get: async () => docSnap(id, await req("GET", at)),
        set: (d) => req("PUT", at, d),
        update: async (d) => { const cur = await req("GET", at); return req("PUT", at, { ...(cur.data || {}), ...d }); },
      };
    }
    const at = "/doc/" + path;
    return {
      id,
      get: async () => docSnap(id, await req("GET", at)),
      set: async (d) => { await req("PUT", at, d); kick(); },
      update: async (d) => { await req("PUT", at + "?merge=1", d); kick(); },
      delete: async () => { await req("DELETE", at); kick(); },
      acquire: async () => ({ acquired: false }), // the server runs the literature worker
    };
  }

  const db = { doc, collection: (coll) => query({ coll }) };
  let me = null;
  const who = () => (me ||= req("GET", "/me").catch(() => ({ uid: null, admin: false })));
  const user = { id: async () => (await who()).uid, isOwner: async () => (await who()).admin, canEdit: async () => (await who()).admin };

  window.claude = { use: async (name) => (name === "db" ? db : name === "user" ? user : null) };
})();
