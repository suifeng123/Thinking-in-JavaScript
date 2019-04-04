//对img的相应的对象
var report = function(src){
	var img = new 	Image();
	img.src = src;
};

var report = (function(){
	var imgs = [];
	return function(src){
		var img = new Image();
		imgs.push(img);
		img.src = src;
	}
})();

var extent = function(){
	var value = 0;
	return {
		call: function(){
			value++;
			console.log(value);
		}
	}
};

var extent = extent();
extent.call();
extent.call();
extent.call();