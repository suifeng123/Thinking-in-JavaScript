//进行责任链模式的开发
var order50 = function(orderType,pay,stock){
      if(orderType === 1 && pay === true){
          console.log('500元订单预购，得到100优惠券');
      }else{
           order200(orderType,pay,stock);
      }
};

//200元订单
var order200 = function(orderType,pay,stock){
     if(orderType === 2 && pay === true){
         console.log('200元定金预购，得到50优惠券');
     }else{
        //进行消息传递信息
	orderNormal(orderType,pay,stock);
     }
};

//进行普通购买订单
var orderNormal = function(orderType,pay,stock){
     if(stock > 0){
          console.log('普通购买，无优惠券');
     }else{
         console.log('手机库存不足');
     }
};
