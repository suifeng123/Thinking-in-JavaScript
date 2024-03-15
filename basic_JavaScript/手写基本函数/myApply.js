Function.prototype.myApply = function(context, ...args) {
	context.fn = this
	let result = context.fn(...args)
	delete context.fn
	
	return result
}

let obj = {
	name: "wsw"
}

function showName(...args) {
	console.log(this.name)
	console.log(args)
}

showName.myApply(obj, "第一个参数", "第二个参数")