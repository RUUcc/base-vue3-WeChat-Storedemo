<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <div class="logo">微商城</div>
      <van-button 
        size="mini" 
        type="danger" 
        icon="logout" 
        @click="handleLogout"
        class="logout-btn"
      >
        退出登录
      </van-button>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键字"
        shape="round"
        show-action
        @search="onSearch"
        @focus="onFocus"
        @blur="onBlur"
        @clear="clearSearch"
      >
        <template #action>
          <div v-if="isFocused && searchValue" class="search-actions">
            <van-icon name="search" @click="onSearch" />
          </div>
        </template>
      </van-search>
    </div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#1989fa" class="banner">
      <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
        <img :src="image" alt="banner" />
      </van-swipe-item>
    </van-swipe>

    <!-- 功能按钮区 -->
    <div class="function-buttons">
      <div class="function-item" v-for="item in functionButtons" :key="item.id" @click="handleFunctionClick(item)">
        <van-icon :name="item.icon" size="24px" />
        <span>{{ item.name }}</span>
      </div>
    </div>

    <!-- 商品信息展示区 -->
    <div class="products-section">
      <!-- 每周上新 -->
      <div class="section-title">每周上新</div>
      <div class="products-grid">
        <div
          class="product-card"
          v-for="product in weeklyProducts"
          :key="product.id"
          @click="goToProductDetail(product.id)"
        >
          <img :src="product.image" :alt="product.name" />
          <div class="product-info">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">¥{{ product.price }}</div>
          </div>
        </div>
      </div>

      <!-- 热销商品 -->
      <div class="section-title">热销商品</div>
      <div class="products-grid">
        <div
          class="product-card"
          v-for="product in hotProducts"
          :key="product.id"
          @click="goToProductDetail(product.id)"
        >
          <img :src="product.image" :alt="product.name" />
          <div class="product-info">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">¥{{ product.price }}</div>
          </div>
        </div>
      </div>
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
import { products, getProductById } from '../data/products'
import { showConfirmDialog, showSuccessToast } from 'vant'
import banner1 from '../data/OIP.jpg'
import banner2 from '../data/wash.jpg'
import banner3 from '../data/oppo-find-x7.jpg'

const router = useRouter()
const searchValue = ref('')
const isFocused = ref(false)
const activeTab = ref(0)

const bannerImages = ref([
  banner1,
  banner2,
  banner3
])

const functionButtons = ref([
  { id: 1, name: '限时抢购', icon: 'fire-o' },
  { id: 2, name: '品牌特卖', icon: 'star-o' },
  { id: 3, name: '新品首发', icon: 'new-o' },
  { id: 4, name: '每日签到', icon: 'calendar-o' }
])

// 从商品数据文件中获取每周上新商品（ID 1-4）
const weeklyProducts = ref(
  [1, 2, 3, 4].map(id => {
    const product = getProductById(id)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }
  })
)

// 从商品数据文件中获取热销商品（ID 5-8）
const hotProducts = ref(
  [5, 6, 7, 8].map(id => {
    const product = getProductById(id)
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }
  })
)

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const onSearch = () => {
  if (searchValue.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: searchValue.value }
    })
  }
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

const clearSearch = () => {
  searchValue.value = ''
}

const handleFunctionClick = (item) => {
  console.log('点击功能:', item.name)
}

const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`)
}

const onTabChange = (index) => {
  const routes = ['/', '/category', '/message', '/cart', '/mine']
  router.push(routes[index])
}

const handleLogout = () => {
  showConfirmDialog({
    title: '确认退出',
    message: '确定要退出登录吗？'
  })
    .then(() => {
      store.logout()
      showSuccessToast('已退出登录')
      router.push('/login')
    })
    .catch(() => {
      // 取消退出
    })
}

onMounted(() => {
  const path = router.currentRoute.value.path
  const tabMap = {
    '/': 0,
    '/category': 1,
    '/message': 2,
    '/cart': 3,
    '/mine': 4
  }
  activeTab.value = tabMap[path] || 0
})
</script>

<style scoped>
.home {
  padding-bottom: 50px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: #323233;
}

.logout-btn {
  font-size: 12px;
  height: 28px;
  padding: 0 12px;
}

.search-container {
  background: #fff;
  padding: 10px 16px;
}

.search-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.banner {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.function-buttons {
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 20px 0;
  margin-bottom: 10px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #323233;
}

.products-section {
  padding: 0 16px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 15px;
  color: #323233;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-size: 14px;
  color: #323233;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 16px;
  color: #ee0a24;
  font-weight: bold;
}
</style>

