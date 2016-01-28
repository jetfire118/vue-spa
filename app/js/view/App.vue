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
    import {eventKey} from '../util'
    import myNav from  '../cpn/myNav.vue'

    export default {
        data () {
            return {
                transWay: 'transleft'
            }
        },
        components:{
            myNav: myNav
        },
        compiled () {
            var _this = this;
            this.$route.router.afterEach(function(){
                _this.$broadcast(eventKey.ROUTER_CHANGE);
            })
        }
    }

</script>