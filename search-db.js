'use strict'

const fixWhiteSpace = require('./fix-white-space.js')

module.exports = function (db, queryValue, callback) {
  const userQuery = fixWhiteSpace(queryValue)
  console.log(userQuery)
  let query
  if (/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/.test(userQuery)) {
    query = {ip: userQuery}
  } else {
    callback(null, 'Not an IP')
    return
  }
  db.collection('bgpNeighbors').find(query, {_id: 0}).toArray(function (err, documents) {
    if (err) {
      console.log('A db query error occured')
      callback(err, null)
    }
    let response
    if (documents.length > 0) {
      response = documents[0]
    } else {
      response = 'Not Found'
    }
    callback(null, response)
  })
}