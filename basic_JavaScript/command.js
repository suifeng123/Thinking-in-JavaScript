var bindClick = function(button,func){
        //button 是即将要绑定的对象  func 是这个对象要使用的函数
	button.click = func;
};


var MenuBar = {
    refresh: function(){
        console.log('刷新菜单界面');
    }
};

var subMenu = {
      add: function(){
           console.log('增加子菜单');
      },
      del: function(){
            console.log('删除子菜单');
      }
};

bindClick(button1,MenuBar.refresh);



var setCommand = function(button,func){
     button.onclick = function(){
         func();
     }
};

var MenuBar = {
     refresh: function(){
         console.log('刷新菜单页面');
     }
};


var RefreshMenuBarCommand  =  function(receiver){
      return function(){
          receiver.refresh();
      }
};

var refreshMenuBarCommand  = RefreshMenuBarCommand(MenuBar);

setCommand(button1,refreshMenuBarCommand);



var closeDoorCommand = {
    execute: function(){
        console.log('关门');
    }
};


var openPcCommand = {
     execute: function(){
          console.log('开电脑');
     }
};


var openQQCommand = {
    execute: function(){
        console.log("登录QQ");
    }
};


var MacroCommand = function(){
    return {
        commandList: [],
	add: function(command){
	    this.commandList.push(command);
	},
	excute: function(){
	    for(var i = 0 ,command; command = this.commandList[i++];){
	            command.execute();
	    }
	}
    }
};


var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);


macro.Command.execute();

