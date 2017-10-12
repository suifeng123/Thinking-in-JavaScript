//桶排序算法
function sort_tong(arr,max){
	var newarr = new Array(max).fill(0);  //建立一个桶
	console.log(arr);
	for(var i = 0 ; i < arr.length ; i++){
        newarr[arr[i]]++; //在相应的桶上进行标记
	}
	console.log(newarr);
	//打印相应的桶
	for(var i=0; i < newarr.length;i++){
		if(newarr[i]!==0) console.log(i);
	}
}

var arr = [15,9,1,2,8,10,14];
sort_tong(arr,15);