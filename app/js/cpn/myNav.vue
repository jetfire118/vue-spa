<template>
    <ul class="cp_nav cp_flex_row">
        <li :class="{cur: navType == 0}" @click="changeNav(0)">商品</li>
        <li :class="{cur: navType == 1}" @click="changeNav(1)"><i class="c_icon60 c_icon_list"></i><span class="c_v_mid">订单</span></li>
        <li :class="{cur: navType == 2}" @click="changeNav(2)"><i class="c_icon60 c_icon_my"></i><span class="c_v_mid">我</span></li>
    </ul>
</template>

<script type="text/ecmascript-6">
import {setNavType} from '../vuex/actions.js'

    export default {
        data () {
            return {
                navList: [
                    {name: 'home'},
                    {name: 'my_order'},
                    {name: 'my'}
                ]
            }
        },
        methods: {
            changeNav (type) {
                this.setNavType(type);
                this.$route.router.go(this.navList[type])
            }
        },
        vuex: {
            actions: {
                setNavType: setNavType
            },
            getters: {
                navType (state) {
                    return state.navType
                }
            }
        }
    }
</script>