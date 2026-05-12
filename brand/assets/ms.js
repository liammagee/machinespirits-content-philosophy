/* ============================================================
   Machine Spirits — shared front-end behaviour
   Loaded with `defer` on every brand-layer page. Everything is
   feature-detected and no-ops if the markup it needs is absent,
   so the same file serves doc-reader pages and the site pages.

   What it wires up (when the relevant hooks exist):
     · theme toggle           #themeBtn  or  .theme-toggle   (key: ms-theme)
     · auto table-of-contents builds #tocList from .doc h2[id] if empty
     · scroll-spy              highlights the current section in the sidebar
     · current-nav             marks the matching .nav-doc / .nav-links link
     · mobile drawers          #menuBtn → .sidebar.open ; .nav-toggle → .nav-links.open
     · checklist persistence   [data-todo] checkboxes  (key: ms-todo:<path>)
                               + progress bar (#progBar/#progText) + per-list (.list-count) + #resetBtn
     · in-page search          CSS Custom Highlight API over #content/.doc ; "/" focuses
     · back-to-top             #toTop, shown past 600px (created if missing)
     · table wrapping          bare `.doc table` gets a scrollable .table-wrap
   No third-party code; no network calls; localStorage only.
   ============================================================ */
(function () {
  "use strict";
  var $  = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var THEME_KEY = "ms-theme";
  var TODO_KEY  = "ms-todo:" + (location.pathname || "page").replace(/\/+$/, "");

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    var pill = $("#themeBtn");
    if (pill) pill.textContent = (t === "dark") ? "☀ Light" : "☾ Dark";
    $$(".theme-toggle").forEach(function (b) {
      b.textContent = (t === "dark") ? "◐" : "◑";
      b.setAttribute("aria-label", (t === "dark") ? "Switch to light theme" : "Switch to dark theme");
    });
  }
  (function initTheme() {
    var saved = lsGet(THEME_KEY);
    var t = (saved === "light" || saved === "dark") ? saved
          : (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
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
  $$(".doc table", contentRoot).forEach(function (t) {
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

  /* ---------- scroll-spy on the sidebar ---------- */
  var tocLinks = $$("#tocList a.toc-link");
  var sections = $$("h2[id]", contentRoot);
  function setActive(id) {
    tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
  }
  var toTop = $("#toTop");
  if (!toTop && document.body) {
    toTop = document.createElement("button");
    toTop.id = "toTop"; toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top"); toTop.title = "Back to top";
    toTop.textContent = "↑";
    document.body.appendChild(toTop);
  }
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  function onScroll() {
    if (sections.length && tocLinks.length) {
      var top = (parseInt(getComputedStyle(html).getPropertyValue("--topbar-h")) || 58) + 24;
      var cur = sections[0].id;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= top) cur = sections[i].id; else break;
      }
      if (cur) setActive(cur);
    }
    if (toTop) {
      var st = window.pageYOffset || html.scrollTop;
      toTop.classList.toggle("show", st > 600);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- current-nav highlight (multi-page brand layer) ---------- */
  (function markCurrentNav() {
    var here = (location.pathname || "").replace(/\/+$/, "").split("/").pop() || "index.html";
    $$("a.nav-doc, .nav-links a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("#")[0].split("?")[0].replace(/\/+$/, "").split("/").pop();
      if (!href) href = "index.html";
      if (href === here) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
    });
  })();

  /* ---------- mobile drawers ---------- */
  var sidebar = $("#sidebar"), menuBtn = $("#menuBtn");
  if (sidebar && menuBtn) {
    menuBtn.addEventListener("click", function () { sidebar.classList.toggle("open"); });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a") && matchMedia("(max-width:980px)").matches) sidebar.classList.remove("open");
    });
  }
  var navLinks = $(".nav-links"), navToggle = $(".nav-toggle");
  if (navLinks && navToggle) {
    navToggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    navLinks.addEventListener("click", function (e) { if (e.target.closest("a")) navLinks.classList.remove("open"); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (sidebar) sidebar.classList.remove("open");
      if (navLinks) navLinks.classList.remove("open");
    }
  });
  document.addEventListener("click", function (e) {
    if (sidebar && sidebar.classList.contains("open") && !e.target.closest("#sidebar") && !e.target.closest("#menuBtn")) sidebar.classList.remove("open");
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
      if (el && el.scrollIntoView) el.scrollIntoView({ block: "center", behavior: "smooth" });
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
})();
