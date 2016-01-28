<template>
    <div class="view-pageA">
        <h1 @click="showConfirm=true">pageA</h1>
        <div v-if="y"><a v-link="'pageA'" v-for="list in y.advertList"><img :src="list.imagPath"></a></div>
        <some-cpn></some-cpn>
        <confirm
                :is-show.sync="showConfirm"
                :sure-text="'知道了'"
                @cancel="cancelConfirm"
                @confirm="confirm">
        </confirm>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    import api from '../api'
    import {eventKey, alertMsg} from '../util'
    import someCpn from  '../cpn/someCpn.vue'

    export default {
        name: 'pageA',
        data () {
            return {
                showConfirm: true,
                name: 'jetfire',
                x: null,
                y: null
            }
        },
        route: {
            data () {   //获取数据
                alertMsg('哈哈')
            }
        },
        ready () {
            var data = 2;
            this.$parent.$refs.head.$emit(eventKey.CHANGE_HEAD, data)
            console.log(222);

        },
        components: {
            'some-cpn': someCpn
        },
        methods: {
            update () {

            },
            cancelConfirm ($data) {
                console.log($data);
            },
            confirm ($data) {
                console.log($data);
            }
        }
    }
</script>