// 创建一个基于数组的栈类
class Stack {
	constructor() {
	    this.items = []
	}
	
	push(elements) {
		this.items.push(elements)
	}
	
	pop() {
		return this.items.pop()
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
	push(element) {
		this.items[this.count] = element
		this.count++
	}
	size() {
		return this.count
	}
	isEmpty() {
		return this.count == 0
	}
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--
		const result = this.items[this.count]
		delete this.items[this.count]
		return result;
	}
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.count - 1]
	}
	clear() {
		this.items = {}
		this.count = 0
	}
	
	toString() {
		if (this.isEmpty()) {
			return ""
		}
		let objString = `${this.items[0]}`;
		for (let i = 1; i < this.count; i++) {
			objString = `${objString}, ${this.items[i]}`
		}
		return objString
	}
 }
 
 
 function decimalToBinary(decNumber) {
	 var stack = new Stack()
	 let number = decNumber;
	 let rem;
	 let binaryString = ''
	 while (number > 0) {
		 rem = Math.floor(number % 2)
		 stack.push(rem)
		 number = Math.floor(number / 2)
	 }
	 console.log(stack)
	 while (!stack.isEmpty()) {
		 binaryString += stack.pop()
	 }
	 return binaryString
 }
 
 console.log(decimalToBinary(233))