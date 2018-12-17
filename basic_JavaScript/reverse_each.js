//实现一个倒序的迭代器

var reverseEach = function(ary,callback){
     //进行倒序的数组形式
     for(var l = ary.length - 1; l >=0 ; l--){
           //对函数进行回调函数的应用
	   callback(ary[l]);
     }
}


//对这个函数进行相应的测试
reverseEach([1,2,3],function(n){
    console.log('函数测试成功');
    console.log(n);
})
