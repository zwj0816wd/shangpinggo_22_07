<!-- 全局组件商品分类 -->
<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委托 -->
            <div @mouseleave="leaveIndex" @mouseenter="changeShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 加入进入和离开的动画效果 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 事件委托+编程式导航实现路由跳转与传递参数 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <div :class="{ cur: p1.categoryId == index }" v-show="p1.categoryId != 17" class="item"
                                v-for="p1 in categoryList" :key="p1.categoryId">
                                <h3 @mouseenter="changeIndex(p1.categoryId)">
                                    <!-- <a href="">{{ p1.categoryName }}</a> -->
                                    <a :data-categoryName="p1.categoryName" :data-category1Id="p1.categoryId">
                                        {{ p1.categoryName }}
                                    </a>
                                </h3>
                                <!--  <div class="item-list clearfix" v-show="p1.categoryId == index"> -->
                                <!-- 通过js动态显示和隐藏二三级目录 -->
                                <div class="item-list clearfix"
                                    :style="{ display: p1.categoryId == index ? 'block' : 'none ' }">
                                    <div class="subitem" v-for="p2 in p1.categoryChild" :key="p2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="p2.categoryName"
                                                    :data-category2Id="p2.categoryId">
                                                    {{ p2.categoryName }}
                                                </a>
                                            </dt>
                                            <dd>
                                                <em v-for="p3 in p2.categoryChild" :key="p3.categoryId">
                                                    <a :data-categoryName="p3.categoryName"
                                                        :data-category3Id="p3.categoryId">
                                                        {{ p3.categoryName }}
                                                    </a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle.js'
export default {
    name: 'TypeNav',
    data() {
        return {
            index: 0,
            show: true
        }
    },
    mounted() {

        if (/\bsearch\b/.test(this.$route.path)) {
            this.show = false
        }
        if (/\bdetail\b/.test(this.$route.path)) {
            this.show = false
        }
    },
    computed: {
        //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        //注入一个参数state，其实即为大仓库中的数据
        ...mapState({ categoryList: state => state.home.categoryList })
    },
    methods: {
        //鼠标移到某一分类上的回调
        /*  changeIndex(num) {
             this.index = num
             console.log(this.index);
         }, */

        //节流写法不能使用箭头函数，会发生this指向问题
        changeIndex: throttle(function (num) {
            this.index = num
        }, 50),

        //鼠标离开某一分类的回调
        leaveIndex() {
            this.index = 0
            //在/search路由判断是否显示商品分类
            if (/\bsearch\b/.test(this.$route.path)) {
                this.show = false
            }
            if (/\bdetail\b/.test(this.$route.path)) {
                this.show = false
            }


        },
        changeShow() {
            //在/search路由判断是否显示商品分类
            if (/\bsearch\b/.test(this.$route.path)) {
                this.show = true
            }
            if (/\bdetail\b/.test(this.$route.path)) {
                this.show = true
            }
        },
        //进行路由跳转的方法
        goSearch(e) {
            sessionStorage.setItem('pageNo', 1)
            //获取自定义属性的值
            let { categoryname, category1id, category2id, category3id } = e.target.dataset
            //判断是一级，二级还是三级目录
            if (categoryname) {
                let localtion = { name: 'search' }
                let query = { categoryName: categoryname }
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                localtion.query = query
                //判断跳转之前是否有params参数，有也带过去
                if (this.$route.params) {
                    localtion.params = this.$route.params
                    this.$router.push(localtion)
                } else {
                    this.$router.push(localtion)
                }
            }
            //this.$router.push('/search')
        }
    },
}
</script>
<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        //display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /*   &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }

                .cur {
                    background-color: skyblue
                }

                //用样式添加背景色
                /*       .item:hover{
                    background-color:skyblue
                } */
            }
        }

        .sort-enter {
            height: 0;
        }

        .sort-enter-to {
            height: 461px;
        }

        .sort-enter-active {
            transition: all .3s linear;
        }
    }
}
</style>

