<script setup>
import { computed, reactive, ref, watch } from "vue";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  PackagePlus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "@lucide/vue";

const props = defineProps({
  route: { type: String, required: true },
  products: { type: Array, required: true },
  cart: { type: Array, required: true },
});

const emit = defineEmits(["navigate", "update:cart", "order-created", "toast"]);

const categories = [
  "ALL",
  "Intelligent Interaction",
  "Security System",
  "Lighting Control",
  "Smart Household Appliances",
  "Environmental Control System",
  "Shading System",
  "Gateway",
  "Auxiliary Equipment",
];

const activeCategory = ref("ALL");
const query = ref("");
const currentProductId = ref(103);
const selectedVariant = ref("Space Gray-Metal");
const detailQuantity = ref(1);
const detailRemark = ref("");
const laserEngraving = ref("No");
const customization = ref("");
const selectedAccessories = ref(["base", "label"]);
const addedToast = ref(false);
const checkoutIds = ref([]);
const checkoutTab = ref("standard");

const checkout = reactive({
  channel: "",
  project: "",
  projectName: "",
  business: "",
  delivery: "Camellia · Georgia / Samegrelo-Zemo Svaneti 120 · 12345678",
  shipping: "HDL Prepaid Freight",
  logistics: "DHL",
  freightAccount: "",
  dispatch: "Ready to ship",
  remark: "",
});

const addressEditor = reactive({
  show: false,
  receiver: "Camellia",
  phone: "12345678",
  country: "Georgia / Samegrelo-Zemo Svaneti",
  address: "120",
});

const standardProducts = computed(() => props.products.filter((product) => !product.custom));
const filteredProducts = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  return standardProducts.value.filter((product) => {
    const categoryMatch = activeCategory.value === "ALL" || product.category === activeCategory.value;
    const keywordMatch = !keyword || `${product.name} ${product.code} ${product.model}`.toLowerCase().includes(keyword);
    return categoryMatch && keywordMatch;
  });
});
const currentProduct = computed(() => props.products.find((product) => product.id === currentProductId.value) || standardProducts.value[0]);
const detailTone = computed(() => selectedVariant.value.startsWith("Champagne") ? "gold" : selectedVariant.value.startsWith("Ash") ? "dark" : "silver");
const standardCart = computed(() => props.cart.filter((line) => !getProduct(line.productId).custom));
const customCart = computed(() => props.cart.filter((line) => getProduct(line.productId).custom));
const selectedCart = computed(() => props.cart.filter((line) => line.selected));
const standardSelected = computed(() => selectedCart.value.filter((line) => !getProduct(line.productId).custom).length);
const customSelected = computed(() => selectedCart.value.filter((line) => getProduct(line.productId).custom).length);
const standardAllSelected = computed(() => standardCart.value.length > 0 && standardCart.value.every((line) => line.selected));
const customAllSelected = computed(() => customCart.value.length > 0 && customCart.value.every((line) => line.selected));
const cartTotal = computed(() => selectedCart.value.reduce((sum, line) => {
  const product = getProduct(line.productId);
  return sum + (product.custom ? 0 : product.price * line.qty);
}, 0));
const checkoutLines = computed(() => props.cart.filter((line) => checkoutIds.value.includes(line.productId)));
const checkoutStandard = computed(() => checkoutLines.value.filter((line) => !getProduct(line.productId).custom));
const checkoutCustom = computed(() => checkoutLines.value.filter((line) => getProduct(line.productId).custom));
const checkoutTotal = computed(() => checkoutStandard.value.reduce((sum, line) => sum + getProduct(line.productId).price * line.qty, 0));

function getProduct(id) {
  return props.products.find((product) => product.id === Number(id));
}

function standardLaserValue(line) {
  return getProduct(line.productId)?.laserApplicable ? (line.laser || "Yes") : "--";
}

function openProduct(productId) {
  currentProductId.value = productId;
  const product = getProduct(productId);
  selectedVariant.value = product.spec;
  detailQuantity.value = 1;
  detailRemark.value = "";
  laserEngraving.value = "No";
  customization.value = "";
  emit("navigate", "product-detail");
}

function updateCart(nextCart) {
  emit("update:cart", nextCart);
}

function addDetailToCart() {
  if (laserEngraving.value === "Yes" && !customization.value.trim()) {
    emit("toast", "Please enter non-standard customization requirements.");
    return;
  }
  const next = props.cart.map((line) => ({ ...line }));
  const existing = next.find((line) => line.productId === currentProduct.value.id);
  if (existing) existing.qty += Number(detailQuantity.value || 1);
  else next.push({ productId: currentProduct.value.id, qty: Number(detailQuantity.value || 1), selected: false, remark: detailRemark.value });

  if (laserEngraving.value === "Yes") {
    const customProduct = props.products.find((product) => product.custom);
    const customLine = next.find((line) => line.productId === customProduct.id);
    if (customLine) {
      customLine.qty += Number(detailQuantity.value || 1);
      customLine.customization = customization.value;
      customLine.laser = "Yes";
    } else {
      next.push({ productId: customProduct.id, qty: Number(detailQuantity.value || 1), selected: false, remark: "", laser: "Yes", customization: customization.value });
    }
  }
  updateCart(next);
  addedToast.value = true;
}

function setLineSelected(productId, checked) {
  updateCart(props.cart.map((line) => line.productId === productId ? { ...line, selected: checked } : { ...line }));
}

function setLineQuantity(productId, value) {
  updateCart(props.cart.map((line) => line.productId === productId ? { ...line, qty: Math.max(1, Number(value || 1)) } : { ...line }));
}

function setLineValue(productId, key, value) {
  updateCart(props.cart.map((line) => line.productId === productId ? { ...line, [key]: value } : { ...line }));
}

function toggleStandard(checked) {
  const standardIds = new Set(standardCart.value.map((line) => line.productId));
  updateCart(props.cart.map((line) => standardIds.has(line.productId) ? { ...line, selected: checked } : { ...line }));
}

function toggleCustom(checked) {
  const customIds = new Set(customCart.value.map((line) => line.productId));
  updateCart(props.cart.map((line) => customIds.has(line.productId) ? { ...line, selected: checked } : { ...line }));
}
function toggleAll(checked) {
  updateCart(props.cart.map((line) => ({ ...line, selected: checked })));
}

function removeLine(productId) {
  updateCart(props.cart.filter((line) => line.productId !== productId).map((line) => ({ ...line })));
  emit("toast", "Product removed.");
}

function removeSelected() {
  updateCart(props.cart.filter((line) => !line.selected).map((line) => ({ ...line })));
  emit("toast", "Selected products deleted.");
}

function prepareCheckout(lines) {
  checkoutIds.value = lines.map((line) => line.productId);
  checkoutTab.value = lines.some((line) => !getProduct(line.productId).custom) ? "standard" : "custom";
}

function beginCheckout() {
  const lines = selectedCart.value.map((line) => ({ ...line }));
  if (!lines.length) {
    emit("toast", "Please select at least one product.");
    return;
  }
  prepareCheckout(lines);
  emit("navigate", "checkout");
}

watch(() => props.route, (nextRoute) => {
  if (nextRoute === "cart" && !customCart.value.length) {
    updateCart([
      ...props.cart.map((line) => ({ ...line })),
      { productId: 104, qty: 1, selected: false, remark: "", laser: "Yes", customization: "black and blue" },
      { productId: 116, qty: 1, selected: false, remark: "", laser: "Yes", customization: "gold finish with custom icons" },
      { productId: 117, qty: 2, selected: false, remark: "", laser: "No", customization: "custom button layout" },
    ]);
  }
  if (nextRoute === "checkout" && !checkoutIds.value.length && selectedCart.value.length) {
    prepareCheckout(selectedCart.value);
  }
}, { immediate: true });

function saveAddress() {
  checkout.delivery = `${addressEditor.receiver} · ${addressEditor.country} ${addressEditor.address} · ${addressEditor.phone}`;
  addressEditor.show = false;
  emit("toast", "Delivery address saved.");
}

function submitCheckout() {
  const selectedLines = checkoutLines.value.map((line) => ({ ...line }));
  emit("order-created", {
    productTotal: checkoutTotal.value,
    business: checkout.business,
    project: checkout.projectName || checkout.project || "Preferred Shop Order",
    laser: checkoutStandard.value.some((line) => standardLaserValue(line) === "Yes") || checkoutCustom.value.some((line) => line.laser === "Yes") ? "Yes" : "No",
    receiver: addressEditor.receiver,
    phone: addressEditor.phone,
    country: addressEditor.country,
    address: addressEditor.address,
    shipping: checkout.shipping,
    logistics: checkout.shipping === "Customer Pickup" ? "" : checkout.logistics,
    dispatch: checkout.dispatch,
    note: checkout.remark,
    hasCustom: checkoutCustom.value.length > 0,
    lines: selectedLines,
  });
  updateCart(props.cart.filter((line) => !checkoutIds.value.includes(line.productId)).map((line) => ({ ...line })));
  checkoutIds.value = [];
}
</script>

<template>
  <section v-if="route === 'shop'" class="commerce-page shop-library">
    <div class="commerce-tabs"><button type="button">Domestic</button><button class="active" type="button">International</button></div>
    <div class="library-toolbar">
      <span>Total {{ filteredProducts.length }} items</span>
      <div class="library-search"><input v-model="query" placeholder="Please input the product name/ERP Number/..." /><button type="button"><Search :size="15" />query</button></div>
      <button class="cart-entry" type="button" @click="emit('navigate', 'cart')"><ShoppingCart :size="15" />Shopping Cart ({{ cart.length }})</button>
    </div>
    <div class="category-strip"><strong>Category</strong><button v-for="category in categories" :key="category" type="button" :class="{ active: activeCategory === category }" @click="activeCategory = category">{{ category }}</button><button type="button">unfold <ChevronDown :size="14" /></button></div>
    <div class="campaign-grid"><article class="campaign lilac"><span>Panel order page</span><div class="campaign-device"><i></i><i></i><i></i></div></article><article class="campaign black"><span>Lighting order page</span><div class="light-strip"></div></article><article class="campaign pale"><span>Ecological New</span><div class="ecosystem"><i></i><i></i><i></i></div></article><article class="campaign charcoal"><span>Special offer area</span><div class="campaign-device"><i></i><i></i><i></i></div></article></div>
    <div class="catalog-grid">
      <article v-for="product in filteredProducts" :key="product.id" class="catalog-card" @click="openProduct(product.id)">
        <div class="catalog-visual"><div class="device-visual" :class="[product.tone, product.shape]"><i v-for="index in 8" :key="index"></i></div></div>
        <h2>{{ product.name }}</h2><p><strong>{{ product.type }}</strong> | {{ product.model }}</p><p>$-- <span>Uniform price for channels</span></p><p class="catalog-price">From ${{ product.price }} <span>Product Price</span></p>
      </article>
    </div>
  </section>

  <section v-else-if="route === 'product-detail'" class="commerce-page product-detail-page">
    <div class="detail-toolbar"><button class="outline-command" type="button" @click="emit('navigate', 'shop')">Back</button><button class="solid-command" type="button">Product Material <ChevronDown :size="14" /></button><button class="solid-command" type="button" @click="emit('navigate', 'cart')"><ShoppingCart :size="14" />Shopping Cart ({{ cart.length }})</button></div>
    <div class="selection-layout">
      <aside class="product-gallery"><div class="gallery-main"><button type="button" aria-label="Previous"><ChevronLeft :size="18" /></button><div class="device-visual gallery-device" :class="[detailTone, currentProduct.shape]"><i v-for="index in 8" :key="index"></i></div><button type="button" aria-label="Next"><ChevronRight :size="18" /></button></div><div class="gallery-tabs"><button class="active" type="button">{{ selectedVariant }} (1)</button><button type="button">Champagne Gold-Metal (1)</button></div><div class="gallery-thumb"><div class="device-visual" :class="[detailTone, currentProduct.shape]"><i v-for="index in 8" :key="index"></i></div></div><button class="download-command" type="button"><Download :size="14" />Download All Images (10)</button></aside>
      <div class="product-purchase"><h1>{{ currentProduct.name }}</h1><dl class="product-facts"><dt>Model Number</dt><dd>{{ currentProduct.model }}</dd><dt>Product Protocol</dt><dd>{{ currentProduct.type }}</dd><dt>Product Type</dt><dd>HDL Product</dd><dt>Product Category</dt><dd>{{ currentProduct.category }}</dd><dt>Units of measurement</dt><dd>{{ currentProduct.unit }}</dd><dt>Product Specifications</dt><dd class="variant-list"><button v-for="variant in ['Space Gray-Metal','Champagne Gold-Metal','Space Gray-Plastic','Champagne Gold-Plastic','Ash Gray-Plastic','Ivory White-Plastic']" :key="variant" type="button" :class="{ active: selectedVariant === variant }" @click="selectedVariant = variant">{{ variant }}</button></dd><dt>Product Number</dt><dd>{{ currentProduct.code }}</dd><dt>Product Price</dt><dd class="detail-price">${{ currentProduct.price }}</dd><dt>Uniform price for channels</dt><dd>$--</dd><dt>Remark</dt><dd><input v-model="detailRemark" placeholder="Please enter the remark" /></dd></dl><div class="accessory-note"><Info :size="16" />Accessories (When purchasing additional products, the specified accessories must be checked and cannot be canceled, and the rest can be freely selected)</div><h2 class="accessory-title">Accessories</h2><div class="accessory-grid"><label class="accessory-card"><input v-model="selectedAccessories" type="checkbox" value="base" disabled /><span class="accessory-photo accessory-frame"><img src="/accessory-products-reference.png" alt="Tile Series 1 Gang panel frame" /></span><strong title="Tile Series 1 Gang Panel Frame">Tile Series 1 Gang Panel Frame</strong><span>MPFT-1GBF-NP.18</span><span>Metal</span><span>2980003638</span><b>$2</b><ChevronRight :size="16" /></label><label class="accessory-card"><input v-model="selectedAccessories" type="checkbox" value="label" disabled /><span class="accessory-photo accessory-interface"><img src="/accessory-products-reference.png" alt="Panel Power Interface" /></span><strong title="Panel Power Interface">Panel Power Interface</strong><span>MPFPIT-1P-BP.18</span><span>Gray Plastic</span><span>308050508</span><b>$38</b><ChevronRight :size="16" /></label></div></div>
    </div>
    <div class="purchase-dock"><input v-model.number="detailQuantity" class="detail-quantity" type="number" min="1" max="99" /><button class="solid-command add-cart-command" type="button" @click="addDetailToCart">Add to Cart</button><span class="stock-warning" v-if="currentProduct.shortage">Inventory Shortage</span><strong class="customization-label">Non-standard customization</strong><input v-model="customization" class="customization-input" :required="laserEngraving === 'Yes'" placeholder="Please enter" /><label class="engraving-control">Laser Engraving <select v-model="laserEngraving"><option>No</option><option>Yes</option></select></label></div>
    <aside v-if="addedToast" class="added-toast"><button type="button" aria-label="Close" @click="addedToast = false"><X :size="14" /></button><strong>Added to Shopping Cart</strong><span>{{ detailQuantity }} item added. You can keep shopping on this page.</span><small>Auto closes in 8s</small><div><button type="button" @click="addedToast = false; emit('navigate', 'shop')">Back to Mall List</button><button type="button" @click="addedToast = false; emit('navigate', 'cart')">Checkout Cart</button></div></aside>
  </section>

  <section v-else-if="route === 'cart'" class="commerce-page cart-page">
    <div class="commerce-tabs"><button type="button">Domestic</button><button class="active" type="button">International</button></div>
    <div class="cart-section-head"><h1>Standard Products</h1><button class="continue-command" type="button" @click="emit('navigate', 'shop')">Continue Shopping &gt;&gt;&gt;</button></div>
    <div class="inline-actions cart-batch"><button class="btn" type="button" :disabled="!selectedCart.length" @click="removeSelected">Mass Delete</button></div>
    <div class="table-wrap commerce-table"><table><thead><tr><th><input type="checkbox" :checked="standardAllSelected" @change="toggleStandard($event.target.checked)" /></th><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>Market Price</th><th>Quantity</th><th>Laser Engraving</th><th>Total</th><th>Operation</th></tr></thead><tbody><tr v-for="line in standardCart" :key="line.productId"><td><input type="checkbox" :checked="line.selected" @change="setLineSelected(line.productId, $event.target.checked)" /></td><td>{{ getProduct(line.productId).name }}</td><td>{{ getProduct(line.productId).spec }}</td><td>{{ getProduct(line.productId).code }}</td><td>${{ getProduct(line.productId).price }}</td><td><input class="quantity-control" type="number" min="1" :value="line.qty" @input="setLineQuantity(line.productId, $event.target.value)" /><span v-if="getProduct(line.productId).shortage" class="stock-warning">Inventory Shortage</span></td><td><select v-if="getProduct(line.productId).laserApplicable" :value="line.laser || 'Yes'" @change="setLineValue(line.productId, 'laser', $event.target.value)"><option>Yes</option><option>No</option></select><span v-else>--</span></td><td>${{ getProduct(line.productId).price * line.qty }}</td><td><div class="row-actions"><button class="view-command" type="button" @click="openProduct(line.productId)">View</button><button class="delete-command" type="button" @click="removeLine(line.productId)"><Trash2 :size="13" />Delete</button></div></td></tr></tbody></table></div>
    <section class="nonstandard-cart"><div class="nonstandard-head"><h2>Non-standard Products</h2><p>Note: Prices for non-standard customized products are to be determined and will be finalized after HDL’s review.</p><ChevronDown :size="17" /></div><div class="table-wrap commerce-table"><table><thead><tr><th><input type="checkbox" :checked="customAllSelected" @change="toggleCustom($event.target.checked)" /></th><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>Quantity</th><th>Laser Engraving</th><th>Non-standard customization</th><th>Operation</th></tr></thead><tbody><tr v-for="line in customCart" :key="line.productId"><td><input type="checkbox" :checked="line.selected" @change="setLineSelected(line.productId, $event.target.checked)" /></td><td>{{ getProduct(line.productId).name }}</td><td>{{ getProduct(line.productId).spec }}</td><td>{{ getProduct(line.productId).code }}</td><td><input class="quantity-control" type="number" min="1" :value="line.qty" @input="setLineQuantity(line.productId, $event.target.value)" /></td><td><select :value="line.laser || 'Yes'" @change="setLineValue(line.productId, 'laser', $event.target.value)"><option>Yes</option><option>No</option></select></td><td><input class="custom-cart-requirement" :value="line.customization" @input="setLineValue(line.productId, 'customization', $event.target.value)" /></td><td><div class="row-actions"><button class="view-command" type="button" @click="openProduct(line.productId)">View</button><button class="delete-command" type="button" @click="removeLine(line.productId)"><Trash2 :size="13" />Delete</button></div></td></tr></tbody></table></div></section>
    <div class="cart-summary"><strong>Selected</strong><span>Standard Products: <b>{{ standardSelected }}</b></span><span>Non-standard Products: <b>{{ customSelected }}</b></span><span>Total: <b>${{ cartTotal }}</b></span><span class="summary-note">(Non-standard product prices are not included)</span><button type="button" :disabled="!selectedCart.length" @click="beginCheckout">Submit</button></div>
  </section>

  <form v-else-if="route === 'checkout'" class="checkout-flow" @submit.prevent="submitCheckout">
    <section class="checkout-panel customer-panel"><h2>Customer Information <span>Note: If the project has not been reported, you can directly enter the project name</span></h2><div class="compact-form"><label><span class="field-label"><i>*</i>Channel Name</span><select v-model="checkout.channel" required><option value="" disabled hidden data-placeholder>Please select a channel</option><option>International Channel</option><option>Dealer Channel</option></select></label><label><span class="field-label">Project</span><select v-model="checkout.project"><option value="" disabled hidden data-placeholder>Please select</option><option>Smart Home Project</option><option>Hotel Lighting Project</option></select></label><label><span class="field-label">Project Name</span><input v-model="checkout.projectName" placeholder="Please enter a project name" /></label><label><span class="field-label"><i>*</i>Business Type</span><select v-model="checkout.business" required><option value="" disabled hidden data-placeholder>Please select</option><option>Hotel</option><option>Residence</option><option>Lighting</option><option>Whole House Customization</option></select></label></div></section>
    <section class="checkout-panel delivery-panel"><div class="checkout-panel-head"><h2>Delivery Address</h2><div><button type="button" @click="addressEditor.show = true">Add</button><button type="button" @click="addressEditor.show = true">Change Address</button></div></div><div class="delivery-form"><label><span class="field-label"><i>*</i>Delivery Address</span><select v-model="checkout.delivery" required><option>{{ checkout.delivery }}</option><option>Jason · Hong Kong / Kowloon · +852 65781024</option></select></label><fieldset><legend><span>*</span> Shipping Method</legend><label><input v-model="checkout.shipping" type="radio" value="HDL Prepaid Freight" />HDL Prepaid Freight</label><label><input v-model="checkout.shipping" type="radio" value="Customer Pickup" />Customer Pickup</label><label><input v-model="checkout.shipping" type="radio" value="Freight Collect" />Freight Collect</label></fieldset><fieldset v-if="checkout.shipping !== 'Customer Pickup'"><legend><span>*</span> Logistics Company</legend><label v-for="company in ['DHL','Fedex','Aramex','UPS']" :key="company"><input v-model="checkout.logistics" type="radio" :value="company" />{{ company }}</label></fieldset><label v-if="checkout.shipping === 'Freight Collect'"><span class="field-label"><i>*</i>Freight collect account</span><input v-model="checkout.freightAccount" required placeholder="Please input" /></label><fieldset><legend><span>*</span> Dispatch Requirement</legend><label><input v-model="checkout.dispatch" type="radio" value="Ready to ship" />Ready to ship</label><label><input v-model="checkout.dispatch" type="radio" value="Ship available stock first" />Ship available stock first</label><label><input v-model="checkout.dispatch" type="radio" value="Ship together" />Ship together</label></fieldset><label><span class="field-label">Order Remarks</span><input v-model="checkout.remark" placeholder="Please input order remarks" /></label></div></section>
    <section class="checkout-panel product-checkout"><h2>Product Information</h2><div class="checkout-product-tabs"><button type="button" :class="{ active: checkoutTab === 'standard' }" @click="checkoutTab = 'standard'">Standard Products</button><button type="button" :class="{ active: checkoutTab === 'custom' }" @click="checkoutTab = 'custom'">No-standard Products</button><span>Note: Prices for non-standard customized products are to be determined and will be finalized after HDL’s review.</span></div><div v-if="checkoutTab === 'standard'" class="table-wrap commerce-table"><table><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>Laser Engraving</th><th>Quantity</th><th>Discount</th><th>Unit Price</th><th>Amount</th></tr></thead><tbody><tr v-for="line in checkoutStandard" :key="line.productId"><td>{{ getProduct(line.productId).name }}</td><td>{{ getProduct(line.productId).spec }}</td><td>{{ getProduct(line.productId).code }}</td><td>{{ standardLaserValue(line) }}</td><td>{{ line.qty }}</td><td>0.8</td><td>${{ getProduct(line.productId).price }}</td><td>${{ getProduct(line.productId).price * line.qty }}</td></tr></tbody></table></div><div v-else class="table-wrap commerce-table"><table><thead><tr><th>Product Name</th><th>Product Specification</th><th>Product Code</th><th>Quantity</th><th>Laser Engraving</th><th>Non-standard customization</th><th>Amount</th></tr></thead><tbody><tr v-for="line in checkoutCustom" :key="line.productId"><td>{{ getProduct(line.productId).name }}</td><td>{{ getProduct(line.productId).spec }}</td><td>{{ getProduct(line.productId).code }}</td><td>{{ line.qty }}</td><td>{{ line.laser }}</td><td>{{ line.customization }}</td><td class="pending-price">***</td></tr></tbody></table></div><div class="checkout-summary"><span>Standard Products: <b>{{ checkoutStandard.length }}</b></span><span>Non-standard Products: <b>{{ checkoutCustom.length }}</b></span><span>Total: <b>${{ checkoutTotal }}</b></span><span>(Non-standard product prices are not included)</span><button type="button" @click="emit('navigate', 'cart')">Back</button><button type="submit">Submit</button></div></section>
  </form>

  <div v-if="addressEditor.show" class="commerce-modal-backdrop" @click.self="addressEditor.show = false"><form class="commerce-modal" @submit.prevent="saveAddress"><div class="commerce-modal-head"><h2>Delivery Address</h2><button type="button" aria-label="Close" @click="addressEditor.show = false"><X :size="17" /></button></div><label><span class="commerce-field-label"><i>*</i>Receiver</span><input v-model="addressEditor.receiver" required /></label><label><span class="commerce-field-label"><i>*</i>Contact Number</span><input v-model="addressEditor.phone" required /></label><label><span class="commerce-field-label"><i>*</i>Country/City</span><input v-model="addressEditor.country" required /></label><label><span class="commerce-field-label"><i>*</i>Address</span><input v-model="addressEditor.address" required /></label><div><button type="button" @click="addressEditor.show = false">Cancel</button><button type="submit"><Check :size="14" />Save</button></div></form></div>
</template>

<style scoped>
.commerce-page,.checkout-flow{min-width:0;color:#24272d}.commerce-page{background:#fff;border:1px solid #dfe3e8}.commerce-tabs{height:50px;padding:0 18px;display:flex;align-items:flex-end;gap:22px;border-bottom:1px solid #e3e6eb}.commerce-tabs button{height:50px;padding:0 12px;border:0;border-bottom:2px solid transparent;background:transparent;color:#59616b}.commerce-tabs button.active{border-bottom-color:#9300c4;color:#9300c4}.library-toolbar{min-height:58px;padding:12px 16px;display:grid;grid-template-columns:1fr minmax(330px,520px) 1fr;align-items:center;gap:18px}.library-toolbar>span{color:#5f6872}.library-search{display:flex}.library-search input{width:100%;height:34px;border:1px solid #d4d9df;padding:0 12px}.library-search button,.cart-entry,.solid-command,.continue-command{border:1px solid #9300c4;background:#9300c4;color:#fff}.library-search button{width:72px;display:inline-flex;align-items:center;justify-content:center;gap:5px}.cart-entry{justify-self:end;height:34px;padding:0 14px;display:inline-flex;align-items:center;gap:6px}.category-strip{min-height:48px;padding:0 16px;display:flex;align-items:center;gap:5px;border-top:1px solid #e5e8ec;border-bottom:1px solid #d9dde2;overflow-x:auto}.category-strip strong{margin-right:12px}.category-strip button{min-height:30px;padding:0 11px;border:1px solid transparent;background:transparent;color:#56606a;white-space:nowrap}.category-strip button.active{border-color:#a500d4;color:#a500d4}.category-strip button:last-child{display:inline-flex;align-items:center;color:#9300c4}.campaign-grid{padding:12px 10px 8px;display:grid;grid-template-columns:repeat(4,minmax(190px,1fr));gap:8px;background:#f1f3f6}.campaign{height:116px;position:relative;overflow:hidden;display:grid;place-items:center;color:#fff}.campaign span{position:absolute;top:12px;z-index:2;font-size:16px;font-weight:500}.campaign.lilac{background:#d594ec}.campaign.black{background:#090909}.campaign.pale{background:#d8b18f}.campaign.charcoal{background:#252c32}.campaign-device{position:absolute;bottom:-14px;display:flex;gap:5px}.campaign-device i{width:46px;height:70px;border:1px solid rgba(255,255,255,.5);background:#363d44;transform:rotate(-9deg)}.campaign-device i:nth-child(2){background:#d8dde1;transform:translateY(-8px)}.campaign-device i:nth-child(3){background:#1d2227;transform:rotate(9deg)}.light-strip{width:150px;height:18px;position:absolute;bottom:24px;border:5px solid #efbb33;border-radius:50%;transform:rotate(17deg)}.ecosystem{position:absolute;bottom:17px;display:flex;align-items:end;gap:10px}.ecosystem i{width:30px;height:54px;background:#eee;border:1px solid rgba(0,0,0,.18)}.ecosystem i:nth-child(2){height:72px;background:#333}.ecosystem i:nth-child(3){width:54px;height:36px}.catalog-grid{padding:8px;display:grid;grid-template-columns:repeat(7,minmax(135px,1fr));gap:8px;background:#eef1f4}.catalog-card{min-width:0;padding:7px;background:#fff;cursor:pointer;transition:box-shadow .16s ease,transform .16s ease}.catalog-card:hover{box-shadow:0 5px 14px rgba(31,37,45,.16);transform:translateY(-1px)}.catalog-visual{height:120px;display:grid;place-items:center;background:#f2f4f5;border:1px solid #e2e5e8}.catalog-card h2{margin:8px 0 3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:500}.catalog-card p{margin:3px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}.catalog-card p span{color:#8a929b}.catalog-price{color:#eb3030}.device-visual{width:88px;height:88px;position:relative;display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);border:5px solid #777d83;background:#cdd1d4;box-shadow:inset 0 0 0 1px #555}.device-visual i{border-right:1px solid #686d71;border-bottom:1px solid #686d71}.device-visual.gold{background:#d9c7a9}.device-visual.dark{border-color:#252a30;background:#3c4248}.device-visual.panel-one{display:block}.device-visual.panel-one i{display:none}.device-visual.panel-two{grid-template-columns:repeat(2,1fr);grid-template-rows:1fr}.device-visual.panel-three{grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr)}.device-visual.panel-three i:nth-child(n+4),.device-visual.panel-four i:nth-child(n+5),.device-visual.panel-two i:nth-child(n+3){display:none}.device-visual.panel-eight{grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,1fr)}.device-visual.thermostat::before{content:"26.0°";position:absolute;inset:0 0 48%;display:grid;place-items:center;background:#111;color:#ddd;font-size:15px}.device-visual.doorbell::before{content:"◉";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:28px}.device-visual.socket::before{content:"•••";position:absolute;inset:17px;display:grid;place-items:center;border:5px solid #9ca1a4;border-radius:50%;background:#eee;color:#62676c}.device-visual.waterproof::before{content:"";position:absolute;inset:16px 12px;border:2px solid #8c9297;background:#ddd}.device-visual.usb::before{content:"▬  ▬";position:absolute;inset:0;display:grid;place-items:center;color:#333;font-size:19px}.device-visual.ethernet-one::before{content:"▣";position:absolute;inset:0;display:grid;place-items:center;color:#555;font-size:23px}.device-visual.ethernet-two::before{content:"▣  ▣";position:absolute;inset:0;display:grid;place-items:center;color:#555;font-size:20px}.device-visual.emergency::before{content:"";position:absolute;left:31px;top:23px;width:25px;height:25px;border-radius:50%;background:#9b3939;box-shadow:0 0 0 4px #c77676}.device-visual.hdmi::before{content:"▬\A ▬";white-space:pre;position:absolute;inset:0;display:grid;place-items:center;color:#333;font-size:18px}.detail-toolbar{min-height:52px;padding:8px 18px;display:flex;justify-content:flex-end;align-items:center;gap:8px}.detail-toolbar button{height:34px;padding:0 13px;display:inline-flex;align-items:center;gap:5px}.outline-command{border:1px solid #9b00cb;background:#fff;color:#9200c0}.selection-layout{display:grid;grid-template-columns:280px minmax(0,1fr);gap:18px;padding:0 22px 66px}.product-gallery{min-width:0}.gallery-main{height:250px;display:grid;grid-template-columns:34px 1fr 34px;align-items:center;justify-items:center}.gallery-main>button{width:30px;height:30px;border:1px solid #d8dde1;border-radius:50%;display:grid;place-items:center;background:#fff;color:#8b9299}.gallery-device{width:165px;height:165px;border-width:8px}.gallery-tabs{display:flex;overflow:hidden;border-bottom:1px solid #ddd}.gallery-tabs button{min-width:150px;height:34px;border:0;border-bottom:2px solid transparent;background:#fff;font-size:11px}.gallery-tabs button.active{border-bottom-color:#9200c0;color:#9200c0}.gallery-thumb{width:52px;height:52px;margin:10px 0;display:grid;place-items:center;border:1px solid #9700c7}.gallery-thumb .device-visual{width:43px;height:43px;border-width:3px}.download-command{width:100%;height:34px;border:1px solid #a100d0;border-radius:17px;background:#fff;color:#9500c5;display:flex;align-items:center;justify-content:center;gap:5px}.product-purchase{padding:0 18px;background:#fbf8fd}.product-purchase h1{margin:0;padding:0 0 15px;font-size:17px;font-weight:500}.product-facts{margin:0;display:grid;grid-template-columns:145px minmax(0,1fr);align-items:center;gap:0}.product-facts dt,.product-facts dd{min-height:36px;margin:0;display:flex;align-items:center}.product-facts dt{color:#656d77}.product-facts dd input{height:32px;width:min(310px,100%);border:1px solid #d4d9df;padding:0 10px}.variant-list{gap:8px;flex-wrap:wrap}.variant-list button{min-height:30px;padding:0 12px;border:1px solid #c9ced4;background:#fff;color:#5e6670;font-size:11px}.variant-list button.active{border-color:#9800c9;background:#9800c9;color:#fff}.detail-price{color:#ed2e2e;font-size:16px}.accessory-note{min-height:36px;padding:8px 12px;display:flex;align-items:center;gap:7px;background:#fff2e7;color:#f07800;font-size:11px}.accessory-title{margin:14px 0 8px;font-size:13px}.accessory-grid{display:grid;grid-template-columns:repeat(2,168px);gap:16px}.accessory-card{width:168px;min-height:270px;position:relative;padding:14px 12px 12px;display:flex;flex-direction:column;align-items:stretch;border:1px solid #a300d2;background:#fff;cursor:pointer;transition:box-shadow .16s ease,transform .16s ease}.accessory-card:hover{box-shadow:0 6px 16px rgba(96,0,127,.15);transform:translateY(-1px)}.accessory-card input{position:absolute;right:9px;top:9px;z-index:3;width:15px;height:15px;margin:0;accent-color:#a000cf}.accessory-card input:disabled{opacity:1;cursor:default}.accessory-photo{width:138px;height:136px;position:relative;overflow:hidden;display:block;margin:0 auto 9px;background:#f7f7f7}.accessory-photo img{position:absolute;width:473px;max-width:none;height:351px}.accessory-frame img{left:-30px;top:-52px}.accessory-interface img{left:-214px;top:-52px}.accessory-card strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:500;color:#20242a}.accessory-card>span:not(.accessory-photo){margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#8a929b;font-size:12px}.accessory-card b{margin-top:8px;color:#ef2222;font-size:16px;font-weight:500}.accessory-card>svg{position:absolute;right:8px;bottom:12px;color:#a7adb4}.purchase-dock{position:absolute;left:302px;right:20px;bottom:17px;min-height:50px;padding:8px 12px;display:grid;grid-template-columns:64px auto auto 150px minmax(120px,1fr) minmax(145px,auto);align-items:center;gap:8px;border:2px solid #d90028;background:#fff}.product-detail-page{position:relative;min-height:590px}.purchase-dock>input,.purchase-dock select{height:34px;border:1px solid #cfd5dc;padding:0 9px}.purchase-dock label{display:flex;align-items:center;gap:8px;white-space:nowrap}.stock-warning{display:block;color:#f33;font-size:11px}.added-toast{position:fixed;right:18px;bottom:18px;z-index:120;width:280px;padding:13px;display:grid;gap:7px;border-left:3px solid #9b00c9;background:#fff;box-shadow:0 8px 24px rgba(31,36,43,.22)}.added-toast>button{position:absolute;right:6px;top:6px;border:0;background:transparent}.added-toast span,.added-toast small{color:#68717b}.added-toast div{display:flex;justify-content:flex-end;gap:8px}.added-toast div button{height:30px;border:1px solid #9900c8;background:#fff;color:#9500c5}.added-toast div button:last-child{background:#9500c5;color:#fff}.cart-page{padding-bottom:58px}.cart-section-head{min-height:48px;padding:0 16px;display:flex;align-items:center;justify-content:space-between}.cart-section-head h1{margin:0;font-size:18px;font-weight:500}.continue-command{height:34px;padding:0 24px;border-radius:6px}.cart-batch{padding:0 16px 10px}.commerce-table{margin:0 14px;border-color:#edf0f3}.commerce-table table{min-width:1000px}.commerce-table th,.commerce-table td{padding:10px 12px}.table-device{width:28px;height:28px;border-width:2px}.quantity-control{width:62px;height:30px;border:1px solid #ccd2d8}.commerce-table select{height:30px;min-width:68px;border:1px solid #ccd2d8;background:#fff;padding:0 7px}.view-command,.delete-command{height:29px;padding:0 9px;display:inline-flex;align-items:center;gap:4px;border:1px solid #c773e5;background:#faf2fd;color:#9d00cb}.delete-command{border-color:#ffb7b7;background:#fff3f3;color:#ef3a3a}.nonstandard-cart{margin:12px 0 0;padding:0 0 20px;background:#fff}.nonstandard-head{min-height:50px;padding:0 16px;display:flex;align-items:center;gap:28px}.nonstandard-head h2{margin:0;font-size:17px;font-weight:500}.nonstandard-head p{margin:0;color:#5e6771}.nonstandard-head svg{margin-left:auto;color:#9a00c8}.nonstandard-cart select,.nonstandard-cart input{height:30px;border:1px solid #ccd2d8;padding:0 7px}.nonstandard-cart input{width:205px}.cart-summary{position:absolute;left:0;right:0;bottom:0;min-height:48px;padding:8px 16px;display:flex;align-items:center;gap:22px;background:#fff;box-shadow:0 -4px 12px rgba(31,36,43,.13)}.cart-page{position:relative;min-height:535px}.cart-summary b{color:#9a00c8}.cart-summary .summary-note{color:#ee3333;font-weight:500}.cart-summary button{margin-left:auto;width:120px;height:34px;border:0;border-radius:5px;background:#8d00c8;color:#fff}.checkout-flow{display:grid;gap:12px}.checkout-panel{padding:18px;background:#fff;border:1px solid #dfe4e9}.checkout-panel h2{margin:0 0 18px;font-size:14px;font-weight:500}.customer-panel h2 span{margin-left:14px;color:#e93333;font-size:11px}.compact-form{display:grid;grid-template-columns:140px 1fr;gap:10px 8px;width:min(520px,100%)}.compact-form label{grid-column:1/-1;display:grid;grid-template-columns:140px minmax(160px,1fr);align-items:center;color:#59636d}.compact-form label>span,.delivery-form span{color:#e93333}.compact-form select,.compact-form input,.delivery-form select,.delivery-form>label input{height:34px;border:1px solid #cfd5dc;padding:0 10px}.checkout-panel-head{display:flex;justify-content:space-between}.checkout-panel-head>div{display:grid;gap:5px}.checkout-panel-head button{height:31px;border:1px solid #9600c8;background:#fff;color:#9300c4}.checkout-panel-head button:last-child{border:0}.delivery-form{display:grid;gap:12px}.delivery-form>label{display:grid;grid-template-columns:175px minmax(0,1fr);align-items:center;color:#59636d}.delivery-form fieldset{margin:0;padding:0;border:0;display:flex;align-items:center;gap:22px}.delivery-form legend{width:175px;float:left;color:#59636d}.delivery-form fieldset label{display:inline-flex;align-items:center;gap:6px}.delivery-form input[type=radio]{accent-color:#9b00c9}.product-checkout h2{font-size:18px}.checkout-product-tabs{height:42px;display:flex;align-items:end;gap:0;border-bottom:1px solid #ddd}.checkout-product-tabs button{height:38px;padding:0 22px;border:0;background:#fff;font-size:14px}.checkout-product-tabs button.active{background:#d58aea;color:#fff}.checkout-product-tabs span{margin:0 0 11px 22px;color:#5e6872}.product-checkout .commerce-table{margin:8px 0 0}.checkout-summary{min-height:52px;margin-top:14px;display:flex;align-items:center;gap:22px}.checkout-summary b,.pending-price{color:#e70024}.checkout-summary span:nth-child(4){color:#e70024;font-weight:500}.checkout-summary button{margin-left:auto;width:100px;height:34px;border:1px solid #8c00c7;background:#fff;color:#8c00c7}.checkout-summary button:last-child{margin-left:-12px;background:#8c00c7;color:#fff}.commerce-modal-backdrop{position:fixed;inset:0;z-index:130;display:grid;place-items:center;background:rgba(20,24,29,.45)}.commerce-modal{width:min(520px,calc(100vw - 28px));padding:18px;display:grid;gap:12px;background:#fff}.commerce-modal-head{display:flex;align-items:center;justify-content:space-between}.commerce-modal-head h2{margin:0;font-size:17px}.commerce-modal-head button{border:0;background:transparent}.commerce-modal label{display:grid;grid-template-columns:130px 1fr;align-items:center}.commerce-modal label span{color:#e33}.commerce-modal input{height:34px;border:1px solid #cfd5dc;padding:0 9px}.commerce-modal>div:last-child{display:flex;justify-content:flex-end;gap:8px}.commerce-modal>div:last-child button{height:34px;padding:0 14px;border:1px solid #9600c8;background:#fff;color:#9600c8}.commerce-modal>div:last-child button:last-child{display:inline-flex;align-items:center;gap:5px;background:#9600c8;color:#fff}
@media(max-width:1200px){.catalog-grid{grid-template-columns:repeat(5,minmax(135px,1fr))}.campaign-grid{grid-template-columns:repeat(2,1fr)}.purchase-dock{left:20px;grid-template-columns:74px auto auto 160px 1fr auto}.selection-layout{grid-template-columns:250px minmax(0,1fr)}}
@media(max-width:850px){.library-toolbar{grid-template-columns:1fr}.library-search{grid-row:2}.cart-entry{justify-self:start}.catalog-grid{grid-template-columns:repeat(3,minmax(130px,1fr))}.selection-layout{grid-template-columns:1fr;padding-bottom:120px}.product-gallery{max-width:360px}.purchase-dock{grid-template-columns:70px 1fr;left:10px;right:10px}.cart-summary,.checkout-summary{position:static;flex-wrap:wrap}.cart-summary button{margin-left:0}.compact-form{grid-template-columns:1fr}.delivery-form>label{grid-template-columns:1fr;gap:5px}.delivery-form fieldset{display:grid;grid-template-columns:1fr 1fr;gap:8px}.delivery-form legend{width:auto;float:none;grid-column:1/-1}.checkout-product-tabs{height:auto;flex-wrap:wrap}.checkout-product-tabs span{width:100%;margin:8px 0}.checkout-summary button{margin-left:0}.checkout-summary button:last-child{margin-left:0}}
@media(max-width:560px){.catalog-grid{grid-template-columns:repeat(2,minmax(125px,1fr))}.campaign-grid{grid-template-columns:1fr}.category-strip{padding-left:8px}.selection-layout{padding:0 12px 150px}.product-facts{grid-template-columns:1fr}.product-facts dt{min-height:24px}.purchase-dock{grid-template-columns:1fr}.library-search{min-width:0}.commerce-modal label{grid-template-columns:1fr;gap:5px}}
.product-detail-page { min-height: calc(100vh - 108px); display: flex; flex-direction: column; }
.product-detail-page .selection-layout { min-height: 0; flex: 1; padding-bottom: 90px; }
.purchase-dock { position: sticky; left: auto; right: auto; bottom: 0; z-index: 35; width: 100%; min-height: 54px; border: 0; border-top: 1px solid #dfe3e8; box-shadow: 0 -4px 14px rgba(31,36,43,.12); }
.cart-page { min-height: calc(100vh - 108px); padding-bottom: 0; display: flex; flex-direction: column; }
.cart-summary { position: sticky; left: auto; right: auto; bottom: 0; z-index: 35; margin-top: auto; border-top: 1px solid #dfe3e8; }
.commerce-table input[type=checkbox], .nonstandard-cart input[type=checkbox] { width: 14px; height: 14px; padding: 0; accent-color: #9700c8; }
.nonstandard-cart input:not([type=checkbox]) { width: 205px; height: 30px; border: 1px solid #ccd2d8; padding: 0 7px; }
.nonstandard-cart select { height: 30px; border: 1px solid #ccd2d8; padding: 0 7px; }
.checkout-flow { padding-bottom: 8px; }
.compact-form { width: min(660px,100%); grid-template-columns: 1fr; gap: 10px; }
.compact-form label { grid-column: auto; grid-template-columns: 126px minmax(260px,1fr); gap: 0; }
.field-label { min-width: 0; display: inline-flex; align-items: center; gap: 4px; color: #59636d; }
.field-label i { color: #e93333; font-style: normal; }
.delivery-form > label { grid-template-columns: 175px minmax(260px,1fr); gap: 0; }
.delivery-form > label .field-label { color: #59636d; }
.delivery-form > label select, .delivery-form > label input { width: 100%; }
@media(max-width:850px){.purchase-dock{position:sticky;left:auto;right:auto;grid-template-columns:70px 1fr}.cart-summary{position:sticky}.compact-form label,.delivery-form>label{grid-template-columns:1fr;gap:5px}}
.purchase-dock { grid-template-columns: 70px 132px max-content minmax(320px,1fr) max-content; gap: 12px; padding: 10px 14px; }
.purchase-dock .detail-quantity { grid-column: 1; grid-row: 1; width: 70px; }
.purchase-dock .add-cart-command { grid-column: 2; grid-row: 1; min-width: 132px; height: 40px; padding: 0 18px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; box-shadow: 0 2px 6px rgba(147,0,196,.18); }
.purchase-dock .customization-label { grid-column: 3; grid-row: 1; white-space: nowrap; }
.purchase-dock .customization-input { grid-column: 4; grid-row: 1; width: 100%; min-width: 320px; }
.purchase-dock .engraving-control { grid-column: 5; grid-row: 1; }
.purchase-dock .detail-quantity,.purchase-dock .customization-input,.purchase-dock .engraving-control select { height: 38px; }
.purchase-dock .stock-warning { grid-column: 1 / 3; grid-row: 2; margin-top: -7px; }
@media(max-width:1200px){.purchase-dock{grid-template-columns:64px 120px max-content minmax(220px,1fr) max-content}.purchase-dock .detail-quantity{width:64px}.purchase-dock .add-cart-command{min-width:120px}.purchase-dock .customization-input{min-width:220px}}
@media(max-width:850px){.purchase-dock{grid-template-columns:80px minmax(160px,1fr);gap:8px 10px}.purchase-dock .detail-quantity{grid-column:1;grid-row:1;width:80px}.purchase-dock .add-cart-command{grid-column:2;grid-row:1}.purchase-dock .customization-label{grid-column:1 / -1;grid-row:2}.purchase-dock .customization-input{grid-column:1 / -1;grid-row:3;min-width:0}.purchase-dock .engraving-control{grid-column:1 / -1;grid-row:4}.purchase-dock .stock-warning{grid-column:1 / -1;grid-row:5;margin-top:0}}
.nonstandard-cart .commerce-table table { min-width: 1280px; }
.nonstandard-cart .custom-cart-requirement { width: min(360px,100%); min-width: 280px; }
.compact-form .field-label,.delivery-form .field-label { color: #3d4650; font-weight: 500; }
.field-label i { margin-right: 4px; color: #e52b32; font-style: normal; }
.checkout-product-tabs { height: 49px; gap: 8px; align-items: end; }
.checkout-product-tabs button { min-width: 200px; height: 40px; border: 1px solid #cfd4db; border-radius: 4px 4px 0 0; background: #fff; color: #343a42; font-weight: 500; white-space: nowrap; }
.checkout-product-tabs button:hover { border-color: #b45ad0; color: #9200c0; }
.checkout-product-tabs button.active { border-color: #9800c9; background: #9800c9; color: #fff; box-shadow: 0 -2px 8px rgba(152,0,201,.16); }
.checkout-product-tabs span { margin: 0 0 11px 12px; }
.commerce-modal { width: min(680px,calc(100vw - 28px)); padding: 24px; gap: 16px; }
.commerce-modal label { grid-template-columns: 160px minmax(0,1fr); gap: 16px; }
.commerce-modal .commerce-field-label { display: flex; align-items: center; gap: 4px; color: #24272d; font-weight: 500; }
.commerce-modal .commerce-field-label i { color: #e52b32; font-style: normal; }
.commerce-modal input { width: 100%; height: 40px; border-radius: 4px; }
.commerce-modal>div:last-child button { min-width: 96px; height: 40px; border-radius: 4px; padding: 0 20px; }
@media(max-width:640px){.commerce-modal label{grid-template-columns:1fr;gap:6px}.checkout-product-tabs button{min-width:145px}.checkout-product-tabs span{width:100%;margin:8px 0}}</style>
