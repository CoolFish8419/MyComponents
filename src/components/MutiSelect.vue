<template>
  <div class="cx">
    <div class="box">
      <div class="content1"  @click="handleDrop">
        <span v-show="cList.length>0" v-for="(item,index) in cList" :key="index" class="item1">
          {{item.label}}
          <span @click.stop="delItem(index)">x</span>
        </span>
        <span v-show="cList.length<1" class="info">请选择</span>
      </div>
    </div>
    <div class="z">
      <ul v-show="visible" class="list">
        <li v-for="(item,index) in list" :key="index" :class="['item1',kList[index]?'active':'']"  @click="addItem(item,index)">
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MutiSelect",
    props:['list', 'selectList'],
    data(){
      return{
        visible: false,
        cList:[],
        kList:[]
      }
    },
    watch:{
      list:{
        handler(o){
          console.log(o);
          this.cList=[];//全部清空
          this.kList.length=this.list.length;
        },
        deep:true// 深度监听父组件传过来对象变化
      },
    },
    mounted() {
      this.kList.length=this.list.length;
      this.cList = this.selectList;
      document.addEventListener('click',this.outClick)
    },
    destroyed(){
      document.removeEventListener('click',this.outClick)
    },
    methods:{
      delItem(index){
        //cList index
        this.kList[this.cList[index].index]=false;
        this.cList.splice(index,1);
      },
      handleDrop(){
        this.visible=!this.visible
        if(this.cList.length > 0) {
          for (let i=0;i<this.cList.length;i++){
            for (let j=0;j <this.list.length; j++) {
              if(this.cList[i].key===this.list[j].key){
                this.kList[j]=true;
                return;
              }
            };
          }
        }
      },
      outClick(e){
        let dropRef= this.$el
        if(!dropRef.contains(e.target)&&this.visible){
          this.visible=false
        }
      },
      addItem(o,index){
        for (let i=0;i<this.cList.length;i++){
          if(this.cList[i].key===o.key){
            this.cList.splice(i,1);
            this.kList[index]=false;
            return;
          }
        }
        this.cList.push({...o,index:index});
        this.kList[index]=true;
        this.$emit('changeMuitSelect',  this.cList)
      }
    },
  }
</script>

<style scoped>
  *{
    font-size: 12px;
  }
  .cx{
    position: relative;
    display: inline-block;
    color: #125165;
    user-select: none;
  }
  .box{
    display: flex;
    width: 100%;
    left: 0;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #666;
    text-align: center;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background: #FFFFFF url("../assets/image/icon_select_arrow.png") no-repeat right 8px center;
    background-size: 10px 10px;
    cursor: pointer;

  }
  .box:hover{
    border: 1px solid #00aaaa;
  }
  .box>.content1{
    flex: 1;
  }
  .box>.content1>.info{
    height: 32px;
    line-height: 32px;
    display: block;
    color: #CCCCCC
  }
  .z{
    position: relative;
    display: block;
  }
  .box>.content1>.item1{
    display: inline-block;
    padding: 2px 10px;
    box-shadow: inset 0 0 0 1px #ddd;
    border-radius: 3px;
    margin-left: 5px;
    margin-top: 2px;
    float: left;
    line-height: 22px;
  }
  .box>.btn{
    width: 20px;
    text-align: center;
  }
  .cx>.list{
    position: absolute;
    top:40px;
  }
  ul{
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

  ul>li{
    display: block;
    height: auto;
    font-size: 12px;
    padding: 8px;
    text-align: left;
    color: #333333;
    font-weight: normal;
    line-height: 20px;
    overflow: hidden;
    cursor: pointer;
  }
  ul>li:hover, ul>li.active{
    background-color: #F8F8F8;
  }
</style>