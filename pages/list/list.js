// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dailyColor: 'dodgerblue',
        monthColor: 'white',
        specialColor: 'white',
        dailyFlag: 1,
        monthFlag: 0,
        specialFlag: 0,
        classify: 0,
        /**
         * 榜单文章相关数据
         */
        dataList: [{
            url: 'https://www.baidu.com',
            title: '标题1',
            synopsis: 'efghijklmnopqrstfdiafushafuoehwiofhoidshaoifhefhuvwxyz',
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
        }, {
            url: 'https://www.huya.com/',
            title: '标题4',
            synopsis: '简介4',
            platform: '平台4',
            click: 4,
            like: 1,
            rank: 4
        }, {
            url: 'https://lol.qq.com/',
            title: '标题5',
            synopsis: '简介5',
            platform: '平台5',
            click: 5,
            like: 0,
            rank: 5
        }, {
            url: 'https://lol.qq.com/',
            title: '标题6',
            synopsis: '简介6',
            platform: '平台6',
            click: 6,
            like: 0,
            rank: 6
        }, {
            url: 'https://lol.qq.com/',
            title: '标题7',
            synopsis: '简介7',
            platform: '平台7',
            click: 7,
            like: 0,
            rank: 7
        }]
    },
    /**
     * 发送点击信号给后端
     */
    sendMsg: function () {
        var that = this; //重置data{}里数据时候setData方法的this应为这里的this，如果在下方的success直接写this就变成wx.request的this了
        //console.log(wx.getStorageSync('userinfo'))
        wx.request({
            url: 'https://tcb-api.tencentcloudapi.com', //请求地址
            data: {
                url: wx.getStorageSync('web1'),
                userinfo: wx.getStorageSync('userinfo')
            }, //发送给后台的数据

            header: {
                'content-type': 'application/json'
            }, //请求头
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                console.log(res.data); //res.data为后台返回的数据
                that.setData({ //用that而不是this，用this就是success的this就错了
                    //dataList:res.data
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
        var _url = this.data.dataList[e.currentTarget.dataset.index].url
        var _like = this.data.dataList[e.currentTarget.dataset.index].like
        var that = this;
        wx.request({
            url: 'https://tcb-api.tencentcloudapi.com',
            data: {
                url: _url,
                userinfo: wx.getStorageSync('userinfo'),
                like: _like
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                console.log(res.data); //res.data为后台返回的数据
                that.setData({ //用that而不是this，用this就是success的this就错了
                    //dataList:res.data
                })
            },
            fail: function (err) {}, //请求失败
            complete: function () {} //请求完成后执行的函数
        })
    },
    /**
     * 点击跳转文章对应外部页面、该文章点击量+1
     */
    gotoURL: function (e) {
        wx.setStorageSync('web1', this.data.dataList[e.currentTarget.dataset.index].url)
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
            monthFlag: 0,
            specialFlag: 0,
            dailyColor: 'dodgerblue',
            monthColor: 'white',
            specialColor: 'white'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)
        console.log(this.data.monthFlag)
        console.log(this.data.specialFlag)
    },
    /**
     * 设置展示月榜样式
     */
    showMonthList: function (e) {
        this.setData({
            dailyFlag: 0,
            monthFlag: 1,
            specialFlag: 0,
            dailyColor: 'white',
            monthColor: 'dodgerblue',
            specialColor: 'white'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)
        console.log(this.data.monthFlag)
        console.log(this.data.specialFlag)
    },
    /**
     * 设置展示专区样式
     */
    showSpecialArea: function (e) {
        this.setData({
            dailyFlag: 0,
            monthFlag: 0,
            specialFlag: 1,
            dailyColor: 'white',
            monthColor: 'white',
            specialColor: 'dodgerblue'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)
        console.log(this.data.monthFlag)
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
        wx.request({
            url: 'https://tcb-api.tencentcloudapi.com', //请求地址
            data: {
                dailyFlag: that.data.dailyFlag,
                monthFlag: that.data.monthFlag,
                specialFlag: that.data.specialFlag,
                classify: that.data.classify
            }, //发送给后台的数据
            header: {
                'content-type': 'application/json'
            }, //请求头
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                console.log(res.data); //res.data为后台返回的数据
                that.setData({ //用that而不是this，用this就是success的this就错了
                    //dataList:res.data
                })
            },
            fail: function (err) {}, //请求失败
            complete: function () {} //请求完成后执行的函数
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMsg();
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