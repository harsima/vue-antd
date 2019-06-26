const express = require('express')
const routes = require('./services')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
const serverPort = config.port || '9091'

// 请求体解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 跨域配置
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// 注册路由
routes(app)

app.listen(serverPort, () => {
  console.log('mock-server启动，监听端口：' + serverPort)
})
