<template>
  <div class="search_select">
    <input
      v-model="displayValue"
      @input="changeInput()"
      @blur="blur"
      :placeholder="placeholder"
      type="text"
    />
    <ul v-if="options instanceof Array" v-show="isOptionsDisplay">
      <li
        v-for="option in options"
        @click="selectOption1(option)"
        :key="option.key"
      >
        {{ typeof option === "string" ? option : option.value }}
      </li>
    </ul>
    <ul v-else v-show="isOptionsDisplay">
      <li
        v-for="(value, key) in options"
        @click="selectOption2(value, key)"
        :key="key"
      >
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
      default: "请输入选择",
    },
    searchFn: {
      type: Function,
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
      // this.searchFn(this.displayValue);
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
  width: 100%;
  height: 32px;
  position: relative;
  text-align: center;
  color: #4a4a4a;
  background: #ffffff;
  cursor: pointer;
}

.search_select input {
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  font-size: 12px;
  border-radius: 4px;
  text-align: center;
  background: url("../assets/image/icon_select_arrow.png") no-repeat;
  background-size: 10px 10px;
  background-position: right 12px center;
}
.search_select input:focus {
  border: solid 1px #ffb54c !important;
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
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);
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
