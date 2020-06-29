//index.js
//获取应用实例
const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isSiuser: false,
    modalstatus:true,
    mobile_index:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img: [{
      imgs: 'http://ticket.thid.cn/public/uploads/image/indexbanner.png',
      id: 1
    },
    {
      imgs: 'http://ticket.thid.cn/public/uploads/image/indexbanner.png',
      id: 2
    },
    {
      imgs: 'http://ticket.thid.cn/public/uploads/image/indexbanner.png',
      id: 3
    },
    ],
    statusBarHeight: app.globalData.statusBarHeight,//获取导航高度
    longitude: 116.158192,
    latitude: 39.929807,
    // markers: [{
    //   id: 0,
    //   iconPath: "../../image/tel.png",
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   width: 50,
    //   height: 50
    // }]
  },
  // indexdelitnot
  binddelitgops:function(e){
    wx.navigateTo({
      url: '../indexdelitnot/index',
    })
  },
  binddelitgop:function(e){
    wx.navigateTo({
      url: '../goupiaodelit/index?id=' + this.data.index_div.goods.id,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: 39.923399,
            longitude: 116.151929
          }]
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  open: function () {
    var that = this
        wx.makePhoneCall({
          phoneNumber: that.data.mobile_index, //此号码并非真实电话号码，仅用于测试  
          success: function () {
            console.log("拨打电话成功！")
          },
          fail: function () {
            console.log("拨打电话失败！")
          }
        })
      

  },
  copyFn: function (e) {
    var that = this
    wx.setClipboardData({
      data: that.data.email_index,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  ggopfn: function (e) {
    this.setData({
      hasUserInfo: true
    })
  },
  ggopfns: function (e) {
    this.setData({
      isSiuser: false
    })
  },
  vip_bindFN:function(e){
    if (!app.globalData.user_id){
      this.setData({
        hasUserInfo: false
      })
    }else{
      wx.navigateTo({
        url: '../vipgogo/index',
      })
    }
   
  },
  vipJihuo:function(e){
    // 线下会员卡号
    if (!app.globalData.user_id) {
      this.setData({
        hasUserInfo: false
      })
    }else{
      wx.navigateTo({
        url: '../jivip/index',
      })
    }
 
    // 线上购买之后激活
  },
  click: function (e) {
    var that = this
    wx.openLocation({
      latitude: 39.923399,
      longitude: 116.151929,
      scale:12,
      name: that.data.index_div.name,
      address: ''
    })
  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)

        app.globalData.userInfo = res.userInfo
        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          wxuser: res.userInfo,
          signature: res.signature,
          hasUserInfo: true,
          canIUse: true,
          isUser: true,
          isSiuser: false,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
        // that.getloge()
      },
      fail: function () { },

    })
    getOpenid(that)
  },
  getPhoneNumber: function (e) { //点击获取手机号码按钮
    var that = this;
    wx.checkSession({
      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;
        // console
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
            modalstatus: true
          });
        } else { //同意授权
          let url = app.globalData.url + '/User/getphone';
          console.log(url)
          let data = {
            encry: ency,
            iv: iv,
            sessionKey: that.data.session_key
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            if (res.code == 1) {
              wx.showToast({
                title: '获取成功',
     
              })
              that.setData({
                mobile: res.data.phone.phoneNumber
              })
              that.setData({
                isSiuser: false,
              })
              wx.hideLoading()
              let url = app.globalData.url + '/User/editUser';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                mobile: res.data.phone.phoneNumber,
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                if (res.code == 1) {
                  // getOpenid(that)

                }

              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            } else {
              that.setData({
                isSiuser: true,
                // isadd:false
              })
              wx.showToast({
                title: '获取失败',
                icon: 'none'
              })
            }
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
      }
    });
  },

  onShow:function(e){
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this;
    var url = app.globalData.url + '/index/getHome';
    var data = {
      // user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          index_div:res.data,
          mobile_index: res.data.mobile,
          email_index: res.data.email
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
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            isUser: true
          })
        }
      })
    }
    this.onLoad()
    getOpenid(that)
  
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
function getOpenid(that) {
  var url = app.globalData.url + '/index/getOpenid';
  var url1 = app.globalData.url + '/user/getUserInfo';
  var url2 = app.globalData.url + '/user/addUser';
  console.log(that)
  var params = {};
  params.appId = 'wxce5bff63e24f247e';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {
          if (!res.data.mobile) {
            that.setData({
              isSiuser: true
            })
          } else {
            that.setData({
              isSiuser: false
            })
          }
          app.globalData.user_id = res.data.id
          app.globalData.level = res.data.level,
            app.globalData.is_approval = res.data.is_approval,
            app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          app.globalData.is_authenticat = res.data.is_authenticat
          app.globalData.is_vip = res.data.is_vip
          app.globalData.mobile = res.data.mobile
          app.globalData.id_num = res.data.id_num
          app.globalData.name = res.data.realname
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price
          })
          wx.hideLoading()

        }
        if (res.code == '0') {
          console.log(app.globalData.userInfo)
          app.globalData.head_img = app.globalData.userInfo.avatarUrl
          params.openid = app.globalData.openId;
          params.headimg = app.globalData.userInfo.avatarUrl;
          params.user_name = app.globalData.userInfo.nickName;
          params.sex = app.globalData.userInfo.gender;
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              wx.hideLoading()

              if (!res.data.mobile) {
                that.setData({
                  isSiuser: true
                })
              } else {
                that.setData({
                  isSiuser: false
                })
              }
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
              app.globalData.level = res.data.level,
                app.globalData.is_approval = res.data.is_approval
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}