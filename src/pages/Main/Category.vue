<template>
  <el-card class="box-card">
    <p>
      <span>商品分类</span>
      <el-button type="primary" @click="clickAdd">添加分类</el-button>
    </p>
    <el-table :data="tableData" style="width: 100%" height="400">
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="cateName" label="分类名称">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch :disabled="!scope.row.isedit" v-model="scope.row.state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">{{scope.row.isedit?'完成':'编辑'}}</el-button>
          <el-button size="small" type="danger" @click="clickDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,sizes, prev, pager, next, jumper"
      :total="totals"
      :current-page="currentPage"
      :page-sizes="[4, 8,16 , 24]"
    ></el-pagination>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.cateName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSuer">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { catelist, addcate, delcate, editcate } from "@/api/apis";
export default {
  inject: ["reload"],
  created() {
    this.getgoodslist();
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totals: 0,
      sizes: 4,
      dialogFormVisible: false,
      form: {
        cateName: "",
        delivery: false,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    getgoodslist() {
      catelist(this.currentPage, this.sizes).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.isedit = false;
          obj.state=obj.state==1
        }
        this.tableData = arr;
        this.totals = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.sizes = val;
      this.getgoodslist();
    },
    indexMethod(index) {
      return index + 1;
    },
    clickAdd() {
      this.dialogFormVisible = true;
    },
    clickSuer() {
      addcate(this.form.cateName, JSON.stringify(this.form.delivery)).then(
        (res) => {
          if (res.data.code == 0) {
            //成功
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.getgoodslist();
          } else {
            this.$message({ message: "添加失败,请稍后重试", type: "error" });
          }
        }
      );
    },
    // 删除分类
    clickDel(curId) {
      this.$confirm("此操作将删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(curId).then((res) => {
            if (res.data.code == 0) {
              //成功
              this.getgoodslist();
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
    // 编辑
    handleEdit(row) {
      if (row.isedit) {
        //编辑状态
        editcate(row.id,row.cateName,row.state).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            } else
              this.$message({ message: "编辑失败,请稍后重试", type: "error" });
          }
        );
        row.isedit = false;

      } else {
        //不在编辑状态
        row.isedit = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
p {
  display: flex;
  justify-content: space-between;
}
</style>