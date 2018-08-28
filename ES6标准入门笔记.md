# 变量的解构赋值

## 数组

```js
let [a, b, c] = [1, 2, 3];
a; // 1
b; // 2
c; // 3
```

###扩展运算符
其用处类似于把数组转为 所需要的参数

```js
console.log(...[1, 2, 3]); // 1 2 3

function f(x, y, z) {
	//...
}
var args = [0, 1, 2];
f(...args);
```

还可以把字符串转为真正的数组  
`[...'hello'] // ['h','e','l','l','o']`

把 dom 选择器选出来的类数组转化为真正的数组

```js
var nodelist = document.querySelectorAll("div");
var array = [...nodelist];
```

#### Array.from

将类似数组的对象和可遍历对象转为真正的数组；  
`Array.from({'0':1,'1':2,'2':3,length:3})`
对象必须得有 length;
可用于 dom 对象；

#### Array.of

该方法用于将一组值转换为数组
Array.of(1,2,3) //[1,2,3]

#### find() \ findIndex()

一个是找到并返回第一个符合条件的数组成员；

```js
[1, 2, 3, -1].find(n => n < 0); //-1
```

另一个是返回第一个符合条件的数组成员的位置。

```js
[1, 2, 3, -1].find(function(value, index, arr) {
	return value > 2;
}); //2
```

#### 数组实例的 fill()

使用给定值填充一个数组

```js
["a", "b", "c"].fill(7); // [7,7,7]
new Array(3).fill(null); //  [null, null, null]
```

#### 数组实例的 includes（）

返回一个布尔值，表示数组是否包含给定的值  
[1,2,3].includes(2) // true

## 对象

let { bar , foo } = { foo: "aaa", bar: "bbb" }  
作为对象时候，次序不一定要完全一致，只要属性名字相同即可。

### Object.is()

用来比较两个值是否完全相等 和===有一定的区别
is()表示同值相等
Object.is({},{}) // false
Object.is(+0,-0) // false
Object.is(NaN,NaN) // true

### Object.assign()

用于将源对象的所有可枚举属性复制到目标对象

```js
var target = { a: 1, b: 2 };
var source1 = { b: 3, c: 4 };
var source2 = { c: 5, d: 6 };
Object.assign(target, source1, source2); //{ a:1 , b:3 , c:5 ,d:6 }
```

该方法是浅复制，如果源对象属性是对象，只会复制得到这个对象的引用

## 字符串

const [a, b, c, d, e] = 'hello';  
a // "h" b // "e" ...  
此时的字符串被转换成一个类数组对象。

#### 字符串的新方法：

-   includes() 返回布尔值，表示是否找到了参数字符串
-   startWith() 返回布尔值，表示参数字符串是否在源字符串头部
-   endWith() 返回布尔值，表示参数字符串是否在源字符串尾部
-   repeat() 返回新的字符串 ，表示将源字符串重复 n 次

##### 模板字符串

`` 用 2 个反引号表示.  
如果模板字符串里面有变量，则可以用${ }表示, 大括号里面的是可执行的 js 代码。  
${}的大括号里面可以嵌套模板  
例如：

```
var name ="zh",time = "2018";
`hello ${name} , how are you ${time}`
```

## Number

isNaN(),isFinite(),parseInt(),parseFloat()现在都放在 Number 对象下。

Number.isinteger() 判断一个值是否是整数  
 Number.EPSILON 极小的常量 目的在于为浮点数计算设置一个误差范围
例如：0.1+0.2 //0.30000000000000004

## Math

Math.trunc() 用于去除一个数的小数部分，返回整数部分  
 Math.sign() 判断一个数是正数 +1、负数 -1，还是零 0，-0 -0，其他 NaN。

## Set

新的数据结构 。类似于数组 ，成员值都是唯一的，没有重复。

```js
const s = new set();
[2, 3, 4, 5, 4, 3].forEach(x => s.add(x)); //Set(4) {2, 3, 4, 5}
```

## Map

值值对应的集合，比 Object 的“字符串-值”更完善。 可以在键上放对象。

```js
const m = new Map();
const o = { p: "hello world" };
m.set(o, "content");
m.get("o"); //"conetnt"

const map = new Map([["name", "zhangsan"], ["title", "ahtor"]]);
```

## Class

extends 用来表示继承父类

```js
class B extends A {
	constructor(...args) {
		super(...args);
	}
}
```

super 在继承时是必须要的，可以用 super.fangfa() 。
可以调用父类原型链上的方法。但是属性不能调用到。
