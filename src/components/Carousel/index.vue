<!-- 全局组件轮播图 -->
<template>
    <div class="swiper-container" ref="floor2Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="p in list" :key="p.id">
                <img :src="p.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props: ['list'],
    data() {
        return {
        }
    },
    watch: {
        list: {
            //因为父亲给的floor数据不会改变，所以要立即执行一次
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.floor2Swiper, {
                        loop: true,
                        //如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true
                        },
                        //如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }
                    });
                });
            }
        }
    },
}
</script>
<style lang="less" scoped>
</style>
