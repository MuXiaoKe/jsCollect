/**
 * Created by ZLY on 2015/9/17.
 */
//domready:
//ie>=9可以使用DOMContentLoaded
//ie8
function IEContentLoaded(w, fn){
    var d= w.document, done = false,
        init = function(){
            if(!done){
                done = true;
                fn();
            }
        } ;
    (function(){
        try{
            d.documentElement.doScroll('left');
        } catch(e) {
            setTimeout(arguments.callee, 50);
            return;
        }
        init();
    })();
    //domready之后绑定这个函数
    d.onreadystatechange = function(){
        if(d.readyState =='complete'){
            d.onreadystatechange = null;
            init();
        }
    } ;
}

//判断ie版本
ie = !!window.ActiveXObject;
ie8= window.toStaticHTML && !! window.XDomainRequest;
ie9 = window.msPerformance;



