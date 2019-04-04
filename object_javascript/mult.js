/**
 * 对于闭包的使用 关于参数相乘的结果展示
 */

//进行对数据进行缓存
var cache = {};
var mult = function(){
	var args = Array.prototype.join.call(arguments,',');
	if(cache[args]){
		//如果发现了已经计算好了的数据
		return cache[args];
	}
	var a = 1;
	for(var i = 0, l = arguments.length; i < l; i++){
		a = a * arguments[i];
	}
	//对cache进行相应的赋值
	cache[args] = a;
	return  a;
};


console.log(mult(1,2,3));
console.log(mult(1,2,3));

var mult = (function(){
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		var a = 1;
		for(var i = 0, l = arguments.length; i < l ;i++){
			a = a * arguments[i];
		}
		
		cache[args] = a; //进行相应的赋值
		return cache[args];
	}
})();

var mult = (function(){
	var cache = {};
	var calculate = function(){
		//粉笔caculate函数
		var a = 1;
		for(var i = 0,l = arguments.length; i < l; i++){
			a = a * arguments[i];
		}
		return a;
	};
	
	return function(){
		var args = Array.prototype.call(arguments,',');
		if(args in cache){
			return cache[args];
		}
		return cache[args] = calculate.apply(null,arguments);
		
	}
})();
