# 用于记录在浏览器中或者移动app中出现的兼容性问题 & 及解决方案

1. ## IOS中position:fixed弹出框中的input出现光标错位的问题  
解决方案是 在弹框出现的时候给body添加fixed
```js
    body{ position: fixed; width: 100%;}
``` 

当弹框消失的时候
```js
$("body").css("position","relative")
```