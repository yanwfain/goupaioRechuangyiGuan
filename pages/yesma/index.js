// pages/yesma/index.js
var app = getApp()
var utils = require('../../utils/util.js')
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
    console.log(options)
    this.setData({
      order_id: options.order_id,

    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var url = app.globalData.url + '/index/getOrder';
    // var method= 'get',
    var data = {
      user_id: app.globalData.user_id,
      order_id: options.order_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,
          _num: res.data.use_num
        })

        var _list = res.data.out
        for (var index in _list) {
          if (_list[index].id_num) {
            _list[index].id_num = utils.toHide(_list[index].id_num)
          }
        }
        console.log(_list)
        that.setData({
          _list: _list
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
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    // var method= 'get',
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        var under_time = utils.toHide(res.data.id_num)
        console.log(under_time)
        that.setData({
          name: res.data.realname,
          mobile: res.data.mobile,
          id_num: under_time,
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
    var url1 = app.globalData.url + '/index/getOrder';
    // var method= 'get',
    var data1 = {
      user_id: app.globalData.user_id,
      order_id: that.data.order_id,
    }
    this.setData({
      tiemset: setInterval(function () {
        app.wxRequest('POST', url1, data1, (res) => {
          console.log(res)
          wx.hideLoading()
          if (res.code == 1) {
            that.setData({
              goshop_index: res.data,

            })
            // if (that.data._num != res.data.use_num) {
            //   wx.showModal({
            //     title: '提示',
            //     content: '核销成功',
            //     showCancel: false, //是否显示取消按钮-----》false去掉取消按钮
            //   })
            //   that.setData({
            //     _num: res.data.use_num
            //   })
            // }
            var _list = res.data.out
            for (var index in _list) {
              if (_list[index].id_num) {
                _list[index].id_num = utils.toHide(_list[index].id_num)
              }
            }
            console.log(_list)
            that.setData({
              _list: _list
            })
          } else {
            // wx.showToast({
            //   title: res.msg,
            //   icon: 'none'
            // })
          }
        })
      }, 3000)
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
    clearInterval(this.data.tiemset)
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
  // onShareAppMessage: function () {

  // }
})