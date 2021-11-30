const util = require('../../utils/util.js')

Page({
  data: {
    bills: [],
  },
  
  
  onLoad() {
    const newArr = util.bills.map(bill => {
      const {hklb,...obj} = bill
      obj.periods = hklb.length
      return obj 
    })
    this.setData({bills:newArr})
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({selected: 0});
    }
  },
  // 事件处理函数
  viewBillDetail(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/bill-detail/index?id=${id}`,
    })
  },
})