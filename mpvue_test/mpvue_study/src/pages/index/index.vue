<template>
  <div class="indexContainer">
    <img v-if="isShow" class="index_img" :src="userInfo.avatarUrl" alt="">
    <Button class="btn" v-else open-type="getUserInfo" @getuserinfo="getUserInfo"></Button>
    <p class="userName">hello {{userInfo.nickName}}</p>
    <div @tap="toDetail" class="goStudy">
      <p>开启小程序之旅</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        userInfo: {},
        isShow: false
      }
    },
    beforeMount() {
      this.handleGetUserInfo()
    },
    methods: {
      handleGetUserInfo() {
        wx.getUserInfo({
          success: (data) => {
            this.userInfo = data.userInfo
            this.isShow = true
          }
        })
      },
      toDetail() {
        wx.switchTab({
          url: "/pages/list/main"
        })
      }
    }
  }
</script>

<style>
  page {
    background: #8ED145;
    height: 100%;
  }
  .indexContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .index_img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 100rpx 0;
  }
  .userName {
    font-size: 40rpx;
    font-weight: bold;
    margin: 100rpx 0;
  }
  .goStudy {
    width: 220rpx;
    height: 80rpx;
    border: 1rpx solid #eee;
    font-size: 24rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 10rpx;
  }
  .btn {
    width: 300rpx;
    heigth: 300rpx;
    border-radius: 150rpx;
    margin: 100rpx 0;
  }
</style>
