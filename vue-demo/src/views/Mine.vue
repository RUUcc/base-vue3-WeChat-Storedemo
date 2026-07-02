<template>
  <div class="mine-page">
    <!-- 用户信息头部 -->
    <div class="user-header">
      <div class="user-info">
        <van-image
          round
          width="60"
          height="60"
          :src="userInfo.avatar"
          class="avatar"
        />
        <div class="user-details">
          <div class="username">{{ userInfo.name }}</div>
          <div class="user-desc">{{ userInfo.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 订单统计 -->
    <div class="order-stats">
      <div class="stat-item" @click="goToOrders('pending')">
        <van-icon name="clock-o" size="24px" />
        <span>待付款</span>
      </div>
      <div class="stat-item" @click="goToOrders('delivering')">
        <van-icon name="logistics" size="24px" />
        <span>待发货</span>
      </div>
      <div class="stat-item" @click="goToOrders('delivered')">
        <van-icon name="send-gift-o" size="24px" />
        <span>待收货</span>
      </div>
      <div class="stat-item" @click="goToOrders('completed')">
        <van-icon name="completed" size="24px" />
        <span>已完成</span>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section">
      <van-cell-group>
        <van-cell
          title="我的订单"
          icon="orders-o"
          is-link
          @click="goToOrders('all')"
        />
        <van-cell
          title="我的收藏"
          icon="star-o"
          is-link
          @click="goToFavorites"
        />
        <van-cell
          title="收货地址"
          icon="location-o"
          is-link
          @click="goToAddresses"
        />
        <van-cell
          title="客服中心"
          icon="service-o"
          is-link
          @click="contactService"
        />
        <van-cell
          title="设置"
          icon="setting-o"
          is-link
          @click="goToSettings"
        />
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
const activeTab = ref(4)

const userInfo = ref({
  name: '用户123456',
  desc: '欢迎来到微商城',
  avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
})

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const goToOrders = (type) => {
  router.push({
    path: '/orders',
    query: { type }
  })
}

const goToFavorites = () => {
  router.push('/favorites')
}

const goToAddresses = () => {
  router.push('/addresses')
}

const contactService = () => {
  showToast('客服中心')
}

const goToSettings = () => {
  showToast('设置')
}

const onTabChange = (index) => {
  const routes = ['/', '/category', '/message', '/cart', '/mine']
  router.push(routes[index])
}
</script>

<style scoped>
.mine-page {
  min-height: 100vh;
  padding-bottom: 50px;
  background: #f7f8fa;
}

.user-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 20px 20px;
  color: #fff;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.user-details {
  flex: 1;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-desc {
  font-size: 14px;
  opacity: 0.9;
}

.order-stats {
  display: flex;
  background: #fff;
  padding: 20px 0;
  margin-bottom: 10px;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #646566;
  cursor: pointer;
}

.menu-section {
  margin-top: 10px;
}
</style>

