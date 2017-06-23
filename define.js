/**
 * Created by Administrator on 2017/6/23.
 */
window.define = $.define = function(id,deps,factory) {
    var args = $.slice(arguments);
    if(typeof id==='string'){
        var _id = args.shift();
    }
    if(typeof  args[0]==="boolean"){
        //用于文件合并，在标准浏览器中跳过补丁模块
        if(args[0]){
            return;
        }
        args.shift();
    }
    if(typeof args[0] === 'function'){
        args.unshift([]);
    } //
    id = modules[id] && modules[id].state >= 1 ? id: getCurrentScript();
    factory = args[1];
    factory.id = _id;  //用于调试
    factory.delay = function(id) {
        args.push(id);
        var isCycle = true;
        try {
            isCycle = checkCycle(modules[id].deps,id);
        }catch(e){

        }
        if(isCycle){
            $.error(id+"模块与之前的某些模块存在循环依赖关系")
        }
        delete factory.delay;//释放内存
        require.apply(null,args);
    };
    if(id) {
        factory.delay(id,args);
    }else{ //先进先出
        factorys.push(factory);
    }

}