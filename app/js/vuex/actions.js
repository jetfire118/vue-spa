//action会赋值到vuex对象下面，action方法会收到store对象作为第一个参数
//Vuex.Store实例对象 store = {dispatch, state, ...}

//设置导航状态
export const setNavType = ({ dispatch }, navType) => dispatch('NAV_CHANGE', navType)
