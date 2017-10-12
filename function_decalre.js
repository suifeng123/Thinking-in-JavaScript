/*
下面展示js中函数声明和函数表达式之间的区别
  在js解释器中，它会将所有函数声明提升到源代码数的顶部
  这样即使函数调用在函数声明前面，函数也能够进行执行
 */
console.log(sum(1,2));

function sum(val1,val2) {
    return val1 + val2;
}

//但是如果将函数声明换成函数表达式，那么就会报错

console.log(sum2(1,3));

var sum2 = function(val1,val2){
	return val1+val2;
};
