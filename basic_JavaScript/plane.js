//实现Javascript的装饰着模式的开发
var plane = {
    fire: function(){
        console.log('发射子弹');
    }
}

var missileDecorator = function(){
    console.log('发射导弹');
}

var atomDecorator = function(){
    console.log('发射原子弹');
}

var fire1 = plane.fire;//首先保存一个变量

plane.fire = function(){
    fire1();
    missileDecorator();
}

var fire2 = plane.fire;
plane.fire = function(){
     fire2();
     atomDecorator();
}

plane.fire();
