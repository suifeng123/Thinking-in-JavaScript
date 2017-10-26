/**
 * Created by Administrator on 2017/7/10.
 */
var scope = 'global';
var f = function() {
    console.log(scope);
    var scope = 'f';
};
f();