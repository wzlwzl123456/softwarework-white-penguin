// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    head: "/img/head.png",
    name: "登入",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    openid: 'x',
    list: [],
    length:0
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //userLogin
  userLogin: function () {

    var that = this
    //根据code获取openid等信息
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        console.log(code);
        var appId = 'wxb772793a9223a414'; //小程序的appid
        var secret = '81636f31d0b484df577707e69f5f12db'; //小程序的appsecret
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            wx.setStorageSync('openid', openid)
            console.log('openid为' + openid);
            that.setData({
              openid: res.data.openid
            })
            that.sendOpenid()
            that.getNum()
          }
        })
      }
    })

  },


  onLoad:function(options) {
    var that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.userLogin()
    this.getNum()
  },
  /**
   * 发送openid给后端
   */
  sendOpenid: function () {
    console.log(this.data.openid)
    var that = this;
    wx.request({
      url: 'https://whitepenguin.xyz/login',
      data: {
        userOpenid: this.data.openid
      }, //发送给后台的数据
      header: {
        'content-type': 'application/json'
      }, //请求头
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({

        })
      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
    })
  },
  getNum: function () {
    var that = this;
    wx.request({
      url: 'https://whitepenguin.xyz/get_user_likes', //请求地址(测试)
      data: {
        userOpenid: wx.getStorageSync('openid')
      }, //发送给后台的数据
      header: {
        'content-type': 'application/json'
      }, //请求头
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        that.setData({ //用that而不是this，用this就是success的this就错了
          length: res.data.result.length
        })
        console.log(that.data.length)
      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
    })
  },
  // 跳转函数
  jump1() {

    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  jump2() {

    wx.navigateTo({
      url: '/pages/setup/setup',
    })
  },
  jump3() {

    wx.navigateTo({
      url: '/pages/follow/follow',
    })
  },
  jump4() {

    wx.navigateTo({
      url: '/pages/page5/page5',
    })
  },
  /**
   * 获取用户头像，昵称
   */
  getUserProfile: function () {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.setData({
          name: res.userInfo.nickName,
          head: res.userInfo.avatarUrl
        })
      }
    })
  }
})