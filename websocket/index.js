const ws = require('nodejs-websocket');

ws.createServer(function (conn) {
  conn.on('text', function (str) {
    const obj = JSON.parse(str);

    conn.sendText(
      JSON.stringify({
        type: 0,
        payload: {
          msg: '收到',
        },
      })
    );
  });

  conn.on('close', function (code, reason) {
    console.log('关闭连接');
  });

  conn.on('error', function (code, reason) {
    console.log('异常关闭');
  });

  // 连接成功后发送消息
  conn.sendText(
    JSON.stringify({
      type: 0,
      message: 'welcome back!',
    })
  );
}).listen(8888);

console.log('WebSocket建立完毕，ws://localhost:8888');
