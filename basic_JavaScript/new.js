/**
 * Created by Administrator on 2017/6/28.
 */
//���е�����
exports.name = "wangshengwen";
//˽�е�����
var myName = "Hello World";
 exports.init = function(itName) {
     if(!itName){
         setName(itName);
     }else{
       setName(itname);
     }
 }
//���Ⱪ¶�ķ���
exports.show = function() {
    console.log(name);
}
//˽�еķ���
function setName(myName){
    name = myName;
}