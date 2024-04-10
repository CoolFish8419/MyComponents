var adminHomeList = [
    {
        code: 'USER',
        isShow: false,
        name: window.config.Module_Name + "管理",
        className: "member",
        imgUrl: require("@/assets/image/icon_member.png"),
        pathUrl: "/MemberView/Member",
        pathName: "Member",
        childName: ["MemberDetail", "MemberShipDetail"]
    },
    {
        code: 'USER',
        isShow: false,
        name: "企业管理",
        className: "enterprise",
        imgUrl: require("@/assets/image/icon_enterprise.png"),
        pathUrl: "/EnterpriseView/Enterprise",
        pathName: "Enterprise",
        childName: ["EnterpriseDetail", "EnterpriseShipDetail"]
    },
    {
        code: 'SERIES',
        isShow: false,
        name: window.config.Module_Name_Activity + "系列",
        className: "member-series",
        imgUrl: require("@/assets/image/icon_member_series.png"),
        pathUrl: "/MemberSeries/MemberSeriesList",
        pathName: "MemberSeriesList",
        childName: ["LevelConfig"]
    },
    {
        code: 'ACTIVITY',
        isShow: false,
        name: window.config.Module_Name_Activity + "管理",
        className: "member-manager",
        imgUrl: require("@/assets/image/icon_member_manager.png"),
        pathUrl: "/MemberManager/MemberManagerList",
        pathName: "MemberManagerList",
        childName: [
            "MemberInfo",
            "MemberValid",
            "MemberLevel",
            "MemberTask",
            "MemberFee",
            "MemberPictureText",
            "MemberPicTextDetail",
            "MemberConfigDetail",
            "MemberIntegral",
            "MemberShareClick",
            "MemberShareJoin",
            "MemberSharePoster"
        ]
    },
    {
        code: 'DELIVERY',
        isShow: false,
        name: "权益发放查询",
        className: "interests-search",
        imgUrl: require("@/assets/image/icon_hx_interests.png"),
        pathUrl: "/WriteOff/List",
        pathName: "WriteOffList",
        childName: ["WriteOffDetail"]
    },
    {
        code: 'MALL',
        isShow: false,
        name: "权益商城",
        className: "interests-shop",
        imgUrl: require("@/assets/image/icon_interests_shop.png"),
        pathUrl: "/MemberView/OrderSearch",
        pathName: 'OrderSearch',
        childName: [
            "OrderSearch",
            "EnquityManager",
            "TableManager",
            "TableManagerStatic",
            "OrderDetail",
            "equityDetail",
            "PictureText"
        ]
    },
    {
        code: 'VERIFY',
        isShow: false,
        name: "权益核销查询",
        className: "interests-history",
        imgUrl: require("@/assets/image/icon_interests_history.png"),
        pathUrl: "/InterestHistory/List",
        pathName: 'InterestHistoryList',
        childName: []
    },
    {
        code: 'NPC',
        isShow: false,
        name: "NPC管理",
        className: "npc-manager",
        imgUrl: require("@/assets/image/icon_npc.png"),
        pathUrl: "/Npc/List",
        pathName: "NpcList",
        childName: ["NpcDetail", "NpcModify"]
    },
    {
        code: 'INTEREST',
        isShow: false,
        name: "权益池",
        className: "interests-pool",
        imgUrl: require("@/assets/image/icon_interests_pool.png"),
        pathUrl: "/Rights/List",
        pathName: "RightsList",
        childName: [
            "RightsTypeConfig",
            "RightsLevelConfig",
            "RightsAdd",
            "RightsDetail",
            "RightsImageConfig",
            "RightsPicConfig"
        ]
    },
    {
        code: 'ACTIVITY_ORDER',
        isShow: false,
        name: "报名管理",
        className: "sign-manage",
        imgUrl: require("@/assets/image/icon_sign_manage.png"),
        pathUrl: "/SignManage/List",
        pathName: "SignList",
        childName: ["SignDetail"]
    },
    {
        code: 'POINT',
        isShow: false,
        name: "平台积分策略",
        className: "integral-config",
        imgUrl: require("@/assets/image/icon_strategy.png"),
        pathUrl: "/IntegrationLevelConfig",
        pathName: "IntegrationLevelConfig",
        childName: ['IntegrationLevelConfig', 'StrategyConfig', 'CurrencyConfig', 'EventTypeConfig']
    },
    {
        code: 'BILL',
        isShow: false,
        name: "结算账单管理",
        className: "settle-manage",
        imgUrl: require("@/assets/image/icon_settle.png"),
        pathUrl: "/SettleManager",
        pathName: "SettleManager",
        childName: ['SettleManagerInfo']
    }
];
var adminSliderList = [
    {
        code: 'USER',
        isShow: false,
        name: window.config.Module_Name + "管理",
        className: "member",
        imgUrl: require("@/assets/image/icon_member.png"),
        pathUrl: "/MemberView/Member",
        pathName: "Member",
        childName: ["MemberDetail", "MemberShipDetail"]
    },
    {
        code: 'USER',
        isShow: false,
        name: "企业管理",
        className: "enterprise",
        imgUrl: require("@/assets/image/icon_enterprise.png"),
        pathUrl: "/EnterpriseView/Enterprise",
        pathName: "Enterprise",
        childName: ["EnterpriseDetail", "EnterpriseShipDetail"]
    },
    {
        code: 'SERIES',
        isShow: false,
        name: window.config.Module_Name_Activity + "系列",
        className: "member-series",
        imgUrl: require("@/assets/image/icon_member_series.png"),
        pathUrl: "/MemberSeries/MemberSeriesList",
        pathName: "MemberSeriesList",
        childName: ["LevelConfig"]
    },
    {
        code: 'ACTIVITY',
        isShow: false,
        name: window.config.Module_Name_Activity + "管理",
        className: "member-manager",
        imgUrl: require("@/assets/image/icon_member_manager.png"),
        pathUrl: "/MemberManager/MemberManagerList",
        pathName: "MemberManagerList",
        childName: [
            "MemberInfo",
            "MemberValid",
            "MemberLevel",
            "MemberTask",
            "MemberFee",
            "MemberPictureText",
            "MemberPicTextDetail",
            "MemberConfigDetail",
            "MemberIntegral",
            "MemberShareClick",
            "MemberShareJoin",
            "MemberSharePoster"
        ]
    },
    {
        code: 'DELIVERY',
        isShow: false,
        name: "权益发放\n查询",
        className: "interests-search",
        imgUrl: require("@/assets/image/icon_hx_interests.png"),
        pathUrl: "/WriteOff/List",
        pathName: "WriteOffList",
        childName: ["WriteOffDetail"]
    },
    {
        code: 'MALL',
        isShow: false,
        name: "权益商城",
        className: "interests-shop",
        imgUrl: require("@/assets/image/icon_interests_shop.png"),
        pathUrl: "/MemberView/OrderSearch",
        pathName: 'OrderSearch',
        childName: [
            "OrderSearch",
            "EnquityManager",
            "PackageManager",
            "TableManager",
            "TableManagerStatic",
            "OrderDetail",
            "equityDetail",
            "PackageDetail",
            "PictureText"
        ]
    },
    {
        code: 'VERIFY',
        isShow: false,
        name: "权益核销\n查询",
        className: "interests-history",
        imgUrl: require("@/assets/image/icon_interests_history.png"),
        pathUrl: "/InterestHistory/List",
        pathName: 'InterestHistoryList',
        childName: []
    },
    {
        code: 'NPC',
        isShow: false,
        name: "NPC管理",
        className: "npc-manager",
        imgUrl: require("@/assets/image/icon_npc.png"),
        pathUrl: "/Npc/List",
        pathName: "NpcList",
        childName: ["Group", "NpcDetail", "NpcModify"]
    },
    {
        code: 'INTEREST',
        isShow: false,
        name: "权益池",
        className: "interests-pool",
        imgUrl: require("@/assets/image/icon_interests_pool.png"),
        pathUrl: "/Rights/List",
        pathName: "RightsList",
        childName: [
            "RightsTypeConfig",
            "RightsLevelConfig",
            "RightsAdd",
            "RightsDetail",
            "RightsImageConfig",
            "RightsPicConfig"
        ]
    },
    {
        code: 'ACTIVITY_ORDER',
        isShow: false,
        name: "报名管理",
        className: "sign-manage",
        imgUrl: require("@/assets/image/icon_sign_manage.png"),
        pathUrl: "/SignManage/List",
        pathName: "SignList",
        childName: ["SignDetail"]
    },
    {
        code: 'POINT',
        isShow: false,
        name: "平台积分\n策略",
        className: "strategy-manage",
        imgUrl: require("@/assets/image/icon_strategy.png"),
        pathUrl: "/IntegrationLevelConfig",
        pathName: "IntegrationLevelConfig",
        childName: ['IntegrationLevelConfig', 'StrategyConfig', 'CurrencyConfig', 'EventTypeConfig']
    },
    {
        code: 'BILL',
        isShow: false,
        name: "结算账单\n管理",
        className: "settle-manage",
        imgUrl: require("@/assets/image/icon_settle.png"),
        pathUrl: "/SettleManager",
        pathName: "SettleManager",
        childName: ['SettleManagerInfo']
    }
];
var npcHomeList = [
    {
        code: 'USER',
        isShow: true,
        name: "门店管理",
        className: "npc-manager",
        imgUrl: require("@/assets/image/icon_npc.png"),
        pathUrl: "/NpcAdminNpcList",
        pathName: "NpcAdminNpcList",
        childName: []
    },
    {
        code: 'DELIVERY',
        isShow: true,
        name: "权益发放查询",
        className: "interests-search",
        imgUrl: require("@/assets/image/icon_hx_interests.png"),
        pathUrl: "/NpcAdminWriteOffList",
        pathName: "NpcAdminWriteOffList",
        childName: ["NpcAdminWriteOffDetail"]
    },
    {
        code: 'VERIFY',
        isShow: true,
        name: "权益核销查询",
        className: "interests-history",
        imgUrl: require("@/assets/image/icon_interests_history.png"),
        pathUrl: "/NpcAdminInterestHistoryList",
        pathName: "NpcAdminInterestHistoryList",
        childName: []
    },
    // {
    //   code:'INTEREST',
    //   isShow: true,
    //   name: "权益池",
    //   className: "interests-pool",
    //   imgUrl: require("@/assets/image/icon_interests_pool.png"),
    //   pathUrl: "/NpcAdminRightsList",
    //   pathName: "NpcAdminRightsList",
    //   childName: [
    //     "NpcAdminRightsImageConfig",
    //     "NpcAdminRightsDetail",
    //   ]
    // },
    {
        code: 'BILL',
        isShow: true,
        name: "结算账单管理",
        className: "settle-manage",
        imgUrl: require("@/assets/image/icon_sign_manage.png"),
        pathUrl: "/SettleManager",
        pathName: "SettleManager",
        childName: ['SettleManagerInfo']
    }
];
var npcSliderList = [
    {
        code: 'USER',
        isShow: true,
        name: "门店管理",
        className: "npc-manager",
        imgUrl: require("@/assets/image/icon_npc.png"),
        pathUrl: "/NpcAdminNpcList",
        pathName: "NpcAdminNpcList",
        childName: []
    },
    {
        code: 'DELIVERY',
        isShow: true,
        name: "权益发放\n查询",
        className: "interests-search",
        imgUrl: require("@/assets/image/icon_hx_interests.png"),
        pathUrl: "/NpcAdminWriteOffList",
        pathName: "NpcAdminWriteOffList",
        childName: ["NpcAdminWriteOffDetail"]
    },
    {
        code: 'VERIFY',
        isShow: true,
        name: "权益核销\n查询",
        className: "interests-history",
        imgUrl: require("@/assets/image/icon_interests_history.png"),
        pathUrl: "/NpcAdminInterestHistoryList",
        pathName: "NpcAdminInterestHistoryList",
        childName: []
    },
    // {
    // code:'INTEREST',
    // isShow: true,
    //     name: "权益池",
    //     className: "interests-pool",
    //     imgUrl: require("@/assets/image/icon_interests_pool.png"),
    //     pathUrl: "/NpcAdminRightsList",
    //     pathName: "NpcAdminRightsList",
    //     childName: [
    //         "NpcAdminRightsImageConfig",
    //         "NpcAdminRightsDetail",
    //     ]
    // },
    {
        code: 'BILL',
        isShow: true,
        name: "结算账单\n管理",
        className: "settle-manage",
        imgUrl: require("@/assets/image/icon_sign_manage.png"),
        pathUrl: "/SettleManager",
        pathName: "SettleManager",
        childName: ['SettleManagerInfo']
    }
];

var defaultObj = {
    adminHomeList: adminHomeList,
    adminSliderList: adminSliderList,
    npcHomeList: npcHomeList,
    npcSliderList: npcSliderList,
};
export default defaultObj
