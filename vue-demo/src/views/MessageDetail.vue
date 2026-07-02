<template>
  <div class="message-detail-page">
    <van-nav-bar title="消息详情" left-arrow @click-left="goBack" fixed placeholder />

    <div class="message-content" v-if="message">
      <div class="message-header">
        <div class="message-title">{{ message.title }}</div>
        <div class="message-time">{{ message.time }}</div>
      </div>

      <div class="message-body">
        <div class="message-text">{{ message.content }}</div>
        
        <!-- 详细内容 -->
        <div class="message-detail" v-if="message.detail">
          <div class="detail-title">详细信息：</div>
          <div class="detail-content">{{ message.detail }}</div>
        </div>

        <!-- 订单相关消息 -->
        <div class="order-info" v-if="message.orderNo">
          <div class="info-item">
            <span class="label">订单号：</span>
            <span class="value">{{ message.orderNo }}</span>
          </div>
          <div class="info-item" v-if="message.orderStatus">
            <span class="label">订单状态：</span>
            <span class="value">{{ message.orderStatus }}</span>
          </div>
          <van-button
            v-if="message.orderNo"
            type="primary"
            block
            @click="goToOrder"
            class="order-btn"
          >
            查看订单详情
          </van-button>
        </div>

        <!-- 活动相关消息 -->
        <div class="activity-info" v-if="message.activityId">
          <van-button
            type="danger"
            block
            @click="goToActivity"
            class="activity-btn"
          >
            立即参与
          </van-button>
        </div>

        <!-- 优惠券相关消息 -->
        <div class="coupon-info" v-if="message.couponId">
          <div class="coupon-card">
            <div class="coupon-amount">¥{{ message.couponAmount || 10 }}</div>
            <div class="coupon-desc">{{ message.couponDesc || '满100可用' }}</div>
          </div>
          <van-button
            type="warning"
            block
            @click="useCoupon"
            class="coupon-btn"
          >
            立即使用
          </van-button>
        </div>
      </div>
    </div>

    <van-empty v-else description="消息不存在" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'

const router = useRouter()
const route = useRoute()
const message = ref(null)

// 模拟消息数据
const messagesData = [
  {
    id: 1,
    title: '系统通知',
    content: '您的订单已发货，请注意查收',
    time: '2024-01-01 10:30:00',
    detail: '您的订单 ORD20240101001 已由顺丰快递发货，快递单号：SF1234567890，预计1-2天送达，请注意查收。',
    orderNo: 'ORD20240101001',
    orderStatus: '已发货',
    unread: 2
  },
  {
    id: 2,
    title: '活动通知',
    content: '限时抢购活动正在进行中',
    time: '2024-01-02 09:00:00',
    detail: '限时抢购活动正在进行中，全场商品享受8折优惠，活动时间：2024年1月1日-1月7日，数量有限，先到先得！',
    activityId: 'ACT001',
    unread: 0
  },
  {
    id: 3,
    title: '订单通知',
    content: '您的订单已确认，正在备货中',
    time: '2024-01-03 14:20:00',
    detail: '您的订单 ORD20240103003 已确认，商家正在为您备货，预计1-2个工作日内发货，请耐心等待。',
    orderNo: 'ORD20240103003',
    orderStatus: '待发货',
    unread: 1
  },
  {
    id: 4,
    title: '优惠券',
    content: '您有一张优惠券即将过期',
    time: '2024-01-04 08:15:00',
    detail: '您有一张价值10元的优惠券即将在3天后过期，满100元可用，快来使用吧！',
    couponId: 'COUPON001',
    couponAmount: 10,
    couponDesc: '满100可用',
    unread: 0
  }
]

const goBack = () => {
  router.back()
}

const goToOrder = () => {
  router.push({
    path: '/orders',
    query: { orderNo: message.value.orderNo }
  })
}

const goToActivity = () => {
  showToast('跳转到活动页面')
}

const useCoupon = () => {
  showSuccessToast('优惠券已使用')
}

onMounted(() => {
  const messageId = Number(route.params.id)
  const foundMessage = messagesData.find(msg => msg.id === messageId)
  if (foundMessage) {
    message.value = { ...foundMessage }
    // 标记为已读
    foundMessage.unread = 0
  } else {
    // 如果找不到，显示默认消息
    message.value = {
      id: messageId,
      title: '消息详情',
      content: '消息内容',
      time: new Date().toLocaleString(),
      detail: '暂无详细信息'
    }
  }
})
</script>

<style scoped>
.message-detail-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}

.message-content {
  background: #fff;
  margin: 10px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-header {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebedf0;
  margin-bottom: 15px;
}

.message-title {
  font-size: 18px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 8px;
}

.message-time {
  font-size: 12px;
  color: #969799;
}

.message-body {
  line-height: 1.6;
}

.message-text {
  font-size: 15px;
  color: #323233;
  margin-bottom: 15px;
}

.message-detail {
  background: #f7f8fa;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.detail-title {
  font-size: 14px;
  font-weight: 500;
  color: #646566;
  margin-bottom: 8px;
}

.detail-content {
  font-size: 14px;
  color: #323233;
  line-height: 1.6;
}

.order-info {
  background: #f7f8fa;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
  font-size: 14px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  color: #646566;
  margin-right: 8px;
}

.value {
  color: #323233;
  font-weight: 500;
}

.order-btn {
  margin-top: 15px;
}

.activity-info {
  margin-top: 15px;
}

.activity-btn {
  margin-top: 15px;
}

.coupon-info {
  margin-top: 15px;
}

.coupon-card {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 15px;
}

.coupon-amount {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.coupon-desc {
  font-size: 14px;
  opacity: 0.9;
}

.coupon-btn {
  margin-top: 15px;
}
</style>

