'use strict'

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const searchDB = require('./search-db')

// Connect to database first
MongoClient.connect(process.env.DATABASE_URL, function (err, db) {
  assert.equal(null, err)
  console.log('Successfully connected to MongoDB.')

  // Routes
  app.use('/public', express.static(process.cwd() + '/public'))

  app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
  })

  app.get('/neighbor/:query', function (req, res) {
    searchDB(db, req.params.query, function (err, answer) {
      if (err) {
        throw err
      }
      // return json to user, using the code provided in the answer variable
      res.send(answer)
    })
  })
  // Respond not found to all the wrong routes
  app.use(function (req, res, next) {
    res.status(404)
    res.type('txt').send('Not found')
  })

  // Error Middleware
  app.use(function (err, req, res, next) {
    if (err) {
      res.status(err.status || 500)
        .type('txt')
        .send(err.message || 'SERVER ERROR')
    }
  })

  app.listen(process.env.PORT, function () {
    console.log('Node.js listening on port ' + process.env.PORT)
  })
})
