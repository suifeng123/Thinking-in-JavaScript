class MyPromise {
	constructor(executor) {
		// 1. 添加基础的数据
		this.initValue()
		executor(resolve, reject)// 执行函数
	}
	
	initValue() {
		this.promiseResult = null
		this.promiseStatus = "pending"
	}
	
	resolve(value) {
		this.promiseResult = value
		this.promiseStatus = "fulfilled"
	}
	
	reject(reason) {
		this.promiseStatus = "rejected"
		this.promiseResult = reason 
	}
}