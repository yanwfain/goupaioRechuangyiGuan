// pages/memenp/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid:1,
    page: 1,
    movieList: [],
  },
  btnlinqu:function(e){
    wx.navigateTo({
      url: '../yesma/index?order_id=' + this.data.order_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(this.data.tid)
    var that = this;
    // this.getMore(this.data.page, this.data.tid)
  },
  clickFn:function(e){
    this.setData({
      movieList:[],
      page:1,
    })
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    this.getMore(1, this.data.tid)
  },
  lookdelit:function(e){
    wx.navigateTo({
      url: '../orderlokdelit/index?order_id=' + e.currentTarget.dataset.id,
    })
  },
  zengsong:function(e){
    wx.navigateTo({
      url: '../zengsong/index?id=' + e.currentTarget.dataset.id + '&due_time_text=' + e.currentTarget.dataset.due_time_text + '&goods_name=' + e.currentTarget.dataset.goods_name  ,
    })
  },
  getMore: function (page, status) {
    wx.showLoading({
      title: '加载中.',
    })
    var that = this;
    var url = app.globalData.url + '/user/getGiveGoodsList';
    var params = {
      user_id: app.globalData.user_id,
      page: page,
      status: status
    }
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      wx.hideLoading()
      if (res.code == 1) {
        if (that.data.page > 1) {
          var movieLists = that.data.movieList;
          that.setData({
            movieList: movieLists.concat(res.data.rows),
            page: page + 1
          })
        } else {
          that.setData({
            movieList: res.data.rows,
            page: page + 1
          })
        }

      } else {
        wx.showToast({
          title: '没有更多数据了！',
          icon: 'none'
        })
        wx.hideLoading()

      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
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
      title: '加载中.',
    })
    var that = this;
    this.setData({
      movieList: [],
    })
    this.getMore(1,this.data.tid)
    wx.hideLoading()
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onShow()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    this.getMore(that.data.page, that.data.tid);
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})