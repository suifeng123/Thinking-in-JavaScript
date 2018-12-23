//进行对象池的创建
var toolTipFactory = (function(){
       var toolTipPool = []; //tooltip  对象池

	return {
	    create: function(){
	        if(toolTip.length == 0){
		    //如果对象池为空
		     var div = document.createElement('div');
		     document.body.appendChild(div);
			return div;
		}else{
		     return toolTipPool.shift();
		}
	    },
	    recover: function(tooltipDom){
	        return toolTipPool.push(tooltipDom);
	    }
	}
})();

var ary = [];

for(var i = 0,str; str = ['A','B'][i++];){
    var toolTip = toolTipFactory.create();
	toolTip.innerHTML = str;
	ary.push(tooltip);
}
