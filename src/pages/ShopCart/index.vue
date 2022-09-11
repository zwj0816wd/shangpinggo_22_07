<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1"
              @change="updateChecked(cart.skuId, cart.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle($event, cart.skuId, -1)">-</a>
            <input autocomplete="off" type="text" :ref="cart.skuId" :value="cart.skuNum" minnum="1" class="itxt"
              @change="handle($event, cart.skuId, cart)">
            <a href="javascript:void(0)" class="plus" @click="handle($event, cart.skuId, +1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delectCartListBySkuId(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCkeckedAll && cartList.length > 0"
          @change="updateAllCartChecked($event.target.checked)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ summoney }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ShopCart',
  data() {
    return {
      //设置节流变量
      flag: true
    }
  },
  mounted() {
    this.getData()

  },
  methods: {
    async getData() {
      let result = await this.$store.dispatch('getCartList')
      return result
    },
    //修改商品数量的回调
    async handle($event, skuId, numOrObj) {
      //对函数进行节流，只有当页面刷新后才能点击
      let num = 0
      if (!this.flag) return
      this.flag = false
      //判断第三个参数时数字还是对象，来区分点的时+，-还是直接在input框输入
      if (typeof numOrObj == 'number') {
        //当点击减号时判断原来的值是否小于等于1，实则不改变
        if (this.$refs[skuId][0]._value * 1 <= 1 && numOrObj == -1) return this.flag = true
        num = numOrObj
      } else {
        //将只带数字的再字符串转化为数字
        let value = $event.target.value * 1
        //判断用户输入的值，不合法，值不变
        if (isNaN(value) || value < 1) {
          num = 0
        } else {
          //判断输入小数时向下取整
          num = parseInt(value) - numOrObj.skuNum
        }
      }
      let result1 = await this.$store.dispatch('addOrUpdateShopCart', { skuId: skuId, skuNum: num })
      //只有发请求成功和再获取新数据
      let result2 = await this.getData()
      if (result1 == 200 && result2 == 200) {
        this.flag = true
      }
      //value.skuNum = e.target.value * 1
      //console.log(e.target.value * 1);
      /* await this.$store.dispatch('addOrUpdateShopCart', { skuId: skuId, skuNum: value })
      this.getData() */
    },
    //删除商品的回调
    async delectCartListBySkuId(skuId) {
      try {
        //如果删除成功重新获取数据刷新界面
        await this.$store.dispatch('delectCartListBySkuId', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    },
    //改变商品的勾选状态
    async updateChecked(skuId, isChecked) {
      try {

        let result = await this.$store.dispatch('updateCartCheckedById', { skuId: skuId, isChecked: isChecked == 1 ? '0' : '1' })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //删除所有勾选的商品的回调
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (error) {
        console.log(error.message);
      }

    },
    //改变所有商品的勾选状态
    async updateAllCartChecked(isChecked) {
      try {
        await this.$store.dispatch('updateAllCartChecked', isChecked ? '1' : '0')
        this.getData()
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  computed: {
    ...mapState({ cartList: state => state.shopCart.cartList || [] }),
    //计算商品总价
    summoney() {
      let sum = 0
      this.cartList.forEach(e => {
        if (e.isChecked == 1) {
          sum += e.skuPrice * e.skuNum
        }
      });
      return sum

      /*    set(a, b) {
           let sum = 0
           this.cartList.forEach(e => {
             if (e.isChecked == 1) {
               sum += e.skuPrice * e.skuNum
             }
           });
           this.summoney = sum
         } */
    },
    //判断复选框是否勾选
    isCkeckedAll() {
      return this.cartList.every(e => e.isChecked == 1)
    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>