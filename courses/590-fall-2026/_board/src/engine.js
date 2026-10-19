"use strict";
// Shared engine for the EPOL 590 boards: the 3D field, themes, the movable toolbar, focus mode,
// flythrough, saved views, PNG snapshots, CSV export, link copying and the status line.
// Each board (students.js, responses.js) supplies its data and its drawer content through Board.init().
const Board = (() => {
  const $ = (id) => document.getElementById(id);
  const el = (tag, text, cls) => { const e = document.createElement(tag); if (text != null && text !== "") e.textContent = text; if (cls) e.className = cls; return e; };
  const extLink = (text, href, cls) => { const a = el("a", text, cls); a.href = href; a.target = "_blank"; a.rel = "noopener"; return a; };
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const V3 = THREE.Vector3;

  // ------------------------------------------------------------ themes (match the Lecture 1 deck)
  const THEMES = {
    dark: { name: "dark", bg: "#15161D", fg: "#F3EEE4", muted: "#9C978C", dim: "#2A2C3A70", dust: "#9AA3C8", dustOpacity: .4, add: true, glow: 1,
      hues: ["#FF7A50", "#7F9BE8", "#4FC3B0", "#F5C542", "#FF6FA8", "#A98BFF", "#8FD16A", "#58C7F3", "#FFA94D", "#E07BE0"] },
    light: { name: "light", bg: "#F3EEE4", fg: "#15161D", muted: "#6A6670", dim: "#D5CCBC90", dust: "#A69A86", dustOpacity: .3, add: false, glow: .45,
      hues: ["#F2552C", "#2F4FA8", "#1F7A70", "#B7791F", "#C2185B", "#6B4FBB", "#3F7D2C", "#1C6EA4", "#C05621", "#8E3FA8"] },
  };
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const saved = store.get("epol590-theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  const themeName = () => document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  let theme = THEMES[themeName()] || THEMES.dark;
  let colorOf = new Map();
  function assignColors(keys) { const h = theme.hues; colorOf = new Map([...keys].sort().map((k, i) => [k, h[i % h.length]])); }
  const colorFor = (key) => colorOf.get(key) || theme.muted;

  // ------------------------------------------------------------ icons
  const ICON = {
    zin: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8v6M8 11h6"/>',
    zout: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M8 11h6"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>', down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>', right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    spin: '<ellipse cx="12" cy="12" rx="9" ry="3.6"/><circle cx="12" cy="12" r="1.6"/>',
    tour: '<path d="M3 18c4-1 6-4 8-8s5-5 10-5"/><circle cx="21" cy="5" r="1.3"/><circle cx="3" cy="18" r="1.3"/>',
    views: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    snap: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    theme: '<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
    grip: '<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
    min: '<path d="M5 12h14"/>', max: '<path d="M5 12h14M12 5v14"/>', close: '<path d="M6 6l12 12M18 6L6 18"/>',
  };
  const svg = (name) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[name] + "</svg>";
  function iconButton(id, name, label, extra = "") { const b = el("button", "", "icon"); b.type = "button"; if (id) b.id = id; b.title = label + (extra ? " (" + extra + ")" : ""); b.setAttribute("aria-label", label); b.innerHTML = svg(name); return b; }

  // ------------------------------------------------------------ status, toast
  let baseStatus = ["", "Connecting…"], flashMsg = null, opts = null;
  function paintStatus() {
    const s = opts && opts.statusOverride ? opts.statusOverride() : null;
    let [kind, text] = baseStatus;
    if (s) [kind, text] = s;
    else if (flashMsg && Date.now() < flashMsg.until) { kind = "live"; text = flashMsg.text; }
    $("status").className = kind; $("status-text").textContent = text;
  }
  const setStatus = (kind, text) => { baseStatus = [kind, text]; paintStatus(); };
  const flash = (text, ms = 4000) => { flashMsg = { text, until: Date.now() + ms }; paintStatus(); };
  let toastTimer = null;
  function toast(text) { const t = $("toast"); t.textContent = text; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600); }

  // ------------------------------------------------------------ 3D: textures, sprites, nodes
  function canvasTex(draw, size = 128) { const c = document.createElement("canvas"); c.width = c.height = size; draw(c.getContext("2d"), size); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
  const tex = {
    glow: canvasTex((g, s) => { const r = g.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2); r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.2, "rgba(255,255,255,.5)"); r.addColorStop(.5, "rgba(255,255,255,.1)"); r.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = r; g.fillRect(0, 0, s, s); }),
    ring: canvasTex((g, s) => { g.beginPath(); g.arc(s/2, s/2, s*.36, 0, Math.PI*2); g.lineWidth = s*.08; g.strokeStyle = "#fff"; g.stroke(); }),
    disc: canvasTex((g, s) => { g.beginPath(); g.arc(s/2, s/2, s*.34, 0, Math.PI*2); g.fillStyle = "#fff"; g.fill(); }),
    diamond: canvasTex((g, s) => { g.translate(s/2, s/2); g.rotate(Math.PI/4); g.lineWidth = s*.08; g.strokeStyle = "#fff"; g.strokeRect(-s*.26, -s*.26, s*.52, s*.52); g.fillStyle = "rgba(255,255,255,.2)"; g.fillRect(-s*.26, -s*.26, s*.52, s*.52); }),
  };
  const sprite = (map, color, scale, opacity = 1) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, color, transparent: true, opacity, depthWrite: false, blending: theme.add ? THREE.AdditiveBlending : THREE.NormalBlending })); s.scale.set(scale, scale, 1); return s; };
  const label = (text, color, h, italic) => { const t = new SpriteText(text, h, color); t.fontFace = italic ? "Source Serif 4, Georgia, serif" : "Space Grotesk, Arial, sans-serif"; t.fontWeight = italic ? "400" : "600"; t.material.depthWrite = false; return t; };
  const trim = (s, n) => s.length > n ? s.slice(0, n - 1) + "…" : s;

  // Node kinds: center (the course or the question), hub (an interest, topic or theme word),
  // person (a student), leaf (a paper or a response). Every node keeps [material, base opacity]
  // pairs so focus mode can dim it, a pulse halo for hubs, and ripple rings for "being searched".
  function nodeObject(n) {
    const g = new THREE.Group(), mats = [];
    const add = (o, base) => { o.material.transparent = true; o.material.opacity = base; g.add(o); mats.push([o.material, base]); return o; };
    const col = n.kind === "center" ? theme.fg : n.color;
    if (n.kind === "leaf") {
      const r = (n.size || 1.6) + (n.weight || 1) * .8;
      add(sprite(tex.glow, col, r * 7), .45 * theme.glow);
      if (n.shape === "disc") add(sprite(tex.disc, col, r * 2.6), 1);
      else add(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshBasicMaterial({ color: col })), 1);
    } else if (n.kind === "person") {
      add(sprite(tex.diamond, theme.fg, 10), .95);
      const t = add(label(trim(n.label, 28), theme.fg, 3.4), .95); t.position.y = 7.5;
    } else {
      const big = n.kind === "center";
      const halo = add(sprite(tex.glow, col, big ? 70 : 32), (big ? .5 : .3) * theme.glow);
      g.userData.pulse = halo; g.userData.pulseBase = halo.scale.x;
      add(sprite(tex.ring, col, big ? 16 : 10), .95);
      g.userData.rippleBase = big ? 16 : 10;
      g.userData.ripples = [0, 1, 2].map(() => { const r = sprite(tex.ring, col, g.userData.rippleBase, 0); g.add(r); return r; });
      const t = add(label(trim(n.label, big ? 60 : 44), col, big ? 5 : n.italic ? 3.1 : 3.7, n.italic), .92); t.position.y = big ? 13 : 8.5;
    }
    g.userData.mats = mats; n.__obj = g; highlightOne(n);
    return g;
  }

  // ------------------------------------------------------------ graph
  const field = $("field");
  const S = { filter: null, focus: null, selected: null, bloom: new Map(), index: new Map() };
  const endId = (e) => typeof e === "object" ? e.id : e;
  const graph = ForceGraph3D({ controlType: "orbit" })(field)
    .backgroundColor(theme.bg).showNavInfo(false)
    .nodeId("id").nodeLabel(() => "").nodeThreeObject(nodeObject)
    .nodeVisibility((n) => visible(n))
    .linkVisibility((l) => visible(byId(endId(l.source))) && visible(byId(endId(l.target))))
    .linkColor((l) => !S.focus || (S.focus.has(endId(l.source)) && S.focus.has(endId(l.target))) ? l.color : theme.dim)
    .linkOpacity(.34).linkWidth((l) => l.kind === "own" ? .5 : 0)
    .linkDirectionalParticles((l) => l.kind === "flow" ? 1 : 0).linkDirectionalParticleSpeed(.004).linkDirectionalParticleWidth(1.1)
    .linkDirectionalParticleColor((l) => l.color)
    .onNodeClick((n) => select(n)).onBackgroundClick(() => select(null))
    .onNodeHover((n) => { field.style.cursor = n ? "pointer" : ""; showTip(n); })
    .warmupTicks(40).cooldownTime(9000);
  graph.d3Force("charge").strength((n) => n.fx !== undefined && n.born > performance.now() ? 0 : n.kind === "center" ? -220 : n.kind === "leaf" ? -26 : -90);
  graph.d3Force("link").distance((l) => l.kind === "flow" ? 32 : l.kind === "own" ? 46 : 70);
  const pull = (alpha) => { for (const n of graph.graphData().nodes) { if (n.fx !== undefined) continue; const k = (n.kind === "center" ? .08 : .012) * alpha; n.vx -= n.x * k; n.vy -= n.y * k; n.vz -= n.z * k; } };
  pull.initialize = () => {};
  graph.d3Force("pull", pull);
  let fitted = false;
  const fewNodes = () => graph.graphData().nodes.length < 4;
  graph.onEngineStop(() => { if (!fitted) { fitted = true; if (!fewNodes()) graph.zoomToFit(900, 90); } });
  addEventListener("resize", () => { graph.width(innerWidth).height(innerHeight); clampTools(); });
  let dust;
  { const n = 1300, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const r = 700 + Math.random() * 1800, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1); pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * .6, r * Math.cos(ph)], i * 3); }
    const geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dust = new THREE.Points(geo, new THREE.PointsMaterial({ size: 3, map: tex.glow, color: theme.dust, transparent: true, opacity: theme.dustOpacity, depthWrite: false, blending: theme.add ? THREE.AdditiveBlending : THREE.NormalBlending }));
    graph.scene().add(dust); }
  graph.cameraPosition({ x: 0, y: 40, z: 420 });
  (function spin(tries = 0) { const c = graph.controls(); if (!c) { if (tries < 60) requestAnimationFrame(() => spin(tries + 1)); return; }
    c.autoRotate = !reduceMotion; c.autoRotateSpeed = .35; syncSpin();
    field.addEventListener("pointerdown", () => { c.autoRotate = false; syncSpin(); }, { once: true }); })();

  const byId = (id) => S.index.get(id);
  function visible(n) {
    if (!n || !S.filter) return true;
    if (n.kind === "center") return true;
    if (n.kind === "hub") return n.key === S.filter;
    return (n.terms || []).includes(S.filter);
  }
  // Replace the graph's data, keeping the positions of nodes that survive and flying new ones in.
  function setGraph(nodes, links) {
    const prev = new Map(graph.graphData().nodes.map((n) => [n.id, n]));
    for (const n of nodes) {
      const p = prev.get(n.id);
      if (p) Object.assign(n, { x: p.x, y: p.y, z: p.z, vx: p.vx, vy: p.vy, vz: p.vz, born: p.born, fx: p.fx, fy: p.fy, fz: p.fz });
      else if (S.bloom.has(n.id)) { launch(n, S.bloom.get(n.id)); S.bloom.delete(n.id); }
    }
    S.index = new Map(nodes.map((n) => [n.id, n]));
    graph.graphData({ nodes, links });
    if (S.selected && !byId(S.selected.id)) select(null);
    else if (S.selected) { S.selected = byId(S.selected.id); S.focus = neighbours(S.selected); }
    renderLegend();
  }
  // Hold a node out at the edge of the field until `at`, then let it fly in to its first hub.
  function launch(n, at) {
    n.born = at; if (reduceMotion) return;
    const hub = byId("h:" + ((n.terms || [])[0])) || byId("center") || { x: 0, y: 0, z: 0 };
    const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), R = 200 + Math.random() * 90;
    n.fx = n.x = (hub.x || 0) + R * Math.sin(b) * Math.cos(a); n.fy = n.y = (hub.y || 0) + R * Math.cos(b) * .6; n.fz = n.z = (hub.z || 0) + R * Math.sin(b) * Math.sin(a);
  }
  function replay() {
    const leaves = graph.graphData().nodes.filter((n) => n.kind === "leaf").sort((a, b) => String(a.at || "").localeCompare(String(b.at || "")));
    const now = performance.now(); leaves.forEach((n, i) => launch(n, now + 300 + i * 220)); graph.d3ReheatSimulation();
  }

  // ------------------------------------------------------------ focus mode
  function neighbours(n) {
    const ids = new Set([n.id]), links = graph.graphData().links;
    for (const l of links) { const s = endId(l.source), t = endId(l.target); if (s === n.id) ids.add(t); if (t === n.id) ids.add(s); }
    if (n.kind === "person") for (const l of links) { const s = endId(l.source), t = endId(l.target); if (l.kind === "flow" && ids.has(t)) ids.add(s); }
    return ids;
  }
  function highlightOne(n) { const o = n.__obj; if (!o) return; const k = !S.focus || S.focus.has(n.id) ? 1 : .1; for (const [m, base] of o.userData.mats) m.opacity = base * k; }
  function highlight() { for (const n of graph.graphData().nodes) highlightOne(n); graph.linkColor(graph.linkColor()); }

  // ------------------------------------------------------------ motion
  requestAnimationFrame(function tick() {
    const now = performance.now(), t = now / 1000;
    for (const n of graph.graphData().nodes) {
      const o = n.__obj; if (!o) continue;
      if (n.born) {
        const age = (now - n.born) / 1600;
        if (age < 0) o.scale.setScalar(.01);
        else {
          if (n.fx !== undefined) { n.fx = n.fy = n.fz = undefined; graph.d3ReheatSimulation(); }
          if (age < 1 && !reduceMotion) o.scale.setScalar(Math.max(.01, (1 - Math.pow(1 - age, 3)) * (1 + (1 - age) * 1.6)));
          else { o.scale.setScalar(1); n.born = 0; }
        }
      }
      if (o.userData.pulse && !reduceMotion) { const s = o.userData.pulseBase * (1 + .1 * Math.sin(t * 1.4 + (n.x || 0) * .05)); o.userData.pulse.scale.set(s, s, 1); }
      if (o.userData.ripples) {
        const on = !reduceMotion && opts && opts.isBusy && opts.isBusy(n);
        o.userData.ripples.forEach((r, i) => { if (!on) { r.material.opacity = 0; return; } const ph = (t * .7 + i / 3) % 1, s = o.userData.rippleBase * (1 + ph * 4.5); r.scale.set(s, s, 1); r.material.opacity = .55 * (1 - ph); });
      }
    }
    requestAnimationFrame(tick);
  });

  // ------------------------------------------------------------ tooltip, drawer
  const tip = $("tip");
  field.addEventListener("pointermove", (e) => { tip.style.left = Math.min(e.clientX + 14, innerWidth - 310) + "px"; tip.style.top = e.clientY + 14 + "px"; });
  function showTip(n) { const text = n && opts.tipText ? opts.tipText(n) : ""; tip.textContent = text; tip.hidden = !text; }
  function drawerHead(d, kind) {
    const head = el("div", "", "dhead"), btns = el("div", "", "row");
    const min = iconButton(null, "min", "Minimise"); min.onclick = () => { const on = d.classList.toggle("min"); min.innerHTML = svg(on ? "max" : "min"); min.setAttribute("aria-label", on ? "Expand" : "Minimise"); min.title = on ? "Expand" : "Minimise"; };
    const close = iconButton(null, "close", "Close"); close.onclick = () => select(null);
    btns.append(min, close); head.append(el("div", kind, "eyebrow"), btns); d.append(head);
  }
  function select(n) {
    S.selected = n; S.focus = n ? neighbours(n) : null; highlight();
    const d = $("drawer");
    if (!n) { d.hidden = true; return; }
    d.replaceChildren(); d.hidden = false; d.classList.remove("min");
    opts.drawer(n, d, { head: (kind) => drawerHead(d, kind), el, extLink });
  }
  function fly(n) { if (n.x === undefined) return; stopSpin(); const d = n.kind === "leaf" ? 70 : 120, len = Math.hypot(n.x, n.y, n.z) || 1, k = 1 + d / len; graph.cameraPosition({ x: n.x * k, y: n.y * k + 10, z: n.z * k }, n, 1300); }

  // ------------------------------------------------------------ legend (filter chips)
  function renderLegend() {
    const chips = $("chips"); chips.replaceChildren();
    for (const it of opts.legend()) {
      const b = el("button", trim(it.label, 30), "chip"); b.type = "button"; b.style.setProperty("--c", it.color);
      b.setAttribute("aria-pressed", String(S.filter === it.key)); b.title = it.label;
      b.onclick = () => { S.filter = S.filter === it.key ? null : it.key; graph.nodeVisibility(graph.nodeVisibility()); graph.linkVisibility(graph.linkVisibility()); renderLegend(); };
      chips.append(b);
    }
  }

  // ------------------------------------------------------------ camera controls
  function syncSpin() { const c = graph.controls(); const b = $("t-spin"); if (b) b.setAttribute("aria-pressed", String(!!(c && c.autoRotate))); }
  function stopSpin() { const c = graph.controls(); if (c) c.autoRotate = false; syncSpin(); }
  function zoomBy(f) { stopSpin(); const c = graph.camera(), t = graph.controls().target.clone(); graph.cameraPosition(t.clone().add(c.position.clone().sub(t).multiplyScalar(f)), t, 350); }
  function panBy(dx, dy) {
    stopSpin(); const c = graph.camera(), t = graph.controls().target.clone(), dist = c.position.distanceTo(t);
    const off = new V3().setFromMatrixColumn(c.matrix, 0).multiplyScalar(dx * dist * .18).add(new V3().setFromMatrixColumn(c.matrix, 1).multiplyScalar(dy * dist * .18));
    graph.cameraPosition(c.position.clone().add(off), t.add(off), 350);
  }
  const fitAll = () => { stopSpin(); if (fewNodes()) graph.cameraPosition({ x: 0, y: 40, z: 420 }, { x: 0, y: 0, z: 0 }, 700); else graph.zoomToFit(700, 70); };
  const resetView = () => { stopTour(); graph.cameraPosition({ x: 0, y: 40, z: 420 }, { x: 0, y: 0, z: 0 }, 900); };

  // ------------------------------------------------------------ flythrough
  let tour = null;
  function caption(n) {
    const cap = $("caption"); if (!n) { cap.hidden = true; return; }
    const [kind, text] = opts.captionFor(n); cap.querySelector(".eyebrow").textContent = kind; cap.querySelector(".t").textContent = text; cap.hidden = false;
  }
  function flyClose(n, ms) {
    if (n.x === undefined) return;
    const c = graph.camera().position, d = n.kind === "leaf" ? 60 : n.kind === "center" ? 150 : 100;
    const dir = new V3(c.x - n.x, c.y - n.y, c.z - n.z).normalize().applyAxisAngle(new V3(0, 1, 0), .5);
    graph.cameraPosition({ x: n.x + dir.x * d, y: n.y + dir.y * d + 12, z: n.z + dir.z * d }, n, ms);
  }
  function startTour() {
    stopTour(); stopSpin(); select(null);
    const stops = opts.tourStops(graph.graphData().nodes); if (!stops.length) return;
    let i = 0; $("t-tour").setAttribute("aria-pressed", "true"); $("t-tour").title = "Stop flythrough (T)";
    const step = () => { const n = stops[i++ % stops.length]; S.focus = neighbours(n); highlight(); flyClose(n, 2600); caption(n); tour = setTimeout(step, n.kind === "leaf" ? 4200 : 3600); };
    step();
  }
  function stopTour() { if (!tour) return; clearTimeout(tour); tour = null; caption(null); $("t-tour").setAttribute("aria-pressed", "false"); $("t-tour").title = "Fly through (T)"; S.focus = S.selected ? neighbours(S.selected) : null; highlight(); }
  field.addEventListener("pointerdown", stopTour);

  // ------------------------------------------------------------ theme switching
  function applyTheme() {
    theme = THEMES[themeName()] || THEMES.dark;
    graph.backgroundColor(theme.bg);
    dust.material.color.set(theme.dust); dust.material.opacity = theme.dustOpacity;
    dust.material.blending = theme.add ? THREE.AdditiveBlending : THREE.NormalBlending; dust.material.needsUpdate = true;
    const b = $("t-theme"); if (b) { const light = themeName() === "light"; b.innerHTML = svg(light ? "theme" : "sun"); b.title = (light ? "Switch to dark" : "Switch to light") + " (L)"; b.setAttribute("aria-label", light ? "Switch to dark" : "Switch to light"); }
    opts && opts.rebuild();
  }
  function toggleTheme() { const next = themeName() === "light" ? "dark" : "light"; document.documentElement.dataset.theme = next; store.set("epol590-theme", next); applyTheme(); }
  matchMedia("(prefers-color-scheme: light)").addEventListener("change", applyTheme);
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ------------------------------------------------------------ files: PNG snapshot and CSV export
  let caps = { db: null, user: null, downloads: null, uid: null, isOwner: false, canEdit: false };
  async function saveFile(filename, blob) {
    if (caps.downloads) {
      try { await caps.downloads.save({ filename, data: blob }); toast("Saved " + filename); }
      catch (e) { if (e && e.code !== "declined") toast("Could not save the file here."); }
      return;
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast("Downloading " + filename);
  }
  const stamp = () => new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
  function snapshot() {
    const r = graph.renderer(); r.render(graph.scene(), graph.camera());
    const src = r.domElement, w = src.width, h = src.height, scale = w / innerWidth;
    const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
    g.fillStyle = theme.bg; g.fillRect(0, 0, w, h); g.drawImage(src, 0, 0);
    const pad = 22 * scale; g.fillStyle = theme.fg;
    g.font = `600 ${11 * scale}px "Space Grotesk", Arial, sans-serif`; g.globalAlpha = .7; g.fillText(opts.snapshotEyebrow().toUpperCase(), pad, h - pad - 26 * scale);
    g.globalAlpha = 1; g.font = `700 ${20 * scale}px "Space Grotesk", Arial, sans-serif`; g.fillText(opts.snapshotTitle(), pad, h - pad);
    c.toBlob((blob) => blob && saveFile(opts.slug + "-" + stamp() + ".png", blob), "image/png");
  }
  const csvCell = (v) => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  function exportCsv() { const rows = opts.csvRows(); const text = rows.map((r) => r.map(csvCell).join(",")).join("\n"); saveFile(opts.slug + "-" + stamp() + ".csv", new Blob(["﻿" + text], { type: "text/csv" })); }

  // ------------------------------------------------------------ saved views (per viewer)
  let views = [];
  const viewsKey = () => "epol590-views-" + opts.slug;
  async function loadViews() {
    if (caps.db && caps.uid) { try { const s = await caps.db.doc("data/users/" + caps.uid + "/prefs").get(); views = s.exists ? (s.data()[opts.slug] || []) : []; return; } catch {} }
    try { views = JSON.parse(store.get(viewsKey()) || "[]"); } catch { views = []; }
  }
  async function persistViews() {
    if (caps.db && caps.uid) {
      const ref = caps.db.doc("data/users/" + caps.uid + "/prefs");
      try { const s = await ref.get(); if (s.exists) await ref.update({ [opts.slug]: views }); else await ref.set({ [opts.slug]: views }); return; } catch {}
    }
    store.set(viewsKey(), JSON.stringify(views));
  }
  function currentView(name) { const c = graph.camera().position, t = graph.controls().target; return { name, cam: { x: c.x, y: c.y, z: c.z }, target: { x: t.x, y: t.y, z: t.z }, filter: S.filter, theme: themeName(), extra: opts.viewExtra ? opts.viewExtra() : null }; }
  function goView(v) {
    stopTour(); stopSpin();
    if (v.extra && opts.applyViewExtra) opts.applyViewExtra(v.extra);
    S.filter = v.filter || null; graph.nodeVisibility(graph.nodeVisibility()); graph.linkVisibility(graph.linkVisibility()); renderLegend();
    graph.cameraPosition(v.cam, v.target, 1200);
  }

  // ------------------------------------------------------------ copy link
  async function copyLink(hash) {
    const url = (opts.shareUrl || location.href.split("#")[0]) + (hash ? "#" + hash : "");
    try { await navigator.clipboard.writeText(url); toast("Link copied. Paste it into the Zoom chat."); }
    catch { const i = el("input"); i.value = url; document.body.append(i); i.select(); try { document.execCommand("copy"); toast("Link copied."); } catch { toast(url); } i.remove(); }
  }

  // ------------------------------------------------------------ menus
  let openMenu = null;
  function closeMenu() { if (openMenu) { openMenu.remove(); openMenu = null; } }
  document.addEventListener("pointerdown", (e) => { if (openMenu && !openMenu.contains(e.target) && !e.target.closest("#tools")) closeMenu(); });
  function placeMenu(menu, anchor) {
    document.body.append(menu); openMenu = menu;
    const r = anchor.getBoundingClientRect(), mw = menu.offsetWidth, mh = menu.offsetHeight;
    let left = Math.min(Math.max(14, r.left + r.width / 2 - mw / 2), innerWidth - mw - 14);
    let top = r.top - mh - 8; if (top < 14) top = r.bottom + 8;
    menu.style.left = left + "px"; menu.style.top = Math.min(top, innerHeight - mh - 14) + "px";
  }
  function menuItem(text, kbd, run) { const b = el("button", "", "item"); b.type = "button"; b.append(el("span", text)); if (kbd) b.append(el("kbd", kbd)); b.onclick = () => { closeMenu(); run(); }; return b; }
  function moreMenu(anchor) {
    closeMenu(); const m = el("div", "", "panel menu"); m.setAttribute("role", "menu");
    for (const it of opts.moreItems()) { if (it === "-") { m.append(el("hr")); continue; } if (it.show && !it.show()) continue; m.append(menuItem(it.label, it.kbd, it.run)); }
    m.append(el("hr"));
    m.append(menuItem("Copy link to this board", "", () => copyLink(opts.shareHash && opts.shareHash())));
    m.append(menuItem("Download snapshot (PNG)", "S", snapshot));
    m.append(menuItem("Export data (CSV)", "", exportCsv));
    m.append(menuItem(document.body.classList.contains("bare") ? "Show panels" : "Hide panels", "H", toggleBare));
    m.append(el("hr")); const help = el("p", "Drag to rotate · right-drag to pan · scroll to zoom · arrow keys pan · + and − zoom · F fits · R resets · T flies through · L switches theme", "note"); help.style.padding = "4px 10px 6px"; help.style.maxWidth = "260px"; m.append(help);
    placeMenu(m, anchor);
  }
  async function viewsMenu(anchor) {
    closeMenu(); const m = el("div", "", "panel menu"); m.append(el("div", "Saved views", "eyebrow label"));
    const f = el("form"); const i = el("input"); i.id = "view-name"; i.placeholder = "Name this view"; i.maxLength = 40; i.setAttribute("aria-label", "Name for the saved view");
    const sb = el("button", "Save"); sb.type = "submit"; f.append(i, sb);
    f.onsubmit = async (e) => { e.preventDefault(); views.push(currentView(i.value.trim() || "View " + (views.length + 1))); views = views.slice(-20); await persistViews(); toast("View saved"); viewsMenu(anchor); };
    m.append(f);
    if (!views.length) m.append(Object.assign(el("p", "Saved views keep the camera angle, the filter and the theme. They are private to you.", "note"), { style: "padding:4px 10px 6px;max-width:250px" }));
    views.forEach((v, k) => {
      const row = el("div", "", "view"); const go = menuItem(v.name, "", () => goView(v));
      const x = el("button", "×", "x"); x.type = "button"; x.title = "Delete " + v.name; x.setAttribute("aria-label", "Delete " + v.name);
      x.onclick = async () => { views.splice(k, 1); await persistViews(); viewsMenu(anchor); };
      row.append(go, x); m.append(row);
    });
    placeMenu(m, anchor); setTimeout(() => i.focus(), 0);
  }

  // ------------------------------------------------------------ toolbar (draggable, position remembered)
  function toggleBare() { document.body.classList.toggle("bare"); closeMenu(); }
  function buildTools() {
    const t = $("tools"); t.replaceChildren();
    const grip = iconButton("t-grip", "grip", "Move toolbar"); grip.classList.add("grip"); grip.title = "Drag to move · double-click to reset";
    const sep = () => el("span", "", "sep");
    const B = (id, ic, lab, key, fn) => { const b = iconButton(id, ic, lab, key); b.onclick = fn; return b; };
    t.append(grip,
      B("t-zin", "zin", "Zoom in", "+", () => zoomBy(.7)), B("t-zout", "zout", "Zoom out", "−", () => zoomBy(1.4)),
      B("t-fit", "fit", "Fit everything", "F", fitAll), B("t-reset", "reset", "Reset view", "R", resetView), sep(),
      B("t-left", "left", "Pan left", "←", () => panBy(-1, 0)), B("t-up", "up", "Pan up", "↑", () => panBy(0, 1)),
      B("t-down", "down", "Pan down", "↓", () => panBy(0, -1)), B("t-right", "right", "Pan right", "→", () => panBy(1, 0)), sep(),
      B("t-spin", "spin", "Auto-rotate", "", () => { const c = graph.controls(); if (c) { c.autoRotate = !c.autoRotate; syncSpin(); } }),
      B("t-tour", "tour", "Fly through", "T", () => tour ? stopTour() : startTour()),
      B("t-views", "views", "Saved views", "V", (e) => viewsMenu(e.currentTarget)),
      B("t-snap", "snap", "Download snapshot", "S", snapshot),
      B("t-theme", "sun", "Switch theme", "L", toggleTheme),
      B("t-more", "more", "More", "", (e) => moreMenu(e.currentTarget)));
    $("t-spin").setAttribute("aria-pressed", "true"); $("t-tour").setAttribute("aria-pressed", "false");
    applyTheme();
    // dragging
    // drag by the grip or by any empty part of the toolbar
    let drag = null;
    t.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button") && e.target.closest("button") !== grip) return;
      const r = t.getBoundingClientRect(); drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false };
      try { t.setPointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    });
    t.addEventListener("pointermove", (e) => { if (!drag) return; drag.moved = true; placeTools(e.clientX - drag.dx, e.clientY - drag.dy); });
    const endDrag = () => { if (!drag) return; const moved = drag.moved; drag = null; if (!moved) return; const r = t.getBoundingClientRect(); store.set("epol590-tools", JSON.stringify({ x: r.left / innerWidth, y: r.top / innerHeight })); };
    t.addEventListener("pointerup", endDrag); t.addEventListener("pointercancel", endDrag);
    grip.addEventListener("dblclick", () => { t.classList.remove("placed"); t.style.left = t.style.top = t.style.bottom = ""; store.set("epol590-tools", ""); });
    grip.addEventListener("keydown", (e) => { const step = e.shiftKey ? 40 : 10, r = t.getBoundingClientRect(), m = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key]; if (m) { e.preventDefault(); e.stopPropagation(); placeTools(r.left + m[0], r.top + m[1]); } });
    try { const p = JSON.parse(store.get("epol590-tools") || "null"); if (p) placeTools(p.x * innerWidth, p.y * innerHeight); } catch {}
  }
  function placeTools(x, y) {
    const t = $("tools"), r = t.getBoundingClientRect();
    t.classList.add("placed"); t.style.bottom = "auto";
    t.style.left = Math.min(Math.max(6, x), innerWidth - r.width - 6) + "px"; t.style.top = Math.min(Math.max(6, y), innerHeight - r.height - 6) + "px";
  }
  function clampTools() { const t = $("tools"); if (t && t.classList.contains("placed")) { const r = t.getBoundingClientRect(); placeTools(r.left, r.top); } }

  // ------------------------------------------------------------ keyboard
  addEventListener("keydown", (e) => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    const act = { "+": () => zoomBy(.7), "=": () => zoomBy(.7), "-": () => zoomBy(1.4), "_": () => zoomBy(1.4),
      ArrowUp: () => panBy(0, 1), ArrowDown: () => panBy(0, -1), ArrowLeft: () => panBy(-1, 0), ArrowRight: () => panBy(1, 0),
      f: fitAll, r: resetView, t: () => tour ? stopTour() : startTour(), h: toggleBare, l: toggleTheme, s: snapshot,
      v: () => viewsMenu($("t-views")), Escape: () => { closeMenu(); stopTour(); select(null); } }[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (act) { e.preventDefault(); act(); }
  });

  // ------------------------------------------------------------ counters
  function tween(elm, to) {
    const from = +elm.textContent || 0; if (from === to) return;
    if (reduceMotion) { elm.textContent = to; return; }
    const t0 = performance.now();
    (function step(now) { const k = Math.min(1, (now - t0) / 500); elm.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
  }

  // ------------------------------------------------------------ init
  async function init(o) {
    opts = o;
    buildTools();
    setInterval(paintStatus, 1000);
    const c = window.claude;
    if (c) {
      [caps.db, caps.user, caps.downloads] = await Promise.all([c.use("db"), c.use("user"), c.use("downloads")]);
      caps.uid = caps.user ? await caps.user.id() : null;
      caps.isOwner = caps.user ? await caps.user.isOwner() : false;
      caps.canEdit = caps.user ? await caps.user.canEdit() : false;
    } else { caps.isOwner = caps.canEdit = true; } // a local or offline copy is the owner's own
    await loadViews();
    return caps;
  }

  return {
    $, el, extLink, svg, reduceMotion, init, caps: () => caps, theme: () => theme, assignColors, colorFor, setGraph, byId, select, fly, launch, replay,
    nodes: () => graph.graphData().nodes, setStatus, flash, toast, tween, copyLink, S, graph, trim,
    refreshFit() { fitted = false; },
  };
})();
