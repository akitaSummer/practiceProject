<template>
      <div class="goods">
        <div class="menu-warpper" id="menuWrapper">
          <ul>
            <li class="menu-item" :class="nowTip === i ? 'current' : ''" v-for="(good, i) in goods" :key="'good-menu' + i" @click="clickMenuItem(i)">
              <span class="text bottom-border-1px">
                <img class="icon" :src="good.icon" v-if="good.icon">
                {{good.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" id="foodsWrapper">
          <ul>
            <li class="food-list-hook" v-for="(good, i) in goods" :key="'good-food' + i" :ref="'good-food' + i">
              <h1 class="title">{{good.name}}</h1>
              <ul>
                  <FoodItem v-for="(food, i) in good.foods" :key="'goodFoods' + i" :food="food" :count="shopCart[food.name] === undefined ? 0 : shopCart[food.name].count"></FoodItem>
              </ul>
            </li>
          </ul>
        </div>
        <ShopCart></ShopCart>
      </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import BScroll from 'better-scroll'
  import FoodItem from "@/components/FoodItem/FoodItem";
  import ShopCart from "@/components/ShopCart/ShopCart";
  export default {
    name: "ShopGoods",
    components: {
      FoodItem,
      ShopCart
    },
    data() {
      return {
        tops: [],
        scrollY: 0,
        nowTip: 0
      }
    },
    computed: {
      ...mapState(['goods', 'shopCart'])
    },
    methods: {
      ...mapActions(['getShopGoods']),
      clickMenuItem (index) {
        const top = this.tops[index]
        this.scrollY = top
        this.goodsScroll.scrollTo(0, -top, 300)
      }
    },
    mounted() {
      this.getShopGoods()
    },
    watch: {
      goods() {
        if (this.goods.length > 0) {
          if (!this.goodsScroll) {
            this.goodsScroll = new BScroll('#foodsWrapper', {
              click: true
            })
          } else {
            this.goodsScroll.refresh()
          }

          if (!this.menuScroll) {
            this.menuScroll = new BScroll('#menuWrapper', {
              click: true
            })
          } else {
            this.goodsScroll.refresh()
          }

          this.$nextTick(() => {
            if (!this.tops.length > 0) {
              for (let list in this.$refs) {
                if (this.$refs.hasOwnProperty(list)) {
                  this.tops.push(this.$refs[list][0].offsetTop)
                }
              }
              this.goodsScroll.on('scrollEnd',(pos) => {
                this.scrollY = Math.abs(pos.y)
                for (let i = 1; i < this.tops.length; i++) {
                  if (this.tops[i] > this.scrollY) {
                    this.nowTip = i - 1
                    break
                  }
                }
              })
            }
          })
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../common/scss/mixins";
  .bottom-border-1px {
    @include bottom-border-1px(rgba(7, 17, 27, 0.1));
  }
  .goods {
    display: flex;
    position: absolute;
    left: 0;
    top: 195px;
    right: 0;
    bottom: 46px;
    overflow: hidden;
    .menu-warpper {
      background: #f3f5f7;
      width: 80px;
      .menu-item {
        height: 54px;
        display: block;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          margin-right: 2px;
        }
        .text {
          display: block;
          width: 56px;
          font-size: 12px;
        }
        &.current {
          color: $green;
          background: #fff;
          font-weight: 700;
          margin-top: -1px;
        }
      }
    }

    .foods-wrapper {
      width: 100%;
      .food-list-hook {
        .title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          color: rgb(147, 153, 159);
          background: #f3f5f7;
          font-size: 12px;
        }
        .food-item {
          @include bottom-border-1px(rgba(7, 17, 27, 0.1));
          position: relative;
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          &:last-child {
           border: none;
            margin-bottom: 0;
          }
          .icon {
            margin-right: 10px;
          }
          .content {
            flex: 1;
            .name {
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }
            .desc, .extra {
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .desc {
              line-height: 12px;
              margin-bottom: 8px;
            }
            .extra {
              .count {
                margin-right: 12px;
              }
            }
            .price {
              font-weight: 700;
              line-height: 24px;
              .now {
                margin-right: 8px;
                font-size: 14px;
                color: rgb(240, 20, 20);
              }
              .old {
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159)
              }
            }
            .cartcontrol-wrapper {
              position: absolute;
              right: 0;
              bottom: 12px;
              .cart-decrease {
                display: inline-block;
                padding: 6px;
                line-height: 24px;
                font-size: 24px;
                color: rgb(0, 160, 220)
              }
              .icon-remove_circle_outline {
                display: inline-block;
                padding: 6px;
                line-height: 24px;
                font-size: 24px;
                color: $green;
              }
              .cart-count {
                display: inline-block;
                vertical-align: top;
                width: 12px;
                padding-top: 6px;
                line-height: 24px;
                text-align: center;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
              .icon-add_circle {
                display: inline-block;
                padding: 6px;
                line-height: 24px;
                font-size: 24px;
                color: $green;
              }
            }
          }
        }
      }
    }
  }
</style>
