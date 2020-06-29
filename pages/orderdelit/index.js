// pages/orderdelit/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bid: 1,
    ridos_fa:1,
    num: 1,
    listuser: [
      {
        name: '',
        id_num: '',
        id: ''
      }
    ],
    jian_num: 0
  },
  guan_chu:function(e){
    wx.navigateTo({
      url: '../chuxingman/index',
    })
  },
  xuanze_fp:function(e){
    wx.navigateTo({
      url: '../allfapiao/index?pid=' +1,
    })
  },
  fapiaoFn:function(e){
    // this.setData({
    //   addShow:true,
    //   addShow:5
    // })
    if (this.data.sid == 1) {
      wx.showToast({
        title: '待支付订单不可修改',
        icon: 'none'
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
  submitfap:function(e){
    if(this.data.sid==1){
      wx.showToast({
        title: '该订单不可修改！',
        icon:'none'
      })
      return
    }
    this.setData({
      addShow: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // this.setData({
    //   is_vip: app.globalData.is_vip
    // })
    this.setData({
      goods_id: options.goods_id
    })
    if (options.sid == 1) {
      this.setData({
        order_id: options.order_id,
        sid: options.sid,
        ridos: '1',
      })
      wx.showLoading({
        title: '加载中',
      })
      var url1 = app.globalData.url + '/index/goodsInfo';
      var data1 = {
        user_id: app.globalData.user_id,
        goods_id: options.goods_id
      }
      app.wxRequest('POST', url1, data1, (res) => {
        console.log(res)

        if (res.code == 1) {
          that.setData({
            g_list: res.data,
            // bid: res.data.option[0].id,
            price_tab: res.data.option[0].price,
            // option_name: res.data.option[0].name
          })
          // that.pcikerFn(res.data.option[0].price, that.data.num, that.data.jian_num)
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
      var url = app.globalData.url + '/index/getOrder';
      var data = {
        user_id: app.globalData.user_id,
        order_id: options.order_id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 1) {
          that.setData({
            listuser: res.data.out,
            you_name: res.data.coupan_name,
            jian_num: res.data.coupan_price,
            // bid: res.data.option[0].id,
            // price_tab: res.data.child.all_price,
            option_name: res.data.child[0].option_name,
            num: res.data.num,
            all_picker: res.data.real_price,
            status: res.data.status,
            ridos_fa: res.data.is_invoice,
            invoice_name: res.data.invoice_name
          })
          // that.pcikerFn(res.data.option[0].price, that.data.num, that.data.jian_num)
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
      wx.showLoading({
        title: '加载中',
      })
      var url = app.globalData.url + '/index/goodsInfo';
      var data = {
        user_id: app.globalData.user_id,
        goods_id: options.goods_id
      }
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        wx.hideLoading()
        if (res.code == 1) {
          that.setData({
            g_list: res.data,
            bid: res.data.option[0].id,
            price_tab: res.data.option[0].price,
            option_name: res.data.option[0].name
          })
          that.pcikerFn(res.data.option[0].price, that.data.num, that.data.jian_num)
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
  deleorder: function (e) {
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
            order_id: that.data.order_id
          }
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
            wx.hideLoading()
            if (res.code == 1) {
              wx.navigateBack({
                delta: 1,//返回的页面数，如果 delta 大于现有页面数，则返回到首页。
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
      }
    })

  },
  pcikerFn: function (price_tab, num, jian_num) {
    this.setData({
      all_picker: price_tab * num - jian_num
    })
  },
  inyouhuiFn: function (e) {
    this.setData({
      list_idhui:this.data.list_idhui?false:true
    })
    if (this.data.price_tab * this.data.num < e.currentTarget.dataset.full_price){
      wx.showToast({
        title: '该订单金额不满足使用要求',
        icon:'none'
      })
      return
    }else{
      this.setData({
        you_name: e.currentTarget.dataset.name,
        addShow: false,
        jian_num: e.currentTarget.dataset.reduce_price,
        coupan_id: e.currentTarget.dataset.id,
        list_idhui: e.currentTarget.dataset.id
      })
      this.pcikerFn(this.data.price_tab, this.data.num, e.currentTarget.dataset.reduce_price)
    }
   
  },
  clickFn: function (e) {
    console.log(e.currentTarget.dataset.option_name)
    this.setData({
      bid: e.currentTarget.dataset.id,
      price_tab: e.currentTarget.dataset.price,
      option_name: e.currentTarget.dataset.name,
      
    })
    this.pcikerFn(e.currentTarget.dataset.price, this.data.num, this.data.jian_num)
  },
  delehui: function (e) {
    this.setData({
      list_idhui: '',
      you_name: '',
      coupan_id: '',
      addShow: '',
      jian_num: 0,
    })
    this.pcikerFn(this.data.price_tab, this.data.num, 0)
  },
  listuseradd: function (num) {
    var listuser = this.data.listuser;
    var num_list = {
      name: '',
      id_num: '',
      id: '',
      mobile: ''
    }
    this.data.listuser.push(num_list)
    for (var i = 0; i <= this.data.listuser.length; i++) {
      this.setData({
        listuser: this.data.listuser
      })
    }
    // var index = "list[" + e.currentTarget.dataset.index + "].number"; //这里必须这样拼接
  },
  listuserdele: function (num) {
    var listuser = this.data.listuser;
    var num_list = {
      name: '',
      id_num: '',
      id: '',
      mobile: ''
    }
    this.data.listuser.pop(num_list)

    for (var i = 0; i <= this.data.listuser.length; i++) {
      this.setData({
        listuser: this.data.listuser
      })
    }
    console.log(this.data.listuser)
    // var index = "list[" + e.currentTarget.dataset.index + "].number"; //这里必须这样拼接
  },
  addFn: function (e) {
    if (this.data.sid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    var num = this.data.num;
    if (this.data.listuser[this.data.listuser.length - 1].name == "" || !this.data.listuser[this.data.listuser.length - 1].name) {
      wx.showToast({
        title: '请先添加订票人',
        icon: 'none'
      })
      return
    }
    num++
    if (num > 99) {
      num == 10;
      this.setData({
        num:99
      })
      this.pcikerFn(this.data.price_tab, 10, this.data.jian_num)
      wx.showToast({
        title: '最多一次购买99张',
        icon: 'none'
      })
      return
    } else {
      this.setData({
        num: num
      })
      this.pcikerFn(this.data.price_tab, num, this.data.jian_num)
    }
    this.listuseradd(num)

  },
  listFn: function (e) {
    console.log(e)
    for (var i = 0; i < this.data.listuser.length; i++) {
      if (this.data.listuser[i].id == e.currentTarget.dataset.id) {
        wx.showToast({
          title: '该出行人已添加',
          icon: 'none'
        })
        return
      }
    }
    this.data.listuser.pop(num_list)
    var num_list = {
      name: e.currentTarget.dataset.name,
      id_num: e.currentTarget.dataset.id_num,
      id: e.currentTarget.dataset.id,
      mobile: e.currentTarget.dataset.mobile
    }

    this.data.listuser.push(num_list)

    for (var i = 0; i <= this.data.listuser.length; i++) {
      this.setData({
        listuser: this.data.listuser
      })
    }
    this.setData({
      list_id: e.currentTarget.dataset.id,
      addShow: false,
    })

  },
  deleFn: function (e) {
    if (this.data.sid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    var num = this.data.num;
    num--
    if (num < 1) {
      this.setData({
        num: 1
      })
      wx.showToast({
        title: '下单数量不能小于1',
        icon: 'none'
      })
      this.pcikerFn(this.data.price_tab, 1, this.data.jian_num)
      return
    } else {
      this.setData({
        num: num
      })
      this.pcikerFn(this.data.price_tab, num, this.data.jian_num)
    }
    this.listuserdele(num)
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      ridos: e.detail.value
    })

  },
  ycfps:function(e){
    // wx.showToast({
    //   title: '该功能暂未开放',

    // })
    this.setData({
      ridos_fa: e.detail.value
    })
  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  delitwenFns: function (e) {
    wx.navigateTo({
      url: '../textindex/index',
    })
  },
  binjuanFn: function (e) {
    if (this.data.sid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    this.setData({
      addShow: 4
    })
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  id_num: function (e) {
    this.setData({
      id_num: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  eeditFn: function (e) {
    if (this.data.sid == 1) {
      wx.showToast({
        title: '待支付订单不可修改哦！',
        icon: 'none'
      })
      return
    }
    this.setData({
      addShow: 2,
      mobile: e.currentTarget.dataset.mobile,
      id: e.currentTarget.dataset.id,
      id_num: e.currentTarget.dataset.id_num,
      name: e.currentTarget.dataset.name,
      index: e.currentTarget.dataset.index
    })
  },

  submitbianji: function (e) {
    if (!this.data.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.id_num) {
      wx.showToast({
        title: '请填写身份证',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '提交中',
    })
    var that = this;
    var url = app.globalData.url + '/user/editOut';
    var url1 = app.globalData.url + '/index/getId';
    var data1= {
      name: this.data.name,
      id_num: this.data.id_num,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      if (res.code == 1) {
        var data = {
          user_id: app.globalData.user_id,
          id: that.data.id,
          name: that.data.name,
          id_num: that.data.id_num,
          mobile: that.data.mobile,
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          if (res.code == 1) {
            // that.data.listuser.pop(num_list)
            var num_list = {
              name: that.data.name,
              id_num: that.data.id_num,
              id: that.data.id,
              mobile: that.data.mobile
            }
            that.data.listuser.splice(that.data.index, 1, num_list)
            // that.data.listuser.push(that.data.listuser)
            for (var i = 0; i <= that.data.listuser.length; i++) {
              this.setData({
                listuser: that.data.listuser
              })
            }
            that.setData({
              list_id: e.currentTarget.dataset.id,
              addShow: false,
            })
            wx.hideLoading()

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
        wx.hideLoading()

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

  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      batchIds: e.detail.value //单个选中的值
    })
    console.log(this.data.batchIds)
  },
  juanSub: function (e) {
    this.setData({
      addShow: false
    })
  },
  addtinajiaFn: function (e) {
    this.setData({
      addShow: 1,
      name: '',
      id_num: '',
      mobile:'',
    })
  },
  overshow: function (e) {
    this.setData({
      addShow: false
    })
  },
  wancheng: function (e) {
    this.setData({
      addShow: false
    })
  },
  quxiao: function (e) {
    this.setData({
      addShow: false
    })
  },
  submit_userde: function (e) {
    if (!this.data.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.id_num) {
      wx.showToast({
        title: '请填写身份证',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '提交中',
    })

    var that = this;
    var url = app.globalData.url + '/user/addOut';
    var url1 = app.globalData.url + '/index/getId';
    var data1 = {
      name: this.data.name,
      id_num: this.data.id_num,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      if (res.code == 1) {
        var data = {
          user_id: app.globalData.user_id,
          name: this.data.name,
          id_num: this.data.id_num,
          mobile: this.data.mobile,
        }
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
          if (res.code == 1) {
            that.getOutList()
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
  addUserfn: function (e) {
    var that = this;
    var url = app.globalData.url + '/user/getOutList';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,

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
    this.setData({
      addShow: 3,
      list_id: ''
    })
  },
  submit_money: function (e) {
    for (var i = 0; i < this.data.listuser.length; i++) {
      console.log(this.data.listuser)
      console.log(this.data.listuser.length)
      console.log(i)
      // debugger;
      if (!this.data.listuser[i].name) {
        wx.showToast({
          title: '请完善订票人信息',
          icon: 'none'
        })
        return
      }
    }
    var that = this
    // if (!this.data.listuser[this.data.listuser.length-1].name) {
    //   wx.showToast({
    //     title: '请完订票人信息',
    //     icon:'none'
    //   })
    //   return
    // }
    // that.data.listuser.forEach(function(item,index){
    //   console.log(item)
    //   console.log(index)
    //   console.log(that.data.listuser[index].name)
    //   if (!that.data.listuser[index].name){
    //     wx.showToast({
    //       title: '请完订票人信息',
    //     })
    //     return
    //   }
    // })
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
    
    if (this.data.ridos != 1) {
      wx.showToast({
        title: '请阅读并勾选用户协议',
        icon: 'none'
      })
      return
    }
    if (this.data.is_vip==1){
      wx.showModal({

        title: '提示',

        content: '加入会员，免费观展一年',

        showCancel: true, //是否显示取消按钮-----》false去掉取消按钮

        cancelText: "不用了", //默认是“取消”

        confirmText: "加入会员", //默认是“确定”

        success: function (res) {

          if (res.cancel) {
            that.pay(that)
            console.log("您点击了取消")
          } else if (res.confirm) {
            //点击确定
            wx.navigateTo({
              url: '../vipgogo/index',
            })
            console.log("您点击了确定")
          }
        }

      })
    }else{
      that.pay(that)
    }
    
    wx.hideLoading()

  },
  pay:function(that){
    
    that.setData({
      isbtnshow: true
    })
    wx.showLoading({
      title: '支付中',
    })
    if (that.data.sid == 1) {
      var url1 = app.globalData.url + '/wechat/orderPay';
      var data1 = {
        order_id: that.data.order_id,
        type: 1
      }
      app.wxRequest('POST', url1, data1, (res) => {
        console.log(res)
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
            wx.redirectTo({
              url: '../yesma/index?order_id=' + that.data.order_id,
            })
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
      var url = app.globalData.url + '/index/addOrder';
      var url1 = app.globalData.url + '/wechat/orderPay';
      if (!that.data.coupan_id) {
        that.setData({
          coupan_id: ''
        })
      }
      if (this.data.ridos_fa == 1){
        var data = {
          is_invoice: that.data.ridos_fa,
          user_id: app.globalData.user_id,
          goods_id: that.data.goods_id,
          option_name: that.data.option_name,
          option_price: that.data.price_tab,
          option_num: that.data.num,
          coupan_id: that.data.coupan_id,
          out: JSON.stringify(that.data.listuser),
        }
      }else{
        var data = {
          user_id: app.globalData.user_id,
          goods_id: that.data.goods_id,
          is_invoice: that.data.ridos_fa,
          invoice_name: that.data.invoice_name,
          invoice_num: that.data.invoice_num,
          email: that.data.email,
          option_name: that.data.option_name,
          option_price: that.data.price_tab,
          option_num: that.data.num,
          coupan_id: that.data.coupan_id,
          out: JSON.stringify(that.data.listuser),
        }
      }
       
     
      app.wxRequest('POST', url, data, (res_1) => {
        console.log(res_1)
        if (res_1.code == 1) {
          // wx.redirectTo({
          //   url: '../yesma/index',
          // })
          var data1 = {
            order_id: res_1.data.order_id,
            type: 1
          }
          app.wxRequest('POST', url1, data1, (res) => {
            console.log(res)
            // if (res.code == 1) {
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
                wx.redirectTo({
                  url: '../yesma/index?order_id=' + res_1.data.order_id,
                })
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
            // } else {
            //   wx.showToast({
            //     title: '失败',
            //     icon: 'none'
            //   })
            // }
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          that.setData({
            isbtnshow: false
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
  getOutList: function (e) {
    var that = this;
    var url = app.globalData.url + '/user/getOutList';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,

        })
        that.setData({
          addShow: 3,
          list_id: ''
        })
        wx.hideLoading()
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
  onShow: function () {
    var that = this;
    var url = app.globalData.url + '/user/getOutList';
    var data = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          goshop_index: res.data,

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
    var url1 = app.globalData.url + '/user/myCoupan';
    var data1 = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url1, data1, (res) => {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          youhui_list: res.data,
        })
      } else {
      }
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var url2 = app.globalData.url + '/user/getUserInfo';
    var data2 = {
      user_id: app.globalData.user_id,
    }
    app.wxRequest('POST', url2, data2, (res) => {
      console.log(res)
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