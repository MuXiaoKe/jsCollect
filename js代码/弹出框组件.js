// zh  2016/2/18
;(function(win){
    var doc = document,
        query = 'querySelectorAll',
        getClass = 'getElementByClassName';
//默认配置
    var config = {
        type: 0,//设置弹层的类型，0表示信息框，1表示页面层，2表示加载层
        shade:true,//是否显示遮罩
        shadeClose:true,//是否点击遮罩时关闭层
        fixed:true,//是否固定层的位置
        anim:true//是否动画弹出
    };
    //设置一些私有方法
    var self = {
        extend: function (obj) {
             var newobj = JSON.parse(JSON.stringify(config)) ;
             for(var i in obj){
                newobj[i]= obj[i];
             } 
             return newobj;
        },

        //时间
        timer:{},
        end:{},
        touch: function(elem, fn){
            var move;
            elem.addEventListener('touchmove',function(){
                move = true;
            }, false);
            elem.addEventListener('touchend',function(e){
                e.preventDefault();
                move || fn.call(this, e);
                move = false;
            }, false);

        }
    };

    var index = 0,
        classs = ['popupbox'],
        popup = function( options){
            this.config = self.extend(options);
            this.view();
        };

    //源性方法
    popup.prototype.view = function(){
        var config = this.config,
            popbox = doc.createElement('div');

        this.id = popbox.id = classs[0] +index;
        popbox.setAttribute('class', classs[0] + '' + classs[0]+(config.type || 0 ));
        popbox.setAttribute('index', index);

        //弹出层标题
        var title = (function(){

        });
        //按钮
        var button = (function(){
            var btns = (config.btn || []).length,
                btndom;

            if(btns === 0 || !config.btn){
                return '';
            }
            btndom = '<span type="1">'+ config.btn[0] +'</span>';
            if(btns === 2){
                btndom = '<span type="0">'+ config.btn[1] +'</span>' + btndom;
            }
            return '<div class="popupbtn">'+ btndom + '</div>';
        })();
        if( !config.fixed ){
            config.top = config.hasOwnProperty('top') ? config.top :100;
            config.style = config.style || '';
            config.style += ' top:'+(doc.body.scrollTop + config.top) + 'px';
        }
        //html
        popbox.innerHTML = (config.shade ? '<div '+ (typeof config.shade === 'string' ? 'style="'+ config.shade +'"' : '') +' class="popupshade"></div>' : '')
            +'<div class="popupmain" '+ (!config.fixed ? 'style="position:static;"' : '') +'>'
            +'<div class="section">'
            +'<div class="popupchild '+ (config.className ? config.className : '') +' '+ ((!config.type && !config.shade) ? 'popupborder ' : '') + (config.anim ? 'popupanim' : '') +'" ' + ( config.style ? 'style="'+config.style+'"' : '' ) +'>'
            + title
            +'<div class="popupcont">'+ config.content +'</div>'
            + button
            +'</div>'
            +'</div>'
            +'</div>';

        document.body.appendChild(popbox);

        var that = this;
        var elem = this.elem = doc.query('#'+that.id)[0];
        //层弹出成功的回调
        config.success && config.success(elem);

        this.index = index++;
        //todo
    }

})(window);
