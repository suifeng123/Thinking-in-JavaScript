//编程数组的函数
function toArray(list,start){
    start = start || 0; //避免没有start的函数
    var i = list.length - start;
    var ret = new Array(i); //创建一个array的数组
    while(i--){
      ret[i] = list[i + start];
    }
     return ret;
}
