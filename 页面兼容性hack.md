# 用于记录在浏览器中或者移动 app 中出现的兼容性问题 & 及解决方案

1. ## IOS 中 position:fixed 弹出框中的 input 出现光标错位的问题
    解决方案是 在弹框出现的时候给 body 添加 fixed

```js
    body{ position: fixed; width: 100%;}
```

当弹框消失的时候

```js
$("body").css("position", "relative");
```

#IE 浏览器的判断
!window.addEventListener &&
!!document.documentMode &&
document.documentMode <9

!window.addEventListener 为 ie11 以下
document.documentMode 文档模式 仅 ie 支持。他的数字为 ie 下的渲染版本 。 9 就是 ie9 模式

#安卓手机调用 input 会出现没有摄像头选项
