<template>
  <div class="addresses-page">
    <van-nav-bar title="收货地址" left-arrow @click-left="goBack" fixed placeholder>
      <template #right>
        <van-icon name="plus" size="20px" @click="addAddress" />
      </template>
    </van-nav-bar>

    <div class="addresses-list" v-if="addresses.length > 0">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="address-item"
        @click="editAddress(address)"
      >
        <div class="address-header">
          <div class="address-name-phone">
            <span class="name">{{ address.name }}</span>
            <span class="phone">{{ address.phone }}</span>
            <van-tag v-if="address.isDefault" type="danger" size="mini">默认</van-tag>
          </div>
          <div class="address-actions">
            <van-button
              size="mini"
              type="primary"
              plain
              @click.stop="setDefault(address.id)"
            >
              设为默认
            </van-button>
            <van-button
              size="mini"
              type="danger"
              plain
              @click.stop="deleteAddress(address.id)"
            >
              删除
            </van-button>
          </div>
        </div>
        <div class="address-detail">
          {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
        </div>
      </div>
    </div>

    <van-empty v-else description="暂无收货地址" />

    <!-- 添加/编辑地址弹窗 -->
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="address-form">
        <div class="form-header">
          <span>{{ editingAddress ? '编辑地址' : '新增地址' }}</span>
          <van-icon name="cross" @click="closePopup" />
        </div>
        <van-form @submit="saveAddress">
          <van-cell-group inset>
            <van-field
              v-model="form.name"
              name="name"
              label="收货人"
              placeholder="请输入收货人姓名"
              required
              clearable
            />
            <van-field
              v-model="form.phone"
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
              type="tel"
              required
              clearable
            />
            <van-field
              v-model="form.province"
              name="province"
              label="省份"
              placeholder="请输入省份"
              required
              clearable
            />
            <van-field
              v-model="form.city"
              name="city"
              label="城市"
              placeholder="请输入城市"
              required
              clearable
            />
            <van-field
              v-model="form.district"
              name="district"
              label="区县"
              placeholder="请输入区县"
              required
              clearable
            />
            <van-field
              v-model="form.detail"
              name="detail"
              label="详细地址"
              placeholder="请输入详细地址"
              required
              clearable
            />
            <van-cell title="设为默认地址">
              <template #right-icon>
                <van-switch v-model="form.isDefault" />
              </template>
            </van-cell>
          </van-cell-group>
          <div class="form-actions">
            <van-button block type="primary" native-type="submit">保存</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast, showConfirmDialog } from 'vant'

const router = useRouter()
const showPopup = ref(false)
const editingAddress = ref(null)

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false
})

// 从localStorage获取地址列表
const addresses = ref([])

const loadAddresses = () => {
  const saved = localStorage.getItem('addresses')
  if (saved) {
    addresses.value = JSON.parse(saved)
  } else {
    // 默认地址
    addresses.value = [
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        province: '北京市',
        city: '北京市',
        district: '朝阳区',
        detail: '某某街道某某号',
        isDefault: true
      }
    ]
    localStorage.setItem('addresses', JSON.stringify(addresses.value))
  }
}

const goBack = () => {
  router.back()
}

const addAddress = () => {
  editingAddress.value = null
  resetForm()
  showPopup.value = true
}

const editAddress = (address) => {
  editingAddress.value = address
  form.name = address.name
  form.phone = address.phone
  form.province = address.province
  form.city = address.city
  form.district = address.district
  form.detail = address.detail
  form.isDefault = address.isDefault
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.province = ''
  form.city = ''
  form.district = ''
  form.detail = ''
  form.isDefault = false
}

const saveAddress = () => {
  if (!form.name || !form.phone || !form.province || !form.city || !form.district || !form.detail) {
    showSuccessToast('请填写完整信息')
    return
  }

  if (editingAddress.value) {
    // 编辑地址
    const index = addresses.value.findIndex(addr => addr.id === editingAddress.value.id)
    if (index > -1) {
      addresses.value[index] = {
        ...editingAddress.value,
        ...form
      }
    }
  } else {
    // 新增地址
    const newAddress = {
      id: Date.now(),
      ...form
    }
    addresses.value.push(newAddress)
  }

  // 如果设为默认，取消其他默认地址
  if (form.isDefault) {
    addresses.value.forEach(addr => {
      if (addr.id !== (editingAddress.value?.id || addresses.value[addresses.value.length - 1].id)) {
        addr.isDefault = false
      }
    })
  }

  localStorage.setItem('addresses', JSON.stringify(addresses.value))
  showSuccessToast(editingAddress.value ? '保存成功' : '添加成功')
  closePopup()
}

const setDefault = (id) => {
  addresses.value.forEach(addr => {
    addr.isDefault = addr.id === id
  })
  localStorage.setItem('addresses', JSON.stringify(addresses.value))
  showSuccessToast('设置成功')
}

const deleteAddress = (id) => {
  showConfirmDialog({
    title: '删除地址',
    message: '确定要删除这个地址吗？'
  })
    .then(() => {
      const index = addresses.value.findIndex(addr => addr.id === id)
      if (index > -1) {
        addresses.value.splice(index, 1)
        localStorage.setItem('addresses', JSON.stringify(addresses.value))
        showSuccessToast('删除成功')
      }
    })
    .catch(() => {})
}

onMounted(() => {
  loadAddresses()
})
</script>

<style scoped>
.addresses-page {
  min-height: 100vh;
  background: #f7f8fa;
  padding-bottom: 20px;
}

.addresses-list {
  padding: 10px;
}

.address-item {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.address-name-phone {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name {
  font-size: 15px;
  font-weight: 500;
  color: #323233;
}

.phone {
  font-size: 14px;
  color: #646566;
}

.address-actions {
  display: flex;
  gap: 8px;
}

.address-detail {
  font-size: 14px;
  color: #646566;
  line-height: 1.5;
}

.address-form {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebedf0;
}

.form-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebedf0;
}
</style>

