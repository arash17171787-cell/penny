// ═══════════════════════════════════════════════════════════════
// PENNY — Historical Data (3 seasons of costing history)
// ═══════════════════════════════════════════════════════════════

window.HistoricalData = {
  seasons: ['SS24', 'FW24', 'SS25'],

  costings: [
    { id:'HC-001', style:'Basic Crew Neck Tee', season:'SS24', templateId:'TPL-001', fabricId:'FAB-001', factory:'India', fob:4.85, materialCost:2.10, laborCost:0.42, overhead:0.53, margin:1.80, orderQty:5000, actualFob:4.92 },
    { id:'HC-002', style:'Basic Crew Neck Tee', season:'FW24', templateId:'TPL-001', fabricId:'FAB-002', factory:'India', fob:5.20, materialCost:2.35, laborCost:0.42, overhead:0.55, margin:1.88, orderQty:4500, actualFob:5.15 },
    { id:'HC-003', style:'Basic Crew Neck Tee', season:'SS25', templateId:'TPL-001', fabricId:'FAB-001', factory:'Bangladesh', fob:4.55, materialCost:2.05, laborCost:0.30, overhead:0.40, margin:1.80, orderQty:6000, actualFob:null },
    { id:'HC-004', style:'Polo Shirt', season:'SS24', templateId:'TPL-003', fabricId:'FAB-002', factory:'Vietnam', fob:7.80, materialCost:3.40, laborCost:0.88, overhead:0.82, margin:2.70, orderQty:3000, actualFob:7.95 },
    { id:'HC-005', style:'Polo Shirt', season:'FW24', templateId:'TPL-003', fabricId:'FAB-004', factory:'Vietnam', fob:7.20, materialCost:3.10, laborCost:0.88, overhead:0.72, margin:2.50, orderQty:3500, actualFob:7.30 },
    { id:'HC-006', style:'Pullover Hoodie', season:'FW24', templateId:'TPL-004', fabricId:'FAB-005', factory:'China', fob:12.50, materialCost:5.80, laborCost:1.54, overhead:1.36, margin:3.80, orderQty:2000, actualFob:12.80 },
    { id:'HC-007', style:'Pullover Hoodie', season:'SS25', templateId:'TPL-004', fabricId:'FAB-005', factory:'Bangladesh', fob:11.20, materialCost:5.60, laborCost:0.70, overhead:0.90, margin:4.00, orderQty:2500, actualFob:null },
    { id:'HC-008', style:'Zip-Up Hoodie', season:'FW24', templateId:'TPL-005', fabricId:'FAB-005', factory:'China', fob:14.80, materialCost:6.50, laborCost:1.93, overhead:1.87, margin:4.50, orderQty:1500, actualFob:15.10 },
    { id:'HC-009', style:'Jogger Pants', season:'SS24', templateId:'TPL-006', fabricId:'FAB-005', factory:'India', fob:9.60, materialCost:4.50, laborCost:0.88, overhead:0.92, margin:3.30, orderQty:3000, actualFob:9.75 },
    { id:'HC-010', style:'Jogger Pants', season:'FW24', templateId:'TPL-006', fabricId:'FAB-006', factory:'India', fob:9.90, materialCost:4.70, laborCost:0.88, overhead:0.92, margin:3.40, orderQty:2800, actualFob:9.85 },
    { id:'HC-011', style:'Chino Pants', season:'SS24', templateId:'TPL-007', fabricId:'FAB-009', factory:'Turkey', fob:13.40, materialCost:5.20, laborCost:1.92, overhead:1.78, margin:4.50, orderQty:2000, actualFob:13.60 },
    { id:'HC-012', style:'Denim Jacket', season:'FW24', templateId:'TPL-008', fabricId:'FAB-010', factory:'Pakistan', fob:18.50, materialCost:8.40, laborCost:1.26, overhead:1.84, margin:7.00, orderQty:1000, actualFob:18.90 },
    { id:'HC-013', style:'Oxford Shirt', season:'SS24', templateId:'TPL-009', fabricId:'FAB-008', factory:'India', fob:8.90, materialCost:3.20, laborCost:1.05, overhead:0.85, margin:3.80, orderQty:3000, actualFob:8.85 },
    { id:'HC-014', style:'Oxford Shirt', season:'FW24', templateId:'TPL-009', fabricId:'FAB-008', factory:'Vietnam', fob:9.50, materialCost:3.20, laborCost:1.20, overhead:0.90, margin:4.20, orderQty:2500, actualFob:9.55 },
    { id:'HC-015', style:'Windbreaker', season:'SS25', templateId:'TPL-010', fabricId:'FAB-013', factory:'China', fob:15.00, materialCost:5.80, laborCost:2.09, overhead:2.11, margin:5.00, orderQty:1500, actualFob:null },
    { id:'HC-016', style:'V-Neck Tee', season:'SS24', templateId:'TPL-002', fabricId:'FAB-001', factory:'Bangladesh', fob:4.60, materialCost:2.00, laborCost:0.33, overhead:0.42, margin:1.85, orderQty:8000, actualFob:4.55 },
    { id:'HC-017', style:'V-Neck Tee', season:'SS25', templateId:'TPL-002', fabricId:'FAB-003', factory:'India', fob:6.80, materialCost:3.60, laborCost:0.46, overhead:0.54, margin:2.20, orderQty:4000, actualFob:null },
  ],

  findSimilar: function(templateId) {
    return this.costings.filter(function(c) { return c.templateId === templateId; });
  },

  getAverageFob: function(templateId) {
    var similar = this.findSimilar(templateId);
    if (similar.length === 0) return null;
    var sum = similar.reduce(function(a, b) { return a + b.fob; }, 0);
    return sum / similar.length;
  },

  getLatest: function(templateId) {
    var similar = this.findSimilar(templateId);
    return similar.length > 0 ? similar[similar.length - 1] : null;
  },

  getCostTrend: function() {
    var seasons = this.seasons;
    return seasons.map(function(s) {
      var items = window.HistoricalData.costings.filter(function(c) { return c.season === s; });
      var avg = items.length > 0 ? items.reduce(function(a,b) { return a + b.fob; }, 0) / items.length : 0;
      return { season: s, avgFob: Math.round(avg * 100) / 100, styleCount: items.length };
    });
  },

  getAccuracy: function() {
    var withActual = this.costings.filter(function(c) { return c.actualFob !== null; });
    return withActual.map(function(c) {
      return {
        style: c.style,
        season: c.season,
        estimated: c.fob,
        actual: c.actualFob,
        variance: Math.round((c.actualFob - c.fob) * 100) / 100,
        variancePct: Math.round(((c.actualFob - c.fob) / c.fob) * 10000) / 100
      };
    });
  }
};
