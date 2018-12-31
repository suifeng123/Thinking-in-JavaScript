//
var each = function(obj,callback){
     var value;
	var i;
	var length = obj.length;
	var  isArray = isArraylike(obj);

	if(isArray){
	    //¿¿¿¿¿
	    for(; i < length; i++){
	         callback.call(obj[i],i,obj[i]);
	    }
	}else {
	    for(i in obj){
	        value = callback.call(obj[i],i, obj[i]);
	    }
	}
	
	return obj;
};


var appendDiv = function(data){
       each(data,function(i,n){
            var div = document.createElement('div');
	       div.innerHTML = n;
	       document.body.appendChild(div);
       });
};


appendDiv([1,2,3,4,5,6]);
appendDiv([a:1,b: 2,c:3,d: 4]);


//¿¿¿¿¿¿¿¿¿
var createLoginLayer = (function(){
     var div;
     return function(){
          if(!div){
	       div = document.createElement('div');
	       div.innerHTML = '¿¿¿¿¿¿';
	       div.style.display = 'none';
	       document.body.appendChild(div);
	  }
	  return div;
     }
})();

var getSingle = function(fn){
     //¿¿¿¿
     var result;
	return function(){
	    return result || (result = fn.apply(this,arguments));
	}
};

var createLoginLayer = function(){
        //¿¿¿¿¿¿
	var div = document.createElement('div');
	div.innerHTML = '¿¿¿¿¿¿';
	document.body.appendChild(div);
	return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();

var mult = (function(){
     var cache = {}; //¿¿¿¿¿¿¿¿
     return  function(){}{
         var args = Array.prototype.join.call(arguments,',');
	     if(cache[args]){
	         return cache[args];
	     }
 
	     var a = 1;
	     for(var i = 0, l=arguments.length; i< l; i++){
                  a = a * arguments[i];	         
	     }

	     return cache[args] = a;
     }
})();

Function.prototype.after = function(afterfn){
     var __self = this;
     return function(){
          var ret = __self.apply(this,arguments);
	      afterfn.apply(this,arguments);
	       return ret;
     }
};

window.onload = (window.onload || function(){}).after(
    function(){
         console.log(document.getElementsByTagName('*').length);
    }
);

var makeSound = function(animal){
    if(animal instanceof Duck){
        console.log('¿¿¿');
    }else if(animal instanceof Chicken){
        console.log('¿¿¿');
    }
};


var Duck = function(){};
var Chicken = function(){};

makeSound(new Duck());
makeSound(new Chicken());

var getUserInfo = function(callback){
    $.ajax();
};

getUserInfo(function(data){
    console.log(data.userName);
});

getUserInfo(function(data){
     console.log(data.userId);
});

var arrayMap = function(ary,callback){
   var i = 0,
       length = ary.length,
	value,
        ret = [];

	for(; i < length; i++){
	    value = callback(i,ary[i]);
	    ret.push(value);
	}

	return ret;
}

var a = arrayMap([1,2,3],function(i,n){
     return n * 2;
});

var b = arrayMap([1,2,3],function(i,n){
    return n * 3;
});


