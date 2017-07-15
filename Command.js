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