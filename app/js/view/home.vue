<template>
    <div class="view-home">
        <banner></banner>
        <ul class="list">
            <li v-for="item in listOne" class="item">
                <img class="img" >
                <div class="info">
                    <h6>标题标题标题标题</h6>
                    <p class="p1">价格：234</p>
                    <p>今日可购量：234</p>
                </div>
                <p class="dfn">描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
                <i class="level">AAAAA</i>
                <a class="c_btn c_btn_s c_btn_primary buy">下单</a>
            </li>
            <li v-for="item in listTwo" class="item">
                <img class="img" >
                <div class="info">
                    <h6>标题标题标题标题</h6>
                    <p class="p1">价格：234</p>
                    <p>今日可购量：234</p>
                </div>
                <p class="dfn">描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
                <i class="level">AAAAA</i>
                <a class="c_btn c_btn_s c_btn_primary buy">下单</a>
            </li>
            <li v-for="item in listThree" class="item">
                <img class="img" >
                <div class="info">
                    <h6>标题标题标题标题</h6>
                    <p class="p1">价格：234</p>
                    <p>今日可购量：234</p>
                </div>
                <p class="dfn">描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
                <i class="level">AAAAA</i>
                <a class="c_btn c_btn_s c_btn_primary buy">下单</a>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import {incrementCounter} from '../vuex/actions.js'
import api from '../api'
import banner from '../cpn/banner.vue'

export default {

    name: 'home',
    components: {
        banner: banner
    },

    data () {
        return {
            list: [1, 2, 3, 4]
        }
    },
    computed: {
        listOne () {
            return this.list.length > 3 ? this.list.slice(0, 3) : this.list.slice(0, 1)
        },
        listTwo () {
            return this.list.length > 3 ? this.list.slice(3, 6) : this.list.slice(1, 2)
        },
        listThree () {
            return this.list.length > 3 ? this.list.slice(6) : this.list.slice(2, 3)
        }
    },
    route: {
        data () {   //获取数据

//            return Promise.all([Vue.http.get(api.homelist), Vue.http.get(api.cityQueryNew)]).then(function([x, y]){
//                console.log(new Date().getTime()+'ajax');
//                return {
//                    x: x.data, y: y.data
//                }
//            })
        }
    },
    vuex: {
        actions: {

        }
    },
    created () {
        console.log(new Date().getTime()+'created');
    },

    compiled () {
        console.log(new Date().getTime()+'compiled');
    },

    ready () {
        console.log(new Date().getTime()+'ready');
    },

    destroyed () {
    },

    methods: {
        update () {

        },
        go () {
            this.$route.router.replace('my');
        }
    }
}
</script>