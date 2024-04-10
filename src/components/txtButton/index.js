import ButtonComponent from './txtButton.vue'
// 添加install方法 （插件方法）
const Button = {
    install: function (Vue) {
        Vue.component("txtButton", ButtonComponent);
    }
}
// 导出Button
export default Button