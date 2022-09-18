function strTong(str1, str2) {
	let max = 0;
	let finalStr = ""
	for (let i = 0; i < str1.length; i++) {
		for (let j = i + 1; j <= str1.length; j++) {
			let temp = str1.slice(i, j)
			if ((str2.indexOf(temp) != -1) && (j - i) > max) {
				max = j - i
				finalStr = str1.slice(i, j)
			}
		}
	}
	
	return finalStr
}

// 进行测试
console.log(strTong("abc", "dfabc"))