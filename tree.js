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

function BST(){
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
}

function insert(data){
	var n = new Node(data,null,null);
	if(this.root == null){
		this.root = null;
	}else{
		var current = this.root;
		var parent;
		while(true){
			parent = current;//将父节点赋值给当前节点
			if(data < current.data){
				current = current.data;
				if(current == null){
					parent.left = n;
					break;
				}
			}else{
				current = current.data;//重新赋值current的值
				if(current == null){
                   parent.right = n;
                   break;
				}
			}
		}
	}
}
