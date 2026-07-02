<template>
  <div class="favorites-page">
    <van-nav-bar title="我的收藏" left-arrow @click-left="goBack" fixed placeholder />

    <div class="favorites-list" v-if="favorites.length > 0">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="favorite-item"
        @click="goToProductDetail(item.id)"
      >
        <img :src="item.image" :alt="item.name" />
        <div class="product-info">
          <div class="product-name">{{ item.name }}</div>
          <div class="product-price">¥{{ item.price }}</div>
          <div class="product-desc">{{ item.description }}</div>
        </div>
        <van-button
          type="danger"
          size="mini"
          icon="delete"
          @click.stop="removeFavorite(item.id)"
          class="delete-btn"
        >
          取消收藏
        </van-button>
      </div>
    </div>

    <van-empty v-else description="暂无收藏" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showConfirmDialog } from 'vant'
import { getProductById } from '../data/products'

const router = useRouter()

// 从localStorage获取收藏列表
const favorites = ref([])

const loadFavorites = () => {
  const saved = localStorage.getItem('favorites')
  if (saved) {
    const favoriteIds = JSON.parse(saved)
    favorites.value = favoriteIds.map(id => {
      const product = getProductById(id)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      }
    })
  } else {
    // 默认收藏一些商品
    const defaultFavorites = [1, 2, 3]
    favorites.value = defaultFavorites.map(id => {
      const product = getProductById(id)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      }
    })
    localStorage.setItem('favorites', JSON.stringify(defaultFavorites))
  }
}

const goBack = () => {
  router.back()
}

const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`)
}

const removeFavorite = (productId) => {
  showConfirmDialog({
    title: '取消收藏',
    message: '确定要取消收藏这个商品吗？'
  })
    .then(() => {
      const index = favorites.value.findIndex(item => item.id === productId)
      if (index > -1) {
        favorites.value.splice(index, 1)
        // 更新localStorage
        const favoriteIds = favorites.value.map(item => item.id)
        localStorage.setItem('favorites', JSON.stringify(favoriteIds))
        showSuccessToast('已取消收藏')
      }
    })
    .catch(() => {})
}

onMounted(() => {
  loadFavorites()
})
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}

.favorites-list {
  padding: 10px;
}

.favorite-item {
  display: flex;
  gap: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.favorite-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.product-name {
  font-size: 15px;
  color: #323233;
  font-weight: 500;
}

.product-price {
  font-size: 18px;
  color: #ee0a24;
  font-weight: bold;
}

.product-desc {
  font-size: 12px;
  color: #969799;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.delete-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
}
</style>

