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
    isstart: false,
    openimg: "/img/downs.png",
    offimg: "/img/down.png",
    list: [],
    detail: ''


  },

  /**
   * 点击跳转文章对应外部页面
   */
  gotoURL: function (e) {
    var that = this;
    wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].user_likes_url)
    console.log(wx.getStorageSync('web1'))
    console.log(this.data.list[e.currentTarget.dataset.index].user_likes_url)
    var _url = this.data.list[e.currentTarget.dataset.index].user_likes_url
    wx.request({
      url: 'http://whitepenguin.xyz/user_likes_details', //请求地址(测试)
      data: {
        url: _url
      }, //发送给后台的数据
      header: {
        'content-type': 'application/json'
      }, //请求头
      method: 'GET',
      dataType: 'json',
      success: function (res) {

        that.setData({ //用that而不是this，用this就是success的this就错了
          detail: res.data.result
        })
        console.log(that.data.detail) //打印后端返回的数据
        wx.setStorageSync('detail', that.data.detail)
        var _text =
          wx.navigateTo({
            url: '/pages/out/out?textData=' + that.data.detail + '&titleData=' + that.data.list[e.currentTarget.dataset.index].user_likes_title + '&urlData=' + that.data.list[e.currentTarget.dataset.index].user_likes_url
          })

      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
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
      start: this.data.slist[index].name,
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
          list: res.data.result,
        })
        console.log(that.data.list)
      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
    })
  },
  sendNotLike: function (e) {
    var that = this;
    var _openid=wx.getStorageSync('openid')
    var _url=this.data.list[e.currentTarget.dataset.index].user_likes_url
    var _title=this.data.list[e.currentTarget.dataset.index].user_likes_title
                wx.request({
                    url: 'https://whitepenguin.xyz/del_user_likes',
                    data: { //传递给后端的数据：所点击的URL和用户信息
                        url: _url,
                        userOpenid: _openid,
                        title: _title
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        console.log(res.data); //res.data为后台返回的数据
                        that.setData({

                        })
                        wx.showToast({
                            title: '取消收藏成功'
                        })
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
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