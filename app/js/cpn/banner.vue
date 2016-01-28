<template>
    <div class="cp_banner">
        <ul class="cp_banner-list">
            <li v-for="item in list" class="item">
                <a v-link="item.href"><img :src="item.url" ></a>
            </li>
        </ul>
        <ul v-if="list.length>1" class="cp_banner-dot">
            <li v-for="item in list" class="item"></li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {

            }
        },
        props:{
            list: {
                type: Object,
                default: function (){
                    return [
                        {href:'', url:'./img/tmp.png'}
                    ]
                }
            }
        },
        methods: {

        }
    }
</script>