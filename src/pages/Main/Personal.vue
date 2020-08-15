<template>
  <el-card class="box-card">
    <h3>管理员信息</h3>
    <p>管理员ID: {{personal.id}}</p>
    <p>账号: {{personal.account}}</p>
    <p>用户组: {{personal.userGroup}}</p>
    <p>创建时间: {{personal.ctime}}</p>
    <p>
      管理员头像:
      <img :src="personal.imgUrl" />
    </p>
    
    <p>
      <el-upload
        class="upload-demo"
        :action="IMG_AVATAR_UPLOAD"
        :show-file-list='false'
        :on-success="handleAvatarSuccess"
        :data="uploaddata"
      >
        <el-button size="small" type="primary">修改头像</el-button>
      </el-upload>
    </p>
  </el-card>
</template>

<script>
import { accountinfo, IMG_AVATAR_UPLOAD } from "@/api/apis";
import { setCNtime } from "@/utils/utils";
export default {
  data() {
    return {
      IMG_AVATAR_UPLOAD: "",
      personal: {},
      dialogVisible: false,
      imageUrl: "",
      uploaddata: {},
    };
  },
  created() {
    this.getAccinfo();
    this.IMG_AVATAR_UPLOAD = IMG_AVATAR_UPLOAD;
  },
  methods: {
    getAccinfo() {
      accountinfo(localStorage.id).then((res) => {
        this.personal = res.data.accountInfo;
        this.personal.ctime = setCNtime(this.personal.ctime);
      });
      this.uploaddata = { id: localStorage.id };
    },
    handleAvatarSuccess(res) {
      console.log(res);
      if (res.code == 0) {
        this.dialogVisiblet = false;
        this.$message({
          type: "success",
          message: "头像上传成功!",
        });
        this.getAccinfo();
        this.$bus.$emit("reHeaderimg");
        this.dialogVisible = false;
      } else {
        this.$message({ message: "上传失败,请稍后重试", type: "error" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
h3 {
  margin: 20px 10px;
}
p {
  margin: 0 20px;
  border-top: 1px solid #ddd;
  line-height: 50px;
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    margin-left: 10px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/deep/.el-icon-plus {
  border: 1px dashed #ccc;
}
</style>