<template>
  <div class="category-page">
    <div class="category-container">
      <!-- 左侧菜单栏 -->
      <div class="category-sidebar">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          :class="['category-item', { active: activeCategoryIndex === index }]"
          @click="selectCategory(index)"
        >
          {{ category.name }}
        </div>
      </div>

      <!-- 右侧商品列表 -->
      <div class="product-list-container" ref="productListRef">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          :id="`category-${index}`"
          class="category-section"
        >
          <div class="category-title">{{ category.name }}</div>
          <div class="products-list">
            <div
              v-for="product in category.products"
              :key="product.id"
              class="product-item"
              @click="goToProductDetail(product.id)"
            >
              <img :src="product.image" :alt="product.name" />
              <div class="product-details">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-price">¥{{ product.price }}</div>
              </div>
            </div>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()
const activeCategoryIndex = ref(0)
const productListRef = ref(null)
const activeTab = ref(1)

const categories = ref([
  {
    id: 1,
    name: '手机数码',
    products: [
      { id: 1, name: '苹果 iPhone 15', price: 5999, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
      { id: 2, name: '华为 Mate 60', price: 6999, image: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      { id: 3, name: '小米 14', price: 3999, image: 'https://img.yzcdn.cn/vant/apple-3.jpg' },
      { id: 4, name: 'OPPO Find X7', price: 4999, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' }
    ]
  },
  {
    id: 2,
    name: '电脑办公',
    products: [
      { id: 5, name: 'MacBook Pro', price: 12999, image: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      { id: 6, name: 'iPad Air', price: 4599, image: 'https://img.yzcdn.cn/vant/apple-3.jpg' },
      { id: 7, name: 'AirPods Pro', price: 1899, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' }
    ]
  },
  {
    id: 3,
    name: '家用电器',
    products: [
      { id: 8, name: 'Apple Watch', price: 2999, image: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      { id: 9, name: '洗衣机', price: 1999, image: 'https://th.bing.com/th/id/OIP.Idabc7MNGCFIJqjkE2gsvQHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
      { id: 10, name: '空调', price: 2499, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' }
    ]
  },
  {
    id: 4,
    name: '服装鞋帽',
    products: [
      { id: 11, name: 'T恤', price: 99, image: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      { id: 12, name: '牛仔裤', price: 199, image: 'https://img.yzcdn.cn/vant/apple-3.jpg' },
      { id: 13, name: '运动鞋', price: 299, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' }
    ]
  },
  {
    id: 5,
    name: '美妆护肤',
    products: [
      { id: 14, name: '面膜', price: 59, image: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      { id: 15, name: '精华', price: 299, image: 'https://img.yzcdn.cn/vant/apple-3.jpg' },
      { id: 16, name: '口红', price: 199, image: 'https://img.yzcdn.cn/vant/apple-1.jpg' }
    ]
  }
])

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const selectCategory = (index) => {
  activeCategoryIndex.value = index
  nextTick(() => {
    const element = document.getElementById(`category-${index}`)
    if (element && productListRef.value) {
      productListRef.value.scrollTo({
        top: element.offsetTop - productListRef.value.offsetTop,
        behavior: 'smooth'
      })
    }
  })
}

const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`)
}

const onTabChange = (index) => {
  const routes = ['/', '/category', '/message', '/cart', '/mine']
  router.push(routes[index])
}

const handleScroll = () => {
  if (!productListRef.value) return
  
  const scrollTop = productListRef.value.scrollTop
  const sections = categories.value.map((_, index) => {
    const element = document.getElementById(`category-${index}`)
    return element ? {
      index,
      top: element.offsetTop - productListRef.value.offsetTop,
      bottom: element.offsetTop - productListRef.value.offsetTop + element.offsetHeight
    } : null
  }).filter(Boolean)

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollTop >= sections[i].top - 50) {
      activeCategoryIndex.value = sections[i].index
      break
    }
  }
}

onMounted(() => {
  if (productListRef.value) {
    productListRef.value.addEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.category-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}

.category-container {
  display: flex;
  height: calc(100vh - 50px);
  overflow: hidden;
}

.category-sidebar {
  width: 100px;
  background: #f7f8fa;
  overflow-y: auto;
  flex-shrink: 0;
}

.category-item {
  padding: 15px 10px;
  text-align: center;
  font-size: 14px;
  color: #646566;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.category-item.active {
  background: #fff;
  color: #ee0a24;
  border-left-color: #ee0a24;
  font-weight: bold;
}

.product-list-container {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  padding: 10px;
}

.category-section {
  margin-bottom: 20px;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #323233;
  padding: 10px 0;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.product-item {
  background: #f7f8fa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.product-item img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.product-details {
  padding: 10px;
}

.product-name {
  font-size: 13px;
  color: #323233;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 15px;
  color: #ee0a24;
  font-weight: bold;
}
</style>

