/**
 * Created by Administrator on 2017/7/10.
 */
var f = function(){
    var scope = 'f0';
    (function(){
        var scope = 'f1';
        (function(){
            console.log(scope);
        })();
    })()
};
f()