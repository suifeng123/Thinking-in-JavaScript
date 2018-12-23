function awaitMethod(num){
     return new Promise((resolve,reject) => {
           setTimeout(()=>{
	       resolve(2 * num);
	   },2000)
     })
}


//使用await 必须配和async函数
async function test(){
    let result = await awaitMethod(30); 
    let result1 = await awaitMethod(50);
    let result2 = await awaitMethod(30);
    console.log(result+result1+result2);
}

 test();
