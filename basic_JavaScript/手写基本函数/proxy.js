function panduan(value) {
	if (value > 1) {
		console.log("11111")
	} 
	if (value > 2) {
		console.log("22222")
	}
}

function panduan1(value) {
	if (value > 1) {
		console.log("2222")
	} else if (value > 3) {
		console.log("88888")
	}
}

let obj = {
	a: 1
}

let objProxy = new Proxy(obj, {
	get(target, property, receiver) {
		console.log(target)
		console.log(property)
		return Reflect.get(target, property, receiver)
	}
})
/**
 * 实现一个函数arr(-1)
 */

function createArray(...elements) {
	// 对elements函数创建一个代理对象
	let handler = {
		get(target, property, receiver) {
			let index = Number(property)
			if (index < 0) {
				property = target.length + index
			}
			
			return Reflect.get(target, property, receiver)
		}
	}
	let target = [...elements]
	return new Proxy(target, handler)
}

let a = [1,2,4]
let b = createArray(...a)
console.log(b[-1])