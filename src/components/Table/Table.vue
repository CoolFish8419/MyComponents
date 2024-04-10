
<template>
  <div class="table_container" ref="componentRef">
    <table class="left_fixed" ref="left_fixed" v-if="hasFixedLeft && tableData.length">
      <thead>
      <tr>
        <th v-for="column in leftFixedColumns" :key="column.key" :style="{ width: getColumnNameWidth(column.key) }">{{ column.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in visibleData" :key="item.id">
        <td v-for="column in leftFixedColumns" :key="column.key">
          <template v-if="column.key === 'operation'">
            <slot :item="item"></slot>
          </template>
          <template v-else>
            <div class="txt_td">{{ item[column.key] }}</div>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <table class="main-table" ref="main_table">
      <thead>
      <tr>
        <th v-for="column in mainColumns" :key="column.key" :style="{ width: getColumnNameWidth(column.key) }">{{ column.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in visibleData" :key="item.id">
        <td v-for="column in mainColumns" :key="column.key">
          <template v-if="column.key === 'operation'">
            <slot v-if="item.id" :item="item"></slot>
          </template>
          <template v-else>
            <div class="txt_td">{{ item[column.key] }}</div>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="!tableData.length" class="empty_page">
      <img class="no_data_bg" src="./bg_no_data.png" style="width: 157px; height: 96px"></img>
      <span style="
        font-size: 12px;
        line-height: 20px;
        color: #999999;
        font-weight: bold;
        margin-top: 24px;">
        暂无数据</span>
    </div>
    <table class="right_fixed" ref="right_fixed" v-if="hasFixedRight&&tableData.length">
      <thead>
      <tr>
        <th v-for="column in rightFixedColumns" :key="column.key" :style="{ width: getColumnNameWidth(column.key) }">{{ column.label }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in visibleData" :key="item.id">
        <td v-for="column in rightFixedColumns" :key="column.key">
          <template v-if="column.key === 'operation'">
            <slot v-if="item.id" :item="item"></slot>
          </template>
          <template v-else>
            <div class="txt_td">{{ item[column.key] }}</div>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableNew",
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
  },
  render(h) {
    return h('div', [
      this.$slots.default()
    ])
  },
  data() {
    return {
      visibleData: [], // 初始化为空数组
      leftFixedColumns:[],
      rightFixedColumns:[],
      hasFixedLeft:false,
      mainColumns:[],
      hasFixedRight:false,
    };
  },
  created() {
    this.updateValue()

  },
  mounted() {
    if (this.rightFixedColumns.length > 0&&this.tableData.length){
      const rightTableWidth = this.$refs.right_fixed.offsetWidth;
    }
    const containerWidth = this.$refs.componentRef.offsetWidth;

    if (this.tableData.length > 0) {
      this.getEmptyNum();
    }
    if(this.hasFixedLeft){
      this.$refs.main_table.style.left = '150px';
    }
    if(this.hasFixedRight){
      this.$refs.right_fixed.style.left = `${containerWidth-rightTableWidth}px`;
      // this.$refs.main_table.style.width = '150px';
      // this.$refs.main_table.style.minwidth = '150px';
    }

    if(this.mainColumns.length<5){
      this.$refs.main_table.style.width = '100%'
      this.$refs.main_table.style.height = '100%'
    }
    if(this.mainColumns.length>10){
      this.$refs.main_table.style.width = '2000px'
    }
  },
  watch:{
    tableData(newV){
      this.updateValue()
      this.getEmptyNum();
    }
  },
  methods: {
    getColumnNameWidth(columnKey) {
      const column = this.columns.find(col => col.key === columnKey);
      if (column && column.width) {
        return column.width;
      }
      return 'auto'; // 返回默认的宽度
    },
    updateValue(){
      this.leftFixedColumns=this.columns.filter(column => column.fixed === "left")
      this.rightFixedColumns=this.columns.filter(column => column.fixed === "right")
      this.mainColumns=this.columns.filter(column => !column.fixed);
      if(this.leftFixedColumns.length > 0&&this.tableData.length) this.hasFixedLeft=true;
      if(this.rightFixedColumns.length > 0&&this.tableData.length) this.hasFixedRight=true;
    },
    handleOperationClick(operation) {
      this.$emit("operationClicked", operation);
    },
    getEmptyNum() {
      if (this.tableData.length) {
        this.$nextTick(() => {
          const componentHeight = this.$refs.componentRef.offsetHeight;
          const emptyRows = Math.floor((componentHeight - 40 ) / 56);
          const visibleData = [...this.tableData];
          if(emptyRows)
          for (let i = this.tableData.length ; i < 10; i++) {
            visibleData.push({ id: `` }); // 添加空白行数据
          }
          this.visibleData = visibleData; // 更新 visibleData
        });
      }
    }
  },

};
</script>

<style scoped>
.table_container {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width:100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}

table {
  position: relative;
  table-layout: fixed;
  flex-grow: 1;
  height: auto;
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;
}

.divider {
  width: 1px;
  height: 18px;
  border: 1px solid #dddddd;
  background-color: #dddddd;
}

th, td {
  padding: 8px;
  border: none;
}
th {
  position: sticky;
  top: 0;
  height: 22px;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  color: #4A4A4A;
  background-color: #EDF0F3;
}
.txt_td{
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
tr {
  background-color: #FFFFFF;
  border: solid 1px #EEEEEE;
}

td {
  box-sizing: border-box;
  height: 56px;
  line-height: 16px;

}
.left_fixed,
.right_fixed {
  position: sticky;
  width: 150px;
  top: 0;
  box-sizing: border-box;
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.left_fixed {
  left: 0;
  z-index: 1;
}
.right_fixed {
  z-index: 1;
}
.main-table {
  position: absolute;


}
.empty_page{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>