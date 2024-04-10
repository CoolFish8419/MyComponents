import Vue from "vue";
import VueI18n from "vue-i18n"

Vue.use(VueI18n); //注入到所有的子组件
//require.context(path，deep，regExp)
//有3个方法 分别是keys()


// let langFileds = require.context('./config', false, /\.js$/);
// console.log(langFileds)
//
// let regExp = /\.\/([^\.\/]+)\.([^\.]+)$/; //正则用于匹配 ./en.js中的'en'
//
// // regExp.exec('./en.js')
//
import en from './config/en'
import zh from './config/zh'
let messages = {
    en,
    zh
}; //声明一个数据模型，对应i18n中的message属性
console.log(messages)
//
// langFileds.keys().forEach(key => {
//     let prop = regExp.exec(key)[1];//正则匹配en|zh这样的值
//     //messages[prop]相当于 messages['en'] = {table:{...}}
//     messages[prop] = langFileds(key).default
//
// });
// console.log(messages);
// console.log(langFileds('./en.js'));
//
let locale = localStorage.getItem('lang') || "zh"; //从localstorag中获取

console.log(locale)
//
export default new VueI18n({
    locale,//指定语言字段
    messages//定义语言字段
})