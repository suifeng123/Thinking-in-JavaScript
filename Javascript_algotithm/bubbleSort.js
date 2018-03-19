//javsScript 实现的经典算法
function bubbleSort(arr){
	var len = arr.length;

	for(var i = 0; i < len; i++){

		for(var j = 0; j < len - i -1;j++){
			if(arr[j] > arr[j+1]){ //相邻元素进行对比
				var temp = arr[j];
				    arr[j] = arr[j+1];
				    arr[j+1] = temp;

			}
		}
	}
	return arr;
}

var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];

console.log(bubbleSort(arr));