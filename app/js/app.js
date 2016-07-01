import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

import routerConfig from './route'
//入口页面
import App from './view/App.vue'
//=========================filters========================
import { domain, fromNow } from './filters'


//=======================component========================
//import head from './cpn/head.vue'
import conFirm from './cpn/confirm.vue'



//======================global config=====================
Vue.config.debug = true

Vue.mixin({
  created() {
    this.setNavType()
  },
  vuex: {
    actions: {
      setNavType({ dispatch }) {
        if (this.$route && this.$route.navType) {
          dispatch('NAV_CHANGE', this.$route.navType)
        }
      }
    }
  }
})

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

router.map(routerConfig)

router.beforeEach(function() {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/home'
})


//启动路由 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
