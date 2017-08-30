/**
 * Created by LangK on 2016/12/20.
 */

var express = require('express')
var bodyParser = require('body-parser')
var paths = require('path')
var blog = require('./router/blog.js')
var user = require('./router/user.js')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(paths.join(__dirname, '..static/')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/net/', blog)
app.use('/net/user', user)

app.listen(80, function () {
  console.log('server start')
})
