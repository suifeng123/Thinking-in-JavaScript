function bubble(arr){
  var len = arr.length;
  for(var j = 0 ; j< len ;j++){
  for(var i = 0 ; i < len - 1 -j  ; i++){
    if(arr[i]>arr[i+1]){
      var temp = arr[i];
         arr[i] = arr[i+1];
         arr[i+1] = temp;
    }
  }
}
return arr;
}
var arr = [3,44,556,89,20];
console.log('原先的数据');
console.log(arr);
console.log('经过冒泡排序后的数据');
console.log(bubble(arr));
