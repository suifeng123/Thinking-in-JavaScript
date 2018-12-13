//进行图片的虚拟代理操作
var myImage = (function(){
      var imgNode = document.createElement('img');
      document.body.appendChild(imgNode);

      return {
         setSrc: function(src){
	     imgNode.src = src;
	 }
      }
})();

var proxyImage = (function(){
     var img = new Image;
      img.onload = function(){
          myImage.setSrc(this.src);
      }

      return {
        setSrc: function(src){
          myImage.setSrc('file://xxx');
          img.src = src;
        }
      }
})();


var synchronousFile = function(id){
  console.log('开始同步文件，id为：' + id);
};

var checkbox = document.getElementsByTagName('input');


for(var i = 0 ; i < checkbox.length ; i++){
     //进行监听onclick事件
     checkbox[i].onclick = function(){
          if(this.checked){
              synchronousFile(this.id);
          }
     }
}

//计算成绩
//
function mutl(){
     //当传输进来的是一个数组的时候
     var a = 1;

     for(var i = 0 ; i < arguments.length; i++){
           a = arguments[i] * a ；
     }

     return a;
}

//
var  proxyMutl = (function(){
     var cache = {}; //定义一个缓存数组

     return function(){
        var args = Array.prototype.join.call(arguments,',');

        if(args in cache){
          return cache[args];
        }
        return cache[args] = mutl.appy(this,arguments);
     }
})();

document.body.addEventListener('click',function(){
     alert(2);
},false);

document.body.click(); //模拟用户点击