(function () {
  "use strict";

  /* Where each node sits in the 2-column scope grid (see style.css —
     this tool's .flow grid is 2 columns, not the 3-column layout the
     aortic-dissection tool uses, because the source algorithm genuinely
     forks into two parallel branches rather than one trunk with a
     side annotation). */
  const LAYOUT = {
    trigger:            { col: "full",      row: 1 },
    danger:             { col: "full",      row: 2 },
    indication:         { col: "full",      row: 3, decision: true },
    droperidol_check:   { col: "col-left",  row: 4, decision: true },
    delirium_care:      { col: "col-right", row: 4 },
    // Side-by-side branch pair (YES/NO), same pattern as the dissection
    // tool's esmolol/metoprolol pair — not stacked in one column, which
    // would make the two incoming arrows visually overlap.
    droperidol_regimen: { col: null, row: 5, group: "pair1" },
    haloperidol_im:     { col: null, row: 5, group: "pair1" },
    delirium_meds:      { col: "col-right", row: 6 },
    reassess_agitation: { col: "col-left",  row: 7 },
    reassess_delirium:  { col: "col-right", row: 7 },
    safety:             { col: "full",      row: 8 }
  };

  const EDGES = [
    ["trigger", "danger"],
    ["danger", "indication"],
    ["indication", "droperidol_check", "AGITATION"],
    ["indication", "delirium_care", "DELIRIUM"],
    ["droperidol_check", "droperidol_regimen", "YES"],
    ["droperidol_check", "haloperidol_im", "NO"],
    ["droperidol_regimen", "reassess_agitation"],
    ["haloperidol_im", "reassess_agitation"],
    ["delirium_care", "delirium_meds"],
    ["delirium_meds", "reassess_delirium"],
    ["reassess_agitation", "safety"],
    ["reassess_delirium", "safety"]
  ];

  const byId = {};
  NODES.forEach((n) => (byId[n.id] = n));

  /* ---- plain-text safety + glossary auto-linking ---- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // longest match first, so "AV block" wins over any shorter overlapping term
  const GLOSSARY_SORTED = GLOSSARY.slice().sort((a, b) => b.match.length - a.match.length);

  function linkify(rawText, usedTerms) {
    const text = escapeHtml(rawText);
    let result = "";
    let cursor = 0;
    // find the earliest, longest unused glossary match from `cursor` onward
    while (cursor < text.length) {
      let best = null;
      for (const g of GLOSSARY_SORTED) {
        if (usedTerms.has(g.match)) continue;
        const re = new RegExp("\\b" + g.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
        const m = re.exec(text.slice(cursor));
        if (
          m &&
          (!best || m.index < best.index || (m.index === best.index && m[0].length > best.text.length))
        ) {
          best = { index: m.index, text: m[0], g };
        }
      }
      if (!best) break;
      const matchStart = cursor + best.index;
      const matchEnd = matchStart + best.text.length;
      result += text.slice(cursor, matchStart);
      const g = best.g;
      const label = g.full ? g.full[0].toUpperCase() + g.full.slice(1) : "";
      result +=
        '<button type="button" class="term" aria-expanded="false">' +
        best.text +
        "</button>" +
        '<span class="term-def" hidden>' +
        (g.full ? "<strong>" + escapeHtml(label) + "</strong> — " : "") +
        escapeHtml(g.def) +
        "</span>";
      usedTerms.add(g.match);
      cursor = matchEnd;
    }
    result += text.slice(cursor);
    return result;
  }

  const flowEl = document.getElementById("flow");
  const edgesSvg = document.getElementById("edges");

  function nodeEl(n) {
    const layout = LAYOUT[n.id] || {};
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "node-" + n.id;
    btn.dataset.node = n.id;
    btn.setAttribute("aria-pressed", "false");

    let cls = "node";
    if (layout.decision) cls += " node--decision";
    if (n.type === "terminal") cls += " node--terminal";
    if (n.tone === "key") cls += " node--key";
    if (n.tone === "alarm") cls += " node--alarm";
    if (layout.col) cls += " " + layout.col;
    btn.className = cls;
    // Explicit row, where given — this diagram has two branches of
    // unequal length (agitation: 4 steps; delirium: 3), and implicit
    // grid auto-placement row-staggers them in a way that sends the
    // AGITATION/DELIRIUM edges on a long diagonal through unrelated
    // boxes. An explicit row keeps every edge short and direct.
    // (Grouped/paired nodes sit inside their own flow-wrap-2 subgrid,
    // not the outer .flow grid, so the row goes on the wrapper instead
    // — see render() — not on the node itself.)
    if (layout.row && !layout.group) btn.style.gridRow = String(layout.row);

    const title = document.createElement("span");
    title.className = "node__title";
    title.textContent = n.label;
    btn.appendChild(title);

    if (n.sub) {
      const sub = document.createElement("span");
      sub.className = "node__sub";
      sub.textContent = n.sub;
      btn.appendChild(sub);
    }

    btn.addEventListener("click", () => selectNode(n.id));
    return btn;
  }

  function render() {
    // group ordinary nodes by document order, wrapping "pair" groups
    const seenGroups = {};
    NODES.forEach((n) => {
      const layout = LAYOUT[n.id] || {};
      if (layout.group) {
        let wrap = seenGroups[layout.group];
        if (!wrap) {
          wrap = document.createElement("div");
          wrap.className = "flow-wrap-2";
          // The wrapper itself sits in the outer .flow grid — its row
          // comes from the first grouped node's own `row`, since the
          // nodes inside share one wrapper position.
          if (layout.row) wrap.style.gridRow = String(layout.row);
          flowEl.appendChild(wrap);
          seenGroups[layout.group] = wrap;
        }
        wrap.appendChild(nodeEl(n));
      } else {
        flowEl.appendChild(nodeEl(n));
      }
    });
  }

  function clearActive() {
    document.querySelectorAll(".node.is-active").forEach((el) => {
      el.classList.remove("is-active");
      el.setAttribute("aria-pressed", "false");
    });
  }

  const readout = document.getElementById("readout");
  const readoutIdle = document.getElementById("readoutIdle");
  const readoutContent = document.getElementById("readoutContent");
  const readoutClose = document.getElementById("readoutClose");
  const backdrop = document.getElementById("backdrop");

  function kindTag(ids) {
    return ids
      .map((id) => '<a class="refchip" href="#ref-' + id + '">[' + id + "]</a>")
      .join("");
  }

  function renderDose(rows, usedTerms) {
    if (!rows) return "";
    const trs = rows
      .map(
        (r) =>
          "<tr><td>" +
          linkify(r[0], usedTerms) +
          "</td><td>" +
          linkify(r[1], usedTerms) +
          "</td></tr>"
      )
      .join("");
    return '<table class="dose-table"><tbody>' + trs + "</tbody></table>";
  }

  function selectNode(id) {
    const n = byId[id];
    if (!n) return;
    clearActive();
    const el = document.getElementById("node-" + id);
    if (el) {
      el.classList.add("is-active");
      el.setAttribute("aria-pressed", "true");
    }

    readoutIdle.hidden = true;
    readoutContent.hidden = false;

    const usedTerms = new Set();

    let html = "";
    html += '<p class="readout__tag">' + escapeHtml(n.type) + "</p>";
    html += '<h2 class="readout__title">' + escapeHtml(n.label) + "</h2>";
    if (n.sub) html += '<p class="readout__sub">' + escapeHtml(n.sub) + "</p>";
    if (n.needsAuthor) {
      html +=
        '<span class="readout__flag">awaiting author citation</span>';
    }
    html += "<h3>What this means</h3><p>" + linkify(n.meaning, usedTerms) + "</p>";
    if (n.dose) {
      html += "<h3>Dosing, as authored</h3>" + renderDose(n.dose, usedTerms);
    }
    html += "<h3>Why</h3><p>" + linkify(n.rationale, usedTerms) + "</p>";
    if (n.cautions && n.cautions.length) {
      html +=
        "<h3>Cautions &amp; special populations</h3><ul class=\"caution-list\">" +
        n.cautions.map((c) => "<li>" + linkify(c, usedTerms) + "</li>").join("") +
        "</ul>";
    }
    html += "<h3>References</h3><div class=\"refchips\">" + kindTag(n.refs) + "</div>";

    readoutContent.innerHTML = html;

    if (window.matchMedia("(max-width: 900px)").matches) {
      readout.classList.add("is-open");
      backdrop.classList.add("is-open");
    }
  }

  function closeReadout() {
    readout.classList.remove("is-open");
    backdrop.classList.remove("is-open");
  }

  readoutContent.addEventListener("click", (e) => {
    const btn = e.target.closest(".term");
    if (!btn) return;
    const def = btn.nextElementSibling;
    if (!def || !def.classList.contains("term-def")) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", open ? "false" : "true");
    def.hidden = open;
  });

  readoutClose.addEventListener("click", closeReadout);
  backdrop.addEventListener("click", closeReadout);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeReadout();
  });

  /* ---- references list ---- */
  function renderReferences() {
    const list = document.getElementById("referencesList");
    const count = document.getElementById("refCount");
    if (count) count.textContent = "(" + REFERENCES.length + ")";
    REFERENCES.forEach((r) => {
      const li = document.createElement("li");
      li.id = "ref-" + r.id;
      // Not every reference has a stable public URL yet — the source
      // manuscript this algorithm is drawn from is unpublished at the
      // time of writing, so it carries no link to show.
      const linkHtml = r.url
        ? "<br><a href=\"" +
          r.url +
          '" target="_blank" rel="noopener">' +
          r.url +
          "</a>"
        : "";
      li.innerHTML =
        r.text + ' <span class="kind">' + r.kind + "</span>" + linkHtml;
      list.appendChild(li);
    });
  }

  /* ---- connector lines (desktop only) ---- */
  function pointAt(el, side) {
    const flowRect = flowEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = {
      left: r.left,
      right: r.right,
      center: (r.left + r.right) / 2
    };
    const y = {
      top: r.top,
      bottom: r.bottom,
      center: (r.top + r.bottom) / 2
    };
    return {
      x: x[side.x] - flowRect.left,
      y: y[side.y] - flowRect.top
    };
  }

  // Edges whose straight/smooth path would otherwise cross an unrelated
  // node. This happens here because haloperidol_im sits, column-wise,
  // directly between delirium_care (row above) and delirium_meds (row
  // below) — the pair's right-hand slot lands in the exact same lane
  // the whole delirium branch uses. Each entry names the obstacle to
  // route around; clearance is measured live off the obstacle's actual
  // rendered box, not a guessed fixed offset, so it stays correct if
  // box sizes change (longer content, different viewport, a font swap).
  const DETOUR = {
    "delirium_care->delirium_meds": { obstacle: "haloperidol_im", side: "left", clearance: 14 },
    "haloperidol_im->reassess_agitation": { obstacle: "delirium_meds", side: "left", clearance: 14 }
  };

  function drawEdges() {
    // Drawn on every viewport now — mobile shows the identical diagram
    // inside a horizontally scrollable .scope, rather than a reflowed
    // linear stack, so the arrows are needed there too.
    const flowRect = flowEl.getBoundingClientRect();
    edgesSvg.setAttribute("width", flowRect.width);
    edgesSvg.setAttribute("height", flowRect.height);
    edgesSvg.setAttribute("viewBox", "0 0 " + flowRect.width + " " + flowRect.height);
    edgesSvg.innerHTML =
      '<defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="6.5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#4A6684"/></marker></defs>';

    EDGES.forEach(([fromId, toId, label, variant]) => {
      const a = document.getElementById("node-" + fromId);
      const b = document.getElementById("node-" + toId);
      if (!a || !b) return;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      let p1, p2;
      if (Math.abs(ar.top - br.top) < 4) {
        // same row: connect sides
        p1 = pointAt(a, { x: ar.left < br.left ? "right" : "left", y: "center" });
        p2 = pointAt(b, { x: ar.left < br.left ? "left" : "right", y: "center" });
      } else {
        p1 = pointAt(a, { x: "center", y: "bottom" });
        p2 = pointAt(b, { x: "center", y: "top" });
      }

      const midY = (p1.y + p2.y) / 2;
      const detour = DETOUR[fromId + "->" + toId];
      let d;
      if (detour) {
        const obEl = document.getElementById("node-" + detour.obstacle);
        const obR = obEl.getBoundingClientRect();
        const detourX =
          detour.side === "left"
            ? obR.left - flowRect.left - detour.clearance
            : obR.right - flowRect.left + detour.clearance;
        const topY = obR.top - flowRect.top - 10;
        const botY = obR.bottom - flowRect.top + 10;
        d =
          "M" + p1.x + "," + p1.y +
          " C" + p1.x + "," + (p1.y + 18) + " " + detourX + "," + topY + " " + detourX + "," + topY +
          " L" + detourX + "," + botY +
          " C" + detourX + "," + botY + " " + p2.x + "," + (p2.y - 18) + " " + p2.x + "," + p2.y;
      } else {
        d =
          Math.abs(p1.y - p2.y) < 4
            ? "M" + p1.x + "," + p1.y + " L" + p2.x + "," + p2.y
            : "M" + p1.x + "," + p1.y +
              " C" + p1.x + "," + midY + " " + p2.x + "," + midY + " " + p2.x + "," + p2.y;
      }

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-edge" + (variant === "info" ? " is-info" : ""));
      if (variant !== "info") path.setAttribute("marker-end", "url(#arrow)");
      edgesSvg.appendChild(path);

      if (label) {
        const sameRow = Math.abs(p1.y - p2.y) < 4;
        const lx = sameRow ? (p1.x + p2.x) / 2 : p2.x + (p1.x > p2.x ? -10 : 10);
        const ly = sameRow ? p1.y - 8 : p1.y + (p2.y - p1.y) * 0.22;

        // Label background scales with text length — this tool's edge
        // labels ("AGITATION", "DELIRIUM") run longer than the YES/NO
        // tags the fixed 28px box was originally sized for.
        const labelW = Math.max(28, label.length * 6.1 + 12);

        const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bg.setAttribute("class", "edge-label-bg");
        bg.setAttribute("x", lx - labelW / 2);
        bg.setAttribute("y", ly - 11);
        bg.setAttribute("width", labelW);
        bg.setAttribute("height", 14);
        edgesSvg.appendChild(bg);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("class", "edge-label");
        text.setAttribute("x", lx);
        text.setAttribute("y", ly);
        text.setAttribute("text-anchor", "middle");
        text.textContent = label;
        edgesSvg.appendChild(text);
      }
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawEdges, 120);
  });

  render();
  renderReferences();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawEdges);
  }
  window.addEventListener("load", drawEdges);
  drawEdges();
})();
