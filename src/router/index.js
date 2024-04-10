import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/Login");
const Home = () => import("../views/Home.vue");
const Container = () => import("../views/container");
const MemberView = () => import("../views/admin/member/views.vue");
const Member = () => import("../views/admin/member/member.vue");
const MemberDetail = () => import("../views/admin/member/memberDetail.vue");
const MemberShipDetail = () => import("../views/admin/member/member-ship-detail.vue");
const WriteOffList = () => import("../views/admin/writeOff/list.vue");
const InterestHistoryList = () => import("../views/admin/interest-history/list.vue");
const WriteOffDetail = () => import("../views/admin/writeOff/detail.vue");

//企业管理
const Enterprise = () => import("../views/admin/enterprise/enterprise.vue");
const EnterpriseDetail = () => import("../views/admin/enterprise/enterpriseDetail.vue");
const EnterpriseShipDetail = () => import("../views/admin/enterprise/enterprise-ship-detail.vue");

//集团管理
const Group = () => import("../views/admin/group/group.vue");

const NpcList = () => import("../views/admin/npc/list.vue");
const NpcDetail = () => import("../views/admin/npc/detail.vue");
const NpcModify = () => import("../views/admin/npc/modify.vue");
const RightsList = () => import("../views/admin/rights/list.vue");
const RightsAdd = () => import("../views/admin/rights/add.vue");
const RightsDetail = () => import("../views/admin/rights/detail.vue");
const RightsImageConfig = () => import("../views/admin/rights/imageConfig.vue");
const RightsPicConfig = () => import("../views/admin/rights/picConfig.vue");
const RightsTypeConfig = () => import("../views/admin/rights/typeConfig.vue");
const RightsLevelConfig = () => import("../views/admin/rights/levelConfig.vue");
// 权益商城
const OrderSearch = () => import("../views/admin/interest-shop/order-search.vue");
const EnquityManager = () => import("../views/admin/interest-shop/equity-manager.vue");
const PackageManager = () => import("../views/admin/interest-shop/package-manager.vue");
const TableManager = () => import("../views/admin/interest-shop/table-manager");
const TableManagerStatic = () => import("../views/admin/interest-shop/table-manager-static");
const OrderDetail = () => import("../views/admin/interest-shop/order-detail");
const equityDetail = () => import("../views/admin/interest-shop/equity-detail");
const PackageDetail = () => import("../views/admin/interest-shop/package-detail.vue");
const PictureText = () => import("../views/admin/interest-shop/picture-text");
// 惠民季管理
const MemberManagerList = () => import("../views/admin/member-manager/member-manager-list");
const MemberConfigDetail = () => import("../views/admin/member-manager/member-config-detail");
const MemberInfo = () => import("../views/admin/member-manager/member-config-info");
const MemberValid = () => import("../views/admin/member-manager/member-config-valid");
const MemberLevel = () => import("../views/admin/member-manager/member-config-level");
const MemberTask = () => import("../views/admin/member-manager/member-config-task");
const MemberFee = () => import("../views/admin/member-manager/member-config-fee");
const MemberIntegral = () => import("../views/admin/member-manager/member-config-integral");
const MemberPictureText = () => import("../views/admin/member-manager/picture-text");
const MemberPicTextDetail = () => import("../views/admin/member-manager/show-pic-detail");
const MemberShareClick = () => import("../views/admin/member-manager/member-share-click");
const MemberShareJoin = () => import("../views/admin/member-manager/member-share-join");
const MemberSharePoster = () => import("../views/admin/member-manager/member-share-poster");
// 惠民季系列
const MemberSeriesList = () => import("../views/admin/member-series/member-series-list");
const LevelConfig = () => import("../views/admin/member-series/level-config");
// 报名管理
const SignList = () => import("../views/admin/sign-manage/list");
const SignDetail = () => import("../views/admin/sign-manage/detail");
//积分策略配置
const IntegrationLevelConfig = () => import('@/views/admin/integration/LevelConfig');
const CurrencyConfig = () => import('@/views/admin/integration/CurrencyConfig');
const EventTypeConfig = () => import('@/views/admin/integration/EventTypeConfig');
const StrategyConfig = () => import('@/views/admin/integration/StrategyConfig');
const AnnualRingConfig = () => import('@/views/admin/integration/AnnualRingConfig');


//npm admin router
const NpcAdminNpcList = () => import("../views/npcadmin/npc/list.vue");
const NpcAdminInterestHistoryList = () => import("../views/npcadmin/interest-history/list.vue");
const NpcAdminRightsList = () => import("../views/npcadmin/rights/list.vue");
const NpcAdminRightsDetail = () => import("../views/npcadmin/rights/detail.vue");
const NpcAdminRightsImageConfig = () => import("../views/npcadmin/rights/imageConfig.vue");
const NpcAdminWriteOffList = () => import("../views/npcadmin/writeOff/list.vue");
const NpcAdminWriteOffDetail = () => import("../views/npcadmin/writeOff/detail.vue");



//Common router
const SettleManager = () => import('@/views/common/settleManager');
const SettleManagerInfo = () => import('@/views/common/settleInfo');
const Test = () =>import('@/views/test');
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Test",
    component: Test,
    meta: {
      title: "测试"
    }
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    name: "container",
    component: Container,
    redirect: "Home",
    children: [
      {
        path: "/Home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "/MemberView",
        name: "MemberView",
        component: MemberView,
        meta: {
          title: "主页"
        },
        children: [
          {
            path: "/IntegrationLevelConfig",
            name:'IntegrationLevelConfig',
            component:IntegrationLevelConfig,
            meta:{
              title:'积分策略配置'
            }
          },
          {
            path: "/AnnualRingConfig",
            name:'AnnualRingConfig',
            component:AnnualRingConfig,
            meta:{
              title:'积分策略配置'
            }
          },
          {
            path: "/CurrencyConfig",
            name:'CurrencyConfig',
            component:CurrencyConfig,
            meta:{
              title:'积分策略配置'
            }
          },
          {
            path:'/EventTypeConfig',
            name:'EventTypeConfig',
            component:EventTypeConfig,
            meta:{
              title:'积分策略配置'
            }
          },
          {
            path:'/StrategyConfig',
            name:'StrategyConfig',
            component:StrategyConfig,
            meta:{
              title:'积分策略配置'
            }
          },
          {
            path: "/EnterpriseView/Enterprise",
            name: "Enterprise",
            component: Enterprise,
            meta: {
              title: "企业管理"
            }
          },
          {
            path: "/EnterpriseView/EnterpriseDetail",
            name: "EnterpriseDetail",
            component: EnterpriseDetail,
            meta: {
              title: "企业详情"
            }
          },
          {
            path: "/EnterpriseView/EnterpriseShipDetail",
            name: "EnterpriseShipDetail",
            component: EnterpriseShipDetail,
            meta: {
              title: window.config.Module_Name_Activity + "详情"
            }
          },
          {
            path: "/MemberView/Member",
            name: "Member",
            component: Member,
            meta: {
              title: window.config.Login_Name + "管理"
            }
          },
          {
            path: "/MemberView/MemberDetail",
            name: "MemberDetail",
            component: MemberDetail,
            meta: {
              title: window.config.Module_Name+"详情"
            }
          },
          {
            path: "/MemberView/MemberShipDetail",
            name: "MemberShipDetail",
            component: MemberShipDetail,
            meta: {
              title: window.config.Module_Name_Activity + "详情"
            }
          },
          {
            path: "/WriteOff/List",
            name: "WriteOffList",
            component: WriteOffList,
            meta: {
              title: "权益发放查询",
              isBack:"00"
            }
          },
          {
            path: "/InterestHistory/List",
            name: "InterestHistoryList",
            component: InterestHistoryList,
            meta: {
              title: "权益核销查询"
            }
          },
          {
            path: "/WriteOff/Detail",
            name: "WriteOffDetail",
            component: WriteOffDetail,
            meta: {
              title: "权益详情"
            }
          },
          {
            path: "/Npc/Group",
            name: "Group",
            component: Group,
            meta: {
              title: "集团管理"
            }
          },
          {
            path: "/Npc/List",
            name: "NpcList",
            component: NpcList,
            meta: {
              title: "NPC管理"
            }
          },
          {
            path: "/Npc/Detail",
            name: "NpcDetail",
            component: NpcDetail,
            meta: {
              title: "NPC详情"
            }
          },
          {
            path: "/Npc/Modify",
            name: "NpcModify",
            component: NpcModify,
            meta: {
              title: "NPC信息修改"
            }
          },
          {
            path: "/Rights/List",
            name: "RightsList",
            component: RightsList,
            meta: {
              title: "权益池（权益池查询）"
            }
          },
          {
            path: "/Rights/Add",
            name: "RightsAdd",
            component: RightsAdd,
            meta: {
              title: "权益新增"
            }
          },
          {
            path: "/Rights/Detail",
            name: "RightsDetail",
            component: RightsDetail,
            meta: {
              title: "权益详情",
              isBack: "01"
            }
          },
          {
            path: "/Rights/ImageConfig",
            name: "RightsImageConfig",
            component: RightsImageConfig,
            meta: {
              title: "查看图文详情"
            }
          },
          {
            path: "/Rights/PicConfig",
            name: "RightsPicConfig",
            component: RightsPicConfig,
            meta: {
              title: "配置图文"
            }
          },
          {
            path: "/Rights/TypeConfig",
            name: "RightsTypeConfig",
            component: RightsTypeConfig,
            meta: {
              title: "权益池（权益池配置）"
            }
          },
          {
            path: "/Rights/LevelConfig",
            name: "RightsLevelConfig",
            component: RightsLevelConfig,
            meta: {
              title: "权益池（权益池配置）"
            }
          },
          {
            path: "/MemberView/OrderSearch",
            name: "OrderSearch",
            component: OrderSearch,
            meta: {
              title: "权益商城（订单查询）"
            }
          },
          {
            path: "/MemberView/OrderDetail",
            name: "OrderDetail",
            component: OrderDetail,
            meta: {
              title: "订单详情"
            }
          },
          {
            path: "/MemberView/equityDetail",
            name: "equityDetail",
            component: equityDetail,
            meta: {
              title: "权益商城（售卖权益详情）"
            }
          },
          {
            path: "/MemberView/PackageDetail",
            name: "PackageDetail",
            component: PackageDetail,
            meta: {
              title: "权益商城（权益包详情）"
            }
          },
          {
            path: "/MemberView/PictureText",
            name: "PictureText",
            component: PictureText,
            meta: {
              title: "图文详情"
            }
          },

          {
            path: "/MemberView/EnquityManager",
            name: "EnquityManager",
            component: EnquityManager,
            meta: {
              title: "权益商城（售卖权益管理）"
            }
          },
          {
            path: "/MemberView/PackageManager",
            name: "PackageManager",
            component: PackageManager,
            meta: {
              title: "权益商城（权益包管理）"
            }
          },
          {
            path: "/MemberView/TableManager",
            name: "TableManager",
            component: TableManager,
            meta: {
              title: "权益商城（报表管理）",
              isBack: "01"
            }
          },
          {
            path: "/MemberView/TableManagerStatic",
            name: "TableManagerStatic",
            component: TableManagerStatic,
            meta: {
              title: "权益商城（报表管理）",
              isBack: "02"
            }
          },
          {
            path: "/MemberManager/MemberManagerList",
            name: "MemberManagerList",
            component: MemberManagerList,
            meta: {
              title: window.config.Module_Name_Activity +  "管理"
            }
          },
          {
            path: "/MemberManager/MemberConfigDetail",
            name: "MemberConfigDetail",
            component: MemberConfigDetail,
            meta: {
              title: window.config.Module_Name_Activity + "详情"
            }
          },
          {
            path: "/MemberManager/MemberInfo",
            name: "MemberInfo",
            component: MemberInfo,
            meta: {
              title:  window.config.Module_Name_Activity + "配置",
              isBack: "01"
            }
          },
          {
            path: "/MemberManager/MemberValid",
            name: "MemberValid",
            component: MemberValid,
            meta: {
              title: window.config.Module_Name_Activity + "配置",
              isBack: "02"
            }
          },
          {
            path: "/MemberManager/MemberLevel",
            name: "MemberLevel",
            component: MemberLevel,
            meta: {
              title: window.config.Module_Name_Activity + "配置",
              isBack: "03"
            }
          },
          {
            path: "/MemberManager/MemberTask",
            name: "MemberTask",
            component: MemberTask,
            meta: {
              title: window.config.Module_Name_Activity + "配置",
              isBack: "04"
            }
          },
          {
            path: "/MemberManager/MemberFee",
            name: "MemberFee",
            component: MemberFee,
            meta: {
              title: window.config.Module_Name_Activity + "配置",
              isBack: "05"
            }
          },
          {
            path: "/MemberManager/MemberIntegral",
            name: "MemberIntegral",
            component: MemberIntegral,
            meta: {
              title: window.config.Module_Name_Activity + "配置",
              isBack: "06"
            }
          },

          {
            path: "/MemberManager/MemberPictureText",
            name: "MemberPictureText",
            component: MemberPictureText,
            meta: {
              title: "图文详情"
            }
          },
          {
            path: "/MemberManager/MemberShareClick",
            name: "MemberShareClick",
            component: MemberShareClick,
            meta: {
              title: window.config.Module_Name_Activity + "分享码权益配置"
            }
          },
            {
                path: "/MemberManager/MemberShareJoin",
                name: "MemberShareJoin",
                component: MemberShareJoin,
                meta: {
                    title: window.config.Module_Name_Activity + "分享码权益配置"
                }
            },
            {
                path: "/MemberManager/MemberSharePoster",
                name: "MemberSharePoster",
                component: MemberSharePoster,
                meta: {
                    title: window.config.Module_Name_Activity + "分享码权益配置"
                }
            },
          {
            path: "/MemberManager/MemberPicTextDetail",
            name: "MemberPicTextDetail",
            component: MemberPicTextDetail,
            meta: {
              title: "图文详情"
            }
          },
          {
            path: "/MemberSeries/MemberSeriesList",
            name: "MemberSeriesList",
            component: MemberSeriesList,
            meta: {
              title: window.config.Module_Name_Activity + "系列"
            }
          },
          {
            path: "/MemberSeries/LevelConfig",
            name: "LevelConfig",
            component: LevelConfig,
            meta: {
              title: "等级配置"
            }
          },
          {
            path: "/SignManage/List",
            name: "SignList",
            component: SignList,
            meta: {
              title: "报名管理"
            }
          },
          {
            path: "/SignManage/Detail",
            name: "SignDetail",
            component: SignDetail,
            meta: {
              title: "报名详情"
            }
          },
          {
            path: "/NpcAdminNpcList",
            name: "NpcAdminNpcList",
            component: NpcAdminNpcList,
            meta: {
              title: "门店管理"
            }
          },
          {
            path: "/NpcAdminInterestHistoryList",
            name: "NpcAdminInterestHistoryList",
            component: NpcAdminInterestHistoryList,
            meta: {
              title: "权益核销查询",
              isBack:"01"
            }
          },
          {
            path: "/NpcAdminRightsList",
            name: "NpcAdminRightsList",
            component: NpcAdminRightsList,
            meta: {
              title: "权益池",
              isBack:'npc-01'
            }
          },
          {
            path: "/NpcAdminRightsDetail",
            name: "NpcAdminRightsDetail",
            component: NpcAdminRightsDetail,
            meta: {
              title: "权益详情",
              isBack:'npc-02'
            }
          },
          {
            path: "/NpcAdminRightsImageConfig",
            name: "NpcAdminRightsImageConfig",
            component: NpcAdminRightsImageConfig,
            meta: {
              title: "查看图文详情"
            }
          },
          {
            path: "/NpcAdminWriteOffList",
            name: "NpcAdminWriteOffList",
            component: NpcAdminWriteOffList,
            meta: {
              title: "权益发放查询",
                isBack:"01"
            }
          },
          {
            path: "/NpcAdminWriteOffDetail",
            name: "NpcAdminWriteOffDetail",
            component: NpcAdminWriteOffDetail,
            meta: {
              title: "权益详情"
            }
          },
          {
            path: "/SettleManager",
            name: "SettleManager",
            component: SettleManager,
            meta: {
              title: "结算账单管理"
            }
          },
          {
            path: "/SettleManagerInfo",
            name: "SettleManagerInfo",
            component: SettleManagerInfo,
            meta: {
              title: "结算账单明细"
            }
          }

        ]
      }

    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
