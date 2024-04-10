<template>
  <div class="clearfix">
    <div class="clearfix">
      <div class="home-avater">
        <img :src="loginImg" alt="" srcset="" />
      </div>
      <div class="home-name">{{ name }}</div>
      <div class="clearfix home-btn">
        <div class="home-btn-item ui_fl" @click="isDialogPswShow = true">
          修改密码
        </div>
        <div class="home-btn-item ui_fl has_left-border" @click="out">
          退出系统
        </div>
      </div>
    </div>
    <!--修改密码弹窗，默认隐藏-->
    <div v-if="isDialogPswShow" class="ui_div_dialog cs_scrollable_vertical">
      <div
        class="ui_dialog_container"
        style="
          width: 384px;
          height: 410px;
          padding: 24px 24px 48px 24px;
          border-radius: 0;
        "
      >
        <div class="header-div-title" style="padding-left: 10px">修改密码</div>
        <div class="clearfix width_300" style="margin: 32px auto 0">
          <div class="div_search">
            <div class="cs_title_primary cs_text_default type_info_search">
              原密码
            </div>
            <input
              v-model="dialogPsw.psw"
              type="password"
              class="cs_input width_300"
              placeholder="请输入"
              @blur="hideHintDialog($event)"
            />
          </div>
          <div class="margin_top_12 div_search">
            <div class="cs_title_primary cs_text_default type_info_search">
              新密码
            </div>
            <input
              v-model="dialogPsw.pswNew"
              type="password"
              class="cs_input width_300"
              placeholder="请输入"
              @blur="hideHintDialog($event)"
            />
          </div>
          <div class="margin_top_12 div_search">
            <div class="cs_title_primary cs_text_default type_info_search">
              确认新密码
            </div>
            <input
              v-model="dialogPsw.pswConfirm"
              type="password"
              class="cs_input width_300"
              placeholder="请输入"
              @blur="hideHintDialog($event)"
            />
          </div>
          <div
            class="cs_margin_top_sm cs_text_sm text_hint_dialog cs_align_center"
          >
            {{ dialogPsw.hintDialog }}
          </div>
        </div>

        <div class="div_btn_dialog" style="margin-top: 8px">
          <button
            type="button"
            class="bottom_btn_cancel ui_margin_left_40"
            style="margin-top: 0"
            @click="closeDialogPsw"
          >
            取消
          </button>
          <button
            type="button"
            class="bottom_btn_confirm ui_margin_left_88"
            style="margin-top: 0"
            @click="confirmDialogPsw"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseConst from "../constant/BaseConst";
import ToastLoadingAjaxCallback from "../helper/ToastLoadingAjaxCallback";
import LoginApi from "../ajax/LoginApi";
import StorageConst from "../utils/StorageConst";
import CookieConst from "../constant/CookieConst";

let loginApi = new LoginApi(BaseConst.BASE_URL);
export default {
  data() {
    return {
      dialogPsw: {
        psw: "",
        pswNew: "",
        pswConfirm: "",
        hintDialog: ""
      },
      isDialogPswShow: false,
      name: localStorage.getItem(StorageConst.LOCAL_NAME),
        loginImg: window.imageUrl+'/resource/web/login_logo.png'
    };
  },
  methods: {
    hideHintDialog(e) {
      console.log(e.target.value);
      if (!this.isEmpty(e.target.value)) {
        this.dialogPsw.hintDialog = "";
      }
    },
    out() {
      this.$alert(
        "是否退出系统？",
        (e) => {
          if (e) {
              loginApi.loginOut(new ToastLoadingAjaxCallback(this, (data) => {
                  this.$router.push("/");
              }));
          }
        },
        true
      );
    },
    closeDialogPsw() {
      this.dialogPsw = {
        psw: "",
        pswNew: "",
        pswConfirm: "",
        hintDialog: ""
      };
      this.isDialogPswShow = false;
    },
    confirmDialogPsw() {
      if (this.isEmpty(this.dialogPsw.psw)) {
        this.dialogPsw.hintDialog = "原密码不能为空，请重新输入";
        return;
      }
      if (this.isEmpty(this.dialogPsw.pswNew)) {
        this.dialogPsw.hintDialog =
          "新密码不能为空，请重新输入";
        return;
      }
      if (this.dialogPsw.pswNew !== this.dialogPsw.pswConfirm) {
        this.dialogPsw.hintDialog =
          "新密码与确认密码输入不一致！请重新输入";
        return;
      }
      let info = {
        oldPassword: this.dialogPsw.psw,
        newPassword: this.dialogPsw.pswNew
      };
      loginApi.modifyPassword(
        info,
        new ToastLoadingAjaxCallback(this, (data) => {
          this.$toast("密码修改成功！");
          this.closeDialogPsw();
        })
      );
    }
  }
};
</script>
<style scoped>
.home-avater {
  width: 56px;
  height: 56px;
  margin: 32px auto 18px;
  border-radius: 50%;
  overflow: hidden;
  background: #ffffff;
}

.home-avater img {
  width: 56px;
  height: 56px;
}

.home-name {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #ffffff;
  text-align: center;
}

.home-btn {
  width: 198px;
  height: 40px;
  padding: 11px 0;
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  margin: 28px auto 0;
}

.home-btn-item {
  width: 50%;
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  cursor: pointer;
}

.home-btn-item:hover {
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
}

.has_left-border {
  border-left: solid 1px rgba(255, 255, 255, 0.45);
}

.cs_title_primary {
  display: block !important;
}

.width_300 {
  width: 300px;
}

.div_search input {
  text-align: center;
}

.cs_text_default {
  font-size: 12px !important;
}
</style>
