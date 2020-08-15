<template>
  <el-card class="box-card">
    <p class="title">
      <span>店铺管理</span>
      <el-button type="primary" @click="save">保存</el-button>
    </p>
    <div class="content">
      <span>店铺名称</span>
      <el-input placeholder="店铺名称" v-model="shopslist.name" clearable>{{shopslist.name}}</el-input>
    </div>
    <div class="content">
      <span>店铺公告</span>
      <el-input
        type="textarea"
        autosize
        placeholder="店铺公告"
        v-model="shopslist.bulletin"
      >{{shopslist.bulletin}}</el-input>
    </div>
    <div class="content">
      <span>店铺头像</span>
      <el-upload
        :action="IMG_SHOP_UPLOAD"
        list-type="picture-card"
        :on-success="avarsuccess"
        :show-file-list="false"
      >
        <img :src="IMG_SHOP+avarimg" style="width:148px;height:148px;" />
      </el-upload>
    </div>
    <div class="content">
      <span>店铺图片</span>
      <el-upload
        class="upload-demo"
        :action="IMG_SHOP_UPLOAD"
        :file-list="fileList"
        list-type="picture-card"
        :on-success="success"
        :on-remove="handleRemove"
      >
        <i class="avatar-uploader-icon">+</i>
      </el-upload>
    </div>
    <div class="content">
      <span>配送费</span>
      <el-input
        placeholder="配送费"
        v-model="shopslist.deliveryPrice"
        clearable
      >{{shopslist.deliveryPrice}}</el-input>
    </div>
    <div class="content">
      <span>时间</span>
      <el-input
        placeholder="时间"
        v-model="shopslist.deliveryTime"
        clearable
      >{{shopslist.deliveryTime}}</el-input>
    </div>
    <div class="content">
      <span>描述</span>
      <el-input placeholder="描述" v-model="shopslist.description" clearable>{{shopslist.description}}</el-input>
    </div>
    <div class="content">
      <span>评分</span>
      <el-input placeholder="评分" v-model="shopslist.score" clearable>{{shopslist.score}}</el-input>
    </div>
    <div class="content">
      <span>销量</span>
      <el-input placeholder="销量" v-model="shopslist.sellCount" clearable>{{shopslist.sellCount}}</el-input>
    </div>
    <div class="content">
      <span>活动</span>
      <el-checkbox-group v-model="ckeckgroup">
        <el-checkbox label="单人精彩套餐"></el-checkbox>
        <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
        <el-checkbox label="在线支付满28减5"></el-checkbox>
        <el-checkbox label="单人特色套餐"></el-checkbox>
        <el-checkbox label="特价饮品8折抢购"></el-checkbox>
        <el-checkbox label="夏日大促"></el-checkbox>
        <el-checkbox label="冰粉第二份半价"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="content">
      <span>营业时间</span>
      <el-time-picker
        is-range
        v-model="shopslist.date"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      ></el-time-picker>
    </div>
  </el-card>
</template>

<script>
import { settime } from "@/utils/utils";
import { shops, shopEdit, IMG_SHOP, IMG_SHOP_UPLOAD } from "@/api/apis";
export default {
  inject: ["reload"],
  created() {
    this.getshops();
    this.IMG_SHOP = IMG_SHOP;
    this.IMG_SHOP_UPLOAD = IMG_SHOP_UPLOAD;
  },
  data() {
    return {
      ckeckgroup: [],
      shopslist: {},
      fileList: [], //回填图片
      IMG_SHOP: "",
      IMG_SHOP_UPLOAD: "",
      avarimg: "1590473180839.webp",
      dialogVisible: false,
    };
  },
  methods: {
    getshops() {
      shops().then((res) => {
        this.fileList = res.data.data.pics.map(
          (item) => (item = { name: item, url: IMG_SHOP + item })
        );
        this.shopslist = res.data.data;
        this.ckeckgroup = res.data.data.supports;
        this.avarimg = res.data.data.avatar;
      });
    },
    success(res) {
      if (res.code == 0) {
        this.shopslist.pics.push(res.imgUrl);
        console.log(this.shopslist.pics);
      }
    },
    avarsuccess(res) {
      if (res.code == 0) {
        this.avarimg = res.imgUrl;
      }
    },
    handleRemove(res) {
      this.shopslist.pics.splice(this.shopslist.pics.indexOf(res.name), 1);
    },
    // 保存
    save() {
      this.shopslist.date = this.shopslist.date.map((item) => settime(item));
      shopEdit({
        id: this.shopslist.id,
        name: this.shopslist.name,
        bulletin: this.shopslist.bulletin,
        avatar: this.avarimg,
        deliveryPrice: this.shopslist.deliveryPrice,
        deliveryTime: this.shopslist.deliveryTime,
        description: this.shopslist.description,
        score: this.shopslist.score,
        sellCount: this.shopslist.sellCount,
        supports: JSON.stringify(this.ckeckgroup),
        date: JSON.stringify(this.shopslist.date),
        pics: JSON.stringify(this.shopslist.pics),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "系统提示：保存成功！！",
            type: "success",
          });
          localStorage.title = this.shopslist.name;
          this.reload();
        } else this.$message.error("系统提示：保存失败，请稍后重试");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  margin-top: 20px;
  display: flex;
  align-items: center;
  span {
    width: 80px;
    margin: 10px;
    text-align: right;
  }
  .el-input,
  .el-textarea,
  .el-checkbox-group {
    width: 360px;
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
/deep/.upload-demo .avatar-uploader-icon {
  line-height: 37px;
}
</style>