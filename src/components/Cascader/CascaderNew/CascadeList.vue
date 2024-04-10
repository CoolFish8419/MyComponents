<template>
  <div class="cascader_box">
  <ul>
    <li v-for="option in options"
        @click="chose(option)"
        :key="option.id"
        :value="option.value"
        :class="{ 'disabled' : option.disabled ,
                  'active' : option[label] === selected }">
      <span class="text_label">{{ option[label] }}</span>
    </li>
  </ul>
  <CascadeList :label="label"
               :keyName="keyName"
               :options="children"
               v-if="children.length"
               @has-children="$emit('has-children',$event)"
               @choose-value="$emit('choose-value',$event)"
              />
  </div>
</template>

<script>
export default{
  name:'CascadeList',
  props: {
    options: {
      type: Array,
      required: true,
    },
    label:{
      type:String,
      required: true,
    },
    keyName:{
      type:String,
      required: true,
    },
    clear:{
      type:Number,
    }
  },
  data(){
    return{
      selected:null,
      hasChildren:false,
    }
  },
  watch:{
    clear(newV,oldV){
      if(newV){
        this.selected=null;
      }
    },
  },
  computed:{
    children() {
      if (!this.selected) return [];
      const option = this.options.find(option =>
          option[this.label] === this.selected);
      if(option && option.children){
        return option.children;
      }
      if(option && !option.children){
        this.$emit("hide-list",true)
        return [];
      }
      if(!option)return [];
    },
    // return option ? option.children ? option.children: [] : [];
  },
  methods:{

    chose(option){
      this.hasChildren = !!option.children;
      this.selected=option[this.label];
      this.$emit('has-children',this.hasChildren)
      this.$emit('choose-value',this.selected)

    }
  },
}
</script>



<style scoped>
* {
  padding: 0;
  margin: 0;
}
.cascader_box{
  display: flex;
  flex-direction: row;
  z-index: 999;
}
ul{
  width: 148px;
  max-height: 384px;
  margin-top: 4px;
  background-color: #FFFFFF;
  box-shadow:none;
  overflow-y: auto;
  border:none;
  padding: 0;
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
  z-index: 999;
  margin: 0;
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
  max-width: 98px;
  height: auto;
  font-size: 12px;
  line-height: 16px;
  color: #1D2129;
  white-space :pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
}
</style>