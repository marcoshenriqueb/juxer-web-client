var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"' + process.env.API_LOCATION + '"',
  SOCKET_LOCATION: '"' + process.env.SOCKET_LOCATION + '"',
  FACEBOOK_ID: '"' + process.env.FACEBOOK_ID + '"',
})
