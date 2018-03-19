//用来实现一个散列值
function makeMap(
    str,
    expectsLowerCase
){
    var map = Object.create(null);
    var list = str.split(',');
    for(var i = 0 ; i < list.length ; i++){
         map[list[i]] = true;
    }
    
    return expectsLowerCase ?
            function(val){ return map[val.toLowerCase()]; }
	    : function(val){ return map[val];}
}
