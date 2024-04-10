<template>
    <div v-if="mode==='PRIMARY'">
        <button v-if="disabled" class='btn_basic btn_primary btn_primary_dis' :class="{btn_img:prefixIcon||suffixIcon}">
            <span :class="prefixIcon"+"_disable"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class='btn_basic btn_primary' :class="{btn_img:prefixIcon||suffixIcon}" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
    <div v-else-if="mode==='SECONDARY'">
        <button v-if="disabled" class='btn_basic btn_secondary btn_secondary_dis' :class="{btn_img:prefixIcon||suffixIcon}">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class='btn_basic btn_secondary' :class="{btn_img:prefixIcon||suffixIcon}" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
    <div v-else-if="mode==='OUTLINE'">
        <button v-if="disabled" class='btn_basic btn_outline btn_outline_dis' :class="{btn_img:prefixIcon||suffixIcon}">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class='btn_basic btn_outline' :class="{btn_img:prefixIcon||suffixIcon}" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
    <div v-else-if="mode==='GHOST'">
        <button v-if="disabled" class='btn_basic btn_ghost btn_ghost_dis' :class="{btn_img:prefixIcon||suffixIcon}">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class='btn_basic btn_ghost' :class="{btn_img:prefixIcon||suffixIcon}" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
    <div v-else-if="mode==='LABEL'">
        <button v-if="disabled" class='btn_basic btn_label btn_label_dis' :class="{btn_img:prefixIcon||suffixIcon}">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class='btn_basic btn_label' :class="{btn_img:prefixIcon||suffixIcon}" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
    <div v-else-if="mode==='TEXT'">
        <button v-if="disabled" class="btn_text btn_text_dis">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
        <button v-else class="btn_text" @click="_click">
            <span :class="prefixIcon"></span>
            <slot></slot>
            <span :class="suffixIcon"></span></button>
    </div>
</template>
<script>
    export default {
        name: "csButton",
        props:{
            mode:{
                type:String,
                default:'PRIMARY'
            },
            disabled:{
                type:Boolean,
                default: false,
            },
            prefixIcon:{
                type:String,
                default:'',
            },
            suffixIcon:{
                type:String,
                default:'',
            },
        },
        methods:{
            _click(){
                this.$emit('click');
            }
        }
    }
</script>

<style scoped>
    .cs_img_search{
        display: inline-block;
        margin-right:8px;
        width: 20px;
        height: 20px;
        background: url("./bg_search.png") no-repeat center/20px 20px;
    }
    .cs_img_reset{
        display: inline-block;
        margin-right:8px;
        width: 20px;
        height: 20px;
        background: url("./bg_reset_normal.png") no-repeat center/20px 20px;
    }
    .cs_img_export{
        display: inline-block;
        margin-left:12px;
        width: 20px;
        height: 20px;
        background: url("./bg_export_normal.png") no-repeat center/20px 20px;
    }
    .btn_basic{
        display: flex;
        align-items: center;
        height: 40px;
        width: auto;
        padding:9px 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        border-radius: 4px;
        white-space: nowrap;
        cursor: pointer;
    }
    .btn_img{
        height: 32px;
        padding: 5px 20px;
    }
    /*primary*/
    .btn_primary{
        color: #FFFFFF;
        background-color: #4A84FA;
    }
    .btn_primary:hover, .btn_primary:focus{
        background-color: #6D9CFB;
    }
    .btn_primary:active{
        background-color: #3E70D4;
    }
    .btn_primary_dis{
        background-color: #AEC8FD;
        pointer-events: none;
    }
    /*secondary*/
    .btn_secondary{
        color: #666666;
        background-color: #FFFFFF;
        border:solid 1px #CCCCCC;
    }
    .btn_secondary:hover, .btn_secondary:focus{
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }
    .btn_secondary:active{
        color:#333333;
        border:solid 1px #AAAAAA;
    }
    .btn_secondary_dis{
        color: #BBBBBB;
        background-color: #F5F5F5;
        border: solid 1px #DDDDDD;
        pointer-events: none;
    }
    /*Outline*/
    .btn_outline{
        color: #4A84FA;
        background-color: transparent;
        border:solid 1px #4A84FA;
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
        color: #AEC8FD;
        border: solid 1px #AEC8FD;
        pointer-events: none;
    }
    /*ghost*/
    .btn_ghost{
        color: #4A84FA;
        background-color:rgba(74, 132, 250, 0.08);
        border-radius: 4px;
    }
    .btn_ghost:hover{
        color:#6D9CFB;
        background-color: #F1F6FF;
        border: solid 1px #AEC9FD;
    }
    .btn_ghost:focus{
        color:#6D9CFB;
        background-color: rgba(74, 132, 250, 0.06);
        border:none;
    }
    .btn_ghost:active{
        color:#3E70D4;
        background-color: rgba(62, 112, 212, 0.08);
        border:none;
    }
    .btn_ghost_dis{
        color: #AEC8FD;
        background-color: rgba(74, 132, 250, 0.08);
        pointer-events: none;
    }
    /*label*/
    .btn_label{
        color: #4A84FA;
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px rgba(74, 132, 250, 0.3);
    }
    .btn_label:hover, .btn_label:focus{
        color:#4A84FA;
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px #4A84FA;
    }
    .btn_label:active{
        color:#3E70D4;
        background-color: rgba(62, 112, 212, 0.05);
        border: solid 1px #3E70D4;
    }
    .btn_label_dis{
        color:rgba(74, 132, 250, 0.45);
        background-color: rgba(74, 132, 250, 0.05);
        border: solid 1px rgba(74, 132, 250, 0.3);
        pointer-events:none;
    }
    /*text*/
    .btn_text{
        display: flex;
        align-items: center;
        height: 20px;
        width: auto;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 20px;
        color: #4A84FA;
        background-color: transparent;
        white-space: nowrap;
        cursor:pointer;
    }
    .btn_text:hover, .btn_text:focus{
        color:#6D9CFB;
    }
    .btn_text:active{
        color:#3E70D4;
    }
    .btn_text_dis{
        color: #AEC8FD;
        pointer-events: none;
    }
</style>