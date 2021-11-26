// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: "分类",
    start1: "语言",
    slist: [{
        id: 1,
        name: "开源项目"
      },
      {
        id: 1,
        name: "月刊"
      },
    ],
    slist1: [{
        id: 1,
        name: "Java"
      },
      {
        id: 1,
        name: "Python"
      },
    ],
    slist2: [{
        id: 1,
        name: "开源项目"
      },
      {
        id: 1,
        name: "月刊"
      },
    ],
    isstart: false,
    openimg: "/img/downs.png",
    offimg: "/img/down.png",
    list: []
  },

  /**
   * 点击跳转文章对应外部页面
   */
  gotoURL: function (e) {
    wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].user_likes_url)
    wx.navigateTo({
      url: '/pages/out/out'
    })

  },
  opens: function (e) {
    var that = this

    if (e.currentTarget.dataset.item == "0") {
      console.log(that.data.slist)
      that.setData({
        slist: that.data.slist1,
        ml: "50%"
      })
      console.log(that.data.slist)
    } else {
      that.setData({
        slist: that.data.slist2,
        ml: "0%"
      })
    }

    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        } else {
          this.setData({
            isstart: true,
          });
        }
        break;
      case "0":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        } else {
          this.setData({
            isstart: true,
          });
        }
        break;
    }

  },
  onclicks1: function (e) {
    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
      isstart: false,
      isfinish: false,
      isdates: false,
      finish: "目的地"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('openid'))
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/get_user_likes', //请求地址(测试)
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
          list: res.data.result
        })
        console.log(that.data.list)
      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
    })
  },
  sendNotLike: function (e) {
    wx.showToast({
      title: '取消收藏'
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