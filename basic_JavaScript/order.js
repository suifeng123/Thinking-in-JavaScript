//进行责任链的js
var order = function(orderType,pay,stock){
     if(orderType === 1){
         //500元的购买模式
	 if(pay === true){
	     console.log("500元定金预购，得到100元优惠券");
	 }else{
	     if(stock > 0){
	         console.log('普通购买，无优惠券');
	     }else{
	         console.log('手机库存不足');
	     }
	 }
     }else if(orderType === 2){
         if(pay === true){
	     console.log('200元订购金预购，得到50元优惠券');
	 }else{
	    if(stock > 0){
	        console.log('普通购买，无优惠券');
	    }else{
	       consol.log('手机库存不足');
	    }
	 }
     }else if(orderType === 3){
         if(stock > 0){
	     console.log('普通购买，无优惠券');
	 }else{
	    console.log('手机库存不足');
	 }
     }
}
