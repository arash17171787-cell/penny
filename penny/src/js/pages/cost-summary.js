// ═══════════════════════════════════════════════════════════════
// PENNY — Cost Summary Page (Tab Content)
// Men's Polo Shirt - MP04 with $4.20 / $5.10 / $6.80 FOBs
// Shows the 3 tiered cost cards + AI recommendation
// ═══════════════════════════════════════════════════════════════

window.CostSummaryPage = {
  render: function() {
    var container = document.getElementById('page-cost-summary');
    if (!container) return;

    var techPack = window.Store.get('activeTechPack');

    // Always use the mockup costings for the Cost Summary view
    // (Store costings from CostingService may have different structure)
    if (!techPack) {
      techPack = window.SampleTechPacks.packs[0];
      window.Store.set('activeTechPack', techPack);
    }

    var costings = this.getMockupCostings();

    container.innerHTML = this.buildHeader(techPack) +
      '<div class="page-body">' + this.buildContent(techPack, costings) + '</div>';
  },

  // Hardcoded values matching the presentation mockup exactly
  getMockupCostings: function() {
    return {
      budget: {
        fob: 4.20, materialCost: 2.15, laborCost: 0.85,
        overhead: 0.35, margin: 0.40, marginPct: 0.10,
        factory: 'Bangladesh', tier: 'budget', label: 'Budget',
        trimsCost: 0.45, laborMinutes: 12,
        lines: [
          { label: 'Fabric (Budget Cotton)', value: 2.15 },
          { label: 'Trims & Thread', value: 0.45 },
          { label: 'Labor (High Yield)', value: 0.85 },
          { label: 'Washing/Dyeing', value: 0.35 }
        ],
        marginLabel: 'Net Margin (10%)', marginValue: 0.40
      },
      target: {
        fob: 5.10, materialCost: 2.65, laborCost: 0.95,
        overhead: 0.45, margin: 0.45, marginPct: 0.09,
        factory: 'India', tier: 'target', label: 'Target',
        trimsCost: 0.60, laborMinutes: 12,
        lines: [
          { label: 'Fabric (Pima Blend)', value: 2.65 },
          { label: 'Trims (Branded)', value: 0.60 },
          { label: 'Labor (Standard)', value: 0.95 },
          { label: 'Washing/Dyeing', value: 0.45 }
        ],
        marginLabel: 'Net Margin (9%)', marginValue: 0.45
      },
      premium: {
        fob: 6.80, materialCost: 3.90, laborCost: 1.20,
        overhead: 0.55, margin: 0.30, marginPct: 0.05,
        factory: 'Vietnam', tier: 'premium', label: 'Premium',
        trimsCost: 0.85, laborMinutes: 12,
        lines: [
          { label: 'Fabric (Organic GOTS)', value: 3.90 },
          { label: 'Trims (Recycled)', value: 0.85 },
          { label: 'Labor (Premium)', value: 1.20 },
          { label: 'Eco-Washing', value: 0.55 }
        ],
        marginLabel: 'Net Margin (5%)', marginValue: 0.30
      }
    };
  },

  buildHeader: function(tp) {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<div class="flex items-center gap-3" style="margin-bottom:2px;">' +
      '<span class="text-xs text-secondary" style="letter-spacing:0.05em;">COST SUMMARY</span>' +
      '<span class="tag tag-info">' + (tp ? tp.styleNumber : 'MP04') + '</span>' +
      '</div>' +
      '<h1 class="page-title">' + (tp ? tp.styleName + ' - ' + tp.styleNumber : "Men's Polo Shirt - MP04") + '</h1>' +
      '<div class="flex items-center gap-3 text-sm" style="margin-top:4px;">' +
      '<span>Historical Benchmark: <strong>SS24 Basic Tee ($5.05)</strong></span>' +
      '<span class="tag" style="background:#e0f2fe;color:#0284c7;font-size:10px;font-weight:700;letter-spacing:0.04em;">COSTING PHASE: MAGIC STEP</span>' +
      '</div>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<button class="btn btn-secondary">Comparison View</button>' +
      '<button class="btn btn-secondary">List View</button>' +
      '</div></div>';
  },

  buildContent: function(tp, costings) {
    var html = '';

    // 3 Cost Cards
    html += '<div class="cost-cards-grid" style="margin-bottom:var(--space-6);">';
    html += this.buildCostCard(costings.budget, 'budget');
    html += this.buildCostCard(costings.target, 'target');
    html += this.buildCostCard(costings.premium, 'premium');
    html += '</div>';

    // Bottom: Recommendation + Finalize
    html += '<div style="display:grid;grid-template-columns:1fr 280px;gap:var(--space-5);">';
    html += this.buildRecommendation(tp);
    html += this.buildFinalizePanel();
    html += '</div>';

    return html;
  },

  buildCostCard: function(costing, tier) {
    var cfg = {
      budget: {
        option: 'Option A',
        subtitle: 'Budget Optimization',
        badge: '<span class="cost-card-badge badge-efficiency">EFFICIENCY FOCUS</span>',
        breakdownLabel: 'VISUAL COST BREAKDOWN',
        breakdownExtra: '',
        barColors: { fabric: 55, trims: 12, labor: 20, other: 13 },
        tradeoff: '<div class="cost-card-info info-tradeoff"><div class="info-title">Trade-offs:</div>Uses 160gsm carded cotton instead of combed. Simplified 2-button placket to reduce labor time.</div>'
      },
      target: {
        option: 'Option B',
        subtitle: 'Standard Tech Pack',
        badge: '<span class="cost-card-badge badge-target">TARGET SPEC</span>',
        breakdownLabel: 'VISUAL COST BREAKDOWN',
        breakdownExtra: '<span style="float:right;font-size:10px;color:var(--color-text-tertiary);">OPTIMAL</span>',
        barColors: { fabric: 50, trims: 14, labor: 22, other: 14 },
        tradeoff: '<div class="cost-card-info info-match"><div class="info-title">Match Accuracy:</div>100% Alignment with Tech Pack MP04-V2. Closest match to historical SS24 benchmarking.</div>'
      },
      premium: {
        option: 'Option C',
        subtitle: 'Luxury / ESG Path',
        badge: '<span class="cost-card-badge badge-sustainable">SUSTAINABLE</span>',
        breakdownLabel: 'VISUAL COST BREAKDOWN',
        breakdownExtra: '<span style="float:right;font-size:10px;color:var(--color-text-tertiary);">PREMIUM LEAD</span>',
        barColors: { fabric: 58, trims: 12, labor: 18, other: 12 },
        tradeoff: '<div class="cost-card-info info-esg"><div class="info-title">ESG Impact:</div>Uses certified sustainable fabrics and biodegradable buttons. Reduced water consumption by 40%.</div>'
      }
    };

    var c = cfg[tier];
    var html = '<div class="cost-card ' + tier + '">';

    // Top row
    html += '<div class="cost-card-top">';
    html += '<span class="cost-card-option">' + c.option + '</span>';
    html += c.badge;
    html += '</div>';
    html += '<div class="cost-card-subtitle">' + c.subtitle + '</div>';

    // FOB value
    html += '<div style="margin:var(--space-3) 0;">';
    html += '<span class="cost-card-value">$' + costing.fob.toFixed(2) + '</span>';
    html += '<span class="cost-card-value-sub"> FOB / Unit</span>';
    html += '</div>';

    // Visual cost breakdown bar
    html += '<div class="visual-breakdown">';
    html += '<div class="visual-breakdown-label">' + c.breakdownLabel + c.breakdownExtra + '</div>';
    html += '<div class="visual-breakdown-bar">';
    html += '<div class="vb-fabric" style="width:' + c.barColors.fabric + '%;"></div>';
    html += '<div class="vb-trims" style="width:' + c.barColors.trims + '%;"></div>';
    html += '<div class="vb-labor" style="width:' + c.barColors.labor + '%;"></div>';
    html += '<div class="vb-other" style="width:' + c.barColors.other + '%;"></div>';
    html += '</div>';
    html += '<div class="visual-breakdown-legend">';
    html += '<div class="vb-legend-item"><div class="vb-legend-dot vb-fabric-dot"></div>Fabric</div>';
    html += '<div class="vb-legend-item"><div class="vb-legend-dot vb-trims-dot"></div>Trims</div>';
    html += '<div class="vb-legend-item"><div class="vb-legend-dot vb-labor-dot"></div>Labor</div>';
    html += '<div class="vb-legend-item"><div class="vb-legend-dot vb-other-dot"></div>Other</div>';
    html += '</div></div>';

    // Line items from mockup
    html += '<div class="cost-card-breakdown">';
    costing.lines.forEach(function(line) {
      html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">' + line.label + '</span><span class="cost-breakdown-value">$' + line.value.toFixed(2) + '</span></div>';
    });
    html += '</div>';

    // Net margin
    html += '<div class="cost-breakdown-row" style="padding-top:var(--space-2);border-top:1px solid var(--color-divider);">';
    html += '<span class="cost-breakdown-label">' + costing.marginLabel + '</span>';
    html += '<span class="cost-breakdown-value">$' + costing.marginValue.toFixed(2) + '</span>';
    html += '</div>';

    // Trade-off / info box
    html += c.tradeoff;

    // Action button
    html += '<div class="cost-card-actions">';
    if (tier === 'target') {
      html += '<button class="cost-card-btn primary" onclick="window.CostSummaryPage.selectOption(\'target\')">Select for Simulation</button>';
    } else {
      html += '<button class="cost-card-btn" onclick="window.CostSummaryPage.selectOption(\'' + tier + '\')">Select ' + c.option + '</button>';
    }
    html += '</div>';

    html += '</div>';
    return html;
  },

  buildRecommendation: function(tp) {
    var html = '<div class="recommendation-card">';

    // Icon
    html += '<div class="recommendation-icon">';
    html += '<span class="recommendation-icon-star">✦</span>';
    html += '<span class="recommendation-icon-check">✓</span>';
    html += '</div>';

    // Body
    html += '<div class="recommendation-body">';
    html += '<div class="recommendation-header">';
    html += '<span class="recommendation-engine-label">AI OPTIMIZATION ENGINE</span>';
    html += '<span class="recommendation-data-label">Analyzed 1.2K data points</span>';
    html += '</div>';

    html += '<div class="recommendation-title">Penny\'s Recommendation</div>';

    html += '<div class="recommendation-text">';
    html += 'Based on your <strong>SS24 volume forecast (45,000 units)</strong>, <u>Option B</u> offers the highest probability of hitting regional target margins. ';
    html += 'This choice mitigates the supply chain risk associated with Option A\'s eyehouse while maintaining a <strong>9% net margin</strong> within your specified quality threshold.';
    html += '</div>';

    html += '<div class="recommendation-footer">';
    html += '<a class="recommendation-link" onclick="window.App.navigate(\'reports\')">VIEW FULL DATA ANALYSIS →</a>';
    html += '<div class="recommendation-metrics">';
    html += '<div class="recommendation-metric"><div class="recommendation-metric-label">RISK LEVEL</div><div class="recommendation-metric-value">Low</div></div>';
    html += '<div class="recommendation-metric"><div class="recommendation-metric-label">CONFIDENCE</div><div class="recommendation-metric-value">94%</div></div>';
    html += '</div>';
    html += '</div></div></div>';
    return html;
  },

  buildFinalizePanel: function() {
    var html = '<div class="finalize-panel">';
    html += '<div class="finalize-title">Finalize Decision</div>';
    html += '<div class="finalize-desc">Sync selected cost configuration back to PLM system for production approval and tech pack lock.</div>';
    html += '<button class="btn btn-export btn-full" style="margin-bottom:var(--space-3);" onclick="window.App.showToast(\'Exported\',\'Cost configuration pushed to PLM\',\'success\')">Export Choice to PLM</button>';
    html += '<button class="btn btn-dark btn-full" onclick="window.App.showToast(\'Sent\',\'Selection emailed to vendor\',\'success\')">Email Selection to Vendor</button>';
    html += '</div>';
    return html;
  },

  selectOption: function(tier) {
    window.Store.set('selectedTier', tier);
    window.App.showToast('Selected', 'Option ' + tier.charAt(0).toUpperCase() + tier.slice(1) + ' selected for simulation', 'success');
  }
};
