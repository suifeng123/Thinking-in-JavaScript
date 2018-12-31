//对象的写法
var properties = {
   width: 1,
   height: 1
};

if(properties[someName]){
    //do something
}


//Set 的写法
var properties = new Set();

properties.add('width');
properties.add('height');

if(properties.has(someName)){
    //do something
}
//进行数组
var items = new Set([1,2,3,4,5]);
var array = Array.from(items);
