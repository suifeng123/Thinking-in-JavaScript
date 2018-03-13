//一个实现bind的函数，其运行速度比原始函数好
function bind(fn,ctx){
     function boundFn(a){
         var l = arguments.length; //首先获取参数的长度
	 return l
	      ? l > 1
	        ? fn.apply(ctx,arguments)
		  :fn.call(ctx,a)
		 :fn.call(ctx)
	}
}
