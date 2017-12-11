var level = require('level')
var request = require('request')
var JSONStream = require("JSONStream")
var es = require('event-stream')
var db = level('./mydb')
var _ = require('underscore')

//https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&end=9999999999&period=14400&start=1405699200

request({ url: 'https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&end=9999999999&period=14400&start=1405699200'})
  .pipe(JSONStream.parse())
  .pipe(es.mapSync(function (data) {
    _.each(data, function (item) {
      db.put(item.date, JSON.stringify(item), function (err) {
        if(err) console.log(err)
        console.log('put: ' + item.date)
      })
    })
  }))
