import { reactive } from 'vue'

export const store = reactive({
  cart: [],
  isLoggedIn: false,
  
  checkLogin() {
    const token = localStorage.getItem('token')
    this.isLoggedIn = !!token
    return this.isLoggedIn
  },
  
  login() {
    this.isLoggedIn = true
  },
  
  logout() {
    this.isLoggedIn = false
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  
  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
        selected: false
      })
    }
  },
  
  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.id === productId)
    if (index > -1) {
      this.cart.splice(index, 1)
    }
  },
  
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  },
  
  toggleSelect(productId) {
    const item = this.cart.find(item => item.id === productId)
    if (item) {
      item.selected = !item.selected
    }
  },
  
  getTotalPrice() {
    return this.cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
  },
  
  getTotalCount() {
    return this.cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.quantity, 0)
  }
})

