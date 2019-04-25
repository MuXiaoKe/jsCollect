// 常用工具类函数

/**
 * 随机字符串
 */
const randomString = () =>
    Math.random()
        .toString(36)
        .substring(7)
        .split("")
        .join(".");

/**
 * 动态创建文件下载的方法
 * @param {文件内容} content
 * @param {文件名字} filename
 */
const Downloadtext = function(content, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

const DownloadImg = function(domImg, filename) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    eleLink.download = filename;
    eleLink.style.display = "none";
    // 图片转base64地址
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var imgWidth = domImg.naturalWidth;
    var imgHeight = domImg.naturalHeight;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    context.drawImage(domImg, 0, 0);
    // 如果是PNG图片，则canvas.toDataURL('image/png')
    eleLink.href = canvas.toDataURL("image/jpeg");
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};

// 数组扁平化  递归的处理   还可以用 ...扩展运算符  处理二维数组
function flatten(arr) {
    var res = [];
    arr.map(item => {
        if (Array.isArray(item)) {
            res = res.concat(flatten(item));
        } else {
            res.push(item);
        }
    })
    return res  
}
