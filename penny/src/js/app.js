// ═══════════════════════════════════════════════════════════════
// PENNY — App Controller (Professional Dashboard + Styles Tabs)
// Sidebar: Dashboard, Styles, Material Library, Simulations, Reports, Settings
// Top Nav: Tabs (only on Styles page), Search, Profile
// Footer: System sync, API status
// ═══════════════════════════════════════════════════════════════

window.App = {
  currentPage: 'dashboard',

  icons: {
    dashboard: '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><rect x="1" y="1" width="7" height="7" rx="1"/><rect x="10" y="1" width="7" height="7" rx="1"/><rect x="1" y="10" width="7" height="7" rx="1"/><rect x="10" y="10" width="7" height="7" rx="1"/></svg>',
    styles: '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M14 2L12 1H6L4 2L1 5L3 7L4 4.5V16C4 16.55 4.45 17 5 17H13C13.55 17 14 16.55 14 16V4.5L15 7L17 5L14 2Z"/></svg>',
    'material-library': '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M2 3C2 1.895 2.895 1 4 1H14C15.105 1 16 1.895 16 3V4H2V3ZM2 6V15C2 16.105 2.895 17 4 17H14C15.105 17 16 16.105 16 15V6H2ZM6 9H12V11H6V9Z"/></svg>',
    simulations: '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 1C1.45 1 1 1.45 1 2V16C1 16.55 1.45 17 2 17H16C16.55 17 17 16.55 17 16V2C17 1.45 16.55 1 16 1H2ZM8 15V9H3V15H8ZM10 15H15V9H10V15ZM15 7H10V3H15V7ZM8 3H3V7H8V3Z"/></svg>',
    reports: '<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 1C1.45 1 1 1.45 1 2V16C1 16.55 1.45 17 2 17H16C16.55 17 17 16.55 17 16V2C17 1.45 16.55 1 16 1H2ZM5 14H7V8H5V14ZM8.5 14H10.5V4H8.5V14ZM12 14H14V10H12V14Z"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>'
  },

  pages: {
    'dashboard':        { label: 'Dashboard',        section: 'main', page: 'DashboardPage' },
    'styles':           { label: 'Styles',           section: 'main', page: 'CostingEnginePage' },
    'material-library': { label: 'Material Library',  section: 'main', page: 'MaterialLibraryPage' },
    'simulations':      { label: 'Simulations',       section: 'tools', page: 'TechPackUploadPage' },
    'reports':          { label: 'Reports',            section: 'tools', page: 'AnalyticsPage' },
    'settings':         { label: 'Settings',           section: 'tools', page: 'StyleTemplatesPage' },
  },

  // Tabs only appear on Styles page
  topTabs: [
    { id: 'tech-pack', label: 'Tech Pack Analysis' },
    { id: 'vendor-mapping', label: 'Vendor Mapping' },
    { id: 'cost-summary', label: 'Cost Summary' },
  ],
  activeTab: 'tech-pack',

  init: function() {
    this.buildSidebar();
    this.buildTopNav();
    this.buildFooter();
    this.navigate(window.location.hash.slice(1) || 'dashboard');
    this.startPlmSync();

    window.addEventListener('hashchange', function() {
      var page = window.location.hash.slice(1);
      if (page && window.App.pages[page] && window.App.currentPage !== page) {
        window.App.navigate(page);
      }
    });
  },

  buildSidebar: function() {
    var sidebar = document.getElementById('sidebar');
    var html = '';

    // Logo
    html += '<div class="sidebar-header">';
    html += '<div class="sidebar-logo">';
    html += '<div class="sidebar-logo-text" style="color:var(--color-accent-primary);font-size:24px;font-weight:600;letter-spacing:-0.03em;">Penny</div>';
    html += '</div></div>';

    // Nav
    html += '<nav class="sidebar-nav">';

    var self = this;
    Object.keys(this.pages).forEach(function(key) {
      var p = self.pages[key];
      var icon = self.icons[key] || '';
      var badge = '';
      if (key === 'material-library') badge = '<span class="nav-item-badge">41</span>';
      html += '<div class="nav-item" data-page="' + key + '" onclick="window.App.navigate(\'' + key + '\')" id="nav-' + key + '">';
      html += '<span class="nav-item-icon">' + icon + '</span>';
      html += '<span class="nav-item-label">' + p.label + '</span>';
      html += badge;
      html += '</div>';
    });

    html += '</nav>';

    // Footer button
    html += '<div class="sidebar-footer">';
    html += '';
    html += '<div class="sidebar-sync-status" style="margin-top:var(--space-2);">';
    html += '<span class="sync-dot"></span>';
    html += '<span id="sync-label">AI Engine Active</span>';
    html += '</div>';
    html += '</div>';

    sidebar.innerHTML = html;
  },

  buildTopNav: function() {
    var main = document.querySelector('.main-content');
    var topNav = document.createElement('div');
    topNav.className = 'top-nav';
    topNav.id = 'top-nav';

    var html = '<div class="top-nav-tabs" id="top-nav-tabs-container">';
    this.topTabs.forEach(function(tab) {
      html += '<div class="top-nav-tab' + (tab.id === 'tech-pack' ? ' active' : '') + '" data-tab="' + tab.id + '" onclick="window.App.switchTab(\'' + tab.id + '\')">';
      html += tab.label;
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="top-nav-right">';
    html += '<div class="top-nav-search"><svg width="14" height="14" viewBox="0 0 16 16" fill="#9ca3af" style="flex-shrink:0;"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.44 1.36a5.209 5.209 0 1 1 0-10.418 5.209 5.209 0 0 1 0 10.418z"/></svg><input type="text" placeholder="Search Style ID, BOM, or Vendor..." id="global-search"></div>';
    html += '<div class="top-nav-icon" title="Notifications"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6b7280" stroke-width="1.5"><path d="M4 6a4 4 0 0 1 8 0c0 4 2 5 2 5H2s2-1 2-5"/><path d="M6 11v1a2 2 0 0 0 4 0v-1"/></svg></div>';
    html += '<div class="top-nav-icon" title="Sync"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6b7280" stroke-width="1.5"><path d="M1 8a7 7 0 0 1 12-5M15 8a7 7 0 0 1-12 5"/><path d="M13 1v4h-4M3 15v-4h4"/></svg></div>';
    html += '<div class="top-nav-icon" title="Help"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6b7280" stroke-width="1.5"><circle cx="8" cy="8" r="7"/><path d="M6 6a2 2 0 1 1 2 2v2"/><circle cx="8" cy="12" r="0.5" fill="#6b7280"/></svg></div>';
    html += '<div class="top-nav-avatar" title="Elena Rodriguez">ER</div>';
    html += '</div>';

    topNav.innerHTML = html;
    main.insertBefore(topNav, main.firstChild);
  },

  buildFooter: function() {
    var main = document.querySelector('.main-content');
    var footer = document.createElement('div');
    footer.className = 'app-footer';
    footer.id = 'app-footer';

    footer.innerHTML = '<div class="app-footer-left">' +
      '<div class="footer-status"><span class="sync-dot"></span> SYSTEM SYNC: PLM ACTIVE</div>' +
      '<span>|</span>' +
      '<span>ERP CONNECTED</span>' +
      '<span>|</span>' +
      '<span>API LATENCY: 42MS</span>' +
      '</div>' +
      '<div class="app-footer-right">' +
      '<span class="footer-link">PRIVACY POLICY</span>' +
      '<span class="footer-link">SUPPORT</span>' +
      '<span>© 2024 EDITORIAL ENTERPRISES</span>' +
      '</div>';

    main.appendChild(footer);
  },

  // Show / hide tabs based on current page
  updateTabsVisibility: function(pageId) {
    var tabsContainer = document.getElementById('top-nav-tabs-container');
    if (!tabsContainer) return;

    if (pageId === 'styles') {
      tabsContainer.style.display = '';
      tabsContainer.style.opacity = '1';
      tabsContainer.style.pointerEvents = 'auto';
    } else {
      tabsContainer.style.display = 'none';
    }
  },

  switchTab: function(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.top-nav-tab').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
    });

    // Map tabs to page containers and renderers
    var tabPageMap = {
      'tech-pack':      { container: 'page-costing-engine',  renderer: 'CostingEnginePage' },
      'vendor-mapping': { container: 'page-supplier-portal', renderer: 'SupplierPortalPage' },
      'cost-summary':   { container: 'page-cost-summary',    renderer: 'CostSummaryPage' }
    };

    var target = tabPageMap[tabId];
    if (!target) return;

    // Hide all page containers, show the target
    document.querySelectorAll('.page-container').forEach(function(el) {
      el.classList.remove('active');
    });
    var container = document.getElementById(target.container);
    if (container) container.classList.add('active');

    // Render the target page
    if (window[target.renderer] && window[target.renderer].render) {
      window[target.renderer].render();
    }

    // Keep "Styles" active in sidebar
    document.querySelectorAll('.nav-item').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-page') === 'styles');
    });
    this.currentPage = 'styles';
  },

  navigate: function(pageId) {
    if (!this.pages[pageId]) return;
    this.currentPage = pageId;
    window.location.hash = pageId;

    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-page') === pageId);
    });

    // Hide all pages, show target
    document.querySelectorAll('.page-container').forEach(function(el) {
      el.classList.remove('active');
    });

    var containerMap = {
      'dashboard': 'page-dashboard',
      'styles': 'page-costing-engine',
      'material-library': 'page-material-library',
      'simulations': 'page-techpack-upload',
      'reports': 'page-analytics',
      'settings': 'page-style-templates',
    };

    var containerId = containerMap[pageId];
    var container = document.getElementById(containerId);
    if (container) container.classList.add('active');

    // Render page
    var pageName = this.pages[pageId].page;
    if (window[pageName] && window[pageName].render) {
      window[pageName].render();
    }

    // Show/hide tabs — only visible on Styles page
    this.updateTabsVisibility(pageId);

    // Reset to first tab when navigating to styles (unless overridden)
    if (pageId === 'styles') {
      if (this._pendingTab) {
        this.switchTab(this._pendingTab);
        this._pendingTab = null;
      } else {
        this.activeTab = 'tech-pack';
        document.querySelectorAll('.top-nav-tab').forEach(function(el) {
          el.classList.toggle('active', el.getAttribute('data-tab') === 'tech-pack');
        });
      }
    }
  },

  startPlmSync: function() {
    setInterval(function() {
      var label = document.getElementById('sync-label');
      if (label) {
        label.textContent = 'Last scanned: ' + new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        setTimeout(function() {
          if (label) label.textContent = 'AI Engine Active';
        }, 3000);
      }
    }, 30000);
  },

  showToast: function(title, message, type) {
    type = type || 'info';
    var icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    var container = document.getElementById('toast-container');

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<span class="toast-icon">' + icons[type] + '</span>' +
      '<div class="toast-body"><div class="toast-title">' + title + '</div><div class="toast-message">' + message + '</div></div>' +
      '<button class="toast-close" onclick="this.parentElement.classList.add(\'leaving\');setTimeout(function(){this.parentElement.remove()}.bind(this),300)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';

    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('leaving');
      setTimeout(function() { toast.remove(); }, 300);
    }, 5000);
  },

  formatCurrency: function(val) {
    return '$' + Number(val).toFixed(2);
  },

  timeAgo: function(date) {
    if (!(date instanceof Date)) date = new Date(date);
    var diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  },

  handleExport: function() {
    this.showToast('📤 Exported', 'Cost data exported to CSV', 'success');
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  window.App.init();
});
