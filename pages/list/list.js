// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dailyColor:'dodgerblue',
        monthColor:'white',
        specialColor:'white',
        dailyFlag:1,
        monthFlag:0,
        specialFlag:0,
        classify:0,
        dailyList:[{
            url:'https://tcb-api.tencentcloudapi.com',
            title:'标题1',
            synopsis:'efghijklmnopqrstfdiafushafuoehwiofhoidshaoifhefhuvwxyz',
            platform:'CSDN',
            click:1,
            rank:0
        },{
            url:'https://www.bilibili.com/',
            title:'title b',
            synopsis:'synopsis b',
            platform:'Github',
            click:2,
            rank:1
        },{
            url:'c',
            title:'title c',
            synopsis:'synopsis c',
            platform:'openSouce',
            click:3,
            rank:2
        },{
            title:'title a',
            synopsis:'synopsis a',
            platform:'platform a',
            click:1,
            rank:0
        },{
            title:'title b',
            synopsis:'synopsis b',
            platform:'platform b',
            click:2,
            rank:1
        },{
            title:'title c',
            synopsis:'synopsis c',
            platform:'platform c',
            click:3,
            rank:2
        },{
            title:'title a',
            synopsis:'synopsis a',
            platform:'platform a',
            click:1,
            rank:0
        },{
            title:'title b',
            synopsis:'synopsis b',
            platform:'platform b',
            click:2,
            rank:1
        },{
            title:'title c',
            synopsis:'synopsis c',
            platform:'platform c',
            click:3,
            rank:2
        }],
        monthList:[{
            url:'https://goole.com/',
            title:'title d',
            synopsis:'synopsis d',
            platform:'platform d',
            click:4,
            rank:0
        },{
            title:'title e',
            synopsis:'synopsis e',
            platform:'platform e',
            click:5,
            rank:1
        },{
            title:'title f',
            synopsis:'synopsis f',
            platform:'platform f',
            click:6,
            rank:2
        }],
        specialList:[{
            url:'https://www.qq.com/',
            title:'classA',
            synopsis:'asdfafdsaf',
            platform:'bilibili',
            click:1,
            class:1,
        },{
            title:'classB',
            synopsis:'dsaffb',
            platform:'CCTV',
            click:2,
            class:2
        },{
            title:'classC',
            synopsis:'c',
            platform:'csdn',
            click:3,
            class:3
        },{
            title:'classd',
            synopsis:'c',
            platform:'agefans',
            click:3,
            class:1
        }]
    },
    gotodailyUrl:function(e){
        wx.setStorageSync('web1',this.data.dailyList[e.currentTarget.dataset.index].url);
        console.log(wx.getStorageSync('web1'));
        wx.navigateTo({
          url:'/pages/out/out'
        })
    },
    gotomonthUrl:function(e){
        wx.setStorageSync('web1',this.data.monthList[e.currentTarget.dataset.index].url);
        console.log(wx.getStorageSync('web1'));
        wx.navigateTo({
          url:'/pages/out/out'
        })
    },
    gotoSpecialUrl:function(e){
        wx.setStorageSync('web1',this.data.specialList[e.currentTarget.dataset.index].url);
        console.log(wx.getStorageSync('web1'));
        wx.navigateTo({
          url:'/pages/out/out'
        })
    },
    gotoSearch:function(){
        wx.navigateTo({
            url: '/pages/search/search'
          })
    },
    showDailylist:function(e){
        this.setData({
            dailyFlag:1,
            monthFlag:0,
            specialFlag:0,
            dailyColor:'dodgerblue',
            monthColor:'white',
            specialColor:'white'
        })
    },
    showMonthList:function(e){
        this.setData({
            dailyFlag:0,
            monthFlag:1,
            specialFlag:0,
            dailyColor:'white',
            monthColor:'dodgerblue',
            specialColor:'white'
        })
    },
    showSpecialArea:function(e){
        this.setData({
            dailyFlag:0,
            monthFlag:0,
            specialFlag:1,
            dailyColor:'white',
            monthColor:'white',
            specialColor:'dodgerblue'
        })
    },
    classification1:function(e){
        this.setData({
            classify:1
        })
    },
    classification2:function(e){
        this.setData({
            classify:2
        })
    },
    classification3:function(e){
        this.setData({
            classify:3
        })
    },
    getMsg:function(){
        wx.request({
          url: 'https://tcb-api.tencentcloudapi.com',
          data:{

          },
          method:'GET',
        //   header:{
        //       'content-type':'application/json'
        //   },
          success(res){
              console.log(res.data);
              this.setData({
                //   'dailyList[0].url':res.data
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMsg();
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