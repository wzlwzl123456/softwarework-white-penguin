// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userOpenid: 0,
        dailyColor: 'white',
        specialColor: 'dodgerblue',
        dailyFlag: 0,
        specialFlag: 1,
        classify: 1,
        /**
         * 榜单文章相关数据
         */
        list: [],
        dailyLike: [],
        platform1Like: [],
        platform2Like: [],
        platform3Like: [],
        detail:''
    },
    /**
     * 发送点击信号给后端
     */
    sendMsg: function () {
        var that = this;
        wx.request({
            url: 'https://whitepenguin.xyz/hotlist',
            data: { //传所点击的URL和用户信息
                url: wx.getStorageSync('web1'),
                userinfo: wx.getStorageSync('userinfo')
            }, //发送给后台的数据
            header: {
                'content-type': 'application/json'
            }, //请求头
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                console.log(res.data); //res.data为后台返回的数据
                that.setData({
                    list: res.data.result
                })
            },
            fail: function (err) {}, //请求失败
            complete: function () {} //请求完成后执行的函数
        })
    },
    /**
     * 点击爱心收藏发送给后端
     */
    sendLike: function (e) {
        if (this.data.dailyFlag == 1) {
            var s = 'dailyLike[' + e.currentTarget.dataset.index + ']'
            var st = this.data.dailyLike[e.currentTarget.dataset.index]
        } else if (this.data.specialFlag == 1 && this.data.classify == 1) {
            var s = 'platform1Like[' + e.currentTarget.dataset.index + ']'
            var st = this.data.platform1Like[e.currentTarget.dataset.index]
        } else if (this.data.specialFlag == 1 && this.data.classify == 2) {
            var s = 'platform2Like[' + e.currentTarget.dataset.index + ']'
            var st = this.data.platform2Like[e.currentTarget.dataset.index]
        } else if (this.data.specialFlag == 1 && this.data.classify == 3) {
            var s = 'platform3Like[' + e.currentTarget.dataset.index + ']'
            var st = this.data.platform3Like[e.currentTarget.dataset.index]
        }
        console.log(s)

        if (st != 1) {
            // console.log(e.currentTarget.dataset.index)
            this.setData({
                [s]: 1
            })
            console.log(this.data.dailyLike)
            var _url = this.data.list[e.currentTarget.dataset.index].blogUrl
            var _title = this.data.list[e.currentTarget.dataset.index].blogTitle
            console.log(this.data.userOpenid)
            var _openid = this.data.userOpenid
            if (this.data.openid == '') {
                wx.showToast({
                    title: '请先登录'
                })
            } else {
                var that = this;
                wx.request({
                    url: 'https://whitepenguin.xyz/add_user_likes',
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
                            title: '收藏成功'
                        })
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })

            }
        }
        if (st == 1) {
            this.setData({
                [s]: 0
            })
            // console.log(e.currentTarget.dataset.index)
            var _url = this.data.list[e.currentTarget.dataset.index].blogUrl
            var _title = this.data.list[e.currentTarget.dataset.index].blogTitle
            var _openid = this.data.userOpenid
            console.log(_openid)
            if (this.data.openid == '') {
                wx.showToast({
                    title: '请先登录'
                })
            } else {
                var that = this;
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
            }
        }
    },
    /**
     * 点击跳转文章对应外部页面、该文章点击量+1
     */
    // gotoURL: function (e) {
    //     var that=this;
    //       wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].blogUrl)
    //       console.log(wx.getStorageSync('web1'))
    //       wx.navigateTo({
    //         url: '/pages/out/out?textData='+that.data.list[e.currentTarget.dataset.index].blogText+'&titleData='+that.data.list[e.currentTarget.dataset.index].blogTitle+'&briefData='+that.data.list[e.currentTarget.dataset.index].blogBrief+'&urlData='+that.data.list[e.currentTarget.dataset.index].blogUrl+'&dateData='+that.data.list[e.currentTarget.dataset.index].date
    //     })
    //   },
        /**
   * 点击跳转文章对应外部页面
   */
  gotoURL: function (e) {
    var that = this;
    wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].blogUrl)
    console.log(wx.getStorageSync('web1'))
    console.log(this.data.list[e.currentTarget.dataset.index].blogUrl)
    var _url=this.data.list[e.currentTarget.dataset.index].blogUrl
    wx.request({
      url: 'https://whitepenguin.xyz/user_likes_details', //请求地址(测试)
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
        var _text=
          wx.navigateTo({
            url: '/pages/out/out?textData='+that.data.detail+'&titleData='+that.data.list[e.currentTarget.dataset.index].blogTitle+'&urlData='+that.data.list[e.currentTarget.dataset.index].blogUrl+'&dateData='+that.data.list[e.currentTarget.dataset.index].date
        })

      },
      fail: function (err) {}, //请求失败
      complete: function () {} //请求完成后执行的函数
    })

  },
    /**
     * 跳转搜索页面
     */
    gotoSearch: function () {
        wx.navigateTo({
            url: '/pages/search/search'
        })
    },
    /**
     * 设置展示日榜样式
     */
    showDailylist: function (e) {
        this.setData({
            dailyFlag: 1,
            specialFlag: 0,
            dailyColor: 'dodgerblue',
            specialColor: 'white'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)
        console.log(this.data.specialFlag)
    },
    /**
     * 设置展示专区样式
     */
    showSpecialArea: function (e) {
        this.setData({
            dailyFlag: 0,
            specialFlag: 1,
            dailyColor: 'white',
            specialColor: 'dodgerblue'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)

        console.log(this.data.specialFlag)
    },
    /**
     * 专区分类1
     */
    classification1: function (e) {
        this.setData({
            classify: 1
        })
        this.getMsg()
        console.log(this.data.classify)
    },
    /**
     * 专区分类2
     */
    classification2: function (e) {
        this.setData({
            classify: 2
        })
        this.getMsg()
        console.log(this.data.classify)
    },
    /**
     * 专区分类3
     */
    classification3: function (e) {
        this.setData({
            classify: 3
        })
        this.getMsg()
        console.log(this.data.classify)
    },
    /**
     * 获取榜单数据
     */
    getMsg: function () {
        var that = this;
        if (this.data.dailyFlag == 1) {
            wx.request({
                url: 'https://whitepenguin.xyz/publication', //请求地址(测试)
                data: {
                    userOpenid: wx.getStorageSync('openid')
                }, //发送给后台的数据
                header: {
                    'content-type': 'application/json'
                }, //请求头
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                    console.log(res.data); //res.data为后台返回的数据
                    that.setData({
                        list: res.data.result
                    })
                    console.log(that.data.list)
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })
        } else if (this.data.specialFlag == 1) {
            if (this.data.classify == 1) {
                wx.request({
                    url: 'https://whitepenguin.xyz/news', //请求地址(测试)
                    data: {
                        userOpenid: wx.getStorageSync('openid')
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {

                        that.setData({
                            list: res.data.result
                        })
                        console.log(that.data.list)

                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if (this.data.classify == 2) {
                wx.request({
                    url: 'https://whitepenguin.xyz/hotlist',
                    data: {
                        userOpenid: wx.getStorageSync('openid')
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {

                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list: res.data.result
                        })
                        console.log(that.data.list)

                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if (this.data.classify == 3) {
                wx.request({
                    url: 'https://whitepenguin.xyz/news', //请求地址(测试)
                    data: {
                        userOpenid: wx.getStorageSync('openid')
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {

                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list: res.data.result
                        })
                        console.log(that.data.list)

                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }

        }

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
                        console.log(wx.getStorageSync('openid'))
                        console.log('openid为' + openid);
                        that.setData({
                            userOpenid: res.data.openid
                        })
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userLogin()
        var that = this;
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
        wx.login({
            success: res => {
                console.log(res, 'login')
                wx.request('url', {
                        code: res.code
                    },
                    function (res) {
                        var userinfo = res.data.data;
                        wx.setStorageSync('userinfo', userinfo);
                    })
            }
        })
        this.getMsg()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(wx.getStorageSync('openid'))
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {}
})