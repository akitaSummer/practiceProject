<template>
  <div class="detailContainer">
    <img class="detail_img" :src="isMusicPlay?`/static/${detailObj.music.coverImgUrl}`:`/static/${detailObj.detail_img}`" alt="">
    <img @tap="handleMusicPlay" class="music_img" :src="isMusicPlay? '/static/images/music/music-start.png' : '/static/images/music/music-stop.png'" alt="">
    <div class="avatar_date">
      <img :src="'/static'+detailObj.avatar" alt="">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
    <p class="company">{{detailObj.title}}</p>
    <div class="collection_share_container">
      <div class="collection_share">
        <img @tap="handleCollection" :src='isCollected?"/static/image/icon/collection.png":"/static/image/icon/collection-anti.png"' alt="">
        <img @tap="handleShare" src='/static/image/icon/share-anti.png' alt="">
      </div>
      <div class="line"></div>
    </div>
    <Button open-type="share">转发此文章</Button>
    <p class="content">{{detailObj.detail_content}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import isPlayObj from '../../datas/isPlay'
  export default {
    name: "detail",
    // onLoad(option) {
    //   console.log(option)
    // },
    data() {
      return {
        detailObj: {},
        isCollected: false, // 标识文章是否被收藏
        isMusicPlay: false,
      }
    },
    beforeMount() {
      // 使用this.$mp.query.index取代onLoad中的options.index
      this.index = this.$mp.query.index
      // 预处理本地是否收藏的缓存
      let oldStorage = wx.getStorageSync('isCollected')
      if (!oldStorage) {
        wx.setStorage({
          key: 'isCollected',
          data: {}
        })
      } else {
        this.isCollected = oldStorage[this.index]? true : false
      }
      // 判断当前页加载时音乐是否在播放
      isPlayObj.pageIndex === this.index && isPlayObj.isPlay ? this.isMusicPlay = true:this.isMusicPlay = false
      // 监听音乐播放和暂停
      wx.onBackgroundAudioPlay(() => {
        this.isMusicPlay = true
        isPlayObj.pageIndex = this.index
        isPlayObj.isPlay = true
      })
      wx.onBackgroundAudioPausse(() => {
        this.isMusicPlay = false
        isPlayObj.isPlay = false
      })
    },
    mounted() {
      this.detailObj = this.listTmp[this.index]
    },
    computed: {
      ...mapState(['listTmp'])
    },
    methods: {
      handleCollection() {
        const isCollected = !this.isCollected
        this.isCollected = isCollected
        const title = isCollected? '收藏成功' : '取消收藏'
        wx.showToast({
          title,
          isCollected
        })
        // 赌球之前缓存状态
        let oldStorage = wx.getStorageSync('isCollected')
        oldStorage[this.index] = isCollected
        // 将本次缓存状态储存
        wx.getStorage(
          {
            key: 'isCollect',
            data: isCollected
          }
        )
      },
      handleMusicPlay() {
        // 处理音乐播放
        const isMusicPlay = !this.isMusicPlay
        this.isMusicPlay = isMusicPlay
        const {dataUrl, title} = this.detailObj.music
        if (isMusicPlay) {
          wx.playBackgroundAudio({
            dataUrl,
            title
          })
        } else {
          wx.pauseBackgroundAudio({})
        }
      },
      handleShare() {
        wx.showActionSheet({
          itemList: [
            '分享到朋友圈', '分享到好友'
          ]
        })
      }
    }
  }
</script>

<style scoped>
  .detailContainer{
    display: flex;
    flex-direction: column;
  }
  .detail_img{
    width: 100%;
    height: 460rpx;
  }
  .avatar_date {
    padding: 10rpx;
  }
  .avatar_date img{
    width: 64rpx;
    height: 64rpx;
    vertical-align: middle;
  }
  .avatar_date span {
    font-weight: 28rpx;
    margin-left: 6rpx;
  }
  .company {
    font-size: 32rpx;
    font-weight: bold;
    padding: 10rpx;
  }
  .collection_share_container {
    position: relative;
  }
  .collection_share img {
    float: right;
    width: 90rpx;
    height:90rpx
  }
  .line {
    position: absolute;
    top: 45rpx;
    left: 5%;
    width: 90%;
    height: 1rpx;
    background: #eee;
    z-index: -1;
  }
  .content {
    font-size: 32rpx;
    text-indent: 32rpx;
    letter-spacing: 3rpx;
    line-height: 50rpx;
  }
  .music_img {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: 200rpx;
    left: 50%;
    margin-left: -30rpx;
  }
</style>
