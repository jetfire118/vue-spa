<template>
    <div v-show="isShow" class="cp_confirm_box js-common-confirm" transition="anm_fade">
        <div class="cp_cover"></div>
        <div class="cp_confirm_flex">
            <div class="cp_confirm_con">
                <div class="cp_confirm_title"></div>
                <div class="cp_confirm_body">
                    <slot name="content"></slot>
                </div>
                <div class="cp_confirm_btn">
                    <div class="btn c_yellow" @click="sure">{{sureText}}</div>
                    <div class="btn"  @click="cancel">{{cancelText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                content: '点解啊劳动法'
            }
        },
        props: {
            isShow: {
                default: false
            },
            sureText: {
                default: '确定'
            },
            cancelText: {
                default: '取消'
            }
        },
        methods: {
            cancel () {
                this.$data.isShow = false;
                this.$dispatch('cancel', this.$data);
            },
            sure () {
                this.$data.isShow = false;
                this.$dispatch('sure', this.$data);
            }
        }
    }
</script>