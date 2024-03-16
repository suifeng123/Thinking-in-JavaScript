const curry = fn => {
	let len = fn.length
	return function curried(...args) {
		if (len === args.length) {
			console.log("进入这个函数")
			return fn.apply(null, [...args])
		} else {
			return (...args2) => {
				return curried.apply(null, [...args, ...args2])
			}
		}
	}
}

const sum = (x, y, z) => {return x + y + z}
console.log(sum(1,2,3))

const add = curry(sum)

console.log(add(1, 2, 3))