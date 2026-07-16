# CRM V2.29 页面核对清单

核对来源：CRM_V2.29_html文件 中的 Axure HTML、页面可见文字、需求说明、状态说明表和页面截图。

## 一、文档范围

- 产品：HDL CRM
- 版本：CRM_V2.29
- 项目：HDL CRM 2026年迭代任务
- 项目编码：RD-2307.006
- 原型版本：V1.0
- 创建日期：2026-07-09
- 本次范围：优选商城国际版、国际购物车、后台标品订单、客户订单，以及对应操作页和弹窗。

## 二、入口页面

### 优选商城（国际）

- 页面需求只有一项明确修改：删除原页面 Banner。
- 保留商品浏览、标准品与非标定制入口、加入购物车。

### 购物车（国际）

- 顶部保留“国内 / 国际”页签，国际页签选中。
- 列表字段：Product Name、Product Image、Product Type、Product Specification、Product Code、Market Price、Quantity、Total、Operation。
- 操作：Mass Delete、Batch Submit、View、Delete。
- 库存不足商品显示 Inventory Shortage 和 60 天备货提示。
- 购物车提交后不是直接生成订单，而是进入独立“提交订单”页面。

### 提交订单

- Customer Information：Channel Name、Business Type。
- Delivery Address：Delivery information。
- Shipping Method：HDL Prepaid Freight、Customer Pickup、Freight Collect。
- Tile Laser Engraving：Need laser engraving、No need for laser engraving。
- Shipping Remarks：Ready to ship、In stock first dispatch。
- Order Remarks。
- Product Information：按正常库存和库存不足分组展示。
- 底部提供 Back、Submit。

## 三、后台标品订单

### 列表

- 快捷页签仅有：待审核、生产中、全部。
- 筛选字段：订单编号、客户、订单来源、订单状态、日期范围、业务员、项目名称、ERP编号、是否享受优惠、镭雕文件、方悦是否镭雕、HDL Ref No。
- 列表主要字段：订单编号、客户名称、项目名称、业务类型、ERP编号、是否镭雕、业务员、下单时间、产品总计、整单折扣、操作。

### 状态与操作

| 状态 | 说明 | 操作 |
| --- | --- | --- |
| 待确认 | 下单后，由业务经理确认订单并设置费用 | 查看、变更业务员、订单备注、修改地址、设置折扣价格、取消订单、关联XX镭雕、删除数据 |
| 待审核 | 设置费用后进入 | 查看、审核、变更订单、变更业务员、订单备注、修改地址、设置折扣价格、设置费用、取消订单、关联XX镭雕、删除数据 |
| 生产中 | 含非标定制时进入，等待录入非标品号 | 查看、录入品号、变更订单、变更业务员、订单备注、修改地址、设置折扣价格、设置费用、取消订单、关联XX镭雕 |
| 待付款 | 所有非标品号录入后进入 | 查看、付款凭证、变更订单、变更业务员、订单备注、修改地址、设置折扣价格、设置费用、取消订单、关联XX镭雕、删除数据 |
| 已付款 | 客户付款后进入 | 查看、确认发货、变更订单、付款凭证、变更业务员、订单备注、修改地址、取消订单、关联XX镭雕、删除数据 |
| 待发货 | 管理部确认发货后进入 | 查看、变更订单、变更业务员、付款凭证、再来一单、订单备注、修改地址、取消订单、关联XX镭雕、删除数据 |
| 待收货 | ERP发货后进入 | 查看、付款凭证、变更业务员、再来一单、删除数据 |
| 已完成 | 客户确认收货后进入 | 查看、变更业务员、再来一单 |
| 交易关闭 | 取消订单后进入 | 查看、再来一单、变更业务员、删除数据 |

## 四、客户订单

### 列表

- 快捷页签仅有：Pending Confirmation、Pending Payment、Review Failed、All。
- 筛选和列表字段使用英文，字段翻译必须与订单详情保持一致。
- 关键操作使用英文：Review、Confirm Requirements、Set Fees、To Pay、Set Discount Price、Modify Address、Modify Order、Another Order、Cancel Order、Link Tile Laser Engraving。

### 状态

- Pending Confirmation：客户下单后进入。
- Pending Review：确认需求并设置费用后进入。
- In Production：含非标定制且审核通过后进入。
- Pending Payment：非标品号全部录入后进入。
- Paid：客户付款后进入。
- Pending Shipment：管理部确认发货后进入。
- Pending Receipt：ERP发货后进入。
- Completed：客户确认收货后进入。
- Review Failed：管理部审核不通过。
- Closed：取消订单后进入。

## 五、独立详情与编辑页

### 查看（国际） / 查看Review（国际）

- 必须是独立全页，不是抽屉。
- 页签：基础信息 / Basic Information、产品信息 / Product Information、变更明细 / Change Details、发货信息 / Delivery Information。
- 右侧固定展示订单负责人 / Order Manager、订单记录 / Order Record。
- Review 页面全部翻译为英文，字段名称与客户订单列表保持一致。

### 确认需求 Confirm Requirements

- 独立全页。
- 标准品、非标定制品分组。
- 支持数量调整、删除、Add More Items。
- 同页设置 HDL Ref No、P.O. No、Freight、Certificate Fee、Other Fee、Handling Fee、Payment Method、Exchange Rate。
- 提交后进入 Pending Review。

### 变更订单 Modify Order

- 独立全页。
- 标准品、非标定制品分组。
- 支持数量修改、删除、添加其他商品。
- 展示金额总计。

### 设置折扣价格 Set Discount Price

- 独立全页。
- 必填 Discount Type、Offer Description。
- 列表显示 market Price、Discount、Modified discount、unitPrice、Revise unit price、Primitive subtotal、Revised subtotal。
- 底部显示 Original order amount、Revised order amount、Total discount amount。

### 录入品号

- 独立全页。
- 字段：产品名称、规格、编码、数量、非标定制需求、非标品编码、单价、同步ERP状态。
- 所有非标品号填写完整后才可提交。
- 提交：同步 ERP 并推进到待付款。
- 保存并同步 ERP：仅同步当前品号，不推进流程。

## 六、弹窗

### 设置费用

- 后台中文弹窗和客户英文弹窗分别展示。
- 字段：订单编号、客户名称、HDL Ref No、P.O. No、订单金额、运费、证书费、其他费、手续费、支付币种、汇率。
- Total = Order Amount + Freight + Certificate Fee + Other Fee + Handling Fee。
- Final Amount Payable = Total × Exchange Rate。

### 复审

- 字段：审核结果、审核通过、审核不通过、审核说明。
- 审核通过后标准品同步 ERP；含非标定制的订单进入生产中。

### 变更业务员

- 展示原业务员。
- 必填新业务员。

### 订单备注

- 展示客户原备注。
- 必填继续补充。

### 修改地址

- Receiver、Contact Number、Country/City、Address。
- 订单页同时保留 Shipping Method、Logistics Company、Dispatch Requirement。

### 付款凭证

- 最多上传 5 张。
- 支持 png、jpg、jpeg，单张最大 5 MB。

### To Pay

- 展示可用余额。
- 选择是否使用余额。
- Payment Method：T/T 或 CASH。
- 必传 Proof of Payment。
- Payment Remarks。

### 取消、删除、再来一单

- Cancel Order：必填取消原因。
- Delete：二次确认。
- Another Order：确认按当前订单商品再次下单。

## 七、原型空白页

以下页面在导出原型中没有可见字段或页面截图，不能自行补充表单字段：

- _确认发货（国际）
- _关联xx镭雕（国际）
- _关联xx镭雕（国际）_1
- 优选商城（国际）_1
- 购物车（国际）_1
- 标品订单（国际）_1

实现中仅保留对应入口或最小确认反馈，不添加原型未定义的物流、运单或镭雕文件字段。
