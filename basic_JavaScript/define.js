/**
 * Created by Administrator on 2017/6/23.
 */
window.define = $.define = function(id,deps,factory) {
    var args = $.slice(arguments);
    if(typeof id==='string'){
        var _id = args.shift();
    }
    if(typeof  args[0]==="boolean"){
        //�����ļ��ϲ����ڱ�׼���������������ģ��
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
    factory.id = _id;  //���ڵ���
    factory.delay = function(id) {
        args.push(id);
        var isCycle = true;
        try {
            isCycle = checkCycle(modules[id].deps,id);
        }catch(e){

        }
        if(isCycle){
            $.error(id+"ģ����֮ǰ��ĳЩģ�����ѭ��������ϵ")
        }
        delete factory.delay;//�ͷ��ڴ�
        require.apply(null,args);
    };
    if(id) {
        factory.delay(id,args);
    }else{ //�Ƚ��ȳ�
        factorys.push(factory);
    }

}