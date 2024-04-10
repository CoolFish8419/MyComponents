<template>
    <div class="component">
    <span class='txt_record_idx_dark'  v-if="page.totalAmount > 0">
      第<span class="cs_text_danger">{{' '+start()}}-{{end()+' ' }}</span>
        条，总计<span class="cs_text_danger">{{' '+page.totalAmount+' '}}</span>条记录
    </span>
        <!--上一页-->
        <button v-show="page.pagination>1" class='btn_page_up_dark' type="button"
                @click="pageFn(page.pagination < 2?1:page.pagination-1)">
        </button>
        <button v-show="page.pagination<=1" class='btn_page_up_disable_dark'  type="button"></button>
        <div class='current_page' >{{page.pagination}}</div>
        <div class='oblique_line' >/</div>
        <div class='total_page' >{{totalPage(page.totalAmount,pageSize)}}</div>
        <!--下一页-->
        <button v-show="page.pagination!==totalPage(page.totalAmount,pageSize)" class="btn_page_down_dark"
                type="button"  @click="pageFn(page.pagination+1)">
        </button>
        <button v-show="page.pagination===totalPage(page.totalAmount,pageSize)"
                class='btn_page_down_disable_dark' type="button"></button>
        <div class="type_page_jump">跳转至</div>
        <input class='txt_page_jump_dark'  v-model="pageJump" type="text"
               @keyup="checkPositiveInt($event)" @blur="checkPositiveInt($event)">
        <div class="unit_page">页</div>
        <button class='btn_jump_dark'  @click="jump()" type="button"
        >GO</button>
    </div>
</template>

<script>
    import WhParameter from "../../../node_modules/csui/parameter/WhParameter"
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: "Page-dark",
        props:{
            value: {
                type: Object,
                isValid(page){
                    // eslint-disable-next-line no-undef
                    return (value.hasOwnProperty("pagination") &&
                        // eslint-disable-next-line no-undef
                        value.hasOwnProperty("totalAmount") &&
                        /^[0-9]*[1-9][0-9]*$/.test(page.pagination) &&
                        /^[0-9]*[1-9][0-9]*$/.test(page.totalAmount));
                },
                // eslint-disable-next-line vue/require-valid-default-prop
                default: {
                    pagination: 1,
                    totalAmount: 0,
                },
            },
            pageSize: {
                type: Number,
                default: 10
            },
            pageFn: {
                type: Function,
            }
        },
        data(){
            return {
                pageJump: "",
                page: this.value,
            }
        },
        methods: {
            jump(){
                if(WhParameter.isInvalid(this.pageJump)){
                    return;
                }
                let totalPage = this.totalPage(this.page.totalAmount,this.pageSize);
                let pageJump = this.pageJump>totalPage?totalPage:this.pageJump;
                this.pageFn(pageJump);
            },
            /**
             * 计算总页码
             * @returns int
             */
            totalPage(totalnum, limit){
                return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 1;
            },
            start(){
                return (this.page.pagination - 1)*this.pageSize + 1;
            },
            end(){
                let totalPage = this.totalPage(this.page.totalAmount,this.pageSize);
                return this.page.pagination === totalPage?this.page.totalAmount : this.page.pagination*this.pageSize;
            },
        },
        watch: {
            "value.pagination": function (val) {
                this.page.pagination = val;
            },
            "value.totalAmount": function (val) {
                this.page.totalAmount = val;
            },
        }
    }
</script>

<style scoped>
    .txt_record_idx_dark{
        position: relative;
        display: inline-block;
        margin-right: 24px;
        width: auto;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.75);
        vertical-align: center;
    }
    .cs_text_danger{
        font-family: MicrosoftYaHei-Bold;
        font-size: 12px;
        font-weight: normal;
        color: #ff797e;
    }
    /*上一页*/
    .btn_page_up_dark{
        position: relative;
        display: inline-block;
        margin-right: 16px;
        width: 32px;
        height: 32px;
        background: #000000 url("../pageNew-dark/bg_dark_left_normal.png") no-repeat center;
        background-size: 10px 10px;
        border: solid 1px rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        vertical-align: top;
        cursor: pointer;
    }
    .btn_page_up_dark:hover{
        background: var(--dark-main-color, #51E6FF) url("../pageNew-dark/bg_dark_left_hover.png") no-repeat center;
        background-size: 10px 10px;
        border: 0;
    }
    .btn_page_up_dark:active{
        background: var(--dark-main-color, #51E6FF) url("../pageNew-dark/bg_dark_left_hover.png") no-repeat center;
        background-size: 10px 10px;
        border: 0;
    }
    .btn_page_up_disable_dark{
        position: relative;
        display: inline-block;
        margin-right: 16px;
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.15) url("../pageNew-dark/bg_dark_left_disabled.png") no-repeat center;
        background-size: 10px 10px;
        border-radius: 4px;
        vertical-align: top;
    }
    /*当前页码*/
    .current_page{
        position: relative;
        display: inline-block;
        _width: 10px;
        min-width: 10px;
        height: 32px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 32px;
        color: rgba(255, 255, 255, 0.75);
        text-align: right;
        vertical-align: top;
    }
    /*斜线*/
    .oblique_line{
        position: relative;
        display: inline-block;
        _width: 9px;
        min-width: 9px;
        height: 32px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 32px;
        color: rgba(255, 255, 255, 0.75);
        text-align: center;
        vertical-align: top;
    }
    /*总页码*/
    .total_page{
        position: relative;
        display: inline-block;
        _width: 10px;
        min-width: 10px;
        height: 32px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 32px;
        color: rgba(255, 255, 255, 0.75);
        text-align: left;
        vertical-align: top;
    }
    /*下一页*/
    .btn_page_down_dark{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-left: 16px;
        background: #000000 url("../pageNew-dark/bg_dark_right_normal.png") no-repeat center;
        background-size: 10px 10px;
        border: solid 1px rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        vertical-align: top;
        cursor: pointer;
    }
    .btn_page_down_dark:hover{
        background: var(--dark-main-color, #51E6FF) url("../pageNew-dark/bg_dark_right_hover.png") no-repeat center;
        background-size: 10px 10px;
        border: 0;
    }
    .btn_page_down_dark:active{
        background: var(--dark-main-color, #51E6FF) url("../pageNew-dark/bg_dark_right_hover.png") no-repeat center;
        background-size: 10px 10px;
        border: 0;
    }
    .btn_page_down_disable_dark{
        position: relative;
        display: inline-block;
        margin-left: 16px;
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.15) url("../pageNew-dark/bg_dark_right_disabled.png") no-repeat center;
        background-size: 10px 10px;
        border-radius: 4px;
        vertical-align: top;
    }
    .type_page_jump{
        position: relative;
        display: inline-block;
        width: 52px;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        color: #4D7CFE;
        text-align: center;
        vertical-align: top;
    }
    .txt_page_jump_dark{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        color: #999999;
        text-align: center;
        background-color: #000000;
        border:1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        vertical-align: top;
    }
    .txt_page_jump_dark:focus{
        color: rgba(255, 255, 255, 0.9);
        /*字体颜色*/
        border:1px solid var(--dark-main-color, #51E6FF);
    }
    .unit_page{
        position: relative;
        display: inline-block;
        width: 28px;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        color: #4D7CFE;
        text-align: center;
        vertical-align: top;
    }
    .btn_jump_dark{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 12px;
        color:#333333;
        background-color: var(--dark-main-color, #51E6FF);
        border-radius: 4px;
        cursor: pointer;
    }
    .btn_jump_dark:hover{
        background-color: var(--dark-hover-main-color, #51E6FFCC);
    }
</style>
