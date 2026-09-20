<script setup>
import { computed, reactive, ref } from "vue";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldAlert,
  ShoppingCart,
  Store,
  X,
} from "@lucide/vue";
import {
  STATUS,
  getOrderActions,
  initialCart,
  initialOrders,
  money,
  products,
  statusClass,
} from "./data";
import CommerceFlow from "./components/CommerceFlow.vue";
import OrderListView from "./components/OrderListView.vue";
import OrderDetailView from "./components/OrderDetailView.vue";
import OrderEditorView from "./components/OrderEditorView.vue";
import OrderActionModal from "./components/OrderActionModal.vue";

const isChannelPlatform = new URLSearchParams(window.location.search).get("platform") === "channel";
const antiChannelConflictUrl = `${import.meta.env.BASE_URL}anti-channel-conflict/`;
const commerceRoutes = ["shop", "product-detail", "cart", "checkout"];
const route = ref(isChannelPlatform ? "shop" : "customer-orders");
const currentMode = ref("customer");
const currentOrderId = ref(initialOrders[0]?.id || 1);
const currentQuick = ref("all");
const detailTab = ref("basic");
const editorProductTab = ref("custom");
const requirementFees = reactive({ freight: 0, certificate: 0, other: 0, handling: 0, payment: "USD", rate: 1 });
const tilePreviewOpen = ref(false);
const tilePreviewDocument = ref(null);
const checkoutIds = ref([]);
const shopQuery = ref("");
const sidebarOpen = ref(false);
const toasts = ref([]);

const orders = ref(initialOrders.map((order) => ({ ...order })));
const cart = ref(initialCart.map((line) => ({ ...line })));
const filters = reactive({ orderNo: "", customer: "", status: "", project: "", erp: "" });
const activeFilters = reactive({ orderNo: "", customer: "", status: "", project: "", erp: "" });

const actionPopover = reactive({ show: false, orderId: null, x: 0, y: 0, actions: [] });
const modal = reactive({ show: false, kind: "", orderId: null, data: {} });
const addressDetailModal = reactive({ show: false, data: {} });

const currentOrder = computed(() => orders.value.find((order) => order.id === currentOrderId.value) || orders.value[0]);
const modalOrder = computed(() => orders.value.find((order) => order.id === modal.orderId) || currentOrder.value || {});
const isAdmin = computed(() => !isChannelPlatform && currentMode.value === "admin");
const orderMode = computed(() => (isAdmin.value ? "admin" : "customer"));
const isOrderList = computed(() => route.value === "customer-orders" || route.value === "admin-orders");
const isDetail = computed(() => route.value === "customer-detail" || route.value === "admin-detail");
const isConfirmRequirements = computed(() => route.value === "confirm-requirements");
const isModifyOrder = computed(() => route.value === "modify-order");
const isAuditOrder = computed(() => route.value === "audit-order");
const isItemNumber = computed(() => route.value === "item-number");
const isDiscountPrice = computed(() => route.value === "discount-price");
const isOrderEditor = computed(() => isModifyOrder.value || isConfirmRequirements.value || isAuditOrder.value || isItemNumber.value || isDiscountPrice.value);
const activeEditorMode = computed(() => {
  if (isAuditOrder.value) return "audit";
  if (isItemNumber.value) return "itemno";
  if (isDiscountPrice.value) return "discount";
  if (isConfirmRequirements.value) return "confirm";
  return "modify";
});
const requirementExtraFees = computed(() => Number(requirementFees.certificate || 0) + Number(requirementFees.other || 0) + Number(requirementFees.handling || 0));
const requirementPayable = computed(() => Number(currentOrder.value?.productTotal || 0) + Number(requirementFees.freight || 0) + requirementExtraFees.value);

const quickTabs = computed(() => {
  const source = isAdmin.value
    ? [
        { key: "all", label: "全部", showCount: false },
        { key: STATUS.REVIEW, label: "待审核", showCount: true },
        { key: STATUS.PRODUCTION, label: "生产中", showCount: true },
      ]
    : [
        { key: "all", label: "All", showCount: true },
        { key: STATUS.CONFIRM, label: "Pending Confirmation", showCount: true },
        { key: STATUS.PAYMENT, label: "Pending Payment", showCount: true },
        { key: STATUS.FAILED, label: "Review Failed", showCount: true },
      ];
  return source.map((tab) => ({
    ...tab,
    count: tab.key === "all" ? orders.value.length : orders.value.filter((order) => order.status === tab.key).length,
  }));
});
const filteredOrders = computed(() => orders.value.filter((order) => {
  if (currentQuick.value !== "all" && order.status !== currentQuick.value) return false;
  if (activeFilters.orderNo && !order.no.toLowerCase().includes(activeFilters.orderNo.toLowerCase())) return false;
  if (activeFilters.customer && order.customer !== activeFilters.customer) return false;
  if (activeFilters.status && order.status !== activeFilters.status) return false;
  if (activeFilters.project && !order.project.toLowerCase().includes(activeFilters.project.toLowerCase())) return false;
  if (activeFilters.erp && !(order.erp || "").toLowerCase().includes(activeFilters.erp.toLowerCase())) return false;
  return true;
}));

const breadcrumb = computed(() => {
  if (isChannelPlatform) {
    const map = {
      shop: ["Channel Partner Platform", "Hedong Preferred", "Preferred Mall (International)"],
      "product-detail": ["Channel Partner Platform", "Hedong Preferred", "Preferred Mall (International)", "Product Detail"],
      cart: ["Channel Partner Platform", "Hedong Preferred", "Shopping Cart (International)"],
      checkout: ["Channel Partner Platform", "Hedong Preferred", "Shopping Cart (International)", "Submit Order"],
      "customer-orders": ["Channel Partner Platform", "Order Center", "Standard Orders (International)"],
      "customer-detail": ["Channel Partner Platform", "Order Center", "Standard Orders (International)", "Order Details"],
    };
    return map[route.value] || [];
  }
  const map = {
    shop: ["Product Center", "Preferred Mall", "International"],
    "product-detail": ["Product Center", "Preferred Mall", "Product Detail"],
    cart: ["Product Center", "Preferred Mall", "Shopping Cart"],
    checkout: ["Product Center", "Preferred Mall", "Shopping Cart", "Submit Order"],
    "customer-orders": ["Order Center", "Customer Orders"],
    "customer-detail": ["Order Center", "Customer Orders", "Order Details"],
    "admin-orders": ["Order Center", "Standard Orders"],
    "admin-detail": ["Order Center", "Standard Orders", "Order Details"],
    "confirm-requirements": ["Order Center", "Customer Orders", "Confirm Requirements"],
    "modify-order": [isAdmin.value ? "订单中心" : "Order Center", isAdmin.value ? "标品订单" : "Customer Orders", isAdmin.value ? "变更订单" : "Modify Order"],
    "audit-order": ["订单中心", "标品订单", "订单审核"],
    "item-number": ["订单中心", "标品订单", "录入品号"],
    "discount-price": [isAdmin.value ? "订单中心" : "Order Center", isAdmin.value ? "标品订单" : "Customer Orders", isAdmin.value ? "设置折扣价格" : "Set Discount Price"],
  };
  return map[route.value] || [];
});

const detailTabs = computed(() => {
  if (isAdmin.value) {
    return [
      { key: "basic", label: "基础信息" },
      { key: "products", label: "产品信息" },
      { key: "changes", label: "变更明细" },
      { key: "tile", label: "方悦" },
    ];
  }
  return [
    { key: "basic", label: "Basic Information" },
    { key: "products", label: "Product Information" },
    { key: "changes", label: "Change Details" },
    { key: "tile", label: "Tile" },
  ];
});

const tileDocuments = Object.freeze([
  { name: "20253131048219160", type: "Laser engraving requirement document" },
  { name: "销售单.xlsx", type: "Sales order attachment" },
]);

const customerOrderInfoRows = computed(() => orderInfoRows(currentOrder.value));
const adminOrderInfoRows = computed(() => adminOrderRows(currentOrder.value));
const customerAddressRows = computed(() => addressRows(currentOrder.value));
const adminAddressRows = computed(() => adminAddressRowsSource(currentOrder.value));

const timelineProgressByStatus = Object.freeze({
  [STATUS.CONFIRM]: 1,
  [STATUS.REVIEW]: 2,
  [STATUS.PRODUCTION]: 3,
  [STATUS.PAYMENT]: 3,
  [STATUS.PAID]: 4,
  [STATUS.SHIPMENT]: 5,
  [STATUS.RECEIPT]: 6,
  [STATUS.COMPLETED]: 8,
  [STATUS.FAILED]: 2,
  [STATUS.CLOSED]: 0,
});

const timelineDefinitions = Object.freeze([
  { stage: 8, label: "Order Completed" },
  { stage: 7, label: "Receipt Confirmed" },
  { stage: 6, label: "Dispatched" },
  { stage: 5, label: "Shipment Confirmed" },
  { stage: 4, label: "Order Paid" },
  { stage: 3, label: "Non-standard Production" },
  { stage: 2, label: "Order Review" },
  { stage: 1, label: "Requirements Confirmation", note: "The Sales Manager confirms whether the customer's submitted requirements are valid." },
  { stage: 0, label: "Order Submitted", note: "The customer submitted the order." },
]);

const orderTimeline = computed(() => {
  const progress = timelineProgressByStatus[currentOrder.value?.status] ?? 0;
  return timelineDefinitions.map((step) => ({
    ...step,
    reached: step.stage <= progress,
    current: step.stage === progress,
  }));
});

const modalTitle = computed(() => ({
  "channel-modify": "Modify Order",
  "pay": "Payment",
  "address-customer": "Modify Address",
  "laser-customer": "Laser Engraving",
  "cancel-customer": "Cancel Order",
  "another-customer": "Another Order",
  "shipment": "确认发货",
})[modal.kind] || "Operation Confirm");
const isAddressModal = computed(() => modal.kind === "address-customer" || modal.kind === "address-admin");
const addressSummary = computed(() => `${modalOrder.value.receiver || "-"} / ${modalOrder.value.phone || "-"} / ${modalOrder.value.country || ""} ${modalOrder.value.address || ""}`);

function orderInfoRows(order = {}) {
  return [
    ["Order Number", order.no || "-"],
    ["Customer Name", order.customer || "-"],
    ["Project Name", order.project || "-"],
    ["Business Type", order.business || "Standard"],
    ["HDL Ref No.", order.hdl || "-"],
    ["P.O. No.", order.po || "-"],
    ["Order Date", order.date || "-"],
    ["Order Total", money(order.amount || 0, order.currency || "USD")],
    ["Payment Currency", order.currency || "USD"],
    ["Contract Number", order.contract || "-"],
    ["Whether Tax Included", order.tax || "-"],
    ["Order Status", order.status || "-"],
    ["Laser Engraving Required", order.laser || "No"],
    ["Dispatch Requirement", order.dispatch || "-"],
    ["Order Remarks", order.note || "-"],
  ];
}
function adminOrderRows(order = {}) {
  return [
    ["订单编号", order.no || "-"],
    ["客户名称", order.customer || "-"],
    ["项目名称", order.project || "-"],
    ["项目编号", order.projectNo || "-"],
    ["下单时间", order.date || "-"],
    ["订单金额", money(order.amount || 0, order.currency || "USD")],
    ["应付总金额", money(order.amount || 0, order.currency || "USD")],
    ["支付币种", order.currency || "USD"],
    ["合同编号", order.contract || "-"],
    ["HDL Ref No", order.hdl || "-"],
    ["ERP订单号", order.erp || "-"],
    ["是否含税", order.tax || "-"],
    ["订单状态", order.status || "-"],
    ["付款凭证", "-"],
    ["订单备注", order.note || "-"],
    ["付款备注", "-"],
    ["发货备注", order.dispatch || "-"],
  ];
}

function adminAddressRowsSource(order = {}) {
  return [
    ["收货地址", `${order.country || "-"} ${order.address || ""}`.trim()],
    ["发货方式", order.shipping || "-"],
    ["物流公司", order.logistics || "-"],
    ["到付账户", order.shipping === "Freight Collect" ? "3435555" : "-"],
    ["发货要求", order.dispatch || "-"],
    ["收货人", order.receiver || "-"],
    ["联系电话", order.phone || "-"],
  ];
}
function addressRows(order = {}) {
  return [
    ["Receiver", order.receiver || "-"],
    ["Contact Number", order.phone || "-"],
    ["Country/Region", order.country || "-"],
    ["Detailed Address", order.address || "-"],
    ["Shipping Method", order.shipping || "-"],
    ["Logistics Company", order.logistics || "-"],
  ];
}

function navigate(nextRoute, orderId) {
  if (orderId) currentOrderId.value = orderId;
  if (nextRoute.startsWith("admin")) currentMode.value = "admin";
  if (nextRoute.startsWith("customer")) currentMode.value = "customer";
  detailTab.value = "basic";
  if (["admin-orders", "customer-orders"].includes(nextRoute)) currentQuick.value = "all";
  route.value = nextRoute;
  sidebarOpen.value = false;
  closeActionPopover();
}

function navigateBreadcrumb(index) {
  const orderRoutes = ["admin-orders", "customer-orders", "admin-detail", "customer-detail", "confirm-requirements", "modify-order", "audit-order", "item-number", "discount-price"];
  if (orderRoutes.includes(route.value)) {
    navigate(isAdmin.value ? "admin-orders" : "customer-orders");
    return;
  }
  if (commerceRoutes.includes(route.value) && index <= 1) navigate("shop");
}

function isNavActive(target) {
  if (target === "shop") return route.value === "shop" || route.value === "product-detail";
  if (target === "cart") return route.value === "cart" || route.value === "checkout";
  if (target === "admin-orders") return ["admin-orders", "admin-detail"].includes(route.value) || (["confirm-requirements", "modify-order", "audit-order", "item-number", "discount-price"].includes(route.value) && isAdmin.value);
  if (target === "customer-orders") return ["customer-orders", "customer-detail"].includes(route.value) || (["confirm-requirements", "modify-order", "discount-price"].includes(route.value) && !isAdmin.value);
  return route.value === target;
}

function applyFilters() { Object.assign(activeFilters, filters); }
function resetFilters() {
  Object.keys(filters).forEach((key) => { filters[key] = ""; activeFilters[key] = ""; });
  currentQuick.value = "all";
}

function performAction(action, orderId) {
  closeActionPopover();
  if (action === "view") return navigate(isAdmin.value ? "admin-detail" : "customer-detail", orderId);
  if (action === "confirm") { editorProductTab.value = "custom"; return navigate("confirm-requirements", orderId); }
  if (action === "modify") { editorProductTab.value = "standard"; return navigate("modify-order", orderId); }
  if (action === "audit") { editorProductTab.value = "standard"; return navigate("audit-order", orderId); }
  if (action === "itemno") { editorProductTab.value = "custom"; return navigate("item-number", orderId); }
  if (action === "discount") { editorProductTab.value = "standard"; return navigate("discount-price", orderId); }
  if (action === "address") return openModal(isAdmin.value ? "address-admin" : "address-customer", orderId);
  if (action === "fees") return openModal(isAdmin.value ? "fees-admin" : "fees-customer", orderId);
  if (action === "contract") return downloadContract(orderId);
  if (action === "owner" || action === "note" || action === "voucher" || action === "shipment" || action === "delete") return openModal(action, orderId);
  if (action === "pay") return openModal("pay", orderId);
  if (action === "laser") return openModal(isAdmin.value ? "laser-admin" : "laser-customer", orderId);
  if (action === "cancel") return openModal(isAdmin.value ? "cancel-admin" : "cancel-customer", orderId);
  if (action === "another") return openModal(isAdmin.value ? "another-admin" : "another-customer", orderId);
  openModal(action, orderId);
}

function handleEditorBack() {
  navigate(isAdmin.value ? "admin-orders" : "customer-orders");
}

function handleEditorSubmit(mode) {
  const message = isAdmin.value ? "操作已提交。" : `${mode === "confirm" ? "Requirements" : "Order changes"} submitted.`;
  showToast(message);
  navigate(isAdmin.value ? "admin-orders" : "customer-orders");
}

function openActionPopover(event, order) {
  const rect = event.currentTarget.getBoundingClientRect();
  actionPopover.show = true;
  actionPopover.orderId = order.id;
  actionPopover.x = Math.max(12, rect.right - 168);
  actionPopover.y = rect.bottom + 6;
  actionPopover.actions = getOrderActions(order.status, orderMode.value)
    .slice(2)
    .filter((action) => !isChannelPlatform || !["discount", "fees"].includes(action.id));
}

function closeActionPopover() { actionPopover.show = false; }
function performPopoverAction(actionId) { performAction(actionId, actionPopover.orderId); }

function openModal(kind, orderId = currentOrderId.value) {
  const order = orders.value.find((item) => item.id === orderId) || currentOrder.value || {};
  modal.show = true;
  modal.kind = kind;
  modal.orderId = orderId;
  modal.data = {
    project: order.project || "",
    hdl: order.hdl || "",
    po: order.po || "",
    dispatch: order.dispatch || "Ready to ship",
    note: order.note || "",
    useBalance: "Do not use",
    paymentRemarks: "",
    shipping: order.shipping || "HDL Prepaid Freight",
    logistics: order.logistics || "DHL",
    freightAccount: order.shipping === "Freight Collect" ? "3435555" : "",
    linkMode: "platform",
    platformFile: "",
    laserFile: "",
    cancelReason: "",
    shipmentResult: "Confirm Shipment",
    shipmentReason: "",
    shipmentNote: "",
    contractAudit: "",
    auditDescription: "",
    owner: "",
    freight: 0,
    certificate: 0,
    other: 0,
    handling: 0,
    payment: order.currency || "USD",
    rate: 1,
    voucherName: "",
  };
}

function closeModal() { modal.show = false; modal.kind = ""; modal.data = {}; }
function cancelModalStep() { closeModal(); }

function submitModal() {
  const order = orders.value.find((item) => item.id === modal.orderId);
  if (!order) return closeModal();
  if (modal.kind === "channel-modify") {
    Object.assign(order, {
      project: modal.data.project,
      hdl: modal.data.hdl,
      po: modal.data.po,
      dispatch: modal.data.dispatch,
      note: modal.data.note,
    });
    showToast("Order modification submitted.");
  } else if (modal.kind === "pay") {
    order.paid = order.amount;
    order.status = STATUS.PAID;
    showToast("Payment submitted.");
  } else if (modal.kind === "owner") {
    order.owner = modal.data.owner;
    showToast("业务员已变更。");
  } else if (modal.kind === "note") {
    order.note = modal.data.note;
    showToast("订单备注已更新。");
  } else if (["fees-admin", "fees-customer"].includes(modal.kind)) {
    order.hdl = modal.data.hdl;
    order.po = modal.data.po;
    showToast(isAdmin.value ? "费用已设置。" : "Fees updated.");
  } else if (isAddressModal.value) {
    order.shipping = modal.data.shipping;
    order.logistics = modal.data.shipping === "Customer Pickup" ? "" : modal.data.logistics;
    order.dispatch = modal.data.dispatch;
    showToast("Address updated.");
  } else if (["laser-customer", "laser-admin"].includes(modal.kind)) {
    order.laser = "Yes";
    showToast(isAdmin.value ? "镭雕文件已关联。" : "Laser engraving file linked.");
  } else if (["cancel-customer", "cancel-admin"].includes(modal.kind)) {
    order.status = STATUS.CLOSED;
    showToast("Order cancelled.");
  } else if (modal.kind === "voucher") {
    order.paid = order.amount;
    order.status = STATUS.PAID;
    showToast("付款凭证已提交。");
  } else if (modal.kind === "delete") {
    orders.value = orders.value.filter((item) => item.id !== order.id);
    showToast("订单数据已删除。");
  } else if (modal.kind === "shipment") {
    order.status = modal.data.shipmentResult === "Return to Pending Payment" ? STATUS.PAYMENT : STATUS.SHIPMENT;
    showToast(modal.data.shipmentResult === "Return to Pending Payment" ? "订单已退回待付款。" : "已确认发货。");
  } else if (["another-customer", "another-admin"].includes(modal.kind)) {
    const id = Date.now();
    orders.value.unshift({ ...order, id, no: `DD-2026-NEW-${String(id).slice(-6)}`, status: STATUS.CONFIRM, paid: 0 });
    showToast(isAdmin.value ? "已按原订单创建新订单。" : "Another order created.");
  }
  closeModal();
}

function openAddressDetailModal() {
  addressDetailModal.show = true;
  addressDetailModal.data = {
    receiver: modalOrder.value.receiver || "",
    phone: modalOrder.value.phone || "",
    country: modalOrder.value.country || "Hong Kong / Kowloon",
    address: modalOrder.value.address || "",
  };
}
function closeAddressDetailModal() { addressDetailModal.show = false; }
function submitAddressDetailModal() {
  const order = orders.value.find((item) => item.id === modal.orderId);
  if (order) Object.assign(order, addressDetailModal.data);
  closeAddressDetailModal();
  showToast("Address saved.");
}

function getProduct(productId) { return products.find((product) => product.id === productId) || products[0]; }
function productDetailRows() {
  if (currentOrder.value?.lines?.length) {
    return currentOrder.value.lines.map((line) => ({ ...getProduct(line.productId), orderQty: line.qty, orderLaser: line.laser }));
  }
  const standardProduct = products.find((product) => !product.custom) || products[0];
  return [{ ...standardProduct, orderQty: 1, orderLaser: currentOrder.value?.laser || "No" }];
}

function downloadContract(orderId) {
  const order = orders.value.find((item) => item.id === orderId) || currentOrder.value || {};
  const content = [
    isAdmin.value ? "HDL CRM 标品订单合同" : "HDL CRM Customer Order Contract",
    `Order Number: ${order.no || "-"}`,
    `Customer Name: ${order.customer || "-"}`,
    `Contract Number: ${order.contract || "-"}`,
    `Amount: ${money(order.amount || 0, order.currency || "USD")}`,
  ].join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = `${order.contract || order.no || "order-contract"}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast(isAdmin.value ? "合同已下载。" : "Contract downloaded.");
}
function openTilePreview(document) {
  tilePreviewDocument.value = document;
  tilePreviewOpen.value = true;
}

function closeTilePreview() {
  tilePreviewOpen.value = false;
  tilePreviewDocument.value = null;
}

function downloadTileDocument(document) {
  const content = `${document.name}\n${document.type}\nOrder: ${currentOrder.value?.no || "-"}`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = document.name;
  anchor.click();
  URL.revokeObjectURL(url);
  showToast(`${document.name} downloaded.`);
}
function handleCommerceOrder(payload) {
  const id = Date.now();
  const amount = payload?.total || 0;
  orders.value.unshift({
    ...initialOrders[0],
    id,
    no: `DD-2026-NEW-${String(id).slice(-6)}`,
    project: payload?.checkout?.remark || "Channel platform order",
    status: STATUS.CONFIRM,
    paid: 0,
    amount,
    productTotal: amount,
    lines: payload?.lines || [],
  });
  navigate("customer-orders", id);
  showToast("Order submitted.");
}

function saveRequirementFees() {
  showToast("Fee information saved.");
}

function submitRequirements() {
  const order = orders.value.find((item) => item.id === currentOrderId.value);
  if (order) {
    order.amount = requirementPayable.value;
    order.status = STATUS.REVIEW;
  }
  showToast("Requirements submitted.");
  navigate("customer-orders");
}
function submitModifyOrder() {
  showToast("Order modification submitted.");
  navigate(isAdmin.value ? "admin-orders" : "customer-orders");
}

function showToast(message) {
  const id = Date.now() + Math.random();
  toasts.value.push({ id, message });
  window.setTimeout(() => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }, 2200);
}
</script>
<template>
  <div class="app">
    <header class="topbar">
      <button class="menu-toggle" type="button" aria-label="Open navigation" @click="sidebarOpen = true"><Menu :size="19" /></button>
      <div class="brand"><span class="brand-mark">HDL</span><span v-if="isChannelPlatform">&#28192;&#36947;&#21830;&#24179;&#21488;</span><span v-else>CRM</span></div>
      <div class="top-actions">
        <button class="top-action" type="button"><Bell :size="15" />Message Center</button>
        <button class="top-action" type="button"><Settings :size="15" />System Settings</button>
        <div class="profile"><span class="profile-dot">C</span><span>Hi~Channel Partner</span></div>
      </div>
    </header>

    <div class="workspace">
      <aside class="sidebar" :class="{ show: sidebarOpen }">
        <button class="nav-head" type="button"><strong><Store :size="16" /><span>产品中心</span></strong><span>^</span></button>
        <div class="nav-items">
          <button class="nav-item" :class="{ active: isNavActive('shop') }" type="button" @click="navigate('shop')">优选商城</button>
          <button class="nav-item" :class="{ active: isNavActive('cart') }" type="button" @click="navigate('cart')"><span>购物车</span><span class="nav-badge">{{ cart.length }}</span></button>
        </div>
        <button class="nav-head" type="button"><strong><ShoppingCart :size="16" />订单中心</strong><span>^</span></button>
        <div class="nav-items">
          <button v-if="!isChannelPlatform" class="nav-item" :class="{ active: isNavActive('admin-orders') }" type="button" @click="navigate('admin-orders')">标品订单</button>
          <button class="nav-item" :class="{ active: isNavActive('customer-orders') }" type="button" @click="navigate('customer-orders')">客户订单</button>
        </div>
        <template v-if="!isChannelPlatform">
          <button class="nav-head" type="button"><strong><ShieldAlert :size="16" />渠道管理</strong><span>^</span></button>
          <div class="nav-items">
            <a class="nav-item" :href="antiChannelConflictUrl">串货异常记录</a>
          </div>
        </template>
      </aside>

      <main class="main">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <template v-for="(part, index) in breadcrumb" :key="`${part}-${index}`">
            <strong v-if="index === breadcrumb.length - 1">{{ part }}</strong>
            <template v-else><button class="breadcrumb-link" type="button" @click="navigateBreadcrumb(index)">{{ part }}</button><span>/</span></template>
          </template>
        </nav>

        <CommerceFlow v-if="commerceRoutes.includes(route)" :route="route" :products="products" :cart="cart" @navigate="navigate" @update:cart="cart = $event" @order-created="handleCommerceOrder" @toast="showToast" />

        <OrderListView v-else-if="isOrderList" :orders="orders" :admin="isAdmin" @action="performAction" />

        <OrderEditorView v-else-if="isOrderEditor" :order="currentOrder" :products="products" :admin="isAdmin" :mode="activeEditorMode" @back="handleEditorBack" @submit="handleEditorSubmit" @toast="showToast" />
        <OrderDetailView v-else-if="isDetail" :order="currentOrder" :admin="isAdmin" :products="products" @toast="showToast" />
      </main>
    </div>

    <Teleport to="body"><div v-if="actionPopover.show" class="action-pop-layer" @click.self="closeActionPopover"><div class="action-pop floating-action-pop" :style="{ left: `${actionPopover.x}px`, top: `${actionPopover.y}px` }" role="menu"><button v-for="action in actionPopover.actions" :key="action.id" type="button" role="menuitem" @click="performPopoverAction(action.id)">{{ action.label }}</button></div></div></Teleport>
    <div class="backdrop" :class="{ show: sidebarOpen || modal.show }" @click="sidebarOpen ? sidebarOpen = false : closeModal()"></div>
    <OrderActionModal v-if="modal.show" :modal="modal" :order="modalOrder" @close="closeModal" @submit="submitModal" @edit-address="openAddressDetailModal" />
    <div v-if="addressDetailModal.show" class="address-detail-backdrop" @click.self="closeAddressDetailModal"></div>
    <section v-if="addressDetailModal.show" class="modal show address-modal address-detail-modal" role="dialog" aria-modal="true">
      <div class="modal-head"><h2>{{ isAdmin ? "修改地址" : "Address Edit" }}</h2><button class="btn icon" type="button" :aria-label="isAdmin ? '关闭' : 'Close'" @click="closeAddressDetailModal"><X :size="18" /></button></div>
      <form @submit.prevent="submitAddressDetailModal">
        <div class="modal-body address-detail-form">
          <label><span><i>*</i>{{ isAdmin ? "收货人" : "Receiver" }}</span><input v-model="addressDetailModal.data.receiver" required :placeholder="isAdmin ? '请输入收货人' : 'Please enter the receiver'" /></label>
          <label><span><i>*</i>{{ isAdmin ? "联系电话" : "Contact Number" }}</span><input v-model="addressDetailModal.data.phone" required :placeholder="isAdmin ? '请输入联系电话' : 'Please enter the contact number'" /></label>
          <label><span><i>*</i>{{ isAdmin ? "收货地址" : "Country/City" }}</span><select v-model="addressDetailModal.data.country" required><option :value="addressDetailModal.data.country">{{ addressDetailModal.data.country }}</option><option>Afghanistan / Herat</option><option>Georgia / Tbilisi</option><option>Hong Kong / Kowloon</option></select></label>
          <label><span><i>*</i>{{ isAdmin ? "详细地址" : "Address" }}</span><input v-model="addressDetailModal.data.address" required :placeholder="isAdmin ? '请输入详细地址' : 'Please enter the detailed address'" /></label>
        </div>
        <div class="modal-foot"><button class="btn" type="button" @click="closeAddressDetailModal">{{ isAdmin ? "取消" : "Cancel" }}</button><button class="btn primary" type="submit">{{ isAdmin ? "提交" : "Submit" }}</button></div>
      </form>
    </section>
    <div v-if="tilePreviewOpen" class="tile-preview-backdrop" @click.self="closeTilePreview"></div>
    <section v-if="tilePreviewOpen" class="modal show tile-preview-modal" role="dialog" aria-modal="true"><div class="modal-head"><h2>Document Preview</h2><button class="btn icon" type="button" aria-label="Close" @click="closeTilePreview"><X :size="18" /></button></div><div class="modal-body"><div class="tile-preview-sheet"><strong>{{ tilePreviewDocument?.name }}</strong><span>{{ tilePreviewDocument?.type }}</span><dl><dt>Order Number</dt><dd>{{ currentOrder.no }}</dd><dt>Uploader</dt><dd>{{ currentOrder.owner }}</dd><dt>Upload Time</dt><dd>2026/07/16</dd></dl></div></div><div class="modal-foot"><button class="btn" type="button" @click="closeTilePreview">Close</button><button class="btn primary" type="button" @click="downloadTileDocument(tilePreviewDocument)">Download</button></div></section>    <div class="toast-stack"><div v-for="toast in toasts" :key="toast.id" class="toast">{{ toast.message }}</div></div>
  </div>
</template>
<style>
.product-detail-tabs,
.audit-product-tabs,
.editor-product-tabs,
.discount-product-tabs,
.checkout-product-tabs {
  gap: 6px !important;
}
.product-detail-tabs > button,
.audit-product-tabs > button,
.editor-product-tabs > button,
.discount-product-tabs > button,
.checkout-product-tabs > button {
  border: 1px solid #cfd4db !important;
  border-radius: 4px 4px 0 0;
}
.product-detail-tabs > button.active,
.audit-product-tabs > button.active,
.editor-product-tabs > button.active,
.discount-product-tabs > button.active,
.checkout-product-tabs > button.active {
  border-color: #9800c9 !important;
}.tile-pane { min-height: 480px; padding: 6px 10px 30px; }
.tile-audit-list { position: relative; max-width: 760px; }
.tile-audit-item { position: relative; display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 10px; padding-bottom: 28px; }
.tile-audit-item:not(:last-child)::after { content: ""; position: absolute; left: 5px; top: 13px; bottom: -2px; border-left: 1px solid #d4d9df; }
.tile-audit-dot { width: 10px; height: 10px; margin-top: 4px; border: 2px solid var(--primary); border-radius: 50%; background: #fff; }
.tile-meta-grid { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 5px 8px; color: #6b737c; line-height: 1.35; }
.tile-meta-grid strong { color: #3d444b; font-weight: 400; }
.tile-document-title { margin: 7px 0 10px; color: #30363c; font-size: 15px; font-weight: 600; }
.tile-document-list { display: grid; gap: 7px; }
.tile-document-row { display: flex; align-items: center; gap: 16px; min-height: 24px; }
.tile-document-name { min-width: 140px; color: #69717a; }
.tile-document-actions { display: flex; gap: 14px; }
.tile-document-actions button { padding: 0; border: 0; background: transparent; color: var(--primary); cursor: pointer; }
.tile-document-actions button:hover { text-decoration: underline; }
.tile-preview-backdrop { position: fixed; inset: 0; z-index: 69; background: rgba(20, 24, 28, .42); }
.tile-preview-modal { z-index: 70; width: min(560px, calc(100vw - 28px)); }
.tile-preview-sheet { min-height: 250px; padding: 28px; border: 1px solid var(--line); background: #fff; }
.tile-preview-sheet > strong { display: block; margin-bottom: 8px; font-size: 18px; }
.tile-preview-sheet > span { color: var(--muted); }
.tile-preview-sheet dl { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 12px; margin: 30px 0 0; }
.tile-preview-sheet dt { color: var(--muted); }
.tile-preview-sheet dd { margin: 0; }
@media (max-width: 580px) {
  .tile-document-row { align-items: flex-start; flex-direction: column; gap: 5px; }
  .tile-document-name { min-width: 0; }
}.admin-order-table { min-width: 2440px; }
.admin-order-table .sticky-operation {
  position: sticky;
  right: 0;
  z-index: 3;
  width: 220px;
  min-width: 220px;
  background: #fff;
  box-shadow: -1px 0 0 var(--line);
}
.admin-order-table thead .sticky-operation { z-index: 4; background: #f8f9fb; }
.admin-order-table tbody tr:hover .sticky-operation { background: #fcf9fd; }
.more-action { min-width: 72px; justify-content: center; list-style: none; }
.more-action::-webkit-details-marker { display: none; }
.detail-layout.order-detail-layout { grid-template-columns: minmax(0, 1fr) 310px; }
.order-detail-side .side-panel { padding: 18px 16px; }
.order-detail-side .side-item + .side-item { margin-top: 10px; }
.timeline .timeline-item:not(.complete) .timeline-mark::before {
  box-shadow: 0 0 0 1px #aeb5bd !important;
  background: #aeb5bd !important;
}
.detail-layout.admin-detail-layout { grid-template-columns: minmax(0, 1fr) 270px; }
.order-detail-main { min-height: 570px; padding: 0; }
.order-detail-main .detail-tabs { padding: 0 18px; margin-bottom: 0; }
.order-detail-main .detail-pane { padding: 18px 20px 30px; }
.order-detail-section + .order-detail-section { margin-top: 30px; padding-top: 2px; }
.order-detail-section h2 { margin: 0 0 16px; display: flex; align-items: center; gap: 9px; font-size: 15px; font-weight: 500; }
.order-detail-section h2 > span { width: 6px; height: 19px; border-radius: 3px; background: var(--primary); }
.order-detail-main .detail-row { min-height: 28px; align-items: start; }
.order-detail-main .detail-row strong,
.admin-detail-layout .side-item strong,
.order-detail-banner .order-banner-date strong { font-weight: 400; }
.order-detail-main .detail-row strong { color: #2f3740; }
.engraving-section { max-width: 460px; }
.engraving-table { width: 320px; min-width: 320px; border: 1px solid #c7ccd3; border-collapse: collapse; table-layout: fixed; }
.engraving-table th, .engraving-table td { padding: 9px 18px; border: 1px solid #c7ccd3; text-align: center; }
.engraving-table th { background: #b65bd2; color: #fff; font-weight: 500; }
.engraving-table tbody tr:nth-child(even) td { background: #faf8fb; }
.product-detail-tabs { min-height: 42px; margin-bottom: 8px; display: flex; align-items: end; border-bottom: 1px solid var(--line); }
.product-detail-tabs button { min-width: 104px; height: 38px; padding: 0 18px; border: 0; background: #fff; font-weight: 500; }
.product-detail-tabs button.active { background: #d58aea; color: #fff; }
.detail-product-table table { min-width: 960px; }
.detail-product-table.custom-detail-table table { min-width: 1240px; }
.empty-detail { padding: 28px; color: var(--muted); text-align: center; }
.change-meta { min-height: 34px; display: flex; justify-content: space-between; color: var(--muted); }
.change-detail .change-list { padding: 10px 14px; }
.change-detail .change-row { grid-template-columns: 58px minmax(0, 1fr); }
.change-detail .change-badge { padding: 4px; text-align: center; }
.admin-detail-layout .side-panel { padding: 18px 16px; }
.admin-detail-layout .side-item + .side-item { margin-top: 10px; }
.timeline-panel { min-height: 520px; }
.timeline { padding: 2px 0 0 2px; }
.timeline-item { grid-template-columns: 18px minmax(0, 1fr); gap: 9px; min-height: 54px; }
.timeline-mark::before { left: 4px; top: 5px; width: 8px; height: 8px; border: 2px solid #fff; box-shadow: 0 0 0 1px #aeb5bd; background: #aeb5bd; }
.timeline-mark::after { left: 8px; top: 17px; bottom: -1px; border-left: 1px dashed #aeb5bd; background: transparent; }
.timeline-item.complete .timeline-mark::before { box-shadow: 0 0 0 1px var(--primary); background: var(--primary); }
.timeline-item.active .timeline-content strong { color: var(--primary); }
.timeline-content { padding: 0 0 15px; line-height: 1.45; }
.timeline-content strong { display: block; color: #303840; font-weight: 400; }
.timeline-note { display: block; margin-top: 4px; color: var(--muted); font-size: 11px; line-height: 1.55; }
.timeline-meta { display: block; margin-top: 5px; color: #59636d; font-size: 10px; white-space: nowrap; }
@media (max-width: 1000px) {
  .detail-layout.admin-detail-layout { grid-template-columns: 1fr; }
  .admin-detail-layout .detail-side { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .admin-detail-layout .side-panel + .side-panel { margin-top: 0; }
}
@media (max-width: 580px) {
  .admin-detail-layout .detail-side { grid-template-columns: 1fr; }
  .order-detail-main .detail-pane { padding: 12px; }
  .engraving-table { width: 100%; min-width: 0; }
  .change-meta { gap: 8px; flex-direction: column; }
}
.audit-page { padding-bottom: 62px; }
.audit-order-banner { margin-bottom: 10px; }
.audit-panel { padding: 18px; }
.audit-section-title { margin: 0 0 16px; display: flex; align-items: center; gap: 9px; font-size: 14px; font-weight: 500; }
.audit-section-title > span { width: 6px; height: 19px; border-radius: 3px; background: var(--primary); }
.audit-fee-grid { display: grid; grid-template-columns: repeat(2, minmax(360px, 1fr)); gap: 16px 56px; max-width: 1080px; padding: 4px 20px 8px; }
.audit-fee-grid label { display: grid; grid-template-columns: 126px minmax(220px, 1fr); align-items: center; gap: 14px; color: #303942; }
.audit-field-label { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.audit-field-label i { color: var(--red); font-style: normal; }
.audit-result-panel legend span { color: var(--red); }
.audit-fee-grid input, .audit-fee-grid select { width: 100%; height: 36px; min-width: 0; border: 1px solid var(--line-dark); padding: 0 10px; background: #fff; }
.audit-product-heading { display: flex; justify-content: space-between; align-items: center; }
.audit-product-tabs { min-height: 42px; display: flex; align-items: end; border-bottom: 1px solid var(--line); }
.audit-product-tabs button { min-width: 108px; height: 38px; border: 0; background: #fff; font-weight: 500; }
.audit-product-tabs button.active { background: #d58aea; color: #fff; }
.audit-standard-table, .audit-custom-table { border-top: 0; }
.audit-standard-table table { min-width: 1320px; }
.audit-custom-table table { min-width: 1260px; }
.audit-cell-input { height: 30px; border: 1px solid var(--line-dark); padding: 0 7px; background: #fff; }
.product-code-input { width: 118px; }
.audit-cell-input.qty-input { width: 68px; }
.customization-input { width: 235px; }
.price-editor { display: inline-flex; align-items: center; gap: 5px; }
.price-editor input { width: 76px; }
.stock-state { color: var(--red); }
.audit-payable { padding: 16px 12px 4px; text-align: right; }
.audit-payable strong { color: var(--red); font-size: 16px; }
.audit-payable span { color: var(--red); }
.audit-result-panel { padding: 18px 25px; display: grid; grid-template-columns: minmax(360px, .7fr) minmax(320px, 1fr); gap: 28px; }
.audit-result-panel fieldset { margin: 0; padding: 0; display: flex; align-items: center; gap: 22px; border: 0; }
.audit-result-panel legend { width: 100px; float: left; }
.audit-result-panel fieldset label { display: inline-flex; align-items: center; gap: 6px; }
.audit-result-panel input[type=radio] { accent-color: var(--primary); }
.audit-note { display: grid; grid-template-columns: 90px minmax(0, 1fr); align-items: center; }
.audit-note input { height: 34px; border: 1px solid var(--line-dark); padding: 0 9px; }
.audit-footer { position: sticky; bottom: 0; z-index: 20; min-height: 58px; padding: 10px 18px; display: flex; justify-content: flex-end; align-items: center; gap: 10px; background: #fff; box-shadow: 0 -3px 12px rgba(31, 36, 43, .12); }
.audit-footer .btn { width: 100px; }
.picker-backdrop { position: fixed; inset: 0; z-index: 150; padding: 16px; display: grid; place-items: center; background: rgba(20, 24, 29, .45); }
.product-picker { width: min(920px, calc(100vw - 32px)); max-height: min(650px, calc(100vh - 32px)); display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; background: #fff; border: 1px solid #555; }
.product-picker-head { min-height: 46px; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); }
.product-picker-head h2 { margin: 0; font-size: 15px; font-weight: 500; }
.product-picker-head button { border: 0; background: transparent; color: var(--muted); }
.product-picker-toolbar { padding: 14px 16px; display: grid; grid-template-columns: minmax(240px, 1fr) auto auto; gap: 10px; }
.product-picker-toolbar input { height: 34px; border: 1px solid var(--line-dark); padding: 0 10px; }
.product-picker-table { min-height: 0; margin: 0 16px; overflow: auto; border-top: 1px solid var(--line); }
.product-picker-table table { min-width: 1040px; }
.product-picker-table th, .product-picker-table td { padding: 8px; white-space: normal; }
.picker-product-visual { width: 34px; height: 34px; }
.product-picker-footer { min-height: 52px; padding: 9px 16px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); }
.product-picker-footer > div { display: flex; gap: 8px; }
@media (max-width: 850px) {
  .audit-fee-grid { grid-template-columns: 1fr; gap: 12px; padding: 0; }
  .audit-result-panel { grid-template-columns: 1fr; }
}
@media (max-width: 580px) {
  .audit-panel { padding: 12px; }
  .audit-fee-grid label { grid-template-columns: 1fr; gap: 6px; }
  .audit-result-panel { padding: 12px; }
  .audit-result-panel fieldset { align-items: flex-start; flex-direction: column; gap: 9px; }
  .audit-result-panel legend { width: auto; float: none; }
  .audit-note { grid-template-columns: 1fr; gap: 5px; }
  .product-picker-toolbar { grid-template-columns: 1fr 1fr; }
  .product-picker-toolbar input { grid-column: 1 / -1; }
  .product-picker-footer { align-items: flex-start; flex-direction: column; gap: 8px; }
}
.editor-order-summary-card { overflow: hidden; }
.editor-order-summary { min-height: 118px; padding: 20px 22px 22px; }
.editor-order-topline { display: flex; align-items: center; gap: 10px; }
.editor-order-label { padding: 7px 12px; background: var(--primary); color: #fff; font-size: 14px; line-height: 1; }
.editor-order-topline > strong { font-size: 18px; font-weight: 500; }
.editor-status-pill { background: #f2f4f7; color: #626b75; }
.editor-order-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; margin-top: 25px; }
.editor-order-meta > div { display: flex; align-items: center; gap: 14px; }
.editor-order-meta span { color: var(--muted); }
.editor-order-meta strong { font-weight: 400; }
@media (max-width: 680px) {
  .editor-order-summary { padding: 16px; }
  .editor-order-topline { align-items: flex-start; flex-wrap: wrap; }
  .editor-order-meta { grid-template-columns: 1fr; gap: 12px; margin-top: 18px; }
}
.editor-products-page .page-head { align-items: flex-end; gap: 16px; }
.editor-product-tabs { flex: 1; }
.editor-standard-table table { min-width: 1280px; }
.editor-custom-table table { min-width: 1480px; }
.editor-custom-table .readonly-cell-value { display: inline-flex; min-height: 34px; align-items: center; color: #303942; }
.editor-custom-table .requirement-value { min-width: 210px; white-space: normal; line-height: 1.45; }
.modify-order-page { display: grid; gap: 14px; }
.modify-products-card { padding: 18px; }
.modify-products-head { margin-bottom: 12px; }
.modify-products-head .editor-product-tabs { min-height: 42px; display: flex; align-items: end; border-bottom: 1px solid var(--line); }
.modify-products-head .editor-product-tabs button { min-width: 150px; height: 38px; padding: 0 18px; background: #fff; font-weight: 500; }
.modify-products-head .editor-product-tabs button.active { background: #d58aea; color: #fff; }
.modify-product-table { border: 1px solid var(--line); }
.modify-product-table th, .modify-product-table td { vertical-align: middle; }
.modify-product-table .readonly-cell-value { min-height: 32px; padding: 0 2px; }
.modify-order-footer { min-height: 62px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.modify-order-footer > div { display: flex; gap: 8px; }
.modify-order-footer .btn { min-width: 88px; }
.modify-total { color: var(--red); }
.modify-total strong { font-weight: 500; }
@media (max-width: 650px) {
  .modify-order-footer { align-items: stretch; flex-direction: column; }
  .modify-order-footer > div { justify-content: flex-end; }
}
.discount-page { min-height: 420px; }
.discount-form-grid { max-width: 980px; margin-bottom: 22px; }
.discount-title { margin-bottom: 4px; }
.discount-product-tabs button { min-width: 132px; }
.discount-standard-table table { min-width: 1560px; }
.discount-custom-table table { min-width: 1540px; }
.discount-footer { gap: 18px; }
.discount-footer > :nth-child(2) { margin-left: auto; }
.itemno-page { min-height: 480px; }
.itemno-table table { min-width: 1260px; }
.item-code-input { width: 145px; }
.itemno-footer { margin-top: auto; }
.itemno-hint { color: var(--red); }
.shipment-modal { width: min(640px, calc(100vw - 28px)); }
.shipment-form { display: grid; gap: 20px; padding: 4px 2px; }
.shipment-form .field { display: grid; grid-template-columns: 105px minmax(0, 1fr); align-items: center; gap: 10px; }
.shipment-form .field > label:first-child { color: #303942; }
.shipment-form input[type=text], .shipment-form .field > input { width: 100%; height: 34px; min-width: 0; padding: 0 10px; border: 1px solid var(--line-dark); }
.shipment-field-label { display: inline-flex; align-items: center; gap: 4px; color: #303942; text-align: left; white-space: nowrap; }
.shipment-field-label i { color: var(--red); font-style: normal; }
.shipment-reason-field { width: 100%; }
.shipment-form .radio-line { gap: 24px; flex-wrap: nowrap; }
.shipment-form .radio-line label { display: inline-flex; align-items: center; gap: 7px; margin: 0; font-size: 14px; white-space: nowrap; }
.shipment-form .radio-line input[type=radio] { width: 16px; height: 16px; min-width: 16px; padding: 0; margin: 0; flex: 0 0 16px; border: 0; accent-color: var(--primary); }
.shipment-result { min-height: 34px; }
@media (max-width: 650px) {
  .editor-products-page .page-head { align-items: stretch; flex-direction: column; }
  .editor-product-tabs { width: 100%; overflow-x: auto; }
  .discount-footer, .itemno-footer { align-items: flex-start; flex-direction: column; }
  .discount-footer > :nth-child(2) { margin-left: 0; }
  .shipment-form .field { grid-template-columns: 1fr; gap: 6px; }
}.customer-order-table { min-width: 2280px; }
.customer-order-table .sticky-operation,
.admin-order-table .sticky-operation { position: sticky; right: 0; z-index: 4; width: 220px; min-width: 220px; background: #fff; box-shadow: -1px 0 0 var(--line); }
.customer-order-table thead .sticky-operation { z-index: 8; background: #f8f9fb; }
.customer-order-table tbody tr:hover .sticky-operation { background: #fcf9fd; }
.action-pop-layer { position: fixed; inset: 0; z-index: 500; background: transparent; }
.action-pop.floating-action-pop {
  position: fixed;
  z-index: 501;
  display: grid;
  right: auto;
  width: 210px;
  max-height: min(320px, calc(100vh - 24px));
  padding: 6px;
  overflow-y: auto;
  border: 1px solid var(--line-dark);
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(34, 24, 46, 0.2);
}
.breadcrumb-link { padding: 0; border: 0; background: transparent; color: var(--muted); cursor: pointer; }
.breadcrumb-link:hover { color: var(--primary); }
.laser-form { display: grid; gap: 14px; }
.laser-form p { margin: 0; color: var(--muted); }
.laser-form label { min-height: 34px; display: flex; align-items: center; gap: 9px; }
.laser-form input { width: 15px; height: 15px; accent-color: var(--primary); }
.modal.address-modal { width: min(680px, calc(100vw - 28px)); }
.address-detail-backdrop { position: fixed; inset: 0; z-index: 100; background: rgba(24, 29, 35, .28); }
.modal.address-detail-modal { z-index: 110; width: min(680px, calc(100vw - 28px)); }
.address-detail-modal .modal-body { padding: 20px 22px 16px; }
.address-detail-modal form { min-height: 0; }
.modal.voucher-modal { width: min(560px, calc(100vw - 28px)); }
.voucher-form { min-height: 170px; display: grid; grid-template-columns: 112px minmax(0, 1fr); align-items: start; gap: 16px; padding: 16px 4px; }
.voucher-field-label { padding-top: 58px; color: #303942; text-align: right; white-space: nowrap; }
.voucher-field-label span { margin-right: 4px; color: var(--red); }
.voucher-upload-area { min-width: 0; }
.voucher-tiles { display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap; }
.voucher-preview,
.voucher-add-tile { width: 104px; height: 104px; margin: 0; border: 1px dashed var(--line-dark); border-radius: 3px; background: #fff; }
.voucher-preview { position: relative; overflow: hidden; border-style: solid; }
.voucher-preview img { width: 100%; height: 100%; display: block; object-fit: cover; }
.voucher-preview figcaption { position: absolute; right: 0; bottom: 0; left: 0; padding: 4px 6px; overflow: hidden; background: rgba(30, 35, 42, .68); color: #fff; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.voucher-add-tile { display: grid; place-content: center; gap: 7px; color: #5d6670; text-align: center; cursor: pointer; }
.voucher-add-tile:hover { border-color: var(--primary); color: var(--primary); }
.voucher-add-tile.disabled { opacity: .48; cursor: not-allowed; }
.voucher-add-tile input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.voucher-upload-area > p { margin: 9px 0 0; color: var(--muted); font-size: 12px; line-height: 1.45; }
.address-settings-form { display: grid; gap: 24px; }
.address-select-row { display: grid; gap: 9px; }
.address-field-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: #303942; }
.address-field-heading i,
.address-option-group legend span,
.address-detail-form label > span i { margin-right: 4px; color: var(--red); font-style: normal; }
.address-edit-link { padding: 4px 0; border: 0; background: transparent; color: var(--primary); cursor: pointer; }
.address-edit-link:hover { text-decoration: underline; }
.address-select-row select,
.address-detail-form input,
.address-detail-form select { width: 100%; height: 36px; min-width: 0; padding: 0 10px; border: 1px solid var(--line-dark); border-radius: 2px; background: #fff; color: var(--text); }
.address-option-group { min-width: 0; margin: 0; padding: 0; border: 0; }
.address-option-group legend { margin-bottom: 11px; padding: 0; color: #303942; font-size: 14px; }
.address-option-group .radio-line { gap: 28px; flex-wrap: wrap; }
.address-option-group .radio-line label { gap: 7px; margin: 0; white-space: nowrap; }
.address-option-group input[type=radio] { width: 16px; height: 16px; min-width: 16px; padding: 0; margin: 0; flex: 0 0 16px; accent-color: var(--primary); }
.address-detail-form { display: grid; gap: 16px; }
.address-detail-form label { display: grid; grid-template-columns: 118px minmax(0, 1fr); align-items: center; gap: 12px; }
.address-detail-form label > span { color: #303942; }
@media (max-width: 580px) {
  .voucher-form { grid-template-columns: 1fr; gap: 8px; }
  .voucher-field-label { padding-top: 0; text-align: left; }
  .address-detail-form label { grid-template-columns: 1fr; gap: 6px; }
  .address-option-group .radio-line { align-items: flex-start; flex-direction: column; gap: 10px; }
}
.customer-detail-banner .order-banner-meta { justify-content: space-between; gap: 24px; padding-right: 24px; }
.detail-layout.customer-detail-layout { grid-template-columns: minmax(0, 1fr) 310px; }
.customer-detail-layout .side-panel { padding: 18px 16px; }
.customer-detail-layout .side-item + .side-item { margin-top: 10px; }
.customer-detail-layout .product-detail-tabs button { min-width: 220px; font-size: 16px; }
.customer-detail-layout .detail-product-table table { min-width: 1420px; }
.customer-detail-layout .detail-product-table.custom-detail-table table { min-width: 1540px; }
.customer-detail-layout .detail-product-table th,
.customer-detail-layout .detail-product-table td { white-space: nowrap; }
.customer-detail-layout .timeline-panel { min-height: 620px; max-height: 720px; overflow-y: auto; }
.customer-detail-layout .timeline-note { font-size: 11px; }
.customer-detail-layout .timeline-meta { white-space: normal; }
.customer-detail-layout .detail-row strong,
.customer-detail-layout .side-item strong { font-weight: 400; }
.delivery-information-section { margin-top: 0; }
.change-detail .muted { display: block; margin-top: 6px; }
.stock-state { color: var(--red); }
@media (max-width: 1000px) {
  .detail-layout.customer-detail-layout { grid-template-columns: 1fr; }
  .customer-detail-layout .detail-side { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .customer-detail-layout .side-panel + .side-panel { margin-top: 0; }
}
@media (max-width: 580px) {
  .customer-detail-layout .detail-side { grid-template-columns: 1fr; }
  .customer-detail-layout .product-detail-tabs button { min-width: 50%; font-size: 14px; }
}
.modal.pay-modal { width: min(610px, calc(100vw - 28px)); }
.pay-modal .modal-head { min-height: 62px; padding: 0 24px; }
.pay-modal .modal-head h2 { font-size: 15px; font-weight: 600; }
.pay-modal .modal-body { padding: 24px 22px 18px; }
.pay-modal .modal-foot { min-height: 62px; padding: 0 24px; }
.pay-form { min-height: 430px; display: grid; align-content: start; gap: 28px; padding: 4px 0 8px; color: #545d66; }
.pay-return-notice { padding: 11px 14px; background: #fff9e6; color: #606870; font-size: 13px; line-height: 1.55; }
.pay-balance { margin: 0; }
.pay-choice { display: grid; grid-template-columns: 140px minmax(0, 1fr); align-items: center; gap: 12px; }
.pay-field-label { white-space: nowrap; }
.pay-field-label i { margin-right: 4px; color: var(--red); font-style: normal; }
.pay-form .radio-line { min-height: 24px; gap: 18px; flex-wrap: nowrap; }
.pay-form .radio-line label { gap: 7px; margin: 0; white-space: nowrap; }
.pay-form input[type=radio] { width: 16px; height: 16px; min-width: 16px; padding: 0; margin: 0; accent-color: var(--primary); }
.pay-amount { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 8px 12px; align-items: center; }
.pay-amount strong { font-weight: 400; }
.pay-to { grid-column: 2; padding-left: 50px; }
.pay-proof-row { display: grid; grid-template-columns: 140px minmax(0, 1fr); align-items: start; gap: 12px; }
.pay-proof-row > .pay-field-label { padding-top: 14px; text-align: right; }
.pay-upload-tiles { display: flex; align-items: flex-start; gap: 10px; flex-wrap: wrap; }
.pay-upload-tile { position: relative; width: 104px; height: 104px; display: grid; place-content: center; gap: 7px; border: 1px dashed var(--line-dark); border-radius: 3px; background: #fff; color: #5d6670; text-align: center; cursor: pointer; }
.pay-upload-tile:hover { border-color: var(--primary); color: var(--primary); }
.pay-upload-tile.disabled { opacity: .48; cursor: not-allowed; }
.pay-upload-tile input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.pay-upload-area > p { margin: 8px 0 0; color: #8a9198; font-size: 12px; line-height: 1.35; }
.pay-remarks { display: grid; grid-template-columns: 140px minmax(0, 1fr); align-items: center; gap: 12px; }
.pay-remarks > span { text-align: right; }
.pay-remarks input { width: 100%; height: 36px; min-width: 0; padding: 0 10px; border: 1px solid var(--line-dark); border-radius: 2px; }
@media (max-width: 580px) {
  .pay-form { min-height: 0; gap: 20px; }
  .pay-choice, .pay-amount, .pay-proof-row, .pay-remarks { grid-template-columns: 1fr; gap: 8px; }
  .pay-proof-row > .pay-field-label, .pay-remarks > span { padding-top: 0; text-align: left; }
  .pay-to { grid-column: 1; padding-left: 0; }
}
.address-inline-field { display: grid; grid-template-columns: 170px minmax(0, 1fr); align-items: center; gap: 12px; color: #303942; }
.address-inline-field > span { white-space: nowrap; }
.address-inline-field i { margin-right: 4px; color: var(--red); font-style: normal; }
.address-inline-field input { width: 100%; height: 36px; min-width: 0; padding: 0 10px; border: 1px solid var(--line-dark); border-radius: 2px; background: #fff; }
@media (max-width: 580px) {
  .address-inline-field { grid-template-columns: 1fr; gap: 6px; }
}
select:has(> option[data-placeholder]:checked) { color: #9aa3ad; }
select > option:not([data-placeholder]) { color: #24272d; }
/* Shared read-only field layout for every order detail/view page. */
.order-detail-main .detail-grid {
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  column-gap: 54px;
  row-gap: 6px;
}
.order-detail-main .detail-row {
  grid-template-columns: 142px minmax(0, 1fr);
  align-items: start;
  gap: 14px;
  min-height: 36px;
  padding: 4px 0;
  color: #252c33;
  line-height: 1.5;
  text-align: left;
}
.order-detail-main .detail-row > span {
  color: #6c7783;
  font-weight: 400;
  text-align: left;
}
.order-detail-main .detail-row > strong {
  min-width: 0;
  color: #252c33;
  font-weight: 400;
  text-align: left;
  overflow-wrap: anywhere;
}
.order-detail-main .detail-row > strong.money {
  color: var(--red);
}
.order-detail-side .side-panel h2 {
  color: #252c33;
  font-weight: 500;
}
.order-detail-side .side-item {
  grid-template-columns: 96px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  min-height: 32px;
  line-height: 1.4;
  text-align: left;
}
.order-detail-side .side-item > span {
  color: #6c7783;
  font-weight: 400;
  text-align: left;
}
.order-detail-side .side-item > strong {
  min-width: 0;
  color: #252c33;
  font-weight: 400;
  text-align: left;
  overflow-wrap: anywhere;
}
.order-detail-main .detail-product-table th {
  color: #56616c;
  font-weight: 500;
}
.order-detail-main .detail-product-table td {
  color: #252c33;
  font-weight: 400;
}
@media (max-width: 1180px) {
  .order-detail-main .detail-grid { column-gap: 32px; }
  .order-detail-main .detail-row { grid-template-columns: 126px minmax(0, 1fr); }
}
@media (max-width: 1000px) {
  .detail-layout.order-detail-layout { grid-template-columns: 1fr; }
  .order-detail-layout .detail-side {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  .order-detail-layout .side-panel + .side-panel { margin-top: 0; }
}
@media (max-width: 760px) {
  .order-detail-main .detail-grid { grid-template-columns: 1fr; }
  .order-detail-main .detail-row { grid-template-columns: 132px minmax(0, 1fr); }
  .order-detail-layout .detail-side { grid-template-columns: 1fr; }
}
@media (max-width: 460px) {
  .order-detail-main .detail-row {
    grid-template-columns: 1fr;
    gap: 3px;
    padding: 6px 0;
  }
}
.requirements-page { display: grid; gap: 14px; padding-bottom: 4px; }
.requirements-order-card { padding: 20px 22px; }
.requirements-order-topline { display: flex; align-items: center; gap: 10px; }
.requirements-order-topline > strong { font-size: 18px; font-weight: 500; }
.requirements-order-meta { margin-top: 22px; display: grid; grid-template-columns: 106px minmax(220px, 1fr) 88px minmax(160px, .7fr); gap: 14px; align-items: center; }
.requirements-order-meta > span { color: var(--muted); }
.requirements-order-meta > strong { font-weight: 400; }
.requirements-products-card { padding: 18px; }
.requirements-products-head { display: flex; align-items: end; justify-content: space-between; gap: 18px; }
.requirements-products-head .editor-product-tabs { flex: 1; min-height: 42px; display: flex; align-items: end; border-bottom: 1px solid var(--line); }
.requirements-products-head .editor-product-tabs button { min-width: 150px; height: 38px; padding: 0 18px; background: #fff; font-weight: 500; }
.requirements-products-head .editor-product-tabs button.active { background: #d58aea; color: #fff; }
.requirements-product-table table { min-width: 1500px; }
.requirements-cell-input { width: 100px; height: 30px; padding: 0 8px; border: 1px solid var(--line-dark); background: #fff; }
.requirements-cell-input.code { width: 118px; }
.requirements-cell-input.quantity { width: 68px; }
.requirements-cell-input.price { width: 76px; margin-left: 6px; }
.currency-prefix { color: #303942; }
.requirements-fees-card { padding: 18px; }
.requirements-fees-card h2 { margin: 0 0 14px; font-size: 15px; font-weight: 500; }
.requirements-fee-grid { display: grid; grid-template-columns: repeat(4, minmax(190px, 1fr)); gap: 14px 18px; }
.requirements-fee-grid label { display: grid; gap: 6px; color: #303942; }
.requirements-fee-grid label span { font-size: 13px; }
.requirements-fee-grid i { color: var(--red); font-style: normal; }
.requirements-fee-grid input,
.requirements-fee-grid select { width: 100%; height: 36px; min-width: 0; padding: 0 10px; border: 1px solid var(--line-dark); border-radius: 2px; background: #fff; color: var(--text); }
.requirements-footer { position: sticky; bottom: 0; z-index: 20; min-height: 68px; padding: 12px 18px; display: flex; align-items: center; justify-content: flex-end; gap: 12px; box-shadow: 0 -3px 12px rgba(31, 36, 43, .12); }
.requirements-payable { min-width: 0; display: flex; align-items: center; justify-content: flex-end; gap: 6px; font-size: 14px; line-height: 1.45; text-align: right; }
.requirements-payable > span { color: #333a42; white-space: nowrap; }
.requirements-payable > strong { color: var(--red); font-weight: 400; white-space: nowrap; }
.requirements-actions { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.requirements-actions .btn { min-width: 96px; }
@media (max-width: 1180px) {
  .requirements-fee-grid { grid-template-columns: repeat(2, minmax(220px, 1fr)); }
  .requirements-footer { align-items: flex-end; flex-direction: column; }
}
@media (max-width: 760px) {
  .requirements-order-meta, .requirements-fee-grid { grid-template-columns: 1fr; }
  .requirements-products-head { align-items: stretch; flex-direction: column; }
  .requirements-products-head .editor-product-tabs { overflow-x: auto; }
  .requirements-payable { align-items: flex-start; flex-direction: column; text-align: left; }
  .requirements-actions { width: 100%; }
  .requirements-actions .btn { flex: 1; min-width: 0; }
}</style>
