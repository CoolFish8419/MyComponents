<template>
  <div @click="showOptions()"
       class="web_select"
  :class="{'disabled' : disabled ? 'disableInput':'','active' : isOptionsDisplay}">
    <input :class=" {'disabled' : disabled ? 'disableInput':''}"
           ref="inputBox"
           :value="displayValue"
           :placeholder="placeholder"
           type="text"
           readonly="readonly"
           :style="{'text-align': isTxtAlign}"/>
    <ul v-if="options instanceof Array && !disabled"
        v-show="isOptionsDisplay"
        ref="list">
      <li v-if="hasDefOption" @click.stop="clearInput()"
          :style="{'text-align': isTxtAlign}">请选择</li>
      <li v-for="option in options" @click.stop="selectOption1(option)"
          :style="{'text-align': isTxtAlign}">
        {{ typeof option === "string" ? option : option[label] }}
      </li>
    </ul>
    <ul v-else v-show="isOptionsDisplay && !disabled" ref="list">
      <li v-if="hasDefOption" @click.stop="clearInput()" :style="{'text-align': isTxtAlign}">请选择</li>
      <li v-for="(value,key) in options" @click.stop="selectOption2(value,key)" :style="{'text-align': isTxtAlign}">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
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
    label: {
      type: String,
      default: ""
    },
    keyName: {
      type: String,
      default: ""
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
      type: [String, Number]
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
      displayValue: this.value,
      isOptionsDisplay: false
    };
  },
  created() {
    this.showFirstOption();
    if(this.value){
      this.handleInputValue();
    }
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    showFirstOption() {
      if (!this.showFirstOpt || this.value) {
        return;
      }
      let optionsArray = [];
      if (Array.isArray(this.options)) {
        optionsArray = this.options;
      } else {
        let newObj = this.options;
        const keys = Object.keys(newObj);
        const values = Object.values(newObj);
        if (keys.length > 0) {
          this.displayValue = values[0];
          console.log(this.displayValue)
          this.$emit("change", keys[0]);
          return;
        }
      }

      for (const option of optionsArray) {
        if (typeof option === "string") {
          this.displayValue = option;
          this.$emit("change", this.displayValue);
        }
        break;
      }
    },
    clearInput() {
      this.displayValue = "";
      this.$emit("change", "");
      this.hideOptions();
    },
    selectOption1(option) {
      this.hideOptions();
      if (typeof option === "string") {
        this.displayValue = option;
        this.$emit("change", this.displayValue);
      } else {
        this.displayValue = option[this.label];
        const keyName = option[this.keyName];
        this.$emit("change", keyName);
      }
    },
    selectOption2(value, key) {
      this.displayValue = value;
      this.hideOptions();
      this.$emit("change", key);
    },
    showOptions() {
      this.isOptionsDisplay = !this.isOptionsDisplay;
    },
    hideOptions() {
      this.isOptionsDisplay = false;
    },
    blur() {
      setTimeout(this.hideOptions(), 200);
    },
    handleInputValue(){
      if (this.options instanceof Array) {
        this.options.forEach(option=>{
          if(this.value==option[this.keyName]){
            this.displayValue = option[this.label];
          }
        })
      }
      else{
        if (typeof this.options === "object") {
          this.displayValue = this.options[this.value];
        }
      }
    },
    handleDocumentClick(e) {
      if (this.isOptionsDisplay) {
        if (!this.$refs.list.contains(e.target)&&!this.$refs.inputBox.contains(e.target)) {
          this.isOptionsDisplay = false;
        }
      }
    },
  }
};
</script>

<style scoped>
.web_select {
  box-sizing: border-box;
  position: relative;
  padding: 0 12px;
  text-align: center;
  color: #4A4A4A;
  background: #FFFFFF url("./icon_select_arrow.png") no-repeat right 8px center;
  background-size: 10px 10px;
  border: 1px solid #DDDDDD;
  cursor: pointer;
  font-size: 12px;
}
.web_select:hover{
  border: 1px solid #BBBBBB;
}
.web_select.active{
  border: 1px solid var(--hover-main-color);
}
.web_select input {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 2px 4px;
  font: inherit;
  box-sizing: border-box;
  background: none;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  outline: none;
}
.web_select input.disabled{
  color: #cccccc;
}

.web_select.disabled {
  background-color: #f5f5f5;
  border-radius: 4px;
  border: solid 1px #dddddd;
  cursor: default;
  pointer-events: none;
}

.web_select ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.web_select ul {
  position: absolute;
  display: block;
  width: calc(100% + 2px);
  left: -1px;
  top: 120%;
  max-height: 218px;
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(204, 204, 204, 0.3);
  overflow-y: auto;
  border: 1px solid #EEEEEE;
  z-index: 9999;
}

.web_select ul li {
  display: block;
  height: auto;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  color: #333333;
  font-weight: normal;
  line-height: 20px;
  overflow: hidden;
  cursor: pointer;
}

.web_select ul li:hover {
  background-color: #F8F8F8;
}
</style>
