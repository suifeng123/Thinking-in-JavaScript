let tree = {
	'id1': {
		message: 'hello'
	},
	'id2':{
		message:'world',
        children:{
        	'id2-1':{
        		message:'haha',
        		children:{

        		}
        	},
        	'id2-2':{
        		message:'heihei'
        	}
        }
	}
}

//递归实现版本
function dfs(tree={},messages=[]){
	let i = 0;
	//第一层的解析
	if(!messages) messages = [];

	if(tree.message) messages.push(tree.message);
    // console.log(tree.children);
     
	//解析子树
	const keys = Object.keys(tree.children || {});
	
	while( i < keys.length){
		dfs(tree.children[keys[i]],messages);
		i += 1;
	}
	return messages;
}

 tree = {
	message:null,
	children:tree
}

console.log(dfs(tree))

function dfs2(tree={}){
	const array = [tree];
	let messages = [];
	while(array.length){
		const top = array.pop();
		if(top.message){
			messages.push(top.message);
		}

		const keys = Object.keys(top.children || []);
		let i = keys.length;
		while(i>0){
			i -= 1;
			array.push(top.children[keys[i]]);
		}
		
	}
	return messages;
}

let tree1 = {
	'id1': {
		message: 'hello'
	},
	'id2':{
		message:'world',
        children:{
        	'id2-1':{
        		message:'haha',
        		children:{

        		}
        	},
        	'id2-2':{
        		message:'heihei'
        	}
        }
	}
}
var tree2 = {
	message:null,
	children:tree1
}

console.log(dfs2(tree2));