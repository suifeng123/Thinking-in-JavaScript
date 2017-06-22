/**
 * Created by Administrator on 2017/6/22.
 */
jQuery.isPlainObject = function(obj) {
    //首先排除基础类型不为object的对象，然后是DOM节点和window对象
    if(typeof  obj !== 'object' || obj.nodeType || jQuery.isWindow(obj)){
        return false
    }
    try{
        if(obj.constructor && !hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){
            return false
        }
    }catch(e){
        return false
    }
    return true
}