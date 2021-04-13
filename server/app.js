//引入express框架
let express = require('express')
//引入数据库连接模块
let db = require('./db')
var bodyParser = require('body-parser')
//引入业务路由
let app = express()
let businessRouter = require('./util/loginRegister')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const Jwt = require('./util/jwt')
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//数据库连接成功后，注册路由
db.then(() => {
  //使用内置中间件用于获取post请求体参数
  //使用业务路由
  app.use(businessRouter)
}).catch((err) => {
  console.log('数据库连接失败', err)
})
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//绑定端口监听
app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了！！')
  else console.log(err)
})