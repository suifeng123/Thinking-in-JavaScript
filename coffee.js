//我要成为顶级的交易员
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('把水煮开');
};

Beverage.prptotype.brew = function(){
    //如果发现子类中没有重新这个方法的话，就抛出异常的
    throw new Error('子类必须重写brew方法');

}; //空方法  应该有子类重写


Beverage.prototype.pourInCup = function(){
     throw new Error('子类方法必须进行重写');
};

Beverage.prototype.addCondiments = function(){
     throw new Error('子类方法必须进行重写');
};

Beverage.prototype.customerWantsCondiments = function(){
       return true; //默认允许添加调料
};

Beverage.prototype.init = function(){
    //进行相应的初始化操作
     this.brew();
     this.pourInCup();
	if(this.customerWantsCondiments()){
           this.addCondiments();
	}
};

//创建一个函数为Tea 此函数的原型执行Beverage， 
var Coffee = function(){};

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function(){
     console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function(){
      console.log('把咖啡倒进杯子');
};

Coffee.prototype.addCondiments = function(){
    console.log('加糖和牛奶');
};

var coffee = new Coffee();
coffee.init();


//进行钩子函数的调用
var CoffeeWithHook = function(){};

CoffeeWithHook.prototype = new Beverage();

CoffeeWithHook.prototype.brew = function(){
      console.log('用沸水冲泡咖啡');
};

CoffeeWith.prototype.pourInCup = function(){
      console.log('将咖啡倒进杯子');
};


CoffeeWithHook.prototype.addCondiments = function(){
      console.log('加糖和牛奶');
};


CoffeeWithHook.prototype.customerWantsCondiments = function(){
     return window.confirm('请问需要调料吗?');
};

var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
