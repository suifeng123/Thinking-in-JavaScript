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

class Component {
	_data = {
		name: "www"
	}
	pending = false
	constructor() {
		this.data = new Proxy(this._data, {
			set: (target, propKey, receiver) => {
				this._data[propKey] = receiver
				if (!this.pending) {
					this.pending = true
					Promise.resolve().then(() => {
						this.render() // 放入微队列
					})
				}
			}
		})
	}
	
	render() {
		this.pending = false
		console.log(`打印现在的data${this._data.name}`)
	}
}

let c = new Component()
c.data.name = "1"
c.data.name = '2'
c.data.name = "3"



