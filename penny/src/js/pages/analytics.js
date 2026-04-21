// ═══════════════════════════════════════════════════════════════
// PENNY — Analytics Page (Light Theme)
// ═══════════════════════════════════════════════════════════════

window.AnalyticsPage = {
  render: function() {
    var container = document.getElementById('page-analytics');
    container.innerHTML = this.buildHeader() + '<div class="page-body">' + this.buildContent() + '</div>';
    setTimeout(function() { window.AnalyticsPage.initCharts(); }, 200);
  },

  buildHeader: function() {
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">Analytics & Benchmarking</h1>' +
      '<p class="page-subtitle">Historical cost analysis, accuracy metrics, and ML-powered insights.</p>' +
      '</div></div>';
  },

  buildContent: function() {
    var html = '';
    var accuracy = window.MlService.getAccuracyMetrics();

    // Stats
    html += '<div class="grid-4 stagger-enter" style="margin-bottom:var(--space-6);">';
    html += '<div class="card stat-card hover-lift"><div class="stat-icon" style="background:var(--color-info-bg);color:var(--color-info);">📊</div><div class="stat-value">' + window.HistoricalData.costings.length + '</div><div class="stat-label">Historical Costings</div></div>';
    html += '<div class="card stat-card hover-lift"><div class="stat-icon" style="background:var(--color-success-bg);color:var(--color-success);">🎯</div><div class="stat-value">' + accuracy.accuracyPct + '%</div><div class="stat-label">Cost Accuracy</div></div>';
    html += '<div class="card stat-card hover-lift"><div class="stat-icon" style="background:var(--color-warning-bg);color:var(--color-warning);">📈</div><div class="stat-value">' + accuracy.avgVariancePct + '%</div><div class="stat-label">Avg Variance</div></div>';
    html += '<div class="card stat-card hover-lift"><div class="stat-icon" style="background:var(--color-premium-bg);color:var(--color-premium);">📅</div><div class="stat-value">' + window.HistoricalData.seasons.length + '</div><div class="stat-label">Seasons Tracked</div></div>';
    html += '</div>';

    // Charts
    html += '<div class="grid-2" style="margin-bottom:var(--space-6);">';
    html += '<div class="card card-padded"><div class="card-header"><span class="card-title">📈 FOB Trend by Season</span></div><canvas id="trend-chart" width="500" height="250"></canvas></div>';
    html += '<div class="card card-padded"><div class="card-header"><span class="card-title">🎯 Estimated vs Actual FOB</span></div><canvas id="accuracy-chart" width="500" height="250"></canvas></div>';
    html += '</div>';

    // Accuracy details
    html += '<div class="card card-padded">';
    html += '<div class="card-header"><span class="card-title">Cost Accuracy Details</span></div>';
    html += '<div class="table-container"><table>';
    html += '<thead><tr><th>Style</th><th>Season</th><th>Estimated FOB</th><th>Actual FOB</th><th>Variance</th><th>Variance %</th><th>Status</th></tr></thead>';
    html += '<tbody>';
    accuracy.details.forEach(function(a) {
      var absPct = Math.abs(a.variancePct);
      var statusTag = absPct <= 2 ? 'tag-success' : (absPct <= 5 ? 'tag-warning' : 'tag-error');
      var statusLabel = absPct <= 2 ? 'Excellent' : (absPct <= 5 ? 'Good' : 'Review');
      html += '<tr><td class="text-semibold">' + a.style + '</td><td><span class="tag tag-info">' + a.season + '</span></td><td class="mono">$' + a.estimated.toFixed(2) + '</td><td class="mono">$' + a.actual.toFixed(2) + '</td><td class="mono ' + (a.variance > 0 ? 'text-error' : 'text-success') + '">' + (a.variance > 0 ? '+' : '') + '$' + a.variance.toFixed(2) + '</td><td class="mono">' + (a.variancePct > 0 ? '+' : '') + a.variancePct.toFixed(1) + '%</td><td><span class="tag ' + statusTag + '">' + statusLabel + '</span></td></tr>';
    });
    html += '</tbody></table></div></div>';

    // By factory + style type
    html += '<div class="grid-2" style="margin-top:var(--space-6);">';
    html += '<div class="card card-padded"><div class="card-header"><span class="card-title">🌍 Costings by Factory</span></div>';
    var factories = {};
    window.HistoricalData.costings.forEach(function(c) { if (!factories[c.factory]) factories[c.factory] = { count: 0, totalFob: 0 }; factories[c.factory].count++; factories[c.factory].totalFob += c.fob; });
    Object.keys(factories).forEach(function(f) { var d = factories[f]; html += '<div class="cost-breakdown-row" style="padding:var(--space-2) 0;"><span class="cost-breakdown-label">' + f + ' (' + d.count + ')</span><span class="cost-breakdown-value">Avg $' + (d.totalFob / d.count).toFixed(2) + '</span></div>'; });
    html += '</div>';

    html += '<div class="card card-padded"><div class="card-header"><span class="card-title">👕 Costings by Style Type</span></div>';
    var styles = {};
    window.HistoricalData.costings.forEach(function(c) { if (!styles[c.style]) styles[c.style] = { count: 0, totalFob: 0 }; styles[c.style].count++; styles[c.style].totalFob += c.fob; });
    Object.keys(styles).forEach(function(s) { var d = styles[s]; html += '<div class="cost-breakdown-row" style="padding:var(--space-2) 0;"><span class="cost-breakdown-label">' + s + ' (' + d.count + ')</span><span class="cost-breakdown-value">Avg $' + (d.totalFob / d.count).toFixed(2) + '</span></div>'; });
    html += '</div></div>';

    return html;
  },

  initCharts: function() { this.drawTrendChart(); this.drawAccuracyChart(); },

  drawTrendChart: function() {
    var canvas = document.getElementById('trend-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var trend = window.HistoricalData.getCostTrend();
    var w = canvas.width, h = canvas.height;
    var pad = { top: 20, right: 20, bottom: 40, left: 50 };
    var plotW = w - pad.left - pad.right, plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);
    var fobs = trend.map(function(t) { return t.avgFob; });
    var maxFob = Math.max.apply(null, fobs) * 1.1, minFob = Math.min.apply(null, fobs) * 0.9;

    // Grid
    ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1;
    for (var g = 0; g < 5; g++) {
      var gy = pad.top + (plotH / 4) * g;
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(w - pad.right, gy); ctx.stroke();
      ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'right';
      ctx.fillText('$' + (maxFob - ((maxFob - minFob) / 4) * g).toFixed(1), pad.left - 8, gy + 4);
    }

    // Line
    ctx.beginPath(); ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    var points = [];
    trend.forEach(function(t, i) {
      var x = pad.left + (i / (trend.length - 1)) * plotW;
      var y = pad.top + ((maxFob - t.avgFob) / (maxFob - minFob)) * plotH;
      points.push({ x: x, y: y });
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill
    ctx.lineTo(points[points.length - 1].x, pad.top + plotH);
    ctx.lineTo(points[0].x, pad.top + plotH); ctx.closePath();
    var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    grad.addColorStop(0, 'rgba(37,99,235,0.12)'); grad.addColorStop(1, 'rgba(37,99,235,0)');
    ctx.fillStyle = grad; ctx.fill();

    // Dots
    points.forEach(function(p, i) {
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fillStyle = '#2563eb'; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.fillStyle = '#6b7280'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
      ctx.fillText(trend[i].season, p.x, pad.top + plotH + 20);
      ctx.fillStyle = '#1a1f36'; ctx.fillText('$' + trend[i].avgFob.toFixed(2), p.x, p.y - 12);
    });
  },

  drawAccuracyChart: function() {
    var canvas = document.getElementById('accuracy-chart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var accuracy = window.HistoricalData.getAccuracy();
    var w = canvas.width, h = canvas.height;
    var pad = { top: 20, right: 20, bottom: 40, left: 50 };
    var plotW = w - pad.left - pad.right, plotH = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);
    var allFobs = accuracy.map(function(a) { return [a.estimated, a.actual]; }).flat();
    var maxFob = Math.max.apply(null, allFobs) * 1.1, minFob = Math.min.apply(null, allFobs) * 0.9;

    // Perfect line
    ctx.beginPath(); ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
    ctx.moveTo(pad.left, pad.top + plotH); ctx.lineTo(w - pad.right, pad.top); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.fillText('Perfect accuracy', w - pad.right - 70, pad.top + 10);

    // Axes
    ctx.textAlign = 'center'; ctx.fillText('Estimated FOB', w / 2, h - 5);
    ctx.save(); ctx.translate(12, h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Actual FOB', 0, 0); ctx.restore();

    // Points
    accuracy.forEach(function(a) {
      var x = pad.left + ((a.estimated - minFob) / (maxFob - minFob)) * plotW;
      var y = pad.top + ((maxFob - a.actual) / (maxFob - minFob)) * plotH;
      var absPct = Math.abs(a.variancePct);
      var color = absPct <= 2 ? '#059669' : (absPct <= 5 ? '#d97706' : '#dc2626');
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fillStyle = color; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#1a1f36'; ctx.font = '9px Inter'; ctx.textAlign = 'center'; ctx.fillText(a.style.split(' ')[0], x, y - 10);
    });
  }
};
