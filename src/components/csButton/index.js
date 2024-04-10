import ButtonComponent from './csButton.vue'
// 添加install方法 （插件方法）
const Button = {
    install: function (Vue) {
        Vue.component("csButton", ButtonComponent);
    }
}
// 导出Button
export default Button