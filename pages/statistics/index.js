const util = require('../../utils/util.js')

Page({
  data: {
    todayCount: 0,
    monthCount: 0,
    toDayList: [],
    monthList: [],
    todayStr: '',
    month: 0,
  },

  viewBillDetail(e) {
    const {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/bill-detail/index?id=${id}`,
    })
  },

  getBillStats() {
    const {
      year,
      month,
      day
    } = util.getYearMonthDay()
    let todayStr
    let todayCount = 0
    let monthCount = 0
    let todayList = []
    let monthList = []
    util.bills.forEach(el => {
      const {hklb} = el
      const {length} = hklb
      for(let i =0;i<length;i++){
        const item = hklb[i]
        const [a, b, c] = item['day'].split('/')
        if(a == year && b == month + 1){
          const dayStr = `${a}/${b}/${c}`
          const {id,label} = el
          const {count} = item
          monthCount += count
          monthList.push({
            id,
            label,
            count,
            day: c,
            dayStr
          })
          if(c==day) {
            todayList.push({id,label,count})
            todayCount += count
          }
          break
        }
      }
    })

    monthList.sort((a, b) => a['day'] - b['day'])
    todayStr= `${year}/${month<8 ? '0'+(month+1) : (month+1)}/${day<8 ? '0'+day : day}`
    return {
      todayCount,
      monthCount,
      todayList,
      monthList,
      todayStr,
      month
    }
  },


  onLoad() {
    const {
      todayCount,
      monthCount,
      todayList,
      monthList,
      todayStr,
      month
    } = this.getBillStats()
    this.setData({
      todayCount,
      monthCount,
      todayList,
      monthList,
      todayStr,
      month
    })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },
})