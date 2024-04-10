<template>
    <div v-if="showDlg" class="div_container">
        <div class="div_dialog_operation">
            <div class="div_dialog_operation_notice">
                <div class="div_dialog_operation_notice_square"></div>
                <span>{{title}}</span>
            </div>
            <slot>

            </slot>
            <div class="div_btns" v-if="btnShow">
                <button @click="cancel()" class="btn_cancel">取消</button>
                <button @click="confirm()" class="btn_confirm" >确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:'弹窗名称'
            },
            btnShow:{
                type:Boolean,
                default:true
            },
            clickReturn:{
                type:Function,
            },
            showDlg:{
                type:Boolean,
            }
        },
        methods: {
            defaultClick(){
            },
            confirm: function () {
                this.clickReturn = this.clickReturn || this.defaultClick;
                this.clickReturn(true);
            },
            cancel: function () {
                this.clickReturn = this.clickReturn || this.defaultClick;
                this.clickReturn(false);
            },
        }
    }
</script>

<style scoped>
    .div_container{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 900;
    }
    .div_container:after {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: top;
    }
    .div_dialog_operation{
        display: inline-block;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        min-width:318px;
        background-color: #FFFFFF;
        overflow: hidden;
    }
    .div_dialog_operation_notice{
        position: relative;
        top:0;
        left:0;
        margin-top:24px;
        margin-left:24px;
        margin-bottom: 32px;
        height: 20px
    }
    .div_dialog_operation_notice_square{
        display: inline-block;
        width:6px;
        height: 16px;
        background-color: var(--main-color, #00AAAA);
        vertical-align: center;
    }
    .div_dialog_operation_notice span{
        margin-left:12px;
        height: 20px;
        font-family: MicrosoftYaHei-Bold;
        font-size: 14px;
        line-height: 20px;
        color: #494949;
        letter-spacing: 1px;
        vertical-align: top;
    }
    .div_btns{
        margin-top:40px;
        margin-bottom:48px;
        margin-left:calc(50% - 116px);
    }
    .btn_cancel{
        width:92px;
        height:40px;
        font-family: MicrosoftYaHei;
        font-size:14px;
        line-height: 22px;
        color:var(--main-color, #00AAAA);
        background-color:  #FFFFFF;
        border-radius: 4px;
        border:1px var(--main-color, #00AAAA) solid;
        cursor: pointer;
    }
    .btn_confirm{
        margin-left:48px;
        width:92px;
        height:40px;
        font-family: MicrosoftYaHei;
        font-size:14px;
        line-height:22px;
        color:  #FFFFFF;
        background-color: var(--main-color, #00AAAA);
        border-radius: 4px;
        cursor: pointer;
    }
    .btn_confirm:hover{
        background-color: var(--hover-main-color, #00AAAACC);
    }
</style>
