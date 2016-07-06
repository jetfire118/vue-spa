<template>
    <div v-show="isShow" class="cp_confirm_box js-common-confirm" transition="anm_fade">
        <div class="cp_cover"></div>
        <div class="cp_confirm_flex">
            <div class="cp_confirm_con">
                <div class="cp_confirm_title">
                    <slot name="title"></slot>
                </div>
                <div class="cp_confirm_body">
                    <slot name="content"></slot>
                </div>
                <div class="cp_confirm_btn">
                    <slot name="btn"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        props: {
            isShow: {
                default: false,
                type: Boolean,
                twoWay: true  
            }
        },
        methods: {
            
        }
    }
</script>