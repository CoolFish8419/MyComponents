<template>
  <div class="search_select" v-clickoutside="handleClose">
    <input
        v-model="displayValue"
        @focus="inputFocus()"
        @input="changeInput()"
        :placeholder="placeholder"
        :style="{'text-align': isTxtAlign}"
        type="text"
    />
    <ul v-if="options instanceof Array" v-show="isOptionsDisplay">
      <li v-for="option in options" @click="selectOption1(option)">
        {{ typeof option === "string" ? option : option.value }}
      </li>
      <div class="page_div">
<!--        <page-select v-show='pageObj.totalAmount>5'-->
<!--                     :value="pageObj"-->
<!--                     :pageFn="searchFn"-->
<!--                     :pageSize="5"-->
<!--        ></page-select>-->
      </div>
    </ul>
    <ul v-else v-show="isOptionsDisplay">
      <li v-for="(value, key) in options" @click="selectOption2(value, key)">
        {{ value }}
      </li>
    </ul>
    <ul v-show="options.length===0 && isOptionsDisplay" style="height: 218px;">
      <div class="txt_default">暂无数据</div>
    </ul>
  </div>
</template>

<script>
    import debounce from 'lodash/debounce';
    import Clickoutside from '../utils/clickoutside';
    export default {
        name: "SearchSelectRemotePage",
        directives: { Clickoutside },
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
            pageObj:{
                type: Object,
                default: function () {
                    return {
                        pagination:1,
                        totalAmount:0
                    };
                }
            }
        },
        data() {
            return {
                displayValue: this.value,
                isOptionsDisplay: false,
                isClickOption: false,
                search: {
                    totalAmount: 0,
                    pagination: 1,
                },
            };
        },
        watch: {
            value(val) {
                this.displayValue = val;
            },
            pageObj: {
                handler(newName, oldName) {
                    console.log(this.pageObj.totalAmount);
                    console.log('obj.a changed');
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            selectOption1(option) {
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
            selectOption2(value, key) {
                this.displayValue = value;
                this.hideOptions();
                this.isClickOption = true;
                this.$emit("input", this.displayValue);
                this.$emit("option-key", key);
            },
            inputFocus(){
                this.isOptionsDisplay = true;
                this.debounceHandleSearch('', this.pageObj.pagination);
                this.isClickOption = true;
            },
            changeInput() {
                this.isOptionsDisplay = true;
                this.debounceHandleSearch(this.displayValue, 1);
                this.$emit("input", this.displayValue);
                this.isClickOption = false;
            },
            //去抖动
            debounceHandleSearch:debounce(function(val, pagination){
                console.log(val);
                this.searchFn(pagination, val);
            }, 500),
            hideOptions() {
                this.isOptionsDisplay = false;
            },
            handleClose(){
                const _this = this;
                setTimeout(function () {
                    _this.isOptionsDisplay = false;
                    if (!_this.isClickOption) {
                        _this.displayValue = "";
                        _this.$emit("option-key", "");
                    }
                }, 200);
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
  .txt_default{
    height: 218px;
    font-size: 14px;
    color: #999999;
    line-height: 218px;
    text-align: center;
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
