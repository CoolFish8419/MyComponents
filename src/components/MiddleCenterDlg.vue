<template>
  <div class="dialog_mask" @click.self="maskClick" tabindex="10" @keydown.enter.stop="$emit('keydown')">
    <div class="middle_center_dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MiddleCenterDlg",
    props:{
      maskClick:{
        type: Function,
        default:function () {

        }
      }
    }
  }
</script>

<style scoped>
  /* 弹窗 */
  .dialog_mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    text-align: center;
    font-size: 0;
    white-space: nowrap;
    /* overflow: auto; */
    z-index: 900;
  }
  .dialog_mask:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  .middle_center_dialog{
    display: inline-block;
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    text-align: left;
    white-space: normal;
    /* overflow: auto; */
    vertical-align: middle;
  }
</style>