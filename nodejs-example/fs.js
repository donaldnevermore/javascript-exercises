'use strict'
let fs = require('fs')
/* 读取文件 */
fs.readFile('sample.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
// 读取 图片 
fs.readFile('swift.png', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
    console.log(data.length + 'bytes')
  }
})
// 写入 文件 
let data = 'Hello,Node.js'
fs.writeFile('output.txt', data, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('ok!')
  }
})
//获取文件信息
fs.stat('output.txt', function (err, stat) {
  if (err) {
    console.log(err)
  } else {
    console.log('isFile: ' + stat.isFile())
    console.log('isDirectory: ' + stat.isDirectory())
    if (stat.isFile()) {
      console.log('size: ' + stat.size)
      console.log('birth  time: ' + stat.birthtime)
      console.log('modified time: ' + stat.mtime)
    }
  }
})