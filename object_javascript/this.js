//在javascript中this的指向问题
//1.作为对象的方法使用
//2.作为普通函数调用
//3.构造器调用
//4.Function.prototype.call 或 Function.prototype.apply 

/**
 * 首先是作为对象的方法使用
 */
/**
*  this 作为构造器进行使用
*/
var MyClass = function(){
	this.name = "sven";
	return 
		name: 'anne'
	
}

var obj = new MyClass();
console.log(obj.name);
/**
 * this的第四种使用方法
 * Function.prototype.call 或者
 * Function.prototype.apply
 */

var obj1 = {
	name: 'sven',
	getName: function(){
		return this.name;
	}
};

var obj2 = {
	name: 'anne'
};

console.log(obj1.getName());//输出: sven 
console.log(obj1.getName.call(obj2));//输入anne  

Function.prototype.bind = function(context){
	/**
	 * 其中context 是指函数方法指向的方向  
	 * 就是说 最终函数指向最终的方向是这个环境
	 */
	var self = this;//保存原函数
	return function(){ //进行返回一个函数
		return self.apply(context,arguments);
	}
};

var obj = {
	name: 'sven'
};

var func = function(){
	console.log(this.name);
}.bind(obj);

func();