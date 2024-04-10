<template>
    <div v-if="show" class="div_container">
        <div class="div_dialog_notification">
            <div class="title_notice_container">
              <span class="img_notice"></span>
              <span class="title_notice">提示</span>
            </div>
            <div class='txt_notification' :class="{txt_center:text.length<=22}">{{text}}</div>
            <div v-if="notice.length" class='txt_hint' :class="{txt_center:text.length<=22}">{{notice}}</div>
            <div :class="text.length<=22?'btn_mart_40':'btn_mart_24'">
                <button @click="cancel()" v-if="btns.includes('CANCEL')"
                        class="btn_dialog_cancel" >取消</button>
                <button @click="confirm()" v-if="btns.includes('CONFIRM')"
                        class="btn_dialog_confirm">确认</button>
            </div>
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
        font-size: 0;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 900;
    }
    .div_container:after {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
    .div_dialog_notification{
        display: inline-block;
        transform: translateY(50%);
        width:374px;
        padding: 24px 32px 32px;
        background-color: #FFFFFF;
    }
    .title_notice_container{
        position: relative;
        height: 18px;
    }
    .img_notice{
        float: left;
        width: 18px;
        height: 18px;
        background: var(--main-color, #00AAAA) url("./bg_i.png") no-repeat center;
        background-size: 18px 18px;
        border-radius: 50%;
    }
    .title_notice{
        float: left;
        margin-left: 12px;
        font-weight: bold;
        font-size: 16px;
        line-height: 18px;
        color: var(--font-color-primary,#333333);
    }
    .txt_notification{
        position: relative;
        margin-top: 24px;
        width: 100%;
        font-size: 14px;
        line-height: 22px;
        color: var(--font-color-primary,#333333);
        text-align: left;
        word-wrap: break-word;
    }
    .txt_hint{
        position: relative;
        margin-top: 12px;
        width: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #FFB54C;
        text-align: left;
        word-wrap: break-word;
    }
    .btn_dialog_cancel{
        margin: 0 12px;
        width: 68px;
        height: 36px;
        font-size: 14px;
        color: #666666;
        text-align: center;
        background-color: #EEEEEE;
        border-radius: 2px;
    }
    .btn_dialog_confirm{
        margin: 0 12px;
        width: 68px;
        height: 36px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        background-color: var(--main-color, #00AAAA);
        border-radius: 2px;
    }
    .txt_center{
        text-align: center;
    }
    .btn_mart_24{
      margin-top: 24px;
    }
    .btn_mart_40{
        margin-top: 40px;
    }
</style>
