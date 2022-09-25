/**
 * @param {number} n
 * @return {number}
 */
var rotatedDigits = function(n) {
  let arr = []
  let numArr = ["0", "1", "8","2", "5", "6", "9"]
  for (let i = 1; i <= n; i++) {
      let temp = i.toString()
      let flag = true
      for (let j = 0; j < temp.length; j++) {
          if (numArr.indexOf(temp[j]) == -1) {
              flag = false
          }
          if (!flag) break;
      }
      if (flag) {
		  if (judge(i.toString()) != i) arr.push(i)
	  }
  }
  console.log(arr)
    return arr.length
};

var judge = function (num) {
    let arr = []
    for (let i = 0; i < num.length; i++) {
        if (num[i] == "2") {
            arr.push("5")
        } else if (num[i] == "5") {
            arr.push("2")
        } else if (num[i] == "6") {
            arr.push("9")
        } else if (num[i] == "9") {
            arr.push("6")
        } else {
            arr.push(num[i])
        }
    }
    return arr.join("")
}

console.log(rotatedDigits(2))