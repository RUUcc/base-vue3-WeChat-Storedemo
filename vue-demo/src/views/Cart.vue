<template>
  <div class="cart-page">
    <van-nav-bar title="购物车" fixed placeholder />

    <div v-if="cartItems.length === 0" class="empty-cart">
      <van-empty description="购物车是空的" />
    </div>

    <div v-else class="cart-content">
      <van-checkbox-group v-model="checkedItems" @change="onCheckedChange">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="cart-item"
        >
          <van-checkbox :name="item.id" />
          <img :src="item.image" :alt="item.name" class="product-image" />
          <div class="product-info">
            <div class="product-name">{{ item.name }}</div>
            <div class="product-price">¥{{ item.price }}</div>
            <div class="quantity-control">
              <van-button
                size="mini"
                icon="minus"
                @click="decreaseQuantity(item.id)"
                :disabled="item.quantity <= 1"
              />
              <span class="quantity">{{ item.quantity }}</span>
              <van-button
                size="mini"
                icon="plus"
                @click="increaseQuantity(item.id)"
              />
            </div>
          </div>
          <van-button
            type="danger"
            size="mini"
            icon="delete"
            @click="removeItem(item.id)"
            class="delete-btn"
          >
            删除
          </van-button>
        </div>
      </van-checkbox-group>
    </div>

    <!-- 底部结算栏 -->
    <div class="cart-footer" v-if="cartItems.length > 0">
      <van-checkbox
        :model-value="isAllChecked"
        @update:model-value="toggleAll"
      >
        全选
      </van-checkbox>
      <div class="footer-info">
        <div class="total-price">
          <span class="label">合计：</span>
          <span class="price">¥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <van-button
          type="danger"
          class="checkout-btn"
          @click="checkout"
        >
          结算({{ totalCount }})
        </van-button>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { showConfirmDialog, showSuccessToast } from 'vant'

const router = useRouter()
const checkedItems = ref([])
const activeTab = ref(3)

const cartItems = computed(() => {
  return store.cart.map(item => ({
    ...item,
    image: item.image || 'https://img.yzcdn.cn/vant/apple-1.jpg'
  }))
})

const cartCount = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return store.getTotalPrice()
})

const totalCount = computed(() => {
  return store.getTotalCount()
})

const isAllChecked = computed(() => {
  return cartItems.value.length > 0 && checkedItems.value.length === cartItems.value.length
})

const onCheckedChange = () => {
  cartItems.value.forEach(item => {
    const shouldBeSelected = checkedItems.value.includes(item.id)
    if (shouldBeSelected && !item.selected) {
      store.toggleSelect(item.id)
    } else if (!shouldBeSelected && item.selected) {
      store.toggleSelect(item.id)
    }
  })
}

const toggleAll = (checked) => {
  if (checked) {
    checkedItems.value = cartItems.value.map(item => item.id)
    cartItems.value.forEach(item => {
      if (!item.selected) {
        store.toggleSelect(item.id)
      }
    })
  } else {
    checkedItems.value = []
    cartItems.value.forEach(item => {
      if (item.selected) {
        store.toggleSelect(item.id)
      }
    })
  }
}

const increaseQuantity = (productId) => {
  const item = store.cart.find(item => item.id === productId)
  if (item) {
    store.updateQuantity(productId, item.quantity + 1)
  }
}

const decreaseQuantity = (productId) => {
  const item = store.cart.find(item => item.id === productId)
  if (item && item.quantity > 1) {
    store.updateQuantity(productId, item.quantity - 1)
  }
}

const removeItem = (productId) => {
  showConfirmDialog({
    title: '确认删除',
    message: '确定要删除这个商品吗？'
  })
    .then(() => {
      store.removeFromCart(productId)
      checkedItems.value = checkedItems.value.filter(id => id !== productId)
      showSuccessToast('已删除')
    })
    .catch(() => {
      // 取消删除
    })
}

const checkout = () => {
  if (checkedItems.value.length === 0) {
    showSuccessToast('请选择要结算的商品')
    return
  }
  showSuccessToast('结算功能开发中')
}

const onTabChange = (index) => {
  const routes = ['/', '/category', '/message', '/cart', '/mine']
  router.push(routes[index])
}

watch(cartItems, (newItems) => {
  checkedItems.value = newItems.filter(item => item.selected).map(item => item.id)
}, { immediate: true, deep: true })

onMounted(() => {
  checkedItems.value = cartItems.value.filter(item => item.selected).map(item => item.id)
})
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding-bottom: 100px;
  background: #f7f8fa;
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.cart-content {
  padding: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  gap: 10px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-size: 14px;
  color: #323233;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 16px;
  color: #ee0a24;
  font-weight: bold;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-size: 14px;
}

.delete-btn {
  align-self: flex-start;
}

.cart-footer {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.total-price {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.total-price .label {
  font-size: 14px;
  color: #646566;
}

.total-price .price {
  font-size: 18px;
  color: #ee0a24;
  font-weight: bold;
}

.checkout-btn {
  min-width: 100px;
}
</style>

