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
		console.log(s)
		for (let item of wordDict) {
			if (s.indexOf(wordDict) != -1) {
				return false
			} else {
				let index = s.indexOf(item)
				let endIndex = item.length
				if(index == 0) {
					s = s.substring(endIndex)
					console.log(s)
					if (!s.length) return true
					spiltHelper(s, wordDict)
				} else {
					let temp1 = s.substring(0, index)
					let temp2 = s.substring(index + endIndex, s.length)
					s = temp1 + temp2
					if (!s.length) return true
					spiltHelper(s, wordDict)
				}
			}
		}
		return s.length == 0 ? true : false
	}
	if(!wordDict.length) return false
	console.log(spiltHelper(s, wordDict))
}
split("applepenapplepenpen", ["apple", "pen"])