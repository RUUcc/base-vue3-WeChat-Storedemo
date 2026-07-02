<template>
  <div class="search-page">
    <van-nav-bar title="搜索结果" left-arrow @click-left="goBack" fixed placeholder />

    <!-- 搜索框 -->
    <div class="search-container">
      <van-search
        v-model="searchKeyword"
        placeholder="请输入搜索关键字"
        shape="round"
        show-action
        @search="handleSearch"
        @clear="handleClear"
      >
        <template #action>
          <div @click="handleSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="!searchKeyword && searchHistory.length > 0">
      <div class="history-header">
        <span>搜索历史</span>
        <van-icon name="delete-o" @click="clearHistory" />
      </div>
      <div class="history-tags">
        <van-tag
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="searchByHistory(item)"
          class="history-tag"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="hot-search" v-if="!searchKeyword && searchResults.length === 0">
      <div class="hot-title">热门搜索</div>
      <div class="hot-tags">
        <van-tag
          v-for="(item, index) in hotKeywords"
          :key="index"
          type="danger"
          @click="searchByHistory(item)"
          class="hot-tag"
        >
          {{ item }}
        </van-tag>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results" v-if="searchKeyword && searchResults.length > 0">
      <div class="result-count">找到 {{ searchResults.length }} 个商品</div>
      <div class="products-grid">
        <div
          class="product-card"
          v-for="product in searchResults"
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

    <!-- 无搜索结果 -->
    <van-empty
      v-if="searchKeyword && searchResults.length === 0"
      description="没有找到相关商品"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products } from '../data/products'

const router = useRouter()
const route = useRoute()
const searchKeyword = ref('')
const searchResults = ref([])
const searchHistory = ref([])

const hotKeywords = ref(['iPhone', 'MacBook', 'iPad', 'AirPods', 'Watch', '手机', '电脑'])

const goBack = () => {
  router.back()
}

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    return
  }

  // 添加到搜索历史
  if (!searchHistory.value.includes(searchKeyword.value)) {
    searchHistory.value.unshift(searchKeyword.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }

  // 执行搜索
  performSearch()
}

const performSearch = () => {
  const keyword = searchKeyword.value.toLowerCase().trim()
  if (!keyword) {
    searchResults.value = []
    return
  }

  searchResults.value = products.filter(product => {
    return (
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
    )
  })
}

const handleClear = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

const searchByHistory = (keyword) => {
  searchKeyword.value = keyword
  handleSearch()
}

const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('searchHistory')
}

const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`)
}

onMounted(() => {
  // 加载搜索历史
  const saved = localStorage.getItem('searchHistory')
  if (saved) {
    searchHistory.value = JSON.parse(saved)
  }

  // 如果有传入的搜索关键词，直接搜索
  const keyword = route.query.keyword
  if (keyword) {
    searchKeyword.value = keyword
    handleSearch()
  }
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}

.search-container {
  background: #fff;
  padding: 10px 16px;
}

.search-history {
  background: #fff;
  padding: 15px 16px;
  margin-top: 10px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #323233;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag {
  cursor: pointer;
}

.hot-search {
  background: #fff;
  padding: 15px 16px;
  margin-top: 10px;
}

.hot-title {
  font-size: 14px;
  color: #323233;
  margin-bottom: 12px;
  font-weight: 500;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hot-tag {
  cursor: pointer;
}

.search-results {
  padding: 10px 16px;
}

.result-count {
  font-size: 14px;
  color: #969799;
  margin-bottom: 15px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
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

