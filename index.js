Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:['../../images/banner1.png','../../images/banner2.png'],
    indexConfig:[
     {
        icon:'../../images/kuaidi.png',
        text:'快递代取',
        url:'../getExpress/getExpress'
     },
     {
      icon:'../../images/dayin.png',
      text:'帮忙打印',
      url:'../print/print'
     },

     {
      icon:'../../images/paotui.png',
      text:'校园跑腿',
      url:'../run/run'
     },
     {
      icon:'../../images/daiji.png',
      text:'快递代寄',
      url:'../expressReplace/expressReplace'
     },
     {
      icon:'../../images/zujie.png',
      text:'物品租借',
      url:'../lease/lease'
     },
     {
      icon:'../../images/youxi.png',
      text:'游戏陪玩',
      url:'../playGame/playGame'
     },
     {
      icon:'../../images/bangsong.png',
      text:'帮送物品',
      url:'../helpMeGive/helpMeGive'
     },
     {
      icon:'../../images/hezuo.png',
      text:'合作项目',
      url:'../replaceMe/replaceMe'
     },
     {
      icon:'../../images/qita.png',
      text:'其他内容',
      url:'../otherHelp/otherHelp'
     },

  


    ]
  },

  toDetail(e) {
    const userInfo = wx.getStorageSync('userInfo');
    const url = e.currentTarget.dataset.url;
    if (userInfo) {
      wx.navigateTo({
        url,
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请前往个人中心登录',
      })
    }
  },

  handClickNotice (){
   wx.showModal({
     cancelColor: 'cancelColor',
     title:'公告',
     content:'欢迎大家使用“校园帮”小程序！'
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const openid = wx.getStorageSync('openid');
        if (!openid) {
          wx.cloud.callFunction({
          name: 'UserOpenId',
          success: (res) => {
            const {
              openid
            } = res.result;
            wx.setStorageSync('openid', openid);
          }
        })
      }
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