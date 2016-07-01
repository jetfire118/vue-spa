//action会赋值到vuex对象下面，action方法会收到store对象作为第一个参数
//Vuex.Store实例对象 store = {dispatch, state, ...}
export const incrementCounter = function({ dispatch }) {
  dispatch('INCREMENT', 1)
}
