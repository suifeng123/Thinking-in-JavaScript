/**
 * Created by Administrator on 2017/6/13.
 */
(function(){
    var $ = {

    };
    $.myfunction = function(arr){
        console.log("��ʼ����չʾ����");
        for(var i=0;i<arr.length;i++){
            console.log("��������չʾ��"+arr[i]);
        }
        console.log("չʾ�������");
    }
})()

$.myfunction([1,2,3]);