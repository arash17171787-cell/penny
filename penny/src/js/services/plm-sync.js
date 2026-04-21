// ═══════════════════════════════════════════════════════════════
// PENNY — PLM Sync Service (Simulated)
// ═══════════════════════════════════════════════════════════════

window.PlmSync = {
  connected: true,
  lastSync: new Date(),
  syncInterval: null,

  init: function() {
    var self = this;
    // Simulate periodic sync checks
    this.syncInterval = setInterval(function() {
      self.lastSync = new Date();
      self.dispatchEvent('sync', { time: self.lastSync });
    }, 30000);
  },

  getStatus: function() {
    return {
      connected: this.connected,
      lastSync: this.lastSync,
      timeSinceSync: Math.round((Date.now() - this.lastSync.getTime()) / 1000)
    };
  },

  // Simulate a PLM fabric change notification
  simulateFabricChange: function(techPackId, fabricIndex, newFabricId) {
    var pack = window.SampleTechPacks.getById(techPackId);
    if (pack && pack.bom.fabrics[fabricIndex]) {
      var oldFabricId = pack.bom.fabrics[fabricIndex].materialId;
      pack.bom.fabrics[fabricIndex].materialId = newFabricId;

      this.dispatchEvent('fabric-changed', {
        techPackId: techPackId,
        styleName: pack.styleName,
        oldFabricId: oldFabricId,
        newFabricId: newFabricId,
        oldFabric: window.MaterialLibrary.findMaterial(oldFabricId),
        newFabric: window.MaterialLibrary.findMaterial(newFabricId),
        timestamp: new Date()
      });
    }
  },

  // Export costing back to PLM
  exportToPlm: function(techPackId, costing) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve({
          success: true,
          message: 'Costing exported to PLM successfully',
          plmReference: 'PLM-' + Date.now().toString(36).toUpperCase(),
          exportedAt: new Date()
        });
      }, 1500);
    });
  },

  listeners: {},

  on: function(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },

  dispatchEvent: function(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(function(cb) { cb(data); });
    }
  },

  destroy: function() {
    if (this.syncInterval) clearInterval(this.syncInterval);
  }
};
