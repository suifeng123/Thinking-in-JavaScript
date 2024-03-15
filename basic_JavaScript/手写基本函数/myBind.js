Function.prototype.myBind = function(...args) {
	let fn = this
	let context = args.shift()
	return function(...args2) {
		let allArgs = [...args, ...args2]
		console.log(allArgs)
		if (new.target) {
			return new fn(...allArgs)
		} else {
			return fn.apply(context, allArgs)
		}
	}
}

function Person(...arg) {
	console.log(`大家好，我的名字叫做${this.name} 我的年纪是${this.age},${arg}`)
}

let obj = {
	name: "wsw",
	age: 34
}

let a = Person.myBind(obj, "123", "345")

new a("nihao")