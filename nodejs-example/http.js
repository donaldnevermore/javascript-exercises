'use strict'

// 导入http模块
let http = require('http')
let url = require('url')
let path = require('path')

// 创建htttp server,并传入回调函数
let server = http.createServer(function (request, response) {
  console.log(request.method + ':' + request.url)
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end('<h1>Hello world!</h1>')
})

server.listen(8080)

console.log('Server is running at http://127.0.0.1:8080/')
console.log(url.parse('http://user.pass@host.com:8080/path/to/file?query=string#hash'))

let workDir = path.resolve('.')
let filePath = path.join(workDir, 'pub', 'index.html')

console.log(filePath)