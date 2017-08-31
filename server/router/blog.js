var express = require('express')
var router = express.Router()
var mongoose = require('../db/db.js')

/**
 * blog集合
 */
var Blogs = mongoose.model('blogs', new mongoose.Schema({
  title: String,
  ctime: Number,
  txt: String,
  read: Number,
  tags: Array,
  showtxt: String,
  hot: Boolean
}))
/**
 * 标签
 */
var Tag = mongoose.model('tags', new mongoose.Schema({
  names: Array
}))

/**
 * 访客统计
 */
var Visit = mongoose.model('visit', new mongoose.Schema({
  time: Date,
  ip: String
}))

// 添加访客
router.get('/home/visit', function (req, res) {
  // console.log(req.connection.remoteAddress)
  var myDate = new Date()
  var visIp = {
    time: myDate,
    ip: req.connection.remoteAddress
  }
  new Visit(visIp).save((err) => {
    if (err) {
      res.status(200).json({
        'status': 400,
        'data': [],
        'msg': '插入访问记录失败'
      })
    } else {
      res.status(200).json({
        'status': 200,
        'msg': '访客添加成功'
      })
    }
  })
})
// 添加博客
router.post('/comp/add', function (req, res) {
  var tallArr = req.body.talls.split('-')
  var radNum = Number(req.body.read)
  var textObj = {
    title: req.body.title,
    preface: req.body.preface,
    txt: req.body.txt,
    ctime: new Date(),
    talls: tallArr,
    read: radNum,
    showtxt: req.body.showtxt
  }
  new Blogs(textObj).save((err) => {
    if (err) {
      res.status(200).json({
        'status': 400,
        'data': [],
        'msg': '写博客失败'
      })
    } else {
      console.log('博客发表成功')
      res.status(200).json({
        'status': 200,
        'data': [],
        'msg': '预约成功'
      })
    }
  })
})
// 所有博客列表
router.get('/home/list', function (req, res) {
  var num = Number(req.query.num)
  var page = Number(req.query.page)
  Blogs.find({
      hot: true
    }).sort({
      'ctime': -1
    }).skip((page - 1) * num).limit(num).select('_id title preface ctime read tags showtxt')
    .exec(function (err, data) {
      if (err) {
        console.log(err)
        res.status(200).json({
          'status': 400,
          'data': '读取失败'
        })
      } else {
        res.status(200).json({
          'status': 200,
          'data': data
        })
      }
    })
})
// 查询博客详情
router.post('/home/find_details', function (req, res) {
  var id = req.body.id
  Blogs.findOne({
    _id: id
  }, function (err, data) {
    if (err) {
      console.log(err)
      res.status(200).json({
        'status': 400,
        'data': '读取失败'
      })
    } else {
      res.status(200).json({
        'status': 200,
        'data': data
      })
    }
  })
})
// 更新阅读次数
router.post('/home/read', function (req, res) {
  var num = req.body.num
  var idStr = req.body.id
  Blogs.update({
    _id: idStr
  }, {
    read: num
  }, function (err, data) {
    if (err) {
      res.status(200).json({
        'status': 400,
        'data': '阅读次数更新失败'
      })
    } else {
      res.status(200).json({
        'status': 200,
        'data': data
      })
    }
  })
})
// 根据标签云查询blog
router.post('/home/find_arc', function (req, res) {
  var arcStr = req.body.arcstr
  Blogs.find({
    'talls': {
      $all: [arcStr]
    }
  }, function (err, data) {
    if (err) {
      console.log(err)
      res.status(200).json({
        'status': 400,
        'data': '读取失败'
      })
    } else {
      res.status(200).json({
        'status': 200,
        'data': data
      })
    }
  })
})
// 查询所有标签
router.get('/tag/list', function (req, res) {
  Tag.count({}, function (err, count) {
    Tag.find({}).exec(function (err, data) {
      if (err) {
        console.log(err)
        res.status(200).json({
          'status': 400,
          'data': '读取失败'
        })
      } else {
        res.status(200).json({
          'status': 200,
          'data': data,
          'tatal': count
        })
      }
    })
  })
})
// 添加标签云
router.post('/tag/add', function (req, res) {
  var nameStr = req.body.tagstr
  var tagObj = {
    names: nameStr
  }
  Tag.find({}).exec(function (err, data) {
    if (err) {
      console.log(err)
      res.status(200).json({
        'status': 400,
        'data': '读取失败'
      })
    } else {
      if (data.length > 0) {
        Tag.update({
          '_id': data[0]._id
        }, {
          $push: {
            'names': nameStr
          }
        }, function (err, data) {
          if (err) {
            res.status(200).json({
              'status': 400,
              'data': [],
              'msg': '写博客失败'
            })
          } else {
            res.status(200).json({
              'status': 200,
              'msg': '标签云更新成功'
            })
          }
        })
      } else {
        new Tag(tagObj).save((err) => {
          if (err) {
            res.status(200).json({
              'status': 400,
              'data': [],
              'msg': '写博客失败'
            })
          } else {
            console.log('标签云添加成功')
            res.status(200).json({
              'status': 200,
              'msg': '预约成功'
            })
          }
        })
      }
    }
  })
})

module.exports = router
