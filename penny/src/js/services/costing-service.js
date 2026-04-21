// ═══════════════════════════════════════════════════════════════
// PENNY — Costing Service (Core Calculation Engine)
// ═══════════════════════════════════════════════════════════════

window.CostingService = {
  // Calculate material cost for a single BOM line
  calcLineCost: function(materialId, consumption) {
    var mat = window.MaterialLibrary.findMaterial(materialId);
    if (!mat) return 0;
    return Math.round(mat.unitPrice * consumption * 100) / 100;
  },

  // Calculate total material cost from a tech pack's BOM
  calcMaterialCost: function(bom, priceMode) {
    var self = this;
    var total = 0;

    // Fabrics
    if (bom.fabrics) {
      bom.fabrics.forEach(function(f) {
        var mat = window.MaterialLibrary.findMaterial(f.materialId);
        if (mat) {
          var price = priceMode === 'contracted' ? (mat.contractedPrice || mat.unitPrice) : mat.unitPrice;
          total += price * f.consumption;
        }
      });
    }

    // Trims
    if (bom.trims) {
      bom.trims.forEach(function(t) {
        var mat = window.MaterialLibrary.findMaterial(t.materialId);
        if (mat) {
          total += mat.unitPrice * t.qty;
        }
      });
    }

    // Packaging
    if (bom.packaging) {
      bom.packaging.forEach(function(p) {
        var mat = window.MaterialLibrary.findMaterial(p.materialId);
        if (mat) {
          total += mat.unitPrice * p.qty;
        }
      });
    }

    return Math.round(total * 100) / 100;
  },

  // Calculate labor cost
  calcLaborCost: function(laborMinutes, factoryCountry) {
    var rates = window.MaterialLibrary.FACTORY_RATES[factoryCountry];
    if (!rates) rates = { laborRate: 0.04, overhead: 1.25 };
    return Math.round(laborMinutes * rates.laborRate * 100) / 100;
  },

  // Calculate overhead
  calcOverhead: function(materialCost, laborCost, factoryCountry) {
    var rates = window.MaterialLibrary.FACTORY_RATES[factoryCountry];
    if (!rates) rates = { laborRate: 0.04, overhead: 1.25 };
    var overheadRate = rates.overhead - 1; // e.g., 1.25 -> 0.25 = 25%
    return Math.round((materialCost + laborCost) * overheadRate * 100) / 100;
  },

  // Calculate full FOB
  calcFob: function(techPack, options) {
    options = options || {};
    var template = window.StyleTemplates.findTemplate(techPack.templateId);
    var laborMin = template ? template.laborMinutes : 20;
    var factory = options.factoryCountry || techPack.factoryCountry || 'India';
    var priceMode = options.priceMode || 'market';
    var marginPct = options.marginPct || 0.30;

    var materialCost = this.calcMaterialCost(techPack.bom, priceMode);
    var laborCost = this.calcLaborCost(laborMin, factory);
    var overhead = this.calcOverhead(materialCost, laborCost, factory);
    var subtotal = materialCost + laborCost + overhead;
    var margin = Math.round(subtotal * marginPct * 100) / 100;
    var fob = Math.round((subtotal + margin) * 100) / 100;

    return {
      materialCost: materialCost,
      laborCost: laborCost,
      overhead: overhead,
      margin: margin,
      fob: fob,
      subtotal: subtotal,
      laborMinutes: laborMin,
      factory: factory,
      marginPct: marginPct
    };
  },

  // Generate 3 tiered scenarios
  generateTieredCostings: function(techPack) {
    var self = this;
    var template = window.StyleTemplates.findTemplate(techPack.templateId);

    // TARGET: as specified in tech pack
    var target = this.calcFob(techPack, { priceMode: 'market', marginPct: 0.30 });
    target.tier = 'target';
    target.label = 'Target';
    target.description = 'Exactly as specified in the Tech Pack';

    // BUDGET: use contracted prices, cheapest factory, lower margin
    var budgetBom = this.createBudgetBom(techPack.bom);
    var budgetPack = Object.assign({}, techPack, { bom: budgetBom });
    var budgetFactory = 'Bangladesh';
    var budget = this.calcFob(budgetPack, { priceMode: 'contracted', factoryCountry: budgetFactory, marginPct: 0.25 });
    budget.tier = 'budget';
    budget.label = 'Budget';
    budget.description = 'Standard trims, high-yield layout, lowest cost factory';
    budget.swaps = this.getBudgetSwaps(techPack.bom, budgetBom);

    // PREMIUM: sustainable / brand-name alternatives, higher margin
    var premiumBom = this.createPremiumBom(techPack.bom);
    var premiumPack = Object.assign({}, techPack, { bom: premiumBom });
    var premium = this.calcFob(premiumPack, { priceMode: 'market', marginPct: 0.35 });
    premium.tier = 'premium';
    premium.label = 'Premium';
    premium.description = 'Brand-name zippers/buttons, sustainable fabric alternatives';
    premium.swaps = this.getPremiumSwaps(techPack.bom, premiumBom);

    return { budget: budget, target: target, premium: premium };
  },

  // Create budget BOM (swap to cheaper alternatives)
  createBudgetBom: function(originalBom) {
    var bom = JSON.parse(JSON.stringify(originalBom));

    // Swap trims to cheaper alternatives
    if (bom.trims) {
      bom.trims = bom.trims.map(function(t) {
        var mat = window.MaterialLibrary.findMaterial(t.materialId);
        if (!mat) return t;

        // Swap metal zipper to nylon
        if (t.materialId === 'TRM-001') {
          return Object.assign({}, t, { materialId: 'TRM-002' });
        }
        // Swap corozo buttons to polyester
        if (t.materialId === 'TRM-006') {
          return Object.assign({}, t, { materialId: 'TRM-005' });
        }
        return t;
      });
    }

    return bom;
  },

  // Create premium BOM (swap to higher-grade alternatives)
  createPremiumBom: function(originalBom) {
    var bom = JSON.parse(JSON.stringify(originalBom));

    // Swap fabrics to sustainable/premium
    if (bom.fabrics) {
      bom.fabrics = bom.fabrics.map(function(f) {
        // Swap cotton jersey to organic
        if (f.materialId === 'FAB-001' || f.materialId === 'FAB-002') {
          return Object.assign({}, f, { materialId: 'FAB-003' });
        }
        return f;
      });
    }

    // Swap trims to premium
    if (bom.trims) {
      bom.trims = bom.trims.map(function(t) {
        // Swap nylon zipper to metal YKK
        if (t.materialId === 'TRM-002' || t.materialId === 'TRM-003') {
          return Object.assign({}, t, { materialId: 'TRM-001' });
        }
        // Swap polyester buttons to corozo
        if (t.materialId === 'TRM-005') {
          return Object.assign({}, t, { materialId: 'TRM-006' });
        }
        return t;
      });
    }

    return bom;
  },

  getBudgetSwaps: function(original, budget) {
    var swaps = [];
    if (original.trims && budget.trims) {
      for (var i = 0; i < original.trims.length; i++) {
        if (original.trims[i].materialId !== budget.trims[i].materialId) {
          var from = window.MaterialLibrary.findMaterial(original.trims[i].materialId);
          var to = window.MaterialLibrary.findMaterial(budget.trims[i].materialId);
          if (from && to) {
            swaps.push({ from: from.name, to: to.name, savings: Math.round((from.unitPrice - to.unitPrice) * 100) / 100 });
          }
        }
      }
    }
    return swaps;
  },

  getPremiumSwaps: function(original, premium) {
    var swaps = [];
    if (original.fabrics && premium.fabrics) {
      for (var i = 0; i < original.fabrics.length; i++) {
        if (original.fabrics[i].materialId !== premium.fabrics[i].materialId) {
          var from = window.MaterialLibrary.findMaterial(original.fabrics[i].materialId);
          var to = window.MaterialLibrary.findMaterial(premium.fabrics[i].materialId);
          if (from && to) {
            swaps.push({ from: from.name, to: to.name, premium: Math.round((to.unitPrice - from.unitPrice) * 100) / 100 });
          }
        }
      }
    }
    if (original.trims && premium.trims) {
      for (var j = 0; j < original.trims.length; j++) {
        if (original.trims[j].materialId !== premium.trims[j].materialId) {
          var fromT = window.MaterialLibrary.findMaterial(original.trims[j].materialId);
          var toT = window.MaterialLibrary.findMaterial(premium.trims[j].materialId);
          if (fromT && toT) {
            swaps.push({ from: fromT.name, to: toT.name, premium: Math.round((toT.unitPrice - fromT.unitPrice) * 100) / 100 });
          }
        }
      }
    }
    return swaps;
  },

  // Recalculate with a single trim swap
  recalcWithSwap: function(techPack, bomLineIndex, bomSection, newMaterialId, currentCosting) {
    var newBom = JSON.parse(JSON.stringify(techPack.bom));
    if (newBom[bomSection] && newBom[bomSection][bomLineIndex]) {
      newBom[bomSection][bomLineIndex].materialId = newMaterialId;
    }
    var newPack = Object.assign({}, techPack, { bom: newBom });
    return this.calcFob(newPack, {
      factoryCountry: currentCosting.factory,
      marginPct: currentCosting.marginPct
    });
  },

  // Get alternative materials for a BOM line
  getAlternatives: function(materialId) {
    var mat = window.MaterialLibrary.findMaterial(materialId);
    if (!mat) return [];
    var all = window.MaterialLibrary.getAllMaterials();
    return all.filter(function(m) {
      if (m.id === materialId) return false;
      if (mat.type && m.type) return m.type === mat.type;
      if (mat.category === 'fabric' && m.category === 'fabric') return true;
      return m.category === mat.category;
    });
  }
};
