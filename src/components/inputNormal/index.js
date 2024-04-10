import InputComponent from './inputNormal.vue'
// 添加install方法 （插件方法）
const Input = {
    install: function (Vue) {
        Vue.component("inputNormal", InputComponent);
    }
}

export default Input