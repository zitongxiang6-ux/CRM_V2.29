<script setup>
import { computed } from "vue";
import { Upload, X } from "@lucide/vue";
import { money } from "../data";

const props = defineProps({
  modal: { type: Object, required: true },
  order: { type: Object, required: true },
});
const emit = defineEmits(["close", "submit", "edit-address"]);

const admin = computed(() => props.modal.kind.endsWith("-admin") || ["owner", "note", "voucher", "shipment", "delete", "laser-admin", "cancel-admin", "fees-admin"].includes(props.modal.kind));
const isAddress = computed(() => props.modal.kind === "address-admin" || props.modal.kind === "address-customer");
const title = computed(() => ({
  owner: "变更业务员",
  note: "订单备注",
  "fees-admin": "设置费用",
  "fees-customer": "Set fees",
  "address-admin": "修改地址",
  "address-customer": "Address Edit",
  "cancel-admin": "取消订单",
  "cancel-customer": "Cancel Order",
  "laser-admin": "关联/修改XX镭雕",
  "laser-customer": "Laser Engraving",
  voucher: "付款凭证",
  shipment: "确认发货",
  delete: "删除数据",
  pay: "Are you sure the order has been paid for?",
  "another-customer": "Another Order",
})[props.modal.kind] || (admin.value ? "操作确认" : "Operation Confirm"));
const addressSummary = computed(() => `${props.order.country || ""} ${props.order.address || ""} ${props.order.receiver || ""} ${props.order.phone || ""}`.trim());
</script>

<template>
  <div class="order-action-modal-backdrop" @click.self="emit('close')">
    <section class="order-action-modal" :class="{ wide: ['fees-admin', 'fees-customer'].includes(modal.kind), address: isAddress }" role="dialog" aria-modal="true">
      <header><h2>{{ title }}</h2><button class="btn icon" type="button" :aria-label="admin ? '关闭' : 'Close'" @click="emit('close')"><X :size="18" /></button></header>
      <form @submit.prevent="emit('submit')">
        <div class="action-modal-body">
          <div v-if="modal.kind === 'owner'" class="compact-form"><div class="readonly-row"><span>原业务员</span><strong>{{ order.owner }}</strong></div><label><span><i>*</i>新业务员</span><select v-model="modal.data.owner" required :class="{ placeholder: !modal.data.owner }"><option value="" disabled hidden>请选择</option><option>向紫彤</option><option>渠道管理部主管</option><option>王雪</option></select></label></div>

          <div v-else-if="modal.kind === 'note'" class="compact-form"><label><span>客户原备注</span><textarea :value="order.note || '-'" readonly></textarea></label><label><span><i>*</i>继续补充</span><textarea v-model="modal.data.note" required placeholder="请输入"></textarea></label></div>

          <div v-else-if="['fees-admin', 'fees-customer'].includes(modal.kind)" class="fee-modal-form"><div class="fee-warning">{{ admin ? "请核对所有费用信息后再确认。" : "Please verify all fee information before confirmation." }}</div><div class="fee-summary"><span>{{ admin ? "订单编号" : "Order Number" }}<strong>{{ order.no }}</strong></span><span>{{ admin ? "客户名称" : "Customer Name" }}<strong>{{ order.customer }}</strong></span></div><div class="fee-grid"><label><span><i>*</i>HDL Ref No.</span><input v-model="modal.data.hdl" required /></label><label><span>P.O. No.</span><input v-model="modal.data.po" /></label><label><span>{{ admin ? "订单金额" : "Order Amount" }}</span><strong>{{ money(order.amount, order.currency) }}</strong></label><label><span>{{ admin ? "运费" : "Freight" }}</span><input v-model.number="modal.data.freight" type="number" min="0" /></label><label><span>{{ admin ? "证书费" : "Certificate Fee" }}</span><input v-model.number="modal.data.certificate" type="number" min="0" /></label><label><span>{{ admin ? "其他费" : "Other Fee" }}</span><input v-model.number="modal.data.other" type="number" min="0" /></label><label><span>{{ admin ? "手续费" : "Handling Fee" }}</span><input v-model.number="modal.data.handling" type="number" min="0" /></label><label><span><i>*</i>{{ admin ? "支付币种" : "Payment Method" }}</span><select v-model="modal.data.payment" required><option>USD</option><option>HKD</option><option>EURO</option></select></label><label><span><i>*</i>{{ admin ? "汇率" : "Exchange Rate" }}</span><input v-model.number="modal.data.rate" type="number" min="0.01" step="0.01" required /></label></div></div>

          <div v-else-if="isAddress" class="address-modal-form"><div class="address-select"><div><span><i>*</i>{{ admin ? "收货地址" : "Delivery Address" }}</span><button type="button" @click="emit('edit-address')">{{ admin ? "修改地址" : "Edit Address" }}</button></div><select><option>{{ addressSummary }}</option></select></div><fieldset><legend><i>*</i>{{ admin ? "发货方式" : "Shipping Method" }}</legend><div class="radio-row"><label><input v-model="modal.data.shipping" type="radio" value="HDL Prepaid Freight" />HDL Prepaid Freight</label><label><input v-model="modal.data.shipping" type="radio" value="Customer Pickup" />Customer Pickup</label><label><input v-model="modal.data.shipping" type="radio" value="Freight Collect" />Freight Collect</label></div></fieldset><fieldset v-if="modal.data.shipping !== 'Customer Pickup'"><legend><i>*</i>{{ admin ? "物流公司" : "Logistics Company" }}</legend><div class="radio-row"><label><input v-model="modal.data.logistics" type="radio" value="DHL" />DHL</label><label><input v-model="modal.data.logistics" type="radio" value="Fedex" />Fedex</label><label><input v-model="modal.data.logistics" type="radio" value="Aramex" />Aramex</label><label><input v-model="modal.data.logistics" type="radio" value="UPS" />UPS</label></div></fieldset><fieldset><legend><i>*</i>{{ admin ? "发货要求" : "Dispatch Requirement" }}</legend><div class="radio-row"><label><input v-model="modal.data.dispatch" type="radio" value="Ready to ship" />Ready to ship</label><label><input v-model="modal.data.dispatch" type="radio" value="Ship available stock first" />Ship available stock first</label><label><input v-model="modal.data.dispatch" type="radio" value="Ship together" />Ship together</label></div></fieldset></div>

          <div v-else-if="modal.kind === 'shipment'" class="compact-form"><div class="inline-field"><span><i>*</i>确认结果</span><div class="radio-row"><label><input v-model="modal.data.shipmentResult" type="radio" value="Confirm Shipment" />确认发货</label><label><input v-model="modal.data.shipmentResult" type="radio" value="Return to Pending Payment" />退回待付款</label></div></div><label v-if="modal.data.shipmentResult === 'Confirm Shipment'"><span>发货备注</span><input v-model="modal.data.shipmentNote" placeholder="请输入" /></label><template v-else><label><span><i>*</i>原因备注</span><input v-model="modal.data.shipmentReason" required placeholder="请输入原因备注" /></label></template></div>

          <div v-else-if="modal.kind === 'voucher'" class="voucher-form"><span><i>*</i>付款凭证</span><div class="voucher-cards"><div v-if="modal.data.voucherName" class="voucher-preview"><Upload :size="28" /><span>{{ modal.data.voucherName }}</span></div><label class="voucher-upload"><input type="file" accept=".png,.jpg,.jpeg" @change="modal.data.voucherName = $event.target.files?.[0]?.name || ''" /><Upload :size="24" /><span>上传图片</span></label></div><p>支持 .png .jpg .jpeg 格式，最多上传5张，大小限制5M</p></div>

          <div v-else-if="['cancel-admin', 'cancel-customer'].includes(modal.kind)" class="compact-form"><label><span><i>*</i>{{ admin ? "取消原因" : "Reason" }}</span><input v-model="modal.data.cancelReason" required :placeholder="admin ? '请输入取消原因' : 'Please enter the reason for cancellation'" /></label></div>

          <div v-else-if="['laser-admin', 'laser-customer'].includes(modal.kind)" class="laser-form"><p>{{ admin ? "请选择需要镭雕的面板系列。" : "Select the panel families that require laser engraving." }}</p><label><input v-model="modal.data.laserTile" type="checkbox" />Tile Series</label><label><input v-model="modal.data.laserXelent" type="checkbox" />Xelent Series</label></div>

          <div v-else-if="modal.kind === 'pay'" class="payment-form"><p>Your Balance has $24000 can be used for this order</p><div class="inline-field"><span><i>*</i>whether to use</span><div class="radio-row"><label><input v-model="modal.data.useBalance" type="radio" value="Use" />Use</label><label><input v-model="modal.data.useBalance" type="radio" value="Do not use" />Do not use</label></div></div><p>This order also needs <strong>{{ money(order.amount, order.currency) }}</strong> to pay</p><div class="voucher-form"><span><i>*</i>Proof of Payment</span><div class="voucher-cards"><label class="voucher-upload"><input type="file" accept=".png,.jpg,.jpeg" @change="modal.data.voucherName = $event.target.files?.[0]?.name || ''" /><Upload :size="24" /><span>Upload Img</span></label></div><p>Support .png .jpg .jpeg format Maximum upload 5, size limit 5M</p></div><label class="payment-remarks"><span>Payment Remarks</span><input v-model="modal.data.paymentRemarks" placeholder="Please enter payment remarks" /></label></div>

          <div v-else-if="modal.kind === 'delete'" class="confirm-copy">确定要删除该订单数据吗？</div>
          <div v-else-if="modal.kind === 'another-customer'" class="confirm-copy">Are you sure you want to add the same products again?</div>
          <div v-else class="confirm-copy">{{ admin ? "确定执行该操作吗？" : "Confirm this operation?" }}</div>
        </div>
        <footer><button class="btn" type="button" @click="emit('close')">{{ admin ? "取消" : "Cancel" }}</button><button class="btn primary" type="submit">{{ admin ? "确定" : "Confirm" }}</button></footer>
      </form>
    </section>
  </div>
</template>

<style>
.order-action-modal-backdrop { position: fixed; inset: 0; z-index: 140; display: grid; place-items: center; padding: 20px; background: rgba(24, 28, 32, .45); }
.order-action-modal { width: min(620px, calc(100vw - 40px)); max-height: calc(100vh - 40px); overflow: auto; border: 1px solid #858585; background: #fff; box-shadow: 0 16px 50px rgba(0,0,0,.2); }
.order-action-modal.wide { width: min(760px, calc(100vw - 40px)); }.order-action-modal.address { width: min(680px, calc(100vw - 40px)); }
.order-action-modal > header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--line); }.order-action-modal > header h2 { margin: 0; font-size: 18px; font-weight: 500; }
.order-action-modal form > footer { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 18px; border-top: 1px solid var(--line); }.action-modal-body { padding: 20px; }
.compact-form { display: grid; gap: 16px; }.compact-form label, .readonly-row, .inline-field { display: grid; grid-template-columns: 130px minmax(0, 1fr); align-items: center; gap: 12px; }.compact-form textarea { min-height: 64px; resize: vertical; }
.action-modal-body i { margin-right: 3px; color: #ef3340; font-style: normal; }.radio-row { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }.radio-row label { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.fee-warning { padding: 10px 12px; border-left: 2px solid #f1a000; background: #fff8de; color: #c46d00; }.fee-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 14px 0; }.fee-summary span { display: grid; gap: 4px; }.fee-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 18px; }.fee-grid label { display: grid; gap: 5px; }
.address-select > div { display: flex; align-items: center; justify-content: space-between; }.address-select button { border: 0; background: transparent; color: var(--primary); cursor: pointer; }.address-select select { width: 100%; margin-top: 8px; }.address-modal-form fieldset { margin: 20px 0 0; padding: 0; border: 0; }.address-modal-form legend { margin-bottom: 10px; font-weight: 500; }
.voucher-form { display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 12px; }.voucher-cards { display: flex; gap: 10px; }.voucher-upload, .voucher-preview { width: 112px; height: 112px; display: grid; place-items: center; align-content: center; gap: 6px; border: 1px dashed #ccd3dc; background: #fff; color: #687381; cursor: pointer; text-align: center; }.voucher-upload input { position: absolute; width: 1px; height: 1px; opacity: 0; }.voucher-form p { grid-column: 2; margin: 0; color: var(--muted); }
.payment-form { display: grid; gap: 22px; }.payment-form .voucher-form { margin-top: 10px; }.payment-remarks { display: grid; grid-template-columns: 140px minmax(0, 1fr); align-items: center; gap: 12px; }.confirm-copy { padding: 22px 4px; text-align: center; }
@media (max-width: 620px) { .fee-grid, .fee-summary { grid-template-columns: 1fr; }.compact-form label, .readonly-row, .inline-field, .voucher-form, .payment-remarks { grid-template-columns: 1fr; }.voucher-form p { grid-column: 1; } }
</style>
