// pages/getExpress/getExpress.js
import { getTimeNow } from '../../utils/index';
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      typeList: [
        {
            name: '小件',
            tips: '小件价格3元',
            money:3
        },
        {
            name: '中件',
            tips: '中件价格5元',
            money:5
        },
        {
            name: '大件',
            tips: '大件价格8元',
            money:8
        },
      ],
      typeNow: 0,
      showMore: false,
      isReward: false,
      businessIndex: 0,
      businessArray: ['韵达快递','圆通快递','中通快递','申通快递','邮政快递','京东快递','顺丰快递'],
      numIndex: 0,
      numArray: [1, 2, 3, 4, 5, 6, 7],
      selectBusiness: false,
      address: '',
      business: '',
      expressCode: '',
      codeImg: '',
      remark: '',
      addMoney: '',
      money: 3,
      userInfo: {},
  },

  submit() {
    // 保存this指向
    const that = this.data;
    // 判断必填值有没有填
    // 收件地址、快递单家、收件码或者截图
    if (!that.address || !that.business || !(that.expressCode || that.codeImg)) {
      wx.showToast({
        icon: 'none',
        title: '您填写的信息不全',
      })
      return;
    }
    db.collection('order').add({
      data: {
        // 模块的名字
        name: '快递代取',
        // 当前时间
        time: getTimeNow(),
        // 订单金额
        money: Number(that.money + that.addMoney),
        // 订单状态
        state: '待帮助',
        // 收件地址
        address: that.address,
        // 订单信息
        info: {
          //  快递大小
          size: that.typeList[that.typeNow].name,
          // 快递商家
          business: that.business,
          // 取件码
          expressCode: that.expressCode,
          // 取件码截图
          codeImg: that.codeImg,
          // 备注
          remark: that.remark,
          // 快递数量
          number: that.numArray[that.numIndex],
        },
        // 用户信息
        userInfo: that.userInfo,
        // 用户手机号
        phone: wx.getStorageSync('phone')
      },
      success: (res) => {
        wx.switchTab({
          url: '../index/index',
        })
        wx.showToast({
          title: '发布成功',
        })
      }
    })
  },


  getAddMoeny(e) {
    // e.detail.value取到的是字符串, 需要转成数值类型再进行计算
    this.setData({
      addMoney: Number(e.detail.value)
    })
  },


  getRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  getCode() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({
          title: '加载中',
        })
        const random = Math.floor(Math.random() * 1000);
        wx.cloud.uploadFile({
          cloudPath: `expressCode/${random}.png`,
          filePath: res.tempFilePaths[0],
          success: (res) => {
            let fileID = res.fileID;
            this.setData({
              codeImg: fileID,
            })
            wx.hideLoading();
          }
        })
      },
    })
  },

  getExpressCode(e) {
    this.setData({
      expressCode: e.detail.value
    })
  },

  bindExpressNumChange(e) {
    this.setData({
      numIndex: e.detail.value
    })
  },

  bindBusinessChange(e) {
        this.setData({
              businessIndex: e.detail.value,
              selectBusiness: true
        })
  },

  selectAddress() {
    wx.setStorageSync('urlNow', 'getExpress');
    wx.navigateTo({
      url: '../address/address?url=getExpress',
    })
  },

  selectBusiness() {
    wx.navigateTo({
      url: '../expressBusiness/expressBusiness?url=getExpress',
    })
  },

  handleChangeReward(e) {
      const value = e.detail.value;
      this.setData({
          isReward: value
      })
  },

  showMore() {
      this.setData({
          showMore: !this.data.showMore
      })
  },

  selectType(e) {
    const {
      id,
      tip
    } = e.currentTarget.dataset;
    this.setData({
      typeNow: id,
      money: this.data.typeList[id].money
    })
    wx.showToast({
      icon: 'none',
      title: tip,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
        business
      } = options;
      const address = wx.getStorageSync('addressNow');
      const userInfo = wx.getStorageSync('userInfo');
      if (address) {
        const {
          build,
          houseNumber
        } = address;
        this.setData({
          address: `${build}-${houseNumber}`
        })
      }
      if (business) {
        this.setData({
          business,
        })
      }
      this.setData({
        userInfo,
      })
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