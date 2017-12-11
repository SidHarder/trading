var journal = require('./journal')

module.exports = {
  openingBalance: 0,
  journal: journal,
  currentBalance: journal.currentBalance,
  initialize: function (initialStake) {
    this.openingBalance = initialStake
    journal.add(initialStake, new Date())
  }
}
