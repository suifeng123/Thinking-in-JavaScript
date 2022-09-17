function getSum(jsonObj) {
	/** 
	 * 记性递归求出所有的数组
	 */
	let arr = []
	for (key in jsonObj) {
		if (typeof jsonObj[key] == 'number') {
			arr.push(jsonObj[key])
		} else if (Object.prototype.toString.call(jsonObj[key]) == '[object Array]') {
			let innerArr = jsonObj[key]
			for (let i = 0; i < innerArr.length; i++) {
				if (typeof innerArr[i] == 'number') {
					arr.push(innerArr[i])
				} else if (Object.prototype.toString.call(jsonObj[key] == '[object Array]')) {
					arr =[...arr, ...getSum(jsonObj[key])]
				} else if (Object.prototype.toString.call(jsonObj[key]) == '[object Object]') {
					arr = [...arr, ...getSum(jsonObj[key])]
				}
			}
		}else if (Object.prototype.toString.call(jsonObj[key] == '[object Object]')) {
			arr = [...arr, ...getSum(jsonObj[key])]
		}
	}
	
	let sum = 0
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i]
	}
	
	return sum;
}

console.log(getSum({
	a: 1,
	b: {
		c: 2
	}
}))


