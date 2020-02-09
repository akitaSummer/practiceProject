<template>
  <div>
    <ShopHeader></ShopHeader>
    <ul class="tab">
      <li class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import ShopHeader from "@/components/ShopHeader/ShopHeader";
  export default {
    name: "Shop",
    components: {
      ShopHeader
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .tab {
    @include bottom-border-1px(rgba(7, 17, 27, 0.1));
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77, 85, 93);
      a {
        display: block;
        position: relative;
        &.router-link-active {
          color: #02a774;
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 1px;
            width: 35px;
            height: 2px;
            transform: translateX(-50%);
            background-color: #02a774;
          }
        }
      }
    }
  }
</style>
