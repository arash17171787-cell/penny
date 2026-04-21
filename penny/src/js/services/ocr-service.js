// ═══════════════════════════════════════════════════════════════
// PENNY — OCR Service (Simulated OCR/NLP Extraction)
// ═══════════════════════════════════════════════════════════════

window.OcrService = {
  // Simulate OCR processing with realistic delays
  processFile: function(fileName, callback) {
    var self = this;
    var steps = [
      { label: 'Scanning document...', duration: 1200 },
      { label: 'Extracting BOM data...', duration: 1800 },
      { label: 'Identifying materials...', duration: 1400 },
      { label: 'Cross-referencing material library...', duration: 1000 },
      { label: 'Generating confidence scores...', duration: 800 }
    ];

    var currentStep = 0;
    var stepCallback = function() {
      if (currentStep < steps.length) {
        var step = steps[currentStep];
        if (callback.onStep) callback.onStep(currentStep, step.label, steps.length);
        currentStep++;
        setTimeout(stepCallback, step.duration);
      } else {
        // Return simulated extracted data
        var result = self.simulateExtraction(fileName);
        if (callback.onComplete) callback.onComplete(result);
      }
    };

    setTimeout(stepCallback, 500);
  },

  // Simulate extracted data based on filename pattern
  simulateExtraction: function(fileName) {
    // Pick a random sample tech pack to simulate extraction
    var packs = window.SampleTechPacks.packs;
    var pack = packs[Math.floor(Math.random() * packs.length)];

    // Generate confidence scores for each extracted field
    var fields = [];

    // Fabric extraction
    pack.bom.fabrics.forEach(function(f) {
      var mat = window.MaterialLibrary.findMaterial(f.materialId);
      fields.push({
        field: 'Fabric - ' + (mat ? mat.name : f.materialId),
        value: mat ? mat.name : 'Unknown',
        placement: f.placement,
        consumption: f.consumption,
        confidence: 0.85 + Math.random() * 0.14,
        materialId: f.materialId,
        category: 'fabric'
      });
    });

    // Trim extraction
    pack.bom.trims.forEach(function(t) {
      var mat = window.MaterialLibrary.findMaterial(t.materialId);
      fields.push({
        field: (mat ? mat.name : t.materialId),
        value: mat ? mat.name : 'Unknown',
        placement: t.placement,
        qty: t.qty,
        confidence: 0.75 + Math.random() * 0.24,
        materialId: t.materialId,
        category: mat ? mat.category : 'trim'
      });
    });

    return {
      techPack: pack,
      extractedFields: fields,
      overallConfidence: 0.89 + Math.random() * 0.08,
      processingTime: '6.2s',
      warnings: fields.filter(function(f) { return f.confidence < 0.85; }).length > 0 ?
        ['Some fields have low confidence - manual review recommended'] : []
    };
  }
};
