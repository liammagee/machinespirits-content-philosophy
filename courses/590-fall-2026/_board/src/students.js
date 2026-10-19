"use strict";
// Class constellation: students add interests and a research topic; OpenAlex papers gather around each interest.
(() => {
  const { $, el, extLink, svg } = Board;
  const COURSE_KEY = "ai-and-academic-literature", COURSE_LABEL = "AI and academic literature";
  const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 60);
  const state = { terms: new Map(), searching: new Map(), seenPapers: null };
  const real = { students: new Map(), papers: new Map() };
  const sim = { students: new Map(), papers: new Map(), timer: null };
  const students = () => new Map([...real.students, ...sim.students]);
  const papers = () => new Map([...real.papers, ...sim.papers]);
  let db = null, uid = null, liveSearch = "unknown";
  const HOSTED = Boolean((window.BOARD_CONFIG || {}).hosted); // machinespirits.org: the server searches OpenAlex and files terms
  const tabId = Math.random().toString(36).slice(2);

  const labelFor = (key) => { if (key === COURSE_KEY) return COURSE_LABEL; for (const s of students().values()) for (const t of s.terms) if (t.key === key) return t.label; return state.terms.get(key)?.label || key; };
  function isSearching(key) { const v = state.searching.get(key) || Date.parse(state.terms.get(key)?.searchingAt || "") || 0; const d = Date.now() - v; return d >= 0 && d < 25000; }

  // ------------------------------------------------------------ graph
  let liveTerms = new Map();
  function rebuild() {
    const S = students(), P = papers();
    liveTerms = new Map([[COURSE_KEY, { label: COURSE_LABEL, kind: "course" }]]);
    for (const s of S.values()) for (const t of s.terms) liveTerms.set(t.key, { label: t.label, kind: t.kind });
    Board.assignColors([...liveTerms.keys()].filter((k) => k !== COURSE_KEY));
    const color = (k) => k === COURSE_KEY ? Board.theme().fg : Board.colorFor(k);
    const nodes = [], links = [];
    for (const [key, t] of liveTerms) nodes.push(key === COURSE_KEY ? { id: "center", kind: "center", key, label: t.label } : { id: "h:" + key, kind: "hub", key, label: t.label, italic: t.kind === "topic", color: color(key) });
    const hubId = (k) => k === COURSE_KEY ? "center" : "h:" + k;
    for (const [id, s] of S) {
      nodes.push({ id: "s:" + id, kind: "person", label: s.name, sid: id, terms: s.terms.map((t) => t.key) });
      for (const t of s.terms) links.push({ source: "s:" + id, target: hubId(t.key), kind: "own", color: color(t.key) });
    }
    for (const [id, p] of P) {
      const terms = (p.terms || []).filter((k) => liveTerms.has(k)); if (!terms.length) continue;
      nodes.push({ id: "p:" + id, kind: "leaf", pid: id, terms, weight: terms.length, color: color(terms[0]), at: p.addedAt });
      for (const k of terms) links.push({ source: "p:" + id, target: hubId(k), kind: "flow", color: color(k) });
    }
    Board.setGraph(nodes, links);
    Board.tween($("n-students"), S.size); Board.tween($("n-terms"), liveTerms.size - 1); Board.tween($("n-papers"), nodes.filter((n) => n.kind === "leaf").length);
    $("empty").hidden = S.size > 0;
  }

  // ------------------------------------------------------------ drawer content
  function drawer(n, d, { head }) {
    const P = papers(), S = students();
    if (n.kind === "leaf") {
      const p = P.get(n.pid); head(p.simulated ? "Paper · simulated" : "Paper");
      d.append(el("h2", p.title));
      if (p.authors) d.append(el("div", p.authors, "meta"));
      const vy = [p.venue, p.year].filter(Boolean).join(" · "); if (vy) d.append(el("div", vy, "meta"));
      const tags = el("div", "", "tags"); for (const k of n.terms) tags.append(chip(k)); d.append(tags);
      if (p.abstract) {
        const ab = el("p", p.abstract, "abstract clamp"); d.append(el("div", "Abstract", "eyebrow"), ab);
        if (p.abstract.length > 460) { const more = el("button", "Show full abstract", "ghost"); more.type = "button"; more.style.alignSelf = "flex-start"; more.onclick = () => { more.textContent = ab.classList.toggle("clamp") ? "Show full abstract" : "Show less"; }; d.append(more); }
      } else d.append(el("p", p.simulated ? "Simulated papers have no abstract." : "OpenAlex has no abstract for this paper.", "note"));
      const links = el("div", "", "row"), doi = /^https:\/\/doi\.org\//.test(p.doi || "") ? p.doi : "";
      if (/^https?:\/\//.test(p.oaUrl || "")) links.append(extLink("Read the full article", p.oaUrl, "cta"));
      if (doi) links.append(extLink(p.oaUrl ? "Publisher page" : "Read the full article", doi, p.oaUrl ? "cta alt" : "cta"));
      if (/^https:\/\/openalex\.org\//.test(p.url || "")) links.append(extLink("OpenAlex", p.url, "cta alt"));
      if (links.childElementCount) d.append(links);
      d.append(el("p", p.simulated ? "Part of a simulation, not a real source." : (doi && !p.oaUrl ? "The publisher page may need your library login. " : "") + "Found by searching OpenAlex for the linked interests; check it before citing.", "note"));
    } else if (n.kind === "person") {
      const s = S.get(n.sid); head("Student"); d.append(el("h2", s.name));
      const topic = s.terms.find((t) => t.kind === "topic"); if (topic) d.append(el("p", topic.label, "quote"));
      const tags = el("div", "", "tags"); for (const t of s.terms) if (t.kind === "interest") tags.append(chip(t.key)); d.append(tags);
    } else {
      const list = [...P.entries()].filter(([, p]) => (p.terms || []).includes(n.key));
      const people = [...S.values()].filter((s) => s.terms.some((t) => t.key === n.key)).map((s) => s.name);
      head(n.kind === "center" ? "Course" : n.italic ? "Research topic" : "Interest"); d.append(el("h2", n.label));
      if (people.length) d.append(el("div", people.join(", "), "meta"));
      const ul = el("ul"); ul.style.cssText = "margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;font-size:14px;line-height:1.4";
      for (const [pid, p] of list.slice(0, 15)) { const li = el("li"), a = el("a", p.title + (p.year ? " (" + p.year + ")" : "")); a.href = "#"; a.onclick = (e) => { e.preventDefault(); const pn = Board.byId("p:" + pid); if (pn) { Board.select(pn); Board.fly(pn); } }; li.append(a); ul.append(li); }
      d.append(list.length ? ul : el("p", "No papers yet. Each new interest is searched within a few minutes.", "note"));
    }
  }
  function chip(key) { const c = el("span", Board.trim(labelFor(key), 30), "chip"); c.style.setProperty("--c", key === COURSE_KEY ? Board.theme().fg : Board.colorFor(key)); return c; }

  // ------------------------------------------------------------ join form (opens on demand)
  function openJoin() {
    const pop = $("pop"); pop.replaceChildren(); pop.hidden = false;
    const head = el("div", "", "pophead"), close = el("button", "", "icon"); close.type = "button"; close.innerHTML = svg("close"); close.setAttribute("aria-label", "Close"); close.title = "Close"; close.onclick = () => { pop.hidden = true; };
    const mine = uid && real.students.get(uid);
    head.append(el("div", mine ? "Edit your entry" : "Join the constellation", "eyebrow"), close); pop.append(head);
    const f = el("form"); f.autocomplete = "off";
    const field = (id, text, small, tag = "input") => { const l = el("label"); l.htmlFor = id; l.append(text); if (small) l.append(el("small", small)); const i = el(tag); i.id = id; f.append(l, i); return i; };
    const name = field("me-name", "Your name"); name.maxLength = 60; name.required = true;
    const ints = field("me-interests", "Interests", "Up to five, separated by commas. For example: higher education policy, AI literacy"); ints.maxLength = 240; ints.required = true;
    const topic = field("me-topic", "Sample research topic", "One sentence. It becomes its own node.", "textarea"); topic.maxLength = 200; topic.required = true;
    if (mine) { name.value = mine.name; ints.value = mine.terms.filter((t) => t.kind === "interest").map((t) => t.label).join(", "); topic.value = mine.terms.find((t) => t.kind === "topic")?.label || ""; }
    const save = el("button", mine ? "Update my entry" : "Add me to the map"); save.type = "submit"; save.id = "me-save";
    const msg = el("p", "", "note"); msg.setAttribute("role", "status"); f.append(save, msg); pop.append(f);
    f.onsubmit = async (e) => {
      e.preventDefault(); msg.className = "note";
      const interests = [...new Set(ints.value.split(",").map((x) => x.trim()).filter(Boolean))].slice(0, 5).map((x) => x.slice(0, 48));
      const terms = interests.map((label) => ({ key: slug(label), label, kind: "interest" })).filter((t) => t.key);
      if (topic.value.trim()) terms.push({ key: "topic-" + slug(topic.value).slice(0, 50), label: topic.value.trim().slice(0, 200), kind: "topic" });
      if (!name.value.trim() || terms.length < 2) { msg.textContent = "Add your name, at least one interest and a topic."; msg.className = "note warn"; return; }
      const entry = { name: name.value.trim().slice(0, 60), terms, updatedAt: new Date().toISOString() };
      if (!db || !uid) { real.students.set("local", entry); rebuild(); pop.hidden = true; Board.toast("Added in this browser only"); return; }
      save.disabled = true;
      try {
        await db.doc("students/" + uid).set(entry);
        if (!HOSTED) for (const t of terms) { const ref = db.doc("terms/" + t.key); const s = await ref.get(); if (!s.exists) await ref.set({ label: t.label, kind: t.kind, fetchedAt: "" }); }
        Board.toast("You're on the map"); pop.hidden = true;
        setTimeout(() => { const me = Board.byId("s:" + uid); if (me) { Board.select(me); Board.fly(me); } }, 900);
      } catch (err) { msg.textContent = err && err.code === "quota_exceeded" ? "The board is full. Ask your instructor to clear old papers." : "Could not save. Check your connection and try again."; msg.className = "note warn"; }
      finally { save.disabled = false; }
    };
    setTimeout(() => name.focus(), 0);
  }

  // ------------------------------------------------------------ literature worker (OpenAlex)
  // One open tab at a time searches (a short lease on meta/worker). Inside claude.ai the page cannot reach
  // OpenAlex, so the search reports "blocked" and papers arrive from the class worker instead.
  const workerSrc = `function unInvert(idx) { if (!idx) return ""; const w = []; for (const [k, ps] of Object.entries(idx)) for (const i of ps) w[i] = k; return w.filter(Boolean).join(" "); }
self.onmessage = async (e) => {
  const { key, query, since } = e.data;
  const url = "https://api.openalex.org/works?search=" + encodeURIComponent(query) + "&filter=from_publication_date:" + since + ",type:article&sort=relevance_score:desc&per-page=5&select=id,title,publication_year,doi,authorships,primary_location,abstract_inverted_index,open_access,best_oa_location";
  try {
    const r = await fetch(url); if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    const works = (j.results || []).filter((w) => w.title).map((w) => ({ id: w.id.split("/").pop(), title: w.title, year: w.publication_year || null, doi: w.doi || "", url: w.id,
      venue: (w.primary_location && w.primary_location.source && w.primary_location.source.display_name) || "",
      authors: (w.authorships || []).slice(0, 8).map((a) => a.author && a.author.display_name).filter(Boolean).join(", ") + ((w.authorships || []).length > 8 ? " et al." : ""),
      abstract: unInvert(w.abstract_inverted_index).slice(0, 4000),
      oaUrl: (w.best_oa_location && (w.best_oa_location.landing_page_url || w.best_oa_location.pdf_url)) || (w.open_access && w.open_access.oa_url) || "" }));
    self.postMessage({ key, works });
  } catch (err) { self.postMessage({ key, error: String(err && err.message || err) }); }
};`;
  let litWorker = null;
  function startWorker() {
    try { litWorker = new Worker(URL.createObjectURL(new Blob([workerSrc], { type: "text/javascript" }))); } catch { liveSearch = "blocked"; return; }
    litWorker.onmessage = async ({ data }) => {
      state.searching.delete(data.key);
      if (data.error) { liveSearch = "blocked"; await db.doc("terms/" + data.key).update({ searchingAt: "" }).catch(() => {}); Board.setStatus("waiting", "Papers arrive from the class worker"); return; }
      liveSearch = "live"; const now = new Date().toISOString();
      for (const w of data.works) { const ref = db.doc("papers/" + w.id), s = await ref.get(); const terms = [...new Set([...(s.exists ? s.data().terms || [] : []), data.key])]; await ref.set({ ...w, terms, addedAt: s.exists ? s.data().addedAt : now }); }
      await db.doc("terms/" + data.key).update({ fetchedAt: now, searchingAt: "" }).catch(() => {});
      Board.setStatus("live", "Searching OpenAlex every two minutes");
    };
  }
  async function workerTick() {
    if (!db || liveSearch === "blocked") return;
    const lease = await db.doc("meta/worker").acquire({ holder: tabId, ttlMs: 90000 }).catch(() => ({ acquired: false })); if (!lease.acquired) return;
    const stale = Date.now() - 6 * 3600e3, since = new Date(Date.now() - 2 * 365 * 864e5).toISOString().slice(0, 10);
    for (const [key, t] of [...state.terms.entries()].filter(([, t]) => !t.fetchedAt || Date.parse(t.fetchedAt) < stale).slice(0, 3)) {
      state.searching.set(key, Date.now()); db.doc("terms/" + key).update({ searchingAt: new Date().toISOString() }).catch(() => {});
      litWorker && litWorker.postMessage({ key, query: t.label.replace(/[?*]/g, " ").trim(), since }); // OpenAlex reads ? and * as wildcards
    }
  }

  // ------------------------------------------------------------ simulation (owner only, this browser only)
  const SIM_INTERESTS = ["AI literacy", "higher education policy", "teacher education", "academic integrity", "learning analytics", "educational equity", "writing pedagogy", "assessment design", "online learning", "research methods", "science communication", "language learners", "STEM education", "educational leadership", "data ethics", "community colleges"];
  const SIM_TOPICS = ["How do %a and %b shape graduate students' research practice?", "What does %a look like in %b after generative AI?", "Where do studies of %a and %b disagree, and why?", "How is %a framed in recent %b research?"];
  function simJoinOne() {
    const n = sim.students.size + 1, pick = [...SIM_INTERESTS].sort(() => Math.random() - .5).slice(0, 2 + Math.floor(Math.random() * 2));
    const shared = [...new Set([...sim.students.values()].flatMap((s) => s.terms.filter((t) => t.kind === "interest").map((t) => t.label)))];
    if (shared.length && Math.random() < .7) pick[0] = shared[Math.floor(Math.random() * shared.length)];
    const interests = [...new Set(pick)], topic = SIM_TOPICS[n % SIM_TOPICS.length].replace("%a", interests[0]).replace("%b", interests[1] || "higher education");
    const terms = interests.map((label) => ({ key: slug(label), label, kind: "interest" })); terms.push({ key: "topic-sim-" + n, label: topic, kind: "topic" });
    const id = "sim-" + n; sim.students.set(id, { name: "Student " + String(n).padStart(2, "0") + " (simulated)", terms }); Board.S.bloom.set("s:" + id, performance.now()); rebuild();
    terms.forEach((t, j) => {
      setTimeout(() => state.searching.set(t.key, Date.now()), 500 + j * 300);
      setTimeout(() => {
        const k = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < k; i++) { const pid = "sim-" + n + "-" + j + "-" + i; sim.papers.set(pid, { title: "Simulated paper on " + t.label, year: 2025 + (i % 2), venue: "Simulation only", terms: [t.key], addedAt: new Date().toISOString(), simulated: true }); Board.S.bloom.set("p:" + pid, performance.now() + i * 280); }
        state.searching.delete(t.key); Board.flash("+" + k + " papers on “" + t.label + "” (simulated)"); rebuild();
      }, 2600 + j * 900 + Math.random() * 900);
    });
  }
  function startSim(count) { stopSim(); Board.refreshFit(); let left = count; const step = () => { if (left-- <= 0) { sim.timer = null; return; } simJoinOne(); sim.timer = setTimeout(step, 1800 + Math.random() * 1200); }; step(); }
  function stopSim() { clearTimeout(sim.timer); sim.timer = null; }
  function clearSim() { stopSim(); sim.students.clear(); sim.papers.clear(); state.searching.clear(); rebuild(); }

  // ------------------------------------------------------------ boot
  $("act-join").onclick = openJoin;
  $("act-link").onclick = () => Board.copyLink();
  Board.init({
    slug: "class-constellation", shareUrl: (window.BOARD_CONFIG || {}).shareUrl,
    rebuild,
    legend: () => [...liveTerms].filter(([, t]) => t.kind !== "topic").map(([key, t]) => ({ key, label: t.label, color: key === COURSE_KEY ? Board.theme().fg : Board.colorFor(key) })),
    tipText: (n) => { if (n.kind === "leaf") { const p = papers().get(n.pid); return p ? p.title + (p.year ? " (" + p.year + ")" : "") : ""; } if (n.kind === "person") return n.label; const k = [...papers().values()].filter((p) => (p.terms || []).includes(n.key)).length; return n.label + " · " + k + (k === 1 ? " paper" : " papers"); },
    captionFor: (n) => { if (n.kind === "leaf") { const p = papers().get(n.pid); return ["Paper · " + labelFor(n.terms[0]), p.title + (p.year ? " (" + p.year + ")" : "")]; } return [n.kind === "center" ? "Course" : n.kind === "person" ? "Student" : n.italic ? "Research topic" : "Interest", n.label]; },
    tourStops: (nodes) => { const hubs = nodes.filter((n) => n.kind === "center" || (n.kind === "hub" && !n.italic)).sort((a, b) => a.kind === "center" ? -1 : b.kind === "center" ? 1 : a.label.localeCompare(b.label)); const out = []; for (const h of hubs) { out.push(h); out.push(...nodes.filter((n) => n.kind === "leaf" && n.terms[0] === h.key).slice(0, 2)); } return out; },
    drawer,
    isBusy: (n) => n.key && isSearching(n.key),
    statusOverride: () => { const keys = [...new Set([...state.terms.keys(), ...liveTerms.keys()])].filter(isSearching); return keys.length ? ["live", "Searching OpenAlex for “" + labelFor(keys[0]) + "”" + (keys.length > 1 ? " and " + (keys.length - 1) + " more" : "") + "…"] : null; },
    snapshotEyebrow: () => "EPOL 590 · Class constellation · " + new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }),
    snapshotTitle: () => students().size + " students · " + (liveTerms.size - 1) + " interests · " + Board.nodes().filter((n) => n.kind === "leaf").length + " papers",
    csvRows: () => [["title", "authors", "year", "venue", "interests", "doi", "open_access_url", "openalex"]].concat([...papers().values()].filter((p) => !p.simulated).map((p) => [p.title, p.authors, p.year, p.venue, (p.terms || []).map(labelFor).join("; "), p.doi, p.oaUrl, p.url])),
    moreItems: () => [
      { label: "Replay arrivals", run: Board.replay },
      { label: sim.timer ? "Stop simulation" : "Simulate a class joining", run: () => sim.timer ? stopSim() : startSim(18), show: () => Board.caps().isOwner },
      { label: "Clear simulation", run: clearSim, show: () => sim.students.size > 0 },
    ],
  }).then((caps) => {
    db = caps.db; uid = caps.uid;
    if (!db) { Board.setStatus("waiting", "Offline copy: entries stay in this browser"); rebuild(); return; }
    Board.setStatus("waiting", "Connected");
    db.collection("students").onSnapshot((snap) => { real.students = new Map(snap.docs.map((d) => [d.id, d.data()])); $("act-join").textContent = uid && real.students.has(uid) ? "Edit my entry" : "Join"; rebuild(); },
      () => Board.setStatus("waiting", "Lost the connection. Reload to reconnect."));
    db.collection("terms").onSnapshot((snap) => { state.terms = new Map(snap.docs.map((d) => [d.id, d.data()])); rebuild(); });
    db.collection("papers").orderBy("addedAt", "desc").limit(400).onSnapshot((snap) => {
      real.papers = new Map(snap.docs.map((d) => [d.id, d.data()]));
      const now = performance.now();
      if (!state.seenPapers) [...real.papers.entries()].sort((a, b) => String(a[1].addedAt).localeCompare(String(b[1].addedAt))).forEach(([id], i) => Board.S.bloom.set("p:" + id, now + 900 + i * 240));
      else { const fresh = [...real.papers.keys()].filter((id) => !state.seenPapers.has(id)); fresh.forEach((id, i) => Board.S.bloom.set("p:" + id, now + i * 280)); if (fresh.length) Board.flash("+" + fresh.length + (fresh.length === 1 ? " paper" : " papers") + " just arrived"); }
      state.seenPapers = new Set(real.papers.keys());
      const newest = snap.docs[0]?.data()?.addedAt;
      if (newest && liveSearch !== "live") Board.setStatus(liveSearch === "blocked" ? "waiting" : "", "Papers last added " + new Date(newest).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }));
      rebuild();
    });
    if (HOSTED) { liveSearch = "server"; return; }
    startWorker(); setTimeout(workerTick, 4000); setInterval(workerTick, 120000);
  });
  rebuild();
})();
