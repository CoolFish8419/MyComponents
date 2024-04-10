<template>
  <div class="search_select">
    <input
      v-model="displayValue"
      @focus="changeInput()"
      @input="changeInput()"
      @blur="blur"
      :placeholder="placeholder"
      :style="{'text-align': isTxtAlign}"
      type="text"
    />
    <ul v-if="options instanceof Array" v-show="isOptionsDisplay">
      <li v-for="option in options" @click="selectOption1(option)">
        {{ typeof option === "string" ? option : option.value }}
      </li>
    </ul>
    <ul v-else v-show="isOptionsDisplay">
      <li v-for="(value, key) in options" @click="selectOption2(value, key)">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
    import debounce from 'lodash/debounce';
export default {
  name: "search-select",
  props: {
    /**
     * 入参Array[String]、Object、Array[{key:1,value:"1"}]
     */
    options: {
      type: [Array, Object],
      default: function () {
        return [{ key: "", value: "请选择" }];
      },
    },
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: "",
    },
    searchFn: {
      type: Function,
    },
    isTxtAlign: {
      type: String,
      default: "left"
    },
  },
  data() {
    return {
      displayValue: this.value,
      isOptionsDisplay: false,
      isClickOption: false,
    };
  },
  watch: {
    value(val) {
      this.displayValue = val;
    },
  },
  methods: {
    selectOption1: function (option) {
      this.hideOptions();
      this.isClickOption = true;
      if (typeof option === "string") {
        this.displayValue = option;
        this.$emit("input", this.displayValue);
        this.$emit("option-key", option);
      } else {
        this.displayValue = option.value;
        this.$emit("input", this.displayValue);
        this.$emit("option-key", option.key);
      }
    },
    selectOption2: function (value, key) {
      this.displayValue = value;
      this.hideOptions();
      this.isClickOption = true;
      this.$emit("input", this.displayValue);
      this.$emit("option-key", key);
    },
    changeInput: function () {
      this.isOptionsDisplay = true;
        this.debounceHandleSearch();
      this.$emit("input", this.displayValue);
      this.isClickOption = false;
    },
      //去抖动
      debounceHandleSearch:debounce(function(){
          this.searchFn(this.displayValue);
      }, 500),
    hideOptions: function () {
      this.isOptionsDisplay = false;
    },
    blur: function () {
      const _this = this;
      setTimeout(function () {
        _this.isOptionsDisplay = false;
        if (!_this.isClickOption) {
          _this.$emit("option-key", "");
        }
      }, 200);
      //setTimeout(this.hideOptions(), 200);
    },
  },
};
</script>

<style scoped>
.search_select {
  position: relative;
  text-align: center;
  color: #4a4a4a;
  cursor: pointer;
  background: #FFFFFF url("../assets/image/icon_select_arrow.png") no-repeat right 8px center;
  background-size: 10px 10px;
}

.search_select input {
  height: 100%;
  width: 100%;
  background: none;
}

.search_select ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.search_select ul {
  position: absolute;
  width: calc(100% + 2px);
  left: -1px;
  top: calc(100% + 1px);
  max-height: 218px;
  overflow: hidden;
  overflow-y: auto;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: solid 1px #eeeeee;
  z-index: 9999;
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
}

.search_select ul li:hover {
  background-color: #f5f5f5;
}
</style>
