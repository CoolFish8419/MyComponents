
import Vue from 'vue'
import alertComponent from './alert.vue'

// 返回一个 扩展实例构造器
const AlertConstructor = Vue.extend(alertComponent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showAlert(text, click, showBtnCancel,title = '提示',confirmText,cancelText) {
  const alertDom = new AlertConstructor({
    el: document.createElement('div'),
    data() {
      return {
        show: true,
        text: text,
        title: title,
        confirmText: confirmText?confirmText:'确定',
        cancelText: cancelText?cancelText:'取消',
        showBtnCancel: showBtnCancel,
        confirm_style: {
          left: showBtnCancel? "280px":"160px"
        }
      }
    },
    methods: {
      confirm: function () {
        click(true);
        this.show = false;
      },
      cancel: function () {
        click(false);
        this.show = false;
      }
    }
  })
  document.body.appendChild(alertDom.$el)

}

// 注册为全局组件的函数
function registryAlert() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  Vue.prototype.$alert = showAlert
}

export default registryAlert
