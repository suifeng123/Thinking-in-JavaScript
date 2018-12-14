/**
 * Created by Administrator on 2017/6/13.
 */
var each = function(arr,callback){
       
	for(var i = 0 ; i < arr.length ; i++){
	     callback.call(arr[i],i,arr[i]);
	}
}

each([1,2,3],function(n,i){
	console.log( i + n);
});

var compare = function(arr1,arr2){

      if(arr1.length !== arr2.length){
           return false;
      }

	each(arr1,function(i,n){
	    //¿¿¿¿¿¿¿¿arr1¿¿¿¿¿arr2¿¿¿¿
	    if(arr1[i] !== arr2[i]){
	        return false;
	    }
	})

}
