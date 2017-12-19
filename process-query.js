'use strict'

const searchDB = require('./search-db.js')
const answer = require('./send-answer.js')

module.exports = (db, req, res) =>
  searchDB(db, req.params.query, res.send(answer))