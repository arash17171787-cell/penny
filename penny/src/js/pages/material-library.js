// ═══════════════════════════════════════════════════════════════
// PENNY — Material Library Page
// Searchable centralized material database
// ═══════════════════════════════════════════════════════════════

window.MaterialLibraryPage = {
  activeCategory: null,
  searchQuery: '',

  render: function() {
    var container = document.getElementById('page-material-library');
    container.innerHTML = this.buildHeader() + '<div class="page-body">' + this.buildContent() + '</div>';
  },

  buildHeader: function() {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">Material Library</h1>' +
      '<p class="page-subtitle">Centralized material database with real-time pricing and supplier data.</p>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<span class="text-sm text-secondary">' + window.MaterialLibrary.getAllMaterials().length + ' materials</span>' +
      '</div>' +
      '</div>';
  },

  buildContent: function() {
    var self = this;
    var html = '';

    // Search & filter bar
    html += '<div class="flex gap-4 items-center" style="margin-bottom:var(--space-5);">';
    html += '<input type="text" class="input input-search" placeholder="Search materials, suppliers..." value="' + this.searchQuery + '" oninput="window.MaterialLibraryPage.onSearch(this.value)" style="flex:1;" id="material-search">';
    html += '<div class="flex gap-2">';
    var cats = [
      { key: null, label: 'All', icon: '' },
      { key: 'fabric', label: 'Fabrics', icon: '' },
      { key: 'trim', label: 'Trims', icon: '' },
      { key: 'label', label: 'Labels', icon: '' },
      { key: 'packaging', label: 'Packaging', icon: '' },
    ];
    cats.forEach(function(c) {
      var active = self.activeCategory === c.key;
      html += '<button class="btn btn-sm ' + (active ? 'btn-primary' : 'btn-secondary') + '" onclick="window.MaterialLibraryPage.setCategory(' + (c.key ? '\'' + c.key + '\'' : 'null') + ')">' + c.icon + ' ' + c.label + '</button>';
    });
    html += '</div></div>';

    // Materials table
    var materials = window.MaterialLibrary.searchMaterials(this.searchQuery, this.activeCategory);
    html += '<div class="card"><div class="table-container"><table>';
    html += '<thead><tr><th>ID</th><th>Material Name</th><th>Category</th><th>Unit Price</th><th>Supplier</th><th>Country</th><th>MOQ</th><th>Lead Time</th><th>Trend</th></tr></thead>';
    html += '<tbody>';

    materials.forEach(function(mat) {
      var catTag = mat.category === 'fabric' ? 'tag-fabric' : (mat.category === 'trim' ? 'tag-trim' : (mat.category === 'label' ? 'tag-label' : 'tag-packaging'));
      html += '<tr>';
      html += '<td class="mono text-xs text-tertiary">' + mat.id + '</td>';
      html += '<td class="text-semibold">' + mat.name + (mat.gsm ? ' <span class="text-xs text-tertiary">' + mat.gsm + 'gsm</span>' : '') + '</td>';
      html += '<td><span class="tag ' + catTag + '">' + mat.category + '</span></td>';
      html += '<td class="mono text-semibold">$' + mat.unitPrice.toFixed(2) + '<span class="text-xs text-tertiary">/' + mat.unit + '</span></td>';
      html += '<td class="text-secondary">' + (mat.supplier || '—') + '</td>';
      html += '<td class="text-secondary">' + (mat.supplierCountry || '—') + '</td>';
      html += '<td class="mono">' + (mat.moq ? mat.moq.toLocaleString() : '—') + '</td>';
      html += '<td class="mono">' + (mat.leadTime ? mat.leadTime + ' days' : '—') + '</td>';
      html += '<td>' + (mat.priceHistory ? self.miniSparkline(mat.priceHistory) : '—') + '</td>';
      html += '</tr>';
    });

    html += '</tbody></table></div></div>';

    return html;
  },

  miniSparkline: function(data) {
    if (!data || data.length < 2) return '';
    var w = 60, h = 20;
    var min = Math.min.apply(null, data);
    var max = Math.max.apply(null, data);
    var range = max - min || 1;
    var points = data.map(function(v, i) {
      var x = (i / (data.length - 1)) * w;
      var y = h - ((v - min) / range) * h;
      return x + ',' + y;
    }).join(' ');

    var trend = data[data.length - 1] <= data[0];
    var color = trend ? '%2322c55e' : '%23ef4444';
    return '<svg width="' + w + '" height="' + h + '" style="vertical-align:middle;">' +
      '<polyline points="' + points + '" fill="none" stroke="' + (trend ? '#22c55e' : '#ef4444') + '" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>';
  },

  onSearch: function(query) {
    this.searchQuery = query;
    var container = document.getElementById('page-material-library');
    var body = container.querySelector('.page-body');
    body.innerHTML = this.buildContent();
  },

  setCategory: function(cat) {
    this.activeCategory = cat;
    this.render();
  }
};
