/**
 * Copyright © WarmHeart Intelligence Technology Group (Jiangsu) Co.,Ltd Company, Limited.
 * All Rights Reserved
 */
import Vue from 'vue'
import toastComponent from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = Vue.extend(toastComponent);

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast(toast) {
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text:Object.prototype.toString.call(toast)==="[object String]"?toast:toast.text,
                showWrap:true,    // 是否显示组件
                mode:toast.mode,
                lineNumber:94
            }
        },
        methods:{
            closeToast(){
                toastDom.showWrap=false;
                if(typeof toast.hidden === "function"){
                    toast.hidden();
                }
            }

        }
    });
    document.body.appendChild(toastDom.$el);

    // 过了 duration 时间后隐藏整个组件
     if(toastDom.text.length<=toastDom.lineNumber||(toastDom.mode!=='SUCCESS'&& toastDom.mode!=="WARNING" && toastDom.mode!=="ERROR")) {
         setTimeout(() => {
             toastDom.showWrap = false;
             if (typeof toast.hidden === "function") {
                 toast.hidden();
             }
         }, toast.duration || 3000)
     }
}

export default showToast
