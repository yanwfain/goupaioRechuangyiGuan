// pages/jivip/index.js
const app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isSiuser: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.order_id) {
      this.setData({
        isShow: false,
        order_id: options.order_id
      })
    } else {
      this.setData({
        isShow: true
      })
    }
    if (options.code) {
      this.setData({
        code: options.code
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
    var url = app.globalData.url + '/index/vipInfo';
    var data = {
      // user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        this.setData({
          interger: res.data
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
  vip_name: function (e) {
    this.setData({
      vip_name: e.detail.value
    })
  },
  vip_mobile: function (e) {
    this.setData({
      vip_mobile: e.detail.value
    })
  },
  vip_id_num: function (e) {
    this.setData({
      vip_id_num: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  submiteFn: function (e) {
    if (!this.data.vip_name) {
      wx.showToast({
        title: '姓名不能为空',
      })
      return
    }
    if (!this.data.vip_id_num) {
      wx.showToast({
        title: '身份证不能为空',
      })
      return
    }
    if (!this.data.vip_mobile) {
      wx.showToast({
        title: '电话不能为空',
      })
      return
    }
    wx.showLoading({
      title: '提交中',
    })
    var url1 = app.globalData.url + '/index/getId';
    var data1 = {
      name: this.data.vip_name,
      id_num: this.data.vip_id_num,
    }
    var that = this;
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
    
      if (res.code == 1) {
        if (that.data.is_authenticat == 1) {
          var url2 = app.globalData.url + '/User/editUser';
          var data2 = {
            user_id: app.globalData.user_id,
            realname: that.data.vip_name,
            mobile: that.data.vip_mobile,
            id_num: that.data.vip_id_num,
          }
          app.wxRequest('POST', url2, data2, (res) => {
            console.log(res)
            if (res.code == 1) {
              wx.hideLoading()

            } else {
              wx.showToast({
                title: res.msg,
                icon:'none'
              })
              return
            }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }
        if (that.data.order_id) {
          var url = app.globalData.url + '/user/openVip';
          var data = {
            user_id: app.globalData.user_id,
            order_id: that.data.order_id,
            vip_id_num: that.data.vip_id_num,
            vip_mobile: that.data.vip_mobile,
            vip_name: that.data.vip_name,
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.code == 1) {
              wx.showToast({
                title: res.msg,
              })
              setTimeout(function (e) {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 800)
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
          if (!that.data.code) {
            wx.showToast({
              title: '会员卡号不能为空',
            })
            return
          }
          var url = app.globalData.url + '/user/openVip';
          var data = {
            user_id: app.globalData.user_id,
            code: that.data.code,
            vip_id_num: that.data.vip_id_num,
            vip_mobile: that.data.vip_mobile,
            vip_name: that.data.vip_name,
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.code == 1) {
              wx.showToast({
                title: res.msg,
              })
              setTimeout(function (e) {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 800)
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
        }
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

  }
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
    wx.showLoading({
      title: '加载中.',
    })
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
        wx.hideLoading()
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
            vip_mobile: res.data.mobile,
            birthday: res.data.birthday,
            phone: res.data.phone,
            vip_name: res.data.realname,
            vip_id_num: res.data.id_num,
            all_price: res.data.all_price,
            is_authenticat: res.data.is_authenticat
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