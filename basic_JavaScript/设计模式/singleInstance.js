// 单例设计模式
class SingleInstance {
	static SingleInstance = null
	
	static getInstance() {
		if (!this.SingleInstance ) {
			this.SingleInstance =  new SingleInstance()
		}
		return this.SingleInstance
	}
}

let p1 = SingleInstance.getInstance()
let p2 = SingleInstance.getInstance()
console.log(p1 == p2)

// 必报来实现
var Instance = (function() {
	let model = null
	return function() {
		if (!model) {
			model = {
				name: "wsw" ,
				age: 30
			}
		}
		return model
	}
})()

let p3 = new Instance()
let p4 = new Instance()
console.log(p3 == p4)