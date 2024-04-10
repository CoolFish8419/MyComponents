/**
 * Copyright © WarmHeart Intelligence Technology Group (Jiangsu) Co.,Ltd Company, Limited.
 * All Rights Reserved
 */
import Vue from 'vue'
import alertComponent from './alertNew.vue'

// 返回一个 扩展实例构造器
const AlertConstructor = Vue.extend(alertComponent);

// 定义弹出组件的函数
function showAlert(obj) {
    const alertDom = new AlertConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: obj.text||'',
                notice: obj.notice||'',
                show: true,
                btns:obj.btns||['CANCEL','CONFIRM'],
            }
        },
        methods: {
            defaultClick(){
            },
            confirm: function () {
                obj.click = obj.click || this.defaultClick;
                obj.click(true);
                this.show = false;
            },
            cancel: function () {
                obj.click = obj.click || this.defaultClick;
                obj.click(false);
                this.show = false;
            },
        }
    });
    document.body.appendChild(alertDom.$el)
}


export default showAlert
