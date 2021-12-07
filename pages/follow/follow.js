Page({

    /**
     * 页面的初始数据
     */
    data: {
        dailyColor: '#1F60C3',
        specialColor: 'white',
        dailyFlag: 1,
        specialFlag: 0,
        classify: 1,
        /**
         * 正式版：榜单文章相关数据
         */
        list: [],
        
    },
    /**
     * 发送点击信号给后端
     */
    sendMsg: function () {
        var that = this; //重置data{}里数据时候setData方法的this应为这里的this，如果在下方的success直接写this就变成wx.request的this了
        wx.request({
            url: 'http://127.0.0.1:5000/hotlist', //请求地址（测试）
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
                that.setData({ //用that而不是this，用this就是success的this就错了
                    list: res.data.result
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
        wx.setStorageSync('web1', this.data.list[e.currentTarget.dataset.index].blogUrl)
        console.log(wx.getStorageSync('web1'))
        wx.navigateTo({
           url: '/pages/out/out'
        })
       this.sendMsg()
    },
    
    /**
     * 设置展示订阅样式
     */
    showDailylist: function (e) {
        this.setData({
            dailyFlag: 1,
            specialFlag: 0,
            dailyColor: '#1F60C3',
            specialColor: 'white'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)
        console.log(this.data.specialFlag)
    },
    /**
     * 设置展示关注样式
     */
    showSpecialArea: function (e) {
        this.setData({
            dailyFlag: 0,
            specialFlag: 1,
            dailyColor: 'white',
            specialColor: '#1F60C3'
        })
        this.getMsg()
        console.log(this.data.dailyFlag)

        console.log(this.data.specialFlag)
    },
    
    /**
     * 获取榜单数据
     */
    getMsg: function () {
        var that = this; //重置data{}里数据时候setData方法的this应为这里的this，如果在下方的success直接写this就变成wx.request的this了
        if (this.data.dailyFlag == 1) {
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
                        list: res.data.result
                    })
                    console.log(that.data.list)
                    console.log(that.data.dataList)
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })
        } else if (this.data.specialFlag == 1) {
            if (this.data.classify == 1) {
                wx.request({
                    url: 'http://127.0.0.1:5000/news', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag: this.data.dailyFlag, //为1：要日榜信息
                        monthFlag: this.data.monthFlag, //为1：要月榜
                        specialFlag: this.data.specialFlag, //为1：要专区
                        classify: this.data.classify //表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list: res.data.result
                        })
                        console.log(that.data.list)
                        console.log(that.data.dataList)
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if (this.data.classify == 2) {
                wx.request({
                    url: 'http://127.0.0.1:5000/hotlist', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag: this.data.dailyFlag, //为1：要日榜信息
                        monthFlag: this.data.monthFlag, //为1：要月榜
                        specialFlag: this.data.specialFlag, //为1：要专区
                        classify: this.data.classify //表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list: res.data.result
                        })
                        console.log(that.data.list)
                        console.log(that.data.dataList)
                    },
                    fail: function (err) {}, //请求失败
                    complete: function () {} //请求完成后执行的函数
                })
            }
            if (this.data.classify == 3) {
                wx.request({
                    url: 'http://127.0.0.1:5000/news', //请求地址(测试)
                    data: {
                        //userinfo:wx.getStorageSync('userinfo'),//用户信息
                        dailyFlag: this.data.dailyFlag, //为1：要日榜信息
                        monthFlag: this.data.monthFlag, //为1：要月榜
                        specialFlag: this.data.specialFlag, //为1：要专区
                        classify: this.data.classify //表示专区内分类，1：osChina 2:CSDN 3:github
                    }, //发送给后台的数据
                    header: {
                        'content-type': 'application/json'
                    }, //请求头
                    method: 'GET',
                    dataType: 'json',
                    success: function (res) {
                        //console.log(res.data); //res.data为后台返回的数据
                        that.setData({ //用that而不是this，用this就是success的this就错了
                            list: res.data.result
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