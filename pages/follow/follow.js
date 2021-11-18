// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    newslist:[{
        text:'这是订阅界面内容'
      },{
        text:'这是关注界面内容'
      }
    ],
    ll:[{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"}],
    llf:[{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"},{"f":"月刊名","s":"最新期"}],
    lls:[{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"},{"f":"作者:","s":"最新动态:"}]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 

  onClick:function(event){
    console.log(event.currentTarget.dataset.id)
    var that = this
    if(event.currentTarget.dataset.id=="0"){
      this.setData({
        ll:that.data.llf
      })
    }else{
      this.setData({
        ll:that.data.lls
      })
    }
    console.log(this.data.ll)
    var index = event.currentTarget.dataset.id;
    this.setData({
      current:index
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})