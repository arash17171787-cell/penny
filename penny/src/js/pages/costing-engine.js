// ═══════════════════════════════════════════════════════════════
// PENNY — Costing Engine / Styles Page (Matching Mockups)
// Left: Garment Sketch + Raw Material List + NLP Log
// Right: Smart Mapping with confidence bars + Cost Est
// ═══════════════════════════════════════════════════════════════

window.CostingEnginePage = {
  render: function () {
    var container = document.getElementById('page-costing-engine');
    var tp = window.Store.get('activeTechPack');
    var costings = window.Store.get('costings');

    if (!tp || !costings) {
      // Auto-load
      tp = window.SampleTechPacks.packs[0];
      costings = window.CostingService.generateTieredCostings(tp);
      window.Store.set('activeTechPack', tp);
      window.Store.set('costings', costings);
      window.Store.set('selectedTier', 'target');
    }

    var tier = window.Store.get('selectedTier') || 'target';
    var costing = costings[tier];

    container.innerHTML = this.buildHeader(tp) +
      '<div class="page-body">' + this.buildContent(tp, costing) + '</div>';
  },

  buildHeader: function (tp) {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<div class="text-xs text-secondary" style="margin-bottom:2px;">LIBRARY / APPAREL / <strong>BOM MAPPING</strong></div>' +
      '<h1 class="page-title">TP-' + (tp ? tp.styleNumber : '4092') + ': ' + (tp ? tp.styleName : 'Signature Cotton Parka') + '</h1>' +
      '<p class="page-subtitle">Automated material extraction and ERP synchronization for ' + (tp ? tp.season : 'AW24') + ' Collection.</p>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<button class="btn btn-secondary">Save Draft</button>' +
      '<button class="btn btn-dark" onclick="window.CostingEnginePage.generateScenarios()">✦ Generate Scenarios</button>' +
      '</div></div>';
  },

  buildContent: function (tp, costing) {
    var html = '<div class="split-pane">';

    // LEFT SIDE
    html += '<div class="split-pane-main">';

    // PDF / Sketch Viewer
    html += '<div style="margin-bottom:var(--space-3);">';
    html += '<div class="flex items-center gap-2 text-xs text-secondary" style="margin-bottom:var(--space-2);">TECH_PACK_V3_FINAL.PDF</div>';
    html += '</div>';

    html += '<div class="sketch-viewer">';
    // Garment image
    html += '<div style="text-align:center;">';
    html += '<img src="image.png" alt="' + (tp ? tp.styleName : 'Garment') + '" style="max-width:100%;max-height:480px;object-fit:contain;border-radius:var(--radius-md);" />';
    html += '</div>';
    // Highlight labels
    html += '<div class="sketch-label" style="top:25%;left:12%;background:#1a6b4a;">Shell Fabric</div>';
    html += '<div class="sketch-label" style="top:70%;left:55%;background:#2563eb;">View Specifications</div>';
    html += '</div>';

    // Style ID
    // html += '<div class="flex justify-between items-center" style="margin-top:var(--space-3);">';
    // html += '<div><div class="text-xs text-secondary">STYLE ID</div><div class="text-md text-bold">' + (tp ? tp.styleNumber : 'MP-2024-PK-01') + '</div></div>';
    // html += '</div>';

    // Raw Material List
    html += '<div style="margin-top:var(--space-4);padding:var(--space-4);background:#ffffff;border:1px solid var(--color-border);border-radius:var(--radius-lg);">';
    html += '<div class="text-xs text-secondary" style="margin-bottom:var(--space-2);">RAW MATERIAL LIST</div>';
    html += '<div class="text-sm text-secondary" style="line-height:1.6;">';
    if (tp && tp.bom && tp.bom.fabrics) {
      tp.bom.fabrics.forEach(function (f) {
        var mat = window.MaterialLibrary.findMaterial(f.materialId);
        if (mat) html += '"Main body to be constructed from ' + mat.name + ', ' + (mat.composition || '') + '."<br>';
      });
    }
    html += '</div></div>';

    // NLP Logic Log
    html += this.buildNlpLog(tp);

    html += '</div>'; // end left

    // RIGHT SIDE
    html += '<div class="split-pane-sidebar">';

    // Smart Mapping panel with confidence bars
    var totalItems = 0;
    if (tp && tp.bom) {
      totalItems += (tp.bom.fabrics ? tp.bom.fabrics.length : 0) + (tp.bom.trims ? tp.bom.trims.length : 0) + (tp.bom.labels ? tp.bom.labels.length : 0) + (tp.bom.packaging ? tp.bom.packaging.length : 0);
    }

    html += '<div class="card card-padded">';
    html += '<div class="flex justify-between items-center" style="margin-bottom:var(--space-4);">';
    html += '<div><div class="text-md text-bold">✦ Smart Mapping</div>';
    html += '<div class="text-xs text-secondary">AI has extracted <strong>' + totalItems + ' attributes</strong> from your document.</div></div>';
    html += '</div>';

    // Confidence rows
    html += this.buildConfidenceRows(tp);

    // Factory cost — use the same value as Cost Summary target FOB for consistency
    var displayFob = 5.10;
    html += '<div class="flex justify-between items-center" style="margin-top:var(--space-5);padding:var(--space-4);background:var(--color-bg-tertiary);border-radius:var(--radius-md);">';
    html += '<div><div class="text-xs text-secondary">ESTIMATED FACTORY COST</div>';
    html += '<div class="text-xs text-tertiary" style="margin-top:2px;">Factory Lead Time: 12-16 Weeks</div></div>';
    html += '<div style="text-align:right;"><span class="text-3xl text-bold" style="font-family:var(--font-mono);">$' + displayFob.toFixed(2) + '</span><span class="text-sm text-secondary"> /unit</span></div>';
    html += '</div>';

    html += '<button class="btn btn-primary btn-full" style="margin-top:var(--space-4);" onclick="window.CostingEnginePage.saveMapping()">Save Mapping to Style Library</button>';

    html += '</div>';
    html += '</div>'; // end right

    html += '</div>'; // end split

    html += '<div id="trim-swapper-modal"></div>';
    return html;
  },

  buildGarmentSketch: function (tp) {
    // SVG line-art sketch of a jacket/shirt
    var type = tp ? tp.category : 'tee';
    var svg = '<svg viewBox="0 0 300 380" width="260" height="340" style="opacity:0.85;">';
    svg += '<defs><style>.sk{fill:none;stroke:#1a2340;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}</style></defs>';

    if (type === 'hoodie' || type === 'outerwear') {
      // Jacket/parka sketch
      svg += '<path class="sk" d="M100,40 C100,25 120,15 150,15 C180,15 200,25 200,40"/>';
      svg += '<path class="sk" d="M100,40 L70,80 L60,200 L80,200 L80,340 L220,340 L220,200 L240,200 L230,80 L200,40"/>';
      svg += '<path class="sk" d="M150,40 L150,200"/>';
      svg += '<path class="sk" d="M70,80 L25,160 L50,170 L80,100"/>';
      svg += '<path class="sk" d="M230,80 L275,160 L250,170 L220,100"/>';
      svg += '<rect class="sk" x="85" y="200" width="50" height="50" rx="3"/>';
      svg += '<rect class="sk" x="165" y="200" width="50" height="50" rx="3"/>';
      svg += '<path class="sk" d="M110,15 Q150,0 190,15"/>';
    } else {
      // T-shirt / polo sketch
      svg += '<path class="sk" d="M115,30 C115,15 130,8 150,8 C170,8 185,15 185,30"/>';
      svg += '<path class="sk" d="M115,30 L80,55 L55,110 L85,120 L105,70 L105,340 L195,340 L195,70 L215,120 L245,110 L220,55 L185,30"/>';
      svg += '<path class="sk" d="M125,30 Q150,45 175,30"/>';
      svg += '<line class="sk" x1="150" y1="30" x2="150" y2="100"/>';
      svg += '<circle class="sk" cx="150" cy="55" r="3"/>';
      svg += '<circle class="sk" cx="150" cy="75" r="3"/>';
      svg += '<circle class="sk" cx="150" cy="95" r="3"/>';
    }

    svg += '</svg>';
    return svg;
  },

  buildConfidenceRows: function (tp) {
    var html = '';
    var rows = [];

    if (tp && tp.bom && tp.bom.fabrics && tp.bom.fabrics[0]) {
      var mat = window.MaterialLibrary.findMaterial(tp.bom.fabrics[0].materialId);
      if (mat) rows.push({ cat: 'SHELL FABRIC', name: mat.name, source: 'Source: Page 1, Fabric Specs Table, Row 1', conf: 98, level: 'high' });
    }
    if (tp && tp.bom && tp.bom.trims && tp.bom.trims[0]) {
      var trim = window.MaterialLibrary.findMaterial(tp.bom.trims[0].materialId);
      if (trim) rows.push({ cat: 'TRIM 1 (' + (trim.type || 'THREAD').toUpperCase() + ')', name: trim.name, source: 'Source: Page 3, Hardware Components, Zone B', conf: 94, level: 'high' });
    }

    rows.push({ cat: 'YIELD PER UNIT', name: '2.45 YARDS', source: 'Source: Marker Layout Calculation', conf: 82, level: 'medium', extra: '<span class="tag tag-warning" style="margin-left:var(--space-2);">82% CONFIDENCE (CHECK)</span>' });

    if (tp && tp.bom && tp.bom.fabrics && tp.bom.fabrics[1]) {
      var lining = window.MaterialLibrary.findMaterial(tp.bom.fabrics[1].materialId);
      if (lining) rows.push({ cat: 'LINING MATERIAL', name: lining.name, source: 'Source: Page 1, Fabric Specs Table, Row 2', conf: 95, level: 'high' });
    }

    rows.push({ cat: 'TARGET LEAD TIME', name: '12-14 Weeks', source: '', conf: 0, level: 'user', extra: '<span class="confidence-badge confidence-user">USER DEFINED</span>' });

    rows.forEach(function (r) {
      html += '<div class="confidence-row">';
      html += '<div class="confidence-info">';
      html += '<div class="confidence-category">' + r.cat + '</div>';
      html += '<div class="confidence-value-name">' + r.name + '</div>';
      if (r.source) html += '<div class="confidence-source">' + r.source + '</div>';
      if (r.extra) html += r.extra;
      html += '</div>';
      if (r.level !== 'user') {
        var cls = r.conf >= 90 ? 'confidence-high' : (r.conf >= 80 ? 'confidence-medium' : 'confidence-low');
        html += '<span class="confidence-badge ' + cls + '">' + r.conf + '% CONFIDENCE</span>';
      }
      html += '</div>';
    });

    return html;
  },

  buildNlpLog: function (tp) {
    var html = '<div class="nlp-log" style="margin-top:var(--space-4);">';
    html += '<div class="nlp-log-title">NLP LOGIC LOG</div>';

    var entries = [];
    if (tp && tp.bom && tp.bom.fabrics) {
      tp.bom.fabrics.forEach(function (f) {
        var mat = window.MaterialLibrary.findMaterial(f.materialId);
        if (mat) entries.push({ entity: 'Entity: "' + mat.name + '"', tag: 'IDENTIFIED (fabric)', cls: 'identified' });
      });
    }
    if (tp && tp.bom && tp.bom.trims) {
      tp.bom.trims.forEach(function (t) {
        var mat = window.MaterialLibrary.findMaterial(t.materialId);
        if (mat) entries.push({ entity: 'Entity: "' + mat.name + '"', tag: 'IDENTIFIED (Trim)', cls: 'identified' });
      });
    }
    entries.push({ entity: 'Attribute: "25mm"', tag: 'MAPPED TO DIMENSION', cls: 'mapped' });

    entries.slice(0, 4).forEach(function (e) {
      html += '<div class="nlp-log-entry">';
      html += '<span class="nlp-entity">' + e.entity + '</span>';
      html += '<span class="nlp-tag ' + e.cls + '">' + e.tag + '</span>';
      html += '</div>';
    });

    html += '</div>';
    return html;
  },

  confirmAll: function () {
    window.App.showToast('Confirmed', 'All BOM mappings confirmed and locked', 'success');
  },

  saveMapping: function () {
    window.App.showToast('Saved', 'Mapping saved to style library', 'success');
  },

  exportToPlm: function () {
    window.App.showToast('Exported', 'Cost configuration pushed to PLM', 'success');
  },

  generateScenarios: function () {
    window.App.switchTab('cost-summary');
  }
};
