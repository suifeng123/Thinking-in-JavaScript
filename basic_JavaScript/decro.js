//提供一种装饰者模式的开发
var obj = {
    name:"seven",
    address:"深圳市"
};

obj.address = obj.address + "福田区";


//一个飞机的类
var Plane = function(){}

Plane.prototype.fire = function(){
     console.log('发射普通子弹');
};

//接下来增加两个装饰类
var MissibleDecorator = function(plane){
     this.plane = plane;
};

//让这个装饰类进行具有相应的动作
MissibleDecorator.prototype.fire = function(){
     this.plane.fire();
     console.log('发射导弹');
};

var AtomDecorator = function(plane){
      this.plane = plane;
      
};
AtomDecorator.prototype.fire = function(){
       this.plane.fire();
	console.log('发射原子弹');
}
//进行相关测试
var plane = new Plane();
plane = new MissibleDecorator(plane);
plane = new AtomDecorator(plane);

plane.fire();

//装饰者模式能够帮助再不改变原函数代码的情况下
//进行修改函数
window.onload = function(){
   alert(1);
}

var _onload = window.onload || function(){}

window.onload = function(){
   _onload();
	alert(2);
}

Function.prototype.before = function(beforefn){
     var _self = this; //使用原函数的引用
     return function(){
         beforefn.apply(this,arguments);

	 return _self.apply(this,arguments);
     }
}


Function.prototype.after = function(afterfn){
  var _self = this;
	return function(){
	    var ret = _self.apply(this,arguments);
		afterfn.apply(this,arguments);
		return ret;
	}
}

//获取Token的函数
var getToken = function(){
    return 'Token';
}

var ajax = function(type,url,param){
    param = param || {};
    param.token = getToken();
};



