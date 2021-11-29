const util = require('../../utils/util.js')

Page({
  data: {
    todayCount: 0,
    monthCount: 0,
    toDayList: [],
    monthList: [],
    month:0, 
    day:0
  },

  viewBillDetail(e) {
    const {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/bill-detail/index?id=${id}`,
    })
    console.log(id)
  },

  getBillStats() {
    const {year, month, day} = util.getYearMonthDay()
    let todayCount = 0
    let monthCount = 0
    let todayList = []
    let monthList = []
    util.bills.forEach(el => {
      const {hklb} = el
      hklb.forEach(_el => {
      const [a, b, c] = _el['day'].split('/')
        if (a != year || b != month + 1) return
        if (c == day) {
          const {id,label} = el
          const {count} = _el
          todayList.push({id,label,count})
          todayCount += count
        }
        if (c >= day) {
          const {id,label} = el
          const {count} = _el
          const dayStr = `${a}/${b}/${c}`
          monthList.push({
            id,
            label,
            count,
            day: c,
            dayStr
          })
          monthCount += count
        }
      })
    })
    monthList.sort((a, b) => a['day'] - b['day'])
    return {
      todayCount,
      monthCount,
      todayList,
      monthList,
      month, day
    }
  },


  onLoad() {
    const {todayCount,monthCount,todayList,monthList,month, day} = this.getBillStats()
    this.setData({todayCount,monthCount,todayList,monthList,month, day})
    console.log(todayCount,monthCount,todayList,monthList)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },
})