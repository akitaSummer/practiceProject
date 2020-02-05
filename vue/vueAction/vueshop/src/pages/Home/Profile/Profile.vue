<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>
    <section class="profile-number">
      <router-link :to="{ name: 'login' }" class="profile-number-contains">
        <div class="profile-image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">{{userInfo._id || "登录/注册"}}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            <span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile-info-data border-1px">
      <ul class="info-data-list">
        <li class="info-data-link">
          <span class="info-data-top"><span>0.00</span></span>
          <span class="info-data-bottom">我的余额</span>
        </li>
        <li class="info-data-link">
          <span class="info-data-top"><span>0</span>个</span>
          <span class="info-data-bottom">我的优惠</span>
        </li>
        <li class="info-data-link">
          <span class="info-data-top"><span>0</span>分</span>
          <span class="info-data-bottom">我的积分</span>
        </li>
      </ul>
    </section>
    <section class="profile-my-order border-1px">
      <ul class="order-list">
        <li class="my-order">
          <span>
            <i class="iconfont icon-order-s"></i>
          </span>
          <div class="my-order-div">
            <span>我的订单</span>
            <span class="my-order-icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </li>
        <li class="my-order">
          <span>
            <i class="iconfont icon-jifen"></i>
          </span>
          <div class="my-order-div">
            <span>积分商城</span>
            <span class="my-order-icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </li>
        <li class="my-order">
          <span>
            <i class="iconfont icon-vip"></i>
          </span>
          <div class="my-order-div">
            <span>硅谷外卖会员卡</span>
            <span class="my-order-icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </li>
      </ul>
    </section>
    <section class="profile-my-order border-1px">
      <ul class="order-list">
        <li class="my-order">
          <span>
            <i class="iconfont icon-fuwu"></i>
          </span>
          <div class="my-order-div">
            <span>服务中心</span>
            <span class="my-order-icon">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </div>
        </li>
      </ul>
    </section>
    <section class="profile-my-order border-1px" v-if="userInfo._id">
      <mt-button class="logout" type="danger" @click="logoutButton">退出登陆</mt-button>
    </section>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import HeaderTop from "@/components/HeaderTop/HeaderTop"
  import { MessageBox } from 'mint-ui'
  export default {
    name: "Profile",
    components: {
      HeaderTop
    },
    data() {
      return {
        title: '订单列表'
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['logout']),
      logoutButton() {
        MessageBox.confirm('确定退出登陆吗').then(() => {
          this.logout()
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../common/scss/mixins";
  .profile-number {
    @include top-border-1px(#fff);
    margin-top: 45.5px;
    width: 100%;
    background: #02a774;
    padding: 20px 10px;
    box-sizing: border-box;
    .profile-number-contains {
      width: 100%;
      display: flex;
      height: 60px;
      .profile-image {
        width: 60px;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        .icon-person {
          font-size: 62px;
          background-color: #e4e4e4;
        }
      }
      .user-info {
        flex: 1;
        margin-top: 8px;
        margin-left: 15px;
        p {
          font-weight: 700;
          font-size: 18px;
        }
        .user-icon-top {
          padding-bottom: 8px;
        }
        .user-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 0 10px 0 -15px;
          .icon-mobile {
            font-size: 30px;
            vertical-align: text-top;
          }
        }
        .icon-mobile-number {
          font-size: 14px;
          color: #fff;
        }
      }
      .arrow {
        width: 12px;
        height: 12px;
        position: relative;
        top: calc(50% - 6px);
        .icon-jiantou1 {
          color: #fff;
          font-size: 5px;
        }
      }
    }
  }

  .profile-info-data {
    @include bottom-border-1px(#e4e4e4);
    width: 100%;
    background: #fff;
    overflow: hidden;
    .info-data-list {
      display: flex;
      .info-data-link {
        flex: 1;
        text-align: center;
        border-right: 1px solid #f1f1f1;
        .info-data-top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;
          span {
            display: inline-block;
            font-size: 30px;
            color: #f90;
            font-weight: 700;
            line-height: 30px;
          }
        }
        .info-data-bottom {
          display: inline-block;
          font-size: 14px;
          color: #666;
          font-weight: 400;
          padding-bottom: 10px;
        }
      }
      .info-data-link:nth-of-type(2) {
        .info-data-top {
          span {
            color: #ff5f3e;
          }
        }
      }
      .info-data-link:nth-of-type(3) {
        border: 0;
        .info-data-top {
          span {
            color: #6ac20b;
          }
        }
      }
    }
  }

  .profile-my-order {
    @include top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;
    .order-list {
      .my-order {
        display: flex;
        align-items: center;
        padding-left: 15px;
        > span {
          display: flex;
          align-items: center;
          width: 20px;
          height: 20px;
          > .iconfont {
            margin-left: -10px;
            font-size: 30px;
          }
          .icon-order-s {
            color: #02a774;
          }
          .icon-jifen {
            color: #ff5f3e;
          }
          .icon-vip {
            color: #f90;
          }
          .icon-fuwu {
            color: #02a774;
          }
        }
        .my-order-div {
          width: 100%;
          border-bottom: 1px solid #f1f1f1;
          padding: 18px 10px 18px 0;
          font-size: 16px;
          color: #333;
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
          }
          .my-order-icon {
            float: right;
            width: 10px;
            height: 10px;
            .icon-jiantou1 {
              color: #bbb;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>
