import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import {checktoken} from '@/api/apis'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: '/main',
    component: () => import('../pages/Main'),
    children: [{
        path: '/main/index',
        name: '/main/index',
        component: () => import('../pages/Main/Index'),
        // 自定义数据
        meta:{breadlist:['后台首页']}
      },
      {
        path: '/main/order',
        name: '/main/order',
        component: () => import('../pages/Main/Order'),
        meta:{breadlist:['订单管理']}
      },
      {
        path: '/main/catalogue',
        name: '/main/catalogue',
        component: () => import('../pages/Main/Catalogue')
        ,
        meta:{breadlist:['商品管理','商品列表']}
      },
      {
        path: '/main/addorder',
        name: '/main/addorder',
        component: () => import('../pages/Main/Addorder'),
        meta:{breadlist:['商品管理','商品添加']}
      },
      {
        path: '/main/category',
        name: '/main/category',
        component: () => import('../pages/Main/Category'),
        meta:{breadlist:['商品管理','商品分类']}
      },
      {
        path: '/main/shops',
        name: '/main/shops',
        component: () => import('../pages/Main/Shops'),
        meta:{breadlist:['店铺管理']}
      },
      {
        path: '/main/accountlist',
        name: '/main/accountlist',
        component: () => import('../pages/Main/AccountList'),
        meta:{breadlist:['账户管理','账户列表']}
      },
      {
        path: '/main/adduser',
        name: '/main/adduser',
        component: () => import('../pages/Main/AddUser'),
        meta:{breadlist:['账户管理','添加账户']}
      },
      {
        path: '/main/password',
        name: '/main/password',
        component: () => import('../pages/Main/ChangePassword'),
        meta:{breadlist:['账户管理','修改密码']}
      },
      {
        path: '/main/merchandise',
        name: '/main/merchandise',
        component: () => import('../pages/Main/Merchandise'),
        meta:{breadlist:['销售统计','商品统计']}
      },
      {
        path: '/main/orderstatistics',
        name: '/main/orderstatistics',
        component: () => import('../pages/Main/OrderStatistics'),
        meta:{breadlist:['销售统计','订单统计']}
      },
      {
        path: '/main/personal',
        name: '/main/personal',
        component: () => import('../pages/Main/Personal'),
        meta:{breadlist:['个人中心']}
      },
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.path != '/') { //不是跳转到登录界面拦截
    // 判定用户是否登录
    checktoken(localStorage.token).then((res) => {
      // 在登录状态,可以跳转
      if (res.data.code == 0) {
        next()
      } else {
        // 不在登录状态,跳到登录界面
        next('/')
      }
    })
    // 跳转到登录界面,可以跳转
  } else
    next()
})

export default router