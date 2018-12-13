//定义新的发布者订阅者模式的js文件
var event = {
     clientList:[],
     listen: function(key,fn){
          if(!this.clientList[key]){
	       this.clientList[key] = []; //订阅的关键词是一个数组
	  }
	     //订阅的消息添加进缓存列表中
	  this.clientList[key].push(fn);
     },
     trigger: function(){
          var key = Array.prototype.shift.call(arguments),
		     fns = this.clientList[key];
	  if(!fns || fns.length === 0){
	      //如果没有绑定对应的消息
	      return false;
	  }

	  for(var i = 0 ,fn; fn = fns[i++];){
	      fn.apply(this,arguments); //arguments 是trigger时带上
	  }

     }

};

var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i];
	}
};
