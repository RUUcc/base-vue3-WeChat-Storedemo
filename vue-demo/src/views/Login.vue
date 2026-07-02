<template>
  <div class="login-page">
    <van-nav-bar title="登录" fixed placeholder />

    <div class="login-card">
      <div class="welcome">欢迎登录微商城</div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="username"
            label="账号"
            placeholder="请输入手机号或邮箱"
            required
            clearable
          />
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            required
            clearable
          />
        </van-cell-group>
        <div class="actions">
          <van-button block round type="primary" native-type="submit">登录</van-button>
          <van-button block round type="default" class="secondary" @click="onRegister">注册</van-button>
        </div>
      </van-form>
      <div class="tips">未注册账号将自动创建体验账户</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'

const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

onMounted(() => {
  // 如果已登录，直接跳转到首页
  const token = localStorage.getItem('token')
  if (token) {
    router.replace('/')
  }
})

const onSubmit = () => {
  if (!form.username || !form.password) {
    showToast('请输入账号和密码')
    return
  }
  // 简单模拟登录
  localStorage.setItem('token', 'mock-token')
  localStorage.setItem('user', JSON.stringify({ name: form.username }))
  showSuccessToast('登录成功')
  // 登录成功后跳转到首页
  setTimeout(() => {
    router.replace('/')
  }, 500)
}

const onRegister = () => {
  showToast('注册功能暂未开放，直接登录体验')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f2f6ff 0%, #ffffff 60%);
  padding: 70px 16px 20px;
}

.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 24px 16px;
}

.welcome {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 20px;
}

.actions {
  margin: 20px 0 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.secondary {
  background: #f7f8fa;
  color: #323233;
}

.tips {
  text-align: center;
  color: #969799;
  font-size: 12px;
  margin-top: 6px;
}
</style>

