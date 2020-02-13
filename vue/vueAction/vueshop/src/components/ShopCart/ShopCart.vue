<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleShow">
        <div class="logo-wrapper">
          <div class="logo highlight">
            <i class="iconfont icon-shopping_cart highlight"></i>
          </div>
          <div class="num" v-if="shopCart && Object.keys(shopCart).length">{{Object.keys(shopCart).length}}</div>
        </div>
        <div class="price highlight">￥{{total}}</div>
        <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay not-enough" :class="total > info.minPrice ? 'enough' : 'not-enough'">
          {{total > info.minPrice ? `￥${total + info.deliveryPrice}` : `还差￥${info.minPrice - total}元起送`}}
        </div>
      </div>
    </div>
    <transition name="swipe">
      <div class="shopcart-list" v-if="contentShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content" id="listContent">
          <ul>
            <li class="food" v-for="(food, i) in shopCart" :key="'foodShopCart' + i">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.count * food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <i class="iconfont icon-remove_circle_outline" @click="updateCount(food, false)"></i>
                  <div class="cart-count">{{food.count}}</div>
                  <i class="iconfont icon-add_circle" @click="updateCount(food, true)"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="list-mask" v-if="contentShow"  @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name: "ShopCart",
    data() {
      return {
        contentShow: false,
      }
    },
    computed: {
      ...mapState(['shopCart', 'info']),
      total() {
        let result = 0
        if (this.shopCart) {
          for (let food in this.shopCart) {
            if (this.shopCart.hasOwnProperty(food)) {
              result += this.shopCart[food].count * this.shopCart[food].price
            }
          }
        }
        return result
      }
    },
    methods: {
      ...mapActions(['updateFoodCount', 'clearCart']),
      updateCount(food, isAdd) {
        this.updateFoodCount({ food, isAdd })
      },
      toggleShow() {
        this.contentShow = !this.contentShow
        if (this.contentShow) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll('#listContent', {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    height: 48px;
    .content {
      z-index: 50;
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, .4);
      position: relative;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight {
              background: $green;
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #777;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 5px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 15px;
          margin-left: -45px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $green;
          transition: all .4s linear;
        }
      }
    }
    .shopcart-list {
      z-index: 49;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      transform: translateY(-100%);
      &.swipe-enter.active, &.swipe-leave-active {
        transition: transform 0.3s;
      }
      &.swipe-entre, &.swipe-leave-to {
        transform: translateY(0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        pading: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include bottom-border-1px(rgba(7, 17, 27, 0.1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
            .cartcontrol {
              display: flex;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              i {
                padding: 0 3px;
              }
            }
          }
        }
      }
    }
    .list-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      opacity: 1;
      background: rgba(7, 17, 27, 0.6);
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s;
      }
      &.fade-enter, &.fade-leave-to {
        opacity: 0;
        background: rgba(7, 17, 27, 0)
      }
    }
  }
</style>
