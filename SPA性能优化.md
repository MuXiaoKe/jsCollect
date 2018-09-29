# SPA 性能优化的几点方案

1. 路由懒加载
2. 图片懒加载
3. 浏览器缓存(localStorage)
4. 图片压缩
5. 开启 GZIP 压缩

## 优化加载的方法

-   在 HTML 内实现 Loading 态或者骨架屏；
-   去掉外联 css；
-   缓存基础框架；
-   使用动态 polyfill；
-   使用 SplitChunksPlugin 拆分公共代码；
-   正确地使用 Webpack 4.0 的 Tree Shaking；
-   使用动态 import，切分页面代码，减小首屏 JS 体积；
-   编译到 ES2015+，提高代码运行效率，减小体积；
-   使用 lazyload 和 placeholder 提升加载体验。
