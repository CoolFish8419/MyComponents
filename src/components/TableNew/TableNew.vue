<template>
  <div class="table-container" ref="componentRef">
    <div class="fixed-column left_fixed" ref="left_fixed" v-if="leftFixedColumns.length&&tableData.length">
      <table>
        <thead>
        <tr>
          <th v-for="column in leftFixedColumns" :key="column.prop" :style="{ width: column.width }"
              class="fixed_header">
            {{ column.label }}
            <div class="btn_box" v-if="getSort(column)">
              <button
                  class="btn_up"
                  @click="handleSort(column.prop,'asc')"
                  :class="{'asc':sortOrder==='asc','desc':sortOrder==='desc'}">
              </button>
              <button
                  class="btn_down"
                  @click="handleSort(column.prop,'desc')"
                  :class="{'asc':sortOrder==='asc','desc':sortOrder==='desc'}">
              </button>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in visibleData"  v-if="tableData.length">
          <td v-for="col in leftFixedColumns" :key="col.prop" class="fixed-cell">
            <template v-if="col.prop === 'operation'">
              <slot></slot>
            </template>
            <div v-else class="txt_td">{{ row[col.prop] }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="scrollable-column " ref="scrollable_columns">
      <table>
        <thead>
        <tr ref="table_head">
          <th class="cbt_table" v-if="multiSelectable">
            <input :class="{partly_checked:isAllselected}" type="checkbox" v-model="selectAll"
                   @change="handleSelectAll">
          </th>
          <th v-for="column in scrollableColumns" class="fixed_header" :key="column.prop"
              :style="{ width: column.width }">
            {{ column.label }}
            <div class="btn_box" v-if="getSort(column)">
              <button
                  class="btn_up"
                  @click="handleSort(column.prop,'asc')"
                  :class="{'asc':sortOrder==='asc','desc':sortOrder==='desc'}">
              </button>
              <button
                  class="btn_down"
                  @click="handleSort(column.prop,'desc')"
                  :class="{'asc':sortOrder==='asc','desc':sortOrder==='desc'}">
              </button>
            </div>
          </th>
        </tr>
        </thead>
        <div v-if="!tableData.length" class="empty_page" ref="empty_page">
          <img class="no_data_bg" src="./bg_no_data.png" style="width: 157px; height: 96px"/>
          <span style="
        font-size: 12px;
        line-height: 20px;
        color: #999999;
        font-weight: bold;
        margin-top: 24px;">
        暂无数据
       </span>
        </div>
        <tbody v-if="tableData.length">
        <tr v-for="row in visibleData">
          <td class="cbt_table" v-if="multiSelectable&&row.id">
            <input type="checkbox" v-model="selectedRows" :value="row">
          </td>
          <td v-for="col in scrollableColumns" :key="col.prop">
            <template v-if="col.prop === 'operation'&&row.id">
              <slot></slot>
            </template>
            <div v-else class="txt_td">
              {{ row[col.prop] }}
            </div>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="fixed-column right_fixed" ref="right_fixed" v-if="rightFixedColumns.length&&tableData.length" style="margin-left: 300px">
      <table>
        <thead>
        <tr>
          <th v-for="column in rightFixedColumns" :key="column.prop" :style="{ width: column.width }"
              class="fixed_header">
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in visibleData">
          <td v-for="col in rightFixedColumns" :key="col.prop" class="fixed-cell">
            <template v-if="col.prop === 'operation'&&row.id">
              <slot></slot>
            </template>
            <div v-else class="txt_td">{{ row[col.prop] }}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "selectedRows",
    event: "select"
  },
  name: "Table",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    multiSelectable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [],
      selectedRows: [],
      selectAll: false,
      visibleData: [],
      sortOrder: ""
    };
  },
  computed: {
    leftFixedColumns() {
      return this.columns.filter(column => column.fixed === "left");
    },
    rightFixedColumns() {
      return this.columns.filter(column => column.fixed === "right");
    },
    scrollableColumns() {
      return this.columns.filter(column => !column.fixed);
    },
    isAllselected() {
      if (this.selectedRows.length !== 0 && this.selectedRows.length !== this.tableData.length) {
        return true;
      }
      if (this.selectedRows.length && this.selectedRows.length === this.tableData.length) return false;
      if (this.selectedRows.length === 0) {
        this.selectAll = false;
        this.selectedRows = [];
        return false;
      }
    }

  },
  created() {
    this.makeupBlank();
    this.initColumns();

  },
  mounted() {
    this.changeBox();
    if(this.tableData){
      this.$refs.empty_page.style.height=`${this.$refs.componentRef.offsetHeight - this.$refs.table_head.offsetHeight -1 }px`
    }
  },
  watch: {
    tableData: {
      handler() {
        this.makeupBlank();
        this.initColumns();
        this.changeBox();
      },
      deep: true
    },
    selectedRows(newV) {
      this.$emit("select", newV);
    }

  },
  methods: {
    getSort(column) {
      return column.hasOwnProperty("sort");
    },
    sortData(key) {
      this.visibleData.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
        if (valueA !== "" && valueB !== "") {
          if (valueA < valueB) {
            return this.sortOrder === "asc" ? -1 : 1;
          } else if (valueA > valueB) {
            return this.sortOrder === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        }
      });
    },
    handleSort(key, sortMethod) {
      if (this.sortOrder === sortMethod) {
        this.sortOrder = "";
        this.makeupBlank();
        return;
      }
      if (this.sortOrder !== sortMethod) {
        this.sortOrder = sortMethod;
        this.sortData(key);
      }

    },
    changeBox() {
      const containerWidth = this.$refs.componentRef.offsetWidth;
      console.log(this.$refs.componentRef.offsetWidth)
      if (this.leftFixedColumns.length) {
        //左侧栏固定调整
        this.$refs.scrollable_columns.style.marginLeft = `${this.$refs.left_fixed.offsetWidth - 1}px`;
        this.$refs.left_fixed.style.height = `${this.$refs.scrollable_columns.offsetHeight}px`;
      }
      if (this.rightFixedColumns.length) {
        this.$refs.right_fixed.style.height = `${this.$refs.scrollable_columns.offsetHeight}px`;
        //同步高度
        const rightWidth = this.$refs.right_fixed.offsetWidth;
        console.log(rightWidth,this.$refs.componentRef.offsetWidth)
        this.$refs.scrollable_columns.style.width = `${containerWidth - rightWidth }px`;
        const scrollableWidth = this.$refs.scrollable_columns.offsetWidth;
        this.$refs.right_fixed.style.marginLeft = `${scrollableWidth - 1}px`;


        if (this.rightFixedColumns.length && this.leftFixedColumns.length) {
          this.$refs.right_fixed.style.marginLeft = `${scrollableWidth + this.$refs.left_fixed.offsetWidth - 1}px`;
        }
      }

      if (this.visibleData.length > 8) {
        this.$refs.scrollable_columns.style.width = "1600px";
      }

    },
    makeupBlank() {
      if (this.tableData.length) {
        this.$nextTick(() => {
          const componentHeight = this.$refs.componentRef.offsetHeight;
          const emptyRows = Math.floor((componentHeight - 60) / 56);
          const visibleData = [...this.tableData];

          if (emptyRows < 10) {
            for (let i = this.tableData.length; i < emptyRows; i++) {
              visibleData.push({id: ``}); // 添加空白行数据
            }
          }
          if (emptyRows >= 10) {
            for (let i = this.tableData.length; i < 10; i++) {
              visibleData.push({id: ``}); // 添加空白行数据
            }
          }
          this.visibleData = visibleData; // 更新 visibleData
        });
      }
    },
    initColumns() {
      this.columns = this.$slots.default
          .filter(vnode => vnode.componentOptions && vnode.componentOptions.Ctor.options.name === "TableColumn")
          .map(vnode => vnode.componentOptions.propsData);
    },
    handleSelectAll() {
      if (this.selectAll) {
        this.selectedRows = this.tableData.slice();
      } else {
        this.selectedRows = []; // 清空选中行数组
      }
    }
  }

};
</script>

<style scoped>
.table-container {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  top: 0;

}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.empty_page {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.scrollable-column{
  position: absolute;
  overflow-x: scroll;
  overflow-y: hidden;
}

.scrollable-column table {

  min-height: 400px;

}
th, td {
  padding: 8px;
  border: none;
  box-sizing: border-box;
}

th {
  top: 0;
  height: 22px;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  color: #4A4A4A;
  background-color: #EDF0F3;
}

.btn_box {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  top: -5px;
  width: 12px;
  height: 14px;
  margin-left: 10px;
}

.btn_box button {
  cursor: pointer;
  width: 12px;
  height: 6px;
  border: none;
  background-size: 12px 6px;
}

.btn_box .btn_up {
  background: url("./icon_sort_up.png") no-repeat center center;
  background-size: 12px 6px;
}

.btn_box .btn_down {
  margin-top: 2px;
  background: url("./icon_sort_down.png") no-repeat center center;
  background-size: 12px 6px;
}

.btn_box .btn_up:hover {
  background: url("./icon_sort_up_hover.png") no-repeat center center;
  background-size: 12px 6px;
}

.btn_box .btn_down:hover {
  background: url("./icon_sort_down_hover.png") no-repeat center center;
  background-size: 12px 6px;
}

.btn_box .btn_up.asc {
  background: url("./icon_sort_up_active.png") no-repeat center center;
  background-size: 12px 6px;
}

.btn_box .btn_down.desc {
  background: url("./icon_sort_down_active.png") no-repeat center center;
  background-size: 12px 6px;
}

tr {
  background-color: #FFFFFF;
  border: solid 1px #EEEEEE;
}

td {
  box-sizing: border-box;
  height: 56px;
  line-height: 16px;
  text-align: center;
}

.txt_td {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  color: #333333;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 控制行数 */
  -webkit-box-orient: vertical;
}

.cbt_table {
  width: 10px;
}

input {
  width: 16px;
  height: 16px;
}

.cbt_table input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

.cbt_table input[type="checkbox"] {
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border-radius: 3px;
  border: solid 1px #CCCCCC;
  cursor: pointer;
}

.cbt_table input[type="checkbox"]:checked {
  width: 16px;
  height: 16px;
  background: url("./bg_checkbox_selected.png") var(--main-color) center center;
  background-size: 16px 16px;
  border-radius: 3px;
  border: none;
}

.cbt_table input[type="checkbox"].partly_checked {
  border: none;
  background: url("./icon_select_partly.png") var(--main-color) center center;
  background-size: 16px 16px;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
}

.fixed-column {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: none;

}

.left_fixed {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.right_fixed {
  min-width: 100px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.scrollable-column {
  top: 0;
}

.fixed_header {
  position: sticky;
  height: 40px;
  top: 0;
  z-index: 1;
  background-color: #EDF0F3;
}

.div_operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.fixed-cell {
  position: sticky;
  background-color: #FFFFFF;
}

::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度 */
  height: 6px; /* 滚动条宽度 */
}

::-webkit-scrollbar-track {
  background: #F1F1F1; /* 滚动条背景颜色 */
  background: none;
}

::-webkit-scrollbar-thumb {
  background: #888888; /* 滚动条滑块颜色 */
  border-radius: 1px;
}

/* 其他浏览器 */
/* Firefox */

</style>