<template>
  <div id="app">
    <div class="login">
      <h2>吃了吗后台管理系统</h2>
      <p class="err">{{ errmsg}}</p>
      <el-input prefix-icon="el-icon-user-solid" v-model="acc" clearable placeholder="请输入用户名"></el-input>
      <el-input prefix-icon="el-icon-lock" v-model="pwd" show-password clearable placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errmsg: "",
    };
  },
  methods: {
    clickLogin() {
      login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token= res.data.token;
          localStorage.role= res.data.role;
          localStorage.acc=this.acc;
          localStorage.id=res.data.id;
          //成功
          this.$message({
            message: "恭喜你，登录成功!!",
            type: "success",
          });
          location.hash='/main/index'
        } else this.errmsg = res.data.msg;
      });
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  background:-webkit-gradient(linear, left top, right bottom, color-stop(0%, #403622e8), color-stop(100%, #f5b747));
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 500px;
    height: 220px;
    h2 {
      color: #fff;
      text-align: center;
    }
    .err{
      color: #fff;
    }
    /deep/.el-input__inner {
      background-color: transparent !important;
      color: #fff !important;
    }
  }
}
</style>