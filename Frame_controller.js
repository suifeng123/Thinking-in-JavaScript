//创建一个框架的控制器
var exports = this;

(function($){
	var mod = {};

	mod.create = function(includes){
		var result = function(){
			this.init.apply(this,arguments); //this 表示上下文的执行环境，aguments必须是数组
		};

		result.fn = result.prototype;

		result.fn.init = function(){};

		result.proxy = function(func) {return $.proxy(func,this);};
		result.fn.proxy = result.proxy;

		result.include = function(ob){$.extend(this.fn,ob);};
		result.extend = function(ob){$.extend(this,ob);};
		if(includes) result.include(includes);

		return result;

	}

	exports.Controller = mod;


})(jQuery);

//状态机函数
var Events = {
	bind: function(){
		if(!this.o) this.o = $({});
		this.o.bind.apply(this.o,arguments);
	},

	trigger: function(){
		if(!this.o) this.o = $({});
		this.o.trigger.apply(this.o,arguments);
	}
};

var StateMachine = function(){};
StateMachine.fn = StateMachine.prototype;

//添加事件绑定或者触发行为
$.extend(StateMachine.fn,Events);

StateMachine.fn.add = function(controller){
	this.bind("change",function(e,current){
		if(controller === current)
			controller.activate();
		else
			controller.deactivate();
	});

	controller.activate = $.proxy(function(){
		this.trigger("change",controller);
	},this);
};

