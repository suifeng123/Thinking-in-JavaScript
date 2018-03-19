//once函数的形成
function once(fn){
   var called = false;
   return function(){
      if(!called){
         called = true;
	 fn.apply(this,arguments);
      }
     }
 }
