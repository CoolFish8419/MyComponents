<template>
  <div class="div_dialog_operation">
    <div class="div_dialog_operation_notice">
      <div class="div_dialog_operation_notice_square"></div>
      <span>{{ title }}</span>
    </div>
    <div class="table_text_container" v-if="displayStyle === 'table'">
      <table class="table_detail">
        <tr v-for="(value, key, index) in data" :key="key">
          <td class="td_detail_key" :style="{'text-align': textAlign}">{{ key }}</td>
          <td class="td_detail_value" :class="{odd:index % 2 === 1}" ref="showValue">{{ value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "基本信息"
    },
    data: {
      type: Object,
      required: true
    },
    textAlign: {
      type: String,
      default: "left"
    },
    displayStyle: {
      type: String,
      default: "normal"
    }
  },
  mounted() {
      this.$refs.showValue.forEach(item=>{
        if(item.offsetWidth>272){
          item.parentElement.style.width=`800px`;
          item.style.width=`672px`;
          item.style.borderRight= '1px solid #EEEEEE'
        }
      });
  },
};
</script>
<style scoped>
.div_dialog_operation {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 318px;
  background-color: #FFFFFF;
}

.table_detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-spacing: 0;
}

.normal_text_container {
  box-sizing: content-box;
  position: relative;
  padding: 16px 18px 18px 42px;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.table_text_container {
  box-sizing: content-box;
  position: relative;
  padding: 16px 18px 18px 24px;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.table_detail tr {
  display: flex;
  width: auto;
  min-height: 44px;
  min-width: 400px;
}

.table_detail td {
  height: 100%;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
  border-top: 1px solid #EEEEEE;
  border-left: 1px solid #EEEEEE;
}


.td_detail_key,
.td_detail_value {
  padding: 12px 16px;
  display: inline-block;
  vertical-align: top;
}
.td_detail_key {
  width: 128px;
  background-color: #FBFCFE;
  color: #86909C;
}

.td_detail_value {
  width: fit-content;
  min-width: 272px;
  color: #666666;
}

.table_detail:nth-last-child(1) {
  border-bottom: 1px solid #EEEEEE;
}

.td_detail_value.odd {
  border-right: 1px solid #EEEEEE;
}


.row {
  margin-top: 12px;
  display: grid;
  font-size: 12px;
  grid-template-columns: 11em auto;
  grid-gap: 12px;
}

.row:nth-child(1) {
  margin-top: 0;
}

.div_dialog_operation_notice {
  position: relative;
  top: 0;
  left: 0;
  margin-top: 24px;
  margin-left: 24px;
  height: 20px;
}

.div_dialog_operation_notice_square {
  display: inline-block;
  width: 6px;
  height: 16px;
  background-color: var(--main-color, #00AAAA);
  vertical-align: center;
}

.div_dialog_operation_notice span {
  height: 20px;
  margin-left: 12px;
  vertical-align: top;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #485465;
}
</style>
