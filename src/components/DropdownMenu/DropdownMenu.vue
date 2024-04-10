<template>
  <div class="dropdown" @click="toggleDropdown">
    <div class="label_box" ref="inputBox">
      <div class="img_show" :class="{active:isOpen}"></div>
      <span class="dropdown_selected" :class="{active:isOpen}">{{ title }}</span>
    </div>
    <ul  v-if="options instanceof Array"  v-show="isOpen" ref="list">
      <li v-for="option in options"
          :class="{
            disabled: option.disabled
          }"
          @click.stop="selectOption(option)">
        {{option[label] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    options: {
      type: [Array,Object],
      required: true,
    },
    title:{
      type:String,
      default: "更多",
    },
    value: {
      type: [String,Number],
    },
    label: {
      type: String,
      default: ""
    },
    keyName: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    if(this.value){
      this.handleInputValue();
    }
  },
  computed: {
    selectedOption() {
      return this.value;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    handleInputValue(){
      if (this.options instanceof Array) {
        this.options.forEach(option=>{
          if(this.value==option[this.keyName]){
            this.selectedOption = option[this.label];
          }
        })
      }
      else{
        if (typeof this.options === "object") {
          this.selectedOption = this.options[this.value];
        }
      }
    },
    handleDocumentClick(e) {
      if (this.isOpen) {
        if (!this.$refs.list.contains(e.target)&&!this.$refs.inputBox.contains(e.target)) {
          this.isOpen = false;
        }
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
        this.isOpen = !this.isOpen;
        option.handler()
        this.$emit('input', option[this.keyName]);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.label_box{
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  width: auto;
}
.dropdown_selected {
  color: var(--main-color);
  margin-right: 4px;
  font-size: 12px;
  cursor: pointer;
}
.img_show{
  width: 10px;
  height: 10px;
  background:url("img_list_down.png") center center no-repeat;
  background-size: 10px 10px;
  cursor: pointer;
}
.img_show:hover{
  width: 10px;
  height: 10px;
  background:url("img_list_down_hover.png") center center no-repeat;
  background-size: 10px 10px;
}
.img_show.active{
  width: 10px;
  height: 10px;
  background:url("img_list_up.png") center left no-repeat;
  background-size: 10px 10px;
}

ul{
  position: absolute;
  right: 0;
  width: 100px;
  background-color:var(--color-white);
  box-shadow: 0 4px 10px 0
  rgba(0, 0, 0, 0.05);
  border: solid 1px #EEEEEE;
  z-index: 9999;
  padding: 0;
}
li {
  display: flex;
  width: 100px;
  height: 38px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--font-color-secondary);
  background-color: var(--color-white);
  border: solid 1px #EEEEEE;
  cursor: pointer;
  z-index: 9999;
}
li:hover {
  background-color: rgba(74, 132, 250, 0.05);
  border: solid 1px #EEEEEE;
  color: var(--main-color);
}
li.active {
  background-color: rgba(74, 132, 250, 0.05);
  border: solid 1px #EEEEEE;
  color: var(--main-color);
}
li.disabled {
  color: #CCCCCC;
  cursor: default;
  pointer-events: none;
}
</style>