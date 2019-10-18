// pages/detail/detail.js
const datas = require('../../datas/list-data.js')
const appDatas = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false,
  },

  // 添加/取消收藏
  handleCollection() {
    let isCollected = !this.data.isCollected
    // 更新状态
    this.setData({
      isCollected
    })
    // 提示用户
    let title = isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success'
    })
    // 缓存数据到本地
    let {index} = this.data
    let obj = wx.getStorage({
      key: 'isCollected',
      success: function(res) {
        let obj = res.data
        if (typeof obj === 'string') {
          obj = {}
        }
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('成功')
          }
        })
      },
      fail: function(res) {
        console.log(失败)
      },
      complete: function(res) {},
    })
  },

  // 处理音乐播放
  handleMusicPlay() {
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })
    // 控制音乐播放
    if (isMusicPlay) {
      // 播放音乐
      let {dataUrl, title} = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      // 暂停音乐
      wx.pauseBackgroundAudio()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数值
    const index = options.index
    // 根据本地缓存数据判断用户是否收藏当前文章
    const detailStorage = wx.getStorageSync('isCollected')
    const isCollected = detailStorage[index] ? true : false
    // 判断音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusicPlay: true
      })
    }
    // 监听音乐播放
    wx.onBackgroundAudioPlay(() => {
      // 修改isMusicplay状态值
      this.setData({
        isMusicPlay: true
      })
      //修改appDatas中的数据
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    })
    // 监听音乐暂停
    wx.onBackgroundAudioPause(() => {
        // 修改isMusicplay状态值
        this.setData({
          isMusicPlay: false
        })
        // 修改appDatas中的数据
      appDatas.data.isPlay = false
      appDatas.data.pageIndex = null
      }
    )
    // 更新deata中detailObj的状态
    this.setData({
      detailObj: datas.list_data[index],
      index,
      isCollected
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})