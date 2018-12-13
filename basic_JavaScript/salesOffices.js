//售楼处的发布者订阅者模式
var salesOffices = {};  //进行定义售楼处


salesOffices.clientList = []; //缓存列表，存放订阅者的回调函数


salesOffices.listen = function(key,fn){ //增加订阅者
	if(!this.clientList[key]){ //如果还没有
	    this.clientList[key] = [];
	}
      this.clientList[key].push(fn);  //订阅的消息添加进缓存列表
}; 

salesOffices.trigger = function(){
	var key = Array.prototype.shift.call(arguments);
	var fns = this.clientList[key];
	if(!fns || fns.length === 0){
	     return false;
	}
	for(var i =  0,fn ; fn = fns[i++];){
		fn.apply(this,arguments);//arguments 是发布信息时带上的参数
	}
};

//进行一些测试信息
salesOffices.listen('squareMeter88',function(price,squareMeter){
	//小明订阅信息
	console.log('价格 =' + price);

});

salesOffices.listen('squareMeter110',function(price,squareMeter){
	console.log('价格 =' + price);
	
}
);

salesOffices.trigger('squareMeter88',20000000);
salesOffices.trigger('squareMeter110',30000000);
