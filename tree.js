function Node(data,left,right){
	//实现二叉树时一个最基本的节点
	this.data = data;
	this.left = left;
	this.right = right;
	this.show = show;
}

function show(){
	return this.data; //返回一个节点的数据
}
//创建一个二叉树
function BST(){
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
}

function insert(data){
	var n = new Node(data,null,null);
	if(this.root == null){
		this.root = n;
	}else{
		var current = this.root;
		var parent;
		while(true){
			parent = current;//将父节点赋值给当前节点
			if(data < current.data){
				current = current.left;
				if(current == null){
					parent.left = n;
					break;
				}
			}else{
				current = current.right;//重新赋值current的值
				if(current == null){
                   parent.right = n;
                   break;
				}
			}
		}
	}
}

//中根序遍历
function inOrder(node){
	if(!(node==null)){
		inOrder(node.left);
		console.log(node.show()+" ");
		inOrder(node.right);
	}
}

function preOrder(node){
	if(!(node==null)){
		console.log(node.show()+" ");
		preOrder(node.left);
		preOrder(node.right);
	}
}
//后序遍历的算法
function postOrder(node){
	if(!(node == null)){
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.show());
	}
}

function getMin(){
	var current = this.root;
	while(!(current.left==null)){ //这里是一个循环
		current = current.left;
	}
	return current.data;
}

function getMax(){
     var current = this.root;
     while(!(current.right == null)){
     	current = current.right;
     }
     return current.data;
}

function find(data){
	var current = this.root;
	while(current != null){
		if(current.data == data){
			return current;
		}else if(data<current.data){
			current = current.left;
		}else{
			current = current.right;
		}
	}
	return null;
}

function remove(data){
	root = removeNode(this.root,data);
}

function removeNode(node,data){
	if(node == null){
		return null;
	}
	if(data == node.data){
		//没有子节点的节点
		if(node.left == null && node.right == null){
			return null;
		}
		//没有左子节点的节点
		if(node.left == null){
			return node.right;
		}
		//没有右子节点的节点
		if(node.right == null){
			return node.left;
		}
		//有两个节点的节点
		var tempNode = getSmallest(node.right);
		node.data = tempNode.data;
		node.right = removeNode(node.right,tempNode.data);
	}else if(data < node.data){
		node.left = removeNode(node.left,data);
	}
	eles{
		node.right = removeNode(node.right,data);
		return node;
	}
}
//下面是一个测试用例
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
