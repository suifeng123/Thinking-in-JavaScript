/*[1,[3,4,5],[5,[5]]] 转成[1,3,4,5,5,5]*/
function flatern(arr) {
	let newarr = Array.from(arr.toString())
	let final = []
	for (let i = 0; i < newarr.length; i++) {
		if(newarr[i] != ",") {
			final.push(Number(newarr[i]))
		}
		
	}
	console.log("进行最终的打印")
	console.log(final)
	return final
}

function flatern2(arr) {
	while(arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr)
	}
	return arr
}


// es6 最新方法
function flattern3(arr) {
	return arr.flat(1000)
}

function flattern4(arr) {
	let newArr = []
	for(let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			newArr = newArr.concat(flattern4(arr[i]))
		} else {
			newArr.push(arr[i])
		}
	}
	return newArr
}

let a = [1,[2,3,[4]]]

console.log(flattern3(a))
