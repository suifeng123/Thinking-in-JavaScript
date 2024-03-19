/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 示例 1：
 输入: "babad"
 输出: "bab"
 注意: "aba" 也是一个有效答案。
 示例 2：
 输入: "cbbd"
 输出: "bb"

public String longestPalindrome(String s) {
}
 */
function longestPalindrome(s) {
	let result = ""
	for(let i = 0; i < s.length; i++) {
		huiwen(i, i)
		huiwen(i, i + 1)
	}
	function huiwen(i, j) {
		while(i >= 0 && s[i] === s[j] && j < s.length) {
			if ((j - i + 1) > result.length) {
				result = s.substring(i, j + 1)
			}
			i--
			j++
		}
	}
	return result
}

function BubbleSort(arr) {
	let len = arr.length
	for (let i = 0; i < len; i++) {
		for(let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr, j, j + 1)
			}
		}
	}
	return arr
}

function swap(arr, i, j) {
	let temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
}

function selectSort(arr) {
	let MinIndex
	let len = arr.length
	for (let i = 0; i < len - 1; i++) {
		let MinIndex = i
		// 寻找第i小的数字
		for(let j = i; j < len; j++) {
			if (arr[j] < arr[MinIndex]) {
				MinIndex = j
			}
		}
		if (MinIndex != i) {
			swap(arr, MinIndex, i)
		}
	}
	return arr
}

// 插入排序
function insertSort(arr) {
	let len = arr.length
	for(let i = 1; i < len; i++) {
		let j = i
		let temp = arr[j]
		// 找到相应的插入位置 j  将temp赋值给arr[j]
		while(j >= 0 && arr[j - 1] > temp) {
			arr[j] = arr[j - 1] // 向前移动一位
			j--
		}
		arr[j] = temp
	}
	return arr
}

function quickSort(arr) {
	if (arr.length <= 1) {
		return arr
	}
	let left = [], right = []
	let indexPivot = Math.floor(arr.length / 2)
	let pivot = arr.splice(indexPivot, 1)[0]
	
	for (item of arr) {
		if (item <= pivot) {
			left.push(item)
		} else {
			right.push(item)
		}
	}
	return [...quickSort(left),pivot,...quickSort(right)]
}

function mergeSort(arr) {
	if (arr.length > 1) {
		console.log("进入了这个函数")
		let len = arr.length
		let index = Math.floor(len / 2)
		let left = mergeSort(arr.slice(0, index))
		let right = mergeSort(arr.slice(index, arr.length))
		arr = merge(left, right)
	}
	return arr
}

function merge(left, right) {
	let result = []
	let i = 0, j = 0
	while(i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			result.push(left[i])
			i++
		} else {
			result.push(right[j])
			j++
		}
	}
	if (i < left.length) {
		result.concat(left.slice(i))
	}
	if (j < right.length) {
		result.concat(right.slice(j))
	}
	return result
}
console.log(mergeSort([5,4,3,2,1]))