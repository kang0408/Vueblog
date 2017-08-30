var express = require('express')
var router = express.Router()
var mongoose = require('../db/db.js')
var formidable = require('formidable')
var fs = require('fs')

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
// 查询归档日期列表
router.get('/home/find_details_files', function (req, res) {
  var timeArr = []
  var numArr = []
  Blogs.find({}).select('ctime')
    .exec(function (err, data) {
      data.forEach(function (ele, index) {
        var now = new Date(ele.ctime)
        var year = now.getYear() - 100
        var month = now.getMonth() + 1
        month = month > 9 ? month : '0' + month
        switch (month) {
          case '01':
            month = '一月'
            break
          case '02':
            month = '二月'
            break
          case '03':
            month = '三月'
            break
          case '04':
            month = '四月'
            break
          case '05':
            month = '五月'
            break
          case '06':
            month = '六月'
            break
          case '07':
            month = '七月'
            break
          case '08':
            month = '八月'
            break
          case '09':
            month = '九月'
            break
          case '10':
            month = '十月'
            break
          case '11':
            month = '十一月'
            break
          case '12':
            month = '十二月'
            break
          default:
            break
        }
        var tStr = month + '  20' + year
        timeArr.push(tStr)
        if (timeArr.length == data.length) {
          var _ones = []
          for (var i = 0; i < timeArr.length;) {
            var count = 0
            for (var j = i; j < timeArr.length; j++) {
              if (timeArr[i] == timeArr[j]) {
                count++
              }
            }
            _ones.push([timeArr[i], count])
            i += count
          }
          var _newArr = []
          for (var i = 0; i < _ones.length; i++) {
            _newArr.push({
              time: _ones[i][0],
              num: _ones[i][1]
            })
          }
          if (err) {
            console.log(err)
            res.status(200).json({
              'status': 400,
              'data': '读取失败'
            })
          } else {
            res.status(200).json({
              'status': 200,
              'data': _newArr
            })
          }
        }
      })
    })
})
// 根据归档日期查询blog
router.post('/home/find_tags', function (req, res) {
  var timeStr = req.body.time
  var yearStr = timeStr.split('  ')[1]
  var mountStr = timeStr.split('  ')[0]
  var month = ''
  var yearDate = ''
  if (yearDate % 4 == 1) {
    switch (mountStr) {
      case '一月':
        month = '01'
        yearDate = '31'
        break
      case '二月':
        yearDate = '29'
        month = '02'
        break
      case '三月':
        yearDate = '31'
        month = '03'
        break
      case '四月':
        yearDate = '30'
        month = '04'
        break
      case '五月':
        yearDate = '31'
        month = '05'
        break
      case '六月':
        yearDate = '30'
        month = '06'
        break
      case '七月':
        yearDate = '31'
        month = '07'
        break
      case '八月':
        month = '08'
        yearDate = '31'
        break
      case '九月':
        month = '09'
        yearDate = '30'
        break
      case '十月':
        month = '10'
        yearDate = '31'
        break
      case '十一月':
        yearDate = '30'
        month = '11'
        break
      case '十二月':
        yearDate = '31'
        month = '12'
        break
      default:
        break
    }
  } else {
    switch (mountStr) {
      case '一月':
        month = '01'
        yearDate = '31'
        break
      case '二月':
        yearDate = '28'
        month = '02'
        break
      case '三月':
        yearDate = '31'
        month = '03'
        break
      case '四月':
        yearDate = '30'
        month = '04'
        break
      case '五月':
        yearDate = '31'
        month = '05'
        break
      case '六月':
        yearDate = '30'
        month = '06'
        break
      case '七月':
        yearDate = '31'
        month = '07'
        break
      case '八月':
        month = '08'
        yearDate = '31'
        break
      case '九月':
        month = '09'
        yearDate = '30'
        break
      case '十月':
        month = '10'
        yearDate = '31'
        break
      case '十一月':
        yearDate = '30'
        month = '11'
        break
      case '十二月':
        yearDate = '31'
        month = '12'
        break
      default:
        break
    }
  }
  var ctimeString = yearStr + '-' + month + '-01 00:00:00'
  var etimeString = yearStr + '-' + month + '-' + yearDate + ' 00:00:00'
  var ctimestamp = Date.parse(new Date(ctimeString))
  var etimestamp = Date.parse(new Date(etimeString))
  var ctime = Number(ctimestamp)
  var etime = Number(etimestamp)
  Blogs.find({
    'ctime': {
      $gt: ctime,
      $lt: etime
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
// 图片上传
var uploadfoldername = 'uploadfiles'
var uploadfolderpath = __dirname + '/dist/' + uploadfoldername
var inputfilename = 'wangEditorH5File'
router.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm()
  form.uploadDir = './tmp'
  form.parse(req, function (err, fields, files) {
    var file = files[inputfilename]
    var tempfilepath = file.path
    var type = file.type
    // console.log('虚拟地址', tempfilepath)
    var filename = file.name
    var extname = filename.lastIndexOf('.') >= 0 ?
      filename.slice(filename.lastIndexOf('.') - filename.length) :
      ''
    if (extname === '' && type.indexOf('/') >= 0) {
      extname = '.' + type.split('/')[1]
    }
    filename = Math.random().toString().slice(2) + extname
    // console.log(filename)
    var filenewpath = uploadfolderpath + '/' + filename
    // console.log('存储地址', filenewpath)
    fs.rename(tempfilepath, filenewpath, function (err) {
      var result = ''
      if (err) {
        console.log('fs.rename err')
        result = 'error|save error'
      } else {
        // 保存成功
        // console.log('fs.rename done')
        // 拼接图片url地址
        result = 'http://' + global.logIp + ':' + global.logport + '/' + uploadfoldername + '/' + filename
      }
      // 返回结果
      res.writeHead(200, {
        'Content-type': 'text/html'
      })
      res.end(result)
    })
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
