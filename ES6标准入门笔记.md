# 变量的解构赋值

## 数组
```js
let [a, b, c] = [1, 2, 3];
a // 1
b // 2
c // 3
```
###扩展运算符
其用处类似于把数组转为 所需要的参数
```js
console.log(...[1,2,3]) // 1 2 3

function f(x, y, z){
    //...
}
var args = [0, 1, 2];
f(...args);
```
还可以把字符串转为真正的数组  
` [...'hello']    // ['h','e','l','l','o'] `

把dom选择器选出来的类数组转化为真正的数组
```js
var nodelist = document.querySelectorAll('div');
var array = [...nodelist];
```



## 对象

let { bar , foo } = { foo: "aaa", bar: "bbb" }  
作为对象时候，次序不一定要完全一致，只要属性名字相同即可。

## 字符串

const [a, b, c, d, e] = 'hello';  
a // "h"         b // "e" ...  
此时的字符串被转换成一个类数组对象。  

#### 字符串的新方法：
* includes() 返回布尔值，表示是否找到了参数字符串  
* startWith()  返回布尔值，表示参数字符串是否在源字符串头部
* endWith()  返回布尔值，表示参数字符串是否在源字符串尾部
* repeat() 返回新的字符串 ，表示将源字符串重复n次

##### 模板字符串
``  用2个反引号表示.  
如果模板字符串里面有变量，则可以用${ }表示, 大括号里面的是可执行的js代码。  
${}的大括号里面可以嵌套模板  
例如：  
 ```
var name ="zh",time = "2018";
`hello ${name} , how are you ${time}`
 ```

 ## Number
 isNaN(),isFinite(),parseInt(),parseFloat()现在都放在 Number对象下。


 Number.isinteger() 判断一个值是否是整数  
 Number.EPSILON   极小的常量 目的在于为浮点数计算设置一个误差范围
 例如：0.1+0.2 //0.30000000000000004

 ## Math
 Math.trunc()  用于去除一个数的小数部分，返回整数部分  
 Math.sign()  判断一个数是正数 +1、负数 -1，还是零 0，-0 -0，其他 NaN。