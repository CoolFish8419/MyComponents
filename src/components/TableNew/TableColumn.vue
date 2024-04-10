<template>
  <div class="div_operation">
  <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    prop: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '',
    },
    fixed:{
      type:String,
    },
    sort:{
      type:Boolean,
      default:false
    },
  },
};
</script >
<style scoped>
button{
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  line-height: 20px;
  color: #00BF7F;
  cursor: pointer;
}
button:hover{
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 191, 127, 0.8);
  cursor: pointer;
}
</style>