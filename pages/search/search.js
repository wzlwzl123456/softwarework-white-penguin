let timeId = null;
// 获取后台数据函数
var j=0;
function getSearch(callback) {
    //用wx.request直接请求api
    wx.request({
        url: 'https://whitepenguin.xyz/search',// 查询库api
        data: {
            q: getApp().search,//输入的关键字
            per_page: 15,   //分页-每页包含的数量
            page: pageNum,  //要查询的页数，pageNum为1
            // client_id: "GitHub Search",
            // client_secret: "0067e8e5bbbde8e9553cc2d69504b859d3218b5c"
        },
        method: 'GET',
        dataType: 'jsonp',
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
            // 需要对json字符串格式化
            var dataTmp = JSON.parse(res.data);
            // 调用回调函数
            callback(dataTmp);
            console.log('请求成功',res)
        },
        fail: function (res) {
            // fail，不做什么
        },
        complete: function (res) {
            console.log('请求成功',res)
        }
    })
}
var pageNum = 1;
var start= false;
Page({
    data: {
        openid: wx.getStorageSync('openid'),
        match1:true,
        match2:false,
        gitee:[],
        select:false,
        grade_name:'Github',
        grades: [
          'Github',
          'Gitee'
         ],
        // 搜索历史
        num:'1',
        history: [],
        list:[],
        heart:[],
        isHideLoadMore:true,
        // 热词推送
        hot: ['java', 'c++', 'python','one','tow','three'],
        // 结果
        result: [
        ],
        // 关键词展示
        showKeywords: false,
        // 关键词
        keywords: ['java', 'c++', 'c', 'python','emmm','sdad'],
        // 输入值
        value:'',
        // 搜索结果
        showResult: false,
        isSearch: true,
        like: true,
        islike: false,
        isNULL: false,
    },
     // 取消输入时候showResult: false,showKeywords: false,
    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },

       // 输入操作
       searchInput(e) {
        // 判断是否为空，为空showKeywords:false
        if(!e.detail.value){
            this.setData({
                // showKeywords: false,
                isSearch:true,
                isNULL:true,
            })
        }
       // 不为空时 showKeywords: true
        else{
            this.setData({
                isSearch:false,
            })
            // if(!this.data.showKeywords){
            //     timeId && clearTimeout(timeId);
            //     timeId = setTimeout(() => {
            //         this.setData({
            //             showKeywords: true
            //         })
            //     }, 1000)
            // }
        }
    },
    searchconfirm(e){
        const text = e.detail.value;
        getApp().search = e.detail.value;
        wx.setNavigationBarTitle({
            title: 'Search for ' + getApp().search
        });
        // 在页面加载完成后、得到数据前，打开等待窗口
        wx.showLoading({
            title: '加载中'
        });
        pageNum = 1;
         var that = this;
        getSearch(function (dataTmp) {
            // 更新数据
            dataTmp.items1.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
              dataTmp.items2.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
            that.setData({
                num: dataTmp.total_count,
                gitee: dataTmp.items2,
                result: dataTmp.items1,
            });
            // 关闭等待窗口
            wx.hideLoading();
        });
        // let keywords = this.data.keywords;
        // 判断是否为空，为空showKeywords:false
        if(!e.detail.value){
            this.setData({
                // showKeywords: false,
                isSearch:true,
                isNULL:true,
            })
        }
       // 不为空时 showKeywords: true
        else{
            this.setData({
                value:text,
                isSearch:false,
                // showKeywords:false
            })
            console.log(this.data.value);
            this.historyHandle(text);
            this.setData({
                match:true,
                showResult:true,
            })
        }
    },
     // 触底事件
     onReachBottom: function () {
        this.setData({
            isHideLoadMore: false,
        })
        // 开启标题栏等待样式
        wx.showNavigationBarLoading();
        // 查询下一页
        pageNum++;
        var that = this;
        getSearch(function (dataTmp) {
            // 拼接数据
            dataTmp.items1.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
              dataTmp.items2.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
            var tmp = that.data.result.concat(dataTmp.items1);
            var tmp1 = that.data.gitee.concat(dataTmp.items2);
            that.setData({
                result: tmp,
                gitee: tmp1
            });
            // 关闭标题栏等待样式
            wx.hideNavigationBarLoading();
        });
    },
        onPullDownRefresh:function()
        {
          wx.showNavigationBarLoading() //在标题栏中显示加载
          //模拟加载
          setTimeout(function()
          {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
        },

// 获取输入信息然后设置showKeywords: false, showResult: true
    keywordHandle(e) {
        const text = e.target.dataset.text;
        getApp().search = e.target.dataset.text;
        wx.setNavigationBarTitle({
            title: 'Search for ' + getApp().search
        });
        // 在页面加载完成后、得到数据前，打开等待窗口
        wx.showLoading({
            title: '加载中'
        });
        pageNum = 1;
         var that = this;
        getSearch(function (dataTmp) {
            // 更新数据
            dataTmp.items1.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
            dataTmp.items2.forEach((r) => {  //array是后台返回的数据
                r.islike = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
                r.like = true;
              })
            that.setData({
                num: dataTmp.total_count,
                result: dataTmp.items1,
                gitee: dataTmp.items2
            });
            // 关闭等待窗口
            wx.hideLoading();
        })
        this.setData({
            value: text,
            match:true,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },

 // 存储历史记录
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    // 清理历史记录
    clearHistory()
    {
        let history = this.data.history;
        const length = history.length;
        history.splice(0, length);
        wx.removeStorage({
            key: 'history',
            success: function(res) {
              that.setData({
                storageData: []
              })
            },
          });
        this.setData({
            history
        });
    },
    // 喜欢按钮事件
    tapLike(e){
        console.log(e);
        console.log(wx.getStorageSync('openid'));
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        var _url = result[index].html_url;
        var _title = result[index].name;
        var _openid = this.data.openid;
        console.log(_url);
        console.log(_title);
        console.log(_openid);
        if (this.data.openid == '') {
            wx.showToast({
                title: '请先登录'
            })
        } else {
            var that = this;
            wx.request({
                url: 'https://whitepenguin.xyz/add_user_likes',
                data: { //传递给后端的数据：所点击的URL和用户信息
                    userOpenid: _openid,
                    title: _title,
                    url: _url
                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                    console.log(res.data); //res.data为后台返回的数据
                    that.setData({ //用that而不是this，用this就是success的this就错了
                        //list:res.data.result
                    })
                    wx.showToast({
                        title: '收藏成功'
                    })
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })
        }
        result[index].islike=true;
        result[index].like=false;
        console.log(result);
        this.setData({
            result:result,
        });
    },
    tapLike1(e){
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var gitee=this.data.gitee;
        var _url = gitee[index].html_url;
        var _title = gitee[index].name;
        var _openid = this.data.openid;
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
                    that.setData({ //用that而不是this，用this就是success的this就错了
                        //list:res.data.result
                    })
                    wx.showToast({
                        title: '收藏成功'
                    })
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })
        }
        gitee[index].islike=true;
        gitee[index].like=false;
        console.log(gitee);
        this.setData({
            gitee:gitee,
        });
    },
    // 取消喜欢
    cancelLike(e)
    { 
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        var _url = result[index].html_url;
        var _title = result[index].name;
        var _openid = this.data.openid;
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
                    that.setData({ //用that而不是this，用this就是success的this就错了
                        //list:res.data.result
                    })
                    wx.showToast({
                        title: '取消收藏成功'
                    })
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })

        }
        result[index].islike=false;
        result[index].like=true;
        this.setData({
            result:result,
        });
    },
    cancelLike1(e)
    { 
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var gitee=this.data.gitee;
        var _url = gitee[index].html_url;
        var _title = gitee[index].name;
        var _openid = this.data.openid;
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
                    that.setData({ //用that而不是this，用this就是success的this就错了
                        //list:res.data.result
                    })
                    wx.showToast({
                        title: '取消收藏成功'
                    })
                },
                fail: function (err) {}, //请求失败
                complete: function () {} //请求完成后执行的函数
            })

        }
        gitee[index].islike=false;
        gitee[index].like=true;
        this.setData({
            gitee:gitee,
        });
    },
    // 跳转页面
    gotoURL: function (e) {
        var i;
        console.log(e)
        i=e.currentTarget.dataset.index;
        wx.setStorageSync('web1', this.data.result[e.currentTarget.dataset.index].html_url)
        console.log(wx.getStorageSync('web1'))
        wx.navigateTo({
            url: '../demo4/demo4?like='+this.data.result[i].like+'&islike='+this.data.result[i].islike+'&name='+this.data.result[i].name+'&login='+this.data.result[i].owner.login+'&stargazers_count='+this.data.result[i].stargazers_count+'&forks_count='+this.data.result[i].forks_count+'&watchers_count='+this.data.result[i].watchers_count+'&description='+this.data.result[i].description+'&url='+this.data.result[i].html_url+'&value='+this.data.value+'&desktop='+"Github",
        })
    },
    gotoURL1: function (e) {
        var i;
        console.log(e)
        i=e.currentTarget.dataset.index;
        wx.setStorageSync('web1', this.data.gitee[e.currentTarget.dataset.index].html_url)
        console.log(wx.getStorageSync('web1'))
        wx.navigateTo({
            url: '../demo4/demo4?like='+this.data.gitee[i].like+'&islike='+this.data.gitee[i].islike+'&name='+this.data.gitee[i].name+'&login='+this.data.gitee[i].owner.login+'&stargazers_count='+this.data.gitee[i].stargazers_count+'&forks_count='+this.data.gitee[i].forks_count+'&watchers_count='+this.data.gitee[i].watchers_count+'&description='+this.data.gitee[i].description+'&url='+this.data.gitee[i].html_url+'&desktop='+"Gitee"+'&value='+this.data.value,
        })
    },
    bindShowMsg() {
        this.setData({
         select: !this.data.select
        })
       },
      /**
       * 已选下拉框
       */
       mySelect(e) {
        console.log(e)
        var name = e.currentTarget.dataset.name
        var  i = e.currentTarget.dataset.index
        j = e.currentTarget.dataset.index
        this.setData({
         grade_name: name,
         select: false
        })
        if(i===0)
        {
            this.setData({
                match1:true,
                match2:false,
               })
        }
        if(i===1)
        {
            this.setData({
                match2:true,
                match1:false,
               })
        }
       },
       userLogin: function () {

        var that = this
        //根据code获取openid等信息
        wx.login({
            //获取code
            success: function (res) {
                var code = res.code; //返回code
                console.log(code);
                var appId = 'wx08bdfe75b20beb79'; //小程序的appid
                var secret = 'a41a53dc89852890e9be2c41538b8667'; //小程序的appsecret
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
                            openid: res.data.openid
                        })
                    }
                })
            }
        })

    },

    onLoad() {
        this.userLogin();
        console.log(wx.getStorageSync('openid'));
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})


