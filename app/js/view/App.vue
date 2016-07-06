<template>
    <div id="wrapper">
        <!-- main view -->
        <router-view
            v-ref:pageview
            class="view"
            keep-alive>
        </router-view>
        <my-nav></my-nav>
    </div>
</template>
<script type="text/ecmascript-6">
    import store from '../vuex/store.js' //应用的store对象
    import {setNavType} from '../vuex/actions.js'

    import {eventKey} from '../util'
    import myNav from  '../cpn/myNav.vue'

    export default {
        data () {
            return {
                transWay: 'transleft'
            }
        },
        store: store,   //在根组件加入 store，让它的子组件和 store 连接
        components:{
            myNav: myNav
        },
        compiled () {
            var _this = this;
            this.$route.router.afterEach(function({to, from}){
                //设置导航状态
                if (typeof to.navType != undefined) {
                    _this.setNavType(to.navType)
                }
            })
        },
        vuex: {
            actions: {
                setNavType: setNavType
            }
        },
    }

</script>