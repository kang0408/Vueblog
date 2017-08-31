var formidable = require('formidable')
var fs = require('fs')
var express = require('express')
var common = require('../../commonconfig')
var router = express.Router()

router.post('/upload', function (req, res) {
  // 图片上传
  var uploadfolderpath = global.__dirname + '/disk/uploadfiles/'

  var formParse = new formidable.IncomingForm()
  formParse.uploadDir = global.__dirname + '/temp' // 缓存地址
  formParse.multiples = true // 设置为多文件上传
  formParse.keepExtensions = true // 是否包含文件后缀
  var files = []
  /*
   *文件都将保存在files数组中
   */
  formParse.on('file', function (filed, file) {
    files.push([filed, file])
  })
  formParse.parse(req, function (error, fields, files) {
    if (error) {
      console.log('error' + error.message)
      res.status(500)
      res.end()
      return
    }
    /*
     * files.uuu[k]里保存着用户所上传的文件
     */
    var data = {}
    for (var k in files) {
      var fileName = files[k].name
      var fileUrl = uploadfolderpath + fileName.split('.')[0] + new Date().getTime() + '.' + fileName.split('.')[1]
      // var useUrl = uploadfolderpath + fileName.split('.')[0] + new Date().getTime() + '.' + fileName.split('.')[1]
      fs.renameSync(files[k].path, fileUrl)
      fs.unlink(files[k].path, function () {
      })
      data[k] = fileUrl.replace(global.__dirname + '/disk', common)
    }
    var result = {
      'status': 200,
      'data': data,
      'msg': ''
    }
    console.log(result)
    res.status(200).json(result)
    res.end()
  })
})

module.exports = router
