import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)


// 创建一个对象来保存应用的状态
const state = {
  navType: 0 //导航状态
}


// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  NAV_CHANGE(state, navType) {
    state.navType = navType
  }
}



// 整合初始状态和变更函数，我们就得到了我们所需的 store
export default new Vuex.Store({
  state,
  mutations
})
