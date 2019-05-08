/*事件处理函数*/
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			//基本不会用到
			element["on" + type] = handler;
		}
	},

	getEvent: function(event) {
		return event ? event : window.event;
	},

	getTarget: function(event) {
		return event.target || event.srcElement;
	},

	preventDefault: function(event) {
		if (evnet.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancalBubble = true;
		}
	}
};

//例子：
EventUtil.addHandler(window, "load", function(event) {
	var div = document.getElementById("mydiv");

	EventUtil.addHandler(div, "contextmenu", function(event) {
		event = EventUtil.getEvent(event);
		EventUtil.preventDefault(event);

		var menu = codument.getElementById("myMenu");
		menu.style.left = event.clientX + "px";
		menu.style.top = event.clienty + "px";
		menu.style.visibility = "visible";
	});

	EventUtil.addHandler(document, "click", function(event) {
		document.getElementById("myMenu").style.visibility = "hidden";
	});
});

//select()方法
//可以实现文本框进入焦点时全选
//var target =EventUtil.getTarget(event); target.select();

/*自定义事件*/
function EventTarget() {
	this.hanlders = {};
}

EventTarget.prototype = {
	constructor: EventTarget,
	addHandler: function(type, hanlder) {
		if (typeof this.hanlders[type] == "undefined") {
			this.hanlders[type] = [];
		}
		this.hanlders[type].push(handler);
	},
	fire: function(event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	},
	removehandler: function(type, handler) {
		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.legnth; i < len; i++) {
				if (handlers[i] === handler) {
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}
};

/*  拖拽
 *   依赖自定义时间和事件包EventUtil、EventTarget
 */
var DragDrop = (function() {
	var dragdrop = new EventTarget();
	var dragging = null;
	var diffX = 0;
	var diffY = 0;

	function handleEvent(evnet) {
		//获取事件与目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		//确定事件类型
		switch (event.type) {
			case "mousedown":
				if (target.className.indexOf("draggable") > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetTop;
					dragdrop.fire({
						type: "dragstat",
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;

			case "mousemove":
				if (dragging !== null) {
					//get event
					event = EventUtil.getEvent(event);
					//assign location
					dragging.style.left = event.clientX - diffX + "px";
					dragging.style.top = event.clientY - diffY + "px";
					//触发自定义事件
					dragdrop.fie({
						type: "drag",
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;

			case "mouseup":
				dragdrop.fie({
					type: "dragend",
					target: dragging,
					x: event.clientX,
					y: event.clientY
				});
				dragging = null;
				break;
		}
	}
	//公共接口
	return {
		enable: function() {
			EventUtil.addHandler(document, "mousedown", hanlderEvent);
			EventUtil.addHandler(document, "mousemove", hanlderEvent);
			EventUtil.addHandler(document, "mouseup", hanlderEvent);
		},
		disable: function() {
			EventUtil.removeHandler(document, "mousedown", hanlderEvent);
			EventUtil.removeHandler(document, "mousemove", hanlderEvent);
			EventUtil.removeHandler(document, "mouseup", hanlderEvent);
		}
	};
	return dragdrop;
})();

//拖拽的自定义事件调用方式
DragDrop.addHandler("dragstat", function(event) {
	var status = document.getElementById("status");
	status.innerHTML = "started dragging" + event.target.id;
});

//寻找class
function getByClass(pare, cla) {
	var ele = pare.getElementByTagName("*");
	var res = [];
	var i = 0;
	for (i = 0; i < ele.length; i++) {
		if ((ele[i].className = cla)) {
			res.push(ele[i]);
		}
	}
	return res;
}

//从一个对象的属性复制到另一个对象中
function extend(o, p) {
	for (prop in p) {
		o[prop] = p[prop];
	}
	return o;
}

//延迟对象执行示例
var wait = function(dtd) {
	var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象

	var tasks = function() {
		alert("执行完毕！");

		dtd.resolve(); // 改变Deferred对象的执行状态
	};

	setTimeout(tasks, 5000);

	return dtd.promise(); // 返回promise对象
};

$.when(wait())

	.done(function() {
		alert("哈哈，成功了！");
	})

	.fail(function() {
		alert("出错啦！");
	});

/*图片预加载的问题*/
var imgLoad = function(url) {
	var img = new Image();
	img.src = url;
	if (img.complete) {
		callback(img.width, img.height);
	} else {
		img.onload = function() {
			callback(img.width, img.height);
			img.onload = null;
		};
	}
};
/*实时预览上传图片*/
var upPreviewImg = function(options) {
	var _e = options.e,
		preload = null;
	_e.onchange = function() {
		var _v = this.value,
			_body = document.body;
		//图片正则
		picReg = /(.JPEG|.jpeg|.jpg|.JPG|.GIF|.gif|.BMP|.bmp|.PNG|.png){1}/;
		//简单的图片格式验证
		if (!picReg.test(_v)) {
			return false;
		}

		var reader = new FileReader(),
			_file = this.files[0]; //读取被加载的文件对象

		reader.onload = (function(file) {
			return function() {
				options.previewImgSrc.setAttribute("src", this.result);
				options.previewImgSrc.style.display = "block";
			};
		})(_file);
		//监听文件读取的错误处理
		reader.onerror = function() {};
		//读取文件内容
		reader.readAsDataURL(_file);
	};
};
upPreviewImg({
	e: document.getElementById("file"),
	previewImgSrc: document.getElementById("previewImgSrc")
});
/* html结构
<form action="">
    <div id="previewImg">
        <img src="" id="previewImgSrc alt="" />
    </div>
    <input type='file' id='upPreviewImg' name='fileimg />
</form>*/

/**
 * 判断移动的方向,结果是Left, Right, Up, Down中的一个
 * @param  {} x1 起点的横坐标
 * @param  {} x2 终点的横坐标
 * @param  {} y1 起点的纵坐标
 * @param  {} y2 终点的纵坐标
 */

function swipeDirection(x1, x2, y1, y2) {
	/**
	 * 1. 第一个三元运算符得到如果x轴滑动的距离比y轴大，那么是左右滑动，否则是上下滑动
	 * 2. 如果是左右滑动，起点比终点大那么往左滑动
	 * 3. 如果是上下滑动，起点比终点大那么往上滑动
	 * 需要注意的是这里的坐标和数学中的有些不一定 纵坐标有点反过来的意思
	 * 起点p1(1, 0) 终点p2(1, 1)
	 */
	return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
		? x1 - x2 > 0
			? "Left"
			: "Right"
		: y1 - y2 > 0
		? "Up"
		: "Down";
}

//   axios增加请求失败重连的方法
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
	var config = err.config;
	// If config does not exist or the retry option is not set, reject
	if (!config || !config.retry) return Promise.reject(err);

	// Set the variable for keeping track of the retry count
	config.__retryCount = config.__retryCount || 0;

	// Check if we've maxed out the total number of retries
	if (config.__retryCount >= config.retry) {
		// Reject with the error
		return Promise.reject(err);
	}

	// Increase the retry count
	config.__retryCount += 1;

	// Create new promise to handle exponential backoff
	var backoff = new Promise(function(resolve) {
		setTimeout(function() {
			resolve();
		}, config.retryDelay || 1);
	});

	// Return the promise in which recalls axios to retry the request
	return backoff.then(function() {
		return axios(config);
	});
});
//To use:
axios
	.get("/some/endpoint", { retry: 5, retryDelay: 1000 })
	.then(function(res) {
		console.log("success", res.data);
	})
	.catch(function(err) {
		console.log("failed", err);
	});
