// pages/addman/index.js
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
  name:function(e){
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },
  id_num: function (e) {
    this.setData({
      id_num: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  btnsubmit: function (e) {
    if(!this.data.name){
      wx.showToast({
        title: '请填写姓名',
        icon:'none'
      })
      return
    }
    if (!this.data.id_num) {
      wx.showToast({
        title: '请填写身份证',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url1 = app.globalData.url + '/index/getId';
    var url = app.globalData.url + '/user/addOut';
    var data1={
      name: this.data.name,
      id_num: this.data.id_num,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      if (res.code == 1) {
        var data = {
          user_id: app.globalData.user_id,
          name: that.data.name,
          id_num: that.data.id_num,
          mobile: that.data.mobile,
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          if (res.code == 1) {
            wx.showToast({
              title: res.msg,
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
                success: function () {

                }
              }, 800)
            })

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