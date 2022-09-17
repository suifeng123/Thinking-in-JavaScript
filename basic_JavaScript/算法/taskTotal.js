/**
 * 进行计算CPU能够计算任务需要多少秒
 * maxTask  cpu 一秒内最多执行的任务的数量
 * taskArr  任务队列
 */
function task(maxTask, taskArr) {
   var total = 0
   let tempNum = 0
   for (let i = 0; i < taskArr.length; i++) {
	   if (tempNum + taskArr[i] < maxTask) {
		   tempNum += taskArr[i]
	   }else if (tempNum + taskArr[i] == maxTask) {
		   total++
		   tempNum = 0
	   } else if (tempNum + taskArr[i] > maxTask) {
		   if ((tempNum + taskArr[i]) % maxTask == 0) {
			   total = total + (tempNum + taskArr[i]) / maxTask 
			   tempNum = 0
		   }else {
			   total = total + 1 + Math.floor((tempNum + taskArr[i]) / maxTask)
			   tempNum = 0
		   }
	   }
   }
   return total
}

/**
 * 相关测试用例
 * 3  【3，2,3,4,5】
 *
 */
console.log(task(3, [3,2,3,4,5]))