// 手写一个new的函数 实现new的基本操作
function myNew(context, ...args) {
	// 定义一个空对象
	let obj = {} 
	obj.__proto__ = context.prototype
	let result = context.apply(obj, args)
	
	return (typeof result === "object" && result != null) ? result : obj	
}

function Person(name) {
	this.name = name
}

myNew(Person, "wsw")