<template>
    <div>
    <span class="txt_record_idx" v-if="page.totalAmount > 0">
      第<span class="cs_text_danger">{{start()}}-{{end()}}</span>条，总计<span class="cs_text_danger">{{page.totalAmount}}</span>条记录
    </span>
        <!--上一页-->
        <button v-show="page.pagination>1" class="btn_page_up" type="button"
                @click="pageFn(page.pagination < 2?1:page.pagination-1)">
        </button>
        <button v-show="page.pagination<=1" class="btn_page_up_disable" type="button"></button>
        <div class="current_page">{{page.pagination}}</div>
        <div class="oblique_line">/</div>
        <div class="total_page">{{totalPage(page.totalAmount,pageSize)}}</div>
        <!--下一页-->
        <button v-show="page.pagination!==totalPage(page.totalAmount,pageSize)" class="btn_page_down" type="button"
                @click="pageFn(page.pagination+1)">
        </button>
        <button v-show="page.pagination===totalPage(page.totalAmount,pageSize)" class="btn_page_down_disable" type="button"></button>
        <div class="type_page_jump">跳转至</div>
        <input class="txt_page_jump" v-model="pageJump" type="text"
               @keyup="checkPositiveInt($event)" @blur="checkPositiveInt($event)">
        <div class="unit_page">页</div>
        <button class="btn_jump" @click="jump()" type="button">GO</button>
    </div>
</template>

<script>
    import WhParameter from "../../../node_modules/csui/parameter/WhParameter"
    export default {
        name: "Page",
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
                }
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
                page: this.value
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
            }
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
    .txt_record_idx{
        position: relative;
        display: inline-block;
        width: auto;
        line-height: 32px;
        margin-right: 24px;
        font-size: 12px;
        color: var(--font-color-secondary, #666666);
        vertical-align: top;
    }
    /*上一页*/
    .btn_page_up{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 16px;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        border-radius: 4px;
        background: #FFFFFF url("./icon_pre.png") no-repeat center;
        background-size: 10px 10px;
        vertical-align: top;
    }
    .btn_page_up:hover{
        background: #6299FF url("./icon_pre_focus.png") no-repeat center;
        background-size: 10px 10px;
        border: 1px solid #6299FF;
    }
    .btn_page_up:active{
        background: #6299FF url("./icon_pre_focus.png") no-repeat center;
        background-size: 10px 10px;
        border: 1px solid #6299FF;
    }
    .btn_page_up_disable{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 16px;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        border-radius: 4px;
        background: #CCCCCC url("./icon_pre_focus.png") no-repeat center;
        background-size: 10px 10px;
        vertical-align: top;
    }
    /*当前页码*/
    .current_page{
        position: relative;
        display: inline-block;
        _width: 10px;
        min-width: 10px;
        height: 32px;
        font-size: 12px;
        color: #999999;
        line-height: 32px;
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
        font-size: 12px;
        color: #999999;
        line-height: 32px;
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
        font-size: 12px;
        color: #999999;
        line-height: 32px;
        text-align: left;
        vertical-align: top;
    }
    /*下一页*/
    .btn_page_down{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-left: 16px;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        border-radius: 4px;
        background: #FFFFFF url("./icon_next.png") no-repeat center;
        background-size: 10px 10px;
        vertical-align: top;
    }
    .btn_page_down:hover{
        background: #6299FF url("./icon_next_focus.png") no-repeat center;
        background-size: 10px 10px;
        border: 1px solid #6299FF;
    }
    .btn_page_down:active{
        background: #6299FF url("./icon_next_focus.png") no-repeat center;
        background-size: 10px 10px;
        border: 1px solid #6299FF;
    }
    .btn_page_down_disable{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-left: 16px;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        border-radius: 4px;
        background: #CCCCCC url("./icon_next_focus.png") no-repeat center;
        background-size: 10px 10px;
        vertical-align: top;
    }
    .type_page_jump{
        position: relative;
        display: inline-block;
        margin-top: 0;
        width: 52px;
        height: 32px;
        font-size: 12px;
        color: #4D7CFE;
        line-height: 32px;
        text-align: center;
        vertical-align: top;
    }
    .txt_page_jump{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 12px;
        color: #999999;
        line-height: 32px;
        text-align: center;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        border-radius: 4px;
        vertical-align: top;
    }
    .unit_page{
        position: relative;
        display: inline-block;
        width: 28px;
        height: 32px;
        font-size: 12px;
        color: #4D7CFE;
        line-height: 32px;
        text-align: center;
        vertical-align: top;
    }
    .btn_jump{
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 12px;
        border-radius: 4px;
        color: #999999;
        border: 1px solid var(--border-color-primary,#CCCCCC);
        background: #FFFFFF;
    }
    .btn_jump:hover,.btn_jump:active{
        color: var(--color-white, #FFFFFF);
        background-color: #6299FF;
        border: 1px solid #6299FF;
    }
</style>
