<template>
  <el-container>
    <el-aside width="200px">
      
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#DDDDDD"
        text-color="#111111"
        active-text-color="#009900"
        unique-opened
        router
      >
      <h3 style="text-indent: 1em;margin-top:10px;color:#303133;">吃了吗外卖管理</h3>
        <img style="width:50px;margin:10px 60px;" src="../assets/imgs/logo.png" alt />
        <div v-for="item in powerlist" :key="item.url">
          <el-menu-item :index="item.url" v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu :index="item.url" v-else>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="child in item.children"
                :key="child.url"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="display:flex;align-items: center;">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              欢迎你,{{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">
                <router-link to="/main/personal">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">
                <router-link to="/">
                  <span @click="remove">退出登录</span>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div demo-basic--circle>
            <el-avatar :src="imgUrl"></el-avatar>
          </div>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      list: [
        {
          url: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/order",
          icon: "el-icon-tickets",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "category",
          icon: "el-icon-s-goods",
          name: "商品管理",
          children: [
            { url: "/main/catalogue", name: "商品列表" },
            { url: "/main/addorder", name: "商品添加" },
            { url: "/main/category", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/shops",
          icon: "el-icon-office-building",
          name: "店铺管理",
          roles: ["super"],
        },
        {
          url: "5",
          icon: "el-icon-s-custom",
          name: "账户管理",
          children: [
            { url: "/main/accountlist", name: "账户列表" },
            { url: "/main/adduser", name: "添加账户" },
            { url: "/main/password", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "6",
          icon: "el-icon-s-data",
          name: "销售统计",
          children: [
            { url: "/main/merchandise", name: "商品统计" },
            { url: "/main/orderstatistics", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      index: 0,
      username: "",
      imgUrl: "",
      curhash: "",
      breadlist: [],
      title: localStorage.title,
    };
  },
  created() {
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0)
        //token有效
        this.username = localStorage.acc;
      else {
        this.username = "请登录";
      }
    });
    accountinfo(localStorage.id).then((res) => {
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
    this.curhash = this.$route.path;
    this.breadlist = this.$route.meta.breadlist;
    this.$bus.$on("reHeaderimg", () => {
      accountinfo(localStorage.id).then((res) => {
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    });
  },
  methods: {
    remove() {
      localStorage.removeItem("token");
    },
  },
  computed: {
    //权限数组
    powerlist() {
      // es5
      let newlist = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newlist;
    },
  },
  // 可以观察vue很多属性的变化
  watch: {
    // 要检查谁的变化
    // to:路由跳到哪;from:路由从哪跳
    // $route(to,from){//监听当前路由的变化
    //   console.log('路由变了')
    // }
    $route(to) {
      this.breadlist = to.meta.breadlist;
    },
  },
};
</script>

<style lang="less" scoped>
@theme: #dddddd;
.el-menu {
  border: 0;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  background-color: @theme;
}
.el-main {
  // background: -webkit-linear-gradient(right, #69d469, 0%, #ffa500, 100%);
  background: linear-gradient(to right, #dcb8b8 0%, #c39a4e 100%);
}
a {
  text-decoration: none;
  
}
.el-icon-platform-eleme {
  font-size: 50px;
  color: #409eff;
  margin: 10px 50px;
}
</style>