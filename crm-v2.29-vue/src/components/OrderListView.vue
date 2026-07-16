<script setup>
import { computed, reactive, ref, watch } from "vue";
import { MoreHorizontal, Search } from "@lucide/vue";
import { STATUS, getOrderActions, money, statusClass, statusZh } from "../data";

const props = defineProps({
  orders: { type: Array, required: true },
  admin: { type: Boolean, default: false },
});

const emit = defineEmits(["action"]);
const currentQuick = ref("all");
const filters = reactive({ orderNo: "", customer: "", status: "", project: "", erp: "" });
const activeFilters = reactive({ orderNo: "", customer: "", status: "", project: "", erp: "" });
const popover = reactive({ show: false, orderId: null, x: 0, y: 0, actions: [] });

watch(() => props.admin, () => {
  currentQuick.value = "all";
  resetFilters();
});

const customers = computed(() => [...new Set(props.orders.map((order) => order.customer))]);
const quickTabs = computed(() => {
  const source = props.admin
    ? [
        { key: "all", label: "全部" },
        { key: STATUS.REVIEW, label: "待审核" },
        { key: STATUS.PRODUCTION, label: "生产中" },
      ]
    : [
        { key: "all", label: "All" },
        { key: STATUS.CONFIRM, label: "Pending Confirmation" },
        { key: STATUS.PAYMENT, label: "Pending Payment" },
        { key: STATUS.FAILED, label: "Review Failed" },
      ];
  return source.map((tab) => ({
    ...tab,
    count: tab.key === "all" ? props.orders.length : props.orders.filter((order) => order.status === tab.key).length,
  }));
});

const filteredOrders = computed(() => props.orders.filter((order) => {
  if (currentQuick.value !== "all" && order.status !== currentQuick.value) return false;
  if (activeFilters.orderNo && !order.no.toLowerCase().includes(activeFilters.orderNo.toLowerCase())) return false;
  if (activeFilters.customer && order.customer !== activeFilters.customer) return false;
  if (activeFilters.status && order.status !== activeFilters.status) return false;
  if (activeFilters.project && !order.project.toLowerCase().includes(activeFilters.project.toLowerCase())) return false;
  if (activeFilters.erp && !(order.erp || "").toLowerCase().includes(activeFilters.erp.toLowerCase())) return false;
  return true;
}));

function applyFilters() {
  Object.assign(activeFilters, filters);
}

function resetFilters() {
  Object.keys(filters).forEach((key) => {
    filters[key] = "";
    activeFilters[key] = "";
  });
  currentQuick.value = "all";
}

function directActions(order) {
  return getOrderActions(order.status, props.admin ? "admin" : "customer").slice(0, 2);
}

function moreActions(order) {
  return getOrderActions(order.status, props.admin ? "admin" : "customer").slice(2);
}

function triggerAction(actionId, orderId) {
  popover.show = false;
  emit("action", actionId, orderId);
}

function openMore(event, order) {
  const actions = moreActions(order);
  if (!actions.length) return;
  const rect = event.currentTarget.getBoundingClientRect();
  popover.show = true;
  popover.orderId = order.id;
  popover.actions = actions;
  popover.x = Math.min(window.innerWidth - 190, Math.max(12, rect.right - 174));
  popover.y = Math.min(window.innerHeight - 250, rect.bottom + 6);
}
</script>

<template>
  <section class="page order-list-view">
    <div class="page-tabs">
      <button class="page-tab" type="button">{{ admin ? "国内" : "Domestic" }}</button>
      <button class="page-tab active" type="button">{{ admin ? "国际" : "International" }}</button>
    </div>
    <div class="page-body">
      <div class="quick-tabs" role="tablist">
        <button
          v-for="tab in quickTabs"
          :key="tab.key"
          class="quick-tab"
          :class="{ active: currentQuick === tab.key }"
          type="button"
          role="tab"
          :aria-selected="currentQuick === tab.key"
          @click="currentQuick = tab.key"
        >
          {{ tab.label }} ({{ tab.count }})
        </button>
      </div>

      <form class="filters" @submit.prevent="applyFilters">
        <label class="field"><input v-model="filters.orderNo" :placeholder="admin ? '请输入订单编号' : 'Please enter order number'" /></label>
        <label class="field">
          <select v-model="filters.customer" :class="{ placeholder: !filters.customer }">
            <option value="" disabled hidden>{{ admin ? "请选择客户" : "Please select a client" }}</option>
            <option v-for="name in customers" :key="name" :value="name">{{ name }}</option>
          </select>
        </label>
        <label class="field">
          <select v-model="filters.status" :class="{ placeholder: !filters.status }">
            <option value="" disabled hidden>{{ admin ? "请选择订单状态" : "Please select an order status" }}</option>
            <option v-for="status in Object.values(STATUS)" :key="status" :value="status">{{ admin ? statusZh[status] : status }}</option>
          </select>
        </label>
        <label class="field"><input v-model="filters.project" :placeholder="admin ? '请输入项目名称' : 'Please enter a project name'" /></label>
        <label class="field"><input v-model="filters.erp" :placeholder="admin ? '请输入ERP编号' : 'Please enter an ERP No.'" /></label>
        <label class="field"><input :placeholder="admin ? '开始日期 - 结束日期' : 'Order Date From ~ Order Date To'" /></label>
        <label class="field">
          <select class="placeholder">
            <option value="" disabled hidden selected>{{ admin ? "请选择是否享受优惠" : "Please choose whether to enjoy the offer" }}</option>
            <option value="yes">{{ admin ? "是" : "Yes" }}</option>
            <option value="no">{{ admin ? "否" : "No" }}</option>
          </select>
        </label>
        <label class="field"><input :placeholder="admin ? '请输入镭雕文件名称/文件编号' : 'Please enter the laser engraving file name/file number'" /></label>
        <label class="field">
          <select class="placeholder">
            <option value="" disabled hidden selected>{{ admin ? "请选择方悦是否镭雕" : "Please select whether Fangyue laser engraving" }}</option>
            <option value="yes">{{ admin ? "是" : "Yes" }}</option>
            <option value="no">{{ admin ? "否" : "No" }}</option>
          </select>
        </label>
        <label class="field"><input :placeholder="admin ? '请输入HDL Ref No' : 'Please enter HDL Ref No'" /></label>
        <div class="filter-actions">
          <button class="btn" type="button" @click="resetFilters">{{ admin ? "重置" : "Reset" }}</button>
          <button class="btn primary" type="submit"><Search :size="15" />{{ admin ? "查询" : "Search" }}</button>
        </div>
      </form>

      <div class="table-wrap order-list-table-wrap">
        <table v-if="admin" class="admin-order-table">
          <thead><tr>
            <th>订单编号</th><th>客户名称</th><th>项目名称</th><th>业务类型</th><th>ERP编号</th><th>是否镭雕</th><th>业务员</th><th>下单时间</th><th>产品总计</th><th>整单折扣</th><th>订单金额</th><th>已付款金额</th><th>待付款金额</th><th>应付总金额</th><th>项目编号</th><th>支付币种</th><th>合同编号</th><th>是否含税</th><th>发货时间</th><th>订单状态</th><th class="sticky-operation">操作</th>
          </tr></thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td><button class="link" type="button" @click="triggerAction('view', order.id)">{{ order.no }}</button></td>
              <td>{{ order.customer }}</td><td>{{ order.project }}</td><td>{{ order.business }}</td><td>{{ order.erp || "-" }}</td><td>{{ order.laser === "Yes" ? "Xelent:是" : "否" }}</td><td>{{ order.owner }}</td><td>{{ order.date }}</td>
              <td class="money">{{ money(order.productTotal, order.currency) }}</td><td>{{ order.discount }}</td><td class="money">{{ money(order.amount, order.currency) }}</td><td class="money">{{ money(order.paid, order.currency) }}</td><td class="money">{{ money(Math.max(0, order.amount - order.paid), order.currency) }}</td><td class="money">{{ money(order.amount, order.currency) }}</td><td>{{ order.projectNo }}</td><td>{{ order.currency }}</td><td>{{ order.contract || "-" }}</td><td>{{ order.tax }}</td><td>-</td><td><span class="pill" :class="statusClass(order.status)">{{ statusZh[order.status] }}</span></td>
              <td class="sticky-operation"><div class="row-actions"><button v-for="action in directActions(order)" :key="action.id" class="btn xs" :class="{ orange: action.id !== 'view' }" type="button" @click="triggerAction(action.id, order.id)">{{ action.label }}</button><button v-if="moreActions(order).length" class="btn xs more-action" type="button" aria-label="更多操作" @click="openMore($event, order)"><MoreHorizontal :size="16" />更多</button></div></td>
            </tr>
          </tbody>
        </table>

        <table v-else class="customer-order-table">
          <thead><tr>
            <th>Order Number</th><th>Customer Name</th><th>Project Name</th><th>Business Type</th><th>ERP No.</th><th>Laser Engraving Required</th><th>Salesperson</th><th>Order Date</th><th>Product Subtotal</th><th>Order Discount</th><th>Order Amount</th><th>Amount Paid</th><th>Amount to be paid</th><th>Total Amount Payable</th><th>Project Number</th><th>Payment Currency</th><th>Contract Number</th><th>Whether Tax Included</th><th>Shipping Time</th><th>Order Status</th><th>Review Result</th><th>Review Notes</th><th class="sticky-operation">Operation</th>
          </tr></thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td><button class="link" type="button" @click="triggerAction('view', order.id)">{{ order.no }}</button></td><td>{{ order.customer }}</td><td>{{ order.project }}</td><td>{{ order.business }}</td><td>{{ order.erp || "-" }}</td><td>{{ order.laser }}</td><td>{{ order.owner }}</td><td>{{ order.date }}</td><td class="money">{{ money(order.productTotal, order.currency) }}</td><td>{{ order.discount }}</td><td class="money">{{ money(order.amount, order.currency) }}</td><td class="money">{{ money(order.paid, order.currency) }}</td><td class="money">{{ money(Math.max(0, order.amount - order.paid), order.currency) }}</td><td class="money">{{ money(order.amount, order.currency) }}</td><td>{{ order.projectNo }}</td><td>{{ order.currency }}</td><td>{{ order.contract || "-" }}</td><td>{{ order.tax }}</td><td>-</td><td><span class="pill" :class="statusClass(order.status)">{{ order.status }}</span></td><td>{{ order.status === STATUS.FAILED ? "Review Failed" : "-" }}</td><td>{{ order.reviewNote || "-" }}</td>
              <td class="sticky-operation"><div class="row-actions"><button v-for="action in directActions(order)" :key="action.id" class="btn xs" :class="{ orange: action.id !== 'view' }" type="button" @click="triggerAction(action.id, order.id)">{{ action.label }}</button><button v-if="moreActions(order).length" class="btn xs more-action" type="button" aria-label="More actions" @click="openMore($event, order)"><MoreHorizontal :size="16" />More</button></div></td>
            </tr>
          </tbody>
        </table>
        <div v-if="!filteredOrders.length" class="empty-detail">{{ admin ? "暂无符合条件的订单" : "No matching orders." }}</div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="popover.show" class="order-action-popover-layer" @click.self="popover.show = false">
        <div class="order-action-popover" :style="{ left: `${popover.x}px`, top: `${popover.y}px` }" role="menu">
          <button v-for="action in popover.actions" :key="action.id" type="button" role="menuitem" @click="triggerAction(action.id, popover.orderId)">{{ action.label }}</button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style>
.order-list-view .page-body { overflow: visible; }
.order-list-view .filters { position: relative; z-index: 1; }
.order-list-table-wrap { position: relative; max-height: calc(100vh - 390px); overflow: auto; }
.customer-order-table { min-width: 2780px; }
.customer-order-table .sticky-operation,
.admin-order-table .sticky-operation { position: sticky; right: 0; z-index: 3; min-width: 236px; background: #fff; box-shadow: -1px 0 0 var(--line); }
.customer-order-table thead .sticky-operation,
.admin-order-table thead .sticky-operation { z-index: 4; background: #f8f9fb; }
.order-list-view .row-actions { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.order-list-view select.placeholder { color: #9aa2ab; }
.order-list-view select option { color: #30363c; }
.order-action-popover-layer { position: fixed; inset: 0; z-index: 120; }
.order-action-popover { position: fixed; z-index: 121; display: grid; width: 174px; max-height: 240px; overflow-y: auto; padding: 6px; border: 1px solid #d9dde3; background: #fff; box-shadow: 0 8px 24px rgba(20, 24, 28, .16); }
.order-action-popover button { min-height: 34px; padding: 7px 10px; border: 0; background: #fff; color: #30363c; text-align: left; cursor: pointer; }
.order-action-popover button:hover { background: #f7effa; color: var(--primary); }
</style>
