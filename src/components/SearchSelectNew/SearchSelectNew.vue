<template>
  <div class="search_select" v-clickoutside="handleClose">
    <input
        class="search_result_show"
        v-model="displayValue"
        @focus="inputFocus()"
        :placeholder="placeholder"
        :style="{'text-align': isTxtAlign}"
        type="text"
        readonly
    />
    <div v-show="isOptionsDisplay" class="select_content">
      <input
          ref="searchInput"
          v-model="inputValue"
          @input="changeInput()"
          placeholder="请输入搜索内容"
          :style="{'text-align': isTxtAlign}"
          type="text"
          class="search_input"
      />
      <ul v-if="options instanceof Array">
        <li v-if="hasDefOption" @click.stop="clearInput()">请选择</li>
        <li v-for="option in options" @click="selectOption1(option)">
          {{ typeof option === "string" ? option : option[label] }}
        </li>
      </ul>
      <ul v-else>
        <li v-if="hasDefOption" @click.stop="clearInput()">请选择</li>
        <li v-for="(value, key) in options" @click="selectOption2(value, key)">
          {{ value }}
        </li>
      </ul>
      <ul v-show="options.length===0" style="height: 182px;">
        <div class="txt_default">暂无数据</div>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import Clickoutside from "./clickoutside";

export default {
  name: "SearchSelectNew",
  model: {
    prop: "value",
    event: "change"
  },
  directives: { Clickoutside },
  props: {
    /**
     * 入参Array,Object]
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
    value: {
      type: [String, Number]
    },
    hasDefOption: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    searchFn: {
      type: Function
    },
    isTxtAlign: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      displayValue: this.value,
      inputValue: "",
      isOptionsDisplay: false,
      isClickOption: false
    };
  },
  created() {
    this.handleInitValue(this.value);
  },
  watch:{
    "value":{
      immediate:true,
      handler:function(newV,oldV){
        if(newV===""){
          this.displayValue="";
        }
      }
    }
  },
  methods: {
    selectOption1(option) {
      this.hideOptions();
      this.isClickOption = true;
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
      this.isClickOption = true;
      this.$emit("change", key);
    },
    clearInput() {
      this.displayValue = "";
      this.$emit("change", "");
      this.hideOptions();
    },
    handleInitValue(value) {
      if (this.options instanceof Array) {
        this.options.forEach(option => {
          if (value == option[this.keyName]) {
            this.displayValue = option[this.label];
          }
        });
      } else {
        if (typeof this.options === "object") {
          this.displayValue = this.options[this.value];
        }
      }
    },
    inputFocus() {
      this.isOptionsDisplay = true;
      this.inputValue = "";
      this.debounceHandleSearch(this.inputValue);
      this.isClickOption = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    changeInput() {
      this.isOptionsDisplay = true;
      this.debounceHandleSearch(this.inputValue);
      this.isClickOption = false;
    },
    //去抖动
    debounceHandleSearch: debounce(function(val) {
      this.searchFn(val);
    }, 300),
    hideOptions() {
      this.isOptionsDisplay = false;
    },
    handleClose() {
      const _this = this;
      setTimeout(function() {
        _this.isOptionsDisplay = false;
      }, 200);
    }
  }
};
</script>

<style scoped>
.search_select {
  position: relative;
  width: 148px;
  height: 32px;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: center;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  line-height: 32px;
  background: #FFFFFF url("./icon_show_select_item.png") no-repeat right 8px center;
  background-size: 10px 10px;
  color: #4a4a4a;
  cursor: pointer;
  outline: none;
}

.search_result_show {
  height: 100%;
  width: 100%;
  background: none;
  padding: 0;
  font: inherit;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  outline: none;
}
.search_select:hover{
  border: 1px solid var(--hover-main-color);
}
.search_select ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.select_content {
  position: absolute;
  width: calc(100% + 2px);
  left: -1px;
  top: calc(100% + 1px);
  max-height: 218px;
  margin-top: 2px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: solid 1px #eeeeee;
  z-index: 9999;
}

.search_input {
  width: 100%;
  height: 36px;
  margin: 0;
  padding: 0 12px;
  line-height: 36px;
  border-bottom: 1px solid #CCCCCC;
  box-sizing: border-box;
  color: inherit;
  font: inherit;
  outline: none;
  border: none;
}

.txt_default {
  height: 182px;
  font-size: 14px;
  color: #999999;
  line-height: 182px;
  text-align: center;
}

.search_select ul {
  max-height: 182px;
  overflow: hidden;
  overflow-y: auto;
}

.search_select ul li {
  height: 36px;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: normal;
  line-height: 36px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  list-style: none;
}

.search_select ul li:hover {
  background-color: #f5f5f5;
}
</style>
