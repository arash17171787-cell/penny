// ═══════════════════════════════════════════════════════════════
// PENNY — Style Templates Page
// ═══════════════════════════════════════════════════════════════

window.StyleTemplatesPage = {
  render: function() {
    var container = document.getElementById('page-style-templates');
    container.innerHTML = this.buildHeader() + '<div class="page-body">' + this.buildContent() + '</div>';
  },

  buildHeader: function() {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">Style Templates</h1>' +
      '<p class="page-subtitle">Pre-built garment templates auto-populate labor minutes, thread consumption, and standard BOMs.</p>' +
      '</div>' +
      '</div>';
  },

  buildContent: function() {
    var html = '';
    var categories = window.StyleTemplates.getCategories();

    categories.forEach(function(cat) {
      html += '<h2 class="text-lg text-semibold" style="margin-bottom:var(--space-4);margin-top:var(--space-6);">' + cat + '</h2>';
      html += '<div class="grid-3 stagger-enter">';

      var templates = window.StyleTemplates.getByCategory(cat);
      templates.forEach(function(tpl) {
        var complexity = tpl.complexity;
        var complexityTag = complexity === 'simple' ? 'tag-success' : (complexity === 'moderate' ? 'tag-warning' : 'tag-error');

        html += '<div class="card card-padded hover-lift">';
        html += '<div class="flex items-center gap-3" style="margin-bottom:var(--space-4);">';
        html += '<span style="font-size:36px;">' + tpl.icon + '</span>';
        html += '<div><div class="text-md text-semibold">' + tpl.name + '</div>';
        html += '<span class="tag ' + complexityTag + '">' + complexity + '</span></div></div>';

        html += '<div class="text-sm text-secondary" style="margin-bottom:var(--space-4);">' + tpl.description + '</div>';

        html += '<hr class="divider">';

        html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">Labor Minutes</span><span class="cost-breakdown-value">' + tpl.laborMinutes + ' min</span></div>';
        html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">Thread</span><span class="cost-breakdown-value">' + tpl.threadConsumption + 'm</span></div>';
        html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">Fabric</span><span class="cost-breakdown-value">' + tpl.fabricConsumption + 'm/pc</span></div>';

        var defaultFab = window.MaterialLibrary.findMaterial(tpl.defaultFabric);
        if (defaultFab) {
          html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">Default Fabric</span><span class="text-sm text-accent">' + defaultFab.name + '</span></div>';
        }

        html += '<div class="cost-breakdown-row"><span class="cost-breakdown-label">Trims</span><span class="cost-breakdown-value">' + tpl.defaultTrims.length + ' items</span></div>';

        // Quick estimate
        var mockPack = {
          templateId: tpl.id,
          factoryCountry: 'India',
          bom: {
            fabrics: [{ materialId: tpl.defaultFabric, consumption: tpl.fabricConsumption, placement: 'Body' }],
            trims: tpl.defaultTrims,
            packaging: tpl.defaultPackaging
          }
        };
        var estimate = window.CostingService.calcFob(mockPack);

        html += '<hr class="divider">';
        html += '<div class="flex justify-between items-center">';
        html += '<span class="text-sm text-secondary">Est. FOB (India)</span>';
        html += '<span class="currency-display text-lg text-accent">' + window.App.formatCurrency(estimate.fob) + '</span>';
        html += '</div>';

        html += '</div>'; // end card
      });

      html += '</div>';
    });

    // Pro tip
    html += '<div class="card card-padded" style="margin-top:var(--space-8);border-color:var(--color-accent-primary);background:var(--color-accent-primary-muted);">';
    html += '<div class="text-md text-semibold" style="margin-bottom:var(--space-2);">Pro Tip: Style Auto-Detection</div>';
    html += '<div class="text-sm text-secondary">When a designer tags a sketch as "Basic Crew Neck Tee" in the PLM, Penny automatically applies the matching template — pre-filling labor minutes, thread consumption, and standard trims. The buyer only needs to confirm the specific fabric price.</div>';
    html += '</div>';

    return html;
  }
};
