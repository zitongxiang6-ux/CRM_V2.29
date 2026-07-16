const products = [
  { id: 101, name: "Tile Series Universal Socket 2.1", type: "Other", model: "MPST-U10-NP.18", code: "308081422", spec: "Space Gray-Plastic", price: 59.84, category: "Intelligent Interaction", tone: "", shape: "socket" },
  { id: 102, name: "Tile Series 8 Buttons Smart Panel 2.1", type: "Buspro", model: "MPBT-8B-BP.18", code: "308013713", spec: "Space Gray-Metal", price: 70, category: "Intelligent Interaction", tone: "", shape: "" },
  { id: 103, name: "Xelent Series 4 Buttons Smart Panel", type: "Buspro", model: "MPBXL-4B-BP.18", code: "308013718", spec: "Ash Gray-Metal", price: 200, category: "Intelligent Interaction", tone: "black", shape: "" },
  { id: 104, name: "Enviro Air Quality Sensor", type: "Buspro Wireless", model: "MS-AQS-BP.01", code: "308082016", spec: "Ivory White-Plastic", price: 101.2, category: "Environmental Control System", tone: "", shape: "round" },
  { id: 105, name: "Smart Load Center", type: "Buspro Wireless", model: "ME-GSE-SPG63A", code: "308072109", spec: "Black-Metal", price: 300, category: "Lighting Control", tone: "black", shape: "tall" },
  { id: 106, name: "Curtain Motor Controller", type: "Buspro", model: "MCTC-02-BP.12", code: "308092407", spec: "Champagne Gold-Metal", price: 128.6, category: "Shading System", tone: "gold", shape: "tall" },
  { id: 107, name: "Home Gateway Pro", type: "Buspro", model: "MGTW-PRO.22", code: "308056321", spec: "Black-Plastic", price: 249, category: "Gateway", tone: "black", shape: "round" },
  { id: 108, name: "Dry Contact Module 8CH", type: "Buspro", model: "MDCM-8C-BP.11", code: "308067890", spec: "Ivory White-Plastic", price: 86.3, category: "Auxiliary Equipment", tone: "", shape: "tall" },
];

const initialCart = [
  { lineId: 1, productId: 102, name: products[1].name, spec: products[1].spec, code: products[1].code, price: products[1].price, qty: 1, selected: false, laser: "No", customization: "", custom: false },
  { lineId: 2, productId: 103, name: products[2].name, spec: products[2].spec, code: products[2].code, price: products[2].price, qty: 1, selected: false, laser: "Yes", customization: "", custom: false },
  { lineId: 3, productId: 102, name: "Tile Series 2 Buttons Smart Panel 2.1 - Custom", spec: "Space Gray-Metal", code: "Pending", price: 0, qty: 1, selected: false, laser: "Yes", customization: "black and blue icons", custom: true },
];

const initialOrders = [
  { id: 17, no: "DD-2026-06-2500017", customer: "Russia - XOFDRR", project: "Smart Villa - Moscow", business: "Project Order", hdl: "HDL-260625-017", po: "PO-RU-0625", laser: "Yes", date: "2026/06/25", productSubtotal: 329.8, paid: 0, currency: "USD", amount: 329.8, projectNo: "PRJ-2026-051", contract: "HT-2026-06-2500017", tax: "Tax included", status: "Pending Payment", reviewResult: "Approved", reviewNote: "Non-standard item code completed.", erp: "ERP-903321", receiver: "Camellia", phone: "12345678", country: "Georgia / Samegrelo-Zemo Svaneti", address: "120", shipping: "Freight Collect", logistics: "UPS" },
  { id: 16, no: "DD-2026-06-2500016", customer: "DXIAJKMNDFD", project: "Hotel Public Area", business: "Standard Order", hdl: "HDL-260625-016", po: "PO-HK-1168", laser: "Yes", date: "2026/06/25", productSubtotal: 188.4, paid: 0, currency: "HKD", amount: 188.4, projectNo: "PRJ-2026-046", contract: "-", tax: "Tax excluded", status: "Pending Confirmation", reviewResult: "-", reviewNote: "-", erp: "-", receiver: "Lucia", phone: "852 2388 9921", country: "Hong Kong", address: "Kwun Tong 168", shipping: "HDL Prepaid Freight", logistics: "DHL" },
  { id: 15, no: "DD-2026-06-2500015", customer: "Georgia Partner", project: "Office Lighting Upgrade", business: "Project Order", hdl: "HDL-260625-015", po: "PO-GE-4520", laser: "Yes", date: "2026/06/24", productSubtotal: 612.5, paid: 612.5, currency: "USD", amount: 612.5, projectNo: "PRJ-2026-039", contract: "HT-2026-06-2400015", tax: "Tax included", status: "Paid", reviewResult: "Approved", reviewNote: "Payment slip confirmed.", erp: "ERP-903118", receiver: "Nino", phone: "995 555 789", country: "Georgia / Tbilisi", address: "Rustaveli Avenue 20", shipping: "Freight Collect", logistics: "Fedex" },
  { id: 14, no: "DD-2026-06-2500014", customer: "Qatar Controls LLC", project: "Residential Tower A", business: "Project Order", hdl: "HDL-260625-014", po: "PO-QA-2088", laser: "Yes", date: "2026/06/23", productSubtotal: 978.9, paid: 0, currency: "USD", amount: 978.9, projectNo: "PRJ-2026-028", contract: "-", tax: "Tax excluded", status: "Review Failed", reviewResult: "Review Failed", reviewNote: "Please confirm the engraving file and product specification.", erp: "-", receiver: "Omar", phone: "974 5500 8899", country: "Qatar / Doha", address: "West Bay 88", shipping: "Customer Pickup", logistics: "-" },
];
const additionalOrderSeeds = [
  { id: 13, no: "DD-2026-06-2500013", customer: "UAE Smart Systems", project: "Marina Residence", business: "Project Order", hdl: "HDL-260622-013", po: "PO-AE-3310", laser: "Yes", date: "2026/06/22", productSubtotal: 845.6, paid: 0, currency: "USD", amount: 845.6, projectNo: "PRJ-2026-024", contract: "-", tax: "Tax included", status: "Pending Review", reviewResult: "-", reviewNote: "Requirements submitted for review.", erp: "-", receiver: "Aisha", phone: "971 50 345 6688", country: "United Arab Emirates / Dubai", address: "Dubai Marina 18", shipping: "HDL Prepaid Freight", logistics: "DHL" },
  { id: 12, no: "DD-2026-06-2500012", customer: "Singapore Automation", project: "Orchard Hotel", business: "Project Order", hdl: "HDL-260621-012", po: "PO-SG-7721", laser: "Yes", date: "2026/06/21", productSubtotal: 1260, paid: 0, currency: "USD", amount: 1260, projectNo: "PRJ-2026-019", contract: "-", tax: "Tax included", status: "In Production", reviewResult: "Approved", reviewNote: "Non-standard product code is being entered.", erp: "ERP-902912", receiver: "Ethan", phone: "65 6123 8890", country: "Singapore", address: "Orchard Road 230", shipping: "HDL Prepaid Freight", logistics: "DHL" },
  { id: 11, no: "DD-2026-06-2500011", customer: "Malaysia Building Tech", project: "Kuala Lumpur Office", business: "Standard Order", hdl: "HDL-260620-011", po: "PO-MY-5088", laser: "No", date: "2026/06/20", productSubtotal: 420, paid: 420, currency: "USD", amount: 420, projectNo: "PRJ-2026-015", contract: "HT-2026-06-2000011", tax: "Tax included", status: "Pending Shipment", reviewResult: "Approved", reviewNote: "Payment and stock confirmed.", erp: "ERP-902811", receiver: "Amir", phone: "60 12 778 3390", country: "Malaysia / Kuala Lumpur", address: "Jalan Ampang 86", shipping: "Freight Collect", logistics: "UPS" },
  { id: 10, no: "DD-2026-06-2500010", customer: "Thailand Smart Living", project: "Bangkok Residence", business: "Project Order", hdl: "HDL-260619-010", po: "PO-TH-4370", laser: "No", date: "2026/06/19", productSubtotal: 758, paid: 758, currency: "USD", amount: 758, projectNo: "PRJ-2026-012", contract: "HT-2026-06-1900010", tax: "Tax included", status: "Pending Receipt", reviewResult: "Approved", reviewNote: "The order has been dispatched.", erp: "ERP-902710", receiver: "Narin", phone: "66 81 448 2200", country: "Thailand / Bangkok", address: "Sukhumvit 45", shipping: "HDL Prepaid Freight", logistics: "Fedex" },
  { id: 9, no: "DD-2026-06-2500009", customer: "Indonesia Integrator", project: "Jakarta Showroom", business: "Standard Order", hdl: "HDL-260618-009", po: "PO-ID-2981", laser: "No", date: "2026/06/18", productSubtotal: 1090, paid: 1090, currency: "USD", amount: 1090, projectNo: "PRJ-2026-009", contract: "HT-2026-06-1800009", tax: "Tax included", status: "Completed", reviewResult: "Approved", reviewNote: "Receipt confirmed by the customer.", erp: "ERP-902609", receiver: "Dewi", phone: "62 812 773 992", country: "Indonesia / Jakarta", address: "Sudirman 102", shipping: "HDL Prepaid Freight", logistics: "DHL" },
  { id: 8, no: "DD-2026-06-2500008", customer: "Vietnam Project Co.", project: "Hanoi Apartment", business: "Project Order", hdl: "HDL-260617-008", po: "PO-VN-1872", laser: "No", date: "2026/06/17", productSubtotal: 260, paid: 0, currency: "USD", amount: 260, projectNo: "PRJ-2026-006", contract: "-", tax: "Tax excluded", status: "Closed", reviewResult: "-", reviewNote: "Cancelled by the channel partner.", erp: "-", receiver: "Linh", phone: "84 90 552 7711", country: "Vietnam / Hanoi", address: "Ba Dinh 55", shipping: "Customer Pickup", logistics: "-" },
];
initialOrders.push(...additionalOrderSeeds);
const channelOrderProfiles = [
  { customer: "Russia - XOFDRR", paymentMethod: "USD", orderRemarks: "-", paymentRemarks: "-", deliveryRemarks: "Ship together", proof: "payment-slip-250017.pdf", freightAccount: "3435555", dispatch: "Ship together", shippingTime: "2026/07/02", offer: "Yes", laserFile: "Tile-villa-017.dxf", tileLaser: "Yes", laserFamilies: ["Tile Series", "Xelent Series"] },
  { customer: "DXIAJKMNDFD", paymentMethod: "HKD", orderRemarks: "Please confirm all products together.", paymentRemarks: "-", deliveryRemarks: "Ready to ship", proof: "-", freightAccount: "-", dispatch: "Ready to ship", shippingTime: "-", offer: "No", laserFile: "-", laserFiles: {}, tileLaser: "Yes", laserFamilies: ["Tile Series"] },
  { customer: "Georgia Partner", paymentMethod: "USD", orderRemarks: "Project delivery in one shipment.", paymentRemarks: "Payment slip confirmed.", deliveryRemarks: "Ship together", proof: "payment-slip-250015.pdf", freightAccount: "9981200", dispatch: "Ship together", shippingTime: "2026/06/30", offer: "Yes", laserFile: "Xelent-office-015.dxf", tileLaser: "No", laserFamilies: ["Xelent Series"] },
  { customer: "Qatar Controls LLC", paymentMethod: "USD", orderRemarks: "Please review the customized icon file.", paymentRemarks: "-", deliveryRemarks: "Customer pickup after confirmation", proof: "-", freightAccount: "-", dispatch: "Ship available stock first", shippingTime: "-", offer: "No", laserFile: "Tile-tower-014.dxf", tileLaser: "Yes", laserFamilies: ["Tile Series"] },
  { customer: "UAE Smart Systems", paymentMethod: "USD", orderRemarks: "Please prioritize engraving review.", paymentRemarks: "-", deliveryRemarks: "Ship together", proof: "-", freightAccount: "-", dispatch: "Ship together", shippingTime: "-", offer: "Yes", laserFile: "Xelent-marina-013.dxf", tileLaser: "No", laserFamilies: ["Xelent Series"] },
  { customer: "Singapore Automation", paymentMethod: "USD", orderRemarks: "Deliver all custom panels together.", paymentRemarks: "-", deliveryRemarks: "Ship together", proof: "-", freightAccount: "-", dispatch: "Ship together", shippingTime: "-", offer: "Yes", laserFile: "Tile-orchard-012.dxf", tileLaser: "Yes", laserFamilies: ["Tile Series"] },
  { customer: "Malaysia Building Tech", paymentMethod: "USD", orderRemarks: "Ready for shipment.", paymentRemarks: "Payment confirmed.", deliveryRemarks: "Ready to ship", proof: "payment-slip-250011.pdf", freightAccount: "778821", dispatch: "Ready to ship", shippingTime: "2026/06/28", offer: "No", laserFile: "-", tileLaser: "No", laserFamilies: [] },
  { customer: "Thailand Smart Living", paymentMethod: "USD", orderRemarks: "Please track the delivery.", paymentRemarks: "Payment confirmed.", deliveryRemarks: "Ready to ship", proof: "payment-slip-250010.pdf", freightAccount: "-", dispatch: "Ready to ship", shippingTime: "2026/06/27", offer: "No", laserFile: "-", tileLaser: "No", laserFamilies: [] },
  { customer: "Indonesia Integrator", paymentMethod: "USD", orderRemarks: "-", paymentRemarks: "Payment confirmed.", deliveryRemarks: "Delivered", proof: "payment-slip-250009.pdf", freightAccount: "-", dispatch: "Ready to ship", shippingTime: "2026/06/24", offer: "No", laserFile: "-", tileLaser: "No", laserFamilies: [] },
  { customer: "Vietnam Project Co.", paymentMethod: "USD", orderRemarks: "Project was postponed.", paymentRemarks: "-", deliveryRemarks: "-", proof: "-", freightAccount: "-", dispatch: "Ready to ship", shippingTime: "-", offer: "No", laserFile: "-", tileLaser: "No", laserFamilies: [] },
];

initialOrders.forEach((order, index) => {
  Object.assign(order, channelOrderProfiles[index]);
  order.discount = index % 2 === 0 ? "Enjoy discount" : "No discount";
  order.engravingSupplier = order.laserFamilies.includes("Xelent Series") ? "Xelent" : "Tile 2.1";
  order.laserFiles = {};
  if (order.laserFile !== "-") {
    if (order.laserFile.toLowerCase().includes("xelent")) order.laserFiles.Xelent = order.laserFile;
    else order.laserFiles.Tile = order.laserFile;
  }
  order.orderProducts = { standardQty: 1, nonstandardQty: 1 };
});

const categories = ["ALL", "Intelligent Interaction", "Security System", "Lighting Control", "Smart Household Appliances", "Environmental Control System", "Shading System", "Gateway", "Auxiliary Equipment"];
const statusOrder = ["Pending Confirmation", "Pending Review", "In Production", "Pending Payment", "Paid", "Pending Shipment", "Pending Receipt", "Completed", "Closed", "Review Failed"];

const state = {
  route: location.hash.replace("#", "") || "shop",
  selectedProductId: 101,
  selectedSpec: products[0].spec,
  shopQuery: "",
  category: "ALL",
  cart: initialCart.map((line) => ({ ...line })),
  orders: initialOrders.map((order) => ({ ...order })),
  orderQuick: "All",
  orderFilters: { no: "", status: "", dateFrom: "", dateTo: "", project: "", erp: "", discount: "", engravingSupplier: "", laserFile: "" },
  appliedOrderFilters: { no: "", status: "", dateFrom: "", dateTo: "", project: "", erp: "", discount: "", engravingSupplier: "", laserFile: "" },
  reviewTab: "basic",
  reviewProductTab: "standard",
  modifyProductTab: "standard",
  addItemsOpen: false,
  checkoutProductTab: "standard",
  checkoutLineIds: [],
  checkoutDraft: { reportedProject: "", project: "", business: "", address: "Georgia / Samegrelo-Zemo Svaneti 120 Tony 12345678", receiver: "Tony", phone: "12345678", country: "Georgia / Samegrelo-Zemo Svaneti", addressDetail: "120", shipping: "HDL Prepaid Freight", logistics: "DHL", freightAccount: "", dispatch: "Ready to ship", orderRemark: "" },
  modal: null,
  addressEdit: null,
  popover: null,
  cartNotice: null,
  toast: "",
  nextLineId: 10,
  nextOrderId: 30,
};

const app = document.querySelector("#app");

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function money(value, currency = "USD") {
  const symbols = { USD: "$", HKD: "HK$", EUR: "EUR " };
  return `${symbols[currency] || `${currency} `}${Number(value || 0).toFixed(2)}`;
}

function currentProduct() {
  return products.find((product) => product.id === state.selectedProductId) || products[0];
}

function routeRoot() { return state.route.split("/")[0]; }
function routeOrder(prefix) {
  if (routeRoot() !== prefix) return null;
  const orderId = Number(state.route.split("/")[1]);
  return state.orders.find((order) => order.id === orderId) || null;
}
function routeLabel() {
  if (state.route === "cart") return "Shopping Cart";
  if (state.route === "checkout") return "Submit Order";
  if (state.route === "orders") return "Standard Order";
  if (state.route === "product") return "Product Details";
  if (routeRoot() === "order-detail") return "Order Details";
  if (routeRoot() === "modify-order") return "Modify Order";
  return "Product Library";
}
function renderBreadcrumb() {
  const root = routeRoot();
  if (root === "order-detail" || root === "modify-order") {
    return `<div class="breadcrumb"><span>Channel Partner Platform</span><span>/</span><button class="breadcrumb-button" type="button" onclick="go('orders')">Standard Order</button><span>/</span><strong>${root === "order-detail" ? "Order Details" : "Modify Order"}</strong></div>`;
  }
  return `<div class="breadcrumb"><span>Channel Partner Platform</span><span>/</span><strong>${routeLabel()}</strong></div>`;
}

function go(route) {
  state.modal = null;
  state.addressEdit = null;
  state.popover = null;
  clearInterval(cartNoticeTimer);
  state.cartNotice = null;
  if (location.hash === `#${route}`) {
    state.route = route;
    render();
  } else {
    location.hash = route;
  }
}

function renderShell(content) {
  const root = routeRoot();
  const shopActive = ["shop", "product"].includes(root);
  const orderActive = ["orders", "order-detail", "modify-order"].includes(root);
  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand"><span class="brand-mark">HDL</span><span class="brand-name">partner</span></div>
        <div class="top-actions">
          <button class="top-command" type="button">English</button>
          <button class="top-command" type="button" onclick="showToast('No new messages.')">Message Center</button>
          <button class="top-command" type="button" onclick="showToast('Settings are read-only in this prototype.')">System Settings</button>
          <button class="top-command account" type="button">Hi~Zhang San</button>
        </div>
      </header>
      <aside class="sidebar">
        <div class="side-label">Channel Workspace</div>
        <button class="nav-item ${shopActive ? "active" : ""}" type="button" onclick="go('shop')"><span>Product Library</span></button>
        <button class="nav-item ${["cart", "checkout"].includes(root) ? "active" : ""}" type="button" onclick="go('cart')"><span>Shopping Cart</span><span class="nav-badge">${state.cart.length}</span></button>
        <button class="nav-item ${orderActive ? "active" : ""}" type="button" onclick="go('orders')"><span>Standard Order</span></button>
        <div class="side-note">International channel business<br />Partner order portal</div>
      </aside>
      <main class="main">
        <div class="workspace">
          ${renderBreadcrumb()}
          ${content}
        </div>
      </main>
      ${state.popover ? renderPopover() : ""}
      ${state.modal ? renderModal() : ""}
      ${state.addressEdit ? renderAddressEditModal() : ""}
      ${state.cartNotice ? renderCartNotice() : ""}
      ${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ""}
    </div>`;
}

function render() {
  state.route = location.hash.replace("#", "") || "shop";
  let content = renderShop();
  if (state.route === "product") content = renderProduct();
  if (state.route === "cart") content = renderCart();
  if (state.route === "checkout") content = renderCheckout();
  if (state.route === "orders") content = renderOrders();
  if (routeRoot() === "order-detail") {
    const order = routeOrder("order-detail");
    content = order ? renderReviewPage(order) : `<section class="page"><div class="empty">Order not found.<br /><button class="primary-button" type="button" onclick="go('orders')">Back to Standard Order</button></div></section>`;
  }
  if (routeRoot() === "modify-order") {
    const order = routeOrder("modify-order");
    content = order ? renderModifyOrderPage(order) : `<section class="page"><div class="empty">Order not found.<br /><button class="primary-button" type="button" onclick="go('orders')">Back to Standard Order</button></div></section>`;
  }
  app.innerHTML = renderShell(content);
}
function productVisual(product, extra = "") {
  return `<div class="device ${esc(product.tone)} ${esc(product.shape)} ${extra}"></div>`;
}

function renderShop() {
  const keyword = state.shopQuery.toLowerCase();
  const visible = products.filter((product) => {
    const categoryMatch = state.category === "ALL" || product.category === state.category;
    const keywordMatch = !keyword || `${product.name} ${product.code} ${product.model}`.toLowerCase().includes(keyword);
    return categoryMatch && keywordMatch;
  });
  return `
    <section class="page">
      <div class="page-tabs"><button class="page-tab" type="button">Domestic</button><button class="page-tab active" type="button">International</button></div>
      <div class="toolbar">
        <span class="toolbar-count">Total ${visible.length} items</span>
        <div class="search-box"><input id="shop-query" value="${esc(state.shopQuery)}" placeholder="Please input the product name / ERP Number..." onkeydown="if(event.key==='Enter') applyShopSearch()" /><button type="button" onclick="applyShopSearch()">Search</button></div>
        <button class="primary-button cart-command" type="button" onclick="go('cart')">Shopping Cart (${state.cart.length})</button>
      </div>
      <div class="category-bar"><strong>Category</strong>${categories.map((category) => `<button class="category-chip ${state.category === category ? "active" : ""}" type="button" onclick="setCategory('${esc(category)}')">${esc(category)}</button>`).join("")}</div>
      <div class="campaign-strip">
        <article class="campaign panels"><h2>Panel order page</h2><p>Channel-specific panel selection and engraving options.</p><span class="campaign-device"></span></article>
        <article class="campaign eco"><h2>Ecological New</h2><p>Smart home products for complete project solutions.</p><span class="campaign-device"></span></article>
        <article class="campaign light"><h2>Lighting Control</h2><p>Professional dimming and relay products.</p><span class="campaign-device"></span></article>
        <article class="campaign special"><h2>Special offer area</h2><p>Selected partner pricing for international channels.</p><span class="campaign-device"></span></article>
      </div>
      ${visible.length ? `<div class="product-grid">${visible.map((product) => `
        <button class="product-card" type="button" onclick="openProduct(${product.id})">
          <div class="product-visual">${productVisual(product)}</div>
          <div class="product-info"><h2>${esc(product.name)}</h2><p>${esc(product.type)} | ${esc(product.model)}</p><p>$-- <span class="channel-price">Uniform price for channels</span></p><span class="price">From ${money(product.price)}</span><span class="channel-price">Product Price</span></div>
        </button>`).join("")}</div>` : `<div class="empty">No matching products.</div>`}
    </section>`;
}

function applyShopSearch() {
  state.shopQuery = document.querySelector("#shop-query")?.value.trim() || "";
  render();
}

function setCategory(category) {
  state.category = category;
  render();
}

function openProduct(id) {
  state.selectedProductId = id;
  state.selectedSpec = products.find((product) => product.id === id)?.spec || "";
  go("product");
}

function selectVariant(spec) {
  state.selectedSpec = spec;
  render();
}

function renderProduct() {
  const product = currentProduct();
  const variants = [product.spec, "Champagne Gold-Plastic", "Ash Gray-Plastic", "Ivory White-Plastic"].filter((value, index, array) => array.indexOf(value) === index);
  return `
    <section class="page detail-page">
      <div class="detail-head"><h1>${esc(product.name)}</h1><div class="command-row"><button class="primary-button" type="button">Product Information v</button><button class="outline-button" type="button" onclick="go('cart')">Shopping Cart</button><button class="outline-button" type="button" onclick="go('shop')">Return</button></div></div>
      <div class="detail-layout">
        <aside class="gallery"><div class="gallery-main"><button class="gallery-arrow previous" type="button" aria-label="Previous image">&lt;</button>${productVisual(product)}<button class="gallery-arrow next" type="button" aria-label="Next image">&gt;</button></div><div class="gallery-variant-tabs">${variants.map((spec) => `<button class="${state.selectedSpec === spec ? "active" : ""}" type="button" onclick="selectVariant('${esc(spec)}')">${esc(spec)} (1)</button>`).join("")}</div><div class="gallery-thumbs"><button class="thumb active" type="button">${productVisual(product)}</button></div><button class="download-images" type="button" onclick="showToast('Image package prepared in the full system.')">Download All Images (8 images)</button></aside>
        <div class="detail-content">
          <dl class="fact-grid">
            <dt>Model Number</dt><dd>${esc(product.model)}</dd>
            <dt>Product Protocol</dt><dd>${esc(product.type)}</dd>
            <dt>Product Type</dt><dd>Core Products</dd>
            <dt>Product Category</dt><dd>${esc(product.category)}-Non-intelligent Panel</dd>
            <dt>Units of measurement</dt><dd>platform</dd>
            <dt>Product Specifications</dt><dd><div class="variant-row">${variants.map((spec) => `<button class="variant ${state.selectedSpec === spec ? "active" : ""}" type="button" onclick="selectVariant('${esc(spec)}')">${esc(spec)}</button>`).join("")}</div></dd>
            <dt>product number</dt><dd>${esc(product.code)}</dd>
            <dt>Product Price</dt><dd><span class="price">${money(product.price)}</span></dd>
            <dt>Uniform price in the channel</dt><dd>$--</dd>
            <dt>Remark</dt><dd><input id="detail-remark" class="form-control" placeholder="Please enter the remark" /></dd>
          </dl>
        </div>
      </div>
      <div class="purchase-dock"><div class="purchase-quantity"><input id="detail-qty" type="number" min="1" value="1" /><span>Inventory Shortage</span></div><button class="primary-button" type="button" onclick="addProductToCart()">Add to Cart</button><label for="detail-custom">Non-standard<br />customization</label><input id="detail-custom" class="custom-input" placeholder="Please enter" /><label for="detail-laser">Laser Engraving</label><select id="detail-laser"><option>No</option><option>Yes</option></select></div>
      <div class="product-overview"><nav><button class="active" type="button">Overview</button><button type="button">Appearance</button></nav><p>Overxxxx</p></div>
    </section>`;
}

let cartNoticeTimer;
function startCartNotice(qty) {
  clearInterval(cartNoticeTimer);
  state.cartNotice = { qty, seconds: 8 };
  render();
  cartNoticeTimer = setInterval(() => {
    if (!state.cartNotice) return clearInterval(cartNoticeTimer);
    state.cartNotice.seconds -= 1;
    if (state.cartNotice.seconds <= 0) {
      state.cartNotice = null;
      clearInterval(cartNoticeTimer);
    }
    render();
  }, 1000);
}
function closeCartNotice() { clearInterval(cartNoticeTimer); state.cartNotice = null; render(); }
function cartNoticeNavigate(route) { clearInterval(cartNoticeTimer); state.cartNotice = null; go(route); }
function renderCartNotice() {
  const notice = state.cartNotice;
  return `<aside class="cart-notice" role="status"><button class="cart-notice-close" type="button" aria-label="Close" onclick="closeCartNotice()">x</button><h3>Added to Shopping Cart</h3><p>${notice.qty} item${notice.qty === 1 ? "" : "s"} added. You can keep shopping on this page.</p><small>Auto closes in <strong>${notice.seconds}s</strong></small><div><button class="outline-button" type="button" onclick="cartNoticeNavigate('shop')">Back to Mall List</button><button class="primary-button" type="button" onclick="cartNoticeNavigate('cart')">Checkout Cart</button></div></aside>`;
}

function addProductToCart() {
  const product = currentProduct();
  const qty = Math.max(1, Number(document.querySelector("#detail-qty")?.value || 1));
  const laser = document.querySelector("#detail-laser")?.value || "No";
  const customization = document.querySelector("#detail-custom")?.value.trim() || "";
  if (laser === "Yes" && !customization) {
    showToast("Please enter non-standard customization requirements.");
    return;
  }
  const existing = state.cart.find((line) => !line.custom && line.productId === product.id && line.spec === state.selectedSpec && line.laser === laser);
  if (existing) existing.qty += qty;
  else state.cart.push({ lineId: state.nextLineId++, productId: product.id, name: product.name, spec: state.selectedSpec, code: product.code, price: product.price, qty, selected: false, laser, customization: "", custom: false });
  if (laser === "Yes") {
    const customLine = state.cart.find((line) => line.custom && line.productId === product.id && line.spec === state.selectedSpec && line.customization === customization);
    if (customLine) customLine.qty += qty;
    else state.cart.push({ lineId: state.nextLineId++, productId: product.id, name: `${product.name} - Custom`, spec: state.selectedSpec, code: product.code, price: 0, qty, selected: false, laser: "Yes", customization, custom: true });
  }
  startCartNotice(qty);
}

function cartRows(lines, custom) {
  const columns = custom ? 8 : 11;
  if (!lines.length) return `<tr><td colspan="${columns}"><div class="empty">No ${custom ? "non-standard" : "standard"} products.</div></td></tr>`;
  return lines.map((line) => {
    const product = products.find((item) => item.id === line.productId) || products[0];
    if (custom) {
      return `<tr>
        <td><input type="checkbox" ${line.selected ? "checked" : ""} onchange="setCartSelected(${line.lineId}, this.checked)" /></td>
        <td><button class="link-button" type="button" onclick="openProduct(${product.id})">${esc(line.name.replace(" - Custom", ""))}</button></td>
        <td>${esc(line.spec)}</td><td>${esc(line.code === "Pending" ? product.code : line.code)}</td>
        <td><div class="quantity"><button type="button" onclick="changeCartQty(${line.lineId}, -1)">-</button><input value="${line.qty}" oninput="setCartQty(${line.lineId}, this.value)" /><button type="button" onclick="changeCartQty(${line.lineId}, 1)">+</button></div></td>
        <td><select class="form-control" onchange="setCartValue(${line.lineId}, 'laser', this.value)"><option ${line.laser === "Yes" ? "selected" : ""}>Yes</option><option ${line.laser === "No" ? "selected" : ""}>No</option></select></td>
        <td><input class="form-control" value="${esc(line.customization)}" oninput="setCartValue(${line.lineId}, 'customization', this.value)" /></td>
        <td><div class="row-actions"><button class="small-button" type="button" onclick="openProduct(${product.id})">View</button><button class="small-button danger-link" type="button" onclick="removeCartLine(${line.lineId})">Delete</button></div></td>
      </tr>`;
    }
    return `<tr>
      <td><input type="checkbox" ${line.selected ? "checked" : ""} onchange="setCartSelected(${line.lineId}, this.checked)" /></td>
      <td><button class="link-button" type="button" onclick="openProduct(${product.id})">${esc(line.name)}</button></td>
      <td>${esc(line.spec)}</td><td>${esc(line.code)}</td>
      <td class="money">${money(line.price)}</td>
      <td><div class="quantity"><button type="button" onclick="changeCartQty(${line.lineId}, -1)">-</button><input value="${line.qty}" oninput="setCartQty(${line.lineId}, this.value)" /><button type="button" onclick="changeCartQty(${line.lineId}, 1)">+</button></div></td>
      <td><select class="form-control" onchange="setCartValue(${line.lineId}, 'laser', this.value)"><option ${line.laser === "Yes" ? "selected" : ""}>Yes</option><option ${line.laser === "No" ? "selected" : ""}>No</option><option ${line.laser === "--" ? "selected" : ""}>--</option></select></td>
      <td class="money">${money(line.price * line.qty)}</td><td><div class="row-actions"><button class="small-button" type="button" onclick="openProduct(${product.id})">View</button><button class="small-button danger-link" type="button" onclick="removeCartLine(${line.lineId})">Delete</button></div></td>
    </tr>`;
  }).join("");
}

function renderCart() {
  const standard = state.cart.filter((line) => !line.custom);
  const custom = state.cart.filter((line) => line.custom);
  const selected = state.cart.filter((line) => line.selected);
  const total = selected.filter((line) => !line.custom).reduce((sum, line) => sum + line.price * line.qty, 0);
  const standardSelected = selected.filter((line) => !line.custom).length;
  const customSelected = selected.filter((line) => line.custom).length;
  const allStandardSelected = standard.length > 0 && standard.every((line) => line.selected);
  const allCustomSelected = custom.length > 0 && custom.every((line) => line.selected);
  return `
    <section class="page cart-page">
      <div class="section-title"><h2>Standard Products</h2><span class="spacer"></span><button class="danger-button" type="button" onclick="removeSelectedCart()">Mass Delete</button><button class="primary-button" type="button" onclick="go('shop')">Continue Shopping &gt;&gt;&gt;</button></div>
      <div class="table-scroll"><table class="cart-table standard-cart-table"><thead><tr><th><input type="checkbox" aria-label="Select all standard products" ${allStandardSelected ? "checked" : ""} onchange="selectCartGroup(false, this.checked)" /></th><th>Model No.</th><th>Product Specifications</th><th>Product Code</th><th>Unit Price</th><th>Quantity</th><th>Laser Engraving</th><th>Total</th><th>Actions</th></tr></thead><tbody>${cartRows(standard, false)}</tbody></table></div>
      <div class="section-title"><h2>Non-standard Products</h2><span class="custom-note-inline">Note: Prices for non-standard customized products are to be determined and will be finalized after HDL's review.</span></div>
      <div class="table-scroll"><table class="cart-table nonstandard-cart-table"><thead><tr><th><input type="checkbox" aria-label="Select all non-standard products" ${allCustomSelected ? "checked" : ""} onchange="selectCartGroup(true, this.checked)" /></th><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>Quantity</th><th>Laser Engraving</th><th>Non-standard customization</th><th>Operation</th></tr></thead><tbody>${cartRows(custom, true)}</tbody></table></div>
      <div class="cart-summary"><span><b>Selected</b></span><span>Standard Products: <b>${standardSelected}</b></span><span>Non-standard Products: <b>${customSelected}</b></span><span class="spacer"></span><span>Total: <strong>${money(total)}</strong></span><span>(Non-standard product prices are not included)</span><button class="primary-button" type="button" onclick="openCheckout()">Submit</button></div>
    </section>`;
}

function selectCartGroup(custom, selected) { state.cart.filter((line) => line.custom === custom).forEach((line) => { line.selected = selected; }); render(); }
function setCartSelected(lineId, selected) { const line = state.cart.find((item) => item.lineId === lineId); if (line) line.selected = selected; render(); }
function setCartValue(lineId, key, value) { const line = state.cart.find((item) => item.lineId === lineId); if (line) line[key] = value; }
function setCartQty(lineId, value) { const line = state.cart.find((item) => item.lineId === lineId); if (line) line.qty = Math.max(1, Number(value || 1)); }
function changeCartQty(lineId, delta) { const line = state.cart.find((item) => item.lineId === lineId); if (line) line.qty = Math.max(1, line.qty + delta); render(); }
function removeCartLine(lineId) { state.cart = state.cart.filter((line) => line.lineId !== lineId); showToast("Product removed."); render(); }
function removeSelectedCart() { if (!state.cart.some((line) => line.selected)) return showToast("Please select products first."); state.cart = state.cart.filter((line) => !line.selected); showToast("Selected products deleted."); render(); }

function openCheckout() {
  const selected = state.cart.filter((line) => line.selected);
  if (!selected.length) return showToast("Please select at least one product.");
  const invalid = selected.find((line) => line.custom && !line.customization.trim());
  if (invalid) return showToast("Please complete non-standard customization requirements.");
  state.checkoutLineIds = selected.map((line) => line.lineId);
  state.checkoutProductTab = selected.some((line) => !line.custom) ? "standard" : "nonstandard";
  go("checkout");
}

function statusClass(status) {
  if (["Paid", "Pending Shipment", "Pending Receipt", "Completed"].includes(status)) return "success";
  if (["Pending Review", "In Production"].includes(status)) return "review";
  if (["Review Failed", "Closed"].includes(status)) return "failed";
  return "pending";
}

function filteredOrders() {
  return state.orders.filter((order) => {
    if (state.orderQuick !== "All" && order.status !== state.orderQuick) return false;
    const filters = state.appliedOrderFilters;
    const orderDate = order.date.replaceAll("/", "-");
    if (filters.no && !order.no.toLowerCase().includes(filters.no.toLowerCase())) return false;
    if (filters.project && !order.project.toLowerCase().includes(filters.project.toLowerCase())) return false;
    if (filters.status && order.status !== filters.status) return false;
    if (filters.dateFrom && orderDate < filters.dateFrom) return false;
    if (filters.dateTo && orderDate > filters.dateTo) return false;
    if (filters.erp && !order.erp.toLowerCase().includes(filters.erp.toLowerCase())) return false;
    if (filters.discount && order.discount !== filters.discount) return false;
    if (filters.engravingSupplier && order.engravingSupplier !== filters.engravingSupplier) return false;
    if (filters.laserFile && !order.laserFile.toLowerCase().includes(filters.laserFile.toLowerCase())) return false;
    return true;
  });
}

function quickCount(status) { return status === "All" ? state.orders.length : state.orders.filter((order) => order.status === status).length; }
function setOrderQuick(status) { state.orderQuick = status; state.popover = null; render(); }

function renderOrders() {
  const rows = filteredOrders();
  const quick = ["All", "Pending Payment", "Review Failed"];
  return `
    <section class="page orders-page">
      <div class="quick-tabs">${quick.map((status) => `<button class="quick-tab ${state.orderQuick === status ? "active" : ""}" type="button" onclick="setOrderQuick('${status}')">${status} (${quickCount(status)})</button>`).join("")}</div>
      <div class="filters order-filters">
        <input id="order-no" value="${esc(state.orderFilters.no)}" placeholder="Please enter order number" />
        <select id="order-status"><option value="">Select an order status</option>${statusOrder.map((status) => `<option ${state.orderFilters.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>
        <div class="date-range"><label class="date-filter"><span>From</span><input id="order-date-from" type="date" value="${esc(state.orderFilters.dateFrom)}" /></label><label class="date-filter"><span>To</span><input id="order-date-to" type="date" value="${esc(state.orderFilters.dateTo)}" /></label></div>
        <input id="order-project" value="${esc(state.orderFilters.project)}" placeholder="Please enter a project name" />
        <select id="order-engraving-supplier"><option value="">Engraving Supplier</option>${["Tile 2.1", "Fangzhi", "Inkslab", "Eave", "Fanora", "Xelent"].map((value) => `<option ${state.orderFilters.engravingSupplier === value ? "selected" : ""}>${value}</option>`).join("")}</select>
        <input id="order-erp" value="${esc(state.orderFilters.erp)}" placeholder="Please enter ERP Order No." />
        <select id="order-discount"><option value="">Select Discount Status</option><option ${state.orderFilters.discount === "Enjoy discount" ? "selected" : ""}>Enjoy discount</option><option ${state.orderFilters.discount === "No discount" ? "selected" : ""}>No discount</option></select>
        <input id="order-laser-file" value="${esc(state.orderFilters.laserFile)}" placeholder="Enter engraving file name or file No." />
        <div class="filter-actions"><button class="small-button" type="button" onclick="resetOrderFilters()">Reset</button><button class="small-button primary" type="button" onclick="applyOrderFilters()">Search</button></div>
      </div>
      <div class="table-scroll"><table class="orders-table"><thead><tr><th>Order Number</th><th>Order Date</th><th>Project Name</th><th>Business Type</th><th>Laser Engraving Required</th><th>Total Amount Payable</th><th>Order Total</th><th>Amount Paid</th><th>Amount to be paid</th><th>Payment Currency</th><th>Project Number</th><th>Contract Number</th><th>Whether Tax Included</th><th>Shipping Time</th><th>ERP Order No.</th><th>Order Status</th><th>Review Result</th><th>Review Notes</th><th class="operation">Operation</th></tr></thead><tbody>${rows.length ? rows.map(renderOrderRow).join("") : `<tr><td colspan="19"><div class="empty">No matching orders.</div></td></tr>`}</tbody></table></div>
      <div class="pagination"><span>Total ${rows.length}</span><button class="small-button" type="button">1</button><span>10 items / page</span></div>
    </section>`;
}

function laserActionTypes(order) {
  if (!order.laserFamilies?.length) return [];
  return order.laserFamilies.map((family) => family === "Xelent Series" ? "laserXelent" : "laserTile");
}

function actionLabel(type, order) {
  const labels = { review: "Review", modify: "Modify Order", address: "Modify Address", another: "Another Order", cancel: "Cancel Order", pay: "To Pay", contract: "Download Contract" };
  if (type === "laserTile") return `${order.laserFiles?.Tile ? "Edit" : "Link"} Tile laser`;
  if (type === "laserXelent") return `${order.laserFiles?.Xelent ? "Edit" : "Link"} Xelent laser`;
  return labels[type] || type;
}

function orderActionTypes(order) {
  const map = {
    "Pending Confirmation": ["review", "address", "another", "cancel", "laser"],
    "Pending Review": ["review", "modify", "address", "another", "cancel", "laser"],
    "In Production": ["review", "modify", "address", "another", "cancel", "laser"],
    "Pending Payment": ["review", "pay", "modify", "address", "another", "cancel", "laser"],
    Paid: ["review", "address", "contract", "another", "cancel", "laser"],
    "Pending Shipment": ["review", "address", "contract", "another", "cancel"],
    "Pending Receipt": ["review", "contract", "another"],
    Completed: ["review", "contract", "another"],
    Closed: ["review", "another"],
    "Review Failed": ["review", "modify", "address", "another", "cancel", "laser"],
  };
  return (map[order.status] || ["review"]).flatMap((type) => type === "laser" ? laserActionTypes(order) : [type]).filter((type) => type !== "contract" || order.contract !== "-");
}

function renderOrderRow(order) {
  const actions = orderActionTypes(order);
  const direct = actions[1];
  const more = actions.slice(2);
  return `<tr>
    <td><button class="link-button" type="button" onclick="openOrderAction('review', ${order.id})">${esc(order.no)}</button></td><td>${esc(order.date)}</td><td>${esc(order.project)}</td><td>${esc(order.business)}</td><td>${esc(order.laser)}</td><td class="money">${money(order.amount, order.currency)}</td><td class="money">${money(order.productSubtotal, order.currency)}</td><td class="money">${money(order.paid, order.currency)}</td>
    <td class="money">${money(Math.max(0, order.amount - order.paid), order.currency)}</td><td>${esc(order.currency)}</td><td>${esc(order.projectNo)}</td><td>${esc(order.contract)}</td><td>${esc(order.tax)}</td><td>${esc(order.shippingTime)}</td><td>${esc(order.erp)}</td><td><span class="status ${statusClass(order.status)}">${esc(order.status)}</span></td><td>${esc(order.reviewResult)}</td><td>${esc(order.reviewNote)}</td>
    <td class="operation"><div class="row-actions"><button class="small-button primary" type="button" onclick="openOrderAction('review', ${order.id})">Review</button>${direct ? `<button class="small-button warning" type="button" onclick="openOrderAction('${direct}', ${order.id})">${actionLabel(direct, order)}</button>` : ""}${more.length ? `<button class="small-button" type="button" onclick="openMore(event, ${order.id})">More...</button>` : ""}</div></td>
  </tr>`;
}
function syncOrderFilterInputs() {
  state.orderFilters = {
    no: document.querySelector("#order-no")?.value.trim() || "", status: document.querySelector("#order-status")?.value || "",
    dateFrom: document.querySelector("#order-date-from")?.value || "", dateTo: document.querySelector("#order-date-to")?.value || "",
    project: document.querySelector("#order-project")?.value.trim() || "", erp: document.querySelector("#order-erp")?.value.trim() || "",
    discount: document.querySelector("#order-discount")?.value || "", engravingSupplier: document.querySelector("#order-engraving-supplier")?.value || "",
    laserFile: document.querySelector("#order-laser-file")?.value.trim() || "",
  };
}

function applyOrderFilters() { syncOrderFilterInputs(); state.appliedOrderFilters = { ...state.orderFilters }; render(); }
function resetOrderFilters() {
  state.orderFilters = { no: "", status: "", dateFrom: "", dateTo: "", project: "", erp: "", discount: "", engravingSupplier: "", laserFile: "" };
  state.appliedOrderFilters = { ...state.orderFilters }; state.orderQuick = "All"; render();
}

function openMore(event, orderId) {
  const rect = event.currentTarget.getBoundingClientRect();
  state.popover = { orderId, x: Math.max(8, Math.min(innerWidth - 196, rect.right - 188)), y: Math.max(8, Math.min(innerHeight - 320, rect.bottom + 5)) };
  render();
}

function renderPopover() {
  const order = state.orders.find((item) => item.id === state.popover.orderId);
  if (!order) return "";
  const actions = orderActionTypes(order).slice(2);
  return `<div class="popover-layer" onclick="closePopover()"><div class="popover" style="left:${state.popover.x}px;top:${state.popover.y}px" onclick="event.stopPropagation()">${actions.map((type) => `<button type="button" onclick="openOrderAction('${type}', ${order.id})">${actionLabel(type, order)}</button>`).join("")}</div></div>`;
}

function closePopover() { state.popover = null; render(); }
function openOrderAction(type, orderId) {
  state.popover = null;
  if (type === "review") {
    state.reviewTab = "basic";
    state.reviewProductTab = "standard";
    return go(`order-detail/${orderId}`);
  }
  if (type === "modify") {
    state.modifyProductTab = "standard";
    state.addItemsOpen = false;
    return go(`modify-order/${orderId}`);
  }
  if (type === "contract") return downloadContract(orderId);
  if (type === "laserTile" || type === "laserXelent") state.modal = { type: "laser", family: type === "laserTile" ? "Tile" : "Xelent", associationMethod: "", orderId };
  else if (type === "address") {
    const order = state.orders.find((item) => item.id === orderId);
    state.modal = { type, orderId, shipping: order?.shipping || "HDL Prepaid Freight", logistics: order?.logistics && order.logistics !== "-" ? order.logistics : "DHL", freightAccount: order?.freightAccount && order.freightAccount !== "-" ? order.freightAccount : "", dispatch: order?.dispatch || "Ready to ship" };
  } else state.modal = { type, orderId };
  render();
}
function closeModal() { state.modal = null; state.addressEdit = null; state.addItemsOpen = false; render(); }
function setReviewTab(tab) { state.reviewTab = tab; render(); }
function setReviewProductTab(tab) { state.reviewProductTab = tab; render(); }
function setModifyProductTab(tab) { state.modifyProductTab = tab; render(); }
function toggleAddItems(open) { state.addItemsOpen = open; render(); }

function orderProductsTable(order) {
  const product = products[1];
  const productName = product.name.replace("8 Buttons", "2 Buttons");
  return `<div class="table-scroll"><table class="modal-table product-detail-table"><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Model</th><th>Product Code</th><th>Laser Engraving</th><th>Quantity</th><th>Unit Price</th><th>Amount</th><th>Delivery Status</th></tr></thead><tbody><tr><td>${esc(productName)}</td><td>${esc(product.spec)}</td><td>${esc(product.model)}</td><td>${esc(product.code)}</td><td>${esc(order.laser)}</td><td>1</td><td>${money(product.price, order.currency)}</td><td>${money(product.price, order.currency)}</td><td>Out of stock</td></tr></tbody></table></div>`;
}

function reviewPairs(items) {
  return `<div class="review-pairs">${items.map(([label, value, tone]) => `<div class="review-pair"><span>${label}</span><strong class="${tone || ""}">${esc(value)}</strong></div>`).join("")}</div>`;
}

function renderReviewBasic(order) {
  const payable = `${money(order.amount, order.currency)} (Order Total: ${money(order.productSubtotal, order.currency)}, Freight: ${money(0, order.currency)}, Pay Handling Fee: ${money(0, order.currency)})`;
  return `
    <section class="review-section"><h3>Order Information</h3>${reviewPairs([
      ["Order Number", order.no], ["Customer Name", order.customer], ["Project Name", order.project], ["Project Number", order.projectNo],
      ["Order Time", order.date], ["Order Total", `${money(order.productSubtotal, order.currency)} (Original order amount: ${money(order.productSubtotal, order.currency)})`, "danger-text"], ["Total Amount Payable", payable, "danger-text"], ["Payment Method", order.paymentMethod],
      ["Contract Number", order.contract], ["HDL Ref No", order.hdl], ["ERP Order No.", order.erp], ["Whether Tax Included", order.tax],
      ["Order Status", order.status], ["Proof of Payment", order.proof], ["Order Remarks", order.orderRemarks], ["Payment Remarks", order.paymentRemarks], ["Delivery Remarks", order.deliveryRemarks]
    ])}</section>
    <section class="review-section"><h3>Delivery Address</h3>${reviewPairs([
      ["Delivery Address", `${order.country} ${order.address}`], ["Shipping Method", order.shipping], ["Logistics Company", order.logistics], ["Freight collect account", order.freightAccount],
      ["Dispatch Requirement", order.dispatch], ["Receiver", order.receiver], ["Contact Number", order.phone]
    ])}</section>
    <section class="review-section compact"><h3>Laser Engraving Required</h3><table class="laser-summary"><thead><tr><th>Panel Series</th><th>Laser Engraving Required</th></tr></thead><tbody><tr><td>Tile</td><td>${order.laserFamilies.includes("Tile Series") ? "Yes" : "No"}</td></tr><tr><td>Xelent</td><td>${order.laserFamilies.includes("Xelent Series") ? "Yes" : "No"}</td></tr></tbody></table></section>`;
}

function renderReviewProducts(order) {
  const stockNotice = `<div class="stock-notice">After the order and payment for out-of-stock products are submitted, stocking and shipment will be completed within 60 days. The specific time is subject to the actual shipment from the warehouse.</div>`;
  if (state.reviewProductTab === "nonstandard") {
    return `${stockNotice}<div class="review-subtabs"><button type="button" onclick="setReviewProductTab('standard')">Standard Products</button><button class="active" type="button" onclick="setReviewProductTab('nonstandard')">No-standard Products</button></div><div class="table-scroll"><table class="modal-table product-detail-table"><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>No-standard Product Code</th><th>Quantity</th><th>Unit Price</th><th>Laser Engraving</th><th>Non-standard customization</th><th>Amount</th><th>Delivery Status</th></tr></thead><tbody><tr><td>Tile Series 2 Buttons Smart Panel 2.1</td><td>Space Gray-Metal</td><td>308013713</td><td>435567007</td><td>1</td><td>${money(70, order.currency)}</td><td>${esc(order.laser)}</td><td>black and blue</td><td>${money(70, order.currency)}</td><td>Out of stock</td></tr></tbody></table></div>`;
  }
  return `${stockNotice}<div class="review-subtabs"><button class="active" type="button" onclick="setReviewProductTab('standard')">Standard Products</button><button type="button" onclick="setReviewProductTab('nonstandard')">No-standard Products</button></div>${orderProductsTable(order)}`;
}

function renderReviewTile(order) {
  const tileFile = order.laserFiles?.Tile || "-";
  const auditStatus = order.reviewResult === "-" ? "To be confirmed" : order.reviewResult;
  const documentRows = tileFile === "-"
    ? `<div class="laser-document empty-document"><span>-</span></div>`
    : [tileFile, `Tile-engraving-instructions-${order.id}.pdf`].map((file) => `<div class="laser-document"><span>${esc(file)}</span><button class="link-button" type="button" onclick="showToast('Laser engraving file preview opened.')">Preview</button><button class="link-button" type="button" onclick="showToast('Laser engraving file download started.')">Download</button></div>`).join("");
  return `<section class="review-section tile-review"><h3>Tile</h3>${reviewPairs([
    ["Audit Status", auditStatus], ["Review Instructions", order.reviewNote], ["Review Time", order.reviewResult === "-" ? "-" : "2026/06/26 10:28"], ["Reviewer", order.reviewResult === "-" ? "-" : "HDL Reviewer"],
    ["Update Time", tileFile === "-" ? "-" : "2026/07/16"], ["Uploader", tileFile === "-" ? "-" : order.customer]
  ])}<div class="laser-document-section"><strong>Laser engraving requirements document</strong>${documentRows}</div></section>`;
}

function orderStage(order) {
  const map = { "Pending Confirmation": 1, "Pending Review": 2, "Review Failed": 2, "In Production": 3, "Pending Payment": 3, Paid: 4, "Pending Shipment": 5, "Pending Receipt": 7, Completed: 8, Closed: 0 };
  return map[order.status] ?? 0;
}

function renderOrderRecord(order) {
  const stages = [
    { label: "Order Submitted", actor: order.customer, description: "The channel partner submitted the order." },
    { label: "Requirements Confirmation", actor: "Lucia", description: "The Sales Manager confirms whether the customer's submitted requirements are valid." },
    { label: "Order Review", actor: "Carl Jensen", description: order.status === "Review Failed" ? order.reviewNote : "The Sales Management Department reviews the requirements." },
    { label: "Non-standard Production", actor: "Carl Jensen", description: "HDL carries out internal production of custom / non-standard products." },
    { label: "Order Paid", actor: order.customer, description: "The customer completed the offline transfer and uploaded the bank slip." },
    { label: "Shipment Confirmed", actor: "HDL Logistics", description: "HDL checks the mark sign uploaded by the customer and confirms shipment." },
    { label: "Dispatched", actor: order.logistics, description: "The logistics company dispatched the order." },
    { label: "Receipt Confirmed", actor: order.customer, description: "The customer confirmed receipt of the shipment." },
    { label: "Order Completed", actor: order.customer, description: "The order was completed after receipt confirmation." },
  ];
  const current = orderStage(order);
  const times = ["11:43:46", "11:44:03", "12:44:03", "12:44:03", "11:43:46", "11:43:46", "15:20:18", "16:08:32", "16:10:05"];
  return `<aside class="review-record"><h3>Order Record</h3><div class="record-line">${stages.slice().reverse().map((step, reverseIndex) => {
    const index = stages.length - 1 - reverseIndex;
    const complete = index <= current;
    return `<div class="record-step ${complete ? "done" : ""} ${index === current ? "current" : ""}"><strong>${step.label}</strong>${complete ? `<div class="record-meta"><span>${esc(step.actor || "-")}</span><time>${esc(order.date)} ${times[index]}</time></div><p>${esc(step.description)}</p>` : `<span>Pending</span>`}</div>`;
  }).join("")}</div></aside>`;
}

function renderReviewDetail(order) {
  const tabs = [["basic", "Basic Information"], ["products", "Product Information"], ["tile", "Tile"]];
  const content = state.reviewTab === "products" ? renderReviewProducts(order) : state.reviewTab === "tile" ? renderReviewTile(order) : renderReviewBasic(order);
  return `<div class="review-detail">
    <div class="review-summary"><div><span class="summary-label">Order No.</span><strong>${esc(order.no)}</strong><span class="status ${statusClass(order.status)}">${esc(order.status)}</span></div><div class="summary-meta"><span>Project Name</span><strong>${esc(order.project)}</strong><span>Order Date</span><strong>${esc(order.date)}</strong></div></div>
    <div class="review-grid"><div class="review-main"><nav class="review-tabs">${tabs.map(([key, label]) => `<button class="${state.reviewTab === key ? "active" : ""}" type="button" onclick="setReviewTab('${key}')">${label}</button>`).join("")}</nav><div class="review-content">${content}</div></div>${renderOrderRecord(order)}</div>
  </div>`;
}

function renderReviewPage(order) {
  return `<section class="page order-detail-page">${renderReviewDetail(order)}</section>`;
}

function radioOptions(name, current, options, changeHandler = "") {
  const change = changeHandler ? ` onchange="${changeHandler}"` : "";
  return `<div class="radio-options">${options.map((option) => `<label><input type="radio" name="${name}" value="${esc(option)}" ${current === option ? "checked" : ""}${change} /><span>${esc(option)}</span></label>`).join("")}</div>`;
}

function renderModifyOrder(order) {
  const standard = state.modifyProductTab === "standard";
  const qty = standard ? order.orderProducts.standardQty : order.orderProducts.nonstandardQty;
  const product = products[1];
  const productName = product.name.replace("8 Buttons", "2 Buttons");
  const table = standard
    ? `<div class="table-scroll"><table class="modal-table product-detail-table"><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Model</th><th>Product Code</th><th>Laser Engraving</th><th>Quantity</th><th>Unit Price</th><th>Operation</th></tr></thead><tbody>${qty ? `<tr><td>${esc(productName)}</td><td>${esc(product.spec)}</td><td>${esc(product.model)}</td><td><input id="modify-product-code" class="table-input" value="308090328" /></td><td>${esc(order.laser)}</td><td><input class="table-input qty-input" type="number" min="1" value="${qty}" onchange="setModifyQty(${order.id}, false, this.value)" /></td><td>${money(70, order.currency)}</td><td><button class="small-button" type="button" onclick="deleteOrderItem(${order.id}, false)">Delete</button></td></tr>` : `<tr><td colspan="8"><div class="empty table-empty">No standard products.</div></td></tr>`}</tbody></table></div>`
    : `<div class="table-scroll"><table class="modal-table product-detail-table"><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>No-standard Product Code</th><th>Quantity</th><th>Unit Price</th><th>Laser Engraving</th><th>Non-standard customization</th><th>Amount</th><th>Delivery Status</th><th>Operation</th></tr></thead><tbody>${qty ? `<tr><td>${esc(productName)}</td><td>${esc(product.spec)}</td><td>${esc(product.code)}</td><td><input class="table-input" value="435567007" /></td><td><input class="table-input qty-input" type="number" min="1" value="${qty}" onchange="setModifyQty(${order.id}, true, this.value)" /></td><td>${money(20, order.currency)}</td><td>Yes</td><td>black and blue</td><td>***</td><td>Out of stock</td><td><button class="small-button" type="button" onclick="deleteOrderItem(${order.id}, true)">Delete</button></td></tr>` : `<tr><td colspan="11"><div class="empty table-empty">No non-standard products.</div></td></tr>`}</tbody></table></div>`;
  const addDialog = state.addItemsOpen ? `<div class="inline-dialog-layer"><section class="inline-dialog"><header><h3>Add More Items</h3><button class="icon-button" type="button" onclick="toggleAddItems(false)">x</button></header><div class="add-search"><input class="form-control" placeholder="Search by product name, product model, or product code" /><button class="small-button" type="button">Reset</button><button class="small-button primary" type="button">Search</button></div><table><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Model</th><th>Operation</th></tr></thead><tbody><tr><td>${esc(productName)}</td><td>${esc(product.spec)}</td><td>${esc(product.model)}</td><td><button class="small-button primary" type="button" onclick="addOrderItem(${order.id})">Add</button></td></tr></tbody></table><footer><button class="ghost-button" type="button" onclick="toggleAddItems(false)">Cancel</button><button class="primary-button" type="button" onclick="toggleAddItems(false)">Submit</button></footer></section></div>` : "";
  return `<div class="modify-summary"><span class="summary-label">Order No.</span><strong>${esc(order.no)}</strong><span class="status ${statusClass(order.status)}">${esc(order.status)}</span><span>Project Name</span><strong>${esc(order.project)}</strong><span>Order Date</span><strong>${esc(order.date)}</strong></div><div class="modify-toolbar"><div class="review-subtabs"><button class="${standard ? "active" : ""}" type="button" onclick="setModifyProductTab('standard')">Standard Products</button><button class="${!standard ? "active" : ""}" type="button" onclick="setModifyProductTab('nonstandard')">No-standard Products</button></div><button class="small-button" type="button" onclick="toggleAddItems(true)">Add More Items</button></div>${table}<div class="modify-total">Total: <strong>${money(order.amount, order.currency)}</strong></div>${addDialog}`;
}

function renderModifyOrderPage(order) {
  return `<section class="page modify-order-page"><div class="modify-page-content">${renderModifyOrder(order)}</div><footer class="page-action-footer"><button class="ghost-button" type="button" onclick="go('orders')">Cancel</button><button class="primary-button" type="button" onclick="saveOrderAction('modify', ${order.id})">Submit</button></footer></section>`;
}

function setModifyQty(orderId, custom, value) { const order = state.orders.find((item) => item.id === orderId); if (order) order.orderProducts[custom ? "nonstandardQty" : "standardQty"] = Math.max(1, Number(value || 1)); }
function deleteOrderItem(orderId, custom) { const order = state.orders.find((item) => item.id === orderId); if (order) order.orderProducts[custom ? "nonstandardQty" : "standardQty"] = 0; render(); }
function addOrderItem(orderId) { const order = state.orders.find((item) => item.id === orderId); if (order) order.orderProducts.standardQty += 1; state.addItemsOpen = false; showToast("Product added to the order."); }

function openAddressEditor(returnType, orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  state.addressEdit = {
    returnType,
    orderId,
    receiver: order?.receiver || state.checkoutDraft.receiver || "new address",
    phone: order?.phone || state.checkoutDraft.phone || "13642754050",
    country: order?.country || state.checkoutDraft.country || "Afghanistan / Herat",
    address: order?.address || state.checkoutDraft.addressDetail || "tianlong11.5503",
  };
  render();
}
function renderAddressEditModal() {
  const draft = state.addressEdit;
  if (!draft) return "";
  const countries = [draft.country, "Afghanistan / Herat", "Georgia / Tbilisi", "Hong Kong / Kowloon"].filter((value, index, list) => value && list.indexOf(value) === index);
  return `<div class="modal-layer nested-layer" onclick="returnFromAddressEdit()"><section class="modal address-edit-modal" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><header class="modal-head"><h2>Address Edit</h2><button class="icon-button" type="button" aria-label="Close" onclick="returnFromAddressEdit()">x</button></header><div class="modal-body"><div class="address-detail-form"><label class="form-field"><span><b class="required">*</b>Receiver</span><input id="edit-receiver" class="form-control" placeholder="Please enter the receiver" value="${esc(draft.receiver)}" /></label><label class="form-field"><span><b class="required">*</b>Contact Number</span><input id="edit-phone" class="form-control" placeholder="Please enter the contact number" value="${esc(draft.phone)}" /></label><label class="form-field"><span><b class="required">*</b>Country/City</span><select id="edit-country" class="form-control">${countries.map((country) => `<option ${country === draft.country ? "selected" : ""}>${esc(country)}</option>`).join("")}</select></label><label class="form-field"><span><b class="required">*</b>Address</span><input id="edit-address" class="form-control" placeholder="Please enter the detailed address" value="${esc(draft.address)}" /></label></div></div><footer class="modal-foot"><button class="ghost-button" type="button" onclick="returnFromAddressEdit()">Cancel</button><button class="primary-button" type="button" onclick="saveAddressEdit()">Submit</button></footer></section></div>`;
}
function returnFromAddressEdit() { state.addressEdit = null; render(); }
function saveAddressEdit() {
  const draft = state.addressEdit;
  if (!draft) return;
  const receiver = document.querySelector("#edit-receiver")?.value.trim() || "";
  const phone = document.querySelector("#edit-phone")?.value.trim() || "";
  const country = document.querySelector("#edit-country")?.value || "";
  const address = document.querySelector("#edit-address")?.value.trim() || "";
  if (!receiver || !phone || !country || !address) return showToast("Please complete the address information.");
  const order = state.orders.find((item) => item.id === draft.orderId);
  if (order) Object.assign(order, { receiver, phone, country, address });
  else Object.assign(state.checkoutDraft, { receiver, phone, country, addressDetail: address, address: `${country} ${address} ${receiver} ${phone}` });
  state.addressEdit = null;
  render();
}
function setAddressModalField(field, value) {
  if (!state.modal || state.modal.type !== "address") return;
  state.modal[field] = value;
}
function setAddressShipping(value) {
  setAddressModalField("freightAccount", document.querySelector("#modal-freight-account")?.value ?? state.modal?.freightAccount ?? "");
  setAddressModalField("shipping", value);
  render();
}
function updatePaymentUpload(input) {
  const files = [...(input.files || [])];
  if (files.length > 5) {
    input.value = "";
    return showToast("A maximum of 5 payment images can be uploaded.");
  }
  if (files.some((file) => !/\.(png|jpe?g)$/i.test(file.name))) {
    input.value = "";
    return showToast("Only .png, .jpg, and .jpeg images are supported.");
  }
  if (files.some((file) => file.size > 5 * 1024 * 1024)) {
    input.value = "";
    return showToast("Each payment image must be no larger than 5M.");
  }
  const card = document.querySelector("#modal-voucher-card");
  const mark = document.querySelector("#modal-voucher-mark");
  const label = document.querySelector("#modal-voucher-label");
  card?.classList.toggle("has-file", files.length > 0);
  if (mark) mark.textContent = files.length ? String(files.length) : "+";
  if (label) label.textContent = files.length ? `${files.length} image${files.length > 1 ? "s" : ""} selected` : "Upload Img";
  if (card) card.title = files.map((file) => file.name).join("\n");
}
function setLaserAssociation(method) {
  state.modal.associationMethod = method;
  setTimeout(render, 0);
}

function renderModal() {
  const { type, orderId } = state.modal;
  if (type === "addressEdit") return renderAddressEditModal();
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return "";
  let title = "Order Action";
  let body = "";
  let footer = `<button class="ghost-button" type="button" onclick="closeModal()">Cancel</button><button class="primary-button" type="button" onclick="saveOrderAction('${type}', ${order.id})">Submit</button>`;

  if (type === "address") {
    title = "Modify Address";
    const shipping = state.modal.shipping;
    const showLogistics = shipping !== "Customer Pickup";
    const showFreightAccount = shipping === "Freight Collect";
    body = `<div class="address-modal-form"><div class="address-select"><div><span><b class="required">*</b>Delivery Address</span><button class="link-button" type="button" onclick="openAddressEditor('address', ${order.id})">Change Address</button></div><select id="modal-address" class="form-control" aria-label="Delivery Address"><option>${esc(`${order.country} ${order.address} ${order.receiver} ${order.phone}`)}</option></select></div><fieldset><legend><b class="required">*</b>Shipping Method</legend>${radioOptions("shipping", shipping, ["HDL Prepaid Freight", "Customer Pickup", "Freight Collect"], "setAddressShipping(this.value)")}</fieldset>${showLogistics ? `<fieldset><legend><b class="required">*</b>Logistics Company</legend>${radioOptions("logistics", state.modal.logistics, ["DHL", "Fedex", "Aramex", "UPS"], "setAddressModalField('logistics', this.value)")}</fieldset>` : ""}${showFreightAccount ? `<label class="freight-account"><span><b class="required">*</b>Freight collect account</span><input id="modal-freight-account" class="form-control" placeholder="Please input" value="${esc(state.modal.freightAccount)}" oninput="setAddressModalField('freightAccount', this.value)" /></label>` : ""}<fieldset><legend><b class="required">*</b>Dispatch Requirement</legend>${radioOptions("dispatch", state.modal.dispatch, ["Ready to ship", "Ship available stock first", "Ship together"], "setAddressModalField('dispatch', this.value)")}</fieldset></div>`;
  }
  if (type === "pay") {
    title = "Are you sure the order has been paid for?";
    const remaining = Math.max(0, order.amount - order.paid);
    const returned = order.status === "Review Failed" ? `<div class="notice">The payment record was returned, please verify and re-complete the payment operation. Return Note: ${esc(order.reviewNote)}</div>` : "";
    body = `${returned}<div class="payment-form"><p class="payment-balance-copy">Your Balance has <strong>$24000</strong> can be used for this order</p><div class="payment-use-row"><span><b class="required">*</b>whether to use</span>${radioOptions("use-balance", "Do not use", ["Use", "Do not use"])}</div><div class="payment-due-copy"><p>This order also needs <strong>${money(remaining, order.currency)}</strong> (${money(remaining, order.currency)})</p><p>to pay</p></div><div class="payment-upload-field"><span><b class="required">*</b>Proof of Payment</span><div class="payment-upload-content"><label id="modal-voucher-card" class="payment-upload-card" for="modal-voucher"><input id="modal-voucher" type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" multiple onchange="updatePaymentUpload(this)" /><strong id="modal-voucher-mark">+</strong><small id="modal-voucher-label">Upload Img</small></label><p>Support .png .jpg .jpeg format Maximum upload 5, size limit 5M</p></div></div><label class="payment-remarks-row"><span>Payment Remarks</span><input id="modal-payment-remarks" class="form-control" placeholder="Please enter payment remarks" value="${esc(order.paymentRemarks === "-" ? "" : order.paymentRemarks)}" /></label></div>`;
    footer = `<button class="ghost-button" type="button" onclick="closeModal()">Cancle</button><button class="primary-button" type="button" onclick="saveOrderAction('pay', ${order.id})">Confirm</button>`;
  }
  if (type === "another") {
    title = "Hint";
    body = `<div class="confirm-action"><strong>Are you sure you want to add the same products again?</strong></div>`;
    footer = `<button class="ghost-button" type="button" onclick="closeModal()">Cancel</button><button class="primary-button" type="button" onclick="saveOrderAction('another', ${order.id})">Confirm</button>`;
  }
  if (type === "cancel") {
    title = "Are you sure you want to cancel this order";
    body = `<label class="form-field cancel-reason"><span><b class="required">*</b> Reason</span><input id="modal-cancel-reason" class="form-control" placeholder="Please enter the reason for cancellation" /></label>`;
    footer = `<button class="ghost-button" type="button" onclick="closeModal()">Cancle</button><button class="primary-button" type="button" onclick="saveOrderAction('cancel', ${order.id})">Confirm</button>`;
  }
  if (type === "laser") {
    const family = state.modal.family || "Tile";
    const method = state.modal.associationMethod || "";
    title = `Associated ${family.toUpperCase()} laser engraving documents`;
    body = `<div class="laser-association"><div class="form-field"><span><b class="required">*</b> Association Method</span><div class="radio-options"><label><input type="radio" name="laser-association" value="Associated Platform Files" ${method === "Associated Platform Files" ? "checked" : ""} onchange="setLaserAssociation(this.value)" /><span>Associated Platform Files</span></label><label><input type="radio" name="laser-association" value="Upload Custom Documents" ${method === "Upload Custom Documents" ? "checked" : ""} onchange="setLaserAssociation(this.value)" /><span>Upload Custom Documents</span></label></div></div>${method === "Associated Platform Files" ? `<label class="form-field"><span><b class="required">*</b> Platform File</span><select id="laser-platform-file" class="form-control"><option value="">Please select</option>${order.laserFiles?.[family] ? `<option selected>${esc(order.laserFiles[family])}</option>` : ""}<option>${esc(family)}-platform-standard.dxf</option></select></label>` : ""}${method === "Upload Custom Documents" ? `<label class="form-field"><span><b class="required">*</b> Custom Documents</span><input id="laser-document" class="form-control upload-control" type="file" multiple /><small>Please upload the laser engraving documents for this panel series.</small></label>` : ""}</div>`;
  }

  const modalClass = type === "address" ? "address-action-modal" : type === "pay" ? "payment-action-modal" : "";
  return `<div class="modal-layer" onclick="closeModal()"><section class="modal ${modalClass}" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><header class="modal-head"><h2>${title}</h2><button class="icon-button" type="button" aria-label="Close" onclick="closeModal()">x</button></header><div class="modal-body">${body}</div><footer class="modal-foot">${footer}</footer></section></div>`;
}
function checkoutLines() {
  return state.checkoutLineIds.map((lineId) => state.cart.find((line) => line.lineId === lineId)).filter(Boolean);
}

function checkoutProductsTable(lines, custom) {
  const headers = custom
    ? ["Product Name", "Product Specification", "Product Code", "Quantity", "Laser Engraving", "Non-standard customization", "Amount"]
    : ["Product Name", "Product Specification", "Product Code", "Laser Engraving", "Quantity", "Unit Price", "Amount"];
  const rows = lines.map((line) => `<tr><td>${esc(line.name.replace(" - Custom", ""))}</td><td>${esc(line.spec)}</td><td>${esc(line.code)}</td><td>${custom ? line.qty : esc(line.laser)}</td><td>${custom ? esc(line.laser) : line.qty}</td>${custom ? `<td>${esc(line.customization || "-")}</td><td>***</td>` : `<td>${money(line.price)}</td><td>${money(line.price * line.qty)}</td>`}</tr>`).join("");
  return `<div class="table-scroll"><table class="checkout-products ${custom ? "nonstandard" : "standard"}"><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows || `<tr><td colspan="7"><div class="empty table-empty">No ${custom ? "non-standard" : "standard"} products.</div></td></tr>`}</tbody></table></div>`;
}

function syncCheckoutDraft() {
  const draft = state.checkoutDraft;
  draft.reportedProject = document.querySelector("#checkout-reported-project")?.value || draft.reportedProject;
  draft.project = document.querySelector("#checkout-project")?.value.trim() || draft.project;
  draft.business = document.querySelector("#checkout-business")?.value || draft.business;
  draft.shipping = document.querySelector('input[name="checkout-shipping"]:checked')?.value || draft.shipping;
  draft.logistics = document.querySelector('input[name="checkout-logistics"]:checked')?.value || draft.logistics;
  draft.freightAccount = document.querySelector("#checkout-freight-account")?.value.trim() ?? draft.freightAccount;
  draft.dispatch = document.querySelector('input[name="checkout-dispatch"]:checked')?.value || draft.dispatch;
  draft.orderRemark = document.querySelector("#checkout-order-remark")?.value.trim() || draft.orderRemark;
}
function setCheckoutProductTab(tab) { syncCheckoutDraft(); state.checkoutProductTab = tab; render(); }
function setCheckoutShipping(value) { syncCheckoutDraft(); state.checkoutDraft.shipping = value; setTimeout(render, 0); }
function openCheckoutAddressEditor() { syncCheckoutDraft(); openAddressEditor("checkout"); }

function renderCheckout() {
  const selected = checkoutLines();
  if (!selected.length) return `<section class="page checkout-page"><div class="empty checkout-empty"><h2>No products selected</h2><p>Please return to the shopping cart and select the products to submit.</p><button class="primary-button" type="button" onclick="go('cart')">Back to Shopping Cart</button></div></section>`;
  const standard = selected.filter((line) => !line.custom);
  const custom = selected.filter((line) => line.custom);
  const total = standard.reduce((sum, line) => sum + line.price * line.qty, 0);
  const draft = state.checkoutDraft;
  const productLines = state.checkoutProductTab === "nonstandard" ? custom : standard;
  const showLogistics = draft.shipping !== "Customer Pickup";
  const showFreightAccount = draft.shipping === "Freight Collect";
  return `<section class="page checkout-page">
    <section class="checkout-section checkout-project-section"><div class="form-grid checkout-project-fields"><label class="form-field"><span>Project Name</span><select id="checkout-reported-project" class="form-control"><option value="">Please select</option><option ${draft.reportedProject === "Smart Villa - Moscow" ? "selected" : ""}>Smart Villa - Moscow</option></select></label><label class="form-field"><span>Project Name</span><input id="checkout-project" class="form-control" value="${esc(draft.project)}" placeholder="Please enter the project name" /></label><label class="form-field"><span><b class="required">*</b> Business Type</span><select id="checkout-business" class="form-control"><option value="">Please select</option><option ${draft.business === "Project Order" ? "selected" : ""}>Project Order</option><option ${draft.business === "Home" ? "selected" : ""}>Home</option></select></label></div><p class="field-note">Note: If the project has not been reported, you can directly enter the project name.</p></section>
    <section class="checkout-section"><div class="section-title checkout-heading"><h2>Delivery Address</h2><span class="spacer"></span><button class="small-button" type="button" onclick="openCheckoutAddressEditor()">Add</button></div><div class="checkout-address-field"><span><b class="required">*</b> Delivery Address</span><select class="form-control"><option>${esc(draft.address)}</option></select><button class="link-button" type="button" onclick="openCheckoutAddressEditor()">Change Address</button></div><div class="checkout-options"><div class="form-field"><span><b class="required">*</b> Shipping Method</span><div class="radio-options">${["HDL Prepaid Freight", "Customer Pickup", "Freight Collect"].map((option) => `<label><input type="radio" name="checkout-shipping" value="${option}" ${draft.shipping === option ? "checked" : ""} onchange="setCheckoutShipping(this.value)" /><span>${option}</span></label>`).join("")}</div></div>${showLogistics ? `<div class="form-field"><span><b class="required">*</b> Logistics Company</span>${radioOptions("checkout-logistics", draft.logistics, ["DHL", "Fedex", "Aramex", "UPS"])}</div>` : ""}${showFreightAccount ? `<label class="form-field"><span><b class="required">*</b> Freight collect account</span><input id="checkout-freight-account" class="form-control" value="${esc(draft.freightAccount)}" placeholder="Please input" /></label>` : ""}<div class="form-field"><span><b class="required">*</b> Dispatch Requirement</span>${radioOptions("checkout-dispatch", draft.dispatch, ["Ready to ship", "Ship available stock first", "Ship together"])}</div><label class="form-field"><span>Order Remarks</span><input id="checkout-order-remark" class="form-control" value="${esc(draft.orderRemark)}" placeholder="Please input order remarks" /></label></div></section>
    <section class="checkout-section checkout-product-section"><div class="section-title checkout-heading"><h2>Product Information</h2></div><div class="checkout-product-tabs"><button class="${state.checkoutProductTab === "standard" ? "active" : ""}" type="button" onclick="setCheckoutProductTab('standard')">Standard Products</button><button class="${state.checkoutProductTab === "nonstandard" ? "active" : ""}" type="button" onclick="setCheckoutProductTab('nonstandard')">No-standard Products</button><span>Note: Prices for non-standard customized products are to be determined and will be finalized after HDL's review.</span></div>${checkoutProductsTable(productLines, state.checkoutProductTab === "nonstandard")}</section>
    <div class="checkout-summary"><span>Standard Products: <b>${standard.length}</b></span><span>No-standard Products: <b>${custom.length}</b></span><span class="spacer"></span><span>Total: <strong>${money(total)}</strong></span><span>(Non-standard product prices are not included)</span><button class="outline-button" type="button" onclick="go('cart')">Back</button><button class="primary-button" type="button" onclick="submitCheckout()">Submit</button></div>
  </section>`;
}

function submitCheckout() {
  syncCheckoutDraft();
  const draft = state.checkoutDraft;
  const project = draft.project || draft.reportedProject;
  if (!project) return showToast("Please select or enter the project name.");
  if (!draft.business) return showToast("Please select the business type.");
  if (draft.shipping === "Freight Collect" && !draft.freightAccount) return showToast("Please enter the freight collect account.");
  const selected = checkoutLines();
  if (!selected.length) return go("cart");
  const standard = selected.filter((line) => !line.custom);
  const total = standard.reduce((sum, line) => sum + line.price * line.qty, 0);
  const id = state.nextOrderId++;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Shanghai" }).replaceAll("-", "/");
  const laserFamilies = [];
  selected.filter((line) => line.laser === "Yes").forEach((line) => {
    const family = line.name.includes("Xelent") ? "Xelent Series" : "Tile Series";
    if (!laserFamilies.includes(family)) laserFamilies.push(family);
  });
  state.orders.unshift({ id, no: `DD-2026-07-17000${id}`, customer: "Current Channel Partner", project, business: draft.business, hdl: `HT-20260717${id}`, po: "-", laser: laserFamilies.length ? "Yes" : "No", date: today, productSubtotal: total, paid: 0, currency: "USD", amount: total, projectNo: "-", contract: "-", tax: "Tax excluded", status: "Pending Confirmation", reviewResult: "-", reviewNote: "-", erp: "-", receiver: draft.receiver || "Tony", phone: draft.phone || "12345678", country: draft.country || "Georgia / Samegrelo-Zemo Svaneti", address: draft.addressDetail || "120", shipping: draft.shipping, logistics: draft.shipping === "Customer Pickup" ? "-" : draft.logistics, paymentMethod: "USD", orderRemarks: draft.orderRemark || "-", paymentRemarks: "-", deliveryRemarks: "-", proof: "-", freightAccount: draft.shipping === "Freight Collect" ? draft.freightAccount : "-", dispatch: draft.dispatch, shippingTime: "-", discount: "No discount", engravingSupplier: laserFamilies.includes("Xelent Series") ? "Xelent" : "Tile 2.1", laserFile: "-", laserFiles: {}, tileLaser: laserFamilies.includes("Tile Series") ? "Yes" : "No", laserFamilies, orderProducts: { standardQty: standard.reduce((sum, line) => sum + line.qty, 0), nonstandardQty: selected.filter((line) => line.custom).reduce((sum, line) => sum + line.qty, 0) } });
  state.cart = state.cart.filter((line) => !state.checkoutLineIds.includes(line.lineId));
  state.checkoutLineIds = [];
  state.checkoutDraft = { reportedProject: "", project: "", business: "", address: draft.address, receiver: draft.receiver, phone: draft.phone, country: draft.country, addressDetail: draft.addressDetail, shipping: "HDL Prepaid Freight", logistics: "DHL", freightAccount: "", dispatch: "Ready to ship", orderRemark: "" };
  showToast("Order submitted and changed to Pending Confirmation.");
  go("orders");
}
function saveOrderAction(type, orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  if (type === "modify") {
    order.status = "Pending Review";
    order.reviewResult = "-";
    order.reviewNote = "Order products changed and resubmitted for review.";
  }
  if (type === "address") {
    const shipping = state.modal.shipping || order.shipping;
    const logistics = shipping === "Customer Pickup" ? "-" : (state.modal.logistics || order.logistics || "DHL");
    const freightAccount = shipping === "Freight Collect" ? (document.querySelector("#modal-freight-account")?.value.trim() || state.modal.freightAccount || "") : "-";
    if (shipping === "Freight Collect" && !freightAccount) return showToast("Please enter the freight collect account.");
    order.shipping = shipping;
    order.logistics = logistics;
    order.freightAccount = freightAccount;
    order.dispatch = state.modal.dispatch || order.dispatch;
    order.deliveryRemarks = order.dispatch;
  }
  if (type === "pay") {
    const files = document.querySelector("#modal-voucher")?.files;
    if (!files?.length) return showToast("Please upload proof of payment.");
    if (files.length > 5) return showToast("A maximum of 5 payment images can be uploaded.");
    if ([...files].some((file) => !/\.(png|jpe?g)$/i.test(file.name))) return showToast("Only .png, .jpg, and .jpeg images are supported.");
    if ([...files].some((file) => file.size > 5 * 1024 * 1024)) return showToast("Each payment image must be no larger than 5M.");
    order.paid = order.amount;
    order.status = "Paid";
    order.contract = order.contract === "-" ? `HT-${order.no.slice(3)}` : order.contract;
    order.proof = [...files].map((file) => file.name).join(", ");
    order.paymentRemarks = document.querySelector("#modal-payment-remarks")?.value.trim() || "-";
    order.reviewResult = "Approved";
    order.reviewNote = "Payment voucher uploaded. Pending HDL confirmation.";
  }
  if (type === "another") {
    const standardQty = Math.max(1, order.orderProducts?.standardQty || 1);
    state.cart.push({ lineId: state.nextLineId++, productId: 102, name: products[1].name, spec: products[1].spec, code: products[1].code, price: products[1].price, qty: standardQty, selected: true, laser: order.laser, customization: "", custom: false });
    if (order.orderProducts?.nonstandardQty) state.cart.push({ lineId: state.nextLineId++, productId: 102, name: `${products[1].name.replace("8 Buttons", "2 Buttons")} - Custom`, spec: products[1].spec, code: "Pending", price: 0, qty: order.orderProducts.nonstandardQty, selected: true, laser: "Yes", customization: "black and blue", custom: true });
    state.modal = null;
    showToast("The same products were added to the shopping cart.");
    return go("cart");
  }
  if (type === "cancel") {
    const reason = document.querySelector("#modal-cancel-reason")?.value.trim() || "";
    if (!reason) return showToast("Please enter the reason for cancellation.");
    order.status = "Closed";
    order.reviewNote = reason;
  }
  if (type === "laser") {
    const method = state.modal.associationMethod;
    if (!method) return showToast("Please select the association method.");
    if (method === "Associated Platform Files") {
      const platformFile = document.querySelector("#laser-platform-file")?.value || "";
      if (!platformFile) return showToast("Please select a platform file.");
      order.laserFiles ||= {};
      order.laserFiles[state.modal.family] = platformFile;
      order.laserFile = Object.values(order.laserFiles).join(", ");
    } else {
      const documentName = document.querySelector("#laser-document")?.files?.[0]?.name;
      if (!documentName) return showToast("Please upload custom documents.");
      order.laserFiles ||= {};
      order.laserFiles[state.modal.family] = documentName;
      order.laserFile = Object.values(order.laserFiles).join(", ");
    }
  }
  state.modal = null;
  state.addItemsOpen = false;
  showToast(`${type === "pay" ? "Payment" : "Order"} information saved.`);
  if (type === "modify" && routeRoot() === "modify-order") return go("orders");
  render();
}

function downloadContract(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) return;
  const rows = [
    ["Contract Number", order.contract], ["Order Number", order.no], ["Customer", order.customer], ["Project", order.project],
    ["Order Date", order.date], ["Total Amount Payable", money(order.amount, order.currency)], ["Order Status", order.status], ["Updated", new Date().toISOString()],
  ];
  const csv = ["Field,Value", ...rows.map(([field, value]) => `"${String(field).replaceAll('"', '""')}","${String(value).replaceAll('"', '""')}"`)].join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${order.contract === "-" ? order.no : order.contract}-latest.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("The latest contract has been downloaded.");
}
let toastTimer;
function showToast(message) {
  state.toast = message;
  clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => { state.toast = ""; render(); }, 2400);
}

window.addEventListener("hashchange", render);
render();
