<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage, index) in skuInfo.skuImageList" :key="skuImage.id">
        <img :src="skuImage.imgUrl" @click="selectImg(index)" :class="{ active: index == currenIndex }">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "ImageList",
  data() {
    return {
      currenIndex: 0
    }
  },
  props: ['skuInfo'],
  watch: {
    skuInfo: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true,
            //如果需要分页器
            /*  pagination: {
               el: ".swiper-pagination",
               clickable: true
             }, */
            //如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //显示几个图片
            slidesPerView: 3,
            //每次切换图片的个数
            slidesPerGroup: 1
          });
        })
      }
    }
  },
  methods: {
    selectImg(index) {
      this.currenIndex = index
      this.$bus.$emit('getIndex',index)
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      float: left;
      cursor: pointer;


      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      /*   &:hover {
        border: 2px solid #f60;
        padding: 1px;
      } */
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>