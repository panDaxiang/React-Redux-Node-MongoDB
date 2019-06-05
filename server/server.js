const express = require('express');
const app = express();
// 处理POST请求过来的body内容
const bodyParser = require('body-parser');
app.use(bodyParser.json())


// 允许跨域
app.use('/', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  // res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  // res.header('Content-Type', 'application/json;charset=utf-8');

  if(req.method.toLocaleLowerCase() === 'options'){
    res.status(204);
    return res.json({});   //直接返回空数据，结束此次请求
  }else{
      next();
  }
})

// 路由/user
const userRouter = require('./user');
app.use('/user', userRouter);

// 服务启动
app.listen(9001, () => {
  console.log('server start at port 9001')
});