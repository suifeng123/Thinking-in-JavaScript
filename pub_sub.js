//写一个关于发布者/订阅者模式
var PubSub = {
	subscribe: function(ev,callback){
		//创建back的对象，除非它已经不存在了
		var calls = this._callbacks || (this._callbacks = {});
	    //针对给定的事件key创建一个数组，除非这个数组已经存在
	    //将回调函数追加到数组中
	    (this._callbacks[ev] || (this._callbacks[ev]=[])).push(callback);
	    console.log(this);
	    return this;
	},
	publish: function() {
		//将arguments 对象转化为真正的数组
		var args = Array.prototype.slice.call(arguments,0);

		//拿出第一个参数，即事件名称
		var ev = args.shift();

		//如果不存在_callbacks 对象，则返回
		//或者如果不包含给定事件对象的数组
		var list,calls,i,l;
		if(!(calls = this._callbacks)) return this;
		if(!(list = this._callbacks[ev])) return this;

		//触发回调
		for(i = 0,l = list.length; i < l; i++)
			list[i].apply(this,args);
		console.log(this);
		return this;
		}
	};

	//使用方法
	PubSub.subscribe('wem',function(){
		console.log('Wem');
	})

	PubSub.publish('wem'); //发布这个信息
