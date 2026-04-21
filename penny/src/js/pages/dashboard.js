// ═══════════════════════════════════════════════════════════════
// PENNY — Professional Dashboard Page
// Overview: KPIs, Recent Activity, AI Insights, Active Styles
// ═══════════════════════════════════════════════════════════════

window.DashboardPage = {
  render: function() {
    var container = document.getElementById('page-dashboard');

    container.innerHTML = this.buildHeader() +
      '<div class="page-body">' + this.buildContent() + '</div>';
  },

  buildHeader: function() {
    var now = new Date();
    var greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';
    return '<div class="page-header">' +
      '<div class="page-header-left">' +
      '<h1 class="page-title">' + greeting + ', Elena</h1>' +
      '<p class="page-subtitle">Here\'s your costing intelligence overview for today.</p>' +
      '</div>' +
      '<div class="page-header-right">' +
      '<div class="dash-date-badge">' +
        '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="12" rx="2"/><path d="M2 7h12"/><path d="M5 1v4M11 1v4"/></svg>' +
        '<span>' + now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }) + '</span>' +
      '</div>' +
      '</div></div>';
  },

  buildContent: function() {
    var html = '';

    // KPI Row
    html += '<div class="dash-kpi-row stagger-enter">';
    html += this.buildKpiCard('📊', 'Active Styles', '24', '+3 this week', 'up', '#dbeafe', '#2563eb');
    html += this.buildKpiCard('🧮', 'Costings Generated', '156', '+12 today', 'up', '#d1fae5', '#059669');
    html += this.buildKpiCard('💰', 'Avg. FOB', '$5.42', '−$0.18 vs target', 'down-good', '#fef3c7', '#d97706');
    html += this.buildKpiCard('🤖', 'AI Confidence', '94.2%', '+1.8% improvement', 'up', '#ede9fe', '#7c3aed');
    html += '</div>';

    // Main Grid: Left (Active Styles + AI Insights) + Right (Activity Feed + Quick Actions)
    html += '<div class="dash-main-grid">';

    // LEFT COLUMN
    html += '<div class="dash-left-col">';

    // Active Styles Table
    html += '<div class="card card-padded">';
    html += '<div class="card-header"><div class="card-title">Active Styles</div>';
    html += '<div class="flex items-center gap-2">';
    html += '<span class="tag tag-info">This Season</span>';
    html += '<button class="btn btn-sm btn-secondary" onclick="window.App.navigate(\'styles\')">View All →</button>';
    html += '</div></div>';
    html += this.buildStylesTable();
    html += '</div>';

    // AI Insights Panel
    html += '<div class="card card-padded">';
    html += '<div class="card-header"><div class="card-title">✦ Penny AI Insights</div>';
    html += '<span class="tag tag-dark">LIVE</span></div>';
    html += this.buildInsights();
    html += '</div>';

    html += '</div>'; // end left

    // RIGHT COLUMN
    html += '<div class="dash-right-col">';

    // Quick Actions
    html += '<div class="card card-padded">';
    html += '<div class="card-title" style="margin-bottom:var(--space-4);">Quick Actions</div>';
    html += this.buildQuickActions();
    html += '</div>';

    // Recent Activity
    html += '<div class="card card-padded">';
    html += '<div class="card-header"><div class="card-title">Recent Activity</div>';
    html += '<span class="text-xs text-tertiary">Last 24 hours</span></div>';
    html += this.buildActivityFeed();
    html += '</div>';

    // System Health
    html += '<div class="card card-padded">';
    html += '<div class="card-title" style="margin-bottom:var(--space-4);">System Health</div>';
    html += this.buildSystemHealth();
    html += '</div>';

    html += '</div>'; // end right

    html += '</div>'; // end main grid

    return html;
  },

  buildKpiCard: function(icon, label, value, change, trend, bgColor, iconColor) {
    var trendClass = trend === 'up' ? 'dash-kpi-change-up' : trend === 'down-good' ? 'dash-kpi-change-down-good' : 'dash-kpi-change-down';
    var trendArrow = trend === 'up' ? '↑' : trend === 'down-good' ? '↓' : '↓';

    return '<div class="dash-kpi-card card">' +
      '<div class="dash-kpi-top">' +
        '<div class="dash-kpi-icon" style="background:' + bgColor + ';color:' + iconColor + ';">' + icon + '</div>' +
        '<div class="dash-kpi-label">' + label + '</div>' +
      '</div>' +
      '<div class="dash-kpi-value">' + value + '</div>' +
      '<div class="' + trendClass + '">' + trendArrow + ' ' + change + '</div>' +
    '</div>';
  },

  buildStylesTable: function() {
    var styles = [
      { id: 'MP04', name: "Men's Polo Shirt", season: 'SS24', status: 'Costed', fob: '$5.10', confidence: 94, statusClass: 'tag-success' },
      { id: 'WD12', name: "Women's Denim Jacket", season: 'AW24', status: 'In Progress', fob: '$18.45', confidence: 87, statusClass: 'tag-warning' },
      { id: 'KB08', name: "Kids Basic Tee", season: 'SS24', status: 'Costed', fob: '$3.20', confidence: 96, statusClass: 'tag-success' },
      { id: 'MA21', name: "Men's Athletic Short", season: 'SS24', status: 'Draft', fob: '—', confidence: 0, statusClass: 'tag-info' },
      { id: 'WC15', name: "Women's Cashmere Wrap", season: 'AW24', status: 'In Progress', fob: '$32.80', confidence: 78, statusClass: 'tag-warning' },
    ];

    var html = '<table class="dash-styles-table"><thead><tr>';
    html += '<th>STYLE ID</th><th>NAME</th><th>SEASON</th><th>STATUS</th><th>FOB</th><th>CONFIDENCE</th><th></th>';
    html += '</tr></thead><tbody>';

    styles.forEach(function(s) {
      html += '<tr onclick="window.App.navigate(\'styles\')" style="cursor:pointer;">';
      html += '<td><span class="text-semibold mono">' + s.id + '</span></td>';
      html += '<td>' + s.name + '</td>';
      html += '<td><span class="tag tag-info">' + s.season + '</span></td>';
      html += '<td><span class="tag ' + s.statusClass + '">' + s.status + '</span></td>';
      html += '<td class="mono text-semibold">' + s.fob + '</td>';
      html += '<td>';
      if (s.confidence > 0) {
        html += '<div class="dash-confidence-mini">';
        html += '<div class="dash-confidence-mini-bar"><div class="dash-confidence-mini-fill" style="width:' + s.confidence + '%;background:' + (s.confidence >= 90 ? '#059669' : s.confidence >= 80 ? '#d97706' : '#dc2626') + ';"></div></div>';
        html += '<span class="text-xs mono">' + s.confidence + '%</span>';
        html += '</div>';
      } else {
        html += '<span class="text-xs text-tertiary">—</span>';
      }
      html += '</td>';
      html += '<td><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg></td>';
      html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
  },

  buildInsights: function() {
    var insights = [
      {
        icon: '💡',
        title: 'Cost Optimization Opportunity',
        text: 'Switching to Arvind Ltd for rib material on MP04 could save <strong>$0.22/unit</strong> across 45K units.',
        action: 'Review Suggestion',
        bg: '#fffbeb',
        border: '#fde68a'
      },
      {
        icon: '⚠️',
        title: 'Supply Chain Alert',
        text: 'Cotton prices trending <strong>+4.2%</strong> for Q3. Consider locking fabric pricing for AW24 styles now.',
        action: 'View Analysis',
        bg: '#fef2f2',
        border: '#fecaca'
      },
      {
        icon: '✦',
        title: 'BOM Mapping Complete',
        text: 'WD12 Denim Jacket automated mapping achieved <strong>87% confidence</strong>. 2 items need manual review.',
        action: 'Review BOM',
        bg: '#eff6ff',
        border: '#bfdbfe'
      }
    ];

    var html = '<div class="dash-insights-list">';
    insights.forEach(function(ins) {
      html += '<div class="dash-insight-item" style="background:' + ins.bg + ';border:1px solid ' + ins.border + ';">';
      html += '<div class="dash-insight-icon">' + ins.icon + '</div>';
      html += '<div class="dash-insight-body">';
      html += '<div class="dash-insight-title">' + ins.title + '</div>';
      html += '<div class="dash-insight-text">' + ins.text + '</div>';
      html += '</div>';
      html += '<button class="btn btn-sm btn-secondary">' + ins.action + '</button>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  buildQuickActions: function() {
    var actions = [
      { icon: '📄', label: 'Upload Tech Pack', desc: 'OCR scan & extract BOM', page: 'simulations' },
      { icon: '🧮', label: 'Run Costing', desc: 'Generate tiered scenarios', page: 'styles' },
      { icon: '📦', label: 'Material Library', desc: 'Browse 412 materials', page: 'material-library' },
      { icon: '📊', label: 'View Reports', desc: 'Analytics & insights', page: 'reports' },
    ];

    var html = '<div class="dash-quick-actions">';
    actions.forEach(function(a) {
      html += '<div class="dash-quick-action-item" onclick="window.App.navigate(\'' + a.page + '\')">';
      html += '<div class="dash-quick-action-icon">' + a.icon + '</div>';
      html += '<div class="dash-quick-action-body">';
      html += '<div class="dash-quick-action-label">' + a.label + '</div>';
      html += '<div class="dash-quick-action-desc">' + a.desc + '</div>';
      html += '</div>';
      html += '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  buildActivityFeed: function() {
    var activities = [
      { icon: '✅', text: 'MP04 costing finalized — <strong>$5.10 FOB</strong>', time: '12 min ago', color: '#059669' },
      { icon: '🤖', text: 'AI mapped 6/6 BOM items for <strong>KB08</strong>', time: '1h ago', color: '#2563eb' },
      { icon: '📄', text: 'Tech pack uploaded: <strong>WC15</strong>', time: '2h ago', color: '#7c3aed' },
      { icon: '⚡', text: 'ERP sync completed — <strong>3 styles</strong> updated', time: '3h ago', color: '#d97706' },
      { icon: '👤', text: 'Vendor quote received from <strong>Alok Industries</strong>', time: '5h ago', color: '#6b7280' },
      { icon: '📊', text: 'Weekly margin report generated', time: '8h ago', color: '#6b7280' },
    ];

    var html = '<div class="dash-activity-feed">';
    activities.forEach(function(a) {
      html += '<div class="dash-activity-item">';
      html += '<div class="dash-activity-dot" style="background:' + a.color + ';"></div>';
      html += '<div class="dash-activity-body">';
      html += '<div class="dash-activity-text">' + a.text + '</div>';
      html += '<div class="dash-activity-time">' + a.time + '</div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  buildSystemHealth: function() {
    var systems = [
      { name: 'PLM Connection', status: 'Connected', dot: '#059669' },
      { name: 'ERP Sync', status: 'Active', dot: '#059669' },
      { name: 'AI Engine', status: 'Running', dot: '#059669' },
      { name: 'Material DB', status: '412 items', dot: '#2563eb' },
    ];

    var html = '<div class="dash-system-health">';
    systems.forEach(function(s) {
      html += '<div class="dash-system-item">';
      html += '<div class="dash-system-item-left"><span class="dash-system-dot" style="background:' + s.dot + ';"></span>' + s.name + '</div>';
      html += '<span class="text-xs text-semibold" style="color:' + s.dot + ';">' + s.status + '</span>';
      html += '</div>';
    });
    html += '</div>';
    return html;
  },

  selectOption: function(tier) {
    window.Store.set('selectedTier', tier);
    window.App.navigate('styles');
  }
};
