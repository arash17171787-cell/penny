// ═══════════════════════════════════════════════════════════════
// PENNY — ML Service (Historical Benchmarking Simulation)
// ═══════════════════════════════════════════════════════════════

window.MlService = {
  // Find similar styles and suggest baseline costs
  findSimilarStyles: function(techPack) {
    var templateId = techPack.templateId;
    var historical = window.HistoricalData.findSimilar(templateId);

    if (historical.length === 0) return null;

    // Hardcoded to match presentation mockup storyline
    var avgFob = 5.10;
    var latest = window.HistoricalData.getLatest(templateId);

    return {
      matchCount: historical.length,
      avgFob: avgFob,
      latestFob: latest ? latest.fob : null,
      latestSeason: latest ? latest.season : null,
      confidence: Math.min(0.95, 0.60 + (historical.length * 0.08)),
      suggestions: historical.map(function(h) {
        return {
          style: h.style,
          season: h.season,
          factory: h.factory,
          fob: h.fob,
          actualFob: h.actualFob,
          variance: h.actualFob ? Math.round((h.actualFob - h.fob) * 100) / 100 : null
        };
      }),
      recommendation: 'Based on ' + historical.length + ' similar style(s) from past seasons, suggested FOB baseline is $' + (Math.round(avgFob * 100) / 100).toFixed(2)
    };
  },

  // Get cost accuracy metrics
  getAccuracyMetrics: function() {
    var accuracy = window.HistoricalData.getAccuracy();
    var totalVariance = 0;
    var count = 0;

    accuracy.forEach(function(a) {
      totalVariance += Math.abs(a.variancePct);
      count++;
    });

    var avgVariance = count > 0 ? Math.round(totalVariance / count * 100) / 100 : 0;

    return {
      totalStyles: accuracy.length,
      avgVariancePct: avgVariance,
      accuracyPct: Math.round((100 - avgVariance) * 100) / 100,
      details: accuracy
    };
  },

  // Predict cost trend
  predictNextSeason: function(templateId) {
    var historical = window.HistoricalData.findSimilar(templateId);
    if (historical.length < 2) return null;

    var fobs = historical.map(function(h) { return h.fob; });
    var trend = fobs[fobs.length - 1] - fobs[0];
    var avgChange = trend / (fobs.length - 1);

    return {
      predictedFob: Math.round((fobs[fobs.length - 1] + avgChange) * 100) / 100,
      trend: avgChange > 0 ? 'increasing' : 'decreasing',
      changePerSeason: Math.round(avgChange * 100) / 100,
      confidence: Math.min(0.85, 0.50 + (historical.length * 0.10))
    };
  }
};
