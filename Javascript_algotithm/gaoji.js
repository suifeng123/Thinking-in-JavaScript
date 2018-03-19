/**
 * Created by Administrator on 2017/7/10.
 */
//JavaScript 高级特性1： JavaScript的作用域由函数决定
var v1 = "v1";
var f1 = function() {
    console.log(v1);
};

f1();

var f2 = function() {
    var v1 = "local";
    console.log(v1);
};
f2();