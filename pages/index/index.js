// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 轮播图数组
      swiperList: [
          {
              id:0,
              src:'https://static.oschina.net/uploads/space/2021/0618/082709_qiFl_4937141.png'
          },
          {
              id:1,
              src:'https://img-home.csdnimg.cn/images/20210926052450.jpg'
          },
          {
              id:2,
              src:'https://static.oschina.net/uploads/space/2021/0616/080930_6f9J_4937141.png'
          }
      ],
      articleList:[
           
      ],
      arr:[

      ],
      _arr:[

      ],
      userOpenid:0
  },
  sendLike: function (e) {
    // console.log(e.currentTarget.dataset.index)
    var Index=e.currentTarget.dataset.index
    var s = '_arr[' + e.currentTarget.dataset.index + ']'
    var st = this.data._arr[e.currentTarget.dataset.index]
    if(this.data._arr[e.currentTarget.dataset.index]==0){
      this.data._arr.splice(Index,1);
      this.data._arr.splice(Index,0,1);
      this.setData({
        [s]:1
      })
      var _url = this.data.articleList[e.currentTarget.dataset.index].blogUrl
      var _title = this.data.articleList[e.currentTarget.dataset.index].blogTitle
      var _openid=this.data.userOpenid
    var that = this;
    wx.request({
        url: 'http://whitepenguin.xyz/add_user_likes',
        data: {//传递给后端的数据：所点击的URL和用户信息
          url: _url,
          userOpenid:_openid,
          title:_title
        },
        header: {
            'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log(res.data); //res.data为后台返回的数据
            that.setData({ //用that而不是this，用this就是success的this就错了
                list:res.data.result
            })
        },
        fail: function (err) {}, //请求失败
        complete: function () {} //请求完成后执行的函数
    })
    wx.showToast({
      title: '收藏成功'
    })
    }
    else{
      this.data._arr.splice(Index,1);
      this.data._arr.splice(Index,0,0);
      this.setData({
        [s]:0
      })
    var _url = this.data.articleList[e.currentTarget.dataset.index].blogUrl
    var _title = this.data.articleList[e.currentTarget.dataset.index].blogTitle
    var _openid=this.data.userOpenid
    var that = this;
    wx.request({
        url: 'http://whitepenguin.xyz/del_user_likes',
        data: {//传递给后端的数据：所点击的URL和用户信息
            url: _url,
            userOpenid:_openid,
            title:_title
        },
        header: {
            'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            console.log(res.data); //res.data为后台返回的数据
            that.setData({ //用that而不是this，用this就是success的this就错了
                list:res.data.result
            })
        },
        fail: function (err) {}, //请求失败
        complete: function () {} //请求完成后执行的函数
    })
    wx.showToast({
      title: '取消收藏成功'
    })
    }
    
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _arr=new Array(100);
    for (let i = 0; i < _arr.length; i++){
      _arr[i] = 0
    }
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
                        console.log(wx.getStorageSync('openid'))
                        console.log('openid为' + openid);
                        that.setData({
                            userOpenid: res.data.openid
                        })
                    }
                })
            }
        })
    this.setData({
              // 获取文章信息
              _arr:_arr
          })
      // 发送异步请求获取轮播图数据
      wx.request({
      // url内存放服务器的地址
        url: 'https://whitepenguin.xyz/news',
        data:{},
        dataType:'json',
      //   成功时的回调函数
        success: (result) => {
          this.setData({
              // 获取文章信息
              articleList:result.data.result
          })
        }
      });
  },
  gotoURL: function (e) {
    var that=this;
      wx.setStorageSync('web1', this.data.articleList[e.currentTarget.dataset.index].blogUrl)
      console.log(wx.getStorageSync('web1'))
      wx.navigateTo({
        url: '/pages/out/out?textData='+that.data.articleList[e.currentTarget.dataset.index].blogText+'&titleData='+that.data.articleList[e.currentTarget.dataset.index].blogTitle+'&briefData='+that.data.articleList[e.currentTarget.dataset.index].blogBrief+'&urlData='+that.data.articleList[e.currentTarget.dataset.index].blogUrl+'&dateData='+that.data.articleList[e.currentTarget.dataset.index].date
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
    this.setData({
      arr:this.data._arr
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

  },
  onPageScroll: function () {

  },
  onTabItemTap:function(item){
      
  }
})