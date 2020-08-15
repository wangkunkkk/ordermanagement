<template>
  <el-card class="box-card">
    <div class="time">
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div id="main" style="width:100%;height:600px"></div>
  </el-card>
</template>

<script>
import { ordertotal } from "@/api/apis";
import {settime} from '@/utils/utils'
export default {
  data() {
    return {
      date: [],
      orderAmount:[],
      orderTime:[]
    };
  },
  created() {
    this.getorderdata(JSON.stringify(this.date))
  },
  methods: {
    getorderdata(date) {
      ordertotal(date).then((res) => {
        this.orderAmount=res.data.data.map(item=>item.orderAmount)
        this.orderTime=res.data.data.map(item=>settime(item.orderTime))
        // console.log(res,this.orderAmount,this.orderTime)
        this.getdata();
      });
    },
    getdata() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["下单时间"],
        },
        xAxis: [
          {
            type: "category",
            data: this.orderTime,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            min: 0,
            max: 150,
            interval: 30,
            axisLabel: {
              formatter: "{value} 元",
            },
          }
        ],
        series: [
          {
            name: "订单金额",
            type: "bar",
            data: this.orderAmount
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 查询
    search(){
      let arr=[]
      if(this.date)
      arr=this.date.map(item=>settime(item))
      this.getorderdata(JSON.stringify(arr))
    }
  },
  mounted() {
    this.getdata();
  },
};
</script>

<style lang="less" scoped>
.time {
  span {
    margin-right: 20px;
  }
  .el-button {
    margin-left: 20px;
  }
  margin-bottom: 50px;
}
</style>