// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'akita Summer',
    userInfo: {},
    isShow: true,
  },

  handleClick() {
    // 点击跳转到list页面
    wx.redirectTo({
      url: '/pages/list/list',
    })
  },

  handleGetUserInfo(data) {
    if (data.detail.rawData) {
      // 用户点击的是允许
      this.getUserInfo()
    }
  },
  getUserInfo() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 用户已授权
          this.setData({
            isShow: false
          })
        } else {
          // 用户未授权
          this.setData({
            isShow: true
          })
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        // 更新data中的形参
        this.setData({
          userInfo: data.userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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