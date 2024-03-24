const Observer = (function() {
	let message = {}
	return {
		register: function(type, fn) {
			if (!message[type]) {
				message[type] = [fn]
			} else {
				message[type].push(fn)
			}
		},
		fire: function(type) {
			// 触发type类型的函数
			if(!message[type]) {
				return 
			}
			let arr = message[type]
			for (let i = 0; i < arr.length; i++) {
				arr[i].call(this)
			}
		},
		remove: function(type, fn) {
			if (!message[type]) {
				console.log("没有此类型消息，不需要移除")
				return
			}
			let arr = message[type]
			for(let i = 0; i < arr.length; i++) {
				if (arr[i] == fn) {
					arr.splice(i, 1)
					console.log("移除成功")
					return 
				}
			}
		}
	}
})()

function Seller(price) {
	this.price = price
	this.sayPrice = () => {
		console.log(`说出价格${this.price}`)
	}
}

Seller.prototype.Fabujiage = function(value) {
	Observer.register(value, this.sayPrice)
}

Seller.prototype.remove = function(value) {
	Observer.remove(value, this.sayPrice)
}

function Buyer () {
	
}
Buyer.prototype.getPrice = function(value) {
	Observer.fire(value)
}

let s = new Seller(1000)
s.Fabujiage(1000)
let b = new Buyer()
b.getPrice(1000)