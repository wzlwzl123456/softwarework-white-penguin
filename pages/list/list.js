// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dailyColor: 'dodgerblue',
        specialColor: 'white',
        dailyFlag: 1,
        specialFlag: 0,
        classify: 1,
        /**
         * 正式版：榜单文章相关数据
         */
        list:[],
        /**
         * 本地测试版：榜单文章相关数据
         */
        dataList: [{
            url: 'https://www.oschina.net/news/169426',
            title: '广泛大使馆法国大使馆犯得上',
            synopsis: 'efghijklmnopqrstfdiafushafuoehw广泛大使馆法国大使馆犯得上广泛我刚打过二位广泛大使馆额外供奉的是个个人我大使馆额外供奉的是个个人我刚刚发给犯得上广泛大锅饭事故发生给犯得上广泛大使馆反倒是刚大使馆额外供奉的是个个人我刚刚发给犯得上广泛大锅饭事故发生给犯得上广泛大使馆反倒是刚刚刚发给犯得上广泛大锅饭事故发生给犯得上广泛大使馆反倒是刚刚范德萨iofhoidshaoifhefhuvwxyz',
            platform: 'CSDN',
            click: 1,
            like: 0,
            rank: 1
        }, {
            url: 'https://www.bilibili.com/',
            title: '标题2',
            synopsis: '简介abcdefghijklmnopqrstuvwxyz',
            platform: 'Github',
            click: 2,
            like: 1,
            rank: 2
        }, {
            url: 'https://www.douyu.com/',
            title: '标题3',
            synopsis: '简介3',
            platform: 'OpenSouce',
            click: 3,
            like: 0,
            rank: 3
        }]
    },
    /**
     * 发送点击信号给后端
     */
    sendMsg: function () {
        var that = this; //重置data{}里数据时候setData方法的this应为这里的this，如果在下方的success直接写this就变成wx.request的this了
        wx.request({
            url: 'http://127.0.0.1:5000/hotlist', //请求地址（测试）
            data: {//传所点击的URL和用户信息
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
                that.setData({ //用that而不是this，用this就是success的this就错了
                    list:res.data.result
                })
            },
            fail: function (err) {}, //请求失败
            complete: function () {} //请求完成后执行的函数
        })
    },
    /**
     * 点击爱心点赞发送给后端
     */
    sendLike: function (e) {
        // console.log(e.currentTarget.dataset.index)
        var _url = this.data.list[e.currentTarget.dataset.index].blogUrl
        var that = this;
        wx.request({
            url: 'http://127.0.0.1:5000/hotlist',
            data: {//传递给后端的数据：所点击的URL和用户信息
                url: _url,
                userinfo: wx.getStorageSync('userinfo'),
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
    },
    /**
     * 点击跳转文章对应外部页面、该文章点击量+1
     */
    gotoURL: function (e) {
        wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].blogUrl)
        console.log(wx.getStorageSync('web1'))
        wx.navigateTo({
            url: '/pages/out/out'
        })
        this.sendMsg()
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
        var that = this; //重置data{}里数据时候setData方法的this应为这里的this，如果在下方的success直接写this就变成wx.request的this了
        if(this.data.dailyFlag==1){
            wx.request({
                url: 'http://127.0.0.1:5000/hotlist', //请求地址(测试)
                data: {
                    //userinfo:wx.getStorageSync('userinfo'),//用户信息
                }, //发送给后台的数据
                header: {
                    'content-type': 'application/json'
                }, //请求头
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                   //console.log(res.data); //res.data为后台返回的数据
                    that.setData({ //用that而不是this，用this就是success的this就错了
                        list:res.data.result
                    })
                    console.log(that.data.list)
                    console.log(that.data.dataList)
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })
        }else if(this.data.specialFlag==1){
            if(this.data.classify==1){
                wx.request({
                    url: 'http://127.0.0.1:5000/zixun', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag:this.data.dailyFlag,//为1：要日榜信息
                        monthFlag:this.data.monthFlag,//为1：要月榜
                        specialFlag:this.data.specialFlag,//为1：要专区
                        classify:this.data.classify//表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                       //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list:res.data.result
                        })
                        console.log(that.data.list)
                        console.log(that.data.dataList)
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if(this.data.classify==2){
                wx.request({
                    url: 'http://127.0.0.1:5000/hotlist', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag:this.data.dailyFlag,//为1：要日榜信息
                        monthFlag:this.data.monthFlag,//为1：要月榜
                        specialFlag:this.data.specialFlag,//为1：要专区
                        classify:this.data.classify//表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                       //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list:res.data.result
                        })
                        console.log(that.data.list)
                        console.log(that.data.dataList)
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if(this.data.classify==3){
                wx.request({
                    url: 'http://127.0.0.1:5000/zixun', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag:this.data.dailyFlag,//为1：要日榜信息
                        monthFlag:this.data.monthFlag,//为1：要月榜
                        specialFlag:this.data.specialFlag,//为1：要专区
                        classify:this.data.classify//表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                       //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list:res.data.result
                        })
                        console.log(that.data.list)
                        console.log(that.data.dataList)
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    onShow: function () {},
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