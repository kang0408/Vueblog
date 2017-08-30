var express = require('express')
var router = express.Router()
var mongoose = require('../db/db.js')

/**
 * 账户集合  默认账户 admin  密码 123456
 */
var User = mongoose.model('user', new mongoose.Schema({
  account: String,
  password: String
}))

/**
 * 登录
 */
router.post('/login', function (req, res) {
  var aot = req.body.name
  var pwd = req.body.passwd
  if (!aot || !pwd) {
    res.json({
      'status': 400,
      'msg': '用户名密码不能为空'
    })
    res.end()
    return
  }
  User.findOne({
    account: aot,
    password: pwd
  }, function (err, data) {
    if (err) {
      res.status(200).json({
        'status': 400,
        'data': [],
        'msg': '登录失败！'
      })
    } else {
      if (data == null) {
        res.status(200).json({
          'status': 205,
          'msg': '账号密码错误'
        })
      } else {
        res.status(200).json({
          'status': 200,
          'msg': '登录成功',
          'data': data
        })
      }
    }
  })
})

/**
 * 登录
 */
router.post('/register', function (req, res) {
  var aot = req.body.account
  var pwd = req.body.password
  var userinfo = {
    account: aot,
    password: pwd
  }
  new User(userinfo).save((err) => {
    if (err) {
      res.status(200).json({
        'status': 400,
        'data': [],
        'msg': '注册失败'
      })
    } else {
      res.status(200).json({
        'status': 200,
        'msg': '注册成功'
      })
    }
  })
})

module.exports = router
