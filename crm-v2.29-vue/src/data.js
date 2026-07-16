export const STATUS = Object.freeze({
  CONFIRM: "Pending Confirmation",
  REVIEW: "Pending Review",
  PRODUCTION: "In Production",
  PAYMENT: "Pending Payment",
  PAID: "Paid",
  SHIPMENT: "Pending Shipment",
  RECEIPT: "Pending Receipt",
  COMPLETED: "Completed",
  CLOSED: "Closed",
  FAILED: "Review Failed",
});

export const statusZh = Object.freeze({
  [STATUS.CONFIRM]: "待确认",
  [STATUS.REVIEW]: "待审核",
  [STATUS.PRODUCTION]: "生产中",
  [STATUS.PAYMENT]: "待付款",
  [STATUS.PAID]: "已付款",
  [STATUS.SHIPMENT]: "待发货",
  [STATUS.RECEIPT]: "待收货",
  [STATUS.COMPLETED]: "已完成",
  [STATUS.CLOSED]: "交易关闭",
  [STATUS.FAILED]: "审核不通过",
});

export const initialOrders = [
  { id: 1, no: "DD-2026-07-1400001", customer: "测试国际客户", project: "test1", projectNo: "XM-943898453", business: "酒店", laser: "Yes", date: "2026-07-14", productTotal: 10058.84, discount: "No discount", amount: 10058.84, paid: 0, currency: "USD", status: STATUS.CONFIRM, erp: "", hdl: "HT-20260714001", po: "PO-07140001", contract: "HT-20260714001", tax: "Yes", owner: "渠道管理部主管", source: "CRM", receiver: "Camellia", phone: "182938492830", country: "Georgia / Samegrelo-Zemo Svaneti", address: "120", shipping: "Freight Collect", logistics: "UPS", dispatch: "Ship together", hasCustom: true, note: "", reviewNote: "" },
  { id: 2, no: "DD-2026-06-2500017", customer: "客户测试（勿删）", project: "International Test", projectNo: "43566754", business: "全屋定制", laser: "Yes", date: "2026-06-25", productTotal: 329.8, discount: "No discount", amount: 329.8, paid: 0, currency: "HKD", status: STATUS.REVIEW, erp: "", hdl: "HDL-26062517", po: "PO-26062517", contract: "HT-2026-06-2500017", tax: "Tax included", owner: "向紫彤", source: "CRM", receiver: "Tony", phone: "12345678", country: "Georgia / Samegrelo-Zemo Svaneti", address: "120", shipping: "HDL Prepaid Freight", logistics: "Fedex", dispatch: "Ready to ship", hasCustom: true, note: "-", reviewNote: "" },
  { id: 3, no: "DD-2026-06-2500016", customer: "SXC国际有限股份公司", project: "国际灰", projectNo: "43566756", business: "家居", laser: "Yes", date: "2026-06-25", productTotal: 281, discount: "No discount", amount: 281, paid: 0, currency: "USD", status: STATUS.PRODUCTION, erp: "ERP-26062516", hdl: "HDL-26062516", po: "PO-26062516", contract: "HT-2026-06-2500016", tax: "Tax included", owner: "精致的土拨鼠", source: "CRM", receiver: "Jason", phone: "+852 65781024", country: "Hong Kong / Kowloon", address: "18 Austin Road", shipping: "Freight Collect", logistics: "DHL", dispatch: "In stock first dispatch", hasCustom: true, note: "", reviewNote: "" },
  { id: 4, no: "DD-2026-06-2500015", customer: "SXC国际有限股份公司", project: "Residence", projectNo: "45366754", business: "照明", laser: "No", date: "2026-06-25", productTotal: 310, discount: "No discount", amount: 310, paid: 0, currency: "USD", status: STATUS.PAYMENT, erp: "ERP-26062515", hdl: "HDL-26062515", po: "PO-26062515", contract: "HT-2026-06-2500015", tax: "Tax included", owner: "精致的土拨鼠", source: "CRM", receiver: "Nina", phone: "+995 599814222", country: "Georgia / Tbilisi", address: "11 Freedom Square", shipping: "Freight Collect", logistics: "DHL", dispatch: "Ship together", hasCustom: false, note: "", reviewNote: "" },
  { id: 5, no: "DD-2026-06-2500014", customer: "Xelent International", project: "Smart Home", projectNo: "43566757", business: "家居", laser: "Yes", date: "2026-06-24", productTotal: 2754, discount: "No discount", amount: 2754, paid: 2754, currency: "USD", status: STATUS.PAID, erp: "ERP-26062514", hdl: "HDL-26062514", po: "PO-26062514", contract: "HT-2026-06-2500014", tax: "Tax included", owner: "渠道管理部主管", source: "CRM", receiver: "Anna", phone: "+49 1725528031", country: "Germany / Berlin", address: "48 Alexanderplatz", shipping: "HDL Prepaid Freight", logistics: "UPS", dispatch: "Ready to ship", hasCustom: false, note: "", reviewNote: "" },
  { id: 6, no: "DD-2026-05-2700006", customer: "SXC国际有限股份公司", project: "Lighting", projectNo: "43566791", business: "照明", laser: "No", date: "2026-05-27", productTotal: 1185, discount: "45%", amount: 651.75, paid: 651.75, currency: "USD", status: STATUS.SHIPMENT, erp: "ERP-26052706", hdl: "HDL-26052706", po: "PO-26052706", contract: "HT-2026-05-2700006", tax: "Tax included", owner: "精致的土拨鼠", source: "CRM", receiver: "Evan", phone: "+65 91287742", country: "Singapore", address: "18 Orchard Road", shipping: "HDL Prepaid Freight", logistics: "DHL", dispatch: "Ready to ship", hasCustom: false, note: "", reviewNote: "" },
  { id: 7, no: "DD-2026-05-2700005", customer: "客户测试（勿删）", project: "Office", projectNo: "43566792", business: "家居", laser: "Yes", date: "2026-05-27", productTotal: 667, discount: "No discount", amount: 667, paid: 667, currency: "HKD", status: STATUS.RECEIPT, erp: "ERP-26052705", hdl: "HDL-26052705", po: "PO-26052705", contract: "HT-2026-05-2700005", tax: "Tax included", owner: "向紫彤", source: "CRM", receiver: "Lucy", phone: "+852 63218988", country: "Hong Kong / New Territories", address: "52 Castle Peak Road", shipping: "Freight Collect", logistics: "SF Express", dispatch: "Ship together", hasCustom: true, note: "", reviewNote: "" },
  { id: 8, no: "DD-2026-05-2700004", customer: "River East Preferred", project: "Apartment", projectNo: "43566793", business: "酒店", laser: "No", date: "2026-05-20", productTotal: 920, discount: "10%", amount: 828, paid: 828, currency: "USD", status: STATUS.COMPLETED, erp: "ERP-26052704", hdl: "HDL-26052704", po: "PO-26052704", contract: "HT-2026-05-2700004", tax: "Tax included", owner: "王雪", source: "CRM", receiver: "Lim", phone: "+60 128876301", country: "Malaysia / Kuala Lumpur", address: "8 Jalan Ampang", shipping: "HDL Prepaid Freight", logistics: "DHL", dispatch: "Ready to ship", hasCustom: false, note: "", reviewNote: "" },
  { id: 9, no: "DD-2026-05-2700003", customer: "Review Test Ltd.", project: "Villa", projectNo: "43566794", business: "全屋定制", laser: "Yes", date: "2026-05-18", productTotal: 512, discount: "No discount", amount: 512, paid: 0, currency: "USD", status: STATUS.FAILED, erp: "", hdl: "HDL-26052703", po: "PO-26052703", contract: "", tax: "Tax included", owner: "向紫彤", source: "CRM", receiver: "Carlos", phone: "+34 612430889", country: "Spain / Madrid", address: "19 Gran Via", shipping: "Freight Collect", logistics: "UPS", dispatch: "Ship together", hasCustom: true, note: "", reviewNote: "Product specification requires confirmation." },
  { id: 10, no: "DD-2026-05-1600002", customer: "Global Home Trading", project: "Closed Sample", projectNo: "43566795", business: "家居", laser: "No", date: "2026-05-16", productTotal: 438, discount: "No discount", amount: 438, paid: 0, currency: "USD", status: STATUS.CLOSED, erp: "", hdl: "HDL-26051602", po: "PO-26051602", contract: "", tax: "Tax included", owner: "王雪", source: "CRM", receiver: "Emma", phone: "+44 7700123456", country: "United Kingdom / London", address: "21 King Street", shipping: "HDL Prepaid Freight", logistics: "DHL", dispatch: "Ready to ship", hasCustom: false, note: "Customer cancelled", reviewNote: "" },
  { id: 11, no: "DD-2026-06-2500018", customer: "客户测试（勿删）", project: "Hotel Demo", projectNo: "43566796", business: "酒店", laser: "Yes", date: "2026-06-25", productTotal: 329.8, discount: "No discount", amount: 329.8, paid: 0, currency: "HKD", status: STATUS.REVIEW, erp: "", hdl: "HDL-26062518", po: "PO-26062518", contract: "HT-2026-06-2500018", tax: "Tax included", owner: "渠道管理部主管", source: "CRM", receiver: "Tony", phone: "12345678", country: "Georgia / Samegrelo-Zemo Svaneti", address: "120", shipping: "HDL Prepaid Freight", logistics: "DHL", dispatch: "Ready to ship", hasCustom: true, note: "", reviewNote: "" },
  { id: 12, no: "DD-2026-06-2500019", customer: "客户测试（勿删）", project: "Residence Demo", projectNo: "43566797", business: "家居", laser: "Yes", date: "2026-06-25", productTotal: 329.8, discount: "No discount", amount: 329.8, paid: 0, currency: "HKD", status: STATUS.REVIEW, erp: "", hdl: "HDL-26062519", po: "PO-26062519", contract: "HT-2026-06-2500019", tax: "Tax included", owner: "渠道管理部主管", source: "CRM", receiver: "Tony", phone: "12345678", country: "Georgia / Samegrelo-Zemo Svaneti", address: "120", shipping: "HDL Prepaid Freight", logistics: "DHL", dispatch: "Ready to ship", hasCustom: true, note: "", reviewNote: "" },
  { id: 13, no: "DD-2026-06-2500020", customer: "SXC国际有限股份公司", project: "Production Demo", projectNo: "43566798", business: "全屋定制", laser: "Yes", date: "2026-06-25", productTotal: 281, discount: "No discount", amount: 281, paid: 0, currency: "USD", status: STATUS.PRODUCTION, erp: "ERP-26062520", hdl: "HDL-26062520", po: "PO-26062520", contract: "HT-2026-06-2500020", tax: "Tax included", owner: "精致的土拨鼠", source: "CRM", receiver: "Jason", phone: "+852 65781024", country: "Hong Kong / Kowloon", address: "18 Austin Road", shipping: "Freight Collect", logistics: "DHL", dispatch: "Ship together", hasCustom: true, note: "", reviewNote: "" },
];

export const products = [
  { id: 101, name: "Tile Series 1 Button Smart Panel 2.1", type: "Buspro", category: "Intelligent Interaction", spec: "Space Gray-Metal", code: "308013718", model: "MPBT-1B-BP.18", unit: "pcs", price: 66, tone: "silver", shape: "panel-one", shortage: false, custom: false, laserApplicable: true },
  { id: 102, name: "Tile Series 2 Buttons Smart Panel 2.1", type: "Buspro", category: "Intelligent Interaction", spec: "Champagne Gold-Metal", code: "308013722", model: "MPBT-2B-BP.18", unit: "pcs", price: 78, tone: "gold", shape: "panel-two", shortage: false, custom: false, laserApplicable: true },
  { id: 103, name: "Tile Series 3 Buttons Smart Panel 2.1", type: "Buspro", category: "Intelligent Interaction", spec: "Space Gray-Metal", code: "308013719", model: "MPBT-3B-BP.18", unit: "pcs", price: 80, tone: "silver", shape: "panel-three", shortage: true, custom: false, laserApplicable: false },
  { id: 105, name: "Tile Series 4 Buttons Smart Panel 2.1", type: "Buspro", category: "Intelligent Interaction", spec: "Space Gray-Metal", code: "308013720", model: "MPBT-4B-BP.18", unit: "pcs", price: 88, tone: "silver", shape: "panel-four", shortage: false, custom: false, laserApplicable: true },
  { id: 106, name: "Tile Series 8 Buttons Smart Panel 2.1", type: "Buspro", category: "Intelligent Interaction", spec: "Space Gray-Metal", code: "308013721", model: "MPBT-8B-BP.18", unit: "pcs", price: 98, tone: "silver", shape: "panel-eight", shortage: false, custom: false, laserApplicable: true },
  { id: 107, name: "Tile Series Thermostat 2.1", type: "Buspro", category: "Environmental Control System", spec: "Space Gray-Glass", code: "308014101", model: "MPHT-6B-BP.18", unit: "pcs", price: 160, tone: "dark", shape: "thermostat", shortage: false, custom: false },
  { id: 108, name: "Tile Series Smart Door Bell 2.1", type: "Buspro", category: "Security System", spec: "Space Gray-Glass", code: "308014112", model: "MPDT-1B-BP.18", unit: "pcs", price: 64, tone: "dark", shape: "doorbell", shortage: false, custom: false },
  { id: 109, name: "Tile Series EU Socket 2.1", type: "Other", category: "Auxiliary Equipment", spec: "Ivory White-Plastic", code: "308080210", model: "MPST-G16-NP.18", unit: "pcs", price: 20, tone: "silver", shape: "socket", shortage: false, custom: false },
  { id: 110, name: "Tile Series Waterproof EU Power Socket", type: "Other", category: "Auxiliary Equipment", spec: "Ivory White-Plastic", code: "308080215", model: "MPST-G16P-NP.18", unit: "pcs", price: 40, tone: "silver", shape: "waterproof", shortage: false, custom: false },
  { id: 111, name: "Tile Series USB and Type-C Outlet", type: "Other", category: "Auxiliary Equipment", spec: "Space Gray-Metal", code: "308080228", model: "MPST-UT-NP.18", unit: "pcs", price: 65, tone: "silver", shape: "usb", shortage: false, custom: false },
  { id: 112, name: "Tile Series 1 Port Ethernet Wall Outlet", type: "Other", category: "Gateway", spec: "Ivory White-Plastic", code: "308090327", model: "MPET-1E-NP.18", unit: "pcs", price: 35, tone: "silver", shape: "ethernet-one", shortage: false, custom: false },
  { id: 113, name: "Tile Series 2 Port Ethernet Wall Outlet", type: "Other", category: "Gateway", spec: "Ivory White-Plastic", code: "308090328", model: "MPET-2E-NP.18", unit: "pcs", price: 38, tone: "silver", shape: "ethernet-two", shortage: false, custom: false },
  { id: 114, name: "Tile Series Emergency Panel 2.1", type: "Other", category: "Security System", spec: "Ivory White-Plastic", code: "308090410", model: "MPUT-1EC-NP.18", unit: "pcs", price: 18, tone: "silver", shape: "emergency", shortage: false, custom: false },
  { id: 115, name: "Tile Series HDMI and USB Outlet", type: "Other", category: "Auxiliary Equipment", spec: "Space Gray-Metal", code: "308090511", model: "MPST-HU-NP.18", unit: "pcs", price: 60, tone: "silver", shape: "hdmi", shortage: false, custom: false },
  { id: 104, name: "Tile Series 2 Buttons Smart Panel 2.1", type: "No-standard Products", category: "Intelligent Interaction", spec: "Space Gray-Metal", code: "308013713", model: "MPBT-2B-BP.18", unit: "pcs", price: 70, tone: "silver", shape: "panel-two", shortage: false, custom: true },
  { id: 116, name: "Tile Series 3 Buttons Smart Panel 2.1", type: "No-standard Products", category: "Intelligent Interaction", spec: "Champagne Gold-Metal", code: "308013719-C", model: "MPBT-3B-BP.18", unit: "pcs", price: 80, tone: "gold", shape: "panel-three", shortage: false, custom: true },
  { id: 117, name: "Tile Series 4 Buttons Smart Panel 2.1", type: "No-standard Products", category: "Intelligent Interaction", spec: "Space Gray-Plastic", code: "308013720-C", model: "MPBT-4B-BP.18", unit: "pcs", price: 88, tone: "silver", shape: "panel-four", shortage: false, custom: true },
];

export const initialCart = [
  { productId: 101, qty: 1, selected: false, remark: "", laser: "Yes" },
  { productId: 102, qty: 1, selected: false, remark: "", laser: "Yes" },
  { productId: 103, qty: 1, selected: false, remark: "" },
  { productId: 104, qty: 1, selected: false, remark: "", laser: "Yes", customization: "black and blue" },
  { productId: 116, qty: 2, selected: false, remark: "", laser: "Yes", customization: "gold finish with custom icons" },
  { productId: 117, qty: 1, selected: false, remark: "", laser: "No", customization: "custom button layout" },
];

const adminActionLabels = {
  view: "查看",
  audit: "审核",
  modify: "变更订单",
  owner: "变更业务员",
  note: "订单备注",
  address: "修改地址",
  discount: "设置折扣价格",
  fees: "设置费用",
  cancel: "取消订单",
  laser: "关联/修改XX镭雕",
  delete: "删除数据",
  itemno: "录入品号",
  voucher: "付款凭证",
  shipment: "确认发货",
  contract: "下载合同",
  another: "再来一单",
};

const customerActionLabels = {
  view: "Review",
  confirm: "Confirm Requirements",
  modify: "Modify Order",
  address: "Modify Address",
  discount: "Set Discount Price",
  fees: "Set Fees",
  cancel: "Cancel Order",
  laser: "Link Tile Laser Engraving",
  another: "Another Order",
  pay: "To Pay",
  contract: "Download Contract",
};

function actions(ids, labels) {
  return ids.map((id) => ({ id, label: labels[id] }));
}

export function getOrderActions(status, mode) {
  if (mode === "customer") {
    const base = ["view"];
    if (status === STATUS.CONFIRM) return actions([...base, "confirm", "fees", "address", "another", "cancel", "laser"], customerActionLabels);
    if (status === STATUS.REVIEW || status === STATUS.PRODUCTION) return actions([...base, "modify", "discount", "fees", "address", "another", "cancel", "laser"], customerActionLabels);
    if (status === STATUS.PAYMENT) return actions([...base, "pay", "modify", "discount", "fees", "address", "another", "cancel", "laser"], customerActionLabels);
    if (status === STATUS.PAID || status === STATUS.SHIPMENT) return actions([...base, "address", "contract", "modify", "another", "cancel", "laser"], customerActionLabels);
    if (status === STATUS.RECEIPT || status === STATUS.COMPLETED) return actions([...base, "another", "contract"], customerActionLabels);
    if (status === STATUS.FAILED) return actions([...base, "confirm", "modify", "cancel"], customerActionLabels);
    return actions([...base, "another"], customerActionLabels);
  }

  const base = ["view"];
  if (status === STATUS.CONFIRM) return actions([...base, "owner", "note", "address", "discount", "cancel", "laser", "delete"], adminActionLabels);
  if (status === STATUS.REVIEW) return actions([...base, "audit", "modify", "owner", "note", "address", "discount", "fees", "cancel", "laser", "delete"], adminActionLabels);
  if (status === STATUS.PRODUCTION) return actions([...base, "itemno", "modify", "owner", "note", "address", "discount", "fees", "cancel", "laser", "delete"], adminActionLabels);
  if (status === STATUS.PAYMENT) return actions([...base, "voucher", "modify", "owner", "note", "address", "discount", "fees", "cancel", "laser", "delete"], adminActionLabels);
  if (status === STATUS.PAID) return actions([...base, "shipment", "modify", "voucher", "owner", "note", "address", "contract", "cancel", "laser", "delete"], adminActionLabels);
  if (status === STATUS.SHIPMENT) return actions([...base, "modify", "owner", "voucher", "another", "note", "address", "contract", "cancel", "delete"], adminActionLabels);
  if (status === STATUS.RECEIPT) return actions([...base, "voucher", "owner", "contract", "another", "delete"], adminActionLabels);
  if (status === STATUS.COMPLETED) return actions([...base, "owner", "contract", "another"], adminActionLabels);
  if (status === STATUS.CLOSED) return actions([...base, "another", "owner", "delete"], adminActionLabels);
  if (status === STATUS.FAILED) return actions([...base, "owner", "note", "address", "discount", "cancel", "laser", "delete"], adminActionLabels);
  return actions(base, adminActionLabels);
}

export function statusClass(status) {
  if (status === STATUS.FAILED || status === STATUS.CLOSED) return "red";
  if (status === STATUS.PAID || status === STATUS.COMPLETED) return "green";
  if (status === STATUS.PAYMENT) return "orange";
  if ([STATUS.PRODUCTION, STATUS.SHIPMENT, STATUS.RECEIPT].includes(status)) return "blue";
  return "purple";
}

export function money(value, currency = "USD") {
  const symbol = currency === "HKD" ? "HK$" : currency === "EUR" ? "€" : "$";
  return `${symbol}${Number(value || 0).toFixed(2).replace(/\.00$/, "")}`;
}
