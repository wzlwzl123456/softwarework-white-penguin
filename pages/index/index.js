// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [{
        id: 0,
        src: 'https://static.oschina.net/uploads/space/2021/0618/082709_qiFl_4937141.png'
      },
      {
        id: 1,
        src: 'https://img-home.csdnimg.cn/images/20210926052450.jpg'
      },
      {
        id: 2,
        src: 'https://static.oschina.net/uploads/space/2021/0616/080930_6f9J_4937141.png'
      }
    ],
    articleList: []
  },
  /**
   * 发送点击信息
   */
  sendMsg:function (e) {
    
  },
  /**
   * 发送收藏信息
   */
  sendLike: function (e) {
    //console.log(e)
    //console.log(this.data.articleList)
    var _url = this.data.articleList[e.currentTarget.dataset.index].blogUrl
    var _title = this.data.articleList[e.currentTarget.dataset.index].blogTitle
    var _openid = wx.getStorageSync('openid')
    // console.log(_openid)
    // console.log(_url)
    // console.log(_openid)
    if (_openid == '') {
      wx.showToast({
        title: '请先登录'
      })
    } else { //添加收藏信息
      var that = this;
      wx.request({
        url: 'http://127.0.0.1:5000/add_user_likes',
        data: { //传递给后端的数据：所点击的URL和用户信息
          url: _url,
          title: _title,
          userOpenid: _openid
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res.data); //res.data为后台返回的数据
          that.setData({ //用that而不是this，用this就是success的this就错了
            list: res.data.result
          })
          wx.showToast({
            title: '收藏成功'
          })
        },
        fail: function (err) {}, //请求失败
        complete: function () {} //请求完成后执行的函数
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorageSync()
    // 发送异步请求获取轮播图数据
    wx.request({
      // url内存放服务器的地址
      url: 'http://127.0.0.1:5000/news',
      data: {},
      dataType: 'json',
      //   成功时的回调函数
      success: (result) => {
        this.setData({
          // 获取文章信息
          articleList: result.data.result
        })
      }
    });
  },
  /**
   * 跳转文章网页
   */
  gotoURL: function (e) {
    wx.setStorageSync('web1', this.data.articleList[e.currentTarget.dataset.index].blogUrl)
    console.log(wx.getStorageSync('web1'))
    wx.navigateTo({
      url: '/pages/out/out'
    })
    this.sendMsg()
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

  },
  onPageScroll: function () {

  },
  onTabItemTap: function (item) {

  }
})