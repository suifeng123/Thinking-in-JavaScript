//进行文件夹的编写操作
var Folder = function(name){
    this.name = name;
    //定义文件夹一个父节点
    this.parent = null;
    this.files = [];

};

Folder.prototype.add = function(file){
     file.parent = this; //设置父对象  设置文件
     this.files.push(file);

};

Folder.prototype.scan = function(){
     //进行扫描文件夹中的文件
     console.log('进行扫描文件夹：' + this.name);
	for(var i = 0 ; i < this.files.length ; i++){
	       this.files[i].scan();
	}
};

//对文件进行移除操作
//
Folder.prototype.remove = function(){
    if(!this.parent){
         //如果没有根节点
	  return;
    }

	for(var files = this.parent.files,l = files.length - 1; l >= 0 ; l--){
	     var file = files[l];
		if(file == this){
	             files.splice(l,1);
		}
	}
};

//实现File的函数
//
var File = function(name){
    this.name = name;
    this.parent = null;
};

File.prototype.add = function(){
   throw new Error('不能添加文件下面');
};

File.prototype.scan = function(){
    console.log('开始扫描文件'+ this.name);
};

File.prototype.remove = function(){
      if(!this.parent){
           return;
      }

	for(var files = this.parent.files,l= files.length - 1; l >= 0;l--){
	    var file = files[l];
		if(file === this){
		    files.splice(l,1);
		}
	}
};
