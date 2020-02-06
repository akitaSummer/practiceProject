<template>
  <div class="shop-header">
    <nav class="shop-nav">
      <router-link to="/home/msite" class="back">
        <i class="iconfont icon-arrow_left"></i>
      </router-link>
    </nav>
    <div class="shop-content">
      <img src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" class="content-image">
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">大鸭梨</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">5</span>
          <span class="shop-message-detail">月售100单</span>
          <span class="shop-message-detail">
            硅谷专送
            <span>约30分钟</span>
          </span>
          <span class="shop-message-detail">距离1000m</span>
        </div>
      </div>
    </div>
    <div class="shop-header-discounts">
      <div class="discounts-left">
        <div class="activity activeity-green">
          <span class="content-tag">
            <span class="mini-tag">首单</span>
          </span>
          <span class="activity-content ellipsis">新用户下单立减17元</span>
        </div>
      </div>
      <div class="discounts-right">
        4个优惠
      </div>
    </div>

    <div class="shop-brief-modal">
      <div class="biref-modal-content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopHeader"
  }
</script>

<style lang="scss">
  .shop-header {
    height: 100%;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    color: #fff;
    .shop-nav {
      background-image: url("https://fuss10.elemecdn.com/f/5c/ead54394c3de198d3e6d3e9111bbfpng.png");
      background-size: cover;
      background-repeat: no-repeat;
      height: 40px;
      padding: 5px 10px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(199, 103, 137, .43)
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_left {
          display: block;
          padding: 5px;
          font-size: 20px;
          color: #fff;
        }
      }
    }

    .shop-content {
      padding: 30px 20px 4px 20px;
      position: relative;
      display: flex;
      text-align: center;
      background: #fff;
      img {
        box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, 0.2);
        position: absolute;
        top: -40px;
        left: calc(50% - 33px);
        width: 66px;
        height: 66px;
        border-radius: 2px;
      }
      .header-content {
        flex: 1;
        width: 72%;
        .content-title {
          font-size: 20px;
          line-height: 24px;
          font-weight: 700;
          white-space: nowrap;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          .content-tag {
            border-radius: 2px;
            background-image: linear-gradient(90deg, #fff100, #ffe339);
            width: 35px;
            height: 18px;
            margin-right: 10px;
            color: #6a3709;
            font-style: normal;
            font-weight: 700;
            position: relative;
            .mini-tag {
              position: absolute;
              left: 0;
              top: 0;
              right: -100%;
              bottom: -100%;
              font-size: 24px;
              font-width: 600;
              transform: scale(.5);
              transform-origin: 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .content-name {
            font-weight: 700;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .content-icon {
            width: 20px;
            position: relative;
            height: 16px;
            &::after {
              content: "";
              border-style: solid;
              border-width: 6px 0 6px 7px;
              border-color: transparent transparent transparent rgba(0, 0, 0, .67);
              position: absolute;
              left: 8px;
              top: 3px;
            }
          }
        }
        .shop-message {
          white-space: nowrap;
          height: 12px;
          margin-top: 8px;
          font-size: 11px;
          color: #333;
          .shop-message-detail:not(:last-child)::after {
            content: '\B7';
            opacity: .2;
          }
        }
        .shop-notice {
          width: 63%;
          font-size: 11px;
          font-weight: 300;
          color: #999;
          text-overflow: ellipsis;
          margin: 8px auto 10px;
          white-space: nowrap;
          overflow: hidden;
        }

      }

    }
    .shop-header-discounts {
      display: flex;
      background: #fff;
      border-radius: 1px;
      border: 1px solid #eee;
      padding: 5px 7px;
      font-size: 11px;
      color: #666;
      margin: 0 30px;
      align-items: center;
      .discounts-left {
        flex: 1;
        overflow: hidden;
        .activity {
          display: flex;
          align-items: center;
          .content-tag {
            border-radius: 1px;
            width: 25px;
            height: 13px;
            margin-right: 5px;
            color: #fff;
            font-style: normal;
            font-weight: 700;
            position: relative;
            background-color: rgb(112, 188, 70);
            .mini-tag {
              position: absolute;
              left: 0;
              top: 0;
              right: -100%;
              bottom: -100%;
              font-size: 18px;
              font-width: 600;
              transform: scale(.5);
              transform-origin: 0 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .discounts-right {
        width: 50px;
        flex-shrink: 0;
        position: relative;
        padding-right: 10px;
        text-align: right;
        &::after {
          content: '';
          display: block;
          border-style: solid;
          border-width: 4px 4px 0;
          border-color: rgba(0, 0, 0, .57) transparent transparent;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
        }
      }
    }
  }
</style>
