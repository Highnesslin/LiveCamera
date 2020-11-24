const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

// 跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

/**
 * 授权
 */
app.get('/im/imserver', ({ query }, res) => {
  console.log('req', query.groupid);

  res.json({
    data: {
      ip: '127.0.0.1',
      port: 8888,
    },
  });
});

app.listen(10087, () => {
  console.log('localhost:10087 服务启动');
});
