//javascript中的each函数编写
$.each = function(obj,callback){
    //此中的obj是一个对象 callback代表的是一个基于
	//obj进行的回调函数
     var value,
	 i = 0,
         length = obj.length,
	 isArray = isArraylike(obj);  //进行判断obj是否是一个数组

	if(isArray){
	    for(; i < length ;i++){
	         value = callback.call(obj[i],i ,obj[i]);
		 if(value === false){
		     break;
		 }
	    }
	}else{
	    for(i in obj){ //迭代object对象
		value = callback.call(obj[i],i,obj[i]);
		if(value === false){
		    break;
		}
	    
	    }
	}

	return obj;
}
