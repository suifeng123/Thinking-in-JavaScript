/**
 * Created by Administrator on 2017/6/22.
 */
function IEContentLoaded(w,fn){
    var d = w.document,done = false;
    var init = function() {
        if(!done){
            done = true;
            fn();
        }
    };
    (function() {
        try{//��DOMδ����֮ǰ����Ԫ��doScroll�׳�����
            d.documentElement.doScroll('left');


        }catch(e){ //�ӳ�����
            setTimeout(arguments.callee,50);
            return;

        }
        init(); //û�д���Ļ������û��ص�
    })();
    //����û���domReady֮����������
    d.onreadystatechange = function() {
        if(d.readyState == 'complete'){
            d.onreadystatechange = null;
            init();
        }
    }
}