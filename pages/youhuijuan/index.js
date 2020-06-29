// pages/youhuijuan/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  allyouhj:function(e){
    wx.navigateTo({
      url: '../allgdyhj/index',
    })
  },
  listcont:function(e){
    // wx.navigateTo({
    //   url: '../yhjzs/index?id=' + e.currentTarget.dataset.id,
    // })
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
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.url + '/user/myAllCoupan';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        if (res.data.length<1){
          wx.showToast({
            title: '暂无数据',
            icon:'none'
          })
        }
        that.setData({
          goshop_index: res.data,
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
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
  onShareAppMessage: function (e) {
    console.log(e)
    var that = this;
    return {
      title: '送你一张创忆馆优惠劵，点击领取',
      // tit: `${userInfo.nickname}推荐给你一本适合${item.book.maxAgeReadPercent[0]}岁的好书`
      // pages/index/index
      // pages/order/zenpin/index
      // path: 'pages/kanjia/index?bargainId=' + that.data.bargainId + '&inviter_uid=' + that.data.inviter_uid 
      path: 'pages/yhjzs/index?id=' + e.target.dataset.id + '&pid=' + 1
    };
  }
})