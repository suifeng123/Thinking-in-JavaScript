function deepClone(obj) {
	if (typeof obj !== "object" && typeof obj != null) {
		return obj
	}
	
	if (type(obj) == "array") {
		let target = []
		for (let i = 0; i < target.length; i++) {
			target[i] = deepClone(target[i])
		}
		return target
	}
	if (type(obj) == "object") {
		let target = {} 
		for (let item in obj) {
			if (obj.hasOwnProperty(item)) {
				obj.item = deepClone(obj.item)
			}
		}
		return target
	}
}

function type(obj) {
	if (Object.prototype.toString.call(obj) === "[object Array]") {
		return "array"
	}
	if (Object.prototype.toString.call(obj) === "[object Object]") {
		return "object"
	}
}

const obj = {
	name: "wsw",
	age: 34
}

let objDeep = deepClone(obj)
objDeep.age++

let arr = [1,2,3,4]
let deepArr = deepClone(arr)
deepArr[0]++
console.log(arr)