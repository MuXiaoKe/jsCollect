# jsCollect
收集平时工作、学习中一些js片段、常用效果、组件等

##前端资源的一点好的规范
页面 js 存放在 ./static/js 下，公共的库放在 ./static/js/lib 下，公共库只压缩不合并，页面 js 压缩并合并。

页面 css 存放在 ./static/css 下，公共的css放在 ./static/css/common 下，公共 css 只压缩不合并，页面 css 压缩并合并。

图片资源中小于3kb的图片以 base64 方式内联，图片放在 ./static/img 下。
