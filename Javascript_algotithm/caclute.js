// 进行计算数组
/**
 * @param {Object} arr
 * 
 * x#y = 2 * x + 2 *y + 2
 * x$y = 2 * x + y + 1
 * 其中 #号优先级高于$
 */
function caclute (arr, yin1, yin2, yu) {
	let total = 0
	let left = 0
	let temp
	while (left < arr.length - 1) {
		temp = yin1 * parseInt(arr[left]) + yin2 * parseInt(arr[left + 1]) + yu
		arr[left + 1] = temp
		left++ 
	}
	return temp
}
// 首先将字符串转化为数组
let str = "56#7$12$78"
let arr = str.split("$")  // 以$进行分割
let arrout = [];  // 用来存放数组
for (let i = 0; i < arr.length; i++) {
	if (arr[i].indexOf("#") != -1) {
		let arrIner = arr[i].split("#")
		let sum = caclute(arrIner, 2, 2, 2)
		arrout.push(sum)
	} else {
		arrout.push(arr[i])
	}
}
console.log("进行打印最终的数组")
console.log(caclute(arrout, 2, 1, 1))