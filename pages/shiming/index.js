// pages/shiming/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goshop_index:[],
    istxt: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // /user/getUserInfo
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        if (res.data.realname){
          this.setData({
            realname: res.data.realname
          })
        }
        if (res.data.mobile) {
          this.setData({
            mobile: res.data.mobile
          })
        }
        if (res.data.id_num) {
          this.setData({
            id_num: res.data.id_num
          })
        }
        if (res.data.email) {
          this.setData({
            email: res.data.email
          })
        }

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
  email:function(e){
    this.setData({
      email: e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  realname:function(e){
    this.setData({
      realname:e.detail.value
    })
  },
  id_num: function (e) {
    console.log(e)
    this.setData({
      id_num: e.detail.value
    })
  },
  eadit:function(e){
    var that = this;
    var url = app.globalData.url + '/user/addOut';
    var data = {
      user_id: app.globalData.user_id,
      name: that.data.realname,
      id_num: that.data.id_num,
      mobile: that.data.mobile,
      email: that.data.email
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
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
  submit:function(e){
    
    if (!this.data.realname){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
      return
    }
    if (!this.data.id_num) {

      wx.showToast({
        title: '请输入身份证',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(this.data.email);
    if (!emailVar) {
      wx.showToast({
        title: '请填写正确邮箱',
        icon: 'none'
      })
      return
    }
    this.setData({
      istxt: true
    })
    var that = this;
    var url1 = app.globalData.url + '/index/getId';
    var url = app.globalData.url + '/User/editUser';
    var data1={
      name: this.data.realname,
      id_num: this.data.id_num,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)

      if (res.code == 1) {
        if (that.data.goshop_index.length<1){
         that.eadit()
        }
        var data = {
          user_id: app.globalData.user_id,
          realname: that.data.realname,
          mobile: that.data.mobile,
          id_num: that.data.id_num,
          email: that.data.email
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          that.setData({
            istxt: false
          })
          if (res.code == 1) {
            wx.showToast({
              title: res.msg,
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
                success: function () {
                }
              })
            }, 800)
           
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

      } else {
        that.setData({
          istxt: false
        })
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
      wx.hideLoading()
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,

        })
     
      } else {
        that.setData({
          goshop_index: [],

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