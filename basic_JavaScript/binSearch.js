function binSearch(arr,data){
	var upperBound = arr.length - 1;//保存这个数组的长度
	var lowerBound = 0;
	while(lowerBound <= upperBound){
		var mid = Math.floor((upperBound + lowerBound)/2);
		if(arr[mid] < data){
			lowerBound = mid + 1;
		}else if(arr[mid]>data){
			upperBound = mid -1;
		}else{
			return mid;
		}
	}
	return -1;
}

function counter(){
	var count  = 0;
	var position = binSearch(arr,data);
	if(position > -1){
		++counter;
		for(var i = position - 1; i > 0; --i){
			if(arr[i] == data){
				++count;
			}else{
				break;
			}
		}
		for(var i = position + 1; i < arr.length ; i++){
			if(arr[i] == data){
				count++;
			}else{
				break;
			}
		}
	}
	return count;
}

