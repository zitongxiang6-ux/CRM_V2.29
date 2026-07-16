<script setup>
import { computed, ref } from "vue";
import { money, statusZh } from "../data";

const props = defineProps({
  order: { type: Object, required: true },
  admin: { type: Boolean, default: false },
  products: { type: Array, required: true },
});

const emit = defineEmits(["toast"]);
const activeTab = ref("basic");
const productTab = ref("standard");

const tabs = computed(() => props.admin
  ? [
      { key: "basic", label: "基础信息" },
      { key: "products", label: "产品信息" },
      { key: "changes", label: "变更明细" },
      { key: "tile", label: "方悦" },
    ]
  : [
      { key: "basic", label: "Basic Information" },
      { key: "products", label: "Product Information" },
      { key: "changes", label: "Change Details" },
      { key: "tile", label: "Tile" },
    ]);

const standardProducts = computed(() => props.products.filter((product) => !product.custom && [101, 102].includes(product.id)).map((product, index) => ({
  ...product,
  qty: index === 0 ? 1 : 2,
  laser: product.laserApplicable === false ? "--" : "Yes",
})));

const customProducts = computed(() => props.products.filter((product) => product.custom).slice(0, 2).map((product, index) => ({
  ...product,
  qty: index + 1,
  noStandardCode: index === 0 ? "435567007" : "435567008",
  laser: "Yes",
  customization: index === 0 ? "black and blue" : "gold finish with custom icons",
})));

const basicRows = computed(() => {
  const o = props.order;
  const payable = money(o.amount || 0, o.currency || "USD");
  return props.admin
    ? [
        ["订单编号", o.no], ["客户名称", o.customer], ["项目名称", o.project], ["项目编号", o.projectNo || "-"],
        ["下单时间", o.date], ["订单金额", money(o.amount, o.currency)], ["应付总金额", `${payable}（订单金额：${payable}，运费：$0，手续费：$0）`], ["支付方式", o.currency],
        ["订单来源", o.source || "CRM"], ["合同编号", o.contract || "-"], ["HDL Ref No", o.hdl || "-"], ["到付账号", o.shipping === "Freight Collect" ? "3435555" : "-"],
        ["是否含税", o.tax || "-"], ["ERP订单号", o.erp || "-"], ["订单状态", statusZh[o.status] || o.status], ["付款凭证", "-"],
        ["发货要求", o.dispatch || "-"], ["订单备注", o.note || "-"], ["付款备注", "-"], ["发货备注", o.dispatch || "-"],
      ]
    : [
        ["Order Number", o.no], ["Customer Name", o.customer], ["Project Name", o.project], ["Project Number", o.projectNo || "-"],
        ["Order Time", o.date], ["Order Total", money(o.amount, o.currency)], ["Total Amount Payable", `${payable} (Order Total: ${payable}, Freight: $0, Pay Handling Fee: $0)`], ["Payment Method", o.currency],
        ["Order Source", o.source || "CRM"], ["Contract Number", o.contract || "-"], ["HDL Ref No", o.hdl || "-"], ["Freight collect account", o.shipping === "Freight Collect" ? "3435555" : "-"],
        ["Whether Tax Included", o.tax || "-"], ["ERP Order No.", o.erp || "-"], ["Order Status", o.status], ["Proof of Payment", "-"],
        ["Dispatch Requirement", o.dispatch || "-"], ["Order Remarks", o.note || "-"], ["Payment Remarks", "-"], ["Delivery Remarks", o.dispatch || "-"],
      ];
});

const addressRows = computed(() => {
  const o = props.order;
  return props.admin
    ? [
        ["收货地址", `${o.country || "-"} ${o.address || ""}`.trim()], ["发货方式", o.shipping || "-"],
        ["物流公司", o.logistics || "-"], ["到付账号", o.shipping === "Freight Collect" ? "3435555" : "-"],
        ["发货要求", o.dispatch || "-"], ["收货人", o.receiver || "-"], ["联系电话", o.phone || "-"],
      ]
    : [
        ["Delivery Address", `${o.country || "-"} ${o.address || ""}`.trim()], ["Shipping Method", o.shipping || "-"],
        ["Logistics Company", o.logistics || "-"], ["Freight collect account", o.shipping === "Freight Collect" ? "3435555" : "-"],
        ["Dispatch Requirement", o.dispatch || "-"], ["Receiver", o.receiver || "-"], ["Contact Number", o.phone || "-"],
      ];
});

const timeline = computed(() => {
  const customer = [
    "Order Completed", "Receipt Confirmed", "Dispatched", "Shipment Confirmed", "Order Paid",
    "Non-standard Production", "Order Review", "Requirements Confirmation", "Order Submitted",
  ];
  const admin = ["订单完成", "确认收货", "正式发货", "确认发货", "订单付款", "非标品生产", "订单审核", "确认需求", "提交订单"];
  return (props.admin ? admin : customer).map((label, index) => ({
    label,
    active: index >= 7,
    note: index === 7 ? (props.admin ? "由销售经理确认客户提交的需求。" : "The Sales Manager confirms whether the customer's submitted requirements are valid.") : index === 8 ? (props.admin ? "客户已提交订单。" : "The customer submitted the order.") : "",
  }));
});

function fieldIsMoney(label) {
  return /Amount|Total|金额/.test(label);
}
</script>

<template>
  <div class="order-detail-view">
    <section class="page order-detail-banner">
      <div class="order-banner-main"><span class="order-number-label">{{ admin ? "订单编号" : "Order Number" }}</span><strong>{{ order.no }}</strong><span class="pill purple">{{ admin ? (statusZh[order.status] || order.status) : order.status }}</span></div>
      <div class="order-banner-meta"><span>{{ admin ? "客户名称" : "Customer Name" }}</span><strong>{{ order.customer }}</strong><span>{{ admin ? "订单备注" : "Order Remarks" }}: {{ order.note || "-" }}</span><span>{{ admin ? "下单日期" : "Order Date" }}</span><strong>{{ order.date }}</strong></div>
    </section>

    <div class="detail-layout order-detail-layout" :class="{ 'admin-detail-layout': admin }">
      <section class="page order-detail-main">
        <div class="detail-tabs" role="tablist">
          <button v-for="tab in tabs" :key="tab.key" class="detail-tab" :class="{ active: activeTab === tab.key }" type="button" role="tab" :aria-selected="activeTab === tab.key" @click="activeTab = tab.key">{{ tab.label }}</button>
        </div>

        <div class="detail-pane">
          <template v-if="activeTab === 'basic'">
            <section class="order-detail-section">
              <h2><span></span>{{ admin ? "订单信息" : "Order Information" }}</h2>
              <div class="detail-grid complete-detail-grid">
                <div v-for="row in basicRows" :key="row[0]" class="detail-row"><span>{{ row[0] }}</span><strong :class="{ money: fieldIsMoney(row[0]) }">{{ row[1] }}</strong></div>
              </div>
            </section>
            <section class="order-detail-section">
              <h2><span></span>{{ admin ? "收货地址" : "Delivery Address" }}</h2>
              <div class="detail-grid complete-detail-grid"><div v-for="row in addressRows" :key="row[0]" class="detail-row"><span>{{ row[0] }}</span><strong>{{ row[1] }}</strong></div></div>
            </section>
            <section class="order-detail-section engraving-section">
              <h2><span></span>{{ admin ? "镭雕需求" : "Laser Engraving Required" }}</h2>
              <table class="engraving-table"><thead><tr><th>{{ admin ? "面板系列" : "Panel Series" }}</th><th>{{ admin ? "是否镭雕" : "Laser Engraving Required" }}</th></tr></thead><tbody><tr><td>Tile</td><td>Yes</td></tr><tr><td>Xelent</td><td>Yes</td></tr></tbody></table>
            </section>
          </template>

          <section v-else-if="activeTab === 'products'" class="order-detail-section">
            <div class="section-heading-row"><h2><span></span>{{ admin ? "产品信息" : "Product Information" }}</h2><button class="btn" type="button" @click="emit('toast', admin ? '产品信息已导出。' : 'Product information exported.')">{{ admin ? "导出产品信息" : "Export product information" }}</button></div>
            <div class="product-detail-tabs bordered-product-tabs" role="tablist">
              <button type="button" :class="{ active: productTab === 'standard' }" @click="productTab = 'standard'">{{ admin ? "标准品" : "Standard Products" }}</button>
              <button type="button" :class="{ active: productTab === 'custom' }" @click="productTab = 'custom'">{{ admin ? "非标定制品" : "No-standard Products" }}</button>
            </div>
            <div v-if="productTab === 'standard'" class="table-wrap detail-product-table"><table><thead><tr><th>{{ admin ? "产品名称" : "Product Name" }}</th><th>{{ admin ? "产品规格" : "Product Specification" }}</th><th>{{ admin ? "产品型号" : "Product Model" }}</th><th>{{ admin ? "产品编码" : "Product Code" }}</th><th>{{ admin ? "是否镭雕" : "Laser Engraving" }}</th><th>{{ admin ? "数量" : "Quantity" }}</th><th>{{ admin ? "折扣" : "Discount" }}</th><th>{{ admin ? "单价" : "Unit Price" }}</th><th>{{ admin ? "金额" : "Amount" }}</th><th>{{ admin ? "发货状态" : "Delivery Status" }}</th></tr></thead><tbody><tr v-for="product in standardProducts" :key="product.id"><td>{{ product.name }}</td><td>{{ product.spec }}</td><td>{{ product.model }}</td><td>{{ product.code }}</td><td>{{ product.laser }}</td><td>{{ product.qty }}</td><td>0.8</td><td>{{ money(product.price, order.currency) }}</td><td class="money">{{ money(product.price * product.qty, order.currency) }}</td><td :class="{ 'stock-state': product.shortage }">{{ product.shortage ? (admin ? "缺货" : "Out of stock") : "-" }}</td></tr></tbody></table></div>
            <div v-else class="table-wrap detail-product-table custom-detail-table"><table><thead><tr><th>{{ admin ? "产品名称" : "Product Name" }}</th><th>{{ admin ? "产品规格" : "Product Specification" }}</th><th>{{ admin ? "产品编码" : "Product Code" }}</th><th>{{ admin ? "非标品编码" : "No-standard Product Code" }}</th><th>{{ admin ? "数量" : "Quantity" }}</th><th>{{ admin ? "单价" : "Unit Price" }}</th><th>{{ admin ? "是否镭雕" : "Laser Engraving" }}</th><th>{{ admin ? "非标定制需求" : "No-standard customization" }}</th><th>{{ admin ? "金额" : "Amount" }}</th><th>{{ admin ? "发货状态" : "Delivery Status" }}</th></tr></thead><tbody><tr v-for="product in customProducts" :key="product.id"><td>{{ product.name }}</td><td>{{ product.spec }}</td><td>{{ product.code }}</td><td class="money">{{ product.noStandardCode }}</td><td>{{ product.qty }}</td><td>{{ money(product.price, order.currency) }}</td><td>{{ product.laser }}</td><td>{{ product.customization }}</td><td class="money">{{ money(product.price * product.qty, order.currency) }}</td><td>-</td></tr></tbody></table></div>
          </section>

          <section v-else-if="activeTab === 'changes'" class="order-detail-section change-detail">
            <div class="change-meta"><span>{{ admin ? "操作人：" : "Operator: " }}{{ order.owner }}</span><span>2026-07-14 14:13:37</span></div>
            <div class="change-list"><div class="change-row"><span class="change-badge red">{{ admin ? "删除" : "Delete" }}</span><div><strong>{{ admin ? "删除商品" : "Delete Product" }} Tile Series UK Switch Socket 2.1</strong><span class="muted">{{ admin ? "商品编码" : "Commodity Code" }} 308081790, {{ admin ? "数量8删除为0" : "Quantity 8 deletion to 0" }}</span></div></div><div class="change-row"><span class="change-badge blue">{{ admin ? "修改" : "Modify" }}</span><div><strong>{{ admin ? "修改数量" : "Modify Quantity" }} Constant Voltage Driver(RGBW)</strong><span class="muted">{{ admin ? "商品编码" : "Commodity Code" }} 312020010, {{ admin ? "数量1变更为3" : "Quantity 1 changed to 3" }}</span></div></div></div>
          </section>

          <section v-else class="tile-pane" aria-label="Tile information">
            <div class="tile-audit-list"><div class="tile-audit-item"><span class="tile-audit-dot"></span><div class="tile-meta-grid"><span>Approval Status:</span><strong>To be confirmed</strong><span>Approval Instructions:</span><strong>-</strong><span>Approval Time:</span><strong>-</strong><span>Reviewer:</span><strong>-</strong></div></div><div class="tile-audit-item"><span class="tile-audit-dot"></span><div><div class="tile-meta-grid"><span>Upload Time:</span><strong>2026/07/16</strong><span>Uploader:</span><strong>{{ order.owner }}</strong></div><h2 class="tile-document-title">Laser Engraving Requirements Document</h2><div class="tile-document-list"><div class="tile-document-row"><span class="tile-document-name">20253131048219160</span><div class="tile-document-actions"><button type="button" @click="emit('toast', 'Document preview opened.')">Preview</button><button type="button" @click="emit('toast', 'Document downloaded.')">Download</button></div></div><div class="tile-document-row"><span class="tile-document-name">销售单.xlsx</span><div class="tile-document-actions"><button type="button" @click="emit('toast', 'Document preview opened.')">Preview</button><button type="button" @click="emit('toast', 'Document downloaded.')">Download</button></div></div></div></div></div></div>
          </section>
        </div>
      </section>

      <aside class="detail-side order-detail-side">
        <section class="side-panel"><h2>{{ admin ? "订单负责人" : "Order Manager" }}</h2><div class="side-item"><span>{{ admin ? "负责人" : "Person in Charge" }}</span><strong>{{ order.owner }}</strong></div><div class="side-item"><span>{{ admin ? "所属部门" : "Department" }}</span><strong>{{ admin ? "销售管理部" : "Sales Management Department" }}</strong></div><div class="side-item"><span>{{ admin ? "联系电话" : "Contact Number" }}</span><strong>{{ order.phone }}</strong></div></section>
        <section class="side-panel timeline-panel"><h2>{{ admin ? "订单记录" : "Order Record" }}</h2><div class="timeline"><div v-for="step in timeline" :key="step.label" class="timeline-item" :class="{ complete: step.active }"><span class="timeline-mark"></span><div><strong>{{ step.label }}</strong><p v-if="step.note">{{ step.note }}</p><small v-if="step.active">{{ order.owner }} 2026-07-14 11:43:46</small></div></div></div></section>
      </aside>
    </div>
  </div>
</template>

<style>
.order-detail-banner { padding: 18px 20px; }
.order-banner-main { display: flex; align-items: center; gap: 10px; }
.order-number-label { padding: 7px 11px; background: var(--primary); color: #fff; }
.order-banner-main > strong { font-size: 20px; font-weight: 500; }
.order-banner-meta { display: grid; grid-template-columns: max-content minmax(180px, 1fr) max-content minmax(160px, 1fr) max-content max-content; gap: 10px 14px; align-items: center; margin-top: 16px; color: var(--muted); }
.order-banner-meta strong { color: #30363c; font-weight: 400; }
.complete-detail-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 54px; }
.complete-detail-grid .detail-row { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; text-align: left; }
.complete-detail-grid .detail-row > span { color: #687381; }
.complete-detail-grid .detail-row > strong { color: #202830; font-weight: 400; text-align: left; }
.section-heading-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.bordered-product-tabs { padding: 0; border: 1px solid #d6dbe2; border-bottom: 1px solid #d6dbe2; }
.bordered-product-tabs button { border-right: 1px solid #d6dbe2 !important; border-radius: 0 !important; }
@media (max-width: 900px) {
  .complete-detail-grid { grid-template-columns: 1fr; }
  .order-banner-meta { grid-template-columns: max-content 1fr; }
}
</style>
