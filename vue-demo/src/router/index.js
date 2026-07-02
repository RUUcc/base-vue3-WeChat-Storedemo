import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Message from '../views/Message.vue'
import Cart from '../views/Cart.vue'
import Mine from '../views/Mine.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import Favorites from '../views/Favorites.vue'
import Addresses from '../views/Addresses.vue'
import Search from '../views/Search.vue'
import MessageDetail from '../views/MessageDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/addresses',
    name: 'Addresses',
    component: Addresses
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/message/:id',
    name: 'MessageDetail',
    component: MessageDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 检查登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoginPage = to.path === '/login'
  
  // 如果已登录且访问登录页，重定向到首页
  if (token && isLoginPage) {
    next('/')
    return
  }
  
  // 如果未登录且不是访问登录页，重定向到登录页
  if (!token && !isLoginPage) {
    next('/login')
    return
  }
  
  next()
})

export default router

