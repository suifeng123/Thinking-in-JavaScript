//对象爆炸
var id = 0;
window.startUpload = function(uploadType,files){
     //UploadType区分是控件还是flash
    for(vari = 0,file; file = files[i++];){
         var UploadObj = new Upload(UploadType,file.fileName,file.fileSize);
	    UploadObj.init(id++);
    }
};


var Upload = function(uploadType,fileName,fileSize){
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
	this.dom = null;
};

Upload.prototype.init = function(id){
    var that = this;
	this.id = id;
	this.dom = document.createElement('div');
	this.dom.innerHTML = '<span>文件名称：'+
		this.fileName + ',文件大小：'+
		this.fileSize + '</span>'+
		'<button class="delFile"删除</span>';

	this.dom.querySelector('.delFile').onClick = function(){
	   this.delFile();
	}

	document.body.appendChild(this.dom);
};

Upload.prototype.delFile = function(){
    if(this.fileSize < 3000){
         return this.dom.parentNode.removeChild(this.dom);
    }


    if(window.confirm('确定要删除文件吗?'+ this.fileName)){
         return this.dom.parentNode.removeChild(this.dom);
    }
};

var Upload = function(uploadType){
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id){
     uploadManager.setExternalState(id,this);

     if(this.fileSize < 3000){
          return this.dom.parentNode.removeChild(this.dom);
     }
}



