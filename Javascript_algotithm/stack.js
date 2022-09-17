// 创建一个基于数组的栈类
class Stack {
	constructor() {
	    this.items = []
	}
	
	push(elements) {
		this.items.push(elements)
	}
	
	pop() {
		this.items.pop()
	}
	
	peek() {
		return this.items[this.items.length - 1]
	}
	
	isEmpty() {
		return this.items.length == 0
	}
	clear() {
		this.items = []
	}
	size() {
		return this.items.length
	}
}

class StackObj {
	// 基于对象实现栈
	constructor () {
		this.items = {}
		this.count = 0
	}
}