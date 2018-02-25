//进行输入的参数
var N,arr1,arr2;


//固定K,求对应的最小反转数
//无解的话则返回-1

function cal(){
   memset(f,0,sizeof(f));
   var res = 0;
   var sum = 0;

   for(var i = 0; i + k <= N; i++){
        //计算区间[i,i+K-1]
	if((dir[i]+sum)%2 !=0){
	    //前端的牛朝向后方
	    res++;
	    arr[i] = 1;
	 }

	 sum += arr[i];
	 if(i - K +1 >= 0){
	   sum -= f[i-K+1];
	   }
	}

	//检查剩下的牛是否有面朝后方的情况

	for(var i = N - K + 1; i < N; i++){
	     if((dir[i]+sum)%2 != 0){
	         //无解
		 return -1;
            }
	    if(i - K + 1 >= 0){
	       sum -= f[i-K+1];
	       }
	   }


	   return res;
	}



