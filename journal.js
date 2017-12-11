module.exports = {
  currentBalance: 0,
  items: [],
  add: function (amount, date) {
    var journalItem = {
      amount: amount,
      date: date
    }
    this.currentBalance += amount;
    this.items.push(journalItem)
  }
}
