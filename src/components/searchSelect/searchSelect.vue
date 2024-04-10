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
                <li v-for="option in options" @click="selectOption1(option)">
                    {{ typeof option === "string" ? option : option.value }}
                </li>
            </ul>
            <ul v-else>
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
    import debounce from 'lodash/debounce';
    import Clickoutside from './clickoutside.js';
    export default {
        name: "SearchSelect",
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
            }
        },
        data() {
            return {
                displayValue: this.value,
                inputValue:'',
                isOptionsDisplay: false,
                isClickOption: false,
            };
        },
        watch: {
            value(val) {
                this.displayValue = val;
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
                this.inputValue = '';
                this.debounceHandleSearch(this.inputValue);
                this.isClickOption = true;
                this.$nextTick(()=>{
                    this.$refs.searchInput.focus();
                })
            },
            changeInput() {
                this.isOptionsDisplay = true;
                this.debounceHandleSearch(this.inputValue);
                this.isClickOption = false;
            },
            //去抖动
            debounceHandleSearch:debounce(function(val){
                this.searchFn(val);
            }, 300),
            hideOptions() {
                this.isOptionsDisplay = false;
            },
            handleClose(){
                const _this = this;
                setTimeout(function () {
                    _this.isOptionsDisplay = false;
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
        background: #FFFFFF url("./icon_select_arrow.png") no-repeat right 8px center;
        background-size: 10px 10px;
    }

    .search_result_show{
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

    .select_content {
        position: absolute;
        width: calc(100% + 2px);
        left: -1px;
        top: calc(100% + 1px);
        max-height: 218px;
        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        border: solid 1px #eeeeee;
        z-index: 9999;
    }
    .search_input{
        width: 100%;
        height: 36px;
        padding: 0 12px;
        line-height: 36px;
        border-bottom: 1px solid var(--border-color-primary, #CCCCCC);
    }
    .txt_default{
        height: 182px;
        font-size: 14px;
        color: #999999;
        line-height: 182px;
        text-align: center;
    }
    .search_select ul{
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
    }

    .search_select ul li:hover {
        background-color: #f5f5f5;
    }
</style>
