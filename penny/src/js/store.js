// ═══════════════════════════════════════════════════════════════
// PENNY — State Store
// Centralized state management
// ═══════════════════════════════════════════════════════════════

window.Store = {
  state: {
    currentPage: 'dashboard',
    activeTechPack: null,
    costings: null,
    selectedTier: null,
    recentActivity: [],
    notifications: [],
    plmSyncStatus: 'connected',
    supplierQuotes: [
      { id: 'SQ-001', supplier: 'Alok Industries', material: 'Cotton Jersey 160gsm', quotedPrice: 3.55, date: '2025-11-01', status: 'active' },
      { id: 'SQ-002', supplier: 'Vardhman Textiles', material: 'Poly-Cotton Blend 180gsm', quotedPrice: 2.80, date: '2025-11-03', status: 'active' },
      { id: 'SQ-003', supplier: 'YKK', material: 'Metal Zipper #5', quotedPrice: 0.82, date: '2025-10-28', status: 'pending' },
      { id: 'SQ-004', supplier: 'Luthai Textile', material: 'French Terry 280gsm', quotedPrice: 5.30, date: '2025-11-05', status: 'active' },
      { id: 'SQ-005', supplier: 'Artistic Milliners', material: 'Denim 11oz', quotedPrice: 5.65, date: '2025-10-30', status: 'expired' },
    ],
    processedTechPacks: []
  },

  listeners: {},

  get: function(key) {
    return this.state[key];
  },

  set: function(key, value) {
    this.state[key] = value;
    this.notify(key, value);
  },

  on: function(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
  },

  off: function(key, callback) {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key].filter(function(cb) { return cb !== callback; });
    }
  },

  notify: function(key, value) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(function(cb) { cb(value); });
    }
  },

  addActivity: function(text, icon) {
    this.state.recentActivity.unshift({
      text: text,
      icon: icon || '📋',
      time: new Date()
    });
    if (this.state.recentActivity.length > 20) {
      this.state.recentActivity.pop();
    }
    this.notify('recentActivity', this.state.recentActivity);
  },

  addProcessedPack: function(pack, costings) {
    this.state.processedTechPacks.push({
      techPack: pack,
      costings: costings,
      processedAt: new Date()
    });
    this.notify('processedTechPacks', this.state.processedTechPacks);
  }
};
