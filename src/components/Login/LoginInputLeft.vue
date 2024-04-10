<template>
  <!--P019-->
  <div
      class="login_container"
      tabindex="1"
      @keydown.enter="login"
  >
    <div class="bg_logo_right">
      <img
          class="img_show"
          :src="showImgSrc"
          alt="展示图片加载失败"
      />
    </div>
    <div class="container_right_login">
      <div class="login_header">
        <img class="icon_logo_login" :src="logoImgSrc" alt="logo加载失败"/>
        <div class="title_login_head">{{ pageName }}</div>
      </div>
      <div class="input_box">
        <div class="div_input_area">
          <div class="div_word_head">{{ pageName }}</div>
          <div class="div_word_sub">欢迎来到{{ pageName }}</div>
          <div class="div_input_login bg_user_name" style="margin-top: 60px">
            <input
                v-model.trim="userName"
                class="edtxt_login"
                :class="{ bg_error: usernameError }"
                type="text"
                @input="clearError('usernameError')"
                placeholder="请输入用户名"
            />
          </div>
          <div class="div_input_login bg_password" style="margin-top: 16px">
            <input
                v-model.trim="password"
                class="edtxt_login"
                :class="{ bg_error: passwordError}"
                type="password"
                @input="clearError('passwordError')"
                placeholder="请输入密码"
            />
          </div>
          <div v-if="verifyCodeSrc" class="div_input_login bg_verify_code" style="margin-top: 28px">
            <input
                v-model.trim="validateCode"
                class="edtxt_verify_code"
                :class="{ bg_error: codeError}"
                @input="clearError('codeError')"
                placeholder="请输入验证码"
                maxlength="4"
            />
            <img :src="imgUrl" class="img_verify_code" alt="验证码加载失败">
            <button class="btn_img_change_code" @click="changeVerifyCode">换一张</button>
          </div>
          <!--登录按钮-->
          <button
              @click="login()"
              class="btn_login"
              type="button"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    pageName: {
      type: String,
      required: true
    },
    loginBg: {
      type: String,
      required: true
    },
    showImgSrc: {
      type: String,
      required: true
    },
    logoImgSrc: {
      type: String,
      required: true
    },
    verifyCodeSrc: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      institutionId: "",
      userName: "",
      password: "",
      validateCode: "",
      imgUrl: "",
      usernameError: false,
      passwordError: false,
      codeError: false,
      errorMsg: "",
    };
  },
  created() {
    this.changeVerifyCode();
  },
  methods: {
    login() {
      this.preventReClick();
      if (this.isEmpty(this.userName)) {
        this.usernameError = true;
        this.$toast("请输入用户名");
        return;
      }
      if (this.isEmpty(this.password)) {
        this.passwordError = true;
        this.$toast("请输入密码");
        return;
      }
      if (this.isEmpty(this.validateCode)&&this.verifyCodeSrc) {
        this.codeError = true;
        this.$toast("请输入验证码");
        return;
      }

      this.usernameError = false;
      this.passwordError = false;
      this.codeError = false;

      let info = {
        loginName: this.userName,
        password: this.password,
        validateCode: this.validateCode
      };
      this.$emit("login", info);
    },
    preventReClick() {
      if (!this.clicked) {
        this.clicked = true;
        setTimeout(() => {
          this.clicked = false;
        }, 2000);
      }
    },
    changePwdType() {
      this.wordType = !this.wordType;
      this.$refs.pwdInputElement.focus();
    },
    changeVerifyCode() {
      if(this.verifyCodeSrc)this.imgUrl = this.verifyCodeSrc + "?" + Math.random();
    },
    //错误提示
    isEmpty(value) {
      return !value || value.trim() === "";
    },
    clearError(val) {
      this[val] = false;
    },
    clearContent(){
      this.userName=''
      this.$refs.usernameInputElement.focus();
    },
  }
};
</script>


<style scoped>
.login_container {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 1440px;
  height: 100%;
  min-height: 899px;
  background-size: 100% 100%;
  background-color: #FCFCFC;
}

.bg_logo_right {
  position: absolute;
  display: flex;
  right: 0;
  width: 832px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg,
  #E4FFF9 0%,
  #ADEEE8 100%);
}
.img_show{
  width: 641px;
  height: 672px;
}
.container_right_login{
  position: relative;
  width: calc(100% - 832px);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login_header {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 48px;
  margin: 104px 0 0 124px;
}

.icon_logo_login {
  position: relative;
  width: 48px;
  height: 48px;
}
.title_login_head {
  position: relative;
  line-height: 48px;
  margin-left: 12px;
  font-weight: bold;
  font-size: 14px;
  color: #757575;
}
.input_box {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

}
.div_input_area{
  width: 432px;
  height: 430px;
  padding: 25px 36px;
}
.div_word_head{
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  color: #48565A;
}
.div_word_sub{
  font-size: 12px;
  line-height: 22px;
  margin-top: 8px;
  color: #829095;
}
/*用户名、密码*/
.div_input_login {
  position: relative;
  width: 324px;
  height: 40px;
}

.bg_user_name {
  background:  url("./icon_user_name.png") no-repeat 0 center;
  background-size: 20px 20px;
}

.bg_password {
  background:  url("./icon_password.png") no-repeat 0 center;
  background-size: 20px 20px;
}

.edtxt_verify_code::placeholder {
  width: 84px;
  height: 22px;
  font-size: 14px;
  line-height: 22px;
  color: #CCCCCC;
  letter-spacing: 0;
}
.edtxt_login {
  position: absolute;
  width: 100%;
  height: 40px;
  padding: 13px 0 13px 36px;
  border: none;
  outline: none;
  border-bottom: 1px solid #E5E5E5;
  font-size: 16px;
  color: #333333;
  line-height: 21px;
  text-align: left;
  background: transparent;
}
.edtxt_login.bg_error {
  border-bottom: 1px solid red;
}
.edtxt_login:hover {
  border-bottom: solid 1px #bbbbbb;
}
.edtxt_login:focus {
  border-bottom: solid 1px var(--main-color);
}

/*验证码*/
.div_input_login bg_verify_code {
  position: relative;
  width: 100%;
  height: 38px;
  margin-top: 24px;
}

.edtxt_verify_code {
  position: absolute;
  left: 0;
  width: 206px;
  height: 38px;
  box-sizing: border-box;
  border: solid 1px #E7E9FF;
  padding: 9px 0 9px 56px;
  line-height: 20px;
  color: #333333;
  font-size: 14px;
  text-align: left;
  background-color: #F4F7FF;
  letter-spacing: 21px;
  border-radius: 4px;
}

.edtxt_verify_code:hover {
  border: solid 1px #D3D4EA;
}

.edtxt_verify_code:focus {
  border: solid 1px #ABACC3;
}

.edtxt_verify_code.bg_error {
  border: 1px solid red;
}

.img_verify_code {
  position: absolute;
  left: 224px;
  width: 102px;
  height: 38px;
}

.btn_img_change_code {
  position: absolute;
  left: 342px;
  width: 30px;
  height: 16px;
  line-height: 16px;
  margin-top: 12px;
  text-align: left;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 10px;
  white-space: nowrap;
  cursor: pointer;
  border: none;
}

.btn_login {
  position: relative;
  display: block;
  width: 324px;
  height: 56px;
  margin-top: 32px;
  background-color:var(--main-color,#0deedb);
  box-shadow: 0 11px 26px -10px rgba(38, 215, 200, 0.46);
  border-radius: 3px;
  color: #FFFFFF;
}

</style>
