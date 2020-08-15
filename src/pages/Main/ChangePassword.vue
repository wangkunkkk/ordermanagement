<template>
  <el-card class="box-card">
    <h3>修改密码</h3>
    <el-form
      :model="Form"
      status-icon
      :rules="rules"
      ref="Form"
      label-width="100px"
      class="demo-Form"
    >
      <el-form-item label="原密码" prop="oldpwd">
        <el-input type="password" v-model="Form.oldpwd" autocomplete="true" ref="pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="Form.pass" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="Form.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('Form')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { checkoldpwd, editpwd } from "@/api/apis";
export default {
  data() {
    var pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        if (this.Form.checkPass !== "") {
          this.$refs.Form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.Form.checkPass !== "") {
          this.$refs.Form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.Form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Form: {
        pass: "",
        checkPass: "",
        oldpwd: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpwd: [{ validator: pass, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$refs.pwd.focus();
  },
  methods: {
    submitForm() {
      // 先验证旧密码是否正确
      checkoldpwd(this.Form.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          //旧密码正确
          // 发送修改密码的请求
          editpwd(this.Form.pass, localStorage.id).then((res) => {
            if (res.data.code == 0) {
              //修改成功
              this.$message({
                message: "密码修改成功",
                type: "success",
              });
              this.Form = { pass: "", checkPass: "", oldpwd: "" };
            } else {
              this.$message({ message: "删除失败,请稍后重试", type: "error" });
            }
          });
        } else {
          //旧密码不正确
          this.$message.error("错了哦，原密码不对,请重新输入哦");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-input__inner {
  width: 300px;
}
</style>