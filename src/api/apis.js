import axios from 'axios'

axios.defaults.baseURL='http://127.0.0.1:5000'

// 商品列表下载地址
export var IMG=axios.defaults.baseURL+'/upload/imgs/goods_img/'
// 商品列表上传地址
export var IMG_UPLOAD=axios.defaults.baseURL+'/goods/goods_img_upload'
// 店铺列表图片下载地址
export var IMG_SHOP=axios.defaults.baseURL+'/upload/shop/'
// 店铺上传地址
export var IMG_SHOP_UPLOAD=axios.defaults.baseURL+'/shop/upload'
// 用户头像上传地址 /users/avatar_upload
export var IMG_AVATAR_UPLOAD=axios.defaults.baseURL+'/users/avatar_upload'

// 登录
// account:账户
// password:密码

export var login=(account,password)=> axios.post('/users/checkLogin',{account,password});

// 验证token是否过期
export var checktoken=(token) => axios.get('/users/checktoken',{params:{token}});

// 添加账户
// userGroup:用户组
export var adduser=(account,password,userGroup)=> axios.post('/users/add',{account,password,userGroup});

// 获取用户列表
// currentPage:当前页码
// pageSize: 每页条数
export var userlist=(currentPage,pageSize) => axios.get('/users/list',{params:{currentPage,pageSize}});
// 删除账户
export var deluser=(id) => axios.get('/users/del',{params:{id}});
// 批量删除
export var batchdel=(ids) => axios.get('/users/batchdel',{params:{ids}});
// 修改账户
// userGroup:用户组
export var edit=(id,account,userGroup)=> axios.post('/users/edit',{id,account,userGroup});
// 检查旧密码是否正确  oldPwd:旧密码
export var checkoldpwd=(oldPwd,id) => axios.get('/users/checkoldpwd',{params:{oldPwd,id}});
// 修改密码
export var editpwd=(newPwd,id)=> axios.post('/users/editpwd',{newPwd,id});
// 获取个人中心信息
export var accountinfo=(id) => axios.get('/users/accountinfo',{params:{id}});
// 获取分类列表
export var catelist=(currentPage,pageSize) => axios.get('/goods/catelist',{params:{currentPage,pageSize}});
// 添加分类
export var addcate=(cateName,state)=> axios.post('/goods/addcate',{cateName,state});
// 删除分类
export var delcate=(id) => axios.get('/goods/delcate',{params:{id}});
// 获取分类名称
export var categories=() => axios.get('/goods/categories',{params:{}});
// 编辑分类
export var editcate=(id,cateName,state)=> axios.post('/goods/editcate',{id,cateName,state});
// 商品列表
export var list=(currentPage,pageSize) => axios.get('/goods/list',{params:{currentPage,pageSize}});
// 商品删除
export var del=(id) => axios.get('/goods/del',{params:{id}});
// 添加商品  category:分类
export var add=(name,category,price,imgUrl,goodsDesc)=> axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc});
// 修改商品
export var goodsedit=(obj)=> axios.post('/goods/edit',obj);

// 订单列表
export var orderlist=(obj) => axios.get('/order/list',{params:obj});
// 订单查询
export var ordersearch=(obj) => axios.get('/order/search',{params:obj});
// 获取订单详情
export var orderdetail=(id) => axios.get('/order/detail',{params:{id}});
// 编辑订单
export var orderEdit=(obj)=> axios.post('/order/edit',obj);

// 获取店铺详情
export var shops=() => axios.get('/shop/info',{params:{}});

// 店铺内容修改
// id 店铺id
// name 店铺名称
// bulletin 店铺公告
// avatar 店铺头像
// deliveryPrice 起送价格
// deliveryTime 送达时间
// description 店铺描述
// score 店铺好评率
// sellCount 店铺销量
// supports 活动支持
// date 营业时间
// pics 图片
export var shopEdit=(obj)=> axios.post('/shop/edit',obj);

// 首页报表
export var totaldata=() => axios.get('/order/totaldata',{params:{}});

// 订单报表
export var ordertotal=(date) => axios.get('/order/ordertotal',{params:{date}});

