//用于对于一个数组进行复制
Array.prototype.duplicate = function(){
     return this.concat(this);
}


//对这个函数进行验证操作
console.log([1,2,3,4].duplicate())
