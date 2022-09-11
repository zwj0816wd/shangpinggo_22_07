<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑：分类 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <!-- 面包屑：关键词-->
            <li class="with-x" v-if="this.searchParams.keyword">{{ this.searchParams.keyword }}<i
                @click="removeKeyWord">×</i>
            </li>
            <!-- 面包屑：品牌-->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademark">×</i>
            </li>
            <!-- 面包屑：品牌属性值-->
            <li class="with-x" v-for="(prop, index) in searchParams.props " :key="index">{{
                prop.split(':')[1]
            }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOneDece || isOneAce }" @click="changeOrder(1)">
                  <!-- 传入参数判断时综合知识价格 -->
                  <a>综合<span v-show="isOneDece" style="font-family: 'iconfont';">&#xe601;</span><span v-show="isOneAce"
                      style="font-family: 'iconfont';">&#xe600;</span></a>
                </li><!-- 用字体图标来展示上下箭头 -->
                <li :class="{ active: isTwoDece || isTwoAce }" @click="changeOrder(2)">
                  <!-- 传入参数判断时综合知识价格 -->
                  <a>价格<span v-show="isTwoDece" style="font-family: 'iconfont';">&#xe601;</span><span v-show="isTwoAce"
                      style="font-family: 'iconfont';">&#xe600;</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="goDetail(good.id)"><img v-lazy="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getPageNo="getPageNo">
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "1:desc",
        "pageNo": sessionStorage.getItem('pageNo') * 1 || 1,
        "pageSize": 10,
        "props": [],
        "trademark": ""
      },
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    //再发请求之前，把参数整理好
    this.setData()
  },
  mounted() {
    this.getData()
    //通过事件总线得到品牌
    this.$bus.$on('trademarkInfo', this.trademarkInfo)
    //通过事件总线具体型号
    this.$bus.$on('propsInfo', this.propsInfo)
  },
  methods: {
    //把发送请求封装成一个函数
    getData() {
      sessionStorage.setItem('pageNo', this.searchParams.pageNo)
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //再发请求之前，把参数整理好
    setData() {
      //每次搜索时置空categoryId
      Object.assign(this.searchParams, {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
      })
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
    },
    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的:如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字股不今带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.pageNo = 1
      //再发请求之前，把参数整理好
      Object.assign(this.searchParams, {
        "category1Id": undefined,
        "category2Id": undefined,
        "category3Id": undefined
      })
      //参数整理好后，再重新发请求
      this.getData()
      //进行路由跳转
      this.$router.push({
        name: 'search',
        params: { keyword: this.searchParams.keyword || undefined },
        //query: this.$route.query || undefined
      })

    },
    removeKeyWord() {
      this.searchParams.keyword = undefined
      this.getData()
      //进行路由跳转
      this.$router.push({
        name: 'search',
        //params: { keyword: this.searchParams.keyword || undefined },
        query: this.$route.query || undefined
      })
      //通过全局事件总线来置空input框
      this.$bus.$emit('cleanKeyword')
    },
    //trademarkInfo事件的回调函数
    trademarkInfo(trademark) {
      this.searchParams.pageNo = 1
      if (!(this.searchParams.trademark == `${trademark.tmId}:${trademark.tmName}`)) {
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        this.getData()
      }

    },
    //删除品牌信息
    removeTrademark() {
      this.searchParams.pageNo = 1
      //品牌信息置空
      this.searchParams.trademark = undefined
      this.getData()
    },
    //propsInfo事件的回调函数
    propsInfo(attrs, attrValue) {
      this.searchParams.pageNo = 1
      //判断是否重复，重复便不添加
      if (this.searchParams.props.indexOf(`${attrs.attrId}:${attrValue}:${attrs.attrName}`) == -1) {
        this.searchParams.props.push(`${attrs.attrId}:${attrValue}:${attrs.attrName}`)
        this.getData()
      }
    },
    //删除点击的属性值
    removeProp(index) {
      this.searchParams.pageNo = 1
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    //改变排序种类和方式
    changeOrder(flag) {
      this.searchParams.pageNo = 1
      if (this.searchParams.order.split(':')[1] == 'desc') {
        this.searchParams.order = `${flag}:asc`
      } else {
        this.searchParams.order = `${flag}:desc`
      }
      this.getData()
    },
    //getPageNo自定义事件的回调函数，获取当前页面
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    },
    //点击商品跳转到详情页
    goDetail(id) {
      this.$router.push({
        name: 'detail',
        params: { skuId: id }
      })
      //document.body.scrollTop = 0;
      //document.documentElement.scrollTop = 0;
    }


  },
  computed: {
    //mapGetters里面的写法:传递的数组，因为getters计算是没有划分模块【home, search】
    ...mapGetters(['goodsList']),
    //获取store仓库search的数据
    ...mapState({ total: state => state.search.searchList.total }),
    //综合升序
    isOneDece() {
      return (this.searchParams.order.indexOf('1') != -1) && (this.searchParams.order.indexOf('desc') != -1)
    },
    //综合降序
    isOneAce() {
      return (this.searchParams.order.indexOf('1') != -1) && (this.searchParams.order.indexOf('asc') != -1)
    },
    //价格升序
    isTwoDece() {
      return (this.searchParams.order.indexOf('2') != -1) && (this.searchParams.order.indexOf('desc') != -1)
    },
    //价格降序
    isTwoAce() {
      return (this.searchParams.order.indexOf('2') != -1) && (this.searchParams.order.indexOf('asc') != -1)
    }
  },
  //监听路由变化做出响应
  watch: {
    $route: {
      //deep:true,
      handler(newVal, oldVal) {
        //再发请求之前，把参数整理好
        this.setData()
        //参数整理好后，再重新发请求
        this.getData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>