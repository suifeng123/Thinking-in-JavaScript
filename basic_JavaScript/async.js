//进行获取async
async function hello(flag){
     if(flag){
          return "hello world";
     }else{
          throw "happen Error";
     }
}

console.log(hello(0));
console.log(hello(1));
