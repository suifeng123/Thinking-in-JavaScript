//进行javascript命令行模式的编写
var setCommand = function(button,command){
      //首先将button  和 command 进行传输进函数中
      button.onclick = function(){
           command.execute();
      }
}


var MenuBar  = {
     //进行刷新的功能
     refresh: function(){
           console.log('刷新菜单目录');
     }
};

var SubMenu = {
     //进行另一个按钮的的功能的展示
     add: function(){
         console.log('增加子菜单');
     },
     del: function(){
         console.log('删除子菜单');
     }
}

var RefreshMenuBarCommand = function(receiver){
     this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.excute = function(){
     this.receiver.refresh();
};


var AddSubMenuCommand = function(receiver){
     this.receiver = receiver;   
};

AddSubMenuCommand.prototype.execute = function(){
    this.receiver.add();
};

var DelSubMenuCommand = function(receiver){
     this.receiver = receiver;   
};


DelSubMenuCommand.prototype.execute = function(){
    console.log('删除子菜单');
};
