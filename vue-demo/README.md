# 微商城 (Mini Mall)

一个基于 Vue 3 构建的移动端电商应用，提供商品浏览、搜索、购物车、订单管理等核心购物功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | ^3.5 | 前端框架 |
| [Vite](https://vite.dev/) | ^7.2 | 构建工具 |
| [Vue Router](https://router.vuejs.org/) | ^4.6 | 路由管理 |
| [Vant](https://vant-ui.github.io/) | ^4.9 | 移动端 UI 组件库 |

## 功能模块

- **首页** — 轮播图、功能入口（限时抢购/品牌特卖/新品首发/每日签到）、每周上新、热销商品
- **分类** — 商品分类浏览
- **商品详情** — 商品图片、价格、描述、加入购物车
- **购物车** — 商品选择/取消、数量调整、总价计算
- **搜索** — 关键字搜索商品
- **消息** — 消息列表与详情
- **我的** — 个人中心（订单、收藏、地址管理）
- **登录** — Token 鉴权、路由守卫拦截、退出登录

## 项目结构

```
vue-demo/
├── index.html                  # 入口 HTML
├── vite.config.js              # Vite 配置
├── package.json
└── src/
    ├── main.js                 # 应用入口，注册插件
    ├── App.vue                 # 根组件
    ├── style.css               # 全局样式
    ├── router/
    │   └── index.js            # 路由配置（含登录守卫）
    ├── store/
    │   └── index.js            # 响应式状态管理（购物车、登录状态）
    ├── data/
    │   ├── products.js         # 商品数据
    │   └── *.jpg               # 商品/轮播图片
    ├── views/
    │   ├── Home.vue            # 首页
    │   ├── Category.vue        # 分类页
    │   ├── ProductDetail.vue   # 商品详情页
    │   ├── Cart.vue            # 购物车页
    │   ├── Search.vue          # 搜索页
    │   ├── Message.vue         # 消息列表页
    │   ├── MessageDetail.vue   # 消息详情页
    │   ├── Login.vue           # 登录页
    │   ├── Mine.vue            # 个人中心
    │   ├── Orders.vue          # 订单页
    │   ├── Favorites.vue       # 收藏页
    │   └── Addresses.vue       # 地址管理页
    └── components/
        └── HelloWorld.vue      # 示例组件
```

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18

### 安装依赖

```bash
cd vue-demo
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## 路由说明

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 默认首页 |
| `/category` | 分类 | 商品分类浏览 |
| `/product/:id` | 商品详情 | 动态路由，按 ID 显示商品 |
| `/search` | 搜索 | 支持关键字搜索 |
| `/cart` | 购物车 | 购物车管理 |
| `/message` | 消息列表 | 查看消息 |
| `/message/:id` | 消息详情 | 查看消息详情 |
| `/mine` | 个人中心 | 我的页面 |
| `/login` | 登录 | 用户登录 |
| `/orders` | 订单 | 我的订单 |
| `/favorites` | 收藏 | 我的收藏 |
| `/addresses` | 地址管理 | 收货地址管理 |

路由使用 `beforeEach` 守卫进行登录拦截：未登录用户访问任何页面都会被重定向到 `/login`；已登录用户访问登录页则重定向到首页。

## 状态管理

使用 Vue 3 `reactive` 实现轻量级状态管理，管理购物车和登录状态：

- `cart` — 购物车商品列表（含数量、选中状态）
- `isLoggedIn` — 登录状态
- `addToCart` / `removeFromCart` / `updateQuantity` — 购物车操作
- `login` / `logout` / `checkLogin` — 登录状态操作
- `getTotalPrice` / `getTotalCount` — 购物车计算（仅计算选中商品）
