/**
 * Created by Administrator on 2017/6/14.
 */
var Event = (function(){
    var clientList = {};
    var listen;
    var trigger;
    var remove;
    listen = function(key,fn){
        if(!clientList[key]){
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function() {
        var key = Array.prototype.shift.call(arguments);
        var fns = clientList[key];
        if(!fns || fns.length === 0){
            return false
        }
        for(var i= 0,fn;fn=fns[i++];){
            fn.apply(this.arguments);
        }
    };

    remove = function(key,fn){
        var fns = clientList[key];
        if(!fns){
            return false
        }
        if(!fn){
            fns && (fns.length = 0)
        }else {
            for(var l=fns.length-1;l>=0;l--){
                var _fn = fns[l];
                if(_fn === fn){
                    fns.splice(l,1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

Event.listen('squareMeter88',function(price){
    console.log("�۸�="+price);
}); //С�충�ĵ���Ϣ

Event.trigger('squareMeter88',20000);