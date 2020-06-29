// pages/vipgogo/index.js
var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    allvippicker: null,
    ridos_fa: 1,
    userInfo: {},
    isSiuser: false,
    modalstatus: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      ridos: e.detail.value
    })

  },
  ycfps: function (e) {
    // wx.showToast({
    //   title: '该功能暂未开放',

    // })
    this.setData({
      ridos_fa: e.detail.value
    })
  },
  delitwenFns: function (e) {
    wx.navigateTo({
      url: '../textindex/index',
    })
  },
  clickFn: function (e) {
    if (this.data.payid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    this.setData({
      tid: e.currentTarget.dataset.id,

    })
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        allvippicker: this.data.index_div.one_price
      })
    }
    if (e.currentTarget.dataset.id == 2) {
      this.setData({
        allvippicker: this.data.index_div.two_price
      })
    }
  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  deleFn: function (e) {
    if (this.data.payid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    var num = this.data.num;
    num--
    if (num < 1) {
      var ppic = this.data.index_div.price * 1 * this.data.index_div.rate / 100
      this.setData({
        num: 1,
        allvippicker: ppic.toFixed(2)
      })
      wx.showToast({
        title: '下单数量不能小于1',
        icon: 'none'
      })
    } else {
      var ppic = this.data.index_div.price * num * this.data.index_div.rate / 100
      this.setData({
        num: num,
        allvippicker: ppic.toFixed(2)

      })
    }

    // allvippicker: res.data.price * that.data.num * res.data.rate / 100
  },
  addFn: function (e) {
    if (this.data.payid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    var num = this.data.num;
    num++
    var ppic = this.data.index_div.price * num * this.data.index_div.rate / 100
    this.setData({
      num: num,
      allvippicker: ppic.toFixed(2)

    })
  },
  fapiaoFn: function (e) {
    // this.setData({
    //   addShow:true,
    //   addShow:5
    // })
    if (this.data.payid==1){
      wx.showToast({
        title: '待支付订单不可修改',
        icon:'none'
      })
      return
    }
    var that = this
    wx.chooseInvoiceTitle({
      success: function (res) {
        console.log(res)
        that.setData({
          invoice_name: res.title,
          invoice_num: res.taxNumber,

        })
      },
      fail: function (res) {
        console.log(res)

      },
      complete: function (res) {

        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var url = app.globalData.url + '/index/vipInfo';
    var data = {
      // user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        if (options.payid == 1) {
          this.setData({
            // num: options.num,
            order_id: options.order_id,
            payid: options.payid,
            ridos:'1',
          

          })
          var ppic = res.data.price * options.num * res.data.rate / 100
          that.setData({
            index_div: res.data,
            // allvippicker: ppic.toFixed(2)
          })
          var url1 = app.globalData.url + '/index/getOrder';
          var data1 = {
            // user_id: app.globalData.user_id,
            order_id: options.order_id
          }
          app.wxRequest('POST', url1, data1, (res) => {
            console.log(res)
            if (res.code == 1) {
              that.setData({
                allvippicker: res.data.real_price,
                tid: res.data.card_type,
                ridos_fa: res.data.is_invoice,
                invoice_name: res.data.invoice_name
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
        } else {
          var ppic = res.data.price * that.data.num * res.data.rate / 100
          that.setData({
            index_div: res.data,
            // allvippicker: ppic.toFixed(2)
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
    // if(){
    //   var url = app.globalData.url + '/index/getOrder';
    // }
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

  cwvipFn: function (e) {
    var that = this;
   
    wx.showLoading({
      title: '提交中',
    })
    if (this.data.payid == 1) {
      var url1 = app.globalData.url + '/wechat/orderPay';
      var data1 = {
        order_id: this.data.order_id,
        type: 2
      }
      app.wxRequest('POST', url1, data1, (res) => {
        console.log(res)
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': res.signType,
          'paySign': res.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: "支付成功",
            })
            that.setData({
              isbtnshow: false
            })
            wx.showToast({
              title: '购买成功',
            })
            setTimeout(function (e) {
              wx.navigateTo({
                url: '../yesvip/index?order_id=' + that.data.order_id,
              })
            }, 800)

            // wx.showModal({
            //   title: '',
            //   content: '',
            //   success: function (res) {

            //     if (res.cancel) {

            //       //点击取消

            //       console.log("您点击了取消")

            //     } else if (res.confirm) {

            //       //点击确定

            //       console.log("您点击了确定")

            //     }

            //   }
            // })
            // if(that.data.num==1){
            // wx.navigateTo({
            //   url: '../jivip/index?order_id=' + res.data.order_id,
            // })
            // }else{
            //   wx.switchTab({
            //     url: '../mep/index',
            //   })
            // }

          },
          complete: function (e) {
            console.log(e)
          },
          'fail': function (res) {
            console.log(res)
            wx.showToast({
              title: "支付失败",
              icon: 'none'
            })
            that.setData({
              isbtnshow: false
            })
          }
        })
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    } else {
      if (!this.data.tid) {
        wx.showToast({
          title: '请选择规格',
          icon:'none'
        })
        return
      }
      if (this.data.ridos_fa == 2 && !this.data.invoice_name) {
        wx.showToast({
          title: '请填写发票信息',
          icon: 'none'
        })
        return
      }
      if (!this.data.email && this.data.ridos_fa == 2) {
        wx.showModal({
          title: '提示',
          content: '您还未填写邮箱，用于向您发送电子发票，请填写',
          showCancel: false, //是否显示取消按钮-----》false去掉取消按钮
          cancelText: "取消", //默认是“取消”
          confirmText: "确定", //默认是“确定”
          success: function (res) {
            if (res.cancel) {
              console.log("您点击了取消")
            } else if (res.confirm) {
              //点击确定
              wx.navigateTo({
                url: '../shiming/index',
              })
              return
              console.log("您点击了确定")
            }
          }

        })
        return
      }
      if (!this.data.ridos) {
        wx.showToast({
          title: '请阅读并勾选用户协议',
          icon:'none'
        })
        return
      }
      that.setData({
        isbtnshow: true
      })
      var url = app.globalData.url + '/index/addVipOrder';
      if (this.data.ridos_fa==1){
        if (this.data.tid == 1) {
          var data = {
            user_id: app.globalData.user_id,
            num: 1,
            card_type: 1,
            is_invoice: that.data.ridos_fa,
          }
        }
        if (this.data.tid == 2) {
          var data = {
            user_id: app.globalData.user_id,
            num: 2,
            card_type: 2,
            is_invoice: that.data.ridos_fa,
          }
        }
      }else{
        if (this.data.tid == 1) {
          var data = {
            user_id: app.globalData.user_id,
            num: 1,
            card_type: 1,
            is_invoice: that.data.ridos_fa,
            invoice_name: that.data.invoice_name,
            invoice_num: that.data.invoice_num,
            email: that.data.email,
          }
        }
        if (this.data.tid == 2) {
          var data = {
            user_id: app.globalData.user_id,
            num: 2,
            card_type: 2,
            is_invoice: that.data.ridos_fa,
            invoice_name: that.data.invoice_name,
            invoice_num: that.data.invoice_num,
            email: that.data.email,
          }
        }
      }
      
      app.wxRequest('POST', url, data, (res_1) => {
        console.log(res_1)
        wx.hideLoading()
        if (res_1.code == 1) {
          wx.showLoading({
            title: '支付中.',
          })
          var url1 = app.globalData.url + '/wechat/orderPay';
          var data1 = {
            order_id: res_1.data.order_id,
            type: 2
          }
          app.wxRequest('POST', url1, data1, (res) => {
            console.log(res)
            wx.hideLoading()
            wx.requestPayment({
              'timeStamp': res.timeStamp,
              'nonceStr': res.nonceStr,
              'package': res.package,
              'signType': res.signType,
              'paySign': res.paySign,
              'success': function (res) {
                console.log(res);
                wx.showToast({
                  title: "支付成功",
                })
                that.setData({
                  isbtnshow: false
                })
                // if(that.data.num==1){
          
                setTimeout(function (e) {
                  wx.navigateTo({
                    url: '../yesvip/index?order_id=' + res_1.data.order_id,
                  })
                }, 800)
                // }else{
                //   wx.switchTab({
                //     url: '../mep/index',
                //   })
                // }

              },
              complete: function (e) {
                console.log(e)
              },
              'fail': function (res) {
                console.log(res)
                wx.showToast({
                  title: "支付失败",
                  icon: 'none'
                })
                that.setData({
                  isbtnshow: false
                })
              }
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
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
    var that = this
    var url3 = app.globalData.url + '/user/getUserInfo';
    var data3 = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url3, data3, (res) => {
      console.log(res)
      if (res.code == 1) {
        this.setData({
          email: res.data.email
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
            all_price: res.data.all_price,
            email: res.data.email
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