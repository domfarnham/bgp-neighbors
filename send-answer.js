'use strict'

module.exports = (err, answer) =>
  if (err) {
    throw err
  }
  // return json to user, using the code provided in the answer variable
  res.send(answer)