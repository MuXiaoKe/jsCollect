#scss 常用 api 说明

1.


    $xx: xx;
    body:{
      color:$xx;
    }

2.引入其他 scss
@import'reset';
  
 3.插入其他 class 的属性
.message{xxxx}
.sucess{
@extend .message;
...
}  
  
 4.可以插入基本的+-*/;
width:600px/960px*100%;
  
 5.混合
@mixin border-radius($xx){
-webkit-xxx...
-moz-...
-ms-...
...
}
.box{
@include border-radius(10px);
}

为便于书写，@mixin 可以用 = 表示，而 @include 可以用 + 表示
