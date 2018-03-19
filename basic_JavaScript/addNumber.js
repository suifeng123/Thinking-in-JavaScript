//首先我们不能充分新人别人的代码
addNumbers(x,y){
   //首先我们要确认输入的是数字
   if(typeof x != 'number' || typeof y != 'number'){
        throw Error('Bad parameters');
    }
     //如果到达这里，可以通过+安全的机型数字的相加
     return x+y;
     }


