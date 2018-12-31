//进行函数的赋值操作
var _jQuery = window.jQuery,_$ = window.$;

jQuery.extend({
	noConflict: function(deep){
	    window.$ = _$;//这时再放回去
	    if(deep){
	        window.jQuery = _jQuery;

	    }
            return jQuery;
	}


	function extend(destination,source){
	    //进行函数的扩展操作
	    for(var property in source){
	         destination[property] = source[property];
	    }

		return destination;
	}
