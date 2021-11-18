let timeId = null;
// 获取后台数据函数
function getSearch(callback) {
    //用wx.request直接请求api
    wx.request({
        url: 'https://api.github.com/search/repositories',// 查询库api
        data: {
            q: getApp().search,//输入的关键字
            per_page: 15,   //分页-每页包含的数量
            page: pageNum,  //要查询的页数，pageNum为1
            client_id: "GitHub Search",
            client_secret: "0067e8e5bbbde8e9553cc2d69504b859d3218b5c"
        },
        method: 'GET',
        dataType: 'jsonp',
        header: {
            'content-type': 'application/json'
        },
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
    });
}
var pageNum = 1;
var start= false;

Page({
    data: {
        // 搜索历史
        num:'1',
        history: [],
        list:[],
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
            that.setData({
                num: dataTmp.total_count,
                result: dataTmp.items
            });
            // 关闭等待窗口
            wx.hideLoading();
        })
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

    // // 触底
    
    // onReachBottom: function () {
        // this.setData({
        //     isHideLoadMore: false,
        // })
    //     console.log('加载更多');
    //     var list;
    //     console.log(list);
    //     setTimeout(() => {
    //       this.setData({
    //         isHideLoadMore: true,
    //         list: [
    //             {
    //                 id: 6,
    //                 url: '../demo5/demo5',
    //                 title: 'javaScript1',
    //                 text:'************************',
    //                 writer:'yuanP',
    //                 pointNum:'1000',
    //                 like: true,
    //                 islike: false,
    //             },
    //             {
    //                 id: 7,
    //                 url: '../demo6/demo6',
    //                 title: '月刊2',
    //                 text:'************************',
    //                 writer:'农P',
    //                 pointNum:'2000',
    //                 like: true,
    //                 islike: false,
    //             },
    //             {
    //                 id: 8,
    //                 url: '../demo5/demo5',
    //                 title: 'javaScript3',
    //                 text:'************************',
    //                 writer:'yuanP',
    //                 pointNum:'1000',
    //                 like: true,
    //                 islike: false,
    //             },
    //             {
    //                 id: 9,
    //                 url: '../demo6/demo6',
    //                 title: 'javaScript4',
    //                 text:'************************',
    //                 writer:'yuanP',
    //                 pointNum:'1000',
    //                 like: true,
    //                 islike: false,
    //             },
    //             {
    //                 id: 10,
    //                 url: '../demo6/demo6',
    //                 title: 'javaScript5',
    //                 text:'************************',
    //                 writer:'yuanP',
    //                 pointNum:'1000',
    //                 like: true,
    //                 islike: false,
    //                 match:false,
    //             },
    //         ],
    //       })
    //       list=this.data.list;
    //       this.setData({
    //           result:this.data.result.concat(list),
    //       })
    //     }, 1000)
    //   },
    
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
            var tmp = that.data.result.concat(dataTmp.items);
            that.setData({
                result: tmp
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
            that.setData({
                num: dataTmp.total_count,
                result: dataTmp.items
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
        var that=this;
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
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        result[index].islike=true;
        result[index].like=false;
        this.setData({
            result:result,
        });
    },
    // 取消喜欢
    cancelLike(e)
    { 
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var result=this.data.result;
        result[index].islike=false;
        result[index].like=true;
        this.setData({
            result:result,
        });
    },
    // 跳转页面
    gotoURL: function (e) {
        console.log(e)
        wx.setStorageSync('web1', this.data.result[e.currentTarget.dataset.index].html_url)
        console.log(wx.getStorageSync('web1'))
        wx.navigateTo({
            url: '../out/out'
        })
    },
    

    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }

    }
})


