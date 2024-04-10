<template>
  <div class="multi_web_select_container">
    <div @click="showOptions()"
         class="multi_web_select"
         :class="{active:isOptionsDisplay,
                  disabled:disabled}"
          ref="inputBox">
      <input v-show="displayValue.length < 1"
             :class="disabled ? 'disableInput' : ''"
             :placeholder="placeholder"
             type="text" readonly="readonly"
             :style="{ 'text-align': isTxtAlign, }"/>
      <div class="selected_items" ref="selectedItems">
        <div v-if="unfold" v-for="(value, index) in displayValue" :key="index" class="display_box">
          <div class="show_text">{{ value }}</div>
          <div class="delete_icon" @click="iconFunc(value)"></div>
        </div>
        <div v-if="!unfold" class="showNum">
          <div v-if="displayValue.length>0" class="display_box">
            <div class="show_text">{{ displayValue[0] }}</div>
            <div class="delete_icon" @click.stop="iconFunc(displayValue[0])"></div>
          </div>
          <div v-if="displayValue.length>1" class="display_box_number">
            {{ `+${displayValue.length-1}` }}
          </div>
        </div>
      </div>
      <ul v-if="options instanceof Array && !disabled" v-show="isOptionsDisplay" ref="list" >
        <li v-for="(option,index) in options" @click.stop="selectOption1(option) "
            :style="{ 'text-align': isTxtAlign }"
            :class="{active:displayValue.includes(option)||displayValue.includes(option[label]),
                     disabled:option.disabled}"
            :title="fullText"
            @mouseenter="showFullText(option)"
            @mouseleave="hideFullText">
          {{ typeof option === "string" ? option : option[label] }}
        </li>
      </ul>

      <ul v-else v-show="isOptionsDisplay && !disabled" ref="list">
        <li v-for="(value, key) in options" @click.stop="selectOption2(value,key)"
            :style="{ 'text-align': isTxtAlign }"
            :class="{active:displayValue.includes(value)}"
            :title="fullText"
            @mouseenter="showFullText(value)"
            @mouseleave="hideFullText">
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { left } from "core-js/internals/array-reduce";

export default {
  name: "WebSelectNew",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    /**
     * 入参Object、Array
     */
    options: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    titlePosition: {
      type: String,
      default: "top"
    },
    label: {
      type: String,
      default: ""
    },
    keyName: {
      type: String,
      default: ""
    },
    unfold:{
      type:Boolean,
      default:true
    },
    hasDefOption: {
      type: Boolean,
      default: true
    },
    showFirstOpt: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array]
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    isTxtAlign: {
      type: String,
      default: "center"
    }
  },
  data() {
    return {
      displayValue: [],
      selectedForModel: [],
      isOptionsDisplay: false,
      hideOptionsTimer: null,
      fullText: '',
    };
  },
  created() {
    this.clearInput()
    if(typeof this.value.valueOf()==="string"){
      this.handleInputValue(this.value);
    }
    else{
      this.value.forEach(val=>{
        this.handleInputValue(val);
      })
    }
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  watch: {
    selectedForModel(newVal, oldVal) {
      this.$emit("change", newVal);
    },
  },
  methods: {
    handleDocumentClick(e) {
      if (this.isOptionsDisplay) {
        if (!this.$refs.list.contains(e.target)&&!this.$refs.inputBox.contains(e.target)) {
          this.isOptionsDisplay = false;
        }
      }
    },
    showFullText(text) {
      let str = typeof text === "string" ? text : text[this.label];
      if(str.length>20){
        this.fullText = str;
      }else{
        this.fullText="";
      }
    },
    hideFullText() {
      this.fullText = '';
    },
    findKey(data, value, compare = (a, b) => a === b) {
      return Object.keys(data).find(k => compare(data[k], value));
    },
    findProperty(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop] === value) {
            return obj[this.keyName];
          }
        }
      }
      return null;
    },
    iconFunc(value) {
      if (Array.isArray(this.options)) {
        let temp = this.findProperty(this.options, value);
        this.selectOption(this.selectedForModel, temp);
        this.selectOption(this.displayValue, value);
      } else {
        this.selectOption(this.selectedForModel, this.findKey(this.options, value));
        this.selectOption(this.displayValue, value);
      }

    },
    clearInput() {
      this.displayValue = [];
      this.$emit("change", []);
      this.hideOptions();
    },
    selectOption1(option) {
      if (typeof option === "string") {
        this.selectOption(this.displayValue, option);
        this.selectOption(this.selectedForModel, option);
      } else {
        this.selectOption(this.displayValue, option[this.label]);
        this.selectOption(this.selectedForModel, option[this.keyName]);
      }
    },
    selectOption2(value, key) {
      this.selectOption(this.displayValue, value);
      this.selectOption(this.selectedForModel, key);
    },
    selectOption(arr, value) {
      const index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(value);
      }
    },
    showOptions() {
      this.isOptionsDisplay = !this.isOptionsDisplay;
    },
    hideOptions() {
      this.isOptionsDisplay = false;
    },
    handleInputValue(value) {
        if (this.options instanceof Array) {
          this.options.forEach(option => {
            if (value == option[this.keyName]) {
              this.selectOption(this.displayValue, option[this.label]);
              this.selectOption(this.selectedForModel, option[this.keyName]);
            }
          });
        } else {
          if (typeof this.options === "object") {
            this.selectOption(this.displayValue, this.options[value]);
            this.selectOption(this.selectedForModel, value);
          }
        }
    },
  }
};
</script>

<style scoped>

.selected_items {
  position: absolute;
  flex-wrap: wrap;
  align-items: center;
  top: 0;
  left: 0;
  display: flex;
  cursor: pointer;
}
.showNum{
  line-height: 16px
}
.selected_items .display_box {
  display: inline-flex;
  max-height: 24px;
  max-width: 260px;
  box-sizing: border-box;
  margin: 4px 8px;
  padding: 4px 5px 4px 8px;
  font-size: 12px;
  line-height: 12px;
  color: #666666;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  border: solid 1px #E5E5E5;
  background: #F5F5F5;
  border-radius: 2px;
}
.selected_items .display_box_number {
  display: inline-flex;
  width: 32px;
  height: 24px;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 12px;
  color: #666666;
  border: solid 1px #E5E5E5;
  background: #F5F5F5;
  border-radius: 2px;
}
.show_text{
  max-width: 180px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.selected_items .display_box .delete_icon {
  width: 14px;
  height: 14px;
  margin-left: 8px;
  background: url("./img_multi_select_clear_hover.png") no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 2;
}

.selected_items .display_box .delete_icon:hover {
  background: url("./img_multi_select_clear.png") no-repeat center center;
  background-size: 100% 100%;
}
.multi_web_select {
  position: relative;
  width: 300px;
  max-width: 300px;
  min-height: 32px;
  line-height: 30px;
  text-align: center;
  color: #4A4A4A;
  background: #FFFFFF url("./img_multi_select_show.png") no-repeat right 12px center;
  background-size: 10px 10px;
  border: solid 1px #DDDDDD;
  border-radius: 4px;
}

.multi_web_select:hover {
  border: solid 1px #BBBBBB;
}

.multi_web_select.active {
  background: #FFFFFF url("./img_multi_select_hide.png") no-repeat right 12px center;
  background-size: 10px 10px;
  border: solid 1px #00AAAA;
}
.multi_web_select.disabled{
  cursor: default;
  pointer-events: none;
  background-color: #F5F5F5;
  border: solid 1px #DDDDDD;
}
input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: none;
  outline:none;
  border:none;
  cursor: pointer;
}

.multi_web_select input.disableInput {
  background-color: rgba(239, 239, 239, 0.3);
  color: rgb(170, 170, 170);
  border: rgba(118, 118, 118, 0.3);
  cursor: default;
  pointer-events: none;
}

.multi_web_select ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.multi_web_select ul {
  position: absolute;
  display: block;
  width: calc(100% + 2px);
  left: -1px;
  top: 100%;
  max-height: 176px;
  margin-top: 4px;
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  overflow-y: auto;
}

.multi_web_select ul li.disabled {
  color: #cccccc;
  cursor: default;
  pointer-events: none;
}

.multi_web_select ul li {
  display: block;
  height: auto;
  font-size: 14px;
  padding:6px 30px 6px 12px;
  text-align: left;
  color: #333333;
  font-weight: normal;
  line-height: 20px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  cursor: pointer;
}
/deep/ [title]:after {
  text-decoration: none;
  box-shadow: none;
  position: absolute;
  left: 0;
  top: 24px;
  width: 332px;
  height: 34px;
  color: #ff0000;
  padding: 10px 14px;
  font-size: 12px;
  transform: scale(0.83);
  border-radius: 4px;
}
.multi_web_select ul li:nth-child(1) {
  margin-top: 8px;
}

.multi_web_select ul li:hover {
  background-color: #FAFAFA;
}

.multi_web_select ul li.active {
  color: #00AAAA;
  background: url("img_multi_select_chosen.png") no-repeat right 16px center;
  background-size: 14px 14px;
}
</style>
