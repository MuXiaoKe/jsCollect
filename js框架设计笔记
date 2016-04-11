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

//jquery作者的继承实现
(function(){
    var initializing = false,
        fnTest = /xyz/.test(function(){
            xyz;
        })  ? /\b_super\b/ : /.*/;

    this.Class =function(){}   ;
    //生成目标类的子类
    Class.extend = function(prop){
        var _super = this.prototype;//保存父类的原型
        //阻止init触发
        initializing =true;
        var prototype = new this();//创建子类的原型
        //重新打开方便真是用户可以调用init
        initializing = false ;
        // 将prop李的东西组个复制到prototype，如果是函数讲特殊处理一下
        //因为复制过程中可能掩盖了超累的同名方法，如果这个函数里面存在_super的字样，就笼统地
        //认为他需要调用父类的同名方法，那么我们需要重新当前的函数
        //重新函数运营了闭包，因此fntest正在可以减少我们重新方法的个数，
        //因为不是每个同名函数都会向上调用父类方法
        for( var name in prop){
            prototype[name] = typeof prop[name] === "function" &&
                typeof _super[name] === "function" && fnTest.test(prop[name]) ?
                (function( name, fn) {
                    return function(){
                        var tmp = this._super;//保存到临时变量中
                        //当我们调用时，把父类的同方法覆写到_super里
                        this._super = _super[name];
                        //执行当前方法（this._super已被重写），得到想要的效果
                        var ret = fn.apply(this, arguments);
                        //还原this_super
                        this._super = tmp;
                        //返回结果
                        return ret;
                    }  ;
                }) (name,prop[name]) :
                prop[name];
        }
        //目标类的真实构造器
        function Class() {
            //防止在生成子类的原型（new this（））时触发用户传入的构造器init，使用init..进行牵制
            if( !initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }
        //原型赋值
        Class.prototype =prototype;
        //确保原型上constructor正确的指向自身
        Class.prototype.constructor = Class;
        //添加extend类方法，生于生产他的子类
        Class.extend = arguments.callee;
        return Class;
    }
})();

var Animal = Class.extend({
    init:function(name){
        this.name = name;
    } ,
    shout : function(s){
        console.log(s);
    }
})   ;
   var animal = new Animal();
animal.shout('animal');
var Dog = Animal.extend({
    init: function(name, age){
        this._super.apply(this, arguments);
        this.age =age;
    } ,
    run: function(s){
        console.log(s);
    }
}) ;
var dog = new Dog("dog",4);

