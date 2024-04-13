/** 二分搜索算法 ****/
function binarySearch(nums, target) {
	let left = 0, right = nums.length - 1;
	 while(left <= right) {
		 let mid = left + Math.floor((right - left) / 2);
		 if(target === nums[mid]) {
			 return mid;
		 } else if (target > nums[mid]) {
			 left = mid + 1
		 } else if (target < nums[mid]) {
			 right = mid - 1;
		 }
	 }
	 
	 return -1;
}

// 寻找左边界
function binaryLefBound(nums, target) {
	let left = 0, right = nums.length - 1;
	while(left <= right) {
		let mid = left + Math.floor((right - left) / 2);
		if (target === nums[mid]) {
			right = mid -1;
		} else if (target > nums[mid]) {
			left = mid + 1;
		} else if(target < nums[mid]) {
			right = mid - 1;
		}
	}
	
	// 进行处理边界条件
	if(left >= nums.length || nums[left] != target) {
		return -1;
	}
	return left;
}

// 寻找右边界
function binaryRightBound(nums, target) {
	let left = 0, right = nums.length - 1;
	while(left <= right) {
		let mid = left + Math.floor((right - left) / 2);
		if (target === nums[mid]) {
			left = mid + 1;
		} else if (nums[mid] > target) {
			right = mid - 1;
		} else if (target < nums[mid]) {
			left = mid +1;
		}
	}
	
	if (right < 0 || nums[right] != target) 
	   return -1
	return right;   
}

console.log(binaryRightBound([1,3,3,3,5,6], 3));
