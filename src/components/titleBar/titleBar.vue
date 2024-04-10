<template>
  <div class="div_container_title_bar">
    <div class="left_container">
      <img class="img_logo_title_bar" @click="backToMain()" :src="titleBarLogoSrc" alt="logoFailed"/>
      <div class="div_name_title_bar">{{ pageName }}</div>
    </div>
    <div class="right_container">
      <div class="div_menu_container">
        <button class="btn_user_name"
                @mouseover="menuVisible = true"
                @click="menuVisible = true"
        >
          {{ userName }}
        </button>
        <div class="list_user_menu" ref="menu"
             @mouseover="menuVisible = true"
             @mouseleave="menuVisible = false"
             v-show="menuVisible">
          <label class="list_label" @click="showAlert">修改密码</label>
          <label class="list_label " @click="quitAccount">退出账号</label>
          <label
              class="list_label"
              v-for="item in designedMethods"
              @click="item.handler">
            {{ item.text }}
          </label>
        </div>
      </div>
      <div class="div_notice_container" v-if="Number.isFinite(noticeNum) && noticeNum > -1">
        <div class="div_notice_number" v-if="noticeNum>0">
            {{ noticeNum > 99 ? noticeMaxNum : noticeNum }}
        </div>
      </div>
    </div>
    <alertOperation :title="'修改密码'" :showDlg="alertVisible" :clickReturn="(res) => changePwd(res)">
      <input-normal class="input_change_pwd" placeHolder="请输入原密码" label="请输入原密码" show-password
                    v-model="info.oldPwd"></input-normal>
      <input-normal class="input_change_pwd" placeHolder="请输入新密码" label="请输入新密码" show-password
                    v-model="info.newPwd"></input-normal>
      <input-normal class="input_change_pwd" placeHolder="请再次输入新密码" label="请确认新密码" show-password
                    v-model="info.re_newPwd"></input-normal>
    </alertOperation>
  </div>
</template>
<script>
import AlertOperation from "../alertOperation/alertOperation.vue";
import inputNormal from "../inputNormal/inputNormal.vue";

export default {
  name: "TitleBar",
  components: { AlertOperation, inputNormal },
  props: {
    titleBarLogoSrc: {
      type: String,
      required: true
    },
    pageName: {
      type: String,
      require: true
    },
    userName: {
      type: String,
      require: true
    },
    noticeNum: {
      type: Number,
      default: 0
    },
    designedMethods: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      menuVisible: false,
      alertVisible: false,
      noticeMaxNum: "99+",
      showPwd: true,
      info: {
        oldPwd: "",
        newPwd: "",
        re_newPwd: ""
      }
    };
  },

  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    clearInfo(obj) {
      Object.keys(obj).forEach((key) => {
        obj[key] = "";
      });
    },
    isEmpty(value) {
      return !value || value.trim() === "";
    },
    backToMain() {
      this.$emit("backToMain", "跳转成功");
    },
    showAlert() {
      this.alertVisible = true;
    },
    changePwd(res) {
      if (!res) {
        this.clearInfo(this.info);
        this.alertVisible = res;
        return;
      }
      if (this.isEmpty(this.info.oldPwd)) {
        this.$toast({ text: "请输入原密码", mode: "ERROR" });
        return;
      }
      if (this.isEmpty(this.info.newPwd)) {
        this.$toast({ text: "请输入新密码!", mode: "ERROR" });
        return;
      }
      if (this.isEmpty(this.info.re_newPwd)) {
        this.$toast({ text: "请再次输入密码", mode: "ERROR" });
        return;
      }
      if (this.info.newPwd !== this.info.re_newPwd) {
        this.$toast({ text: "请输入相同的新密码", mode: "ERROR" });
        return;
      }
      if (this.info.newPwd === this.info.re_newPwd) {
        this.$emit("ChangePwd", this.info);
        this.alertVisible = false;
      }
      this.clearInfo(this.info);
    },
    quitAccount() {
      //传入了一个对象，包含text信息，显示取消按钮和click函数
      this.$alert({
        text: "是否确认退出登录", btns: "['CONFIRM','CANCEL']"
        , click: (state) => {
          if (state) {
            //如果点击确认按钮，可以定义相关操作，比如核验后进行跳转等
            this.$emit("quitAct");
          }
        }
      });
    },
    handleDocumentClick(e) {
      if (this.menuVisible) {
        if (!this.$refs.menu.contains(e.target)) {
          this.menuVisible = false;
        }
      } else {

      }
    }
  }
};
</script>
<style scoped>
.div_container_title_bar {
  width: 100%;
  min-width: 600px;
  height: 48px;
  background: #FFFFFF;
  min-height: 48px;
  align-items: center;
}
.left_container {
  position: absolute;
  display: flex;
  width: auto;
  height: 48px;
  align-items: center;
}
.img_logo_title_bar {
  position: relative;
  width: 48px;
  height: 48px;
  margin: 12px 12px 12px 120px;
  cursor: pointer;
}
.div_name_title_bar {
  position: relative;
  width: auto;
  height: 22px;
  text-align: left;
  line-height: 22px;
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  cursor: default;
}
.right_container {
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  width: auto;
  height: 48px;
  right: 120px;
  align-items: center;
}
.div_notice_container {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 28px;
  line-height: 20px;
  cursor: pointer;
  background: url("./icon_notice_title_bar.png") no-repeat center;
  background-size: 100% 100%;
}
.div_notice_container:hover {
  width: 20px;
  height: 20px;
  background: url("./iocn_notice_title_bar_hover.png") no-repeat center;
  background-size: 100% 100%
}

.div_notice_number{
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: auto;
  height: 20px;
  bottom: 8px;
  left: 8px;
  padding: 0 8px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #FF797E;
  border-radius: 10px;
  transform: scale(0.5);
}
.div_menu_container {
  float: inherit;
  position: relative;
  display: flex;
  width: auto;
  height: 24px;
  flex-direction: column;
  align-items: center;
}

.btn_user_name {
  width: auto;
  height: 24px;
  box-sizing: border-box;
  padding: 4px 24px;
  font-size: 12px;
  background-color: #F2F6FA;
  border-radius: 12px;
  border: none;
  cursor: pointer;
}

.btn_user_name:hover {
  background-color: #ECEFF5;
}

.list_user_menu {
  position: absolute;
  display: flex;
  width: 112px;
  height: auto;
  margin-top: 33px;
  flex-direction: column;
  background-color: #FFFFFF;
  box-shadow: 0 0 11px 0 rgba(124, 124, 124, 0.17);
  border: solid 1px #EEEEEE;
}

.list_label {
  width: 112px;
  height: 36px;
  box-sizing: border-box;
  padding: 8px 32px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  background-color: rgba(250, 250, 250, 0);
  color: #666666;
  cursor: pointer;
}

.list_label:hover {
  background-color: #FAFAFA;
}

.input_change_pwd {
  position: relative;
  margin: 0 42px 16px 42px;

}

/deep/ .input_normal {
  width: 380px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #dddddd;
}

/deep/ .div_dialog_operation {
  position: absolute;
  width: 464px;
  height: 404px;
}
</style>