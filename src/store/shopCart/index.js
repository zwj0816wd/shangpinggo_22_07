import { reqCartList, reqDelectCartById, reqUpdateCartCheckedById } from "@/api"

const state = {
    cartList: []
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        const result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
            return 200
        } else {
            return Promise.reject(new Error(result.code))
        }

    },
    //删除某一商品
    async delectCartListBySkuId({ commit }, skuId) {
        const result = await reqDelectCartById(skuId)
        if (result.code == 200) {
            return 200
        } else {
            return Promise.reject(new Error(result.code))
        }

    },
    //修改商品选中状态
    async updateCartCheckedById({ commit }, { skuId, isChecked }) {
        const result = await reqUpdateCartCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 200
        } else {
            return Promise.reject(new Error(result.code))
        }

    },
    //删除所有被改选的商品
    deleteAllCheckedCart({ dispatch, state }) {
        let PromiseAll = []
        state.cartList.forEach(e => {
            let promise = e.isChecked == 1 ? dispatch('delectCartListBySkuId', e.skuId) : ''
            PromiseAll.push(promise)
        });
        //Promise.all方法，只要数组中有一个失败的便返回失败的结果
        return Promise.all(PromiseAll)

    },
    //改变所有商品的勾选状态
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList.forEach(e => {
            let promise = dispatch('updateCartCheckedById', { skuId: e.skuId, isChecked })
            PromiseAll.push(promise)
        });
        //Promise.all方法，只要数组中有一个失败的便返回失败的结果
        return Promise.all(PromiseAll)
    }

}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList[0] && cartList[0].cartInfoList || []
    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters
}