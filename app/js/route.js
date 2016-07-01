//=========================views==========================
import home from './view/home.vue'
import order from './view/order.vue'
import pageA from './view/pageA.vue'
import my from './view/my.vue'
import NewsView from './cpn/NewsView.vue'



//======================routing===========================
export default {
  '/news/:page': {
    component: NewsView
  },
  '/home': {
    component: home,
    title: '首页',
    navType: 0
  },
  '/order': {
    component: order,
    title: '下单'
  },
  '/pageA': {
    component: pageA,
    title: 'A页面'
  },
  '/my': {
    component: my,
    title: '我的',
    navType: 2
  }
}
