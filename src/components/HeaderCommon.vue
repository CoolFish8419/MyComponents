<template>
  <div class="header clearfix">
    <div
      class="clearfix"
      :class="{ 'header-width-1200': $route.name == 'Home' }"
    >
      <div class="ui_fl header-title clearfix">
        <div class="ui_fl header-logo">
          <img :src="loginImg" alt="" srcset="" />
        </div>
        <div class="ui_fl header-name">{{$config.Login_Name}}</div>
      </div>
      <div class="ui_fr header-admin-title">{{adminType === 'ADMIN' ? '机构':"商户"}}运营管理端</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCommon",
  props: {},
  data: function () {
    return {
      adminType:window.adminType,
        loginImg: window.imageUrl+'/resource/web/icon_logo.png'
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 12px 32px;
  background: #00aaaa;
}
.header-width-1200 {
  width: 1200px;
  margin: 0 auto;
}
.header-width-100 {
  width: 100%;
}
.header-title {
  width: 576px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}
.header-admin-title {
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
}
.header-logo {
  width: 24px;
  height: 24px;
}
.header-logo img {
  width: 100%;
  height: 100%;
}
.header-name {
  margin-left: 12px;
  line-height: 24px;
}
</style>
