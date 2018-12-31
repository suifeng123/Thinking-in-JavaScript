//使用状态模式编写一个关于电灯泡的
//首先定义一个灯泡类
var light = function(){
    this.state = 'off';  //灯泡的状态
    this.button = null;  //灯泡的开关
};

Light.prototype.init = function(){
    var button = document.createElement('button');
	var self = this;

	button.innerHTML = '开关';
	this.button = document.body.appendChild(button);
        this.button.onClick = function(){
	   self.buttonWasPressed();
	}
};

Light.prototype.buttonWasPressed = function(){
    if(this.state === 'off'){
        console.log('开灯');
	    this.state = "开灯";
    }else if(this.state === 'on'){
        console.log('关灯');
	    this.state = 'off';
    }
};

var light = new Light();
light.init();

//OffLightState
var OffLightState = function(light){
    this.light = light;
};

OffLightState.prototype.buttonWasPressed = function(){
    console.log('弱光');
	this.light.setState(this.light.weakLightState);//切换强弱
};

//weakLightState
var WeakLightState = function(light){
    this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function(){
      console.log('强光');
	this.light.setState(this.light.strongLightState);
};

//StrongLightState
var StrongLightState = function(light){
     this.light = light;
};


StrongLightState.prototype.buttonWasPressed = function(){
     console.log()
}


var Light = function(){
    this.offLightState = new OffLightState(this);
    this.weakLightState= new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
	this.button = null;
};

Light.prototype.init = function(){
    var button = document.createElement('button');
	var self = this;
	this.button = document.body.appendChild(button);
	this.button.innerHTML = '开关';

	this.currState = this.offLightState;

	this.button.onclick = function(){
	    self.currState.buttonWasPressed();
	}
};

Light.prototype.setState = function(newState){
    this.currState = newState;
};


var SuperStrongLightState = function(light){
     this.light = light;
};

SuperStrongLightState.prototype.buttonWasPressed = function(){
     console.log('关灯');
	this.light.setState(this.light.offLightState);
};


