// ═══════════════════════════════════════════════════════════════
// PENNY — Supplier Portal Page
// ═══════════════════════════════════════════════════════════════

window.SupplierPortalPage = {
  render: function() {
    var container = document.getElementById('page-supplier-portal');
    container.innerHTML = this.buildHeader() + '<div class="page-body">' + this.buildContent() + '</div>';
  },

  buildHeader: function() {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">Supplier Portal</h1>' +
      '<p class="page-subtitle">Manage supplier quotes that auto-update tentative costings.</p>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<button class="btn btn-primary" onclick="window.SupplierPortalPage.addQuote()" id="btn-add-quote">+ New Quote</button>' +
      '</div>' +
      '</div>';
  },

  buildContent: function() {
    var html = '';
    var quotes = window.Store.get('supplierQuotes');

    // Stats
    html += '<div class="grid-3" style="margin-bottom:var(--space-6);">';
    html += '<div class="card stat-card hover-lift">';
    html += '<div class="stat-icon" style="background:var(--color-info-muted);color:var(--color-info);">🏭</div>';
    html += '<div class="stat-value">' + this.getUniqueSuppliers(quotes) + '</div>';
    html += '<div class="stat-label">Active Suppliers</div></div>';

    html += '<div class="card stat-card hover-lift">';
    html += '<div class="stat-icon" style="background:var(--color-success-muted);color:var(--color-success);"></div>';
    html += '<div class="stat-value">' + quotes.filter(function(q){return q.status==='active';}).length + '</div>';
    html += '<div class="stat-label">Active Quotes</div></div>';

    html += '<div class="card stat-card hover-lift">';
    html += '<div class="stat-icon" style="background:var(--color-warning-muted);color:var(--color-warning);">⏳</div>';
    html += '<div class="stat-value">' + quotes.filter(function(q){return q.status==='pending';}).length + '</div>';
    html += '<div class="stat-label">Pending Review</div></div>';
    html += '</div>';

    // Quotes table
    html += '<div class="card"><div class="table-container"><table>';
    html += '<thead><tr><th>ID</th><th>Supplier</th><th>Material</th><th>Quoted Price</th><th>vs Library</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>';
    html += '<tbody>';

    quotes.forEach(function(q) {
      var statusTag = q.status === 'active' ? 'tag-success' : (q.status === 'pending' ? 'tag-warning' : 'tag-error');
      // Find library price for comparison
      var libraryMat = window.MaterialLibrary.getAllMaterials().find(function(m) {
        return m.name.toLowerCase().indexOf(q.material.toLowerCase().split(' ')[0]) !== -1;
      });
      var diff = '';
      if (libraryMat) {
        var d = q.quotedPrice - libraryMat.unitPrice;
        diff = '<span class="mono ' + (d <= 0 ? 'text-success' : 'text-error') + '">' + (d <= 0 ? '' : '+') + '$' + d.toFixed(2) + '</span>';
      }

      html += '<tr>';
      html += '<td class="mono text-xs text-tertiary">' + q.id + '</td>';
      html += '<td class="text-semibold">' + q.supplier + '</td>';
      html += '<td>' + q.material + '</td>';
      html += '<td class="mono text-semibold">$' + q.quotedPrice.toFixed(2) + '</td>';
      html += '<td>' + (diff || '—') + '</td>';
      html += '<td class="text-secondary">' + q.date + '</td>';
      html += '<td><span class="tag ' + statusTag + '">' + q.status + '</span></td>';
      html += '<td>';
      if (q.status === 'pending') {
        html += '<button class="btn btn-sm btn-primary" onclick="window.SupplierPortalPage.acceptQuote(\'' + q.id + '\')">Accept</button> ';
      }
      html += '<button class="btn btn-sm btn-ghost" onclick="window.SupplierPortalPage.viewQuote(\'' + q.id + '\')">View</button>';
      html += '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div></div>';

    // Info box
    html += '<div class="card card-padded" style="margin-top:var(--space-6);border-color:var(--color-info);background:var(--color-info-muted);">';
    html += '<div class="text-md text-semibold" style="margin-bottom:var(--space-2);">📡 Auto-Update Integration</div>';
    html += '<div class="text-sm text-secondary">When suppliers submit new quotes, Penny automatically updates the material library prices and recalculates any active tentative costings. Buyers are notified instantly via the dashboard.</div>';
    html += '</div>';

    return html;
  },

  getUniqueSuppliers: function(quotes) {
    var suppliers = {};
    quotes.forEach(function(q) { suppliers[q.supplier] = true; });
    return Object.keys(suppliers).length;
  },

  acceptQuote: function(id) {
    var quotes = window.Store.get('supplierQuotes');
    var quote = quotes.find(function(q) { return q.id === id; });
    if (quote) {
      quote.status = 'active';
      window.Store.set('supplierQuotes', quotes);
      window.Store.addActivity('Accepted quote from ' + quote.supplier + ' for ' + quote.material, '');
      window.App.showToast('Quote Accepted', quote.supplier + ' — ' + quote.material + ' at $' + quote.quotedPrice.toFixed(2), 'success');
      this.render();
    }
  },

  viewQuote: function(id) {
    window.App.showToast('Quote Details', 'Detailed quote view coming in next release', 'info');
  },

  addQuote: function() {
    window.App.showToast('Add Quote', 'Supplier quote submission form coming in next release', 'info');
  }
};
