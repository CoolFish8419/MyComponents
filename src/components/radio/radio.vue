<template>
  <div>
    <div v-for="(item, index) in options"
         :key="index"
         class="rbtn_div_list">
      <label class="rbtn_label_touch_area">
        <input type="radio"
               class="rbtn_input_get_value"
               :value="typeof item == 'string' ? item : item.value"
               v-model="selectedValue"
               :disabled="typeof item == 'string' ? false : item.disabled">
        <span class="rbtn_img_select_box"
              :class="item.disabled ? 'rbtn_img_select_box_disabled' : '' "></span>
        <span class="rbtn_text_list_item"
              :class="item.disabled ? 'rbtn_text_list_item_disabled' : '' ">
                            {{ typeof item == "string" ? item : item.label }}
                        </span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: "radio",
  data() {
    return {
      selectedValue: ""
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: [String, Array],
      default: []
    }
  },
  watch: {
    selectedValue() {
      this.$emit("input", this.selectedValue);
    }
  },
  created() {
    this.selectedValue = this.value;
  }
};
</script>
<style scoped>
.rbtn_div_list {
  position: relative;
  margin-top: 16px;
  width: 100%;
  height: 16px;
  font-size: 0;
  box-sizing: border-box;
}
.rbtn_div_list:nth-child(1){
  margin-top: 0;
}
.rbtn_input_get_value{
  list-style:none;
  -webkit-appearance: none;
  outline: none;
  display: none;
}
.rbtn_label_touch_area {
  position: absolute;
  height: 16px;
}
.rbtn_img_select_box {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: solid 1px #CCCCCC;
  cursor: pointer;
  box-sizing: border-box;
}
.rbtn_img_select_box:hover {
  background: rgba(0,170,170,0.15);
  border:1px solid #00AAAA  ;
}
.rbtn_img_select_box_disabled {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-color: #F5F5F5;
  border-radius: 8px;
  cursor: default;
}
.rbtn_img_select_box_disabled:hover{
  background-color: #F5F5F5;
  border: solid 1px #CCCCCC;
}
.rbtn_input_get_value:checked + .rbtn_img_select_box {
  background: url("bg_selected.png") no-repeat center;
  background-size: 100% 100%;
  border: none;
}
.rbtn_input_get_value:checked + .rbtn_img_select_box_disabled {
  background: url("bg_disable-selected.png") no-repeat center;
  background-size: 100% 100%;
  border: none;
}
.rbtn_text_list_item {
  position: relative;
  vertical-align: middle;
  width: 36px;
  height: 16px;
  margin-left: 8px;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
}
.rbtn_text_list_item_disabled {
  color: #BBBBBB;
  cursor: default;
}
</style>

