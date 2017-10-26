var addChange = function(ob){
    ob.change = function(callback){
    	if(callback){
    		if(!this._change)  this._change = [];
    		this._change(callback);
    	}else {
    		if(!this._change) return;
    		for(var i = 0; i < this._change.length; i++){
    			this._change[i].apply(this);
    		}
    	}
    }
}

var object = {};
object.name = "Foo";
object.change(function(){
	console.log('Changed!',this);
	//在这里可以添加更新视图代码
});

object.change();
object.name = "Bar";
object.change();
