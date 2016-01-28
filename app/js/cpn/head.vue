<template>
    <div class="cp_flex_row">
        <a @click="goBack">后退</a>
        <h1>{{title}}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                title: 'my app'
            }
        },
        events: {
            //路由变化事件监听
            'router-change' () {
                this.$data.title = this.$route.title;
            },
            //外部修改事件
            'change-head' (data) {
                this.change(data);
            }
        },
        methods: {
            change (data) {
                console.log(data);
            },
            goBack () {
                history.go(-1);
            }
        }
    }
</script>