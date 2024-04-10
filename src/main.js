import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from 'vue-cookies'
import store from "./store";
import i18n from "./i18n" //
import 'csui/css/csui.css';
import "./assets/css/global.css";
import "./assets/css/ui_inquiry.css";
import "./assets/css/ui_style.css";
import "./assets/css/ui_configure.css";
import "./assets/css/common.css";
import "./assets/css/theme.css";
import mixin from "./utils/mixin";
import routerToClear from "./utils/session-conf";
import StorageConst from "./utils/StorageConst";
import installToast from "./components/toast";
import installLoading from "csui/components/loading";
import installReClick from 'csui/directive/preventReClick';
import limit from "@/utils/limit";
import installAlert from "csui/components/alert";
import webSelect from 'csui/components/WebSelect';
Vue.component('web-select', webSelect);
import searchSelect from 'csui/components/SearchSelect';
Vue.component('search-select', searchSelect);
import Tab from '@/components/backTab';
Vue.component('Tab', Tab);
import Page from '@/components/Page';
Vue.component('Page', Page);
import Empty from '@/components/Empty';
Vue.component('Empty', Empty);
import { Select, Option, OptionGroup } from 'element-ui';
Vue.use(Select).use(Option).use(OptionGroup);
import CheckBox from '@/components/checkbox/checkbox';
Vue.component('CheckBox',CheckBox);
import Radio from '@/components/radio/radio';
Vue.component('Radio',Radio);
import Login from '@/components/Login/LoginNew';
Vue.component("Login",Login);
import LoginInputLeft from '@/components/Login/LoginInputLeft';
Vue.component("LoginInputLeft",LoginInputLeft);
import TitleBar from '@/components/titleBar/titleBar';
Vue.component("TitleBar",TitleBar);
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';
Vue.component("DropdownMenu",DropdownMenu);
// import StepProgress from '@/components/StepProgress/StepProgress';
// Vue.component("StepProgress",StepProgress);
import WebSelectNew from '@/components/WebSelectNew/WebSelectNew';
Vue.component('WebSelectNew', WebSelectNew);
import MultiWebSelect from '@/components/MultiWebSelect/MultiWebSelect';
Vue.component('MultiWebSelect', MultiWebSelect);
import MainPage from "@/components/MainPage/MainPage.vue";
Vue.component("MainPage",MainPage);
import SearchSelectNew from '@/components/SearchSelectNew/SearchSelectNew';
Vue.component('SearchSelectNew', SearchSelectNew);
import LeftNavigationBar from '@/components/LeftNavigationBar/LeftNavigationBar';
Vue.component('LeftNavigationBar', LeftNavigationBar);
import Cascader from '@/components/Cascader/CascaderNew/Cascader';
Vue.component('Cascader', Cascader);
import SwitchChanger from '@/components/SwitchChanger/SwitchChanger';
Vue.component('SwitchChanger', SwitchChanger);
import DropdownList from '@/components/DropdownList/DropdownList';
Vue.component('DropdownList', DropdownList);
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import TableLibrary from "./components/TableNew";
Vue.use(TableLibrary);
Vue.component('BreadCrumb', BreadCrumb);
import inputNormal from "./components/inputNormal/inputNormal";
Vue.component('input-normal',inputNormal);
import alertOperation from '@/components/alertOperation/alertOperation';
Vue.component('alertOperation', alertOperation);
import DetailDescription from '@/components/DetailDescription/DetailDescription';
Vue.component('DetailDescription', DetailDescription);
import txtButton from '@/components/txtButton'
Vue.use(txtButton);
import inputdark from "@/components/input-dark";
Vue.use(inputdark);
import csButton from '@/components/csButton';
Vue.use(csButton);
import tableLibrary from '@/components/TableNew'
Vue.use(tableLibrary)
import installToastDark from '@/components/toast-dark';
Vue.prototype.$limit = limit;
Vue.config.productionTip = false;
import WhParameter from 'csui/parameter/WhParameter';

Vue.prototype.$WhParameter = WhParameter;
Vue.prototype.$config = window.config;
Vue.prototype.$toast = installToast;
Vue.prototype.$alert = installAlert;
Vue.use(VueCookies);
Vue.mixin(mixin);
Vue.use(installLoading);
Vue.use(installReClick);
// 根据路由设置标题
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if (to.meta.title) {
        document.title = window.config.Login_Name;
    }
    /*localStorage清空配置*/
    for (let name in routerToClear) {
        if (routerToClear.hasOwnProperty(name) && routerToClear[name] === to.name) {
            for (let key in StorageConst.LOCAL_PAGE_LIST) {
                localStorage.setItem(StorageConst.LOCAL_PAGE_LIST[key], "");
            }
            break;
        }
    }
    next();
});
Vue.prototype.btnHome = () => router.push({name: 'Home'});

new Vue({
    router,
    store,
    // i18n,
    render: h => h(App)
}).$mount("#app");
