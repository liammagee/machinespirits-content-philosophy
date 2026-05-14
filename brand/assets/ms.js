/* ============================================================
   Machine Spirits — shared front-end behaviour
   Loaded with `defer` on every brand-layer page. Every feature is
   feature-detected and no-ops when its markup is absent, so the one
   file serves the doc-reader pages (body.layout-doc) and the
   journal-style landing/archive (body.layout-site) alike.
   All motion is gated on prefers-reduced-motion. No third-party
   code, no network calls, localStorage only.

   Wires up, when the hooks exist:
     · theme toggle           #themeBtn / .theme-toggle        key: ms-theme  (default: light)
     · auto table-of-contents builds #tocList from .doc h2[id]
     · scroll-spy             highlights the current section in the sidebar
     · current-nav            marks the matching .nav-doc / .nav-links a / .nav-list a
     · mobile drawers         #menuBtn / .mobile-toggle → #sidebar.open ; .nav-toggle → .nav-links.open
     · checklist persistence  [data-todo] checkboxes           key: ms-todo:<path>
     · in-page search         CSS Custom Highlight API over #content/.doc ; "/" focuses
     · back-to-top            #toTop on doc pages, shown past 600px (created if missing)
     · table wrapping         bare `.doc table` → scrollable .table-wrap
     · reading progress       fills .read-progress > span and/or #depthFill on scroll
     · materialize reveal     .materialize → .visible via IntersectionObserver (skipped under reduced-motion)
     · walking line           draws .line-path + tracks .walking-dot along it on scroll (skipped under reduced-motion)
     · depth-field parallax   nudges .geo-shape / [data-sidebar-speed] / .sidebar-glass-* (skipped under reduced-motion)
     · archive filters        .filter-btn[data-filter] shows/hides .article-card / .featured-article
   ============================================================ */
(function () {
  "use strict";
  var $  = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var THEME_KEY = "ms-theme";
  var TODO_KEY  = "ms-todo:" + (location.pathname || "page").replace(/\/+$/, "");
  var reduceMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var scrollBehavior = reduceMotion ? "auto" : "smooth";

  // Progressive-enhancement marker: pages carry class="no-js" on <html> and the
  // inline <head> theme script removes it before first paint. Remove it again
  // here so a page that forgot the inline script still loses the no-js styles.
  html.classList.remove("no-js");

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---------- theme (light is the default; dark is the opt-in peer) ---------- */
  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    var pill = $("#themeBtn");
    if (pill) pill.textContent = (t === "dark") ? "☀ Light" : "☾ Dark";
    $$(".theme-toggle").forEach(function (b) {
      b.textContent = (t === "dark") ? "☀" : "☾";
      b.setAttribute("aria-label", (t === "dark") ? "Switch to light theme" : "Switch to dark theme");
    });
  }
  (function initTheme() {
    var saved = lsGet(THEME_KEY);
    var t = (saved === "light" || saved === "dark") ? saved
          : (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(t);
  })();
  function toggleTheme() {
    var next = (html.getAttribute("data-theme") === "dark") ? "light" : "dark";
    applyTheme(next); lsSet(THEME_KEY, next);
  }
  var themePill = $("#themeBtn");
  if (themePill) themePill.addEventListener("click", toggleTheme);
  $$(".theme-toggle").forEach(function (b) { b.addEventListener("click", toggleTheme); });

  /* ---------- content root ---------- */
  var contentRoot = $("#content") || $("main .doc") || $("main") || document.body;

  /* ---------- wrap bare tables for horizontal scroll ---------- */
  $$(".doc table, .site-prose table", contentRoot).forEach(function (t) {
    if (t.closest(".table-wrap")) return;
    var w = document.createElement("div"); w.className = "table-wrap";
    t.parentNode.insertBefore(w, t); w.appendChild(t);
  });

  /* ---------- auto TOC (only if a #tocList exists and is empty) ---------- */
  var tocList = $("#tocList");
  if (tocList && !tocList.children.length) {
    var heads = $$("h2[id]", contentRoot);
    heads.forEach(function (h) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.className = "toc-link";
      a.href = "#" + h.id;
      var kSpan = h.querySelector(".k");
      if (kSpan) { var k = document.createElement("span"); k.className = "k"; k.textContent = kSpan.textContent.trim(); a.appendChild(k); }
      var txt = document.createElement("span");
      txt.textContent = (h.textContent || "").replace(kSpan ? kSpan.textContent : "", "").trim();
      a.appendChild(txt);
      li.appendChild(a); tocList.appendChild(li);
    });
    var onph = $("#onpage-h"); if (onph && !heads.length) onph.style.display = "none";
  }

  /* ---------- scroll-spy + reading progress + back-to-top + walking line ---------- */
  var tocLinks = $$("#tocList a.toc-link");
  var sections = $$("h2[id]", contentRoot);
  function setActive(id) {
    tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
  }
  var toTop = $("#toTop");
  if (!toTop && document.body && document.body.classList.contains("layout-doc")) {
    toTop = document.createElement("button");
    toTop.id = "toTop"; toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top"); toTop.title = "Back to top";
    toTop.textContent = "↑";
    document.body.appendChild(toTop);
  }
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: scrollBehavior }); });

  // reading-progress sinks — either, both, or neither may be present
  var progRail  = $(".read-progress > span") || $(".read-progress span");
  var depthFill = $("#depthFill");

  // walking-line bits (journal landing only)
  var walkLine    = $("#walkingLine"),  walkLineSb = $("#walkingLineSidebar");
  var walkPathH   = $("#walkPathH"),     walkPathV  = $("#walkPathV");
  var walkDotH    = $(".walking-dot"),   walkDotV   = $(".walking-dot-sidebar");
  var kleeCallout = $("#kleeCallout");
  var lineDrawn   = false;

  function positionDotAt(containerEl, pathEl, dotEl, t) {
    if (!pathEl || !dotEl || !containerEl || !pathEl.getTotalLength) return;
    var svg = pathEl.ownerSVGElement; if (!svg) return;
    var vb = svg.viewBox && svg.viewBox.baseVal; if (!vb) return;
    var total = pathEl.getTotalLength();
    var pt = pathEl.getPointAtLength(Math.max(0, Math.min(1, t)) * total);
    var rect = containerEl.getBoundingClientRect();
    if (!rect.width || !rect.height || !vb.width || !vb.height) return;
    dotEl.style.left = ((pt.x - vb.x) / vb.width  * rect.width)  + "px";
    dotEl.style.top  = ((pt.y - vb.y) / vb.height * rect.height) + "px";
  }

  function scrollFraction() {
    var max = html.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.max(0, Math.min(1, (window.pageYOffset || html.scrollTop || 0) / max));
  }

  function onScroll() {
    if (sections.length && tocLinks.length) {
      var top = (parseInt(getComputedStyle(html).getPropertyValue("--topbar-h")) || 58) + 24;
      var cur = sections[0].id;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= top) cur = sections[i].id; else break;
      }
      if (cur) setActive(cur);
    }
    var f = scrollFraction();
    if (progRail)  progRail.style.width  = (f * 100).toFixed(2) + "%";
    if (depthFill) depthFill.style.width = (f * 100).toFixed(2) + "%";
    if (toTop) toTop.classList.toggle("show", (window.pageYOffset || html.scrollTop || 0) > 600);
    if (walkLine && !reduceMotion) {
      if (!lineDrawn && f > 0.01) {
        walkLine.classList.add("animate");
        if (walkLineSb) walkLineSb.classList.add("animate");
        if (kleeCallout) setTimeout(function () { kleeCallout.classList.add("visible"); }, 800);
        lineDrawn = true;
      }
      positionDotAt(walkLine,   walkPathH, walkDotH, f);
      positionDotAt(walkLineSb, walkPathV, walkDotV, f);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", function () {
    if (walkLine && !reduceMotion) {
      positionDotAt(walkLine,   walkPathH, walkDotH, scrollFraction());
      positionDotAt(walkLineSb, walkPathV, walkDotV, scrollFraction());
    }
    onScroll();
  });
  onScroll();

  /* ---------- current-nav highlight (multi-page brand layer) ---------- */
  (function markCurrentNav() {
    var here = (location.pathname || "").replace(/\/+$/, "").split("/").pop() || "index.html";
    $$("a.nav-doc, .nav-links a, .nav-list a").forEach(function (a) {
      var raw = a.getAttribute("href") || "";
      if (!raw || raw.charAt(0) === "#") return; // in-page anchors aren't page navigation
      var href = raw.split("#")[0].split("?")[0].replace(/\/+$/, "").split("/").pop();
      if (!href) href = "index.html";
      if (href === here) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
    });
  })();

  /* ---------- mobile drawers ---------- */
  var sidebar = $("#sidebar");
  var sidebarBtns = $$("#menuBtn, .mobile-toggle");
  if (sidebar && sidebarBtns.length) {
    sidebarBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) { e.stopPropagation(); sidebar.classList.toggle("open"); });
    });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.matchMedia && matchMedia("(max-width:980px)").matches) sidebar.classList.remove("open");
    });
  }
  var navLinks = $(".nav-links"), navToggle = $(".nav-toggle");
  if (navLinks && navToggle) {
    navToggle.addEventListener("click", function (e) { e.stopPropagation(); navLinks.classList.toggle("open"); });
    navLinks.addEventListener("click", function (e) { if (e.target.closest("a")) navLinks.classList.remove("open"); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (sidebar) sidebar.classList.remove("open");
      if (navLinks) navLinks.classList.remove("open");
    }
  });
  document.addEventListener("click", function (e) {
    if (sidebar && sidebar.classList.contains("open")
        && !e.target.closest("#sidebar") && !e.target.closest("#menuBtn") && !e.target.closest(".mobile-toggle")) {
      sidebar.classList.remove("open");
    }
  });

  /* ---------- checklist persistence ---------- */
  var todos = $$("ul.todo-list input[type=checkbox][data-todo]");
  if (todos.length) {
    var progBar = $("#progBar"), progText = $("#progText"), resetBtn = $("#resetBtn");
    function readSaved() { var o = {}; try { o = JSON.parse(lsGet(TODO_KEY) || "{}") || {}; } catch (e) {} return o; }
    function writeSaved() {
      var o = {}; todos.forEach(function (cb) { if (cb.checked) o[cb.getAttribute("data-todo")] = true; });
      lsSet(TODO_KEY, JSON.stringify(o));
    }
    function reflect(cb) { var li = cb.closest("li"); if (li) li.classList.toggle("done", cb.checked); }
    function updateCounts() {
      var done = todos.filter(function (cb) { return cb.checked; }).length;
      var total = todos.length, pct = total ? Math.round(done / total * 100) : 0;
      if (progBar) progBar.style.width = pct + "%";
      if (progText) progText.textContent = done + " / " + total;
      $$("ul.todo-list[data-list]").forEach(function (ul) {
        var key = ul.getAttribute("data-list");
        var badge = $('.list-count[data-count="' + key + '"]') || (ul.parentNode && $('.list-count[data-count="' + key + '"]', ul.parentNode));
        if (!badge) return;
        var cbs = $$('input[type=checkbox]', ul);
        var d = cbs.filter(function (c) { return c.checked; }).length;
        badge.textContent = d + " / " + cbs.length;
        badge.classList.toggle("complete", d === cbs.length && cbs.length > 0);
      });
    }
    var saved = readSaved();
    todos.forEach(function (cb) {
      if (saved[cb.getAttribute("data-todo")]) cb.checked = true;
      reflect(cb);
      cb.addEventListener("change", function () { reflect(cb); writeSaved(); updateCounts(); });
    });
    updateCounts();
    if (resetBtn) resetBtn.addEventListener("click", function () {
      if (!window.confirm("Clear all checklist progress on this page?")) return;
      todos.forEach(function (cb) { cb.checked = false; reflect(cb); });
      lsDel(TODO_KEY); updateCounts();
    });
  }

  /* ---------- in-page search (CSS Custom Highlight API) ---------- */
  var input = $("#searchInput"), countEl = $("#searchCount");
  if (input) {
    var hlOK = !!(window.CSS && CSS.highlights && window.Highlight && document.createRange);
    var textNodes = [], matches = [], cur = -1, deb;
    function buildIndex() {
      textNodes = [];
      var walker = document.createTreeWalker(contentRoot, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var p = n.parentElement;
          while (p && p !== contentRoot) {
            var tag = p.tagName;
            if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
            p = p.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var n; while ((n = walker.nextNode())) textNodes.push(n);
    }
    function clearHL() { if (hlOK) { CSS.highlights.delete("mss-hit"); CSS.highlights.delete("mss-cur"); } }
    function paint() {
      if (!hlOK) return;
      clearHL(); if (!matches.length) return;
      var hit = new Highlight(), curH = new Highlight();
      matches.forEach(function (r, i) { (i === cur ? curH : hit).add(r); });
      CSS.highlights.set("mss-hit", hit); CSS.highlights.set("mss-cur", curH);
    }
    function gotoMatch() {
      if (!matches.length) return;
      cur = (cur + matches.length) % matches.length;
      paint();
      var el = matches[cur].startContainer.parentElement;
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "center", behavior: scrollBehavior });
      if (countEl) countEl.textContent = (cur + 1) + " / " + matches.length;
    }
    function runSearch(q) {
      matches = []; cur = -1; clearHL();
      q = (q || "").trim().toLowerCase();
      if (q.length < 2) { if (countEl) countEl.textContent = ""; return; }
      if (!textNodes.length) buildIndex();
      textNodes.forEach(function (node) {
        var hay = node.nodeValue.toLowerCase(), from = 0, idx;
        while ((idx = hay.indexOf(q, from)) !== -1) {
          var r = document.createRange();
          try { r.setStart(node, idx); r.setEnd(node, idx + q.length); matches.push(r); } catch (e) {}
          from = idx + q.length;
        }
      });
      if (!matches.length) { if (countEl) countEl.textContent = "0 / 0"; return; }
      if (countEl) countEl.textContent = "0 / " + matches.length;
      cur = 0; gotoMatch();
    }
    input.addEventListener("input", function () { clearTimeout(deb); deb = setTimeout(function () { runSearch(input.value); }, 110); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); if (matches.length) { cur += e.shiftKey ? -1 : 1; gotoMatch(); } }
      if (e.key === "Escape") { input.value = ""; runSearch(""); input.blur(); }
    });
    var nextBtn = $("#nextHit"), prevBtn = $("#prevHit");
    if (nextBtn) nextBtn.addEventListener("click", function () { if (matches.length) { cur++; gotoMatch(); } });
    if (prevBtn) prevBtn.addEventListener("click", function () { if (matches.length) { cur--; gotoMatch(); } });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); input.focus(); input.select();
      }
    });
  }

  /* ---------- scroll-reveal (.materialize → .visible) ---------- */
  // Under reduced motion we don't observe at all — the CSS @media block already
  // forces .materialize into its visible end-state.
  (function materializeReveal() {
    var els = $$(".materialize");
    if (!els.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add("visible"); }, i * 50);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- depth-field parallax (journal landing) ---------- */
  // Pointer-/scroll-linked nudge of the background planes. Event-driven: a rAF
  // is scheduled only when the pointer moves or the page scrolls, so it idles at
  // rest. Off entirely under reduced motion, and when there is nothing to move.
  (function parallax() {
    if (reduceMotion) return;
    var shapes     = $$(".geo-shape");
    var orbs       = $$("[data-sidebar-speed]");
    var glassOuter = $(".sidebar-glass-outer"), glassMid = $(".sidebar-glass-mid");
    if (!shapes.length && !orbs.length && !glassOuter && !glassMid) return;
    var mx = 0, my = 0, sy = window.pageYOffset || 0, raf = 0;
    function schedule() { if (!raf) raf = requestAnimationFrame(tick); }
    document.addEventListener("mousemove", function (e) {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    }, { passive: true });
    window.addEventListener("scroll", function () { sy = window.pageYOffset || 0; schedule(); }, { passive: true });
    function tick() {
      raf = 0;
      shapes.forEach(function (s) {
        var sp = parseFloat(s.getAttribute("data-speed")) || 0.04;
        var x = mx * 24 * sp, y = sy * sp * 0.25 + my * 14 * sp;
        s.style.transform = "translate(" + x.toFixed(1) + "px," + (-y).toFixed(1) + "px)";
      });
      orbs.forEach(function (o) {
        var sp = parseFloat(o.getAttribute("data-sidebar-speed")) || 0.1;
        o.style.transform = "translate(" + (mx * 12 * sp).toFixed(1) + "px," + (my * 12 * sp).toFixed(1) + "px)";
      });
      if (glassOuter) glassOuter.style.transform = "translate(" + (mx * 5).toFixed(1) + "px," + (my * 5).toFixed(1) + "px)";
      if (glassMid)   glassMid.style.transform   = "translate(" + (mx * 2.5).toFixed(1) + "px," + (my * 2.5).toFixed(1) + "px)";
    }
  })();

  /* ---------- archive filters (journal landing) ---------- */
  // Each .filter-btn carries data-filter="token" ("" or "all" = show everything).
  // A card matches when its data-cat — or, failing that, its .card-type /
  // .article-type text — contains the token (case-insensitive substring).
  (function filters() {
    var btns = $$(".filter-btn");
    if (!btns.length) return;
    var cards = $$(".article-card, .featured-article");
    if (!cards.length) return;
    function tokenOf(btn) { return (btn.getAttribute("data-filter") || btn.textContent || "").trim().toLowerCase(); }
    function catOf(card) {
      var dc = card.getAttribute("data-cat");
      if (dc) return dc.toLowerCase();
      var t = card.querySelector(".card-type, .article-type");
      return (t ? t.textContent : "").toLowerCase();
    }
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
        var tok = tokenOf(btn), all = !tok || tok === "all";
        cards.forEach(function (card) {
          card.style.display = (all || catOf(card).indexOf(tok) !== -1) ? "" : "none";
        });
      });
    });
  })();
})();
