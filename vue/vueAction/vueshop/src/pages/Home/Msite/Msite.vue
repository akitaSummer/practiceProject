<template>
  <div>
    <header class="header">
      <span class="header-search"><i class="iconfont icon-sousuo"></i></span>
      <span class="header-title">昌平区北七家宏福科技园(337
省道北)</span>
      <span class="header-login">登录|注册</span>
    </header>
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <swiper :options="swiperOption" class="swiper-wrapper">
          <swiper-slide class="swiper-silde" v-for="(links, i) in linkToFood"  :key="'links' + i">
            <div class="link_to_food" v-for="(link, j) in links" :key="link + j">
              <img :src="link.src" alt="">
              <span>{{link.title}}</span>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </nav>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "Msite",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          slidesPerView: 1,
        },
        linkToFood: [
          [{ src: process.env.BASE_URL + 'images/nav/1.jpg', title: '甜品饮品'}, { src: process.env.BASE_URL + 'images/nav/2.jpg', title: '超市便利'}, { src: process.env.BASE_URL + 'images/nav/3.jpg', title: '美食'}, { src: process.env.BASE_URL + 'images/nav/4.jpg', title: '简餐'}, { src: process.env.BASE_URL + 'images/nav/5.jpg', title: '新店特惠'}, { src: process.env.BASE_URL + 'images/nav/6.jpg', title: '准时达'}, { src: process.env.BASE_URL + 'images/nav/7.jpg', title: '预定早餐'}, { src: process.env.BASE_URL + 'images/nav/8.jpg', title: '土豪推荐'}],
          [{ src: process.env.BASE_URL + 'images/nav/9.jpg', title: '甜品饮品'}, { src: process.env.BASE_URL + 'images/nav/10.jpg', title: '超市便利'}, { src: process.env.BASE_URL + 'images/nav/11.jpg', title: '美食'}, { src: process.env.BASE_URL + 'images/nav/12.jpg', title: '简餐'}, { src: process.env.BASE_URL + 'images/nav/13.jpg', title: '新店特惠'}, { src: process.env.BASE_URL + 'images/nav/14.jpg', title: '准时达'}, { src: process.env.BASE_URL + 'images/nav/1.jpg', title: '预定早餐'}, { src: process.env.BASE_URL + 'images/nav/2.jpg', title: '土豪推荐'}]
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../common/scss/mixins";
  .header {
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 45px;
    background: #02a774;
    .header-search {
      margin-left: 15px;
      i {
        font-size: 25px;
        color: #fff;
      }
    }
    .header-title {
      margin: 0 20px;
      font-size: 20px;
      color: #fff;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-login {
      margin-right: 15px;
      font-size: 14px;
      color: #fff;
    }
  }

  .msite_nav {
    @include bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-silde {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        .link_to_food {
          width: 25%;
          text-align: center;
          padding-bottom: 10px;
          img {
            width: 50px;
            height: 50px;
            display: inline-block;
          }
          span {
            display: block;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }
  }
</style>
