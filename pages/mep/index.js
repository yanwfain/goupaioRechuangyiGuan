// pages/mep/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tid: 2,
    page: 1,
    movieList: [],
    status: 1,
    movieLists: []
  },
  vipdelit_Fn: function (e) {
    wx.navigateTo({
      url: '../viporder/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  vipdelitFn: function (e) {
    // if (e.currentTarget.dataset.num == e.currentTarget.dataset.use_num){
    //   wx.showToast({
    //     title: '改订单激活次数已达上限',
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '../yesvip/index?order_id=' + e.currentTarget.dataset.id,
    })
  },
  vippaydelitFn: function (e) {
    wx.navigateTo({
      url: '../vipgogo/index?order_id=' + e.currentTarget.dataset.id + '&num=' + e.currentTarget.dataset.num + '&payid=' + 1,
    })
  },
  paydelitFn: function (e) {
    wx.navigateTo({
      url: '../orderdelit/index?order_id=' + e.currentTarget.dataset.id + '&sid=' + 1 + '&goods_id=' + e.currentTarget.dataset.goods_id,
    })
  },
  clickFn: function (e) {
    this.setData({
      movieList: []
    })
    this.setData({
      tid: e.currentTarget.dataset.id
    })
    this.getMore(1, e.currentTarget.dataset.id)
  },
  lookdelit: function (e) {
    wx.navigateTo({
      url: '../yesma/index?order_id=' + e.currentTarget.dataset.id,
    })
  },
  getMore: function (page, status) {
    wx.showLoading({
      title: '加载中.',
    })
    var that = this;
    var url = app.globalData.url + '/index/getOrderList';
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
          // that.setData({
          //   movieList: movieLists.concat(res.data.rows),
          //   page: page + 1
          // })
          var _list = movieLists.concat(res.data.rows)
          for (var index in _list){
            _list[index].isTouchMove = false
          }
          console.log(_list)
          that.setData({
            movieList: _list,
            page: page + 1
          })
        } else {
          var _list = res.data.rows
          for (var index in _list) {
            _list[index].isTouchMove = false
          }
          console.log(_list)
          that.setData({
            movieList: _list,
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

  //手指触摸动作开始 记录起点X坐标

  touchstart: function (e) {

    //开始触摸时 重置所有删除

    this.data.movieList.forEach(function (v, i) {

      if (v.isTouchMove)//只操作为true的

        v.isTouchMove = false;

    })

    this.setData({

      startX: e.changedTouches[0].clientX,

      startY: e.changedTouches[0].clientY,

      movieList: this.data.movieList

    })

  },

  //滑动事件处理

  touchmove: function (e) {

    var that = this,

      index = e.currentTarget.dataset.index,//当前索引

      startX = that.data.startX,//开始X坐标

      startY = that.data.startY,//开始Y坐标

      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标

      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标

      //获取滑动角度

      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.movieList.forEach(function (v, i) {

      v.isTouchMove = false

      //滑动超过30度角 return

      if (Math.abs(angle) > 30) return;

      if (i == index) {

        if (touchMoveX > startX) //右滑

          v.isTouchMove = false

        else //左滑

          v.isTouchMove = true

      }

    })

    //更新数据

    that.setData({

      movieList: that.data.movieList

    })

  },

  /**
  
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */

  angle: function (start, end) {

    var _X = end.X - start.X,

      _Y = end.Y - start.Y

    //返回角度 /Math.atan()返回数字的反正切值

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);

  },

  //删除事件

  del: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单么？',
      success: function (res) {
        if (res.cancel) {
          //点击取消
          console.log("您点击了取消")
        } else if (res.confirm) {
          //点击确定
          console.log("您点击了确定")
          wx.showLoading({
            title: '取消中',
          })
          var url = app.globalData.url + '/index/delOrder';
          var data = {
            user_id: app.globalData.user_id,
            order_id: e.currentTarget.dataset.id
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.code == 1) {
              wx.showToast({
                title: res.msg,
                icon:'none'
              })
              that.onShow()
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
        }
      }
    })
    // this.data.movieList.splice(e.currentTarget.dataset.index, 1)

    // this.setData({

    //   movieList: this.data.movieList

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
      title: '加载中.',
    })
    var that = this;
    this.setData({
      movieList: [],
    })
    this.getMore(1, that.data.tid)

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