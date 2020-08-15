<template>
  <el-card class="box-card">
    <h3>添加账号</h3>
    <p>
      <span>账号</span>
      <el-input v-model="user" clearable placeholder="请输入账号"></el-input>
    </p>
    <p>
      <span>密码</span>
      <el-input v-model="pwd" show-password clearable placeholder="请输入密码"></el-input>
    </p>
    <p>
      <span>用户组</span>
      <el-select v-model="usergroup" placeholder="请选择用户组">
        <el-option
          v-for="item in options"
          :key="item.usergroup"
          :label="item.label"
          :value="item.usergroup"
        ></el-option>
      </el-select>
    </p>
    <p>
      <span></span>
      <el-button type="primary" @click="clickAdd">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </p>
  </el-card>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
  data() {
    return {
      user: "",
      pwd: "",
      options: [
        {
          usergroup: "超级管理员",
          label: "超级管理员",
        },
        {
          usergroup: "普通管理员",
          label: "普通管理员",
        },
      ],
      usergroup: "",
    };
  },
  methods: {
    clickAdd() {
      
      adduser(this.user, this.pwd, this.usergroup).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          (this.user = ""), (this.pwd = ""), (this.usergroup = "");
        } else this.$message({ message: '添加失败,请稍后重试', type: "error" });
      });
    },
    reset() {
      (this.user = ""), (this.pwd = ""), (this.usergroup = "");
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin-top: 30px;
  display: flex;
  align-items: center;
  span {
    width: 100px;
    text-align: right;
    margin: 10px;
  }
  .el-input,
  .el-select {
    width: 220px;
  }
}
</style>