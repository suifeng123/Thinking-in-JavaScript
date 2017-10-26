function sum(num1,num2){
	return num2 + num1;
}

function callSum1(num1,num2){
	console.log(arguments);
	console.log(typeof arguments);
	for(var i in arguments) console.log(i+":"+arguments[i]);
	return sum.apply(this,arguments); //其实这里arguments也是数组的一种
}

function callSum2(num1,num2){
	return sum.apply(this,[num1,num2]);
}


console.log(callSum1(10,10));
console.log(callSum2(10,10));

//下面是传入call的方法，这个方法传入的是不是数组，必选全部传入
function callSum3(num1,num2){
	return sum.call(this,num1,num2);
}


console.log(callSum3(10,10));

//call apply真正用处是扩充函数的作用域
global.color = "red";
var o = {
	color: "blur"
};

function showColor(){
	console.log(this.color);
}

showColor.call(this); //这里this指向全局
showColor.call(global);
console.log(this === global);
showColor.call(o);

/*
bind的用法：这个函数会返回一个函数的实例，这个实例会绑定一个作用域
 */
var wang = {
	color: '5555'
}
var anotherShowColor = showColor.bind(wang);
anotherShowColor();