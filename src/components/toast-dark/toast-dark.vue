<template>
    <div v-if="mode === 'SUCCESS'||mode === 'WARNING'||mode === 'ERROR'||mode==='NOTICE'" class="div_container" v-show="showWrap">
        <div :class='divClassName'>
            <img v-if="mode === 'SUCCESS'" class="img_show" src="./bg_success.png">
            <img v-if="mode === 'WARNING'" class="img_show" src="./bg_warning.png">
            <img v-if="mode === 'ERROR'" class="img_show" src="./bg_error.png">
            <img v-if="mode === 'NOTICE'" class="img_show" src="./bg_notice.png">
            <div class='txt_toast' :class="{'txt_toast_short':text.length<=lineNumber}" >{{text}}</div>
            <div class="img_close" v-if="text.length>lineNumber" @click="closeToast" ></div>
            <div class="img_close_padding" v-if="text.length<=lineNumber"></div>
        </div>
    </div>
    <div v-else class="div_container_dark" v-show="showWrap">
        <div  class="div_dark">
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
    .div_container_dark{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        font-size: 0;
        z-index: 900;
    }
    .div_container_dark:after{
        content:'';
        display:inline-block;
        height: 100%;
        vertical-align: middle;
    }
    /* Toast success warning error*/
    .div_success{
        display: inline-block;
        width: auto;
        height: auto;
        max-height: 100%;
        text-align: left;
        margin-top:72px;
        background-color: #F6FFED;
        border: solid 1px #B7EB8F;
        border-radius: 4px;
        font-size:0;
        max-width:1200px;
        min-width:10px;
    }
    .div_warning{
        display: inline-block;
        width: auto;
        height: auto;
        max-height: 100%;
        text-align: left;
        margin-top:72px;
        background-color: #FFFBE6;
        border: solid 1px #FFE58F;
        border-radius: 4px;
        font-size:0;
        max-width:1200px;
        min-width: 100px;
    }
    .div_error{
        display: inline-block;
        width: auto;
        height: auto;
        max-height: 100%;
        text-align: left;
        margin-top:72px;
        background-color:#FFF1F0;
        border: solid 1px #FFA39E;
        border-radius: 4px;
        font-size:0;
        max-width:1200px;
    }
    .div_notice{
        display: inline-block;
        width: auto;
        height: auto;
        max-height: 100%;
        text-align: left;
        margin-top:72px;
        background-color: #EDF4FF;
        border: solid 1px #97BFFF;
        border-radius: 4px;
        font-size:0;
        max-width:1200px;
    }
    .txt_toast{
        position:relative;
        display: inline-block;
        vertical-align: top;
        max-width: calc(100% - 70px);
        height: auto;
        font-family: PingFangSC-Regular;
        margin:7px 8px;
        text-align:left;
        font-size: 12px;
        line-height: 20px;
        color: #343a3b;
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
    }
    .img_close:hover{
        background: url("bg_close_hover.png") no-repeat center;
        background-size:14px 14px;
        cursor:pointer;
    }
    .img_close_padding{
        display:inline-block;
        min-width:8px;
    }
    .div_dark{
        display: inline-block;
        height:auto;
        margin:auto;
        max-height: 100%;
        vertical-align: middle;
        max-width: 295px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        overflow: hidden;
        z-index: 10000;
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
    }
</style>