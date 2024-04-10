<template>
  <div>
    <div v-for="(item, index) in options"
         :key="index"
         class="cbtn_div_list">
      <label class="cbtn_label_touch_area">
        <input type="checkbox"
               :value="typeof item == 'string' ? item : item.value"
               class="cbtn_input_get_value"
               v-model="selectedValues"
               :disabled="typeof item == 'string' ? false : item.disabled === true">
        <span class="cbtn_img_select_box"
              :class="item.disabled ? 'cbtn_img_select_box_disabled' : ''"></span>
        <span class="cbtn_text_list_item"
              :class="item.disabled ? 'cbtn_text_list_item_disabled' : ''">
          {{ typeof item == "string" ? item : item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkBox",
  data() {
    return {
      selectedValues: []
    };
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    options: {
      type: [String, Array],
      default: []
    }
  },
  watch: {
    selectedValues: {
      immediate: true,
      handler(value) {
        this.$emit("input", value);
      }
    }
  },
  created() {
    this.selectedValues = [...this.value];
  }
};
</script>
<style scoped>
.cbtn_div_list {
  position: relative;
  margin-top: 16px;
  width: 100%;
  height: 16px;
  font-size: 0;
  box-sizing: border-box;
}
.cbtn_input_get_value{
  list-style:none;
  -webkit-appearance: none;
  outline: none;
  display: none;
}
.cbtn_div_list:nth-child(1) {
  margin-top: 0;
}
.cbtn_label_touch_area {
  position: absolute;
  height: 16px;
}
.cbtn_img_select_box {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border-radius: 3px;
  border: solid 1px var(--main-color);
  cursor: pointer;
  box-sizing: border-box;
}
.cbtn_img_select_box:hover {
  background-color: var(--checkbox-color-hover);
}
.cbtn_img_select_box_disabled {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  background-color: var(--checkbox-box-color-disabled);
  border-radius: 3px;
  border: solid 1px var(--border-color-secondary);
  cursor: default;
}
.cbtn_img_select_box_disabled:hover {
  background: var(--checkbox-box-color-disabled) ;
}
.cbtn_input_get_value:checked + .cbtn_img_select_box {
  background: var(--main-color) url("bg_checkbox_selected.png") no-repeat center;
  background-size: 100% 100%;
}
.cbtn_input_get_value:checked + .cbtn_img_select_box_disabled {
  background: var(--checkbox-box-color-disabled) url("bg_checkbox_disabled.png") no-repeat center;
  background-size: 100% 100%;
}
.cbtn_text_list_item {
  position: relative;
  vertical-align: middle;
  width: 36px;
  height: 16px;
  margin-left: 8px;
  font-size: 12px;
  color: var(--font-color-primary);
  line-height: 16px;
  cursor: pointer;
}
.cbtn_text_list_item_disabled {
  color:var(--checkbox-font-color-disabled) ;
  pointer-events: none;
}
</style>

