/**
 * 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

说明：

拆分时可以重复使用字典中的单词。
你可以假设字典中没有重复的单词。
示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
示例 2：

输入: s = "applepenapplepenpen", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
     注意你可以重复使用字典中的单词。
示例 3：

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
 */

function split(s, wordDict) {
	const spiltHelper = (s, wordDict) => {
		for(let item of wordDict) {
			if (s.indexOf(item) != -1) {
				let index = s.indexOf(item)
				if (index == 0) {
					s = s.substring(item.length)
					console.log("进入第一个")
					console.log(s)
					console.log(s.length)
					if(s.length == 0) return true
					return spiltHelper(s, wordDict) // 递归调用
				} else {
					let temp = s.substring(0, index)
					let temp2 = s.substring(index + item.length, s.length)
					s = temp + temp2
					console.log("进入第二个")
					console.log(s)
					if (s.length == 0) return true 
					return spiltHelper(s, wordDict)
				}
			}
		}
		return s.length == 0 ? true : false
	}
	if(!wordDict.length) return false
	console.log(spiltHelper(s, wordDict))
}

function coinsChange(coins, amount) {
	// 零钱兑换
	/**
	 * 定义dp[i]: 当金额为i时，至少需要dp[i]枚硬币凑出
	 */
	let dp = new Array(amount + 1).fill(amount + 1)
	
	dp[0] = 0
	for (let i = 0; i < dp.length; i++) {
		for(let coin of coins) {
			if (i - coin < 0) continue
			dp[i] = Math.min(dp[i], dp[i - coin] + 1)
		}
	}
	if (dp[amount] != amount + 1) {
		return dp[amount]
	} else {
		return -1
	}
}

console.log(coinsChange([1,2,5], 11))