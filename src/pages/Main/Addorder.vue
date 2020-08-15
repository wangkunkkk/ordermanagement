<template>
  <el-card class="box-card">
    <h3>商品添加</h3>
    <p>
      <span>商品名称</span>
      <el-input v-model="name" placeholder="商品名称"></el-input>
    </p>
    <p>
      <span>商品分类</span>
      <el-select v-model="category" placeholder="商品分类">
        <el-option
          v-for="item in options"
          :key="item.cateName"
          :label="item.cateName"
          :value="item.cateName"
        ></el-option>
      </el-select>
    </p>
    <P>
      <span>商品价格</span>
      <el-input-number v-model="price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
    </P>
    <p>
      <span>商品图片</span>
      <el-upload
        :action="IMG_UPLOAD"
        list-type="picture-card"
        :show-file-list="false"
        :on-success="success"
      >
        <img v-if="img!=''" :src="img" alt="">
        <i v-else class="el-icon-plus"></i>
      </el-upload>
    </p>
    <p>
      <span>商品描述</span>
      <el-input type="textarea" :rows="2" placeholder="商品描述" v-model="goodsDesc"></el-input>
    </p>
    <p>
      <span></span>
      <el-button type="primary" @click="addGoods">添加商品</el-button>
    </p>
  </el-card>
</template>

<script>
import { categories, add,IMG_UPLOAD } from "@/api/apis";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      options: [],
      category: "",
      price: 1,
      dialogVisible: false,
      imgUrl: "",
      goodsDesc: "",
      IMG_UPLOAD:'',
      img:'',
    };
  },
  created() {
    categories().then((res) => {
      this.options = res.data.categories;
    });
    this.IMG_UPLOAD=IMG_UPLOAD
  },
  methods: {
    handleChange(value) {
      this.price = value;
    },
    success(res) {
      if (res.code == 0) {
        this.imgUrl = res.imgUrl;
        this.img='http://127.0.0.1:5000/upload/imgs/goods_img/'+res.imgUrl
      }
    },
    // 添加商品
    addGoods() {
      add(
        this.name,
        this.category,
        this.price,
        this.imgUrl,
        this.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          (this.name = ""),
            (this.category = ""),
            (this.price = ""),
            (this.imgUrl = ""),
            (this.goodsDesc = "");
          this.dialogImageUrl = "";
          this.reload()
        } else {
          this.$message({ message: "添加失败,请稍后重试", type: "error" });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
p {
  display: flex;
  align-items: center;
  margin-top: 20px;
  span {
    width: 80px;
  }
  .el-input,
  .el-textarea {
    width: 400px;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
</style>