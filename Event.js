//全局的观察者模式
var Event = (function(){
	//定义一个缓存的监听器
	var clientList = {},
	    listen,
	    trigger,
	    remove;

	//定义一个监听器
    listen = function (key,fn){
	    console.log("sadf");
    	if(!clientList[key]){
    		clientList[key] = [];//置为空值
    	}
    	clientList[key].push(fn); //否则将其,key对应的函数是fn
    };

    //定义一个触发器
    trigger = function(){
    	var key = Array.prototype.shift.call(arguments);
    	var fns = clientList[key]; //取出我们所需的函数
    	if(!fns || fns.length === 0){
    		return false;
    	}
    	for(var i = 0 ,fn;fn=fns[i++];){
    		fn.apply(this,arguments); //调用自身的这个函数
    	}
    };
    //取消订阅这个函数的信息
    remove = function(key,fn){
    	var fns = clientList[key];
    	if(!fns){ //如果这个订阅事件的发起者为空的话，就取消这个
           return false;
    	}
    	if(!fn){
    		fns && (fns.length = 0);
    	}else{
    		for(var l = fns.length-1; l >= 0;l--){
    			var _fn = fns[l];
    			if(_fn === fn){
    				fns.splice(l,1);
    			}
    		}
    	}
    };
    return {
    	listen: listen,
    	trigger: trigger,
    	remove: remove
    }

})();

Event.listen('square888',function(price){
	console.log('price:'+price);
});

Event.trigger('square888',2000);
