// ═══════════════════════════════════════════════════════════════
// PENNY — Yield Service (Marker Efficiency & Waste Prediction)
// ═══════════════════════════════════════════════════════════════

window.YieldService = {
  // Complexity-based marker efficiency estimates
  efficiencyByComplexity: {
    simple: { min: 82, max: 88, avg: 85 },
    moderate: { min: 76, max: 83, avg: 80 },
    complex: { min: 68, max: 78, avg: 74 }
  },

  // Calculate marker efficiency and fabric wastage
  calculateYield: function(techPack, options) {
    var template = window.StyleTemplates.findTemplate(techPack.templateId);
    var complexity = template ? template.complexity : 'moderate';
    var effRange = this.efficiencyByComplexity[complexity];

    // Simulate efficiency with slight randomness
    var efficiency = effRange.avg + (Math.random() * 4 - 2);
    efficiency = Math.max(effRange.min, Math.min(effRange.max, efficiency));
    efficiency = Math.round(efficiency * 10) / 10;

    var wastePct = 100 - efficiency;

    // Calculate impact on fabric cost
    var fabricCost = 0;
    var totalFabricConsumption = 0;
    if (techPack.bom && techPack.bom.fabrics) {
      techPack.bom.fabrics.forEach(function(f) {
        var mat = window.MaterialLibrary.findMaterial(f.materialId);
        if (mat) {
          fabricCost += mat.unitPrice * f.consumption;
          totalFabricConsumption += f.consumption;
        }
      });
    }

    var wasteAdditionalCost = Math.round(fabricCost * (wastePct / 100) * 100) / 100;
    var adjustedFabricCost = Math.round((fabricCost + wasteAdditionalCost) * 100) / 100;

    return {
      complexity: complexity,
      markerEfficiency: efficiency,
      wastePct: Math.round(wastePct * 10) / 10,
      fabricConsumption: Math.round(totalFabricConsumption * 100) / 100,
      baseFabricCost: Math.round(fabricCost * 100) / 100,
      wasteCost: wasteAdditionalCost,
      adjustedFabricCost: adjustedFabricCost,
      landedCostImpact: wasteAdditionalCost,
      recommendation: this.getRecommendation(efficiency, complexity)
    };
  },

  getRecommendation: function(efficiency, complexity) {
    if (efficiency >= 85) {
      return 'Excellent marker efficiency. Layout is well-optimized.';
    } else if (efficiency >= 78) {
      return 'Good efficiency. Consider nesting smaller components to reduce waste.';
    } else if (efficiency >= 72) {
      return 'Moderate efficiency. Asymmetric panels may benefit from alternate layouts.';
    } else {
      return 'Low efficiency expected due to garment complexity. Consider fabric width optimization.';
    }
  },

  // Compare yield across different fabric widths
  compareWidths: function(techPack) {
    var widths = [140, 145, 150, 155, 160];
    var self = this;
    var template = window.StyleTemplates.findTemplate(techPack.templateId);
    var complexity = template ? template.complexity : 'moderate';

    return widths.map(function(w) {
      var effRange = self.efficiencyByComplexity[complexity];
      var efficiency = effRange.avg + (w - 150) * 0.15;
      efficiency = Math.max(effRange.min, Math.min(effRange.max + 2, efficiency));
      return {
        width: w,
        efficiency: Math.round(efficiency * 10) / 10,
        wastePct: Math.round((100 - efficiency) * 10) / 10
      };
    });
  }
};
