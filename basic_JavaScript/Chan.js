//进行责任链模式的编写
//Chain.prototype.setNextSuccessor 指定再
//Chain.prototype.passRequest 传递给某个节点


var Chain = function(fn){
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
};

Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this,arguments);

    if(ret === 'nextSuccessor'){
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }

	return ret;
};

//进行三个链式结构的创建
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);


Chain.prototype.next = function(){
     return this.successor && this.successor.passRequest.apply(
     this.successor,arguments);  
};

var fn1 = new Chain(function(){
      console.log(1);
      return 'nextSuccessor';
});

var fn2 = new Chain(function(){
     console.log(2);
     var self = this;
     setTimeout(function(){
         self.next();
     },1000);
});

var fn3 = new Chain(function(){
      console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

