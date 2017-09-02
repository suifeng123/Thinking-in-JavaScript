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
console.log('中根序遍历的结果如下');
inOrder(nums.root);