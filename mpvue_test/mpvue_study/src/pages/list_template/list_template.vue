<template>
  <div @tap="toDetail" class="tmpContainer">
    <div class="avatar_date">
      <img :src="'/static'+item.avatar" alt="">
      <span>{{item.date}}</span>
    </div>
    <p class="company">{{item.title}}</p>
    <img class="detail_img" :src="'/static'+item.detail_img" alt="">
    <p class="content">{{item.detail_content}}</p>
    <div class="view_star_container">
      <img src="/static/images/icon/star.png" alt="">
      <span>{{item.love_count}}</span>
      <img src="/static/images/icon/view.png" alt="">
      <span>{{item.attention_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list_template",
    props: [
      'item',
      'index'
    ],
    methods: {
      toDetail() {
        // 跳转到详情页
        wx.navigateTo({
          url: '/pages/detail/main?index' + this.index
        })
      }
    }
  }
</script>

<style scoped>
  .tmpContainer {
    display: flex;
    flex-direction: column;
    border-bottom: 1rpx solid #eee;
  }
  .avatar_date {
    padding: 10rpx;
  }
  .avatar_date img {
    width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
    vertical-align: middle;
  }
  .avatar_date span {
    font-size: 28rpx;
    color: #333;
  }
  .company {
    font-size: 40rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .detail_img {
    width: 100%;
    height: 460rpx;
  }
  .content {
    font-size: 32rpx;
    text-indent: 32rpx;
    line-height: 50rpx;
    letter-spacing: 3rpx;
  }
  .view_star_container img {
    width: 32rpx;
    height: 32rpx;
    vertical-align: middle;
    margin-left: 10rpx;
  }
  .view_star_container span {
    font-size: 22rpx;
    color: #333;
  }
</style>
