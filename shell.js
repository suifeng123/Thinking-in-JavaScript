function shellsort(){
	for(var g = 0; g < this.gaps.length ; ++g){
		for(var i = this.gaps[g]; i < this.dataStore.length;i++){
			var temp = this.dataStore[i];
			for(var j = i; j >= this.gaps[g]&&this.dataStore[j-this.gaps[g]]>temp;j -= this.gaps[g]){
				this.dataStore[j] = this.dataStore[j - this.gaps[g]];
			}
			this.dataStore[j] = temp;
		}
	}
}

this.gaps = [5,3,1];

function setGaps(arr){
	this.gaps = arr;
}

function swap(arr,i,j){
	var temp;
	temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
function shellsort1() {
	var N = this.dataStore.length;
	var h = 1;
	while(h < N/3){
		h = h *3 + 1;
	}
	while(h >= 1){
		for(var i = h; i < N; i++){
			for(var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h];j-=h){
                 swap(this.dataStore,j,j-h);
			}
		}
		h = (h-1)/3;
	}
}

var nums = new Array(100);
for(var i = 0; i < nums.length; i++){
	nums[i] = (Math.random()*100).toFixed();
}
console.log('希尔排序前:');
console.log(nums)
nums.shellsort1();
console.log('希尔排序后');
console.log(nums);

