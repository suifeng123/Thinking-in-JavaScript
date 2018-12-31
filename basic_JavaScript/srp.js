//编写程序时要满足单一职责要求
var myImage = (function(){
     var imgNode = document.createElement('img');
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
	     myImage.setSrc();
	     img.src = src;
	 }
     }
})();



