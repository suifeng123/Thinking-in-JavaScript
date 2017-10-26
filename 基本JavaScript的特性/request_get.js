/**
 * Created by Administrator on 2017/6/27.
 */
var request = require('request');
/*应用request方法，获取

 */
request.get('http://127.0.0.1:1337',function(error,response,result){
    console.log(result);
});