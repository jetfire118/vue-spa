<template>
    <div @click="change">呵呵呵, {{some}}</div>
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
        }
    }
</script>