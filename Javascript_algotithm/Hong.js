/**
 * Created by Administrator on 2017/6/15.
 */

var closeDoorCommand = {
    execute: function(){
        console.log("¿¿¿¿¿");
    }
};

var openPcCommand = {
    execute: function(){
        console.log("¿¿¿¿¿¿");
    }
};

var openQQCommand =  {
    execute: function() {
        console.log("¿¿QQ¿¿¿");
    }
};

var MacroCommand = function() {
    return {
        commandList:[],
        add: function(command){
            this.commandList.push(command);
        },
        execute: function() {
            for(var i= 0,command;command=this.commandList[i++];){
                command.execute();
            }
        }

    }

};

var aa = MacroCommand();
aa.add(openPcCommand);
aa.add(openQQCommand);
aa.add(closeDoorCommand);

aa.execute();//
