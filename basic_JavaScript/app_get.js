/**
 * Created by Administrator on 2017/6/27.
 */
var http = require('htpp');
//创建HTTP服务器
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World\n'+req.method);
}).listen(1337,'127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');