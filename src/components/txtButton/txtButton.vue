<template>
    <div v-if="mode==='PRIMARY'">
        <button v-if="disabled" class='btn_primary_dis'><slot></slot></button>
        <button v-else class='btn_primary' @click="_click"><slot></slot></button>
    </div>
    <div v-else-if="mode==='SECONDARY'">
        <button v-if="disabled" class='btn_secondary_dis'><slot></slot></button>
        <button v-else class='btn_secondary' @click="_click"><slot></slot></button>
    </div>
    <div v-else-if="mode==='OUTLINE'">
        <button v-if="disabled" class='btn_outline_dis'><slot></slot></button>
        <button v-else class='btn_outline' @click="_click"><slot></slot></button>
    </div>
    <div v-else-if="mode==='GHOST'">
        <button v-if="disabled" class='btn_ghost_dis'><slot></slot></button>
        <button v-else class='btn_ghost' @click="_click"><slot></slot></button>
    </div>
    <div v-else-if="mode==='LABEL'">
        <button v-if="disabled" class='btn_label_dis'><slot></slot></button>
        <button v-else class='btn_label' @click="_click"><slot></slot></button>
    </div>
    <div v-else-if="mode==='TEXT'">
        <button v-if="disabled" class="btn_text_dis" ><slot></slot></button>
        <button v-else class="btn_text"  @click="_click"><slot></slot></button>
    </div>
</template>

<script>
    export default {
        name: "txtButton",
        props:{
            mode:{
                type:String,
                default:'TEXT'
            },
            disabled:{
                type:Boolean,
                default: false,
            }
        },
        methods:{
            _click(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    /*primary*/
    .btn_primary{
        height: 40px;
        width: auto;
        padding: 9px 32px;
        border-radius: 4px;
        background-color: #4A84FA;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #FFFFFF;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_primary:hover, .btn_primary:focus{
        background-color: #6D9CFB;
    }
    .btn_primary:active{
        background-color: #3E70D4;
    }
    .btn_primary_dis{
        width: auto;
        height: 40px;
        padding:9px 32px;
        border-radius: 4px;
        background-color: #AEC8FD;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #FFFFFF;
        white-space: nowrap;
        box-sizing: border-box;
    }
    /*secondary*/
    .btn_secondary{
        height: 40px;
        width: auto;
        padding:9px 32px;
        border-radius: 4px;
        background-color: #FFFFFF;
        border:solid 1px #CCCCCC;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #666666;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_secondary:hover, .btn_secondary:focus{
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }
    .btn_secondary:active{
        color:#333333;
        border:solid 1px #AAAAAA;
    }
    .btn_secondary_dis{
        width: auto;
        height: 40px;
        padding:9px 32px;
        border-radius: 4px;
        background-color: #F5F5F5;
        border: solid 1px #DDDDDD;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #BBBBBB;
        white-space: nowrap;
        box-sizing: border-box;
    }
    /*Outline*/
    .btn_outline{
        height: 40px;
        width: auto;
        padding:9px 32px;
        border-radius: 4px;
        border:solid 1px #4A84FA;
        background-color: #FFFFFF;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #4A84FA;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_outline:hover, .btn_outline:focus{
        border: solid 1px #6D9CFB;
        color:#6D9CFB;
    }
    .btn_outline:active{
        color:#3E70D4;
        border:solid 1px #3E70D4;
    }
    .btn_outline_dis{
        width: auto;
        height: 40px;
        padding:9px 32px;
        border-radius: 4px;
        border: solid 1px #AEC8FD;
        background-color: #FFFFFF;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #AEC8FD;
        white-space: nowrap;
        box-sizing: border-box;
    }
    /*ghost*/
    .btn_ghost{
        height: 40px;
        width: auto;
        padding:9px 32px;
        border-radius: 4px;
        background-color:rgba(74, 132, 250, 0.08);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #4A84FA;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_ghost:hover{
        background-color: #F1F6FF;
        border: solid 1px #AEC9FD;
        color:#6D9CFB;
    }
    .btn_ghost:focus{
        color:#6D9CFB;
        border:none;
        background-color: rgba(74, 132, 250, 0.06);
    }
    .btn_ghost:active{
        color:#3E70D4;
        border:none;
        background-color: rgba(62, 112, 212, 0.08);
    }
    .btn_ghost_dis{
        width: auto;
        height: 40px;
        padding:9px 32px;
        border-radius: 4px;
        background-color: rgba(74, 132, 250, 0.08);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #AEC8FD;
        white-space: nowrap;
        box-sizing: border-box;
    }
    /*label*/
    .btn_label{
        height: 40px;
        width:  auto;
        padding:9px 32px;
        border-radius: 4px;
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px rgba(74, 132, 250, 0.3);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #4A84FA;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_label:hover, .btn_label:focus{
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px #4A84FA;
        color:#4A84FA;
    }
    .btn_label:active{
        color:#3E70D4;
        background-color: rgba(62, 112, 212, 0.05);
        border: solid 1px #3E70D4;
    }
    .btn_label_dis{
        width: auto;
        height: 40px;
        padding:9px 32px;
        border-radius: 4px;
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px rgba(74, 132, 250, 0.3);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color:rgba(74, 132, 250, 0.45);
        white-space: nowrap;
        box-sizing: border-box;
    }
    /*text*/
    .btn_text{
        height: 20px;
        width: auto;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 20px;
        background-color: transparent;
        color: #4A84FA;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .btn_text:hover{
        color:#6D9CFB;
    }
    .btn_text:focus{
        color:#6D9CFB;
    }
    .btn_text:active{
        color:#3E70D4;
    }
    .btn_text_dis{
        height: 20px;
        width: auto;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 20px;
        background-color: transparent;
        color: #AEC8FD;
        white-space: nowrap;
        box-sizing: border-box;
    }
</style>