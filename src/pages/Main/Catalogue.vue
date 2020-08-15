<template>
  <el-card class="box-card">
    <h3>商品列表</h3>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      style="width: 100%"
      height="500"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="图片">
              <img :src="IMG+''+props.row.imgUrl" width="60" height="60" />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="IMG+''+scope.row.imgUrl" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="clickEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="clickDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="48"
      :current-page="currentPage"
      :page-sizes="[4, 8,16 , 24]"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <p>
        <span>商品名称</span>
        <el-input v-model="curlist.name" placeholder="商品名称">{{curlist.name}}</el-input>
      </p>
      <p>
        <span>商品分类</span>
        <el-select v-model="curlist.category" placeholder="商品分类">
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
        <el-input-number
          v-model="curlist.price"
          @change="handleChange"
          :min="1"
          label="商品价格"
        >{{curlist.price}}</el-input-number>
      </P>
      <p>
        <span>商品图片</span>
        <el-upload
          :action="IMG_UPLOAD"
          list-type="picture-card"
          :on-success="success"
          :show-file-list="false"
        >
          <img v-if="curlist.imgUrl" :src="IMG+''+curlist.imgUrl" style="width:148px;height:148px;" />
          <img v-else :src="IMG+''+curlist.imgUrl" style="width:148px;height:148px;" />
        </el-upload>
      </p>
      <p>
        <span>商品描述</span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="商品描述"
          v-model="curlist.goodsDesc"
        >{{curlist.goodsDesc}}</el-input>
      </p>
      <p>
        <span></span>
        <el-button type="primary" @click="clickEditSuer">确认修改</el-button>
      </p>
    </el-dialog>
  </el-card>
</template>

<script>
import { list, del, categories, goodsedit, IMG, IMG_UPLOAD } from "@/api/apis";
import { setCNtime } from "@/utils/utils";
export default {
  created() {
    this.getlist();
    categories().then((res) => {
      this.options = res.data.categories;
    });
    this.IMG_UPLOAD = IMG_UPLOAD;
    this.IMG = IMG;
  },
  data() {
    return {
      loading: true,
      IMG: "",
      IMG_UPLOAD: "",
      tableData: [],
      currentPage: 1,
      totals: 0,
      sizes: 4,
      options: [],
      dialogVisible: false,
      dialogFormVisible: false,
      curlist: {},
    };
  },
  methods: {
    handleChange(value) {
      this.price = value;
    },
    getlist() {
      list(this.currentPage, this.sizes).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = setCNtime(obj.ctime);
        }
        this.tableData = arr;
        this.totals = res.data.total;
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.sizes = val;
      this.getlist();
    },
    // 删除商品
    clickDel(curId) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del(curId).then((res) => {
            if (res.data.code == 0) {
              //成功
              this.getlist();
            } else
              this.$message({
                message: "删除失败,请稍后重试",
                type: "error",
              });
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改商品
    clickEdit(row) {
      this.dialogFormVisible = true;
      this.curlist = { ...row };
    },
    success(res) {
      if (res.code == 0) {
        this.curlist.imgUrl = res.imgUrl;
      }
    },
    clickEditSuer() {
      goodsedit(this.curlist).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "系统提示：商品修改成功！！",
            type: "success",
          });
          this.getlist();
          this.dialogFormVisible = false;
        } else {
          this.$message.error("系统提示：商品修改失败，请稍后重试");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
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
}
</style>