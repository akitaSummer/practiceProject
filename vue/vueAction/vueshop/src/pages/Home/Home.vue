<template>
  <div>
    <router-view></router-view>
    <div class="footer_guide border-1px">
      <router-link :to="{ name: 'msite' }" class="guide-item" :class="{ on: on('/home/msite')}">
        <span class="guide-icon">
          <i class="iconfont icon-waimai"></i>
        </span>
        <span class="guide-icon">
          外卖
        </span>
      </router-link>
      <router-link :to="{ name: 'search' }" class="guide-item" :class="{ on: on('/home/search')}">
        <span class="guide-icon">
          <i class="iconfont icon-search"></i>
        </span>
        <span>
          搜索
        </span>
      </router-link>
      <router-link :to="{ name: 'order' }" class="guide-item" :class="{ on: on('/home/order')}">
        <span class="guide-icon">
          <i class="iconfont icon-dingdan"></i>
        </span>
        <span>
          订单
        </span>
      </router-link>
      <router-link :to="{ name: 'profile' }" class="guide-item" :class="{ on: on('/home/profile')}">
        <span class="guide-icon">
          <i class="iconfont icon-geren"></i>
        </span>
        <span>
          我的
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      on(path) {
        return this.$route.path === path
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
  .footer_guide {
    @include top-border-1px(#e4e4e4);
    position: fixed;
    bottom: 1px;
    left: 0;
    background: #fff;
    width: 100%;
    height: 50px;
    display: flex;
    .guide-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      margin: 5px;
      color: #999;
      &.on {
        color: #02a774;
      }
      span {
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
        iconfont{
          font-size: 22px
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
</style>
