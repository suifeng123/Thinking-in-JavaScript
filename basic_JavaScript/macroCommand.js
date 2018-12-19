//进行组合模式的开发
var MacroCommand = function(){
     return {
          commandList:[],
	  add: function(command){
	      this.commandList.push(command);
	  },
	  execute: function(){
	       for(var i = 0,command; command = this.commandList[i++];){
	              command.execute(); //进行命令的执行
	       }
	  }
     }
};

var openTvCommand =   {
      execute: function(){
         console.log('打开电视');
      },
      add: function(){
          throw new Error('叶子节点不能再继续添加节点');
      }
};


var macroCommand = new MacroCommand(); //进行命令行的创建操作
macroCommand.add(openTvCommand);
macroCommand.execute(); //进行命令的执行操作
openTvCommand.add(macroCommand);
