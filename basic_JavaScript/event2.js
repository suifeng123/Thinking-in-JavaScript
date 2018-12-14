//进行一个全局形式的Event对象

var Event = (function(){
    
	//进行定义一个事件
	var clientList = {},
		listen,
		trigger,
		remove;
        //进行定义一个监听事件
	listen = function(key,fn){
	       if(!clientList[key]){
	            clientList[key] = [];
	       }

	       clientList[key].push(fn);
	};

	trigger = function(){
	     var key = Array.prototype.shift.call(arguments);
	      var fns = clientList[key];
	      if(!fns || fns.length === 0){
	          return false;
	      }

	      for(var i = 0,fn; fn = fns[i++];){
	            fn.apply(this,arguments);
	      }

	};

	remove = function(key,fn){
	    var fns = clientList[key];
	     if(!fns){
	        return false;
	     }
	     if(!fn){
	        fns && (fns.length =  0);
	     }else{
	         for(var l = fns.length - 1; l >= 0 ; l--){
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


Event.listen('squareMeter88',function(price){
      console.log('价格 = ' + price);
});

//进行触发相应的需求
Event.trigger('squareMeter88',2000000);
