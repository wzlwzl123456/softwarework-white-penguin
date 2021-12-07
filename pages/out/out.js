// pages/out/out.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

        blogText: [{
                content:'title',
                type:1
            },
            {
                content:'content1',
                type:2
            },
            ,
            {
                content:'content2',
                type:2
            }
        ],
        title:'',
        text:'',
        url:'',
        date:''
    },
    getDetail:function(options){
        this.setData({
            text:options.textData,
            title:options.titleData,
            url:options.urlData,
            date:options.dateData
        })
        console.log(wx.getStorageSync('detail'))
        if(wx.getStorageSync('detail')!='0'){
            this.setData({
                text:wx.getStorageSync('detail')
            })
            wx.setStorageSync('detail', 0)
        }
        console.log(this.data.text)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getDetail(options)
       
        


        // var that = this
        // var temp = WxParse.wxParse('text', 'html', that.data.article, that, 5)
        // that.setData({
        //     text: temp
        // })


        let _url = wx.getStorageSync('web1');
        this.setData({
            url: _url
        })
        //console.log(this.data.url);
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