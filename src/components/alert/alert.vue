<template>
  <div v-if="show" class="ui_div_dialog">
    <div class="ui_dialog_container div_alert_dialog">
      <div class="ui_title_dialog">提示</div>
      <div class="ui_hint_dialog_common">
        <div class="ui_txt_hint_dialog_common" v-html="text"></div>
      </div>
      <!--确定取消按钮-->
      <button
        @click="confirm()"
        class="cs_btn_dialog ui_btn_common ui_btn_confirm_dialog_common"
        :style="confirm_style"
        type="button"
      >
        {{ confirmText }}
      </button>
      <button
        v-if="showBtnCancel"
        @click="cancel()"
        class="cs_btn_ghost_dialog ui_btn_cancel_dialog_common"
        type="button"
      >
        {{ cancelText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.div_alert_dialog {
  width: 500px;
  height: 340px;
  padding: 32px 40px 40px 40px;
}
.ui_div_dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.ui_dialog_container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.ui_title_dialog {
  position: relative;
  width: 100%;
  height: 28px;
  font-size: 22px;
  line-height: 28px;
  color: var(--font-color-primary,#333333);
  text-align: center;
  font-weight: bold;
}
.ui_hint_dialog_common {
  position: absolute;
  top: 113px;
  width: 420px;
  height: 80px;
  line-height: 80px;
  overflow: hidden;
}
.ui_txt_hint_dialog_common {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: var(--font-color-primary,#333333);
  text-align: center;
  word-wrap: break-word;
}
.ui_btn_cancel_dialog_common {
  position: absolute;
  left: 40px;
  bottom: 40px;
}
.ui_btn_confirm_dialog_common {
  position: absolute;
  right: 40px;
  bottom: 40px;
}
</style>
