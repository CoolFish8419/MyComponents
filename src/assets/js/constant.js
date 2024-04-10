export const PAGE_SIZE = 10;

/** 分页 */
export function Page(size, pagination) {
    this.pagination = pagination;
    this.size = size;
}

const USER_STATUS = {
    "ACTIVITY": "活跃",
    "POTENTIAL": "潜在",
    "SILENCE": "沉睡"
};

const IDENTIFICATION_STATUS = {
    "1": "已实名",
    "0": "未实名"
};

const TASK_STATUS = {
    "1": "已完成",
    "0": "未完成",
    "2": "已过期"
};

const DROP_OF_STATUS = {
    "true": "上架",
    "false": "下架"
};

const CONFIG_TYPE = {
    "1": "类型",
    "2": "档级"
};

const USER_INTEREST_STATUS = {
    "0,3": "可核销",
    "1": "已核销",
    "2": "已过期"
};
const SOURCE_TYPE = {
    "0": "达成等级奖励",
    "1": "购买",
    "3": "任务奖励",
    "2": "系统发放",
    "4": "管理员发放"
};

const SOURCE_TYPE_SEARCH = {
    "1": "达成等级奖励",
    "2": "商城购买",
    "3": "任务奖励",
    "4": "超管发放"
};

const MALL_ORDER_STATUS = {
    "0": "待支付",
    "1": "已成功",
    "2": "已取消"
};
var RELATYPE_TYPE = {
    "1": "父母",
    "2": "子女",
    "3": "配偶",
    "4": "兄弟姐妹",
    "5": "爷爷奶奶",
    "6": "其他"
};

var TYPE = {
    "0": "按活动天数",
    "1": "按起止日期"
};
var JOIN_STATUS = {
    "0": "无法报名",
    "1": "可报名",
    "2": "已过期"
};
var ACTIVITY_STATUS = {
    "0": "草稿",
    "1": "待生效",
    "2": "生效中",
    "9": "已结束"
};
var TASK_TYPE = {
    "0": "核销",
    "1": "消费"
};
var ORDER_STATUS = {
    "0": "待支付",
    "1": "已支付",
    "2": "已取消",
    "3": "已退款"
};
var PAY_TYPE = {
    "0": "---",
    "3": "支付宝",
    "4": "微信"
};
var PAY_STATUS = {
    "0": "待支付",
    "1": "支付成功",
    "2": "支付失败",
    "3": "已关闭"
};
var ACTIVITY_JOIN_STATUS = {
    "2": "已加入",
    "1": "未加入"
};
var ACTIVITY_STATUS_2SIGN = {
    "0": "未支付",
    "1": "未开始",
    "2": "进行中",
    "3": "已结束",
    "4": "已取消",
};

var CHANGE_TYPE = {
    "SIGN_UP": "报名获取",
    "INHERIT": "继承上一赛季",
    "TASK": "任务奖励",
    "OPERATE": "运营添加"
};
var BILL_STATUS = {
    "UN_SETTLE": "未结账",
    "UN_CLOSE": "未入账",
    "CLOSED": "已入账"
};
var BILL_TYPE = {
    "DAY": "自然日",
    "WORK_DAY": "工作日",
    "MONTH": "按月"

};
var FIXEDSTUTS = {
    "true": '固定',
    "false": '不固定'
};
var RULETYPE = {
    "POSITIVE": '增加',
    "NEGATIVE": '减少'
};
var BONUS_TYPE = {
    "2": "固定权益",
    "1": "随机权益",
};
var BONUS_TYPE_CODE = {
    "FIX": "2",
    "RANDOM": "1",
};
var DISCOUNT_TYPE = {
    "10": "代金权益",
    "20": "折扣权益",
    "30": "单次权益",
}

var constant = {
    DROP_OF_STATUS,
    USER_STATUS,
    RELATYPE_TYPE,
    IDENTIFICATION_STATUS,
    TASK_STATUS,
    CONFIG_TYPE,
    TYPE,
    ACTIVITY_STATUS,
    USER_INTEREST_STATUS,
    TASK_TYPE,
    MALL_ORDER_STATUS,
    ORDER_STATUS,
    CHANGE_TYPE,
    SOURCE_TYPE,
    SOURCE_TYPE_SEARCH,
    PAY_TYPE,
    ACTIVITY_JOIN_STATUS,
    ACTIVITY_STATUS_2SIGN,
    PAY_STATUS,
    BILL_STATUS,
    BILL_TYPE,
    FIXEDSTUTS,
    RULETYPE,
    BONUS_TYPE,
    BONUS_TYPE_CODE,
    DISCOUNT_TYPE
};
export default constant;
