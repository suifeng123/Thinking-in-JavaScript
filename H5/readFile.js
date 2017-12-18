//进行文件异步操作
var fs = require('fs');

fs.readFile('/path',function(err,file){
    console.log('完成了文件操作');
    })
