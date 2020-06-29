// pages/goupiaodelit/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [{
      imgs: 'http://ticket.thid.cn/public/uploads/image/goupiao.png',
      id: 1
    }
    ],
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    tid: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      is_vip: app.globalData.is_vip,
      goods_id: options.id
    })
    wx.showLoading({
      title: '加载中.',
    })
    var url = app.globalData.url + '/index/goodsInfo';
    var data = {
      user_id: app.globalData.user_id,
      goods_id: options.id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,

        })
      } else {
        wx.showToast({
          title: '提交失败',
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
  vipFn: function (e) {
    wx.navigateTo({
      url: '../vipgogo/index',
    })
  },
  sunmit: function (e) {
    console.log(this.data.is_authenticat)
    console.log(app.globalData.user_id)
    console.log(app.globalData.userInfo)
    if (!app.globalData.user_id ||!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        content: '您还没有授权，请先去授权',
        success: function (res) {
          if (res.cancel) {
            //点击取消
            console.log("您点击了取消")
          } else if (res.confirm) {
            //点击确定
            console.log("您点击了确定")
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
      return
    }
    if (this.data.is_authenticat == 1) {
      wx.showModal({
        title: '提示',
        content: '您还没有进行身份认证，请先认证',
        confirmText: "认证", //默认是“确定”
        success: function (res) {
          if (res.cancel) {
            //点击取消
            console.log("您点击了取消")
          } else if (res.confirm) {
            //点击确定
            console.log("您点击了确定")
            wx.navigateTo({
              url: '../shiming/index',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../orderdelit/index?goods_id=' + this.data.goods_id,
      })
    }

  },
  clickTan: function (e) {
    this.setData({
      tid: e.currentTarget.dataset.id
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

    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        app.globalData.is_authenticat = res.is_authenticat
        that.setData({
          is_authenticat: res.data.is_authenticat
        })
      } else {
        wx.showToast({
          title: '提交失败',
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