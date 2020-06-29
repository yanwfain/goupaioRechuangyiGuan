// pages/yesvip/index.js
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
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      order_id: options.order_id
    })
    var that = this;
    var url = app.globalData.url + '/index/getOrder';
    var data = {
      user_id: app.globalData.user_id,
      order_id: options.order_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          listarry: res.data
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
  clickcopy: function (e) {
    var that = this;

    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    });
  },
  gosubmit: function (e) {
    for (var i = 0; i <= this.data.listarry.child.length; i++) {
      if (this.data.listarry.child[i].status == 1) {
        var code_list = this.data.listarry.child[i].code
        console.log(code_list)
        wx.navigateTo({
          url: '../jivip/index?code=' + code_list,
        })
        return
      }
    }

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
    var url = app.globalData.url + '/index/getOrder';
    var data = {
      user_id: app.globalData.user_id,
      order_id: this.data.order_id
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          listarry: res.data
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
    var url1 = app.globalData.url + '/user/getUserInfo';
    var data1 = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          is_vip: res.data.is_vip
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
  onShareAppMessage: function (e) {
    console.log(e)
    var that = this;
    var member = app.globalData.userInfo.name;
    if (this.data.add_liuyan) {
      var item = this.data.add_liuyan
    } else {
      var item = ''
    }
    return {
      title: '送你一张创忆馆会员卡，点击领取',
      // tit: `${userInfo.nickname}推荐给你一本适合${item.book.maxAgeReadPercent[0]}岁的好书`
      // pages/index/index
      // pages/order/zenpin/index
      // path: 'pages/kanjia/index?bargainId=' + that.data.bargainId + '&inviter_uid=' + that.data.inviter_uid 
      path: 'pages/jivip/index?code=' + e.target.dataset.code
    };
  }
})