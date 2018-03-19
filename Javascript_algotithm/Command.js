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
        console.log("�򿪿յ�");
    }
};
 var openTvCommand =  {
     execute: function(){
         console.log("�򿪵���");
     }
 }

var openSouncdCommand = {
    execute: function() {
        console.log("������");
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSouncdCommand);
/**���š��򿪵��Ժ͵�¼qq**/
var closeDoorCommand = {
    excute: function() {
        console.log("����");
    }
};

var openPcCommand = {
    execute: function(){
        console.log("�򿪵���");
    }
};

var openQQCommand = {
    execute: function(){
        console.log("��qq");
    }
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

/**�����е�������ϳ�һ����������**/
var openAvCommand = {
    execute: function() {
        console.log("�򿪿յ�");
    }
}
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);

macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

/**���ң�����󶨳�������/
*/
var setCommand = (function(command){
    document.getElementById('button').onclick = function(){
        command.execute();
    }
})(macroCommand)

var Folder = function(name) {
    this.name = name;
    this.parent = null; //����this.parent����
    this.files = [];
};

Folder.prototype.add = function(file) {
    file.parent = this; //���Ǹ�����
    this.files.push(file);
};

Folder.prototype.scan = function() {
    console.log("��ʼ����ɨ���ļ�����"+this.name);
    for(var i= 0,file,files=this.files;file=files[i];i++){
        file.scan();
    }
}

Folder.prototype.remove = function() {
    if(!this.parent) {
        //���ڵ�������������ڵ�
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
    throw new Error("����������ļ�����");
};

File.prototype.remove = function(){
    console.log('��ʼɨ���ļ�:'+this.name);
};

File.prototype.remove = function(){
    if(!this.parent){
        //���ڵ�������������ڵ�
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
    console.log("��ˮ��");
};

Coffee.prototype.brewCoffeeGriends = function(){
    console.log('�ѷ�ˮ�忧��');
};

Coffee.prototype.pourInCup = function(){
    console.log('�ѿ��ȵ�������');
};

Coffee.prototype.addSugerAndMilk = function(){
    console.log('���Ǻ���');
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
һ��ͳһ�İ취
 */

var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('��ˮ��');
};

Beverage.prototype.brew = function() {

}; //�շ�����Ӧ����������д

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
    console.log('�ѷ�ˮ�������');
};

Coffee.prototype.pourInCup = function() {
    console.log("�ɿ��ȵ�������");
};

Coffee.prototype.addCondiments = function(){
    console.log('���Ǻ���');
};
var Coffee = new Coffee();
Coffee.init();

var Tea = function(){

};


Tea.prototype = new Beverage();
Tea.prototype.brew = function(){
    console.log('�ѷ�ˮ���ݲ�Ҷ');
};

Tea.prototype.pourInCup = function(){
    console.log('�Ѳ赹������');
};

Tea.prototype.addCondiments = function(){
    console.log('������');
};

var tea = new Tea();
tea.init();



