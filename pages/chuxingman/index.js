// pages/chuxingman/index.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deleFn:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除？',
      success: function (res) {

        if (res.cancel) {
          //点击取消
          console.log("您点击了取消")
        } else if (res.confirm) {
          //点击确定
          wx.showLoading({
            title: '删除中',
          })
          console.log("您点击了确定")
          var url = app.globalData.url + '/user/delOut';
          var data = {
            id: e.currentTarget.dataset.id,
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.onShow()


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

        }
      }
    })
  

  
  },
  bianjiFn:function(e){
    wx.navigateTo({
      url: '../bianji/index?id=' + e.currentTarget.dataset.id + '&mobile=' + e.currentTarget.dataset.mobile + '&name=' + e.currentTarget.dataset.name + '&id_num=' + e.currentTarget.dataset.id_num,
    })
  },
  addmanFn:function(e){
    wx.navigateTo({
      url: '../addman/index',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.url + '/user/getOutList';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
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
  onShareAppMessage: function () {

  }
})