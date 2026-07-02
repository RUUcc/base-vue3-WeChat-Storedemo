<template>
  <div class="orders-page">
    <van-nav-bar title="我的订单" left-arrow @click-left="goBack" fixed placeholder />

    <!-- 订单状态标签 -->
    <van-tabs v-model:active="activeTab" @change="onTabChange" sticky>
      <van-tab title="全部" name="all" />
      <van-tab title="待付款" name="pending" />
      <van-tab title="待发货" name="delivering" />
      <van-tab title="待收货" name="delivered" />
      <van-tab title="已完成" name="completed" />
    </van-tabs>

    <!-- 订单列表 -->
    <div class="orders-list" v-if="filteredOrders.length > 0">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-item"
        @click="viewOrderDetail(order)"
      >
        <div class="order-header">
          <div class="order-info">
            <span class="order-number">订单号：{{ order.orderNo }}</span>
            <span class="order-date">{{ order.createTime }}</span>
          </div>
          <div class="order-status" :class="getStatusClass(order.status)">
            {{ getStatusText(order.status) }}
          </div>
        </div>

        <div class="order-products">
          <div
            v-for="item in order.products"
            :key="item.id"
            class="product-item"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="product-spec">规格：{{ item.spec || '默认' }}</div>
              <div class="product-price-quantity">
                <span class="price">¥{{ item.price }}</span>
                <span class="quantity">x{{ item.quantity }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total">
            共{{ order.totalQuantity }}件商品，合计：<span class="total-price">¥{{ order.totalPrice }}</span>
          </div>
          <div class="order-actions">
            <van-button
              v-if="order.status === 'pending'"
              size="mini"
              type="danger"
              @click.stop="payOrder(order)"
            >
              立即付款
            </van-button>
            <van-button
              v-if="order.status === 'delivered'"
              size="mini"
              type="primary"
              @click.stop="confirmReceive(order)"
            >
              确认收货
            </van-button>
            <van-button
              size="mini"
              type="default"
              @click.stop="viewOrderDetail(order)"
            >
              查看详情
            </van-button>
            <van-button
              v-if="order.status === 'completed'"
              size="mini"
              type="default"
              @click.stop="deleteOrder(order)"
            >
              删除订单
            </van-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <van-empty v-else description="暂无订单" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast, showSuccessToast, showConfirmDialog } from 'vant'

const router = useRouter()
const route = useRoute()
const activeTab = ref('all')

// 模拟订单数据
const orders = ref([
  {
    id: 1,
    orderNo: 'ORD20240101001',
    status: 'pending',
    createTime: '2024-01-01 10:30:00',
    totalPrice: 5999,
    totalQuantity: 1,
    products: [
      {
        id: 1,
        name: '苹果 iPhone 15',
        price: 5999,
        quantity: 1,
        image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        spec: '128GB 蓝色'
      }
    ]
  },
  {
    id: 2,
    orderNo: 'ORD20240102002',
    status: 'delivering',
    createTime: '2024-01-02 14:20:00',
    totalPrice: 12999,
    totalQuantity: 1,
    products: [
      {
        id: 5,
        name: 'MacBook Pro',
        price: 12999,
        quantity: 1,
        image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        spec: '14英寸 M3'
      }
    ]
  },
  {
    id: 3,
    orderNo: 'ORD20240103003',
    status: 'delivered',
    createTime: '2024-01-03 09:15:00',
    totalPrice: 4599,
    totalQuantity: 1,
    products: [
      {
        id: 6,
        name: 'iPad Air',
        price: 4599,
        quantity: 1,
        image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
        spec: '64GB 深空灰'
      }
    ]
  },
  {
    id: 4,
    orderNo: 'ORD20231228004',
    status: 'completed',
    createTime: '2023-12-28 16:45:00',
    totalPrice: 1899,
    totalQuantity: 1,
    products: [
      {
        id: 7,
        name: 'AirPods Pro',
        price: 1899,
        quantity: 1,
        image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        spec: '第二代'
      }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeTab.value)
})

const getStatusText = (status) => {
  const statusMap = {
    pending: '待付款',
    delivering: '待发货',
    delivered: '待收货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知'
}

const getStatusClass = (status) => {
  return `status-${status}`
}

const onTabChange = (name) => {
  activeTab.value = name
}

const goBack = () => {
  router.back()
}

const viewOrderDetail = (order) => {
  showToast(`查看订单详情：${order.orderNo}`)
}

const payOrder = (order) => {
  showConfirmDialog({
    title: '确认付款',
    message: `确认支付 ¥${order.totalPrice} 吗？`
  })
    .then(() => {
      order.status = 'delivering'
      showSuccessToast('支付成功')
    })
    .catch(() => {})
}

const confirmReceive = (order) => {
  showConfirmDialog({
    title: '确认收货',
    message: '确认已收到商品吗？'
  })
    .then(() => {
      order.status = 'completed'
      showSuccessToast('确认收货成功')
    })
    .catch(() => {})
}

const deleteOrder = (order) => {
  showConfirmDialog({
    title: '删除订单',
    message: '确定要删除这个订单吗？'
  })
    .then(() => {
      const index = orders.value.findIndex(o => o.id === order.id)
      if (index > -1) {
        orders.value.splice(index, 1)
        showSuccessToast('删除成功')
      }
    })
    .catch(() => {})
}

onMounted(() => {
  const type = route.query.type
  if (type) {
    activeTab.value = type
  }
})
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}

.orders-list {
  padding: 10px;
}

.order-item {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 10px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-size: 14px;
  color: #323233;
  font-weight: 500;
}

.order-date {
  font-size: 12px;
  color: #969799;
}

.order-status {
  font-size: 14px;
  font-weight: 500;
}

.status-pending {
  color: #ee0a24;
}

.status-delivering {
  color: #ff9800;
}

.status-delivered {
  color: #1989fa;
}

.status-completed {
  color: #07c160;
}

.order-products {
  margin-bottom: 10px;
}

.product-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.product-item:last-child {
  margin-bottom: 0;
}

.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 14px;
  color: #323233;
  margin-bottom: 4px;
}

.product-spec {
  font-size: 12px;
  color: #969799;
  margin-bottom: 8px;
}

.product-price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  color: #ee0a24;
  font-weight: bold;
}

.quantity {
  font-size: 14px;
  color: #646566;
}

.order-footer {
  padding-top: 10px;
  border-top: 1px solid #ebedf0;
}

.order-total {
  text-align: right;
  font-size: 14px;
  color: #646566;
  margin-bottom: 10px;
}

.total-price {
  font-size: 16px;
  color: #ee0a24;
  font-weight: bold;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

