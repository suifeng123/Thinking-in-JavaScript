function qSort(list){
    if(list.length == 0){
    	return [];
    }
    var lesser = [];
    var greater = [];
    //设置一个基准值
   var pivot = list[0];
   for(var i = 0; i < list.length; i++){
   	if(list[i] < pivot){
   		lesser.push(list[i]);
   	}else{
   		greater.push(list[i]);
   	}
   }
   var temp_arr1 = qSort(lesser);
   var temp_arr2 = qSort(greater);
   return temp_arr1.concat(pivot,temp_arr2);
}

var a = [];
for(var i = 0; i < 3; i++){
	a[i] = Math.floor(Math.random()*100+1);
}
var b=[32,3]
console.log(a);
console.log('快速排序后的结果为:');
console.log(qSort(b));