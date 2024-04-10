<template>
  <div>
    <div class="input_box" ref="inputBox">
      <input :class="{'active':isOptionsDisplay,'disableInput' : disabled}"
             ref="inputBox"
             :disabled="disabled"
             :value="selected"
             :placeholder="placeholder"
             readonly="readonly"
             :style="{'text-align': isTxtAlign }"
             @mousedown="isOptionsDisplay = !isOptionsDisplay"/>
      <button v-show="selected" class="btn_input_clear" @click="clearInput"></button>
      <button v-show="!selected" class="btn_input"
              @click="isOptionsDisplay = !isOptionsDisplay"></button>

    </div>
    <div class="cascader_box" ref="list">
      <CascadeList v-show="isOptionsDisplay"
                   :label="label"
                   :keyName="keyName"
                   :options="options"
                   @has-children="hasChild"
                   @choose-value="choose"
                   :clear="clear"
      />
    </div>
  </div>
</template>

<script>
import CascadeList from "./CascadeList.vue";

export default {
  model: {
    prop: "value",
    event: "getValue"
  },
  name: "Cascader",
  components: { CascadeList },
  props: {
    /**
     * 入参Object、Array
     */
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    label: {
      type: String,
      default: ""
    },
    showResult: {
      type: Boolean,
      default: true
    },
    keyName: {
      type: String,
      default: ""
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
      clear: 1,
      selectValue: "",
      selected: null,
      isOptionsDisplay: false,
      showRes: false
    };
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    clearInput() {
      this.clear++;
      this.selected = null;
      this.$emit("getValue", "");
      this.isOptionsDisplay = false;
    },

    hasChild(showList) {
      this.isOptionsDisplay = showList;
      this.showRes = !showList;
    },
    findOptionValue(options, targetLabel) {
      for (let option of options) {
        if (option[this.label] === targetLabel) {
          return option[this.keyName];
        }
        if (option.children) {
          const foundValue = this.findOptionValue(option.children, targetLabel);
          if (foundValue) {
            return foundValue;
          }
        }
      }
      return null;
    },
    choose(value) {
      if (this.showRes) {
        this.selected = value;
      }
      if (this.selected) {
        let a = this.findOptionValue(this.options, this.selected);
        this.$emit("getValue", a);
      }
    },

    handleDocumentClick(e) {
      if (this.isOptionsDisplay) {
        if (!this.$refs.list.contains(e.target) && !this.$refs.inputBox.contains(e.target)) {
          this.isOptionsDisplay = false;
        }
      }
    },
  }
};
</script>

<style scoped>
.cascader_box {
  position: absolute;
  display: flex;
  flex-direction: row;
  border: 1px solid #EEEEEE;
  box-shadow: 0 2px 10px 0 rgba(204, 204, 204, 0.3);
}

.input_box {
  position: relative;
  width: 300px;
  height: 32px;
}

input {
  position: relative;
  width: 100%;
  height: 32px;
  font-size: 12px;
  line-height: 20px;
  color: #333333;
  border-radius: 4px;
  border: solid 1px #DDDDDD;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  outline: none;
}
input:disabled:hover{
  border: solid 1px #DDDDDD;
}
input:hover {
  border: solid 1px #BBBBBB;
  border-radius: 4px;
}

input.active {
  border: solid 1px var(--main-color, #00aaaa);
  border-radius: 4px;
}
.btn_input {
  position: absolute;
  width: 10px;
  height: 10px;
  right: 12px;
  top: 11px;
  background: url("./img_arrow_down.png") center no-repeat;
  background-size: 10px 10px;
  border: none;
  outline: none;
}

.btn_input_clear {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 12px;
  top: 9px;
  background: center no-repeat;
  border: none;
  outline: none;
}

input.active ~ .btn_input {
  background: url("./img_arrow_up.png") center no-repeat;
  background-size: 10px 10px;
}

input:hover ~ .btn_input_clear {
  background: url("./img_select_clear.png") center no-repeat;
  background-size: 14px 14px;
}

.btn_input_clear:hover {
  background: url("./img_select_clear_hover.png") center no-repeat;
  background-size: 14px 14px;
}
</style>