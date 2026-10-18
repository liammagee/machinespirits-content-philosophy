"use strict";
// Response board: students answer a prompt ("What is academic literature?"). Each answer is a node;
// words that two or more answers share become theme hubs, so the class's ideas cluster as they arrive.
// One board serves every lecture: each prompt has its own link (#prompt-id).
(() => {
  const { $, el, svg } = Board;
  const DEFAULT_PROMPT = "what-is-academic-literature";
  const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 48);
  const state = { prompts: new Map(), answers: new Map(), seen: null, current: null };
  const sim = { answers: new Map(), timer: null };
  let db = null, uid = null, caps = null;

  // ------------------------------------------------------------ themes from shared words
  const STOP = new Set(("a about above after again against all also am an and any are as at be because been before being below between both but by can could did do does doing down during each few for from further had has have having he her here hers him his how i if in into is it its itself just me more most my no nor not now of off on once only or other our out over own same she should so some such than that the their them then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours yourself "+
    "really things thing way ways lot lots kind make makes made get gets use used using also often maybe something anything everything one ones two may might must us like").split(" "));
  const stem = (w) => w.length > 4 && w.endsWith("ies") ? w.slice(0, -3) + "y" : w.length > 4 && w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is") ? w.slice(0, -1) : w;
  const words = (text) => text.toLowerCase().replace(/[^a-z\s'-]/g, " ").split(/\s+/).map((w) => w.replace(/^['-]+|['-]+$/g, "")).filter((w) => w.length > 2 && !STOP.has(w));
  function themesFor(list, question) {
    const qWords = new Set(words(question).map(stem)), df = new Map(), surface = new Map();
    for (const a of list) { const seen = new Set(); for (const w of words(a.text)) { const s = stem(w); if (qWords.has(s) || seen.has(s)) continue; seen.add(s); df.set(s, (df.get(s) || 0) + 1); const sf = surface.get(s) || new Map(); sf.set(w, (sf.get(w) || 0) + 1); surface.set(s, sf); } a.stems = seen; }
    return [...df].filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 9)
      .map(([s, c]) => ({ key: s, label: [...surface.get(s)].sort((a, b) => b[1] - a[1])[0][0], count: c }));
  }

  // ------------------------------------------------------------ current prompt
  const prompt = () => state.prompts.get(state.current) || { question: "What is academic literature?", lecture: "Lecture 1", open: true };
  function answersFor(pid) {
    const out = [];
    for (const [id, a] of state.answers) { const r = a.answers && a.answers[pid]; if (r && r.text) out.push({ id: "u:" + id, author: id, name: a.name || "Anonymous", text: r.text, at: r.at }); }
    for (const [id, a] of sim.answers) if (a.pid === pid) out.push({ id: "sim:" + id, author: id, name: a.name, text: a.text, at: a.at, simulated: true });
    return out.sort((a, b) => String(a.at).localeCompare(String(b.at)));
  }
  let themes = [], list = [];
  function rebuild() {
    const p = prompt(); list = answersFor(state.current); themes = themesFor(list, p.question);
    Board.assignColors(themes.map((t) => t.key));
    const nodes = [{ id: "center", kind: "center", key: "center", label: p.question }], links = [];
    for (const t of themes) { nodes.push({ id: "h:" + t.key, kind: "hub", key: t.key, label: t.label, color: Board.colorFor(t.key) }); links.push({ source: "h:" + t.key, target: "center", kind: "own", color: Board.colorFor(t.key) }); }
    for (const a of list) {
      const hits = themes.filter((t) => a.stems.has(t.key)).map((t) => t.key);
      nodes.push({ id: a.id, kind: "leaf", shape: "disc", size: 1.8, aid: a.id, terms: hits, weight: Math.min(3, 1 + hits.length * .5), color: hits.length ? Board.colorFor(hits[0]) : Board.theme().fg, at: a.at });
      if (hits.length) for (const k of hits) links.push({ source: a.id, target: "h:" + k, kind: "flow", color: Board.colorFor(k) });
      else links.push({ source: a.id, target: "center", kind: "flow", color: Board.theme().muted });
    }
    Board.setGraph(nodes, links);
    $("q-title").textContent = p.question; $("q-lecture").textContent = "EPOL 590 · " + (p.lecture || "Responses") + (p.open === false ? " · closed" : "");
    Board.tween($("n-answers"), list.length); Board.tween($("n-themes"), themes.length);
    $("act-respond").disabled = p.open === false; $("act-respond").textContent = p.open === false ? "Closed" : mine() ? "Edit my answer" : "Respond";
    $("empty").hidden = list.length > 0;
    renderSwitcher();
  }
  const mine = () => uid && state.answers.get(uid)?.answers?.[state.current]?.text;
  const byAnswer = (aid) => list.find((a) => a.id === aid);

  function renderSwitcher() {
    const sel = $("q-switch"), ps = [...state.prompts.entries()].sort((a, b) => (a[1].order ?? 99) - (b[1].order ?? 99) || String(a[1].createdAt).localeCompare(String(b[1].createdAt)));
    sel.hidden = ps.length < 2; if (sel.hidden) return;
    sel.replaceChildren(...ps.map(([id, q]) => { const o = el("option", (q.lecture ? q.lecture + ": " : "") + Board.trim(q.question, 60)); o.value = id; o.selected = id === state.current; return o; }));
  }
  function choose(pid) {
    if (!pid || pid === state.current) return;
    state.current = pid; state.seen = null; Board.S.filter = null; Board.select(null); Board.refreshFit();
    if (location.hash.slice(1) !== pid) history.replaceState(null, "", "#" + pid);
    rebuild();
  }

  // ------------------------------------------------------------ drawer
  function drawer(n, d, { head }) {
    if (n.kind === "leaf") {
      const a = byAnswer(n.aid); head(a.simulated ? "Response · simulated" : "Response");
      d.append(el("p", "“" + a.text + "”", "quote"), el("div", "— " + a.name + (a.at ? " · " + new Date(a.at).toLocaleDateString([], { month: "short", day: "numeric" }) : ""), "meta"));
      if (n.terms.length) { const tags = el("div", "", "tags"); for (const k of n.terms) tags.append(chip(k)); d.append(tags); }
      else d.append(el("p", "No theme yet. It joins one when another answer shares a word with it.", "note"));
    } else if (n.kind === "hub") {
      const t = themes.find((x) => x.key === n.key); head("Theme"); d.append(el("h2", t.label), el("div", t.count + " answers use this word", "meta"));
      const ul = el("ul"); ul.style.cssText = "margin:0;padding-left:18px;display:flex;flex-direction:column;gap:8px;font-size:14px;line-height:1.45";
      for (const a of list.filter((x) => x.stems.has(n.key)).slice(0, 12)) { const li = el("li"), link = el("a", Board.trim(a.text, 120)); link.href = "#"; link.onclick = (e) => { e.preventDefault(); const an = Board.byId(a.id); if (an) { Board.select(an); Board.fly(an); } }; li.append(link, el("span", " — " + a.name, "note")); ul.append(li); }
      d.append(ul);
    } else {
      const p = prompt(); head(p.lecture || "Prompt"); d.append(el("h2", p.question), el("div", list.length + (list.length === 1 ? " response" : " responses") + " · " + themes.length + " themes" + (p.open === false ? " · closed" : ""), "meta"));
      d.append(el("p", "Themes are words that two or more answers share. Common words and words from the question are left out.", "note"));
      if (caps && caps.canEdit && db && state.prompts.has(state.current)) {
        const row = el("div", "", "row"), b = el("button", p.open === false ? "Reopen responses" : "Close responses", "ghost"); b.type = "button";
        b.onclick = async () => { await db.doc("prompts/" + state.current).update({ open: p.open === false }); Board.toast(p.open === false ? "Responses reopened" : "Responses closed"); Board.select(null); };
        row.append(b); d.append(row);
      }
    }
  }
  function chip(key) { const t = themes.find((x) => x.key === key); const c = el("span", t ? t.label : key, "chip"); c.style.setProperty("--c", Board.colorFor(key)); return c; }

  // ------------------------------------------------------------ popovers: respond, new prompt
  function popShell(title) {
    const pop = $("pop"); pop.replaceChildren(); pop.hidden = false;
    const head = el("div", "", "pophead"), close = el("button", "", "icon"); close.type = "button"; close.innerHTML = svg("close"); close.setAttribute("aria-label", "Close"); close.title = "Close"; close.onclick = () => { pop.hidden = true; };
    head.append(el("div", title, "eyebrow"), close); pop.append(head); return pop;
  }
  function field(f, id, text, small, tag = "input") { const l = el("label"); l.htmlFor = id; l.append(text); if (small) l.append(el("small", small)); const i = el(tag); i.id = id; f.append(l, i); return i; }
  function openRespond() {
    const p = prompt(); if (p.open === false) return;
    const pop = popShell(mine() ? "Edit your answer" : "Respond");
    pop.append(el("h2", p.question)); pop.lastChild.style.cssText = "margin:0;font:600 19px/1.25 var(--body)";
    const f = el("form"); f.autocomplete = "off";
    const text = field(f, "r-text", "Your answer", "A sentence or two. Up to 400 characters.", "textarea"); text.maxLength = 400; text.required = true; text.rows = 4;
    const name = field(f, "r-name", "Name to show", "Optional. Leave blank to appear as Anonymous."); name.maxLength = 40;
    const me = uid && state.answers.get(uid); if (me) { name.value = me.name && me.name !== "Anonymous" ? me.name : ""; text.value = me.answers?.[state.current]?.text || ""; }
    const save = el("button", mine() ? "Update my answer" : "Add my answer"); save.type = "submit"; const msg = el("p", "", "note"); msg.setAttribute("role", "status");
    f.append(save, msg); pop.append(f);
    f.onsubmit = async (e) => {
      e.preventDefault(); const t = text.value.trim().slice(0, 400); if (t.length < 3) { msg.textContent = "Write a sentence or two first."; msg.className = "note warn"; return; }
      const entry = { name: name.value.trim().slice(0, 40) || "Anonymous", text: t, at: new Date().toISOString() };
      if (!db || !uid) { sim.answers.set("local", { pid: state.current, name: entry.name, text: t, at: entry.at }); rebuild(); pop.hidden = true; Board.toast("Added in this browser only"); return; }
      save.disabled = true;
      try {
        const ref = db.doc("answers/" + uid), s = await ref.get();
        const body = { name: entry.name, answers: { [state.current]: { text: t, at: entry.at } }, updatedAt: entry.at };
        if (s.exists) await ref.update(body); else await ref.set(body);
        pop.hidden = true; Board.toast("Answer added");
        setTimeout(() => { const n = Board.byId("u:" + uid); if (n) { Board.select(n); Board.fly(n); } }, 900);
      } catch { msg.textContent = "Could not save. Check your connection and try again."; msg.className = "note warn"; }
      finally { save.disabled = false; }
    };
    setTimeout(() => text.focus(), 0);
  }
  function openNewPrompt() {
    const pop = popShell("New prompt"), f = el("form"); f.autocomplete = "off";
    const q = field(f, "p-q", "Question", "What students will answer.", "textarea"); q.maxLength = 160; q.required = true; q.rows = 2;
    const lec = field(f, "p-lec", "Lecture", "Shown above the question, for example Lecture 3."); lec.maxLength = 40;
    const save = el("button", "Create and open"); save.type = "submit"; const msg = el("p", "", "note"); f.append(save, msg); pop.append(f);
    f.onsubmit = async (e) => {
      e.preventDefault(); const question = q.value.trim(); if (!question) return;
      let id = slug(question) || "prompt"; while (state.prompts.has(id)) id += "-2";
      const body = { question, lecture: lec.value.trim(), open: true, order: state.prompts.size + 1, createdAt: new Date().toISOString() };
      if (!db) { state.prompts.set(id, body); pop.hidden = true; choose(id); return; }
      save.disabled = true;
      try { await db.doc("prompts/" + id).set(body); pop.hidden = true; Board.toast("Prompt created. Copy its link from the header."); choose(id); }
      catch { msg.textContent = "Only the board's editors can add prompts."; msg.className = "note warn"; }
      finally { save.disabled = false; }
    };
    setTimeout(() => q.focus(), 0);
  }

  // ------------------------------------------------------------ simulation (owner only, this browser only)
  const SIM = ["Peer-reviewed research that builds on what others have argued before.", "Journal articles and books written by researchers for other researchers.",
    "The ongoing conversation in a field, written down and cited.", "Published research that has been reviewed by other experts.", "Books, articles and theses that make an argument with evidence and citations.",
    "Writing that enters a scholarly conversation and responds to other research.", "Research articles in journals, mostly behind paywalls.", "Evidence and arguments that a field treats as credible, usually peer-reviewed.",
    "The record of what a discipline knows and argues about.", "Scholarly writing that uses citations to show where its ideas come from.", "Texts written for an academic audience, with a method and a review of other research.",
    "Anything a field cites: articles, books, conference papers, sometimes reports.", "Research that has been through peer review and published in journals or books.", "A conversation between researchers across time, carried by citations."];
  function startSim() {
    stopSim(); Board.refreshFit(); let i = sim.answers.size;
    const step = () => { if (i >= SIM.length) { sim.timer = null; return; } const id = "s" + i; sim.answers.set(id, { pid: state.current, name: "Student " + String(i + 1).padStart(2, "0") + " (simulated)", text: SIM[i], at: new Date().toISOString() }); Board.S.bloom.set("sim:" + id, performance.now()); i++; rebuild(); sim.timer = setTimeout(step, 1300 + Math.random() * 900); };
    step();
  }
  function stopSim() { clearTimeout(sim.timer); sim.timer = null; }
  function clearSim() { stopSim(); sim.answers.clear(); rebuild(); }

  // ------------------------------------------------------------ boot
  state.current = location.hash.slice(1) || DEFAULT_PROMPT;
  addEventListener("hashchange", () => choose(location.hash.slice(1)));
  $("act-respond").onclick = openRespond;
  $("act-link").onclick = () => Board.copyLink(state.current);
  $("q-switch").onchange = (e) => choose(e.target.value);
  Board.init({
    slug: "responses", shareUrl: (window.BOARD_CONFIG || {}).shareUrl, shareHash: () => state.current,
    rebuild,
    legend: () => themes.map((t) => ({ key: t.key, label: t.label + " · " + t.count, color: Board.colorFor(t.key) })),
    tipText: (n) => { if (n.kind === "leaf") { const a = byAnswer(n.aid); return a ? Board.trim(a.text, 110) + " — " + a.name : ""; } if (n.kind === "hub") { const t = themes.find((x) => x.key === n.key); return t ? t.label + " · " + t.count + " answers" : ""; } return prompt().question; },
    captionFor: (n) => { if (n.kind === "leaf") { const a = byAnswer(n.aid); return ["Response · " + a.name, "“" + Board.trim(a.text, 160) + "”"]; } if (n.kind === "hub") return ["Theme", n.label]; return [prompt().lecture || "Prompt", prompt().question]; },
    tourStops: (nodes) => { const out = [nodes.find((n) => n.kind === "center")].filter(Boolean); for (const h of nodes.filter((n) => n.kind === "hub")) { out.push(h); out.push(...nodes.filter((n) => n.kind === "leaf" && n.terms[0] === h.key).slice(0, 2)); } if (out.length < 3) out.push(...nodes.filter((n) => n.kind === "leaf").slice(0, 6)); return out; },
    drawer,
    isBusy: () => false,
    snapshotEyebrow: () => "EPOL 590 · " + (prompt().lecture || "Responses") + " · " + new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }),
    snapshotTitle: () => prompt().question + "  (" + list.length + " responses)",
    csvRows: () => [["prompt", "name", "response", "themes", "submitted"]].concat(list.filter((a) => !a.simulated).map((a) => [prompt().question, a.name, a.text, themes.filter((t) => a.stems.has(t.key)).map((t) => t.label).join("; "), a.at])),
    viewExtra: () => ({ prompt: state.current }), applyViewExtra: (x) => x && x.prompt && choose(x.prompt),
    moreItems: () => [
      { label: "Replay arrivals", run: Board.replay },
      { label: "New prompt…", run: openNewPrompt, show: () => caps && caps.canEdit },
      { label: sim.timer ? "Stop simulation" : "Simulate class responses", run: () => sim.timer ? stopSim() : startSim(), show: () => caps && caps.isOwner },
      { label: "Clear simulation", run: clearSim, show: () => sim.answers.size > 0 },
    ],
  }).then((c) => {
    caps = c; db = c.db; uid = c.uid;
    if (!db) { state.prompts.set(DEFAULT_PROMPT, { question: "What is academic literature?", lecture: "Lecture 1", open: true, order: 1 }); Board.setStatus("waiting", "Offline copy: answers stay in this browser"); rebuild(); return; }
    Board.setStatus("waiting", "Connected");
    db.collection("prompts").onSnapshot((snap) => {
      state.prompts = new Map(snap.docs.map((d) => [d.id, d.data()]));
      if (!state.prompts.has(state.current) && state.prompts.size) state.current = state.prompts.has(DEFAULT_PROMPT) ? DEFAULT_PROMPT : [...state.prompts.keys()][0];
      rebuild();
    });
    db.collection("answers").onSnapshot((snap) => {
      state.answers = new Map(snap.docs.map((d) => [d.id, d.data()]));
      const keys = new Set(); for (const [id, a] of state.answers) for (const pid of Object.keys(a.answers || {})) keys.add(id + "|" + pid);
      if (state.seen) { let k = 0; for (const key of keys) if (!state.seen.has(key)) { const [id, pid] = key.split("|"); if (pid === state.current) Board.S.bloom.set("u:" + id, performance.now() + k++ * 280); } if (k) Board.flash("+" + k + (k === 1 ? " new response" : " new responses")); }
      else { let k = 0; for (const key of keys) { const [id, pid] = key.split("|"); if (pid === state.current) Board.S.bloom.set("u:" + id, performance.now() + 800 + k++ * 220); } }
      state.seen = keys; Board.setStatus("live", "Live · responses appear as they arrive"); rebuild();
    }, () => Board.setStatus("waiting", "Lost the connection. Reload to reconnect."));
  });
  rebuild();
})();
