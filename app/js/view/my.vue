<template>
    <div class="view-my">
        <h2 @click="goback">个人中心</h2>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        ready () {
            console.log('e');
        },
        methods: {
            goback () {
                this.$route.router.replace('home')
            }
        }
    }
</script>