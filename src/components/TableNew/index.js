import Table from './TableNew.vue'
import TableColumn from "./TableColumn.vue";
export default {
  install(Vue){
    Vue.component("Table",Table)
    Vue.component("TableColumn",TableColumn)
  }
}
