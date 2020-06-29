// pages/userdelit/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerProData: {
      index: 0,
      items: ['请选择', '男', '女']
    },
    nickname: '',
    head_img: '',
    mobile: '',
    region: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = app.globalData.url + '/user/getUserInfo';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          head_img: res.data.head_img,
          nickName: res.data.nickname,
          mobile: res.data.mobile,
          
          'region[0]': res.data.provice ? res.data.provice:'请选择',
          'region[1]': res.data.city ? res.data.city:'',
          'region[2]': res.data.address ? res.data.address:'',
        })
        if (res.data.sex){
          that.setData({

            'pickerProData.index': res.data.sex,

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
  pickerProChange: function (e) {
    this.setData({
      'pickerProData.index': e.detail.value
    })
    var that = this;
    console.log(that.data.pickerProData.index)
    console.log(that.data.pickerProData.items[that.data.pickerProData.index])
    if (that.data.pickerProData.index != 0) {
      this.setData({
        sexname: ''
      })
    }
  },
  changeDate(e) {
    console.log(e)
    this.setData({ date_time: e.detail.value });
  },
  bindRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      areaCode: e.detail.code[2]
    })
  },
  nickName:function(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  submit:function(e){
    if (!this.data.nickName){
      wx.showToast({
        title: '请输入昵称',
        icon:'none'
      })
      return
    }
    if (this.data.pickerProData.index==0) {
      wx.showToast({
        title: '请输入性别',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
      return
    }
    if (!this.data.region || this.data.region[0]=="请选择") {
      wx.showToast({
        title: '请输入所在地',
        icon: 'none'
      })
      return
    }
    var that = this;
    var url = app.globalData.url + '/User/editUser';
    var data = {
      user_id: app.globalData.user_id,
      nickname: this.data.nickName,
      mobile: this.data.mobile,
      provice: this.data.region[0],
      city : this.data.region[1],
      address: this.data.region[2],
      sex: this.data.pickerProData.index
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
 
      if (res.code == 1) {
        wx.showToast({
          title: res.msg,
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
            success: function () {
            }
          })
        },800)
       
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