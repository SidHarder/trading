var runner = require('./runner')
var dateFormat = require('dateformat')
var trade = require('./trade')
var account = require('./account')

var plan = {
  currentOHLCV: null,
  trades: [],
  count: 0,
  initialize: function (initialStake) {
    account.initialize(initialStake)
  },
  run: function (ohlcv) {
    this.count += 1
    this.currentOHLCV = ohlcv
    var d = dateFormat(new Date(0).setUTCSeconds(ohlcv.date), 'mm/dd/yyyy hh:MM')

    if(this.count == 1) {
      this.firstDate = d
      var quantity = account.journal.currentBalance/ohlcv.open
      var buy = trade.buy(quantity, ohlcv.open, ohlcv.date, account)
      this.trades.push(buy)
    }
  },

  finalize: function (callback) {
    var sell = trade.sell(this.trades[0].quantity, this.currentOHLCV.close, this.currentOHLCV.date, account)
    this.finalStake = this.trades[0].salePrice * this.trades[0].quantity
    this.trades.push(sell)
    callback(null)
  }

}

plan.initialize(10000)
runner.run(plan, function (err) {
  if(err) return console.log(err)
  console.log(account.currentBalance)
})
