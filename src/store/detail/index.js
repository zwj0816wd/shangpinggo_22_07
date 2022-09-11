import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token: localStorage.getItem('uuid_token') || getUUID()
}
const actions = {
    //获取触碰详细信息
    async getGoodsInfo({ commit }, skuId) {
        const result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //添加到购物车返回的解析
        const result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 200
        } else {
            return Promise.reject(new Error(result.code))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo() {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}