<template>
  <div class="back-tab clearfix">
    <div class="clearfix ui_fl">
      <span class="ui_fl">您当前所在：</span>
      <span class="ui_fl" @click="btnHome">主页</span>
      <span class="ui_fl ui_mar_left_12" style="color: #999">/</span>
      <div
        class="span_last ui_fl clearfix"
        v-for="(item, index) in tabList"
        :key="`${index}-tab`"
        @click="goBack(item)"
      >
        <div
          :key="`${index}-tab`"
          :class="{ active: index + 1 == tabList.length }"
          class="ui_fl"
        >
          {{ item.name }}
        </div>
        <span
          class="ui_fl ui_mar_left_12"
          style="color: #999"
          v-if="index + 1 != tabList.length"
          >/</span
        >
      </div>
    </div>
    <div class="ui_fr back" @click="toPage">返回上一页</div>
  </div>
</template>

<script>
import { inflateSync } from "zlib";

export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    hasClick: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    toPage() {
      if (this.hasClick) {
        this.$emit("back");
        return;
      }

      let route = [
        "TableManager",
        "EnquityManager",
        "OrderSearch",
        "TableManagerStatic",
        "Member",
        "MemberManagerList",
        "NpcList",
        "WriteOffList",
        "RightsList",
        "RightsTypeConfig",
        "RightsLevelConfig",
        "SignList",
        "NpcAdminNpcList",
        "NpcAdminWriteOffList",
        "NpcAdminRightsList",
        "NpcAdminInterestHistoryList",
        "SettleManager",
        "IntegrationLevelConfig",
        "CurrencyConfig",
        "EventTypeConfig",
        "StrategyConfig",
      ];
      if (route.indexOf(this.$route.name) !== -1) {
        this.$router.push("/Home");
      } else {
        this.$router.back(-1);
      }
    },
    goBack(item) {
      var that = this;
      let routerList = this.$router.options.routes[1].children;

      routerList.forEach((ele) => {
        if (ele.children) {
          ele.children.forEach((o) => {
            if (item.name == o.meta.title) {
              if (item.isBack == o.meta.isBack) {
                let paths = [
                  "/MemberManager/MemberValid",
                  "/MemberManager/MemberInfo",
                  "/MemberManager/MemberLevel",
                  "/MemberManager/MemberTask",
                  "/MemberManager/MemberFee",
                ];
                if (paths.indexOf(o.path) != -1) {
                  that.$router.push({
                    path: o.path,
                    query: {
                      id: sessionStorage.getItem("id"),
                      status: sessionStorage.getItem("status"),
                    },
                  });
                } else {
                  let paths = ["/MemberView/equityDetail"];
                  if (paths.indexOf(o.path) != -1) {
                    that.$router.push({
                      path: o.path,
                      query: {
                        id: sessionStorage.getItem("interestId"),
                        onSale: sessionStorage.getItem("onSale"),
                      },
                    });
                  } else {
                    that.$router.push({
                      path: o.path,
                    });
                  }
                }
              }
            }
          });
          return;
        }
        // if (item.isBack == ele.meta.isBack) {
        //   that.$router.push({
        //     path: ele.path,
        //   });
        // }
      });
    },
  },
};
</script>

<style scoped>
.back-tab {
  width: 100%;
  background-color: #ffffff;

  font-size: 12px;
  padding: 24px 32px 20px 24px;
}

.back-tab span:nth-child(1) {
  letter-spacing: 1px;
  color: #666666;
}
.back-tab span:nth-child(2) {
  letter-spacing: 1px;
  color: #999999;
  cursor: pointer;
}
.span_last {
  margin-left: 12px;
}
.span_last div {
  color: #999999;
  cursor: pointer;
}
.active {
  color: #333 !important;
}
.back {
  width: 101px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #4a84fa;
  background: url("../assets/image/icon_back_normal.png") no-repeat;
  background-size: 16px 13px;
  background-position: left center;
  text-align: right;
  cursor: pointer;
}
.back:hover {
  color: #285bc1;
  background: url("../assets/image/icon_back_hover.png") no-repeat;
  background-size: 16px 13px;
  background-position: left center;
}
</style>