<script setup>
import { computed, reactive, ref, watch } from "vue";
import { Plus, Search, Trash2, X } from "@lucide/vue";
import { money, statusZh } from "../data";

const props = defineProps({
  order: { type: Object, required: true },
  products: { type: Array, required: true },
  admin: { type: Boolean, default: false },
  mode: { type: String, required: true },
});

const emit = defineEmits(["back", "submit", "toast"]);
const productTab = ref("standard");
const picker = reactive({ show: false, query: "", selected: [] });
const fees = reactive({ hdl: "", po: "", freight: 0, certificate: 0, other: 0, handling: 0, payment: "USD", rate: 1 });
const discount = reactive({ type: "", description: "", modified: 0.8, revisedPrice: 0 });
const audit = reactive({ result: "", description: "" });
const standardLines = ref([]);
const customLines = ref([]);

function buildLine(product) {
  return {
    productId: product.id,
    qty: 1,
    code: product.code,
    noStandardCode: product.custom ? "435567007" : "",
    price: product.price,
    laser: product.laserApplicable === false ? "--" : "Yes",
    customization: product.custom ? "black and blue" : "",
  };
}

function resetEditor() {
  const standard = props.products.find((product) => product.id === 102) || props.products.find((product) => !product.custom);
  const custom = props.products.find((product) => product.id === 104) || props.products.find((product) => product.custom);
  standardLines.value = standard ? [buildLine(standard)] : [];
  customLines.value = custom ? [buildLine(custom)] : [];
  fees.hdl = props.order.hdl || "";
  fees.po = props.order.po || "";
  fees.payment = props.order.currency || "USD";
  discount.revisedPrice = standard?.price || 0;
  productTab.value = props.mode === "itemno" ? "custom" : "standard";
}

watch(() => [props.order.id, props.mode], resetEditor, { immediate: true });

const isChinese = computed(() => props.admin);
const showFees = computed(() => ["modify", "confirm", "audit"].includes(props.mode));
const title = computed(() => ({
  modify: isChinese.value ? "变更订单" : "Modify Order",
  confirm: isChinese.value ? "确认需求" : "Confirm Requirements",
  audit: "订单审核",
  itemno: "录入品号",
  discount: isChinese.value ? "设置折扣价格" : "Set Discount Price",
})[props.mode]);
const pickerProducts = computed(() => props.products.filter((product) => {
  if (productTab.value === "standard" && product.custom) return false;
  if (productTab.value === "custom" && !product.custom) return false;
  const query = picker.query.trim().toLowerCase();
  return !query || `${product.name} ${product.model} ${product.code}`.toLowerCase().includes(query);
}));
const total = computed(() => standardLines.value.reduce((sum, line) => sum + line.price * line.qty, 0));
const payable = computed(() => total.value + Number(fees.freight || 0) + Number(fees.certificate || 0) + Number(fees.other || 0) + Number(fees.handling || 0));

function productFor(line) {
  return props.products.find((product) => product.id === line.productId) || {};
}

function openPicker() {
  picker.query = "";
  picker.selected = [];
  picker.show = true;
}

function confirmPicker() {
  const target = productTab.value === "standard" ? standardLines : customLines;
  picker.selected.forEach((id) => {
    if (!target.value.some((line) => line.productId === id)) {
      const product = props.products.find((item) => item.id === id);
      if (product) target.value.push(buildLine(product));
    }
  });
  picker.show = false;
  emit("toast", isChinese.value ? "已添加所选商品。" : "Selected products added.");
}

function removeLine(lines, index) {
  lines.splice(index, 1);
}

function submitEditor() {
  if (props.mode === "audit" && !audit.result) {
    emit("toast", "请选择审核结果。");
    return;
  }
  emit("submit", props.mode);
}
</script>

<template>
  <form class="order-editor-view" @submit.prevent="submitEditor">
    <section class="page editor-summary-card">
      <div class="editor-summary-top"><div><span class="order-number-label">{{ isChinese ? "订单编号" : "Order Number" }}</span><strong>{{ order.no }}</strong><span class="pill purple">{{ isChinese ? (statusZh[order.status] || order.status) : order.status }}</span></div><div><span>{{ isChinese ? "客户名称" : "Customer Name" }}</span><strong>{{ order.customer }}</strong></div></div>
      <div class="editor-summary-date"><span>{{ isChinese ? "下单日期" : "Order Date" }}</span><strong>{{ order.date }}</strong></div>
    </section>

    <section v-if="showFees" class="page editor-fees-card">
      <h2><span></span>{{ isChinese ? "设置费用" : "Set fees" }}</h2>
      <div class="editor-fee-grid">
        <label><span><i>*</i>HDL Ref No.</span><input v-model="fees.hdl" required /></label>
        <label><span>P.O. No.</span><input v-model="fees.po" /></label>
        <label><span>{{ isChinese ? "运费" : "Freight" }}</span><input v-model.number="fees.freight" type="number" min="0" /></label>
        <label><span>{{ isChinese ? "证书费" : "Certificate Fee" }}</span><input v-model.number="fees.certificate" type="number" min="0" /></label>
        <label><span>{{ isChinese ? "其他费" : "Other Fee" }}</span><input v-model.number="fees.other" type="number" min="0" /></label>
        <label><span>{{ isChinese ? "手续费" : "Handling Fee" }}</span><input v-model.number="fees.handling" type="number" min="0" /></label>
        <label><span><i>*</i>{{ isChinese ? "支付币种" : "Payment Method" }}</span><select v-model="fees.payment" required><option>USD</option><option>HKD</option><option>EURO</option></select></label>
        <label><span><i>*</i>{{ isChinese ? "汇率" : "Exchange Rate" }}</span><input v-model.number="fees.rate" type="number" min="0.01" step="0.01" required /></label>
      </div>
    </section>

    <section v-if="mode === 'discount'" class="page discount-editor-fields">
      <label><span>{{ isChinese ? "优惠类型" : "Discount Type" }} <i>*</i></span><select v-model="discount.type" required :class="{ placeholder: !discount.type }"><option value="" disabled hidden>{{ isChinese ? "请选择" : "Please select" }}</option><option value="promotion">{{ isChinese ? "销售优惠" : "Sales Promotion" }}</option><option value="special">{{ isChinese ? "特殊优惠" : "Special Offer" }}</option></select></label>
      <label><span>{{ isChinese ? "优惠说明" : "Offer Description" }} <i>*</i></span><input v-model="discount.description" required /></label>
    </section>

    <section class="page editor-products-card">
      <div class="editor-products-head">
        <div class="editor-product-tabs bordered-product-tabs" role="tablist">
          <button type="button" :class="{ active: productTab === 'standard' }" @click="productTab = 'standard'">{{ isChinese ? "标准品" : "Standard Products" }}</button>
          <button type="button" :class="{ active: productTab === 'custom' }" @click="productTab = 'custom'">{{ isChinese ? "非标定制品" : "No-standard Products" }}</button>
        </div>
        <button v-if="mode !== 'itemno' && mode !== 'discount'" class="btn purple" type="button" @click="openPicker"><Plus :size="16" />{{ isChinese ? "添加其他商品" : "Add More Items" }}</button>
      </div>

      <div v-if="mode === 'itemno'" class="table-wrap editor-line-table"><table><thead><tr><th>产品名称</th><th>产品规格</th><th>产品编码</th><th>非标品编码</th><th>数量</th><th>单价</th><th>是否镭雕</th><th>非标定制需求</th><th>同步ERP状态</th></tr></thead><tbody><tr v-for="line in customLines" :key="line.productId"><td>{{ productFor(line).name }}</td><td>{{ productFor(line).spec }}</td><td>{{ productFor(line).code }}</td><td><input v-model="line.noStandardCode" class="cell-input code" placeholder="请输入" /></td><td>{{ line.qty }}</td><td>{{ money(line.price, order.currency) }}</td><td>{{ line.laser }}</td><td>{{ line.customization }}</td><td><span class="pill orange">未同步</span></td></tr></tbody></table></div>

      <div v-else-if="mode === 'discount'" class="table-wrap editor-line-table"><table><thead><tr><th>{{ isChinese ? "产品名称" : "Product Name" }}</th><th>{{ isChinese ? "产品规格" : "Product Specification" }}</th><th>{{ isChinese ? "产品型号" : "Product Model" }}</th><th>{{ isChinese ? "产品编码" : "Product Code" }}</th><th>{{ isChinese ? "是否镭雕" : "Laser Engraving" }}</th><th>{{ isChinese ? "数量" : "Quantity" }}</th><th>{{ isChinese ? "折扣" : "Discount" }}</th><th>{{ isChinese ? "修改折扣" : "Modified Discount" }}</th><th>{{ isChinese ? "单价" : "Unit Price" }}</th><th>{{ isChinese ? "修改单价" : "Revised Unit Price" }}</th><th>{{ isChinese ? "原始小计" : "Original Subtotal" }}</th><th>{{ isChinese ? "修改后小计" : "Revised Subtotal" }}</th><th>{{ isChinese ? "优惠金额" : "Discount Amount" }}</th></tr></thead><tbody><tr v-for="line in standardLines" :key="line.productId"><td>{{ productFor(line).name }}</td><td>{{ productFor(line).spec }}</td><td>{{ productFor(line).model }}</td><td>{{ line.code }}</td><td>{{ line.laser }}</td><td>{{ line.qty }}</td><td>0.8</td><td><input v-model.number="discount.modified" class="cell-input small" type="number" min="0" max="1" step="0.05" /></td><td>{{ money(line.price, order.currency) }}</td><td><span class="currency-prefix">{{ order.currency === 'HKD' ? 'HK$' : '$' }}</span><input v-model.number="discount.revisedPrice" class="cell-input price" type="number" min="0" /></td><td>{{ money(line.price * line.qty, order.currency) }}</td><td class="money">{{ money(discount.revisedPrice * line.qty, order.currency) }}</td><td class="money">{{ money(Math.max(0, line.price - discount.revisedPrice) * line.qty, order.currency) }}</td></tr></tbody></table></div>

      <div v-else-if="productTab === 'standard'" class="table-wrap editor-line-table"><table><thead><tr><th>{{ isChinese ? "产品名称" : "Product Name" }}</th><th>{{ isChinese ? "产品规格" : "Product Specification" }}</th><th>{{ isChinese ? "产品型号" : "Product Model" }}</th><th>{{ isChinese ? "产品编码" : "Product Code" }}</th><th>{{ isChinese ? "是否镭雕" : "Laser Engraving" }}</th><th>{{ isChinese ? "数量" : "Quantity" }}</th><th>{{ isChinese ? "折扣" : "Discount" }}</th><th>{{ isChinese ? "单价" : "Unit Price" }}</th><th>{{ isChinese ? "金额" : "Amount" }}</th><th>{{ isChinese ? "发货状态" : "Delivery Status" }}</th><th>{{ isChinese ? "操作" : "Operation" }}</th></tr></thead><tbody><tr v-for="(line, index) in standardLines" :key="line.productId"><td>{{ productFor(line).name }}</td><td>{{ productFor(line).spec }}</td><td>{{ productFor(line).model }}</td><td><input v-model="line.code" class="cell-input code" :aria-label="isChinese ? '产品编码' : 'Product Code'" /></td><td>{{ line.laser }}</td><td><input v-model.number="line.qty" class="cell-input quantity" type="number" min="1" /></td><td>0.8</td><td>{{ money(line.price, order.currency) }}</td><td class="money">{{ money(line.price * line.qty, order.currency) }}</td><td :class="{ 'stock-state': productFor(line).shortage }">{{ productFor(line).shortage ? (isChinese ? "缺货" : "Out of stock") : (isChinese ? "待发货" : "Pending Shipment") }}</td><td><button class="btn red small" type="button" @click="removeLine(standardLines, index)"><Trash2 :size="14" />{{ isChinese ? "删除" : "Delete" }}</button></td></tr></tbody></table></div>

      <div v-else class="table-wrap editor-line-table custom-editor-table"><table><thead><tr><th>{{ isChinese ? "产品名称" : "Product Name" }}</th><th>{{ isChinese ? "产品规格" : "Product Specification" }}</th><th>{{ isChinese ? "产品编码" : "Product Code" }}</th><th>{{ isChinese ? "数量" : "Quantity" }}</th><th>{{ isChinese ? "单价" : "Unit Price" }}</th><th>{{ isChinese ? "是否镭雕" : "Laser Engraving" }}</th><th>{{ isChinese ? "非标定制需求" : "No-standard customization" }}</th><th>{{ isChinese ? "金额" : "Amount" }}</th><th>{{ isChinese ? "发货状态" : "Delivery Status" }}</th><th>{{ isChinese ? "操作" : "Operation" }}</th></tr></thead><tbody><tr v-for="(line, index) in customLines" :key="line.productId"><td>{{ productFor(line).name }}</td><td>{{ productFor(line).spec }}</td><td>{{ productFor(line).code }}</td><td><input v-model.number="line.qty" class="cell-input quantity" type="number" min="1" /></td><td><span class="currency-prefix">{{ order.currency === 'HKD' ? 'HK$' : '$' }}</span><input v-model.number="line.price" class="cell-input price" type="number" min="0" /></td><td><select v-model="line.laser" class="cell-select"><option>Yes</option><option>No</option></select></td><td><input v-model="line.customization" class="cell-input customization" /></td><td class="pending-price">***</td><td>{{ isChinese ? "待发货" : "Pending Shipment" }}</td><td><button class="btn red small" type="button" @click="removeLine(customLines, index)"><Trash2 :size="14" />{{ isChinese ? "删除" : "Delete" }}</button></td></tr></tbody></table></div>
    </section>

    <section v-if="mode === 'audit'" class="page audit-result-card"><div class="audit-result-line"><span><i>*</i>审核结果</span><label><input v-model="audit.result" type="radio" value="approved" required />审核通过</label><label><input v-model="audit.result" type="radio" value="rejected" />审核不通过</label></div><label class="audit-description"><span>审核说明</span><input v-model="audit.description" placeholder="请输入" /></label></section>

    <footer class="page editor-footer-bar">
      <div v-if="mode === 'itemno'" class="editor-note">提交前必须填写所有产品品号；“保存并同步ERP”不会推进流程节点。</div>
      <div v-else-if="mode === 'discount'" class="discount-summary"><span>{{ isChinese ? "原订单金额：" : "Original order amount: " }}<strong class="money">{{ money(order.amount, order.currency) }}</strong></span><span>{{ isChinese ? "修改后订单金额：" : "Revised order amount: " }}<strong class="money">{{ money(discount.revisedPrice, order.currency) }}</strong>，{{ isChinese ? "优惠总金额：" : "Total discount amount: " }}<strong class="money">{{ money(Math.max(0, order.amount - discount.revisedPrice), order.currency) }}</strong></span></div>
      <div v-else class="payable-summary"><span>{{ isChinese ? "应付总金额：" : "Total Amount Payable: " }}</span><strong>{{ money(payable, order.currency) }} ({{ isChinese ? "订单金额" : "Order Total" }}: {{ money(total, order.currency) }}, {{ isChinese ? "运费" : "Freight" }}: {{ money(fees.freight, order.currency) }}, {{ isChinese ? "手续费" : "Pay Handling Fee" }}: {{ money(Number(fees.certificate) + Number(fees.other) + Number(fees.handling), order.currency) }})</strong></div>
      <div class="editor-footer-actions"><button class="btn" type="button" @click="emit('back')">{{ isChinese ? "取消" : "Cancel" }}</button><button v-if="mode !== 'audit' && mode !== 'discount'" class="btn" type="button" @click="emit('toast', isChinese ? '已保存。' : 'Saved.')">{{ mode === 'itemno' ? '保存并同步ERP' : (isChinese ? '保存' : 'Save') }}</button><button class="btn primary" type="submit">{{ isChinese ? "提交" : "Submit" }}</button></div>
    </footer>

    <Teleport to="body">
      <div v-if="picker.show" class="product-picker-backdrop" @click.self="picker.show = false">
        <section class="product-picker-modal" role="dialog" aria-modal="true">
          <header><h2>{{ isChinese ? "添加其他商品" : "Add More Items" }}</h2><button class="btn icon" type="button" aria-label="Close" @click="picker.show = false"><X :size="18" /></button></header>
          <div class="product-picker-search"><Search :size="17" /><input v-model="picker.query" :placeholder="isChinese ? '请输入产品名称、型号或编码' : 'Search product name, model or code'" /></div>
          <div class="product-picker-table table-wrap"><table><thead><tr><th></th><th>{{ isChinese ? "产品编码" : "Product Code" }}</th><th>{{ isChinese ? "产品名称" : "Product Name" }}</th><th>{{ isChinese ? "产品图片" : "Product Image" }}</th><th>{{ isChinese ? "产品规格" : "Product Specification" }}</th><th>{{ isChinese ? "产品型号" : "Product Model" }}</th><th>{{ isChinese ? "单价" : "Unit Price" }}</th></tr></thead><tbody><tr v-for="product in pickerProducts" :key="product.id"><td><input v-model="picker.selected" type="checkbox" :value="product.id" /></td><td>{{ product.code }}</td><td>{{ product.name }}</td><td><div class="picker-product-thumb" :class="[product.tone, product.shape]"></div></td><td>{{ product.spec }}</td><td>{{ product.model }}</td><td>{{ money(product.price, order.currency) }}</td></tr></tbody></table></div>
          <footer><button class="btn" type="button" @click="picker.show = false">{{ isChinese ? "取消" : "Cancel" }}</button><button class="btn primary" type="button" :disabled="!picker.selected.length" @click="confirmPicker">{{ isChinese ? "确定" : "Confirm" }}</button></footer>
        </section>
      </div>
    </Teleport>
  </form>
</template>

<style>
.order-editor-view { display: grid; gap: 14px; }
.editor-summary-card { position: relative; padding: 20px 22px; }
.editor-summary-top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 1fr); gap: 20px; }
.editor-summary-top > div { display: flex; align-items: center; gap: 10px; }
.editor-summary-top strong, .editor-summary-date strong { font-weight: 500; }
.editor-summary-date { display: flex; gap: 12px; margin-top: 16px; }
.editor-fees-card { padding: 18px 20px; }
.editor-fees-card h2 { display: flex; gap: 9px; align-items: center; margin: 0 0 16px; font-size: 15px; font-weight: 500; }
.editor-fees-card h2 span { width: 6px; height: 19px; border-radius: 3px; background: var(--primary); }
.editor-fee-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 52px; max-width: 1160px; }
.editor-fee-grid label { display: grid; grid-template-columns: 145px minmax(0, 1fr); align-items: center; gap: 12px; }
.editor-fee-grid i, .discount-editor-fields i, .audit-result-line i { margin-right: 3px; color: #ef3340; font-style: normal; }
.editor-products-card { padding: 18px; }
.editor-products-head { display: flex; align-items: end; justify-content: space-between; gap: 14px; margin-bottom: 12px; }
.bordered-product-tabs { display: flex; border: 1px solid #d5dae1; }
.bordered-product-tabs button { min-width: 170px; height: 42px; padding: 0 20px; border: 0; border-right: 1px solid #d5dae1; background: #fff; cursor: pointer; }
.bordered-product-tabs button.active { background: #cf83e6; color: #fff; }
.editor-line-table table { min-width: 1460px; }
.custom-editor-table table { min-width: 1500px; }
.cell-input, .cell-select { height: 32px; border: 1px solid #ccd3dc; background: #fff; }
.cell-input.code { width: 140px; }.cell-input.quantity { width: 78px; }.cell-input.price { width: 90px; }.cell-input.small { width: 72px; }.cell-input.customization { width: 260px; }
.currency-prefix { margin-right: 5px; }
.audit-result-card { display: flex; align-items: center; gap: 70px; padding: 18px 22px; }
.audit-result-line { display: flex; align-items: center; gap: 20px; }.audit-result-line label { display: flex; align-items: center; gap: 6px; }
.audit-description { display: grid; grid-template-columns: 90px minmax(280px, 1fr); align-items: center; gap: 12px; flex: 1; }
.discount-editor-fields { display: grid; grid-template-columns: minmax(0, 480px) minmax(0, 480px); gap: 20px; padding: 16px 20px; }
.discount-editor-fields label { display: grid; gap: 6px; }
.editor-footer-bar { display: flex; align-items: center; justify-content: flex-end; gap: 18px; min-height: 72px; padding: 14px 18px; }
.payable-summary, .discount-summary { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.payable-summary strong { color: #ef3340; font-weight: 400; }
.discount-summary { justify-content: space-between; flex: 1; }
.editor-footer-actions { display: flex; gap: 10px; }.editor-footer-actions .btn { min-width: 110px; }
.editor-note { color: #ef3340; margin-right: auto; }
.product-picker-backdrop { position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 20px; background: rgba(20, 24, 28, .45); }
.product-picker-modal { width: min(920px, calc(100vw - 40px)); max-height: min(720px, calc(100vh - 40px)); display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; border: 1px solid #888; background: #fff; box-shadow: 0 16px 50px rgba(0,0,0,.22); }
.product-picker-modal > header, .product-picker-modal > footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 18px; border-bottom: 1px solid var(--line); }
.product-picker-modal > header h2 { margin: 0; font-size: 17px; font-weight: 500; }.product-picker-modal > footer { justify-content: flex-end; border-top: 1px solid var(--line); border-bottom: 0; }
.product-picker-search { display: flex; align-items: center; gap: 8px; margin: 14px 18px; padding: 0 10px; border: 1px solid #ccd3dc; }.product-picker-search input { flex: 1; border: 0; outline: 0; }
.product-picker-table { margin: 0 18px 14px; overflow: auto; }.product-picker-table table { min-width: 820px; }
.picker-product-thumb { width: 42px; height: 42px; border: 5px solid #6f7479; background: #d0d4d8; }.picker-product-thumb.gold { background: #d9c6a4; }
@media (max-width: 760px) { .editor-fee-grid, .discount-editor-fields { grid-template-columns: 1fr; }.editor-fee-grid label { grid-template-columns: 120px minmax(0,1fr); }.editor-summary-top { grid-template-columns: 1fr; }.editor-footer-bar, .payable-summary { align-items: flex-start; flex-direction: column; }.payable-summary { margin-left: 0; }.editor-footer-actions { width: 100%; justify-content: flex-end; } }
</style>
