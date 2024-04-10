<template>
  <div style="font-size: 0">
    <!--上一页-->
    <button
        v-show="page.pagination > 1"
        class="btn_page_up"
        @click="pageFn(page.pagination < 2 ? 1 : page.pagination*1 - 1)"
    ></button>
    <button
        v-show="page.pagination <= 1"
        class="btn_page_up_disable"
    ></button>
    <div class="current_page">{{ page.pagination }}</div>
    <div class="oblique_line">/</div>
    <div class="total_page">{{ totalPage(page.totalAmount, pageSize) }}</div>
    <!--下一页-->
    <button
        v-show="page.pagination != totalPage(page.totalAmount, pageSize)"
        class="btn_page_down"
        type="button"
        @click="pageFn(page.pagination*1 + 1)"
    ></button>
    <button
        v-show="page.pagination == totalPage(page.totalAmount, pageSize)"
        class="btn_page_down_disable"
        type="button"
    ></button>
    <div class="type_page_jump">前往</div>
    <input
        class="txt_page_jump"
        v-model="pageJump"
        type="text"
        @keyup="checkPositiveInt($event)"
        @blur="jump($event)"
    />
  </div>
</template>

<script>
    export default {
        name: "Page",
        props: {
            value: {
                type: Object,
                isValid(page) {
                    // eslint-disable-next-line no-undef
                    return (
                            value.hasOwnProperty("pagination") &&
                            // eslint-disable-next-line no-undef
                            value.hasOwnProperty("totalAmount") &&
                            /^[0-9]*[1-9][0-9]*$/.test(page.pagination) &&
                            /^[0-9]*[1-9][0-9]*$/.test(page.totalAmount)
                    );
                },
                // eslint-disable-next-line vue/require-valid-default-prop
                default: {
                    pagination: 1,
                    totalAmount: 0,
                },
            },
            pageSize: {
                type: Number,
                default: 10,
            },
            pageFn: {
                type: Function,
            },
        },
        data() {
            return {
                pageJump: "",
                page: this.value,
            };
        },

        methods: {
            /**
             * 判断是否为无效(空、null、undifined、全空格)
             *
             * @param param
             * @returns {Boolean}
             */
            isInvalid(param) {
                if (false === param) {
                    return false;
                }

                if (!param && 0 === param) {
                    return false;
                }

                return !param || 0 === (param + "").trim().length;
            },
            jump(el) {
                this.pageJump = this.checkPositiveInt(el);
                if (this.isInvalid(this.pageJump)) {
                    return;
                }
                let totalPage = this.totalPage(this.page.totalAmount, this.pageSize);
                let pageJump = this.pageJump > totalPage ? totalPage : this.pageJump;
                this.pageFn(pageJump);
            },
            /**
             * 计算总页码
             * @returns int
             */
            totalPage(totalnum, limit) {
                return totalnum > 0
                        ? totalnum < limit
                                ? 1
                                : totalnum % limit
                                        ? parseInt(totalnum / limit) + 1
                                        : totalnum / limit
                        : 1;
            },
            start() {
                return (this.page.pagination - 1) * this.pageSize + 1;
            },
            end() {
                let totalPage = this.totalPage(this.page.totalAmount, this.pageSize);
                return this.page.pagination === totalPage
                        ? this.page.totalAmount
                        : this.page.pagination * this.pageSize;
            },
        },
        watch: {
            "value.pagination": function (val) {
                this.page.pagination = val;
            },
            "value.totalAmount": function (val) {
                this.page.totalAmount = val;
            },
        },
    };
</script>

<style scoped>
  /*上一页*/
  .btn_page_up {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 32px;
    background: #ffffff url("../assets/image/icon_pre.png") no-repeat center;
    background-size: 10px 10px;
    vertical-align: top;
  }

  /*.btn_page_up:hover {*/
  /*  background: url("../assets/image/icon_pre_focus.png") no-repeat center;*/
  /*  background-size: 10px 10px;*/
  /*  border: 1px solid #009999;*/
  /*}*/

  /*.btn_page_up:active {*/
  /*  background: url("../assets/image/icon_pre_focus.png") no-repeat center;*/
  /*  background-size: 10px 10px;*/
  /*  border: 1px solid #009999;*/
  /*}*/

  .btn_page_up_disable {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 28px;
    height: 32px;
    background: url("../assets/image/icon_pre.png") no-repeat center;
    background-size: 10px 10px;
    border: none;
  }

  /*当前页码*/
  .current_page {
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
  .oblique_line {
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
  .total_page {
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
  .btn_page_down {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 32px;
    background: url("../assets/image/icon_next.png") no-repeat center;
    background-size: 10px 10px;
    vertical-align: top;
  }

  /*.btn_page_down:hover {*/
  /*  background: #009999 url("../assets/image/icon_next_focus.png") no-repeat*/
  /*  center;*/
  /*  background-size: 10px 10px;*/
  /*  border: 1px solid #009999;*/
  /*}*/

  /*.btn_page_down:active {*/
  /*  background: #009999 url("../assets/image/icon_next_focus.png") no-repeat*/
  /*  center;*/
  /*  background-size: 10px 10px;*/
  /*  border: 1px solid #009999;*/
  /*}*/

  .btn_page_down_disable {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 32px;
    background: url("../assets/image/icon_next.png") no-repeat center;
    background-size: 10px 10px;
    vertical-align: top;
  }

  .type_page_jump {
    position: relative;
    display: inline-block;
    margin-right: 8px;
    height: 32px;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 32px;
    text-align: center;
    vertical-align: top;
  }

  .txt_page_jump {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 12px;
    color: #999999;
    line-height: 32px;
    text-align: center;
    border: 1px solid #cccccc;
    border-radius: 4px;
    vertical-align: top;
  }

  .unit_page {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 32px;
    font-size: 12px;
    color: #4d7cfe;
    line-height: 32px;
    text-align: center;
    vertical-align: top;
  }

  .btn_jump {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 12px;
    border-radius: 4px;
    color: #999999;
    border: 1px solid #cccccc;
    background: #ffffff;
    text-align: center;
    padding: 0 !important;
  }

  .btn_jump:hover,
  .btn_jump:active {
    color: #ffffff;
    background-color: #009999;
    border: 1px solid #009999;
  }
</style>
