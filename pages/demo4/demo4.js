// pages/demo4/demo4.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:"",
        desktop:"",
        like:false,
        islike:false,
        name:"sdada",
        login:"xcz123sad",
        stargazers_count:1,
        forks_count:1,
        watchers_count:1,
        description:"萨达萨达萨达撒伟大撒旦",
        url:[]
    },
    copyText: function (e) {
        console.log(e)
        wx.setClipboardData({
          data: e.currentTarget.dataset.text,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '复制成功'
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
        console.log(options.like)
        console.log(options.islike)
        console.log(options.name)
        console.log(options.login)
        console.log(options.stargazers_count)
        console.log(options.forks_count)
        console.log(options.watchers_count)
        console.log(options.description)
        console.log(options.url)
        console.log(options.desktop)
        this.setData({
            like:options.like,
            islike:options.islike,
            name:options.name,
            login:options.login,
            stargazers_count:options.stargazers_count,
            forks_count:options.forks_count,
            watchers_count:options.watchers_count,
            description:options.description,
            url:options.url,
            value:options.value,
            desktop:options.desktop
        })
        console.log(this.data.description)
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