function add(getX,getY,cb){
     var x,y;
     getX( function(xVal){
          x = xVal;
	  //两个都准备好了吗
	  if(y!=undefined){
	      cb(x+y);
	   }
	});

     getY( function(yVal){
          y = yVal;
	  //两个都准备好了？
	  if(x != undefined){
	      cb(x+y);
	      }
	      });
}


//fetchX()  和  fetchY() 是同步或者异步函数
add(fetchX,fetchY,function(sum){
     console.log(sum);
     });
