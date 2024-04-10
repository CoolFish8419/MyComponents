<template>
    <div v-if="mode === 'SUCCESS'||mode === 'WARNING'||mode === 'ERROR'||mode==='NOTICE'" class="div_container" v-show="showWrap">
        <div class="div_status" :class='`bg_${mode.toLowerCase()}`'>
            <img v-if="mode === 'SUCCESS'" class="img_show" src="./bg_success.png">
            <img v-if="mode === 'WARNING'" class="img_show" src="./bg_warning.png">
            <img v-if="mode === 'ERROR'" class="img_show" src="./bg_error.png">
            <img v-if="mode === 'NOTICE'" class="img_show" src="./bg_notice.png">
            <div class='txt_toast' :class="{'txt_toast_short':text.length<=lineNumber}" >{{text}}</div>
            <div class="img_close" v-if="text.length>lineNumber" @click="closeToast" ></div>
            <div class="img_close_padding" v-if="text.length<=lineNumber"></div>
        </div>
    </div>
    <div v-else class="div_container_middle" v-show="showWrap">
        <div v-if="mode==='DARK'" class="div_toast_middle bg_dark">
            <div class='txt_toast_origin'>{{text}}</div>
        </div>
        <div v-else class="div_toast_middle bg_origin">
            <div class='txt_toast_origin'>{{text}}</div>
        </div>
    </div>
</template>

<style scoped>
    .div_container{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        font-size: 0;
        z-index: 900;
    }
    .div_container:after{
        content:'';
        display: inline-block;
        height: 100%;
        vertical-align: top;
    }
    .div_container_middle{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        font-size: 0;
        z-index: 900;
    }
    .div_container_middle:after{
        content:'';
        display:inline-block;
        height: 100%;
        vertical-align: middle;
    }
    /* Toast success warning error*/
    .div_status{
        display: inline-block;
        margin-top:72px;
        width: auto;
        max-width:1200px;
        height: auto;
        max-height: 100%;
        text-align: left;
        font-size:0;
        border-radius: 4px;
    }
    .bg_success{
      background-color: #F6FFED;
      border: solid 1px #B7EB8F;
    }
    .bg_warning{
      background-color: #FFFBE6;
      border: solid 1px #FFE58F;
    }
    .bg_error{
      background-color:#FFF1F0;
      border: solid 1px #FFA39E;
    }
    .bg_notice{
      background-color: #EDF4FF;
      border: solid 1px #97BFFF;
    }
    .txt_toast{
        position:relative;
        display: inline-block;
        vertical-align: top;
        margin:7px 8px;
        max-width: calc(100% - 70px);
        width: auto;
        height: auto;
        font-family: PingFangSC-Regular;
        text-align:left;
        font-size: 12px;
        line-height: 20px;
        color: #343a3b;
        word-wrap: break-word;
    }
    .txt_toast_short{
        max-width:calc(100% - 52px);
    }
    .img_show{
        position:relative;
        display: inline-block;
        vertical-align: top;
        margin-top:10px;
        margin-left:15px;
        width:14px;
        height:14px;
    }
    .img_close{
        position:relative;
        display:inline-block;
        vertical-align: top;
        margin-right:7px;
        margin-top:10px;
        margin-left:4px;
        height: 14px;
        width:14px;
        background: url("bg_close_normal.png") no-repeat center;
        background-size:14px 14px;
        cursor:pointer;
    }
    .img_close:hover{
        background: url("bg_close_hover.png") no-repeat center;
        background-size:14px 14px;
    }
    .img_close_padding{
        display:inline-block;
        min-width:8px;
    }
    /* Toast origin dark*/
    .div_toast_middle {
        display: inline-block;
        vertical-align: middle;
        margin:auto;
        max-width: 295px;
        height:auto;
        width: auto;
        max-height: 100%;
        border-radius: 4px;
        overflow: hidden;
        z-index: 10000;
    }
    .bg_origin{
      background-color: rgba(0, 0, 0, 0.6);
    }
    .bg_dark{
      background-color: rgba(255, 255, 255, 0.2);
    }
    .txt_toast_origin {
        display: inline-block;
        vertical-align: middle;
        margin: 9px 16px;
        font-family: PingFangSC-Regular;
        font-size:12px;
        line-height: 18px;
        color: #FFFFFF;
        text-align: center;
        overflow-wrap: break-word;
        word-break: break-all;
    }
</style>
