// ═══════════════════════════════════════════════════════════════
// PENNY — Sample Tech Packs (for demo & testing)
// ═══════════════════════════════════════════════════════════════

window.SampleTechPacks = {
  packs: [
    {
      id: 'TP-001',
      styleName: "Men's Polo Shirt",
      styleNumber: 'MP04',
      season: 'SS24',
      designer: 'Sarah Chen',
      templateId: 'TPL-003',
      status: 'finalized',
      dateFinalized: '2024-10-15',
      garmentType: 'Polo Shirt',
      category: 'polo',
      bom: {
        fabrics: [
          { materialId: 'FAB-002', placement: 'Body', consumption: 1.55 },
          { materialId: 'FAB-007', placement: 'Collar & Cuffs', consumption: 0.15 }
        ],
        trims: [
          { materialId: 'TRM-005', qty: 3, placement: 'Placket' },
          { materialId: 'TRM-015', qty: 0.03, placement: 'All seams' },
          { materialId: 'LBL-001', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-002', qty: 1, placement: 'Side seam' },
          { materialId: 'LBL-003', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-004', qty: 1, placement: 'Attached' },
          { materialId: 'LBL-005', qty: 1, placement: 'On poly bag' }
        ],
        packaging: [
          { materialId: 'PKG-001', qty: 1 },
          { materialId: 'PKG-002', qty: 1 }
        ]
      },
      constructionNotes: 'Ribbed collar and cuffs. 3-button placket with Corozo buttons. Side vents at hem.',
      factoryCountry: 'India',
      targetFob: 5.10,
      colorways: ['White', 'Navy', 'Forest Green', 'Burgundy'],
      sizeRange: 'S-XXL',
      orderQty: 45000
    },
    {
      id: 'TP-002',
      styleName: 'Urban Zip Hoodie',
      styleNumber: 'FW25-HDZ-003',
      season: 'FW25',
      designer: 'Marcus Rivera',
      templateId: 'TPL-005',
      status: 'finalized',
      dateFinalized: '2025-11-02',
      garmentType: 'Zip-Up Hoodie',
      bom: {
        fabrics: [
          { materialId: 'FAB-005', placement: 'Body & Sleeves', consumption: 2.20 },
          { materialId: 'FAB-007', placement: 'Cuffs & Hem Rib', consumption: 0.20 }
        ],
        trims: [
          { materialId: 'TRM-001', qty: 1, placement: 'Center front' },
          { materialId: 'TRM-008', qty: 1.5, placement: 'Hood' },
          { materialId: 'TRM-014', qty: 2, placement: 'Hood cord ends' },
          { materialId: 'TRM-013', qty: 2, placement: 'Hood' },
          { materialId: 'TRM-015', qty: 0.05, placement: 'All seams' },
          { materialId: 'LBL-001', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-002', qty: 1, placement: 'Side seam' },
          { materialId: 'LBL-003', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-004', qty: 1, placement: 'Attached' },
          { materialId: 'LBL-005', qty: 1, placement: 'On poly bag' }
        ],
        packaging: [
          { materialId: 'PKG-001', qty: 1 },
          { materialId: 'PKG-002', qty: 1 },
          { materialId: 'PKG-005', qty: 1 }
        ]
      },
      constructionNotes: 'Full zip with YKK metal zipper. Split kangaroo pocket. 3-panel hood with drawcord.',
      factoryCountry: 'China',
      targetFob: 14.50,
      colorways: ['Black', 'Charcoal', 'Olive'],
      sizeRange: 'S-XXL',
      orderQty: 2000
    },
    {
      id: 'TP-003',
      styleName: 'Classic Chino Pant',
      styleNumber: 'SS25-BTM-007',
      season: 'SS25',
      designer: 'Elena Park',
      templateId: 'TPL-007',
      status: 'finalized',
      dateFinalized: '2025-10-20',
      garmentType: 'Chino Pants',
      bom: {
        fabrics: [
          { materialId: 'FAB-009', placement: 'Body', consumption: 2.00 },
          { materialId: 'FAB-008', placement: 'Pocket Bag', consumption: 0.30 }
        ],
        trims: [
          { materialId: 'TRM-002', qty: 1, placement: 'Fly' },
          { materialId: 'TRM-005', qty: 1, placement: 'Waistband' },
          { materialId: 'TRM-010', qty: 4, placement: 'Pockets' },
          { materialId: 'TRM-015', qty: 0.05, placement: 'All seams' },
          { materialId: 'LBL-001', qty: 1, placement: 'Waistband' },
          { materialId: 'LBL-002', qty: 1, placement: 'Side seam' },
          { materialId: 'LBL-003', qty: 1, placement: 'Waistband' },
          { materialId: 'LBL-006', qty: 1, placement: 'Waistband back' },
          { materialId: 'LBL-004', qty: 1, placement: 'Attached' },
          { materialId: 'LBL-005', qty: 1, placement: 'On poly bag' }
        ],
        packaging: [
          { materialId: 'PKG-001', qty: 1 },
          { materialId: 'PKG-002', qty: 1 }
        ]
      },
      constructionNotes: 'Slash front pockets, welt back pockets. Zip fly with button closure. Bar tacks at stress points.',
      factoryCountry: 'Turkey',
      targetFob: 13.00,
      colorways: ['Khaki', 'Navy', 'Stone', 'Black'],
      sizeRange: '28-38',
      orderQty: 2500
    },
    {
      id: 'TP-004',
      styleName: 'Heritage Polo',
      styleNumber: 'SS25-TOP-012',
      season: 'SS25',
      designer: 'Sarah Chen',
      templateId: 'TPL-003',
      status: 'finalized',
      dateFinalized: '2025-10-18',
      garmentType: 'Polo Shirt',
      bom: {
        fabrics: [
          { materialId: 'FAB-002', placement: 'Body', consumption: 1.55 },
          { materialId: 'FAB-007', placement: 'Collar & Cuffs', consumption: 0.15 }
        ],
        trims: [
          { materialId: 'TRM-005', qty: 3, placement: 'Placket' },
          { materialId: 'TRM-015', qty: 0.03, placement: 'All seams' },
          { materialId: 'LBL-001', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-002', qty: 1, placement: 'Side seam' },
          { materialId: 'LBL-003', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-004', qty: 1, placement: 'Attached' },
          { materialId: 'LBL-005', qty: 1, placement: 'On poly bag' }
        ],
        packaging: [
          { materialId: 'PKG-001', qty: 1 },
          { materialId: 'PKG-002', qty: 1 },
          { materialId: 'PKG-005', qty: 1 }
        ]
      },
      constructionNotes: 'Ribbed collar and cuffs. 3-button placket with buttonhole stitch. Side vents.',
      factoryCountry: 'Vietnam',
      targetFob: 7.50,
      colorways: ['White', 'Navy', 'Forest Green', 'Burgundy'],
      sizeRange: 'S-XXL',
      orderQty: 3500
    },
    {
      id: 'TP-005',
      styleName: 'Trail Windbreaker',
      styleNumber: 'SS25-OTR-005',
      season: 'SS25',
      designer: 'Marcus Rivera',
      templateId: 'TPL-010',
      status: 'in_review',
      dateFinalized: null,
      garmentType: 'Windbreaker Jacket',
      bom: {
        fabrics: [
          { materialId: 'FAB-013', placement: 'Shell', consumption: 2.15 },
          { materialId: 'FAB-013', placement: 'Lining', consumption: 2.00 }
        ],
        trims: [
          { materialId: 'TRM-002', qty: 2, placement: 'CF & pocket' },
          { materialId: 'TRM-008', qty: 1.5, placement: 'Hood & hem' },
          { materialId: 'TRM-014', qty: 2, placement: 'Cord ends' },
          { materialId: 'TRM-009', qty: 0.5, placement: 'Hem' },
          { materialId: 'TRM-011', qty: 0.3, placement: 'Cuffs' },
          { materialId: 'TRM-015', qty: 0.05, placement: 'All seams' },
          { materialId: 'LBL-001', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-002', qty: 1, placement: 'Inside pocket' },
          { materialId: 'LBL-003', qty: 1, placement: 'Center back neck' },
          { materialId: 'LBL-004', qty: 1, placement: 'Attached' },
          { materialId: 'LBL-005', qty: 1, placement: 'On poly bag' }
        ],
        packaging: [
          { materialId: 'PKG-001', qty: 1 },
          { materialId: 'PKG-002', qty: 1 }
        ]
      },
      constructionNotes: 'Packable windbreaker. Fully seam sealed. Stow-away hood. Reflective details.',
      factoryCountry: 'China',
      targetFob: 15.00,
      colorways: ['Black/Volt', 'Navy/Orange'],
      sizeRange: 'S-XL',
      orderQty: 1500
    }
  ],

  getFinalized: function() {
    return this.packs.filter(function(p) { return p.status === 'finalized'; });
  },

  getById: function(id) {
    return this.packs.find(function(p) { return p.id === id; });
  }
};
