/**
 * Created by Administrator on 2017/6/28.
 */
//共有的属性
exports.name = "wangshengwen";
//私有的属性
var myName = "Hello World";
 exports.init = function(itName) {
     if(!itName){
         setName(itName);
     }else{
       setName(itname);
     }
 }
//对外暴露的方法
exports.show = function() {
    console.log(name);
}
//私有的方法
function setName(myName){
    name = myName;
}