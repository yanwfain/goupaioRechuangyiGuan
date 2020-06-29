//app.js
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
})
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user_id: '',
    user_name: '',
    head_img: '',
    url: 'https://ticket.thid.cn/public/index.php/api',
    openid: '',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    is_authenticat:null,
    is_vip:null,
    id_num: null,
    name: null,
    mobile:null,
  },
//   * 封装wx.request请求
//  * method： 请求方式
//  * url: 请求地址
//  * data： 要传递的参数
//  * callback： 请求成功回调函数
//  * errFun： 请求失败回调函数
//  ** /
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },
  /**
 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 */
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == "none") {
          wx.showModal({
            title: '提示',
            content: '请检查您的网络',
          })
        } else {

        }
      },
      fail: function () {
        //请求失败 那就不判断网络了
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },
  scrollHeight: function (that) {
    // 获取页面高度，设置背景色，公用方法        
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度       
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度        
    that.setData({
      scroll_height: windowHeight * 750 / windowWidth
    })
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
  // var httpUtils = require('../../js/httpUtils.js');
  // var puto = {
  //   "userId": options.user_id
  // };
  // httpUtils.postRequest(urlo, puto).then(function (res) {
  //   console.log(urlo)
  //   console.log(res)
  //   if (res.data.body == '1') {
  //     that.setData({
  //       huan: false
  //     })
  //   } else {
  //     that.setData({
  //       huan: true
  //     })
  //   }
  // })
})