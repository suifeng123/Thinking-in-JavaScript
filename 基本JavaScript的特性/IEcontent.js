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
        try{//在DOM未建立之前调用元素doScroll抛出错误
            d.documentElement.doScroll('left');


        }catch(e){ //延迟再试
            setTimeout(arguments.callee,50);
            return;

        }
        init(); //没有错误的话进行用户回调
    })();
    //如果用户在domReady之后绑定这个函数
    d.onreadystatechange = function() {
        if(d.readyState == 'complete'){
            d.onreadystatechange = null;
            init();
        }
    }
}