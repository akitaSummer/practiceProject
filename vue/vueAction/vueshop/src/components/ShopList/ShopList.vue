<template>
  <div>
    <ul class="shop-list" v-if="shopList.length > 0">
      <li class="shop-li border-1px" v-for="(shop, i) in shopList" :key="'shop' + i">
        <div class="shop-left">
          <img src="../../../public/images/shop/1.jpg" alt="" class="shop-img">
        </div>
        <div class="shop-main">
          <h4 class="shop-title">{{shop.name}}</h4>
          <section class="shop-rating-order">
            <Star :size="24" :rating="shop.rating" :shop-key="'shop' + i"></Star>
            <div class="rating-section">{{shop.rating}}</div>
            <div class="order-section">月售{{shop.recent_order_num}}单</div>
          </section>
          <div class="shop-delivery-msg">
            <span>￥{{shop.float_minimum_order_amount}}起送</span>
            <span class="segmentation">/</span>
            <span>{{shop.piecewise_agent_fee.tips}}</span>
          </div>
        </div>
        <div class="shop-right">
          <ul class="shop-detail-ul">
            <li class="supports" v-for="(support, i) in shop.supports" :key="'support' + i">{{support.icon_name}}</li>
          </ul>
          <section class="shop-rating-order-right">
            <span class="delivery-style delivery-left">硅谷转送</span>
            <span class="delivery-style delivery-right">准时达</span>
          </section>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in 10" :key="item + 'shopListElse'">
        <img src="../../../public/images/shop_back.svg">
      </li>
    </ul>
  </div>

</template>

<script>
  import Star from "@/components/Star/Star";
  export default {
    name: "ShopList",
    props: {
      shopList: {
        type: Array,
        default:() => []
      }
    },
    components: {
      Star
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/mixins";
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
                  @include bg-image("../../../public/images/stars/star24_on");
                }
                &.half {
                  @include bg-image("../../../public/images/stars/star24_half");
                }
                &.off {
                  @include bg-image("../../../public/images/stars/star24_off");
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
</style>
