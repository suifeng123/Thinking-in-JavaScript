function stringToArray (params) {
	if (params == '' || params === true || params == undefined) {
		return []
	}
    return params.replace(/\s|,|，/g, "").split("")
}

console.log(stringToArray('1,2,3,4'))
console.log(stringToArray('1, 3, 4, ,,，5 '))
console.log(stringToArray(' 1,  2,3,, ,4 '))
