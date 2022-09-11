//所有api接口统一管理
import requests from "./request";
import mockRequest from './request-mock'
//三级联动接口
//三级菜单的请求地址/api/product/getBaseCategoryList GET没有任何参数
//对外暴露一个函数，只要外部调用这个函数，就想服务器发起ajex请求、获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可,
export const reqCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}
//获取banner（Home首页轮播图接口）
export const reqBannerList = () => {
    return mockRequest({
        url: '/banner',
        method: 'get'
    })
}
//获取floor（Home首页轮播图接口）
export const reqFloorList = () => {
    return mockRequest({
        url: '/floor',
        method: 'get'
    })
}

//获取搜索模块数据 地址/api/list 请求方式post  需要带参数

export const reqSearchList = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params || {}//传入参数至少是一个空对象
    })
}
//获取商品详情数据
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: 'get',
    })
}
//将产品添加到购物车中（获取更新某一数据的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}
//将产品添加到购物车中（获取更新某一数据的个数）
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get',
    })
}
//删除到购物车中产品
export const reqDelectCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    })
}
//修改购物车中产品选中的状态
export const reqUpdateCartCheckedById = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get',
    })
}
//获取验证码
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}
//注册
export const reqUserRegister = (data) => {
    
    return requests({
        url: `/user/passport/register`,
        method: 'post',
        data
    })
}
//登录
export const reqUserLogin = (data) => {
    console.log(data);
    return requests({
        url: `/user/passport/login`,
        method: 'post',
        data
    })
}
//获取用户信息（需要带token在请求头中）
export const reqUserInfo = () => {
    return requests({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get',
    })
}
//退出登录
export const reqUserLogout = () => {
    return requests({
        url: `/user/passport/logout`,
        method: 'get',
    })
}
//获取用户地址信息
export const reqUserAddressInfo = () => {
    return requests({
        url: `/user/userAddress/auth/findUserAddressList`,
        method: 'get',
    })
}
//获取商品清单
export const reqUserOrderInfo = () => {
    return requests({
        url: `/order/auth/trade`,
        method: 'get',
    })
}
//提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}
//获取支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get',
    })
}
//获取订单支付状态
export const reqPaySatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}
//获取个人中心数据
export const reqCenterMyOrderList = (page,limit) => {
    return requests({
        url: `order/auth/${page}/${limit}`,
        method: 'get',
    })
}