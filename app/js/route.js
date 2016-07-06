//=========================views==========================
import home from './view/home.vue'
import order from './view/order.vue'
import pageA from './view/pageA.vue'
import my from './view/my.vue'
import my_order from './view/my_order.vue'

//======================routing===========================
export default {
  '/home': {
    name: 'home',
    component: home,
    title: '首页',
    navType: 0
  },
  '/order': {
    component: order,
    title: '下单'
  },
  '/my': {
    name: 'my',
    component: my,
    title: '我的',
    navType: 2
  },
  '/my_order': {
    name: 'my_order',
    component: my_order,
    title: '我的订单',
    navType: 1
  }
}
