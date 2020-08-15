<template>
  <el-card class="box-card">
    <div>
      <div>
        <span>订单号</span>
        <el-input placeholder="订单号" v-model="orderNo">{{orderNo}}</el-input>
      </div>
      <div>
        <span>收货人</span>
        <el-input placeholder="收货人" v-model="consignee">{{consignee}}</el-input>
      </div>
      <div>
        <span>手机号</span>
        <el-input placeholder="手机号" v-model="phone">{{phone}}</el-input>
      </div>
      <div>
        <span>订单状态</span>
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="time">
        <span class="time">选择时间</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
        <el-button type="primary" @click="search" style="margin-left:20px;">查询</el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      border
      style="width: 100%;"
      height="400"
    >
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="open(scope.row.id)">查看</el-button>
          <el-button type="txet" size="small" @click="clickedit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[7,14,21,28]"
      :page-size="10"
      layout="total,sizes, prev, pager, next, jumper"
      :total="totals"
    ></el-pagination>
    <!-- 查看 -->
    <el-dialog title="订单详情" :visible.sync="centerDialogVisible" width="30%" center>
      <p>订单号:{{curOder.orderNo}}</p>
      <p>下单时间: {{curOder.orderTime}}</p>
      <p>联系电话: {{curOder.phone}}</p>
      <p>收货人: {{curOder.consignee}}</p>
      <p>送货地址: {{curOder.deliverAddress}}</p>
      <p>送达时间: {{curOder.deliveryTime}}</p>
      <p>备注: {{curOder.remarks}}</p>
      <p>订单金额: {{curOder.orderAmount}}</p>
      <p>订单状态: {{curOder.orderState}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="修改订单" :visible.sync="orderedit" width="50%" center>
      <p>
        <span>订单号:</span>
        <el-input v-model="curOder.orderNo">{{curOder.orderNo}}</el-input>
      </p>
      <p>
        <span>下单时间:</span>
        <el-date-picker v-model="curOder.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </p>
      <p>
        <span>联系电话:</span>
        <el-input v-model="curOder.phone">{{curOder.phone}}</el-input>
      </p>
      <p>
        <span>收货人:</span>
        <el-input v-model="curOder.consignee">{{curOder.consignee}}</el-input>
      </p>
      <p>
        <span>送货地址:</span>
        <el-input v-model="curOder.deliverAddress">{{curOder.deliverAddress}}</el-input>
      </p>
      <p>
        <span>送达时间:</span>
        <el-date-picker v-model="curOder.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </p>
      <p>
        <span>备注:</span>
        <el-input v-model="curOder.remarks">{{curOder.remarks}}</el-input>
      </p>
      <p>
        <span>订单金额:</span>
        <el-input v-model="curOder.orderAmount">{{curOder.orderAmount}}</el-input>
      </p>
      <p>
        <span>订单状态:</span>
        <el-select v-model="curOder.orderState" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="orderedit = false">取 消</el-button>
        <el-button type="primary" @click="clickOk">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { orderlist, orderdetail, orderEdit } from "@/api/apis";
import { setCNHourstime, settime, setnewtime } from "@/utils/utils";
export default {
  created() {
    this.getoderlist();
  },
  data() {
    return {
      loading:true,
      centerDialogVisible: false,
      orderedit: false,
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      tableData: [],
      currentPage: 1,
      totals: 0,
      pageSize: 7,
      order: {
        currentPage: 1,
        pageSize: 7,
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: "",
      },
      curOder: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: "",
        orderTime: "",
        deliverAddress: "",
        deliveryTime: "",
        remarks: "",
        orderAmount: "",
      },
      orderNo: "",
      consignee: "",
      phone: "",
      orderState: "",
      date: null,
      screen: {},
    };
  },
  methods: {
    // 获取订单详情
    getorder(curId) {
      orderdetail(curId).then((res) => {
        res.data.data.orderTime = settime(res.data.data.orderTime);
        res.data.data.deliveryTime = settime(res.data.data.deliveryTime);
        this.curOder = res.data.data;
      });
    },
    // 获取订单列表
    getoderlist(screen) {
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...screen,
      }).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = setCNHourstime(obj.orderTime);
          obj.deliveryTime = setCNHourstime(obj.deliveryTime);
        }
        this.tableData = arr;
        this.totals = res.data.total;
        this.loading=false
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getoderlist(this.screen);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getoderlist(this.screen);
    },
    // 查询
    search() {
      // console.log(this.order.date)
      // 筛选参数,当需要查询的值不为空时传入
      let screen = {};
      if (this.orderNo != "") screen.orderNo = this.orderNo;
      if (this.consignee != "") screen.consignee = this.consignee;
      if (this.phone != "") screen.phone = this.phone;
      if (this.orderState != "" && this.orderState != "全部")
        screen.orderState = this.orderState;
      if (this.date)
        screen.date = JSON.stringify(this.date.map((item) => settime(item)));
      // console.log(this.date)
      this.screen = screen;
      this.currentPage = 1;
      this.getoderlist(screen);
    },
    // 查看
    open(curId) {
      this.centerDialogVisible = true;
      this.getorder(curId);
    },
    // 编辑
    clickedit(curId) {
      this.orderedit = true;
      this.getorder(curId);
    },
    // 确定编辑
    clickOk() {
      let obj = this.curOder;
      obj.orderTime = setnewtime(obj.orderTime);
      obj.deliveryTime = setnewtime(obj.deliveryTime);
      orderEdit(obj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "系统提示：订单修改成功！！",
            type: "success",
          });
          this.getoderlist();
          this.orderedit = false;
        } else {
          this.$message.error("系统提示：订单修改失败，请稍后重试");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-card__body {
  > div {
    display: flex;
    flex-wrap: wrap;
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      span {
        width: 30%;
        padding: 0 10px;
      }
    }
  }
}

.el-date-editor--datetimerange.el-input__inner {
  width: 670px;
}
.time {
  width: 43%;
}
p {
  display: flex;
  // justify-content: start;
  font-size: 18px;
  line-height: 40px;
  margin-top: 10px;
  span {
    width: 100px !important;
  }
}
</style>