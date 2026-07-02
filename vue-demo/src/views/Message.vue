<template>
  <div class="message-page">
    <van-nav-bar title="消息" fixed placeholder />

    <div class="message-list">
      <van-cell-group>
        <van-cell
          v-for="message in messages"
          :key="message.id"
          :title="message.title"
          :label="message.content"
          :value="message.time"
          is-link
          @click="viewMessage(message)"
        >
          <template #icon>
            <van-badge v-if="message.unread" :content="message.unread" class="message-badge">
              <van-icon name="chat-o" size="24px" class="message-icon" />
            </van-badge>
            <van-icon v-else name="chat-o" size="24px" class="message-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="activeTab" @change="onTabChange" fixed placeholder>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart" :badge="cartCount">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { showToast } from 'vant'

const router = useRouter()
const activeTab = ref(2)

const messages = ref([
  {
    id: 1,
    title: '系统通知',
    content: '您的订单已发货，请注意查收',
    time: '10:30',
    unread: 2,
    detail: '您的订单 ORD20240101001 已由顺丰快递发货，快递单号：SF1234567890，预计1-2天送达，请注意查收。',
    orderNo: 'ORD20240101001',
    orderStatus: '已发货'
  },
  {
    id: 2,
    title: '活动通知',
    content: '限时抢购活动正在进行中',
    time: '昨天',
    unread: 0,
    detail: '限时抢购活动正在进行中，全场商品享受8折优惠，活动时间：2024年1月1日-1月7日，数量有限，先到先得！',
    activityId: 'ACT001'
  },
  {
    id: 3,
    title: '订单通知',
    content: '您的订单已确认，正在备货中',
    time: '2天前',
    unread: 1,
    detail: '您的订单 ORD20240103003 已确认，商家正在为您备货，预计1-2个工作日内发货，请耐心等待。',
    orderNo: 'ORD20240103003',
    orderStatus: '待发货'
  },
  {
    id: 4,
    title: '优惠券',
    content: '您有一张优惠券即将过期',
    time: '3天前',
    unread: 0,
    detail: '您有一张价值10元的优惠券即将在3天后过期，满100元可用，快来使用吧！',
    couponId: 'COUPON001',
    couponAmount: 10,
    couponDesc: '满100可用'
  }
])

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const viewMessage = (message) => {
  // 标记为已读
  message.unread = 0
  router.push(`/message/${message.id}`)
}

const onTabChange = (index) => {
  const routes = ['/', '/category', '/message', '/cart', '/mine']
  router.push(routes[index])
}
</script>

<style scoped>
.message-page {
  min-height: 100vh;
  padding-bottom: 50px;
  background: #f7f8fa;
}

.message-list {
  padding: 10px;
}

.message-icon {
  margin-right: 12px;
  color: #1989fa;
}

.message-badge {
  margin-right: 12px;
}
</style>

