function bubbleSort2(arr){
	console.log('改进后的冒泡排序算法');
	var i = arr.length -1; //初始时，最后的位置保持不变
	while(i>0){
		var pos = 0;//记录
		for(var j = 0;j< i ;j++){
			if(arr[j] > arr[j+1]){
				pos = j; //记录交换的位置
				var tmp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = tmp;
			}

		}
		i = pos;
	}
	console.log('改进后的冒泡排序结束');
	return arr;
}

var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

console.log(bubbleSort2(arr));