<template>
  <div>
    <HeaderTop :title="address && address.data && address.data.name">
      <template v-slot:left>
        <span class="header-search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="header-login">
          登录|注册
        </span>
      </template>
    </HeaderTop>
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <swiper :options="swiperOption" class="swiper-wrapper">
          <swiper-slide class="swiper-silde" v-for="(categorys, i) in categorysArr"  :key="'categorys' + i">
            <div class="link_to_food" v-for="(category, j) in categorys" :key="'category' + j">
              <img :src=" 'https://fuss10.elemecdn.com' + category.image_url" alt="">
              <span>{{category.title}}</span>
            </div>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </nav>
    <div class="msite-shop-list border-1px">
      <div class="shop-header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop-header-title">附近商家</span>
      </div>
      <div class="shop-container">
        <ShopList :shop-list="shops && shops.data"></ShopList>
      </div>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import HeaderTop from "@/components/HeaderTop/HeaderTop";
  import { mapState, mapActions } from 'vuex'
  import ShopList from "@/components/ShopList/ShopList";
  export default {
    name: "Msite",
    components: {
      swiper,
      swiperSlide,
      HeaderTop,
      ShopList
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          slidesPerView: 1,
        },
      }
    },
    methods: {
      ...mapActions(['getAddress', 'getCategorys', 'getShops']),
    },
    computed: {
      ...mapState(['address', 'categorys', 'shops']),
      categorysArr() {
        const result = []
        if (Array.isArray(this.categorys.data)) {
          const copyArr = [...this.categorys.data]
          while(copyArr.length > 0) {
            if (copyArr.length > 8) {
              result.push(copyArr.splice(0, 8))
            } else {
              result.push(copyArr.splice(0, copyArr.length))
            }
          }
        }
        return result
      }
    },
    async created() {
      await this.getAddress()
      await this.getCategorys()
      await this.getShops()
    }
  }
</script>

<style lang="scss">
  @import "../../../common/scss/mixins";
  .header-search {
    margin-left: 15px;
    i {
      font-size: 25px;
      color: #fff;
    }
  }
  .header-login {
    margin-right: 15px;
    font-size: 14px;
    color: #fff;
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
  .msite-shop-list {
    @include top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;
    .shop-header {
      padding: 10px 10px 0 10px;
      .iconfont {
        margin-left: 5px;
        color: #999
      }
      .shop-header-title {
        line-height: 20px;
        font-size: 14px;
        color: #999;
      }
    }

    .shop-container {
      margin-bottom: 50px;
      .shop-list {
        padding: 15px 8px;
        .shop-li {
          @include bottom-border-1px(#f1f1f1);
          display: flex;
          width: 100%;
          padding: 15px 8px;
          box-sizing: border-box;
          .shop-left {
            width: 23%;
            height: 75px;
            padding-right: 10px;
            .shop-img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .shop-main {
            width: 54%;
            .shop-title {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #333;
              font-size: 16px;
              line-height: 16px;
              font-weight: 700;
              &::before {
                content: '品牌';
                display: inline-block;
                font-size: 11px;
                line-height: 11px;
                color: #333;
                background: #ffd930;
                padding: 2px 2px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }
            .shop-rating-order {
              @include clearfix();
              width: 100%;
              margin-top: 18px;
              margin-bottom: 8px;
              .star {
                float: left;
                font-size: 0;
                .star-item {
                  display: inline-block;
                  background-repeat: no-repeat;
                }
                &.star-24 {
                  .star-item {
                    width: 10px;
                    height: 10px;
                    margin-right: 3px;
                    background-size: 10px 10px;
                    &:last-child {
                      margin-right: 0
                    }
                    &.on {
                      @include bg-image("../../../../public/images/stars/star24_on");
                    }
                    &.half {
                      @include bg-image("../../../../public/images/stars/star24_half");
                    }
                    &.off {
                      @include bg-image("../../../../public/images/stars/star24_off");
                    }
                  }
                }
              }
              .rating-section {
                float: left;
                font-size: 10px;
                color: #ff6000;
                margin-left: 4px;
              }
              .order-section {
                float: left;
                font-size: 10px;
                color: #666;
                transform: scale(.8);
              }
            }
            .shop-delivery-msg {
              transform-origin: 0;
              transform: scale(.9);
              width: 200px;
              color: #666;
              .segmentation {
                color: #ccc;
              }
            }
          }
          .shop-right {
            @include clearfix();
            width: 23%;
            margin-top: 3px;
            .shop-detail-ul {
              margin-left: 2px;
              .supports {
                float: left;
                font-size: 10px;
                color: #999;
                border: 1px solid #f1f1f1;
                padding: 0 2px;
                border-radius: 2px;
              }
            }
            .shop-rating-order-right {
              float: right;
              font-size: 0;
              margin-top: 5px;
              .delivery-style {
                transform-origin: 35px 0;
                transform: scale(.7);
                display: inline-block;
                font-size: 12px;
                padding: 1px;
                border-radius: 2px;
                &.delivery-left {
                  color: #fff;
                  margin-right: -10px;
                  background-color: #02a774;
                  border: 1px solid #02a774;
                }
                &.delivery-right {
                  color: #02a774;
                  border: 1px solid #02a774;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
