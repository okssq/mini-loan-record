const util = require('../../utils/util.js')

Page({
  data: {
    bills: util.bills,
  },
  // 事件处理函数
  viewBillDetail(e) {
    const {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../bill-detail/index?id=${id}`,
    })
    console.log(id)
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },
})