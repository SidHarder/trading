var level = require('level')
var db = level('leveldb')

module.exports = {
    run: function (plan, callback) {
      db.createReadStream()
        .on('data', function (data) {
          var d = new Date(0).setUTCSeconds(data.key)          
          var ohlcv = JSON.parse(data.value)
          plan.run(ohlcv)
        })
        .on('error', function (err) {
          console.log('Oh my!', err)
        })
        .on('close', function () {
          console.log('Stream closed')
        })
        .on('end', function () {
          console.log('Stream ended')
          plan.finalize(callback)
        })
    }
}
