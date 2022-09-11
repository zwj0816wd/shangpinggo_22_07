<template>
    <div>
        <TypeNav />
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="p in floorList" :key="p.id" :floor="p"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {};
    },
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        //获取Floor，Brand数据
        this.$store.dispatch('getFloorList')
        this.$store.dispatch('getBannerList')
        /* //获取用户信息
        this.$store.dispatch('getUserInfo') */
    },
    computed: {
        ...mapState({ floorList: state => state.home.floorList })
    }
}
</script>
<style lang="less" scoped>
</style>
