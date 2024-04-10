import InputComponent from './input-dark.vue'
// 添加install方法 （插件方法）
const Input = {
    install: function (Vue) {
        Vue.component("input-dark", InputComponent);
    }
}

export default Input