//迭代器
var Iterator = function(obj){
    var current = 0;

	var next = function(){
	     return current >= obj.length;
	};

	var isDone = function(){
	     return current >= obj.length;
	};

	var getCurrItem = function(){
	    return obj[current];
	};

	return{
	   next: next,
	   isDone: isDone,
	   getCurrItem: getCurrItem
	}
};
