const util = require('../../utils/util.js')

Page({
  data: {
    bill: null,
    totalPeriod: 0,
    returnedPeriod: 0,
    remainCount: 0,
    notPaidList: [],
    returnedList: [],
  },

  getTemplateData(list) {
    const {year,month,day} = util.getYearMonthDay()
    let returnedLength = 0
    const length = list.length
    for (let i = 0; i < length; i++) {
      const [a, b, c] = list[i]['day'].split('/')
      if (a > year) break
      if (a == year) {
        if (b > month + 1) break
        if (b == month + 1) {
          if (c >= day) break
          returnedLength++
          break
        } else {
          returnedLength++
        }
      } else {
        returnedLength++
      }
    }

    let remainCount = 0
    const notPaidList = []
    const returnedList = []
    list.forEach((el, index) => {
      if (index < returnedLength) {
        returnedList.push(el)
      } else {
        remainCount += el.count
        notPaidList.push(el)
      }
    })

    return {
      remainCount,
      notPaidList,
      returnedList,
    }
  },

  onLoad(options) {
    const {id} = options
    const bill = util.bills.find(el => id == el['id'])
    const { hklb, ...billObj } = bill
    const {
      remainCount,
      notPaidList,
      returnedList,
    } = this.getTemplateData(hklb)

    this.setData({
      bill: billObj,
      totalPeriod: hklb.length,
      returnedPeriod: returnedList.length,
      remainCount,
      notPaidList,
      returnedList,
    })
    console.log(remainCount, notPaidList, returnedList)
  }
})