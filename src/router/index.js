import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入routes数据
import routes from "./routes";
//引入store
import store from '@/store';
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, reslove, reject) {
    if (reslove && reject) {
        originPush.call(this, location, reslove, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
    if (reslove && reject) {
        originReplace.call(this, location, reslove, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes,
    base:'./dist',
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name

    if (token) {//登陆后的处理
        if (to.path == '/login' || to.path == '/register') {
            //如果已经登录了，就不会再去登陆和注册界面了，返回首页
            token ? next('/home') : next()
        } else {
            if (name) {
                next()
            } else {
                //没有用户信息，让仓库派发信息获取name
                try {
                    //成功放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //则token过期了(获取不到用户信息)，删除原有的token重新获取新token
                    await store.dispatch('userLogout')
                    //重新登录
                    next('/login')
                }
            }
        }
    } else {
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            //将未登录时想去却不能去到的地址存到query参数上，登陆后便可利用这个参数直去到之前想去的地址
            next('/login?redirect=' + to.path)
        } else {
            next()
        }

    }

})
export default router