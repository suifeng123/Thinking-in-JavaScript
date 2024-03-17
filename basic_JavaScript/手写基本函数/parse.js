const state = {
	initial: 1,
	tagOpen: 2,
	tagName: 3,
	text: 4,
	tagEnd: 5,
	tagEndName: 6
}

// 判断字符是否是字母
const isAlpha = (char) => {
	return char >= "a" && char <= "z" || char >= "A" && char <= "Z"
}

// template 转化为token
const tokenize = function(templateStr) {
	console.log("开始执行这个函数")
	let currentState = state.initial // 设置初始状态
	const chars = []  // 暂时存储匹配到的字符
	const tokens = [] // 存储匹配到的token
	while(templateStr) {
		const char = templateStr[0] // 每一次循环拿首字母进行处理
		// switch-case 分支处理
		switch(currentState) {
			case state.initial:
			     // 初始状态下
				 if (char === "<") {
					 console.log("进入<")
					currentState = state.tagOpen // 状态转移
					templateStr = templateStr.slice(1) // 消费一个字符
				 } else if (isAlpha(char)) {
					 currentState = state.text // 状态转移
					 chars.push(char)
					 templateStr.slice(1) // 消费一个字符
				 }
				 break
			case state.tagOpen:
			    // 标签状态下
				if (char === "/") {
					// 状态转移-结束标签状态
					currentState = state.tagEnd
					templateStr = templateStr.slice(1)
				} else if (isAlpha(char)) {
					// 状态转移-- 标签名称状态
					currentState = state.tagName
					chars.push(char)
					templateStr.slice(1) // 消费一个字符
				}
				break
			case state.tagName:
				// 标签名称状态
				if (isAlpha(char)) {
					chars.push(char) // 暂存当前字符
					// 消费一个字符
					templateStr = templateStr.slice(1)
				} else if(char === ">") {
					// 状态转移--初始状态
					currentState = state.initial
					tokens.push({
						type: "tag",
						name: chars.join("")
					})
					// 直接清空数组元素
					chars.length = 0
					// 消费一个字符>
					templateStr = templateStr.slice(1)
				}
				break
			case state.text:
			     console.log("asfas")
				// 文本状态下
				if (isAlpha(char)) {
					chars.push(char)
					templateStr = templateStr.slice(1)
				} else if (char === "<") {
					// 状态转移-- 标签开始状态
					currentState = state.tagOpen
					tokens.push({
						type: "text",
						content: chars.join("")
					})
					chars.length = 0
					templateStr = templateStr.slice(1)
				}
				break
			case state.tagEnd:
			   // 结束标签状态
			   if (isAlpha(char)) {
				   currentState = state.tagEndName
				   chars.push(char)
				   templateStr = templateStr.slice(1)
			   }
			   break
			case state.tagEndName:
			   // 结束标签名称状态
			   if (isAlpha(char)) {
				   chars.push(char)
				   templateStr = templateStr.slice(1)
			   } else if (char === ">") {
				   // 状态转移
				   currentState = state.initial
				   tokens.push({
					   tag: "tagEnd",
					   name: chars.join("")
				   })
				   chars.length = 0
				   templateStr = templateStr.slice(1)
			   }
			   break
		}
	}
	console.log("打印最终的结果")
	console.log(tokens)
}


var templateStr = "<div>this</div>"

tokenize(templateStr)