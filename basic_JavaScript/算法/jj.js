var reformatNumber = function(number) {
    var num = number.replace(/\s|-/g, "")
    var arr = []
    var left = 0
    while((num.length - left) > 3) {
        arr.push(num[left])
        if ((left + 2) % 4 === 0) {
            arr.push("-")
			left++
        } else {
            left++
        }
    }
    console.log(left)
	console.log(arr)
	var final = num.slice(left)
	console.log(arr.join(""))
	if (final.length == 2 || final.length == 3) {
		let finalStr = arr.join("") + final
		console.log(finalStr)
		return finalStr
	} else if (final.length == 4) {
		let finalStr = arr.join("") + "-" + final.slice(0, 2) + "-" + final.slice(2, 4)
		console.log(finalStr)
		return finalStr
	}
	
};


reformatNumber("123 4567")