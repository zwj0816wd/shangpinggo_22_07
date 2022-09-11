<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from './components//Header'
import Footer from './components//Footer'
export default {
  name: 'App',
  data() {
    return {
      n: 0,
      flag: 12312,
      timer: null
    }
  },
  mounted() {
    //获取商品分类数据
    this.$store.dispatch('getCategoryList')
  },
  components: {
    Header,
    Footer
  },
/*   watch: {
    $router: {
      immediate: true,
      handler() {
        this.$store.dispatch('getUserInfo')
      }
    }
  } */
}
</script>

<style>
</style>
