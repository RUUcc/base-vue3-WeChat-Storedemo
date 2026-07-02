<template>
  <div class="product-detail">
    <!-- 返回按钮 -->
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="goBack"
      fixed
      placeholder
    />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#1989fa" class="product-banner">
      <van-swipe-item v-for="(image, index) in product.images" :key="index">
        <img :src="image" alt="product" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品信息 -->
    <div class="product-info">
      <div class="product-title">{{ product.name }}</div>
      <div class="product-price-section">
        <span class="price">¥{{ product.price }}</span>
        <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
      </div>
      <div class="product-meta">
        <div class="meta-item">
          <span class="label">运费：</span>
          <span class="value">免运费</span>
        </div>
        <div class="meta-item">
          <span class="label">库存：</span>
          <span class="value">{{ product.stock }}件</span>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="product-description">
      <div class="desc-title">商品详情</div>
      <div class="desc-content">{{ product.description }}</div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <van-button
        class="action-btn"
        icon="chat-o"
        type="default"
        @click="contactService"
      >
        客服
      </van-button>
      <van-button
        class="action-btn"
        icon="shopping-cart-o"
        type="default"
        :badge="cartCount"
        @click="goToCart"
      >
        购物车
      </van-button>
      <van-button
        class="action-btn add-cart"
        type="warning"
        @click="addToCart"
      >
        加入购物车
      </van-button>
      <van-button
        class="action-btn buy-now"
        type="danger"
        @click="buyNow"
      >
        立即购买
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '../store'
import { showToast, showSuccessToast } from 'vant'
import { getProductById } from '../data/products'

const router = useRouter()
const route = useRoute()

const product = ref({
  id: 1,
  name: '商品加载中...',
  price: 0,
  originalPrice: 0,
  stock: 0,
  image: '',
  images: [],
  description: ''
})

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const goBack = () => {
  router.back()
}

const contactService = () => {
  showToast('客服功能开发中')
}

const goToCart = () => {
  router.push('/cart')
}

const addToCart = () => {
  store.addToCart(product.value)
  showSuccessToast('已加入购物车')
}

const buyNow = () => {
  store.addToCart(product.value)
  router.push('/cart')
}

onMounted(() => {
  const productId = route.params.id
  const productData = getProductById(productId)
  if (productData) {
    product.value = { ...productData }
  } else {
    showToast('商品不存在')
    router.back()
  }
})
</script>

<style scoped>
.product-detail {
  padding-bottom: 60px;
  min-height: 100vh;
  background: #f7f8fa;
}

.product-banner {
  width: 100%;
  height: 375px;
  background: #fff;
}

.product-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  background: #fff;
  padding: 16px;
  margin-bottom: 10px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 12px;
  line-height: 1.5;
}

.product-price-section {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 12px;
}

.price {
  font-size: 24px;
  color: #ee0a24;
  font-weight: bold;
}

.original-price {
  font-size: 14px;
  color: #969799;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.meta-item {
  color: #646566;
}

.meta-item .label {
  color: #969799;
}

.meta-item .value {
  color: #323233;
}

.product-description {
  background: #fff;
  padding: 16px;
  margin-bottom: 10px;
}

.desc-title {
  font-size: 16px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 10px;
}

.desc-content {
  font-size: 14px;
  color: #646566;
  line-height: 1.6;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #fff;
  padding: 8px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.action-btn {
  flex: 1;
  margin: 0 4px;
  height: 44px;
}

.add-cart {
  flex: 1.5;
}

.buy-now {
  flex: 1.5;
}
</style>

