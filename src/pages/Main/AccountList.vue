<template>
  <el-card class="box-card">
    <p>账号列表</p>
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
       height="350"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userGroup" label="用户组"></el-table-column>
      <el-table-column prop="ctime" label="日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="clickChange(scope.row.id,scope.row.account,scope.row.userGroup)"
          >编辑</el-button>
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
      :page-sizes="[ 4,8 , 12]"
    ></el-pagination>
    <br />
    <div>
      <el-button type="danger" @click="batChdel">批量删除</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-dialog title="编辑账户" :visible.sync="dialogFormVisible" width="450px">
      <p>
        <span>账号</span>
        <el-input v-model="user" clearable></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSure">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { userlist, deluser, batchdel, edit } from "@/api/apis";
import { setCNtime } from "@/utils/utils";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      currentPage: 1,
      totals: 0,
      sizes: 4,
      dialogFormVisible: false,
      user: "",
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
      changeid: "",
    };
  },
  created() {
    this.getuserlist();
  },
  methods: {
    getuserlist() {
      userlist(this.currentPage, this.sizes).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = setCNtime(obj.ctime);
        }
        this.tableData = arr;
        this.totals = res.data.total;
      });
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserlist();
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      this.sizes = val;
      this.getuserlist();
    },
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 删除
    clickDel(curAcc) {
      this.$confirm("此操作将永久删除该此账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deluser(curAcc).then((res) => {
            if (res.data.code == 0) {
              //成功
              this.getuserlist();
            } else
              this.$message({ message: "删除失败,请稍后重试", type: "error" });
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
    // 获取需要批量删除的id
    handleSelectionChange(val) {
      let arr = val.map((item) => item.id);
      this.ids = arr;
    },
    // 批量删除  参数需转成字符串格式
    batChdel() {
      this.$confirm("此操作将永久删除账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchdel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              //成功
              this.reload();
            } else
              this.$message({ message: "删除失败,请稍后重试", type: "error" });
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
    clickChange(curid, curuser, curuserGroup) {
      this.dialogFormVisible = true;
      this.changeid = curid;
      this.user = curuser;
      this.usergroup = curuserGroup;
    },
    // 确定编辑
    clickSure() {
      edit(this.changeid, this.user, this.usergroup).then((res) => {
        if (res.data.code == 0) {
          //成功
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.reload();
        } else this.$message({ message: "删除失败,请稍后重试", type: "error" });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  padding: 10px;
  p {
    display: flex;
    span{
      width: 80px;
    }
    margin-bottom: 20px;
    font-size: 20px;
  }
}
</style>