<template>
  <div @mouseleave="blur()" @click="showOptions()" class="web_select">
    <input :value="displayValue" :disabled="disabled"
           :placeholder="placeholder" type="text" readonly="readonly" :style="{'text-align': isTxtAlign}"/>
    <ul v-if="options instanceof Array" v-show="isOptionsDisplay">
      <li v-if="hasDefOption" @click.stop="clearInput()">请选择</li>
      <li v-for="option in options" @click.stop="selectOption1(option)">
        {{typeof option === "string"?option:option.value}}
      </li>
    </ul>
    <ul v-else v-show="isOptionsDisplay">
      <li v-if="hasDefOption" @click.stop="clearInput()">请选择</li>
      <li v-for="(value,key) in options" @click.stop="selectOption2(value,key)">{{value}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "web-select",
    props: {
      /**
       * 入参Array[String]、Object、Array[{key:1,value:"1"}]
       */
      options: {
        type: [Array, Object],
        default: function () {
          return []
        }
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
        type: [String,Number]
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      isTxtAlign: {
        type: String,
        default: "left"
      },
    },
    data() {
      return {
        displayValue: this.value,
        isOptionsDisplay: false
      }
    },
    watch: {
      "options": {
        handler(newVal,oldVal){
          this.showFirstOption();
        },
        /*immediate: true*/
      },
      value(val){
        this.displayValue = val;
      }
    },
    created(){
      this.showFirstOption();
    },
    methods:{
      showFirstOption(){
        if (!this.showFirstOpt || (!!this.value && '请选择'!==this.value)){
          return;
        }
        for(var k in this.options){
          if(!this.options.hasOwnProperty(k)){
            return;
          }
          if(typeof this.options[k] === "string"){
            if(!this.options[k].hasOwnProperty("key")){
              this.$emit("option-key",k);
            }
            this.displayValue = this.options[k];
          }else {
            this.displayValue = this.options[k].value;
            this.$emit("option-key",this.options[k].key);
          }
          break;
        }
        this.$emit("input",this.displayValue);
      },
      clearInput(){
        this.displayValue = "";
        this.$emit("input","");
        this.$emit("option-key","");
        this.hideOptions();
      },
      selectOption1(option) {
        this.hideOptions();
        if(typeof option === "string"){
          this.displayValue = option;
          this.$emit("input",this.displayValue);
        }else{
          this.displayValue = option.value;
          this.$emit("input",this.displayValue);
          this.$emit("option-key",option.key);
        }
      },
      selectOption2(value,key){
        this.displayValue = value;
        this.hideOptions();
        this.$emit("input",this.displayValue);
        this.$emit("option-key", key);
      },
      showOptions() {
        this.isOptionsDisplay = true;
      },
      hideOptions() {
        this.isOptionsDisplay = false;
      },
      blur() {
        setTimeout(this.hideOptions(), 200);
      }
    }
  }
</script>

<style scoped>
  /** web-select下拉框*/
  .web_select {
    position: relative;
    text-align: center;
    color: #4A4A4A;
    background: #FFFFFF url("../assets/image/icon_select_arrow.png") no-repeat right 8px center;
    background-size: 10px 10px;
    cursor: pointer;
  }

  .web_select input {
    height: 100%;
    width: 100%;
    background: none;
    cursor: pointer;
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
    top: 100%;
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
