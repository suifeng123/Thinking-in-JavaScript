/**
 * Created by Administrator on 2017/6/13.
 */
var getUploadObj = function() {
    try{
        return new ActiveXObject("TXFTNActive.FTNUpload"); //ie的上传空间
    }catch(e){
     if(supportFlash()){
         var str = '<object type="application/x-shockwave-flash"></object>';
         return $(str).appendTo($('body'));
     }else{
         var str = '<input name="file" type="file" />'; //表单上传
         return $(str).appendTo($('body'));
     }
    }
}