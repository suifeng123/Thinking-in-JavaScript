/**
 * LengthOfLIS
 */
function LengthLIS(nums){
	let len = nums.length
	let dp = new Array(len).fill(1)
	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				dp[i] = Math.max(dp[i], dp[j] + 1)
			}
		}
	}
	
	let res = 0
	// 要重新遍历一遍数组，找到最长的递增子序列
	for(let i = 0; i < dp.length; i++) {
		res = Math.max(res, dp[i])
	}
    console.log("进行打印最终的dp数组")
	console.log(dp)
	return res
}

function lengthOfLIS2(nums) {
	let top = new Array(nums.length)
	// 牌堆数初始化为0
	let piles = 0
	for (let i = 0; i < nums.length; i++) {
		// 要处理的扑克牌数
		let poker = nums[i]
		/*** 搜索左边界的二分搜索 ***/
		let left = 0, right = piles
		while(left < right) {
			let mid = (left + right) / 2
			if (top[mid] > poker) {
				right = mid
			} else if (top[mid] < poker) {
				left = mid + 1
			} else {
				right = mid
			}
		}
		
		// 没有找到合适的牌堆 新建一堆
		if (left === piles) piles++
		// 把这张牌放到牌堆顶
		top[left] = poker
	}
	
	// 牌堆数就是LIS的长度
	console.log("进行最终的打印的堆")
	console.log(piles)
	return piles
}

lengthOfLIS2([6, 3, 5, 10, 11, 2, 9, 14, 13, 7, 4, 8, 12])


