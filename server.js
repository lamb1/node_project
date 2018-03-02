/**
 * Created by xuxiaoshan on 2017/7/18.
 */
const http = require('http');

const server = http.createServer((req, res) => {
        res.end();
});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000,function () {
    console.log('服务器启动成功，端口号：'+8000)
});