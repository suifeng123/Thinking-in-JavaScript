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