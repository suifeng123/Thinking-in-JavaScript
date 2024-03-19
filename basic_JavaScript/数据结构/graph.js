function Graph() {
	this.vertices = []
	this.edges = new Map()
}

Graph.prototype.addVertices = function(v) {
	this.vertices.push(v)
	this.edges.set(v, [])
}

Graph.prototype.addEdges = function (u, w) {
	let uEges = this.edges.get(u)
	uEges.push(w)
	let wEges = this.edges.get(w)
	wEges.push(u)
	
	this.edges.set(u, uEges)
	this.edges.set(w, wEges)
}

Graph.prototype.toString = function() {
	let result = ""
	let edges
	for(let item of this.vertices) {
		result = result + `${item} -->`
		edges = this.edges.get(item)
		for (let value of edges) {
			result += `${value}  `
		}
		result += '\n'
	}
	console.log(result)
}

// 图的深度优先遍历
Graph.prototype.DFS1 = function() {
	let vertices = this.vertices
	let marked = new Map(), stack = []
	stack.push(vertices[0])
	while(stack.length > 0) {
		let item = stack.pop()
		console.log(`访问了${item}`)
		marked.set(item, true)
		let eges = this.edges.get(item)
		for (let i = eges.length - 1; i >= 0; i--) {
			if(!marked.has(eges[i])) {
				stack.push(eges[i])
			}
		}
	}
}

Graph.prototype.BFS = function (v) {
	let vertices = this.vertices, marked = new Map(), stack = []
	stack.push(vertices[0])
	while(stack.length) {
		let item = stack.shift()
		console.log(`访问了${item}`)
		marked.set(item, true)
		let eges = this.edges.get(item)
		for (let i = 0; i < eges.length; i++) {
			if(!marked.has(eges[i])) {
				stack.push(eges[i])
			}
		}
	}
}

Graph.prototype.DFS2 = function() {
	let marked = new Map()
	const DFSVisit = (node) => {
		console.log(`访问了节点${node}`)
		marked.set(node, true)
		let vs = this.edges.get(node)
		for(let v of vs) {
			if (!marked.has(v)) {
				DFSVisit(v)
			}
		}
	}
	for(let item of this.vertices) {
		if (!marked.has(item)) {
			DFSVisit(item)
		}
	}
}

let graph = new Graph()
graph.addVertices(1)
graph.addVertices(2)
graph.addVertices(3)
graph.addVertices(4)
graph.addVertices(5)

graph.addEdges(1, 2)
graph.addEdges(1, 3)
graph.addEdges(2, 4)
graph.addEdges(3, 5)


graph.toString()
graph.DFS1()
graph.BFS(1)
console.log("第二种DFS")
graph.DFS2()