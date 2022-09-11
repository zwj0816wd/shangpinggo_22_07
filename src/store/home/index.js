import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
//
const actions = {
    //获取商品分类的数据
    async getCategoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }

    },
    //获取banner轮播图的数据
    async getBannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }

    },
    //获取floor轮播图的数据
    async getFloorList({ commit }) {
        const result = await reqFloorList()
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }

    }
}
//
const mutations = {
    //将获取的商品分类的数据存储到store上
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    //将获取的banner轮播图数据的数据存储到store上
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    //将获取的floor轮播图数据存储到store上
    FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}


//
const getters = {}
//

export default {
    state,
    mutations,
    actions,
    getters


}