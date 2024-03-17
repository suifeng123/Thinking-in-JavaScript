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
					currentState = state.tagOpen // 状态转移
					templateStr = templateStr.slice(1) // 消费一个字符
				 } else if (isAlpha(char)) {
					 currentState = state.text // 状态转移
					 //chars.push(char)
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
					//chars.push(char)
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
	return tokens
}


const parse = function(str) {
	// 标记化
	const tokenArr = tokenize(str)
	// 虚拟节点对象
	const root = {
		type: "root",
		children: []
	}
	// 栈结构
	const elementStack = [root]
	// 扫描token数组
	while(tokenArr.length) {
		// 保存当前栈顶元素
		const parent = elementStack[elementStack.length - 1]
		const t = tokenArr[0]
		switch(t.type) {
			case "tag":
			  // 创建节点元素
			  const elementNode = {
				  type: "Element",
				  tag: t.name,
				  children: []
			  }
			  parent.children.push(elementNode)
			  elementStack.push(elementNode)
			  break
			case "text":
		      // 创建文本节点
			  const textNode = {
				  type: "text",
				  content: t.content
			  }
			  parent.children.push(textNode)
			  break
			case "tagEnd":
			  elementStack.pop()
			  break
		}
		tokenArr.shift()
	}
	console.log("在最后打印root")
	console.log(root)
	return root
}

const dumpAst = function(node, indent = 2) {
	const type = node.type
	const desc = node.type === "root" ? "根节点" : node.type === "Element" ? node.tag : node.content
	console.log(`${'-'.repeat(indent)}${type}: ${desc}`)
	
	if (node.children) {
		node.children.forEach((nod) => {
			dumpAst(nod, indent + 2)
		})
	}
}

// 接着实现AST节点访问  从根节点DFS
const traverseNode = function(ast, context) {
	// 将ast直接保存到上下文currentNode中
	context.currentNode = ast
	// 新增退出阶段回调函数数组
	const exitFns = []; 
	// 获取转换逻辑回调数组nodeTransforms 遍历并将currentNode传入并进行处理
	const transforms = context.nodeTransforms
	for (let i = 0; i < transforms.length; i++) {
		const exitCallback = transforms[i](context.currentNode, context)
		if (exitCallback) {
			exitFns.push(exitCallback)
		}
		if(!context.currentNode) {
			return
		}
	}
	const children = context.currentNode.children
	if (children) {
		for(let i = 0; i < children.length; i++) {
			context.parent = context.currentNode
			context.childIndex = i
			traverseNode(children[i], context)
		}
	}
	for (let i = exitFns.length - 1; i >= 0; i--) {
		exitFns[i]()
	}
}

const transform = function(ast) {
	const context = {
		currentNode: null, // 暂存当前的转换的节点
		childIndex: 0,   // 暂存当前节点在父节点children的位置索引
		parent: null, // 点前节点的父节点
		replaceNode(node){
			// 找到当前节点的父节点children数组，根据当前的childrenIndex标记找到当前节点所在位置进行替换
			context.parent.children[context.childIndex] = node
			// 同事更新上下文中currentNode的值为新节点
			context.currentNode = node;
		},
		removeNode() {},
		nodeTransforms: [
			transformText // 回调函数功能：转换文本节点
		]
	}
	// 将上下文传入traverseNode
	traverseNode(ast, context)
	console.log(dumpAst(ast))
}

const transformElement = function(node) {
	// 转换逻辑放在退出阶段 保证所有的子节点已经处理完毕
	return () => {
		if(node.type !== "Element") {
			return
		}
		const callExp = createCallExpression("h", [
			createLiteral(node.tag)
		])
		node.children.length === 1 ? callExp.arguments.push(node.children[0].jsNode) : callExp.arguments.push(createArrayExpression(node.children.map(item => item.jsNode)))
		node.jsNode = callExp
	}
}
const transformText = function(node, context) {
	if (node.type != "Text") {
		return
	}
	node.jsNode = createLiteral(node.content)
}

// 首先定义几个辅助函数，方便节点转换
const createLiteral = function(value) {
	return {
		type: "Literal",
		value: value
	}
}

const createIdentifier = function(name) {
	return {
		type: "Identifier",
		name
	}
}

const createArrayExpression = function(elements) {
	return {
		type: "ArrayExpression",
		elements
	}
}

const createCallExpression = function(elements) {
	return {
		type: "CallExpression",
		callee: createIdentifier(callee),
		arguments
	}
}

const transformRoot = function(node) {
	return () => {
		if (node.type !== 'Root') {
			return
		}
		const vnodeJSAST = node.children[0].jsNode
		node.jsNode = {
			type: "FunctionDeclaration",
			id: {type: "Identifier", name: "render"},
			params: [],
			body: [
				type: "ReturnStatement",
				return vnodeJSAST 
			]
		}
	}
}

const generate = function (node) {
    const context = {
        code: '',
        // 拼接代码字符串
        push(code) {
            context.code += code;
        },
        // 记录当前缩进
        currentIndent: 0,
        // 换行
        newline() {
            context.code += '\n' + `  `.repeat(context.currentIndent)
        },
        // 新增缩进
        indent() {
            context.currentIndent++;
            context.newline();
        },
        // 取消缩进
        deIndent() {
            context.currentIndent--;
            context.newline();
        }
    }
    genNode(node, context); //生成代码
    return context.code;
}

const compile = function(template) {
	const templateAST = parse(template) // 解析
	transform(templateAST) // AST转换
	const jsAST = templateAST.jsNode
	const code = genenrate(jsAST) // 目标代码生成
	return code
}


const genNode = function(node, context) {
	switch(node.type) {
		case "FunctionDeclaration":
		   genFunctionDeclaration(node, context)
		   break
		case "ReturnStatement":
		   genReturnStatement(node, context)
		   break
		case "CallExpression":
		   genCallExpression(node, context)
		   break
		case "Literal":
		   genLiteral(node, context)
		   break
		case "ArrayExpression":
		   genArrayExpression(node, context)
		   break
	}
}

// 处理函数声明入参字符串拼接
const genNodeList = function () {
    const { push } = context;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        genNode(node, context);
        if (i < nodes.length - 1) {
            push(', ');
        }
    }
}
const genFunctionDeclaration = function (node, context) {
    const { push, indent, deIndent } = context;
    push(`function ${node.id.name}`);
    push(`(`);
    genNodeList(node.params, context);
    push(')');
    push('{');
    indent();
    // 遍历执行函数体内每一条语句的代码拼接
    node.body.forEach((item) => {
        genNode(item, context);
    });
    deIndent();
    push('}');
}


const templateAST = parse("<div>Hello</div>")
transform(templateAST)