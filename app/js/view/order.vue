<template>
    <div class="view-order">
        <section class="cp_section">

        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import api from '../api'

    export default {

        name: 'order',

        components: {

        },

        data () {
            return {
                list: [1, 2, 3, 4]
            }
        },
        computed: {

        },
        route: {
            data () {   //获取数据

            }
        },

        ready () {

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