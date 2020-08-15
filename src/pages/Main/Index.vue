<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-document"></i>
          <div>
            <p class="title">总订单</p>
            <p>{{list.totalOrder}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-coin"></i>
          <div>
            <p class="title">总销售额</p>
            <p>{{list.totalAmount}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-date"></i>
          <div>
            <p class="title">今日订单数</p>
            <p>{{list.todayOrder}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <i class="el-icon-money"></i>
          <div>
            <p class="title">今日销售数</p>
            <p>{{list.totayAmount}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import { totaldata } from "@/api/apis";
export default {
  created() {
    totaldata().then((res) => {
      this.list = res.data;
      this.getdata()
    });
  },
  methods: {
    getdata() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单量", "销售额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.list.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单量",
            type: "line",
            stack: "总量",
            data: this.list.orderData,
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: this.list.amountData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  data() {
    return {
      list: {},
    };
  },
};
</script>

<style lang="less" scoped>
.bg-purple {
  background-color: #fff;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    text-align: center;
    font-size: 18px;
    p {
      font-weight: bold;
    }
    .title {
      color: rgb(199, 177, 177);
      margin-bottom: 5px;
      font-weight: normal;
    }
  }
  i {
    font-size: 70px;
    color: rgb(160, 121, 197);
  }
  .el-icon-money {
    color: gold;
  }
  .el-icon-coin {
    color: rgb(245, 58, 89);
  }
}
#main {
  margin-top: 30px;
  padding: 10px;
  background-color: #fff;
}
</style>