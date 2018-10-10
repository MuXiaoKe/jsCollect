# JavaScript

## 在父窗口中获取 iframe 中的元素

格式：

```
window.frames["iframe的name值"].document.getElementById("iframe中控件的ID").click();
```

实例：

```
window.frames["ifm"].document.getElementById("btnOk").click();
```

格式：

```
var obj=document.getElementById("iframe的name").contentWindow;
var ifmObj=obj.document.getElementById("iframe中控件的ID");
ifmObj.click();
```

实例：

```
var obj=document.getElementById("ifm").contentWindow;
var ifmObj=obj.document.getElementById("btnOk");
ifmObj.click();
```

## 在 iframe 中获取父窗口的元素

格式：

```
window.parent.document.getElementById("父窗口的元素ID").click();
实例：window.parent.document.getElementById("btnOk").click();
```

# Jquery

## 在父窗口中获取 iframe 中的元素

格式：

```
$("#iframe的ID").contents().find("#iframe中的控件ID").click();//jquery 方法1
实例：$("#ifm").contents().find("#btnOk").click();//jquery 方法1
```

格式：

```
$("#iframe中的控件ID",document.frames("frame的name").document).click();//jquery 方法
```

实例：

```
$("#btnOk",document.frames("ifm").document).click();//jquery 方法2
```

## 在 iframe 中获取父窗口的元素

格式：

```
$('#父窗口中的元素ID', parent.document).click();
```

实例：

```
$('#btnOk', parent.document).click();
```
