<template>
  <div class="main_page_container" ref="root">
    <div class="bg_main_page" :style="{backgroundImage: 'url(' + bgSrc + ')'}"></div>
    <div class="operation_container">
      <div v-for="(item, index) in funcGroup" @click="getFuncInfo(item)" class="func_container" :key="index" @mouseover="showHover(index)" @mouseleave="hideHover(index)">
        <img v-if="item.logoSrc && !funcItems[index].hover" class="icon_func_logo" :src="item.logoSrc" alt="" >
        <img v-if="item.logoHoverSrc && funcItems[index].hover" class="icon_func_logo" :src="item.logoHoverSrc" alt="" >
        <div class="text_func_name">{{item.name}}</div>
      </div>
    </div>
    <div class="footer_box">
      <div v-for="option in footerText" class="footer_container">
        <span v-if="option.type==='title'" class="footer_title">
        {{option.content}}
        </span>
        <span v-if="option.type==='separator'" class="footer_separator">
          {{option.content}}
        </span>
        <span v-if="option.type==='text'" class="footer_text">{{option.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  props: {
    bgSrc: "",
    funcGroup: [],
    footerText:[],
  },
  data(){
    return{
      funcItems:[],
      operationContainer: null,
      footerEl: null
    }
  },
  methods: {
    getFuncInfo(item) {
      this.$emit("getFuncInfo", item);
    },
    showHover(index) {
      this.funcItems[index].hover = true;
    },
    hideHover(index) {
      this.funcItems[index].hover = false;
    },
    handleResize() {
      const topValue = window.innerHeight * 0.05-180;
      this.operationContainer.style.top = `${topValue}px`;
      if(window.innerHeight<830){
        this.fixFooter()
      }
      else {
        this.freeFooter()
      }
    },
    fixFooter() {
      this.footerEl.style.position = 'relative';
      this.footerEl.style.top = '-80px';
      this.footerEl.style.height = '10px';
    },
    freeFooter() {
      this.footerEl.style.position = 'absolute';
      this.footerEl.style.top = '';
      this.footerEl.style.height = '';
    },
  },
  created() {
    this.funcItems = this.funcGroup.map(item => {
      return {
        ...item,
        hover: false
      };
    });
  },
  mounted() {
    this.operationContainer = document.querySelector('.operation_container');
    this.footerEl = document.querySelector('.footer_box');
    if(window.innerHeight<830){
      this.handleResize()
      this.operationContainer.style.top = `-120px`;
      this.footerEl.style.bottom = '-40px';
    }
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.main_page_container {
  width: 100%;
  height: 100%;
  min-width: 768px;
  box-sizing: border-box;
  flex-direction: column;
}

.bg_main_page {
  width: 100%;
  height: 450px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
@media (max-width: 768px) {
  .bg_main_page {
    background-size: contain;
  }
}
.operation_container {
  position: relative;
  display: flex;
  flex-direction: row;
  top: -48px;
  width: fit-content;
  min-height: 212px;
  margin: 0 auto;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 5px rgba(25, 44, 76, 0.05);
  border-radius: 12px;
}

.func_container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 180px;
  height: 154px;
  margin: 29px 16px;
  align-items: center;
  justify-content: center;
  background-color: rgba(216, 216, 216, 0);
  border-radius: 8px;
  cursor: pointer;
}
.func_container:hover .text_func_name{
  color: #1F406A;
}
.func_container:nth-child(1) {
  margin-left: 69px;
}
.func_container:nth-last-child(1) {
  margin-right: 66px;
}

.icon_func_logo {
  width: 80px;
  height: 80px;
  background: center no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.text_func_name {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: #666666;
}

.footer_box{
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
  margin-bottom: 58px;
}
.footer_container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer_title {
  font-size: 16px;
  color: #666666;
}
.footer_separator {
  font-size: 16px;
  color: #666666;
  margin-bottom: 16px;
}
.footer_text {
  font-size: 12px;
  color: #999999;
  margin-top: 8px;
}
</style>