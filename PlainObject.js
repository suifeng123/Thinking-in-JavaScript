/**
 * Created by Administrator on 2017/6/22.
 */
jQuery.isPlainObject = function(obj) {
    //�����ų��������Ͳ�Ϊobject�Ķ���Ȼ����DOM�ڵ��window����
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