import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

//=========================filters========================
import { domain, fromNow } from './filters'


//=======================component========================
//import head from './cpn/head.vue'
import conFirm from './cpn/confirm.vue'

//=========================views==========================
import App from './view/App.vue'
import home from './view/home.vue'
import pageA from './view/pageA.vue'
import my from './view/my.vue'
import NewsView from './cpn/NewsView.vue'


//======================global config=====================
Vue.config.debug = true


//========================install=========================
// install vue-resource
Vue.use(vueResource);
// install router
Vue.use(vueRouter)

//=====================register cpn=======================
//Vue.component('cpn-head', head)
Vue.component('confirm', conFirm)
//================register filters globally===============
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

//======================routing===========================
const router = new vueRouter()

router.map({
    '/news/:page': {
        component: NewsView
    },
    '/home':{
        component: home,
        title: '首页'
    },
    '/pageA': {
        component: pageA,
        title: 'A页面'
    },
    '/my': {
        component: my,
        title: '我的'
    }
})

router.beforeEach(function () {
    window.scrollTo(0, 0)
})


router.redirect({
    '*': '/home'
})

//启动路由 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
