<template>
  <div v-if="isShow" class="clearfix">
    <MiddleCenterDlg>
      <div
        class="ui_dlg_container"
        style="width: 1064px; padding: 24px 0 48px"
      >
        <div
          class="close_div"
          @click="closeDialog"
          v-if="type == 'DETAIL'"
        ></div>
        <div class="detail-info">
          <div class="header-div-title ui_mar_left_24">门店列表</div>
        </div>
        <div class="ui_container txt_hint_table">
          {{isEmpty(merchantName)?'':'NPC名称：'}}<span class="color_orange">{{ merchantName }}</span>
        </div>
        <div
          class="ui_container ui_mar_top_8"
          style="padding: 0 42px; max-height: 326px; overflow-y: auto"
        >
          <table
            class="cs_table cs_table_font_sm cs_td_divider_none cs_thead_fixed"
            width="100%"
          >
            <thead>
              <tr>
                <th width="44px">序号</th>
                <th width="250px">门店名称</th>
                <th width="124px">联系人</th>
                <th width="142px">电话</th>
                <th width="342px">地址</th>
                <th v-if="type === 'MODIFY' || type === 'ADD'" width="72px">
                  操作
                </th>
              </tr>
            </thead>
            <tbody style="max-height: 285px">
              <tr v-for="(item, index) in shopList" :key="`${index}-table`">
                <td width="44px">{{ index + 1 }}</td>
                <td width="250px">{{ item.shopName }}</td>
                <td width="124px">{{ item.linkName }}</td>
                <td width="142px">{{ item.linkPhone }}</td>
                <td width="342px">{{ item.linkAddress }}</td>
                <td
                  v-if="type === 'MODIFY' || type === 'ADD'"
                  width="72px"
                  class="relative"
                >
                  <div class="clearfix" @click="selectItem(item)">
                    <img
                      v-if="item.isSelect"
                      class="icon_turn"
                      src="../../src/assets/image/icon_turn_on.png"
                    />
                    <img
                      v-else
                      class="icon_turn"
                      src="../../src/assets/image/icon_turn_off.png"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <empty v-if="shopList.length == 0"></empty>
        </div>
        <template v-if="type === 'MODIFY' || type === 'ADD'">
          <div class="ui_container cs_align_right cs_margin_top_sm">
            <div class="icon_radio" :class="{'icon_check':isSelectAll}" @click="selectAll"></div>
            <div class="txt_select_all cs_margin_left_xs" @click="selectAll">全选</div>
          </div>
          <div class="ui_container cs_align_center">
            <button
                @click="closeDialog"
                class="bottom_btn_cancel"
                style="margin-top: 40px"
            >
              取消
            </button>
            <button
                @click="saveDialog"
                class="bottom_btn_confirm ui_mar_left_48"
                style="margin-top: 40px"
            >
              保存
            </button>
          </div>
        </template>
      </div>
    </MiddleCenterDlg>
  </div>
</template>

<script>
import MiddleCenterDlg from "./MiddleCenterDlg";

export default {
  components: {
    MiddleCenterDlg,
  },
  name: "StoreDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "DETAIL", //DETAIL:详情，MODIFY:编辑，ADD:
    },
    shopList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    merchantName: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
        isSelectAll: false,
    };
  },
  methods: {
      initSelectAll() {
          this.isSelectAll = !this.shopList.some(item => {
              if (!item.isSelect) {
                  return true
              }
          });
      },
      selectAll(){
          this.isSelectAll = !this.isSelectAll;
          if(this.isSelectAll){
              this.shopList.forEach(item=>{
                  item.isSelect = true;
              })
          }else{
              this.shopList.forEach(item=>{
                  item.isSelect = false;
              })
          }
      },
    closeDialog() {
      this.$emit("close-dialog");
    },
    selectItem(item) {
      item.isSelect = !item.isSelect;
      this.initSelectAll();
    },
    saveDialog() {
      this.$emit("save-dialog", this.shopList);
    },
  },
  watch: {
      isShow: {
          handler(newName, oldName) {
              console.log(newName);
              this.initSelectAll();
          },
          immediate: true
      }
  },
};
</script>

<style scoped>
.txt_hint_table {
  margin-top: 10px;
  padding-right: 42px;
  height: 22px;
  line-height: 22px;
  text-align: right;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
}
.color_orange {
  color: #ffb54c;
  font-weight: bold;
}
.icon_turn {
  width: 40px;
  height: 20px;
}
.icon_radio{
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-top: 3px;
  width: 16px;
  height: 16px;
  background: url('../assets/image/icon_radio.png') no-repeat center;
  background-size: 16px 16px;
}
.icon_check{
  background: url('../assets/image/icon_radio_check.png') no-repeat center;
  background-size: 16px 16px;
}
  .txt_select_all{
    position: relative;
    display: inline-block;
    vertical-align: top;
    padding-right: 42px;
    height: 22px;
    line-height: 22px;
    text-align: right;
    font-size: 14px;
    color: #333333;
  }
</style>
