import store from "@/store";
//对axios二次封装
import axios from "axios";
//引入进度条  nProgress的start方法进度条开始done方法进度条结束
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'
//1:利用axios对象的方法create，去创建一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    baseURL: '/api',//基础路径配置
    timeout: 5000,//代表请求时间是五秒
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //config是一个配置对象，有一个很重要的headers请求头
    //向请求头加入用户唯一ID
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
        config.headers.token = store.state.user.token
    }
    nprogress.start()//进度条开始动
    return config
})
//响应拦截器
requests.interceptors.response.use(
    //成功回掉调函数
    (res) => {
        nprogress.done()//进度条结束
        return res.data
    },
    //失败回调函数
    (error) => {
        return Promise.reject(new Error('faile'))
    })


export default requests