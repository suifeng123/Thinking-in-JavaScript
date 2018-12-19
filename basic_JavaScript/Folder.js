//创建一个文件夹的对象  这个对象具有以下属性，文件夹的名字  文件夹中的文件
var Folder = function(name){
     this.name = name;
     //这个文件夹中包含有文件
     this.files = [];
}

//文件夹这个函数对象中包含有一些方法
//
Folder.prototype.add = function(file){
     this.files.push(file);
};

//对文件夹中的文件进行浏览操作
//
Folder.prototype.scan = function(){
	console.log('开始扫描文件夹' + this.name);
     for(var i = 0 ; i < this.files.length; i++){

           this.files[i].scan();
     }
};

//定义一个文件的类
var File = function(name){
    this.name = name;
}

//对于文件不能进行
File.prototype.add = function(){
     throw new Error('叶子节点不能继续添加');
};

//文件进行扫描的函数
File.prototype.scan = function(){
     console.log('文件扫描'+ this.name);
};

//对文件夹继续
var folder1 =  new Folder('前端资料');
var file1 = new File('javascript编程');
folder1.add(file1);
var folder2 = new Folder('node.js');
var file2 = new File('node.js开始只能');
folder2.add(file2);
var folder = new Folder('D盘');
folder.add(folder1);
folder.add(folder2);

folder.scan();
