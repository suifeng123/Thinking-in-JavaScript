/**
 * Created by Administrator on 2017/6/13.
 */
var each = function(ary,callback) {
    for(var i= 0,l = ary.length;i < l;i++){
        callback.call(ary[i],i,ary[i]);
    }
};

each([1,2,3],function(i,n){
    console.log("一些主要的参数："+i+"dsafas:"+n)
})