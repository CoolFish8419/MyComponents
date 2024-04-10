<template>
  <!--P019-->
  <div class="div_container_box_login">
    <div
        class="div_bg_container"
        :style="`background-image: url(${loginBg})`"
        tabindex="1"
        @keydown.enter="login"
    >
      <div class="div_box_login">
        <img
            class="img_left"
            :src="showImgSrc"
            alt="左侧图片加载失败"/>
        <div class="div_login_content">
          <img class="img_logo_login" :src="logoImgSrc" alt="logo加载失败"/>
          <div class="div_title_login">{{ pageName }}</div>
          <div class="div_input_area_login icon_left_user_name" style="margin-top: 80px">
            <div class="divider_left_input"></div>
            <input
                v-model.trim="userName"
                class="edtxt_input_login"
                :class="{ bg_error: usernameError }"
                type="text"
                ref="usernameInputElement"
                @input="clearError('usernameError')"
                @focus="showUsernameIcon = true"
                @blur="showUsernameIcon = false"
                placeholder="请输入用户名"
            />
            <span class="icon_input_username" @click="clearContent"
                  :style="{opacity: showUsernameIcon ? 1 : 0}"></span>
          </div>
          <div class="div_input_area_login icon_left_password">
            <div class="divider_left_input"></div>
            <input
                v-model.trim="password"
                class="edtxt_input_login"
                :class="{ bg_error: passwordError}"
                ref="pwdInputElement"
                :type="inputType"
                @input="clearError('passwordError')"
                @focus="showPwdIcon = true"
                @blur="showPwdIcon = false"
                placeholder="请输入密码"
            />
            <span class="icon_input_password" @click="changePwdType"
                  :class="{icon_password_show:this.inputType==='text'}"
                  :style="{opacity: showPwdIcon ? 1 : 0}"></span>
          </div>
          <div v-if="verifyCodeSrc" class="div_input_area_login bg_verify_code">
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
              class="btn_func_login"
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
      clicked: false,
      userName: "",
      password: "",
      validateCode: "",
      imgUrl: "",
      wordType:true,
      showPwdIcon: false,
      showUsernameIcon: false,
      usernameError: false,
      passwordError: false,
      codeError: false,
      errorMsg: ""
    };
  },
  created() {
    this.changeVerifyCode();
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', '  margin: 0;\n' +
        '  padding: 0;')
  },
  computed: {
    inputType() {
      return this.wordType ? 'password' : 'text';
    },
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
.div_container_box_login {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 636px;
  min-width: 1040px;

}

.div_bg_container {
  position: relative;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.div_box_login {
  position: absolute;
  width: 1040px;
  height: 636px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #FFFFFF;
  border-radius: 14px;
}

.img_left {
  position: absolute;
  width: 448px;
  height: 669px;
  top: -16px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}

.div_login_content {
  position: relative;
  margin-left: 483px;
  width: 522px;
}

.img_logo_login {
  position: relative;
  display: block;
  margin: 48px auto 0;
  width: 80px;
  height: 80px;
}

.div_title_login {
  position: relative;
  margin-top: 16px;
  height: 22px;
  color: #333333;
  font-size: 22px;
  line-height: 22px;
  text-align: center;
  font-weight: bold;
}

/*用户名、密码*/
.div_input_area_login {
  position: relative;
  width: 372px;
  height: 50px;
  margin: 16px auto 0;
  border-radius: 30px;
}

.icon_left_user_name {
  background: #FFFFFF url("./icon_user_name.png") no-repeat 24px center;
  background-size: 20px 20px;
}

.icon_left_password {
  background: #FFFFFF url("./icon_password.png") no-repeat 24px center;
  background-size: 20px 20px;
}

.bg_verify_code {
  margin-top: 24px;
}

.divider_left_input {
  position: absolute;
  top: 10px;
  left: 63px;
  width: 1px;
  height: 30px;
  border-left: 1px solid #EEEEEE;
}


.icon_input_username {
  position: absolute;
  display: inline-block;
  top: 18px;
  margin-left: 339px;
  width: 14px;
  height: 14px;
  background: url("./bg_clear_normal.png") no-repeat center/14px 14px;
  cursor: text;
}
.div_input_area_login:hover .icon_input_username:hover{
  background: url("./bg_clear_hover.png") no-repeat center/14px 14px;
  cursor: pointer;
}
.icon_input_password {
  position: absolute;
  display: inline-block;
  top: 18px;
  margin-left: 339px;
  width: 14px;
  height: 14px;
  background: url("./bg_nopassword_normal.png") no-repeat center/14px 14px;
  cursor: pointer;
}
.icon_password_show{
  background: url("./bg_password_normal.png") no-repeat center/14px 14px;
}
.div_input_area_login:hover .icon_input_password:hover{
  background: url("./bg_nopassword_hover.png") no-repeat center/14px 14px;
}
.div_input_area_login:hover .icon_password_show:hover{
  background: url("./bg_password_hover.png") no-repeat center/14px 14px;
}
.icon_password_show:hover .div_input_area_login:hover{
  background: #00bf7f;
}
.edtxt_input_login {
  position: absolute;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 14px 0 14px 84px;
  color: #333333;
  font-size: 16px;
  line-height: 21px;
  text-align: left;
  background: transparent;
  outline: none;
  border-radius: 30px;
  border: solid 1px #E5E5E5;
}
input[type="password"]::-ms-reveal{
  display: none;
}

.edtxt_input_login:focus {
  border: solid 1px #BBBBBB;
}

.edtxt_input_login:hover {
  border: solid 1px #00AAAA;
}

.edtxt_input_login.bg_error {
  border: solid 1px #FF797E;
}

.edtxt_input_login.bg_error:focus {
  border: solid 1px #00AAAA;
}
.edtxt_input_login:focus .icon_input_password:focus{
  border: solid 1px #00AAAA;
}

/*验证码*/
.div_input_area_login .bg_verify_code {
  position: relative;
  width: 100%;
  height: 38px;
  margin-top: 24px;
}

.edtxt_verify_code {
  position: absolute;
  left: 0;
  width: 208px;
  height: 38px;
  padding: 9px 0 9px 56px;
  box-sizing: border-box;
  line-height: 20px;
  color: #333333;
  font-size: 14px;
  text-align: left;
  background-color: #F4F7FF;
  letter-spacing: 21px;
  outline: none;
  border: solid 1px #E7E9FF;
}

.edtxt_verify_code::placeholder {
  width: 84px;
  height: 22px;
  font-size: 14px;
  line-height: 22px;
  color: #CCCCCC;
  letter-spacing: 0;
}

.edtxt_verify_code:hover {
  border-radius: 4px;
  border: solid 1px #D3D4EA;
}

.edtxt_verify_code:focus {
  border-radius: 4px;
  border: solid 1px #ABACC3;
}

.edtxt_verify_code.bg_error {
  border-radius: 4px;
  border: 1px solid #FF797E;
}

.edtxt_verify_code.bg_error:focus {
  border-radius: 4px;
  border: solid 1px #ABACC3;
}

.img_verify_code {
  position: absolute;
  margin-left: 232px;
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

.btn_func_login {
  position: relative;
  display: block;
  margin: 92px auto 0;
  width: 372px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background-color: #00C9C9;
  color: #FFFFFF;
  text-align: center;
  box-shadow: 0 8px 16px 0 rgba(0, 74, 74, 0.12);
  border: none;
  border-radius: 25px;
}

.btn_func_login:hover,
.btn_func_login:active {
  background-color: rgba(0, 201, 201, 0.8);
  box-shadow: 0 8px 16px 0 rgba(0, 74, 74, 0.12);
  border-radius: 25px;
}
</style>
