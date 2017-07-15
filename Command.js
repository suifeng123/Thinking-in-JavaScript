/**
 * Created by Administrator on 2017/7/15.
 */
var MacroCommand = function() {
    return {
        commandList:[],
        add: function(command){
            this.commandList.push(command)
        },
        execute: function(){
            for(var i= 0,command;command = this.commandList[i];i++){
                command.execute();
            }
        }
    }
};

var openAcCommand = {
    execute: function(){
        console.log("打开空调");
    }
};
 var openTvCommand =  {
     execute: function(){
         console.log("打开电视");
     }
 }

var openSouncdCommand = {
    execute: function() {
        console.log("打开音响");
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSouncdCommand);
/**关门、打开电脑和登录qq**/
var closeDoorCommand = {
    excute: function() {
        console.log("打开门");
    }
};

var openPcCommand = {
    execute: function(){
        console.log("打开电脑");
    }
};

var openQQCommand = {
    execute: function(){
        console.log("打开qq");
    }
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

/**将所有的命令组合成一个超级命令**/
var openAvCommand = {
    execute: function() {
        console.log("打开空调");
    }
}
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);

macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

/**最后遥控器绑定超级命令/
*/
var setCommand = (function(command){
    document.getElementById('button').onclick = function(){
        command.execute();
    }
})(macroCommand)

var Folder = function(name) {
    this.name = name;
    this.parent = null; //增加this.parent属性
    this.files = [];
};

Folder.prototype.add = function(file) {
    file.parent = this; //这是父对象
    this.files.push(file);
};

Folder.prototype.scan = function() {
    console.log("开始进行扫描文件件："+this.name);
    for(var i= 0,file,files=this.files;file=files[i];i++){
        file.scan();
    }
}

Folder.prototype.remove = function() {
    if(!this.parent) {
        //根节点或者树外的游离节点
        return;
    }

    for(var files = this.parent.files,l=files.length-1;l>=0;l--){
        var file = files[l];
        if(file===this){
            files.splice(l,1);
        }
    }
}

var File = function(name){
    this.name = name;
    this.parent = null;
};

File.prototype.add = function(){
    throw new Error("不能添加在文件下面");
};

File.prototype.remove = function(){
    console.log('开始扫描文件:'+this.name);
};

File.prototype.remove = function(){
    if(!this.parent){
        //根节点或者树外的游离节点
        return;
    }

    for(var files = this.parent.files,l=files.length-1;l>=0;l--){
        var file = files[l];
        if(file===this){
            files.splice(l,1);
        }
    }
};

var Coffee = function(){};

Coffee.prototype.boilWater = function() {
    console.log("把水煮开");
};

Coffee.prototype.brewCoffeeGriends = function(){
    console.log('把沸水冲咖啡');
};

Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒进杯子');
};

Coffee.prototype.addSugerAndMilk = function(){
    console.log('加糖和奶');
};

Coffee.prototype.init = function(){
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugerAndMilk();
};

var coffee = new Coffee();
coffee.init();


/*
一个统一的办法
 */

var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('把水煮开');
};

Beverage.prototype.brew = function() {

}; //空方法，应该由子类重写

Beverage.prototype.pourInCup = function() {

};

Beverage.prototype.addCondiments = function(){};

Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};


var Coffee = function(){};

Coffee.prototype = new Beverage();

Coffee.prototype.brew = function() {
    console.log('把沸水冲进咖啡');
};

Coffee.prototype.pourInCup = function() {
    console.log("吧咖啡倒进杯子");
};

Coffee.prototype.addCondiments = function(){
    console.log('加糖和奶');
};
var Coffee = new Coffee();
Coffee.init();

var Tea = function(){

};


Tea.prototype = new Beverage();
Tea.prototype.brew = function(){
    console.log('把沸水浸泡茶叶');
};

Tea.prototype.pourInCup = function(){
    console.log('把茶倒进杯子');
};

Tea.prototype.addCondiments = function(){
    console.log('加柠檬');
};

var tea = new Tea();
tea.init();



