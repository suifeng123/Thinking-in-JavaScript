Function.prototype.myCall = function(obj, ...args) {
	obj.fn = this
	let result = obj.fn(...args)
	delete obj.fn
	return result	
}

function showName(...args) {
	console.log(this.name)
	console.log(args)
}

let obj = {
	name: "wsw"
}

showName.myCall(obj, '1', '2')