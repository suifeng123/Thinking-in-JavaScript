//进行单例模式的
var Singleton = function(name){
	this.name = name; //这个单例的名称
	this.instance = null;//这个实例是否存在
};

Singleton.prototype.getName = function(){
	console.log(this.name);
};