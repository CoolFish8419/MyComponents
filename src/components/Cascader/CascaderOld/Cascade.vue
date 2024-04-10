
<template>
  <div>
    <div class="cascader_container"
         :class="{'disableInput' : disabled ,'active':isOptionsDisplay,'hasContent': displayValue !== ''}"
         @click="isOptionsDisplay = true">
      <input :class="{'active':isOptionsDisplay}"
             ref="inputBox"
             :value="displayValue"
             :placeholder="placeholder"
             readonly="readonly"
             :style="{'text-align': isTxtAlign }"/>
      <div v-show="displayValue" class="btn_clear" @click="clearInput"></div>
    </div>
    <div class="list_container">
      <ul v-if="!disabled&&ListInUse[0]"
          v-show="isOptionsDisplay"
          ref="list"
          class="cascader_options"
      >
        <li v-for="optionGroup in ListInUse[0]"
            @click.stop="selectOption1(optionGroup)"
            :class="{'disabled' : optionGroup.disabled ,
             active: chosenLabel.includes(optionGroup.label) }">
          <span class="text_label">{{ optionGroup[label] }}</span>
        </li>
      </ul>
      <ul v-if="ListInUse[1]"
          style="left: 147px"
          v-show="isOptionsDisplay&&chosenLabel.length>=0">
        <li v-for="optionGroup in ListInUse[1]"
            :key="optionGroup.id"
            :class="{'disabled' : optionGroup.disabled , active: chosenLabel.includes(optionGroup.label) }"
            @click.stop="selectOption1(optionGroup)">
          <span class="text_label">{{ optionGroup[label] }}</span>
        </li>
      </ul>


      <ul v-if="ListInUse[2]" style="left: 294px" v-show="isOptionsDisplay&&chosenLabel.length>=2">
        <li v-for="optionGroup in ListInUse[2]"
            :class="{'disabled' : optionGroup.disabled , active: chosenLabel.includes(optionGroup.label) }"
            @click.stop="selectOption1(optionGroup)">
          <span class="text_label">{{ optionGroup[label] }}</span>
        </li>
      </ul>


      <ul class="fourthMenu" v-if="ListInUse[3]" style="left: 441px" v-show="isOptionsDisplay&&chosenLabel.length>=3">
        <li v-for="optionGroup in ListInUse[3]"
            :class="{'disabled' : optionGroup.disabled , active: chosenLabel.includes(optionGroup.label) }"
            @click.stop="selectOption1(optionGroup)">
          <span class="text_label">{{ optionGroup[label] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CascaderOption",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    /**
     * 入参Object、Array
     */
    options: {
      type: Array,
      default: function () {
        return [];
      }
    },
    label: {
      type: String,
      default: ""
    },
    showResult:{
      type:Boolean,
      default:true
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
      type: [String, Array, Number]
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
      isOptionsDisplay: false,
      displayValue: "",//显示的值
      optionList: {},//初次处理数据
      chosenLabel:[],
      chosenValue:"",
      tempArr : [],
      ListInUse: {},
    };
  },
  created() {
    this.initOptionList();
    if (this.value) {
      this.handleInputValue();
    }
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  Destroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    initOptionList(){
      this.flattenOptions(this.options).forEach(option => {
        const {level} = option;
        if (!this.optionList[level]) {
          this.optionList[level] = [];
        }
        this.optionList[level].push(option);
      });
      this.ListInUse[0]=this.optionList[0];
    },
    flattenOptions(options, level = 0) {
      const flattened = [];
      options.forEach(option => {
        const { id, value, label, children , disabled} = option;
        const end = !children; // 如果没有children属性，则end为true
        flattened.push({disabled, id, value, label, level, end  });
        if (children) {
          const childFlattened = this.flattenOptions(children, level + 1);
          flattened.push(...childFlattened);
        }
      });
      return flattened;
    },
    selectOption1(option) {
      if(option.label){
        if (this.chosenLabel.indexOf(option.label) === -1) {
          this.chosenLabel[option.level]=option.label;
          this.chosenValue = option[this.keyName];
        }
        if(option.level<this.chosenLabel.length-1){
          this.chosenLabel.splice(option.level + 1);
        }
        if(option.level<3){
          this.getChildItem(this.options,option.level);
          this.ListInUse[option.level + 1] = this.optionList[option.level + 1].filter(objA => {
            return this.tempArr.includes(objA.label);
          });
          this.tempArr = [];
        }
        if(this.showResult){
          this.displayValue = this.chosenLabel[this.chosenLabel.length-1];
        }
        if(!this.showResult){
          this.displayValue = this.chosenLabel.join('/');
        }
        this.$emit("change",this.chosenValue);
      }


      if(option.end===true){
        this.hideOptions()
      }
    },
    getChildItem(option, level) {
      option.forEach(item => {
        if (item.value === this.chosenValue) {
          if (item.children) {
            item.children.forEach(subItem => {
              if (subItem) {
                this.tempArr.push(subItem.label);
              }
            });
          }
          return; // 跳出循环
        }
        if (item.children) {
          this.getChildItem(item.children, level + 1);
        }
      });
    },
    hideOptions() {
      this.isOptionsDisplay = false;
    },
    clearInput() {
      this.ListInUse[0]=this.optionList[0];
      this.displayValue = "";
      this.chosenLabel = [];
      this.$emit("change", "");
      this.hideOptions();
    },
    handleInputValue() {
      if (this.options instanceof Array) {
        this.options.forEach(option => {
          if (this.value == option[this.keyName]) {
            this.displayValue = option[this.label];
          }
        })
      }
    },
    handleDocumentClick(e) {
      if (this.isOptionsDisplay) {
        if (!this.$refs.list.contains(e.target) && !this.$refs.inputBox.contains(e.target)) {
          this.isOptionsDisplay = false;
        }
      }
    },
    showOptions() {
      this.isOptionsDisplay = true;
    },
  }
}
</script>

<style scoped>
.cascader_container {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 32px;
  text-align: center;
  align-items: center;
  color: #4A4A4A;
  background: url("img_arrow_down.png") no-repeat center right 12px;
  background-size: 10px 10px;
  border-radius: 4px;
  border: solid 1px #DDDDDD;
  cursor: pointer;
}
.cascader_container.hasContent:hover{
  background: none;
}

.cascader_container.hasContent:hover .btn_clear{
  position: absolute;
  width: 14px;
  height: 14px;
  right: 12px;
  background: url("img_select_clear.png") no-repeat center center;
  background-size: 14px 14px;
}
.list_container{
  position: relative;
}

.cascader_container input {
  box-sizing: border-box;
  height: 20px;
  width: 80%;
  margin: 6px 0 6px 24px;
  font-size: 12px;
  line-height: 20px;
  color: #333333;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
}
.cascader_container:hover{
  border: solid 1px #BBBBBB;
  border-radius: 4px;
}


.cascader_container.active {
  border: solid 1px var(--main-color,#00aaaa);
  border-radius: 4px;
  background: url("img_arrow_up.png") no-repeat center right 12px;
  background-size: 10px 10px;
}
.cascader_container.disableInput {
  background-color: rgba(239, 239, 239, 0.3);
  color: rgb(170, 170, 170);
  border: rgba(118, 118, 118, 0.3);
  pointer-events: all;
  cursor: default;
}
ul {
  position: absolute;
  display: block;
  width: 148px;
  max-height: 384px;
  margin-top: 4px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(204, 204, 204, 0.3);
  overflow-y: auto;
  border: 1px solid #EEEEEE;
  z-index: 9999;
  list-style: none;
}

ul li {
  height: auto;
  font-size: 14px;
  padding: 8px 12px 8px 20px;
  text-align: left;
  color: #333333;
  line-height: 20px;
  background: url("./img_cascader_arrow_right.png") no-repeat center right 12px;
  background-size: 16px 16px;
  overflow: hidden;
  cursor: pointer;
  list-style: none;

}
ul li:nth-child(1){
  margin-top: 8px;
}
ul li:nth-last-child(1){
  margin-bottom: 8px;
}
ul li.active
{
  background: url("./img_cascader_arrow_right.png") no-repeat center right 12px;
  background-size: 16px 16px;
}
ul li.disabled
{
  background: url("./img_cascader_arrow_right.png") no-repeat center right 12px;
  background-size: 16px 16px;
  pointer-events: none;
  cursor: default;
}
ul li.disabled .text_label{
  color: #BBBBBB;
  pointer-events: none;
  cursor: default;
}
ul li.active .text_label{
  color: var(--main-color,#00AAAA);
  font-weight: bold;
}
ul li:hover {
  background: #FAFAFA url("./img_cascader_arrow_right_hover.png") no-repeat center right 12px;
  background-size: 16px 16px;
}
ul li:hover .text_label{
  color: var(--main-color,#00AAAA);
}
.text_label{
  display:block;
  max-width: 90px;
  height: auto;
  font-size: 12px;
  line-height: 16px;
  color: #1D2129;
  white-space:pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
}
</style>