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

/**
 * this的第四种使用方法
 * Function.prototype.call 或者
 * Function.prototype.apply
 */
  var Type = {};
  for(var i = 0,type;type=['String','Array','Number'][i++];){
	  Type['is' + type] = function(obj){
		  return Object.prototype.toString.call(obj) === '[object' + type+']';
	  }
  }
  
  console.log(Type.isArray([]));
  console.log(Type.isString("str"));
  console.log(Type.isNumber("4"));
