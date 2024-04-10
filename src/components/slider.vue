<template>
  <div class="slider">
    <div class="slider-home">
      <user-info></user-info>
    </div>
    <div class="slider-menu">
      <div
        v-for="(item, index) in menu"
        :key="`${index}-item`"
        :class="item.className"
      >
        <div
          class="item ui_fl item-member"
          :class="{
            select:
              item.pathName == $route.name ||
              item.childName.indexOf($route.name) != -1
          }"
          @click="toPath(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "./UserInfo.vue";
import defaultObj from '@/constant/menu'
import StorageConst from "../utils/StorageConst";
export default {
  components: {
    UserInfo
  },

  data() {
    return {
      adminType:window.adminType,
      menu:[]
    };
  },
  watch: {
    $route: function() {
      // console.log(this.$route);
    }
  },
  mounted() {
      if(this.adminType === 'ADMIN'){
          //判断哪些按钮显示
        if(!this.isEmpty(localStorage.getItem(StorageConst.MENU_CODE_LIST))) {
          let menuCodeList = JSON.parse(localStorage.getItem(StorageConst.MENU_CODE_LIST));
          let menuShow = [];
          defaultObj.adminSliderList.forEach((item,index)=>{
            if(menuCodeList.indexOf(item.code)!==-1){
              item.isShow = true;
              menuShow.push(item);
            }
          });
          this.menu = menuShow;
        }

      } else {
          this.menu = defaultObj.npcSliderList;
      }
  },
  methods: {
    toPath(item) {
      // 相同路径不跳转
      if (this.$route.path === item.pathUrl) {
        return;
      }
      this.setPagination(1);
      this.$router.push(item.pathUrl);
    }
  }
};
</script>

<style scope>
  .slider-menu::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }

  .slider-menu::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #eee;
    /* background-image: -webkit-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
      ); */
  }

  .slider-menu::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
.slider {
  height: calc(100vh - 48px);
}

.slider-home {
  width: 100%;
  height: 226px;
  background-color: #00aaaa;
  overflow: hidden;
}

.slider-menu {
  height: calc(100% - 226px);
  background: #eef3fa;
  padding: 20px 0 0 22px;
  overflow-y: auto;
}

.avater {
  width: 56px;
  height: 56px;
  margin: 32px auto 18px;
}

img {
  width: 100%;
  height: 100%;
}

.name {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #ffffff;
  text-align: center;
}

.btns {
  width: 198px;
  padding: 11px 0;
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  margin: 28px auto 0;
}

.btn-item {
  width: 50%;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  cursor: pointer;
}

.has_left-border {
  border-left: solid 1px rgba(255, 255, 255, 0.45);
}

.item {
  width: 83px;
  height: 107px;
  padding: 64px 9px 12px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #777777;
  margin: 6px 16px;
  border-radius: 9px;
  cursor: pointer;
  text-align: center;
}

.member .item-member {
  background: url("../assets/image/slider/icon_member_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_member_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member .item-member.select {
  background: rgba(0, 170, 170, 1) url("../assets/image/slider/icon_member_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}
.enterprise .item-member {
  background: url("../assets/image/slider/icon_enterprise_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.enterprise:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_enterprise_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.enterprise .item-member.select {
  background: rgba(0, 170, 170, 1) url("../assets/image/slider/icon_enterprise_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.member-series .item-member {
  background: url("../assets/image/slider/icon_member_series_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-series:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_member_series_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-series .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_member_series_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.member-manager .item-member {
  background: url("../assets/image/slider/icon_member_manager_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-manager:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_member_manager_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-manager .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_member_manager_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.interests-search .item-member {
  background: url("../assets/image/slider/icon_interest_search_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-search:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_interest_search_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-search .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_interest_search_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.interests-history .item-member {
  background: url("../assets/image/slider/icon_interest_history_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-history:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_interest_history_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-history .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_interest_history_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.member-config .item-member {
  background: url("../assets/image/slider/icon_member_config_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-config:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_member_config_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.member-config .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_member_config_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.interests-config .item-member {
  background: url("../assets/image/slider/icon-member_config_strategy_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-config:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon-member_config_strategy_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-config .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon-member_config_strategy_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.interests-shop .item-member {
  background: url("../assets/image/slider/icon_interests_shop_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-shop:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_interests_shop_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-shop .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_interests_shop_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.npc-manager .item-member {
  background: url("../assets/image/slider/icon_npc_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.npc-manager:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_npc_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.npc-manager .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_npc_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.sys-info .item-member {
  background: url("../assets/image/slider/icon_sys_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.sys-info:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_sys_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.sys-info .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_sys_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

.interests-pool .item-member {
  background: url("../assets/image/slider/icon_interests_loop_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-pool:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_interests_loop_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.interests-pool .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_interests_loop_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}
.sign-manage .item-member {
  background: url("../assets/image/slider/icon_sign_manage_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.sign-manage:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_sign_manage_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.sign-manage .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_sign_manage_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}
.settle-manage .item-member {
  background: url("../assets/image/slider/icon_settle_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.settle-manage:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_settle_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.settle-manage .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_settle_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}
.strategy-manage .item-member {
  background: url("../assets/image/slider/icon_strategy_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.strategy-manage:hover .item-member {
  background: rgba(0, 170, 170, 0.1) url("../assets/image/slider/icon_strategy_normal.png") no-repeat center top 27px;
  background-size: 20px 20px;
}

.strategy-manage .item-member.select {
  background: #00aaaa url("../assets/image/slider/icon_strategy_hover.png") no-repeat center top 27px;
  background-size: 20px 20px;
  font-weight: bold;
  color: #fff;
}

</style>
