<template>
  <li class="food-item bottom-border-1px">
    <div class="icon">
      <img width="57" height="57" class='icon' :src="food.icon">
    </div>
    <div class="content">
      <h2 class="name">{{food.name}}</h2>
      <p class="desc">{{food.description}}</p>
      <div class="extra">
        <span class="count">月售 {{food.sellCount}} 份</span>
        <span>好评率 {{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="now">￥{{food.price}}</span>
        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <transition name="fade">
          <div class="iconfont icon-remove_circle_outline" v-if="count > 0" @click="updateCount(false)"></div>
        </transition>
        <transition name="fade">
          <div class="cart-count" v-if="count > 0">{{count}}</div>
        </transition>
        <div class="iconfont icon-add_circle" @click="updateCount(true)"></div>
      </div>
    </div>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: "FoodItem",
    props: {
      food: Object,
      count: Number
    },
    methods: {
      ...mapActions(['updateFoodCount']),
      updateCount(isAdd) {
        this.updateFoodCount({ food: this.food.name, isAdd })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
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
          position: relative;
          &.fade-enter-active, &.fade-leave-active {
            transition: left .3s;
          }
          &.fade-enter-to, &.fade-leave {
            left: 0;
          }
          &.fade-enter, &.fade-leave-to {
            left: 47px;
          }
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
          position: relative;
          &.fade-enter-active, &.fade-leave-active {
            transition: left .3s;
          }
          &.fade-enter-to, &.fade-leave {
            left: 0;
          }
          &.fade-enter, &.fade-leave-to {
            left: 25px;
          }
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
</style>
