import { reqSearchList } from "@/api"

reqSearchList
const state = {
    searchList: {}
}
//
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params)
        commit('GETSEARCHLIST', result.data)
    }
}
//
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

//计算属性，简化数据
const getters = {
    goodsList(state) {
        return state ? state.searchList.goodsList : []
    },
    attrsList(state) {
        return state ? state.searchList.attrsList : []
    },
    trademarkList(state) {
        return state ? state.searchList.trademarkList : []
    }
}


export default {
    state,
    mutations,
    actions,
    getters

}