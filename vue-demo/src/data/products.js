// 商品数据
export const products = [
  {
    id: 1,
    name: '苹果 iPhone 15',
    price: 5999,
    originalPrice: 6999,
    stock: 100,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
    description: 'iPhone 15 采用A16芯片，配备6.1英寸超视网膜XDR显示屏，拥有出色的拍照和视频功能。'
  },
  {
    id: 2,
    name: '华为 Mate 60',
    price: 6999,
    originalPrice: 7999,
    stock: 80,
    image: 'src/data/OIP.jpg',
    images: [
      'src/data/OIP.jpg',
      'src/data/OIP.jpg',
      'src/data/OIP.jpg'
    ],
    description: '华为 Mate 60 搭载麒麟9000S芯片，配备6.69英寸OLED屏幕，支持5G网络，拥有强大的拍照能力。'
  },
  {
    id: 3,
    name: '小米 14',
    price: 3999,
    originalPrice: 4299,
    stock: 150,
    image: 'https://th.bing.com/th/id/OIP.6aVw6pn8Mnui6oxWgOo5tQHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    images: [
      'https://img.yzcdn.cn/vant/apple-3.jpg',
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ],
    description: '小米 14 搭载骁龙8 Gen3处理器，配备6.36英寸AMOLED屏幕，拥有徕卡影像系统。'
  },
  {
    id: 4,
    name: 'OPPO Find X7',
    price: 4999,
    originalPrice: 5499,
    stock: 120,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
    description: 'OPPO Find X7 搭载天玑9300芯片，配备6.78英寸AMOLED屏幕，拥有哈苏影像系统。'
  },
  {
    id: 5,
    name: 'MacBook Pro',
    price: 12999,
    originalPrice: 14999,
    stock: 50,
    image: new URL('./MacBook Pro.jpg', import.meta.url).href,
    images: [
      new URL('./MacBook Pro.jpg', import.meta.url).href
    ],
    description: 'MacBook Pro 搭载M3芯片，配备14英寸Liquid Retina XDR显示屏，拥有强大的性能和续航能力。'
  },
  {
    id: 6,
    name: 'iPad Air',
    price: 4599,
    originalPrice: 4999,
    stock: 90,
    image: new URL('./iPad Air.jpg', import.meta.url).href,
    images: [
      new URL('./iPad Air.jpg', import.meta.url).href
    ],
    description: 'iPad Air 搭载M2芯片，配备10.9英寸Liquid Retina显示屏，支持Apple Pencil和妙控键盘。'
  },
  {
    id: 7,
    name: 'AirPods Pro',
    price: 1899,
    originalPrice: 1999,
    stock: 200,
    image: new URL('./AirPods Pro.jpg', import.meta.url).href,
    images: [
      new URL('./AirPods Pro.jpg', import.meta.url).href
    ],
    description: 'AirPods Pro 配备主动降噪功能，拥有空间音频和自适应均衡器，提供卓越的音频体验。'
  },
  {
    id: 8,
    name: 'Apple Watch',
    price: 2999,
    originalPrice: 3199,
    stock: 150,
    image: new URL('./Apple Watch.jpg', import.meta.url).href,
    images: [
      new URL('./Apple Watch.jpg', import.meta.url).href
    ],
    description: 'Apple Watch Series 9 配备S9芯片，拥有健康监测、运动追踪等功能，支持全天候显示。'
  },
  {
    id: 9,
    name: '洗衣机',
    price: 1999,
    originalPrice: 2299,
    stock: 80,
    image: 'https://tse3.mm.bing.net/th/id/OIP.Idabc7MNGCFIJqjkE2gsvQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    images: [
      'https://tse3.mm.bing.net/th/id/OIP.Idabc7MNGCFIJqjkE2gsvQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://tse3.mm.bing.net/th/id/OIP.Idabc7MNGCFIJqjkE2gsvQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    description: '全自动洗衣机，拥有多种洗涤模式，节能环保，操作简单。'
  },
  {
    id: 10,
    name: '空调',
    price: 2499,
    originalPrice: 2799,
    stock: 60,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ],
    description: '变频空调，快速制冷制热，静音运行，节能省电。'
  },
  {
    id: 11,
    name: 'T恤',
    price: 99,
    originalPrice: 129,
    stock: 500,
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ],
    description: '纯棉T恤，舒适透气，多色可选，适合日常穿着。'
  },
  {
    id: 12,
    name: '牛仔裤',
    price: 199,
    originalPrice: 249,
    stock: 300,
    image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
    description: '经典牛仔裤，版型修身，面料舒适，百搭款式。'
  },
  {
    id: 13,
    name: '运动鞋',
    price: 299,
    originalPrice: 399,
    stock: 200,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ],
    description: '舒适运动鞋，透气性好，适合跑步和日常运动。'
  },
  {
    id: 14,
    name: '面膜',
    price: 59,
    originalPrice: 79,
    stock: 1000,
    image: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-2.jpg'
    ],
    description: '补水保湿面膜，深层滋养，适合各种肤质。'
  },
  {
    id: 15,
    name: '精华',
    price: 299,
    originalPrice: 399,
    stock: 200,
    image: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
    description: '抗衰老精华，提亮肤色，紧致肌肤，适合日常护肤。'
  },
  {
    id: 16,
    name: '口红',
    price: 199,
    originalPrice: 249,
    stock: 400,
    image: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    images: [
      'https://img.yzcdn.cn/vant/apple-1.jpg'
    ],
    description: '持久不脱色口红，多色可选，滋润不干燥。'
  }
]

// 根据ID获取商品
export function getProductById(id) {
  return products.find(product => product.id === Number(id)) || products[0]
}

