//下面实现改进后的排序算法
function bubble(arr){
  var pos = 0; //首先预定一个位置
  for(var i = 0; i < arr.length ; i++){

    for(var j = 0; j < arr.length - 1 - i;j++){
      if(arr[j] > arr[j+1]){
        //进行标记
        pos = i;
        var temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
      }
    }

  }
  return arr;
}
var arr = [9,8,23,34,89,70231];
console.log('排序前的数组的排序如下');
console.log(arr);
console.log('排序后的数组的排序如下');
console.log(bubble(arr));


function bubble2(arr){
  //对排序算法继续进行改进，对数组进行双向排序
  var low = 0;
  var high = arr.length - 1; //数组的
  while(low < high){
    
  }
}
