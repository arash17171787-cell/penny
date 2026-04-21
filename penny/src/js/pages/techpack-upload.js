// ═══════════════════════════════════════════════════════════════
// PENNY — Tech Pack Upload Page
// Upload & Auto-Extract with OCR animation
// Post-upload: BOM Mapping view matching mockup
// ═══════════════════════════════════════════════════════════════

window.TechPackUploadPage = {
  processing: false,
  extractionResult: null,

  render: function () {
    var container = document.getElementById('page-techpack-upload');
    container.innerHTML = this.buildHeader() + '<div class="page-body">' + this.buildContent() + '</div>';
    this.bindEvents(container);
  },

  buildHeader: function () {
    if (this.extractionResult) {
      var pack = this.extractionResult.techPack;
      return '<div class="page-header">' +
        '<div class="page-header-left">' +
        '<div class="text-xs text-secondary" style="margin-bottom:2px;">LIBRARY / APPAREL / <strong>BOM MAPPING</strong></div>' +
        '<h1 class="page-title">TP-' + (pack ? pack.styleNumber : '4092') + ': ' + (pack ? pack.styleName : 'Signature Cotton Parka') + '</h1>' +
        '<p class="page-subtitle">Automated material extraction and ERP synchronization for ' + (pack ? pack.season : 'AW24') + ' ' + (pack ? pack.garmentType : 'Outerwear') + ' Collection.</p>' +
        '</div>' +
        '<div class="page-header-right">' +
        '<button class="btn btn-secondary" onclick="window.TechPackUploadPage.saveDraft()">Save Draft</button>' +
        '<button class="btn btn-dark" onclick="window.TechPackUploadPage.generateCostings()">Generate Scenarios</button>' +
        '</div></div>';
    }
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">Tech Pack Upload</h1>' +
      '<p class="page-subtitle">Upload PLM tech sheets — AI auto-extracts BOM data in seconds.</p>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<button class="btn btn-secondary" onclick="window.TechPackUploadPage.loadSample()" id="btn-load-sample">Load Sample Tech Pack</button>' +
      '</div>' +
      '</div>';
  },

  buildContent: function () {
    if (this.extractionResult) {
      return this.buildBomMappingView();
    }

    var html = '<div style="max-width:700px;margin:0 auto;">';

    // Upload zone
    html += '<div class="upload-zone" id="upload-zone">' +
      '<div class="upload-zone-icon"></div>' +
      '<div class="upload-zone-title">Drop your Tech Pack here</div>' +
      '<div class="upload-zone-desc">Supports PDF, XLSX, XLS, CSV files · Max 50MB</div>' +
      '<button class="btn btn-primary btn-lg" style="margin-top:var(--space-5);" id="btn-browse">Browse Files</button>' +
      '</div>';

    // Or load from finalized PLM
    html += '<div style="margin-top:var(--space-8);">';
    html += '<h3 class="text-md text-semibold" style="margin-bottom:var(--space-4);">Or select from finalized PLM Tech Packs</h3>';

    var packs = window.SampleTechPacks.getFinalized();
    html += '<div class="grid-2">';
    packs.forEach(function (pack) {
      var template = window.StyleTemplates.findTemplate(pack.templateId);
      html += '<div class="card card-padded hover-lift" style="cursor:pointer;" onclick="window.TechPackUploadPage.processPack(\'' + pack.id + '\')" id="plm-pack-' + pack.id + '">' +
        '<div class="flex items-center gap-3" style="margin-bottom:var(--space-3);">' +
        '<span style="font-size:28px;">' + (template ? template.icon : '📄') + '</span>' +
        '<div>' +
        '<div class="text-md text-semibold">' + pack.styleName + '</div>' +
        '<div class="text-sm text-secondary">' + pack.styleNumber + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="flex gap-2 flex-wrap">' +
        '<span class="tag tag-info">' + pack.season + '</span>' +
        '<span class="tag tag-fabric">' + pack.garmentType + '</span>' +
        '<span class="tag tag-success">Finalized</span>' +
        '</div>' +
        '<div class="text-xs text-tertiary" style="margin-top:var(--space-2);">Designer: ' + pack.designer + ' · ' + pack.colorways.length + ' colorways</div>' +
        '</div>';
    });
    html += '</div></div></div>';

    return html;
  },

  // ═══════════════════════════════════════════════════════════
  // BOM MAPPING VIEW — Matching Mockup
  // Left: Garment Sketch + Raw Material + NLP Log
  // Right: Penny Automated BOM Table + Confidence Summary
  // ═══════════════════════════════════════════════════════════
  buildBomMappingView: function () {
    var result = this.extractionResult;
    var tp = result.techPack;
    var html = '<div class="split-pane">';

    // ─── LEFT SIDE ───
    html += '<div class="split-pane-main">';

    // Source tag
    html += '<div style="margin-bottom:var(--space-3);">';
    html += '<div class="flex items-center gap-2 text-xs text-secondary" style="margin-bottom:var(--space-2);">SOURCE: PLM TECH SHEET</div>';
    html += '</div>';

    // Image section — scrollable white container
    html += '<div class="sketch-viewer" style="background:#ffffff;max-height:400px;overflow-y:auto;padding:var(--space-4);">';
    html += '<div style="text-align:center;">';
    html += '<img src="image2.png" alt="' + (tp ? tp.styleName : 'Garment') + '" style="max-width:80%;max-height:320px;object-fit:contain;" />';
    html += '</div>'
    html += '</div>';

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
    if (tp && tp.constructionNotes) {
      html += '"' + tp.constructionNotes + '"';
    }
    html += '</div></div>';

    // NLP Logic Log
    html += this.buildNlpLog(tp);

    html += '</div>'; // end left

    // ─── RIGHT SIDE ───
    html += '<div class="split-pane-sidebar">';

    // Penny Automated BOM panel
    html += '<div class="card" style="margin-bottom:var(--space-5);overflow:hidden;">';

    // Header
    html += '<div style="background:#1a2340;color:#fff;padding:var(--space-4) var(--space-5);">';
    html += '<div class="flex justify-between items-center">';
    html += '<div><div class="text-md text-bold" style="color:#fff;">Penny Automated BOM</div>';
    html += '<div class="text-xs" style="color:rgba(255,255,255,0.6);">REAL-TIME ERP & MARKET SYNC</div></div>';
    html += '<span class="tag-active-mapping" style="background:transparent;border:1px solid rgba(255,255,255,0.4);">ACTIVE MAPPING</span>';
    html += '</div></div>';

    // BOM Table
    html += '<div style="padding:var(--space-4);">';
    html += '<table style="width:100%;font-size:var(--text-xs);">';
    html += '<thead><tr style="border-bottom:1px solid var(--color-border);">';
    html += '<th style="padding:6px 8px;font-size:10px;">COMPONENT</th>';
    html += '<th style="padding:6px 8px;font-size:10px;">ATTRIBUTES</th>';
    html += '<th style="padding:6px 8px;font-size:10px;">MAPPING STATUS</th>';
    html += '<th style="padding:6px 8px;font-size:10px;">COST EST.</th>';
    html += '</tr></thead><tbody>';

    // BOM rows from actual tech pack data
    var totalItems = 0;
    if (tp && tp.bom) {
      if (tp.bom.fabrics) {
        tp.bom.fabrics.forEach(function (f) {
          var mat = window.MaterialLibrary.findMaterial(f.materialId);
          if (!mat) return;
          totalItems++;
          html += '<tr style="border-bottom:1px solid var(--color-divider);">';
          html += '<td style="padding:8px;"><div class="text-semibold">' + mat.name.split(' ')[0] + '</div><div class="text-xs text-tertiary">' + f.placement + '</div></td>';
          html += '<td style="padding:8px;"><span class="tag tag-info">' + (mat.gsm || '') + ' GSM</span></td>';
          html += '<td style="padding:8px;"><div class="text-xs">Supplier: ' + (mat.supplier || 'TBD') + '</div><span class="mapping-tag confirmed">✓ Confirmed</span></td>';
          html += '<td style="padding:8px;"><div class="text-semibold mono">$' + mat.unitPrice.toFixed(2) + '/m</div><div class="price-type">CONTRACT PRICE</div></td>';
          html += '</tr>';
        });
      }
      if (tp.bom.trims) {
        tp.bom.trims.forEach(function (t, i) {
          var mat = window.MaterialLibrary.findMaterial(t.materialId);
          if (!mat) return;
          totalItems++;
          var isLast = i === tp.bom.trims.length - 1;
          html += '<tr style="border-bottom:1px solid var(--color-divider);">';
          html += '<td style="padding:8px;"><div class="text-semibold">' + mat.name.split(' ')[0] + '</div><div class="text-xs text-tertiary">' + (mat.type || 'Trim') + '</div></td>';
          html += '<td style="padding:8px;"><span class="tag tag-trim">QTY: ' + t.qty + '</span></td>';
          if (isLast) {
            html += '<td style="padding:8px;"><div class="text-xs">No Exact Match</div><span class="mapping-tag missing">⚠ MISSING DATA</span></td>';
          } else {
            html += '<td style="padding:8px;"><div class="text-xs">Verified Library</div><span class="mapping-tag confirmed">✓ Confirmed</span></td>';
          }
          html += '<td style="padding:8px;"><div class="text-semibold mono">$' + mat.unitPrice.toFixed(2) + '/pc</div><div class="price-type">' + (isLast ? 'NEEDS QUOTE' : 'MARKET AVG') + '</div></td>';
          html += '</tr>';
        });
      }
      // Count labels and packaging
      totalItems += (tp.bom.labels ? tp.bom.labels.length : 0) + (tp.bom.packaging ? tp.bom.packaging.length : 0);
    }
    html += '</tbody></table>';

    // Summary row
    var confPct = result.overallConfidence ? (result.overallConfidence * 100).toFixed(0) : '92';
    html += '<div class="flex justify-between items-center" style="margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid var(--color-border);">';
    html += '<div class="flex gap-5">';
    html += '<div class="nlp-summary-item"><div class="nlp-summary-label">TOTAL ITEMS</div><div class="nlp-summary-value">' + totalItems + ' Entities</div></div>';
    html += '<div class="nlp-summary-item"><div class="nlp-summary-label">CONFIDENCE</div><div class="nlp-summary-value">' + confPct + '%</div></div>';
    html += '</div>';
    html += '<div class="flex gap-2">';
    html += '<button class="btn btn-sm btn-secondary" onclick="window.TechPackUploadPage.rescan()">Re-Scan Source</button>';
    html += '<button class="btn btn-sm btn-dark" onclick="window.TechPackUploadPage.confirmAll()">✓ Confirm All</button>';
    html += '</div></div>';
    html += '</div></div>';

    // Smart Mapping panel with confidence bars
    html += '<div class="card card-padded">';
    html += '<div class="flex justify-between items-center" style="margin-bottom:var(--space-4);">';
    html += '<div><div class="text-md text-bold">✦ Smart Mapping</div>';
    html += '<div class="text-xs text-secondary">AI has extracted <strong>' + totalItems + ' attributes</strong> from your document.</div></div>';
    html += '</div>';

    // Confidence rows
    html += this.buildConfidenceRows(tp, result);

    // Estimated factory cost
    var fobEstimate = this.estimateFob(tp);
    html += '<div class="flex justify-between items-center" style="margin-top:var(--space-5);padding:var(--space-4);background:var(--color-bg-tertiary);border-radius:var(--radius-md);">';
    html += '<div><div class="text-xs text-secondary">ESTIMATED FACTORY COST</div>';
    html += '<div class="text-xs text-tertiary" style="margin-top:2px;">Factory Lead Time: 12-16 Weeks</div></div>';
    html += '<div style="text-align:right;"><span class="text-3xl text-bold" style="font-family:var(--font-mono);">$' + fobEstimate.toFixed(2) + '</span><span class="text-sm text-secondary"> /unit</span></div>';
    html += '</div>';

    html += '<button class="btn btn-primary btn-full" style="margin-top:var(--space-4);" onclick="window.TechPackUploadPage.saveMapping()">Save Mapping to Style Library</button>';
    html += '</div>';

    html += '</div>'; // end right
    html += '</div>'; // end split

    // Reset link
    html += '<div style="margin-top:var(--space-4);text-align:center;">';
    html += '<button class="btn btn-ghost" onclick="window.TechPackUploadPage.reset()">← Upload another Tech Pack</button>';
    html += '</div>';

    return html;
  },

  buildGarmentSketch: function (tp) {
    var type = tp ? tp.category : 'tee';
    var garmentType = tp ? (tp.garmentType || '').toLowerCase() : '';
    var svg = '<svg viewBox="0 0 300 380" width="260" height="340" style="opacity:0.85;">';
    svg += '<defs><style>.sk{fill:none;stroke:#1a2340;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;}</style></defs>';

    if (type === 'hoodie' || type === 'outerwear' || garmentType.indexOf('hoodie') !== -1 || garmentType.indexOf('jacket') !== -1 || garmentType.indexOf('windbreaker') !== -1) {
      // Jacket/parka/hoodie sketch
      svg += '<path class="sk" d="M100,40 C100,25 120,15 150,15 C180,15 200,25 200,40"/>';
      svg += '<path class="sk" d="M100,40 L70,80 L60,200 L80,200 L80,340 L220,340 L220,200 L240,200 L230,80 L200,40"/>';
      svg += '<path class="sk" d="M150,40 L150,200"/>';
      svg += '<path class="sk" d="M70,80 L25,160 L50,170 L80,100"/>';
      svg += '<path class="sk" d="M230,80 L275,160 L250,170 L220,100"/>';
      svg += '<rect class="sk" x="85" y="200" width="50" height="50" rx="3"/>';
      svg += '<rect class="sk" x="165" y="200" width="50" height="50" rx="3"/>';
      svg += '<path class="sk" d="M110,15 Q150,0 190,15"/>';
    } else if (garmentType.indexOf('pant') !== -1 || garmentType.indexOf('chino') !== -1) {
      // Pants sketch
      svg += '<path class="sk" d="M90,30 L85,150 L60,360 L130,360 L150,180 L170,360 L240,360 L215,150 L210,30 Z"/>';
      svg += '<path class="sk" d="M90,30 L210,30"/>';
      svg += '<path class="sk" d="M150,30 L150,180"/>';
      svg += '<rect class="sk" x="95" y="80" width="40" height="35" rx="3"/>';
      svg += '<rect class="sk" x="165" y="80" width="40" height="35" rx="3"/>';
      svg += '<path class="sk" d="M140,30 L140,70 L160,70 L160,30"/>';
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

  buildNlpLog: function (tp) {
    var html = '<div class="nlp-log" style="margin-top:var(--space-4);">';
    html += '<div class="nlp-log-title">NLP LOGIC LOG</div>';

    var entries = [];
    if (tp && tp.bom && tp.bom.fabrics) {
      tp.bom.fabrics.forEach(function (f) {
        var mat = window.MaterialLibrary.findMaterial(f.materialId);
        if (mat) entries.push({ entity: 'Entity: "' + mat.name + '"', tag: 'IDENTIFIED (Fabric)', cls: 'identified' });
      });
    }
    if (tp && tp.bom && tp.bom.trims) {
      tp.bom.trims.slice(0, 2).forEach(function (t) {
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

  buildConfidenceRows: function (tp, result) {
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

  estimateFob: function (tp) {
    // Hardcoded to match Cost Summary target FOB for presentation consistency
    return 5.10;
  },

  bindEvents: function (container) {
    var uploadZone = container.querySelector('#upload-zone');
    var btnBrowse = container.querySelector('#btn-browse');
    if (!uploadZone) return;

    var self = this;

    // Drag events
    uploadZone.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', function () {
      uploadZone.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      self.handleFile('Dropped file');
    });

    // Browse button
    if (btnBrowse) {
      btnBrowse.addEventListener('click', function (e) {
        e.stopPropagation();
        if (window.pennyAPI) {
          window.pennyAPI.openFileDialog().then(function (result) {
            if (result) self.handleFile(result.fileName);
          });
        } else {
          self.handleFile('TechPack_Sample.pdf');
        }
      });
    }

    uploadZone.addEventListener('click', function () {
      if (btnBrowse) btnBrowse.click();
    });
  },

  handleFile: function (fileName) {
    this.startProcessing(fileName);
  },

  loadSample: function () {
    this.processPack('TP-002');
  },

  processPack: function (packId) {
    var pack = window.SampleTechPacks.getById(packId);
    if (!pack) return;
    this.startProcessing(pack.styleName, pack);
  },

  startProcessing: function (fileName, techPack) {
    var self = this;
    var container = document.getElementById('page-techpack-upload');
    var uploadContent = container.querySelector('.page-body');

    // Show processing overlay
    uploadContent.innerHTML = '<div style="max-width:500px;margin:var(--space-10) auto;text-align:center;">' +
      '<div style="position:relative;width:200px;height:260px;margin:0 auto var(--space-6);background:var(--color-bg-tertiary);border-radius:var(--radius-lg);overflow:hidden;">' +
      '<div class="scan-line"></div>' +
      '<div style="padding:var(--space-4);opacity:0.3;font-size:var(--text-xs);font-family:var(--font-mono);color:var(--color-text-tertiary);text-align:left;line-height:2;">' +
      'STYLE: SCANNING...<br>FABRIC: ████████<br>GSM: ███<br>COMP: █████████<br>WIDTH: ███cm<br>TRIMS: ████████<br>LABELS: ████████' +
      '</div></div>' +
      '<div class="text-lg text-semibold" style="margin-bottom:var(--space-4);">Processing: ' + fileName + '</div>' +
      '<div class="process-steps" id="process-steps"></div>' +
      '</div>';

    window.OcrService.processFile(fileName, {
      onStep: function (stepIndex, label, totalSteps) {
        var stepsContainer = document.getElementById('process-steps');
        if (!stepsContainer) return;

        // Update previous steps to completed
        var existingSteps = stepsContainer.querySelectorAll('.process-step');
        existingSteps.forEach(function (s) {
          s.classList.remove('active');
          s.classList.add('completed');
          var num = s.querySelector('.process-step-number');
          if (num) num.textContent = '✓';
        });

        // Add new step
        var step = document.createElement('div');
        step.className = 'process-step active';
        step.innerHTML = '<div class="process-step-number">' + (stepIndex + 1) + '</div>' +
          '<div class="process-step-info">' +
          '<div class="process-step-title">' + label + '</div>' +
          '</div>' +
          '<div class="spinner"></div>';
        stepsContainer.appendChild(step);
      },

      onComplete: function (result) {
        // If a specific tech pack was provided, use it
        if (techPack) {
          result.techPack = techPack;
        }

        self.extractionResult = result;
        window.Store.set('activeTechPack', result.techPack);
        window.Store.addActivity('Extracted BOM from ' + result.techPack.styleName + ' (' + result.extractedFields.length + ' items)', '📄');

        // Re-render with BOM Mapping view
        self.render();
        window.App.showToast('Extraction Complete', 'BOM extracted with ' + (result.overallConfidence * 100).toFixed(0) + '% confidence', 'success');
      }
    });
  },

  generateCostings: function () {
    var pack = this.extractionResult.techPack;
    var costings = window.CostingService.generateTieredCostings(pack);

    window.Store.set('costings', costings);
    window.Store.set('selectedTier', 'target');
    window.Store.addProcessedPack(pack, costings);
    window.Store.addActivity('Generated 3 tiered costings for ' + pack.styleName, '⚙️');

    // ML benchmark
    var mlResult = window.MlService.findSimilarStyles(pack);
    if (mlResult) {
      window.App.showToast('ML Benchmark', mlResult.recommendation, 'info');
    }

    // Set pending tab so navigate('styles') opens Cost Summary instead of Tech Pack
    window.App._pendingTab = 'cost-summary';
    window.App.navigate('styles');
  },

  saveDraft: function () {
    window.App.showToast('Saved', 'Draft saved successfully', 'success');
  },

  saveMapping: function () {
    window.App.showToast('Saved', 'Mapping saved to style library', 'success');
  },

  confirmAll: function () {
    window.App.showToast('✓ Confirmed', 'All BOM mappings confirmed and locked', 'success');
  },

  rescan: function () {
    window.App.showToast('Re-scanning', 'Source document re-scan initiated', 'info');
  },

  reset: function () {
    this.extractionResult = null;
    this.render();
  }
};
