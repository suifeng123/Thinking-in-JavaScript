//写一个贪心算法
var sum = 637;
var arr = [1,5,10,50,100,500];

//var length = 0;//定义一个所使用的算法的长度

function solve(sum,arr){
     var ans = 0;
     for(var i = 6 ; i > 0 ; i--){
     	var temp = parseInt(sum / arr[i-1]);
     	console.log(temp);
     	ans  = ans + temp; //获取这里需要多少枚的这种硬币
     	sum  = sum - temp * arr[i-1];
     	if(sum==0) break;//结束这个循环
     }

     console.log('一共需要'+ ans+'枚硬币');
     console.log('这个是最佳的算法');
}

solve(sum,arr);