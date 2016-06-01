#scss 常用api说明
  1. 
    $xx: xx;
    body:{
      color:$xx;
    }
    
  2.引入其他scss
    @import'reset';
    
  3.插入其他class的属性
    .message{xxxx}
    .sucess{
      @extend .message;
      ...
    }    
    
  4.可以插入基本的+-*/;
    width:600px/960px*100%;
    
  5.混合
    mixin border-radius($xx){
      -webkit-xxx...
      -moz-...
      -ms-...
      ...
    }
    .box{
      @include border-radius(10px);
    }
    
