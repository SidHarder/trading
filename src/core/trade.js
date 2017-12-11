var dateFormat = require('dateformat')

module.exports = {
  buy: function (quantity, price, dateEpoch, account) {
    var d = dateFormat(new Date(0).setUTCSeconds(dateEpoch), 'mm/dd/yyyy hh:MM')
    var trade = {
      type: 'buy',
      price: price,
      date: d,
      quantity: quantity
    }

    var amount = price * quantity
    account.journal.add(amount, d)
    return trade
  },
  sell: function (quantity, price, dateEpoch, account) {
    var d = dateFormat(new Date(0).setUTCSeconds(dateEpoch), 'mm/dd/yyyy hh:MM')
    var trade = {
      type: 'sell',
      price: price,
      eate: d,
      quantity: quantity
    }
    var amount = price * quantity
    account.journal.add(amount, d)
    return trade
  }
}
