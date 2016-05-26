js的API

Array;//shuzu
Array.length;// 长度

var a = [1,2];
//方法
a.concat();//链接2个或更多数组并返回结果a.concat（4，5）；或者2个数组a.cancat(b)
a.join();//把数组所有元素放入一个字符串。返回的是字符串；元素通过制定分隔符分割；a.join（｜）；
a.pop();//删除并返回数组的最后一个元素
a.push();//向数组末尾添加一个或多个元素并返回新的长度；a.push(3)这时会返回该数组的长度  3
a.reverse();//用于颠倒数组中元素额顺序；改变原来的而非创建新的数组；
a.shift();//删除并返回数组的第一个元素／／第一个元素被删除了，原数组还有除第一个元素外的其他元素，该方法自身返回第一个元素
a.slice();//从已有的数组中返回选定的元素，a.slice(start,end) 规定开始和结束；从0开始；返回的是新数组不修改原数组
a.sort();//对数组的元素进行排序，默认按字母顺序排
a.splice();//在数组中添加／删除项目，然后返回被删除的项目splice(index,要删除项目数量是0则不会删除项目，可选向数组添加新项目)

a.toString();//数组转换成字符串
a.toLocaleString();//
a.unshift();//向数组的开头添加一个或更多元素，并返回新的长度
a.valueOf();//返回原始值


var m = Math;

m.abs(x);//返回数的绝对值
m.ceil(x);//对数进行上舍入
m.floor(x);//下舍入
m.max(x,y);//返回最高值
m.min(x,y);//最低值
m.random();//返回0～1之间的随机数
m.round(x);//把数四舍五入为最接近的整数

Number;

tofixed(num)//可以吧数字四舍五入为指定小数位数的数字


var s = String;
s.charAt();//返回在指定位置的字符 从0开始计算
s.concat();//链接字符串str1.concat(str2)
s.indexOf(searchvalue,fromindex);//第一个参数是搜索的字符串，第二个可选，为开始检索的位置从0开始；
s.lastIndexOf();// 从后向前搜索
s.match();// 找到一个或多个正则的匹配
s.replace();//替换与正则匹配的子串
s.search();// 返回第一个与正则匹配的子串的起始位置
s.slice(start,end);//提取字符串的莫格部分，并以新的字符串返回被提取的部分
s.split();//2个参数，第一个为字符串或者正则从该参数指定的地方分割，第二个参数为可选，指定返回的数组的最大长度；
//如果是空的字符串("")则每个字符都会被分割
s.substring(start,stop);//用于提取字符串中介于2个指定下标之间的字符,第二个参数可选
s.toUpperCase();//
s.toLowerCase();//


//子节点
st.children
//父节点
st.parentNode
//元素在页面上最近定位的腹肌元素
st.offsetParent  
//第一个字元素
st.firstChild||st.firstElementChild

st.nexSibling||nextElementSibling
previousSibling||previousElementSibling

/*在ie中的兼容性*/
event.cancalBubble=ture;/*等价于*/  event.stopPropagation();
event.returnValue=flase;/*等价于*/  event.preventDefault();
event.srcElement /*等价于*/  event.target;

/*时间发生时鼠标指针在视口中水平坐标*/event.clientX
/*时间发生时鼠标指针在视口中垂直坐标*/event.clientY

document.documentElement.scrollTop||document.body.scrolltop  //垂直滚动位置

//获取当前样式
currentStyle||getComputedStyle();

contextmenu //上下文菜单事件

查询窗口的视口尺寸
window.innerWidth,window.innerHeight
//ie8级以下
document.documentElement.clientWidth,document.documentElement.clientHeight

function getViewportSize(w){
    w = w || window;

    if(w.innerWidth != null){
        return {
            x:w.innerWidth,y:w.innerHeight
        }
        
    }
    var d = w.document;
    if(document.compatMode == "CSS1Compat"){
        return {
            x:d.documentElement.clientWidth,y:d.documentElement.clientHeight
        }
        
    }
}

查询窗口滚动条的位置
window.pageXOffset,window.pageYOffset
//ie8及以下
document.documentElement.scrollLeft,document.documentElement.scrollTop

function getScrollOffsets(w){
    w = w || window;

    if(w.pageXOffset != null){
        return {
            x:w.pageXOffset,y:w.pageYOffset
        }
        
    }
    var d = w.document;
    if(document.compatMode == "CSS1Compat"){
        return {
            x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop
        }
        
    }
}

查询元素的几何位置
getBoundingClientRect()  //改方法返回元素在在视口坐标中的位置

例如：
var box = e.getBoundingClientRect();
var offsets = getScrollOffsets();
var x = box.left+offsets.x;  //转化为文档坐标
var y = box.top + offsets.y;



//end
 事件存在currentTarget和target
target永远指向当前事件真正的目标，而currentTarget则指向注册的那个元素  例如注册到body元素上



/*通过事件处理函数和事件触发分离的思想处理多事件*/
var btn = document.getElementById("myBtn");
var handler = function(event){
    switch (event.type){ //事件类型
        case "click":
            alert("click");
            break;
        case "mouseover":
            event.target.style.backgroundColor = "red";
            break;
        case "mouseout":
            event.target.style.backgroudColor = "";
            break;
    }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;

//过滤html代码
this.value = this.value.replace(/<[\/\!]*[^<>]*>/ig,"");

JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串。
