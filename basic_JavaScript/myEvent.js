//自己编写一个发布者  订阅者模式的设计模式
//故事是这样说的，对于同一个事件有多个对象进行订阅
//进行监听的事件 listen('面积',fn)  fn是房间面积进行相应的处理
//
//进行触发的函数是trigger('面积',价格) 价格是用来发布出去的信息 此时是将价格参数 进行传入fn函数中，通过面积找到fn函数
var Event = (function(){
	//必须是一个立即执行函数，用来生成对象在作用域中
      var clientList = {},  //首先是一个存储事件的对象形式
	   trigger,        // 一个触发器 
	   listen,         //一个监听器
	   remove;         //用于移除监听的函数

     //首先定义一个监听器
     listen = function(key,fn){
          //这里的含义是  key 是将要订阅的内容  fn是用来订阅key的函数，相当于一个对象
	     //就是小明  这个对象就是小明  如果在订阅内容中还没有找到相应的关键词的，就对这个
	     //关键词进行重新赋值，取得相应的对象
	     if(!clientList[key]){
	         //进行重新定义关键词
		     clientList[key] = [];
	     }

	     clientList[key].push(fn);
     };

     //进行监听之后，要进行相应的触发相应的函数
     trigger = function(){
          var key = Array.prototype.shift.call(arguments);
	  //获取这个函数
	     var fns = clientList[key];
	     if(!fns || fns.length == 0){
		      return false; //!fns 说明不存在这个对象   
	     }
	     //每个进行订阅这个事件的函数进行调用一边
	     for(var i = 0 ,fn; fn = fns[i++]; ){
	           fn.apply(this,arguments);
	     }
     };

	//移除订阅的事件
	remove=  function(key,fn){
	    var fns = clientList[key];
		if(!fns){
		   return false;
		}

		if(!fn){
		   fns && (fns.length = 0);
		}else{
		   for(var l = fns.length - 1; l > 0;l--){
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
	  console.log('小明订阅的信息'+price);
});

Event.trigger('squareMeter88',20000);

