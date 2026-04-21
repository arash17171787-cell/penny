// ═══════════════════════════════════════════════════════════════
// PENNY — Style Templates
// Pre-built garment templates with labor minutes & standard BOMs
// ═══════════════════════════════════════════════════════════════

window.StyleTemplates = {
  templates: [
    {
      id: 'TPL-001',
      name: 'Basic Crew Neck Tee',
      category: 'Tops',
      complexity: 'simple',
      laborMinutes: 12,
      threadConsumption: 120, // meters
      defaultFabric: 'FAB-001',
      fabricConsumption: 1.45, // meters per garment
      defaultTrims: [
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.02 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Standard crew neck t-shirt with short sleeves, single needle stitching.',
      icon: '👕'
    },
    {
      id: 'TPL-002',
      name: 'V-Neck Tee',
      category: 'Tops',
      complexity: 'simple',
      laborMinutes: 13,
      threadConsumption: 125,
      defaultFabric: 'FAB-001',
      fabricConsumption: 1.50,
      defaultTrims: [
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.02 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'V-neck t-shirt with clean neckline finish.',
      icon: '👕'
    },
    {
      id: 'TPL-003',
      name: 'Polo Shirt',
      category: 'Tops',
      complexity: 'moderate',
      laborMinutes: 22,
      threadConsumption: 180,
      defaultFabric: 'FAB-002',
      fabricConsumption: 1.65,
      defaultTrims: [
        { id: 'TRM-005', qty: 3 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.03 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Classic polo with collar, 3-button placket, and ribbed cuffs.',
      icon: '👔'
    },
    {
      id: 'TPL-004',
      name: 'Pullover Hoodie',
      category: 'Outerwear',
      complexity: 'moderate',
      laborMinutes: 28,
      threadConsumption: 250,
      defaultFabric: 'FAB-005',
      fabricConsumption: 2.20,
      defaultTrims: [
        { id: 'TRM-008', qty: 1.5 },
        { id: 'TRM-014', qty: 2 },
        { id: 'TRM-013', qty: 2 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.04 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Pullover hoodie with kangaroo pocket, drawcord hood, and ribbed cuffs/hem.',
      icon: '🧥'
    },
    {
      id: 'TPL-005',
      name: 'Zip-Up Hoodie',
      category: 'Outerwear',
      complexity: 'complex',
      laborMinutes: 35,
      threadConsumption: 300,
      defaultFabric: 'FAB-005',
      fabricConsumption: 2.40,
      defaultTrims: [
        { id: 'TRM-001', qty: 1 },
        { id: 'TRM-008', qty: 1.5 },
        { id: 'TRM-014', qty: 2 },
        { id: 'TRM-013', qty: 2 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.05 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Full-zip hoodie with metal zipper, split kangaroo pockets, drawcord hood.',
      icon: '🧥'
    },
    {
      id: 'TPL-006',
      name: 'Jogger Pants',
      category: 'Bottoms',
      complexity: 'moderate',
      laborMinutes: 25,
      threadConsumption: 220,
      defaultFabric: 'FAB-005',
      fabricConsumption: 1.90,
      defaultTrims: [
        { id: 'TRM-009', qty: 0.8 },
        { id: 'TRM-008', qty: 1.2 },
        { id: 'TRM-014', qty: 2 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.04 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Tapered jogger with elastic waistband, drawcord, and ribbed ankle cuffs.',
      icon: '👖'
    },
    {
      id: 'TPL-007',
      name: 'Chino Pants',
      category: 'Bottoms',
      complexity: 'complex',
      laborMinutes: 32,
      threadConsumption: 280,
      defaultFabric: 'FAB-009',
      fabricConsumption: 2.10,
      defaultTrims: [
        { id: 'TRM-002', qty: 1 },
        { id: 'TRM-005', qty: 1 },
        { id: 'TRM-010', qty: 4 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'LBL-006', qty: 1 },
        { id: 'TRM-015', qty: 0.05 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Classic chino with zip fly, button closure, slash pockets, and welt back pockets.',
      icon: '👖'
    },
    {
      id: 'TPL-008',
      name: 'Denim Jacket',
      category: 'Outerwear',
      complexity: 'complex',
      laborMinutes: 45,
      threadConsumption: 380,
      defaultFabric: 'FAB-010',
      fabricConsumption: 2.60,
      defaultTrims: [
        { id: 'TRM-001', qty: 1 },
        { id: 'TRM-004', qty: 6 },
        { id: 'TRM-010', qty: 8 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'LBL-006', qty: 1 },
        { id: 'TRM-015', qty: 0.06 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
        { id: 'PKG-005', qty: 1 },
      ],
      description: 'Trucker-style denim jacket with chest pockets, metal snap buttons, and rivets.',
      icon: '🧥'
    },
    {
      id: 'TPL-009',
      name: 'Oxford Button-Down Shirt',
      category: 'Tops',
      complexity: 'complex',
      laborMinutes: 30,
      threadConsumption: 260,
      defaultFabric: 'FAB-008',
      fabricConsumption: 1.85,
      defaultTrims: [
        { id: 'TRM-005', qty: 8 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.04 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
        { id: 'PKG-005', qty: 1 },
      ],
      description: 'Classic button-down Oxford shirt with chest pocket and box pleat back.',
      icon: '👔'
    },
    {
      id: 'TPL-010',
      name: 'Windbreaker Jacket',
      category: 'Outerwear',
      complexity: 'complex',
      laborMinutes: 38,
      threadConsumption: 320,
      defaultFabric: 'FAB-013',
      fabricConsumption: 2.30,
      defaultTrims: [
        { id: 'TRM-002', qty: 2 },
        { id: 'TRM-008', qty: 1.5 },
        { id: 'TRM-014', qty: 2 },
        { id: 'TRM-009', qty: 0.5 },
        { id: 'TRM-011', qty: 0.3 },
        { id: 'LBL-001', qty: 1 },
        { id: 'LBL-002', qty: 1 },
        { id: 'LBL-003', qty: 1 },
        { id: 'TRM-015', qty: 0.05 },
      ],
      defaultPackaging: [
        { id: 'PKG-001', qty: 1 },
        { id: 'PKG-002', qty: 1 },
        { id: 'LBL-004', qty: 1 },
        { id: 'LBL-005', qty: 1 },
      ],
      description: 'Lightweight windbreaker with front zip, velcro cuffs, elastic hem, and stow pocket.',
      icon: '🧥'
    },
  ],

  findTemplate: function(id) {
    return this.templates.find(function(t) { return t.id === id; });
  },

  findByName: function(name) {
    var lower = name.toLowerCase();
    return this.templates.find(function(t) {
      return t.name.toLowerCase().indexOf(lower) !== -1;
    });
  },

  getByCategory: function(cat) {
    return this.templates.filter(function(t) { return t.category === cat; });
  },

  getCategories: function() {
    var cats = {};
    this.templates.forEach(function(t) { cats[t.category] = true; });
    return Object.keys(cats);
  }
};
