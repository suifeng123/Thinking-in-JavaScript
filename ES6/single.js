//进行单例模式的
var Singleton = function(name){
	this.name = name; //这个单例的名称
	this.instance = null;//这个实例是否存在
};

Singleton.prototype.getName = function(){
	console.log(this.name);
};

Singleton.getInstance = function(name){
	if(!this.instance){
		//如果不能找不到相应的单例的话 就创造一个相应的单例模式
		this.instance = new Singleton(name);
	}
	//如果已经具有此种实例 就返回这个实例
	return this.instance;
};

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

console.log("进行相应的验证");
console.log(a === b);

//or 
var Singleton = function(name){
	this.name = name;
};

Singleton.prototype.getName = function(){
	console.log(this.name);
};

Singleton.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singleton(name);
		}
		
		return instance;
	}
})();