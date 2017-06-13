/**
 * Created by Administrator on 2017/6/13.
 */
(function(){
    var $ = {

    };
    $.myfunction = function(arr){
        console.log("开始进行展示数组");
        for(var i=0;i<arr.length;i++){
            console.log("这个数组的展示："+arr[i]);
        }
        console.log("展示数组结束");
    }
})()

$.myfunction([1,2,3]);