import { reqUserAddressInfo, reqUserOrderInfo } from "@/api"

reqUserAddressInfo

const state = {
    address: [],
    order: {}
}
const actions = {
    //获取地址
    async getUserAddress({ commit }) {
        let result = await reqUserAddressInfo()
        console.log(result);
        if (result.code = 200) {
            commit('GETUSERADDRESS', result.data)
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取购物订单
    async getUserOrder({ commit }) {
        let result = await reqUserOrderInfo()
        console.log(result);
        if (result.code = 200) {
            commit('GETUSERORDER', result.data)
        } else {
            return Promise.reject(new Error(result.message))
        }
    }

}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETUSERORDER(state, order) {
        state.order = order
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}