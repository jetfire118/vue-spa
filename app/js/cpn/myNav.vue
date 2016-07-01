<template>
    <ul class="cp_nav cp_flex_row">
        <li :class="{cur: navType == 0}">商品</li>
        <li :class="{cur: navType == 1}"><i class="c_icon60 c_icon_list"></i><span class="c_v_mid">订单</span></li>
        <li :class="{cur: navType == 2}"><i class="c_icon60 c_icon_my"></i><span class="c_v_mid">我</span></li>
    </ul>
</template>

<script type="text/ecmascript-6">


    export default {
        data () {
            return {
                some: 'sb'
            }
        },
        methods: {
            change () {
                this.$data.some = 'nb'
            }
        },
        vuex: {
            getters: {
                navType (state) {
                    return state.navType
                }
            }
        }
    }
</script>