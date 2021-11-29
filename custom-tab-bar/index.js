Component({
  data: {
    selected: 0,
    "list": [{
        "pagePath": "/pages/bill/index",
        "iconPath": "/images/bill.png",
        "selectedIconPath": "/images/bill-active.png",
        "text": "借款列表"
      },
      {
        "pagePath": "/pages/statistics/index",
        "iconPath": "/images/statistics.png",
        "selectedIconPath": "/images/statistics-active.png",
        "text": "待还统计"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      // const idx = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path
      // this.setData({
      //   selected: idx
      // })

      wx.switchTab({url: path})
    }
  }
})