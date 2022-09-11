import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
Vue.config.productionTip = false
//引入仓库
import store from '@/store'
//引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//按需引入饿了么组件
import { Button, Select, MessageBox } from 'element-ui';
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//element-ui组件全局注册
Vue.component(Button.name, Button);
//element-ui组件挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入mockServe 调用mockjs
import "@/mock/mockServe"
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件夹里面的函数
import * as API from '@/api'
//引入图片
import gif from '@/assets/dongman.gif'
//引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: gif
})
//引入自定义插件
import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{
  name:'zs'
})
//引入表单校验插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
