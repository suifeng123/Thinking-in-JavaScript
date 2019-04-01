//在javascript中this的指向问题
//1.作为对象的方法使用
//2.作为普通函数调用
//3.构造器调用
//4.Function.prototype.call 或 Function.prototype.apply 

/**
 * 首先是作为对象的方法使用
 */
var obj = {
	a: 1,
	getA: function(){
		console.log(this === obj);
		
	}
}