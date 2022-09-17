// 实现函数的柯里化计算
function caculate () {
	let arrArgs = []
	var arr = Array.from(arguments)
	let total = 0
	if (arr.length > 1) {
		arrArgs = [...arrArgs, ...caculate(arr[1])]
		// 在此处进行数组的添加
		for (let i = 0; i < arrArgs.length; i++) {
			total += arrArgs[i]
		}
		return total
	} else if (arr.length == 1) {
		return caculate(Array.from(arguments))
	}
	
}

caculate(3, 7)