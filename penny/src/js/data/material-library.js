// ═══════════════════════════════════════════════════════════════
// PENNY — Material Library Database (Clean Build)
// ═══════════════════════════════════════════════════════════════

const FABRIC_LIBRARY = [
  { id:'FAB-001', name:'Cotton Jersey 140gsm', category:'fabric', gsm:140, composition:'100% Cotton', width:150, unitPrice:3.20, unit:'meter', supplier:'Alok Industries', supplierCountry:'India', moq:500, leadTime:21, contractedPrice:3.05, marketPrice:3.20, priceHistory:[3.45,3.35,3.30,3.25,3.20] },
  { id:'FAB-002', name:'Cotton Jersey 160gsm', category:'fabric', gsm:160, composition:'100% Cotton', width:150, unitPrice:3.60, unit:'meter', supplier:'Alok Industries', supplierCountry:'India', moq:500, leadTime:21, contractedPrice:3.45, marketPrice:3.60, priceHistory:[3.80,3.75,3.70,3.65,3.60] },
  { id:'FAB-003', name:'Organic Cotton Jersey 160gsm', category:'fabric', gsm:160, composition:'100% Organic Cotton GOTS', width:150, unitPrice:5.10, unit:'meter', supplier:'Pratibha Syntex', supplierCountry:'India', moq:800, leadTime:28, contractedPrice:4.85, marketPrice:5.10, priceHistory:[5.50,5.40,5.30,5.20,5.10] },
  { id:'FAB-004', name:'Poly-Cotton Blend 180gsm', category:'fabric', gsm:180, composition:'60% Cotton 40% Polyester', width:150, unitPrice:2.85, unit:'meter', supplier:'Vardhman Textiles', supplierCountry:'India', moq:500, leadTime:18, contractedPrice:2.70, marketPrice:2.85, priceHistory:[3.10,3.00,2.95,2.90,2.85] },
  { id:'FAB-005', name:'French Terry 280gsm', category:'fabric', gsm:280, composition:'80% Cotton 20% Polyester', width:155, unitPrice:5.40, unit:'meter', supplier:'Luthai Textile', supplierCountry:'China', moq:600, leadTime:25, contractedPrice:5.15, marketPrice:5.40, priceHistory:[5.80,5.70,5.55,5.45,5.40] },
  { id:'FAB-006', name:'Fleece 320gsm', category:'fabric', gsm:320, composition:'100% Polyester', width:155, unitPrice:4.20, unit:'meter', supplier:'Polartec', supplierCountry:'USA', moq:300, leadTime:30, contractedPrice:4.00, marketPrice:4.20, priceHistory:[4.60,4.50,4.40,4.30,4.20] },
  { id:'FAB-007', name:'Rib Knit 1x1 220gsm', category:'fabric', gsm:220, composition:'95% Cotton 5% Elastane', width:80, unitPrice:4.80, unit:'meter', supplier:'Arvind Ltd', supplierCountry:'India', moq:300, leadTime:21, contractedPrice:4.55, marketPrice:4.80, priceHistory:[5.00,4.95,4.90,4.85,4.80] },
  { id:'FAB-008', name:'Poplin 120gsm', category:'fabric', gsm:120, composition:'100% Cotton', width:145, unitPrice:2.90, unit:'meter', supplier:'Vardhman Textiles', supplierCountry:'India', moq:500, leadTime:18, contractedPrice:2.75, marketPrice:2.90, priceHistory:[3.15,3.10,3.05,3.00,2.90] },
  { id:'FAB-009', name:'Twill 240gsm', category:'fabric', gsm:240, composition:'100% Cotton', width:150, unitPrice:3.95, unit:'meter', supplier:'Arvind Ltd', supplierCountry:'India', moq:500, leadTime:21, contractedPrice:3.75, marketPrice:3.95, priceHistory:[4.30,4.20,4.10,4.05,3.95] },
  { id:'FAB-010', name:'Denim 11oz', category:'fabric', gsm:370, composition:'98% Cotton 2% Elastane', width:150, unitPrice:5.80, unit:'meter', supplier:'Artistic Milliners', supplierCountry:'Pakistan', moq:1000, leadTime:30, contractedPrice:5.50, marketPrice:5.80, priceHistory:[6.20,6.10,6.00,5.90,5.80] },
  { id:'FAB-011', name:'Linen 150gsm', category:'fabric', gsm:150, composition:'100% Linen', width:140, unitPrice:7.40, unit:'meter', supplier:'Safilin', supplierCountry:'France', moq:300, leadTime:35, contractedPrice:7.00, marketPrice:7.40, priceHistory:[7.80,7.70,7.60,7.50,7.40] },
  { id:'FAB-012', name:'Tencel Lyocell 160gsm', category:'fabric', gsm:160, composition:'100% Tencel Lyocell', width:150, unitPrice:6.50, unit:'meter', supplier:'Lenzing AG', supplierCountry:'Austria', moq:500, leadTime:28, contractedPrice:6.20, marketPrice:6.50, priceHistory:[7.00,6.90,6.80,6.60,6.50] },
  { id:'FAB-013', name:'Nylon Ripstop 70gsm', category:'fabric', gsm:70, composition:'100% Nylon', width:148, unitPrice:3.10, unit:'meter', supplier:'Hyosung', supplierCountry:'South Korea', moq:800, leadTime:25, contractedPrice:2.95, marketPrice:3.10, priceHistory:[3.40,3.30,3.25,3.15,3.10] },
  { id:'FAB-014', name:'Recycled Polyester 150gsm', category:'fabric', gsm:150, composition:'100% rPET', width:150, unitPrice:3.80, unit:'meter', supplier:'Repreve', supplierCountry:'USA', moq:600, leadTime:28, contractedPrice:3.60, marketPrice:3.80, priceHistory:[4.10,4.00,3.95,3.85,3.80] },
  { id:'FAB-015', name:'Silk Charmeuse 90gsm', category:'fabric', gsm:90, composition:'100% Mulberry Silk', width:114, unitPrice:18.50, unit:'meter', supplier:'Jiangsu Soho', supplierCountry:'China', moq:200, leadTime:35, contractedPrice:17.50, marketPrice:18.50, priceHistory:[19.50,19.20,18.90,18.70,18.50] },
];

const TRIM_LIBRARY = [
  { id:'TRM-001', name:'YKK Metal Zipper #5', category:'trim', type:'zipper', unitPrice:0.85, unit:'piece', supplier:'YKK', supplierCountry:'Japan', moq:1000, leadTime:14, priceHistory:[0.92,0.90,0.88,0.86,0.85] },
  { id:'TRM-002', name:'YKK Nylon Zipper #3', category:'trim', type:'zipper', unitPrice:0.35, unit:'piece', supplier:'YKK', supplierCountry:'Japan', moq:2000, leadTime:14, priceHistory:[0.40,0.38,0.37,0.36,0.35] },
  { id:'TRM-003', name:'Nylon Coil Zipper Generic', category:'trim', type:'zipper', unitPrice:0.18, unit:'piece', supplier:'SBS Zipper', supplierCountry:'China', moq:5000, leadTime:10, priceHistory:[0.22,0.21,0.20,0.19,0.18] },
  { id:'TRM-004', name:'Metal Snap Button 15mm', category:'trim', type:'button', unitPrice:0.12, unit:'piece', supplier:'Ings Formosa', supplierCountry:'Taiwan', moq:5000, leadTime:14, priceHistory:[0.15,0.14,0.13,0.13,0.12] },
  { id:'TRM-005', name:'Polyester Button 18mm 4-Hole', category:'trim', type:'button', unitPrice:0.05, unit:'piece', supplier:'Global Buttons', supplierCountry:'India', moq:10000, leadTime:10, priceHistory:[0.07,0.06,0.06,0.05,0.05] },
  { id:'TRM-006', name:'Corozo Nut Button 20mm', category:'trim', type:'button', unitPrice:0.22, unit:'piece', supplier:'Full Circle', supplierCountry:'Italy', moq:3000, leadTime:21, priceHistory:[0.28,0.26,0.25,0.23,0.22] },
  { id:'TRM-007', name:'D-Ring 25mm Nickel', category:'trim', type:'ring', unitPrice:0.08, unit:'piece', supplier:'Ifon Hardware', supplierCountry:'China', moq:5000, leadTime:12, priceHistory:[0.10,0.09,0.09,0.08,0.08] },
  { id:'TRM-008', name:'Drawcord Round 5mm', category:'trim', type:'cord', unitPrice:0.15, unit:'meter', supplier:'Trim Source', supplierCountry:'India', moq:2000, leadTime:10, priceHistory:[0.18,0.17,0.16,0.15,0.15] },
  { id:'TRM-009', name:'Elastic Waistband 30mm', category:'trim', type:'elastic', unitPrice:0.25, unit:'meter', supplier:'Fulflex', supplierCountry:'Sri Lanka', moq:3000, leadTime:14, priceHistory:[0.30,0.28,0.27,0.26,0.25] },
  { id:'TRM-010', name:'Rivets Antique Brass 8mm', category:'trim', type:'rivet', unitPrice:0.04, unit:'piece', supplier:'Jeans Buttons Co', supplierCountry:'China', moq:10000, leadTime:10, priceHistory:[0.06,0.05,0.05,0.04,0.04] },
  { id:'TRM-011', name:'Velcro Hook Loop 20mm', category:'trim', type:'velcro', unitPrice:0.30, unit:'meter', supplier:'Velcro Companies', supplierCountry:'USA', moq:1000, leadTime:14, priceHistory:[0.35,0.33,0.32,0.31,0.30] },
  { id:'TRM-012', name:'Grosgrain Ribbon 15mm', category:'trim', type:'ribbon', unitPrice:0.10, unit:'meter', supplier:'May Arts', supplierCountry:'China', moq:5000, leadTime:12, priceHistory:[0.13,0.12,0.11,0.10,0.10] },
  { id:'TRM-013', name:'Metal Eyelet 12mm Gunmetal', category:'trim', type:'eyelet', unitPrice:0.06, unit:'piece', supplier:'Hengshi Hardware', supplierCountry:'China', moq:10000, leadTime:10, priceHistory:[0.08,0.07,0.07,0.06,0.06] },
  { id:'TRM-014', name:'Cord Stopper Plastic', category:'trim', type:'stopper', unitPrice:0.03, unit:'piece', supplier:'YueYuan', supplierCountry:'China', moq:10000, leadTime:10, priceHistory:[0.05,0.04,0.04,0.03,0.03] },
  { id:'TRM-015', name:'Sewing Thread Poly-Core', category:'trim', type:'thread', unitPrice:1.20, unit:'cone', supplier:'Coats Clark', supplierCountry:'UK', moq:100, leadTime:7, priceHistory:[1.35,1.30,1.28,1.25,1.20] },
];

const LABEL_LIBRARY = [
  { id:'LBL-001', name:'Woven Main Label', category:'label', type:'main', unitPrice:0.08, unit:'piece', supplier:'Avery Dennison', moq:10000, leadTime:14, priceHistory:[0.10,0.09,0.09,0.08,0.08] },
  { id:'LBL-002', name:'Printed Care Label', category:'label', type:'care', unitPrice:0.03, unit:'piece', supplier:'Avery Dennison', moq:10000, leadTime:10, priceHistory:[0.04,0.04,0.03,0.03,0.03] },
  { id:'LBL-003', name:'Size Label Woven', category:'label', type:'size', unitPrice:0.02, unit:'piece', supplier:'Paxar', moq:20000, leadTime:10, priceHistory:[0.03,0.03,0.02,0.02,0.02] },
  { id:'LBL-004', name:'Hang Tag Cardboard', category:'label', type:'hangtag', unitPrice:0.12, unit:'piece', supplier:'PrintWorks', moq:5000, leadTime:12, priceHistory:[0.15,0.14,0.13,0.12,0.12] },
  { id:'LBL-005', name:'Price Sticker Barcode', category:'label', type:'barcode', unitPrice:0.01, unit:'piece', supplier:'Avery Dennison', moq:50000, leadTime:7, priceHistory:[0.02,0.01,0.01,0.01,0.01] },
  { id:'LBL-006', name:'Leather Patch Label', category:'label', type:'patch', unitPrice:0.35, unit:'piece', supplier:'Pacific Leather', moq:2000, leadTime:18, priceHistory:[0.40,0.38,0.37,0.36,0.35] },
];

const PACKAGING_LIBRARY = [
  { id:'PKG-001', name:'Individual Poly Bag', category:'packaging', unitPrice:0.04, unit:'piece', supplier:'ClearPak', moq:10000, leadTime:7, priceHistory:[0.05,0.05,0.04,0.04,0.04] },
  { id:'PKG-002', name:'Tissue Paper Wrap', category:'packaging', unitPrice:0.03, unit:'piece', supplier:'PackRight', moq:10000, leadTime:7, priceHistory:[0.04,0.03,0.03,0.03,0.03] },
  { id:'PKG-003', name:'Shipping Carton 12pc', category:'packaging', unitPrice:0.90, unit:'carton', supplier:'BoxCo', moq:500, leadTime:10, priceHistory:[1.00,0.98,0.95,0.92,0.90] },
  { id:'PKG-004', name:'Silica Gel Pack', category:'packaging', unitPrice:0.02, unit:'piece', supplier:'DryTech', moq:20000, leadTime:7, priceHistory:[0.03,0.02,0.02,0.02,0.02] },
  { id:'PKG-005', name:'Header Card Branded', category:'packaging', unitPrice:0.08, unit:'piece', supplier:'PrintWorks', moq:5000, leadTime:12, priceHistory:[0.10,0.09,0.09,0.08,0.08] },
];

function getAllMaterials() {
  return [...FABRIC_LIBRARY, ...TRIM_LIBRARY, ...LABEL_LIBRARY, ...PACKAGING_LIBRARY];
}

function findMaterial(id) {
  return getAllMaterials().find(function(m) { return m.id === id; });
}

function searchMaterials(query, category) {
  var materials = getAllMaterials();
  if (category) {
    materials = materials.filter(function(m) { return m.category === category; });
  }
  if (query) {
    var lower = query.toLowerCase();
    materials = materials.filter(function(m) {
      return m.name.toLowerCase().indexOf(lower) !== -1 ||
        m.id.toLowerCase().indexOf(lower) !== -1 ||
        (m.supplier && m.supplier.toLowerCase().indexOf(lower) !== -1) ||
        (m.composition && m.composition.toLowerCase().indexOf(lower) !== -1);
    });
  }
  return materials;
}

var FACTORY_RATES = {
  'India':      { laborRate: 0.035, overhead: 1.25 },
  'China':      { laborRate: 0.055, overhead: 1.30 },
  'Bangladesh': { laborRate: 0.025, overhead: 1.20 },
  'Vietnam':    { laborRate: 0.040, overhead: 1.25 },
  'Turkey':     { laborRate: 0.060, overhead: 1.35 },
  'Pakistan':   { laborRate: 0.028, overhead: 1.22 },
  'Cambodia':   { laborRate: 0.030, overhead: 1.20 },
  'Sri Lanka':  { laborRate: 0.032, overhead: 1.23 },
};

window.MaterialLibrary = {
  FABRIC_LIBRARY: FABRIC_LIBRARY,
  TRIM_LIBRARY: TRIM_LIBRARY,
  LABEL_LIBRARY: LABEL_LIBRARY,
  PACKAGING_LIBRARY: PACKAGING_LIBRARY,
  getAllMaterials: getAllMaterials,
  findMaterial: findMaterial,
  searchMaterials: searchMaterials,
  FACTORY_RATES: FACTORY_RATES
};
