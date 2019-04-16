//进行对象的深拷贝和浅拷贝
function cloneShallow(source){
	var target = {};
	for(var key in source){
		if(Object.prototype.hasOwnProperty.call(source,key)){
			target[key] = source[key];
		}
	}
	return target;
}

//测试用例
var a = {
	name: "muyiy",
	book: {
		title: "You Don't Know JS",
		price: "45"
	},
	a1: undefined,
	a: null,
	a3: 123
}

var b = cloneShallow(a);

a.name = "高级前端进阶";
a.book.price = "55";

console.log(b);

//深度拷贝
function cloneDeep1(source){
	var target = {};
	for(var key in source){
		if(Object.prototype.hasOwnProperty.call(source,key)){
			if(typeof source[key] === 'object'){
				target[key] = cloneDeep1(source[key]);
			}else{
				target[key] = source[key];
			}
		}
	}
	return target;
}

//使用上面测试用例测试一下
var b = cloneDeep1(a);
console.log(b); 

//上述方法没有对数组进行兼容操作
function isObject(obj){
	return typeof obj === 'object' && obj !== null;
}

function cloneDeep2(source){
	if(!isObject(source)) return source;//非对象进行
	var target= Array.isArray(source) ? [] : {};
	
	for(var key in source){
		//如果包含所需要的
		if(Object.prototype.hasOwnProperty.call(source,key)){
			if(isObject(source[key])){
				target[key] = cloneDeep2(source[key]);// 
			}else{
				target[key] = source[key];
			}
		}
	}
	
	return target;
}

//使用上面的测试用例测试一下
var b = cloneDeep2(a);
console.log(b);