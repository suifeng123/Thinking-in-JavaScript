/**
 * 注解描述的方式 接口
 * interface Composite(
 *   function add(obj);
 *   function remove(obj);
 *   function update(obj);
 *   )
 */

   var CompositeImp1 = function(){
         
   };
   CompositeImp1.prototype.add = function(){
      //doing something
   };

   CompositeImp1.prototype.remove = function(){
       //doing something
   };

   CompositeImp1.prototype.update  = function(){
       //doing something
   };

  var CompositeImp1 = function(){
      //显示地接受和实现的接口
      //一般来说  在类的内部定义一个变量(名字固定)
	  //定义数组接受变量
       this.implementsInterface = ['Compsite','FormItem'];

  };

   function CheckCompositeImp1(instance){
        //判断当前对象是否实现了所有的接口
	if(IsImplements(instance,'Composite','FormItem')){
	    throw new Error;
	}

   } 
     //公用具体的检测方法
    //主要目的是判断实例对象有没有实现相关接口
    function IsImplements(object){
        //进行获取
	var fn = Array.prototype.shift.call(arguments);//获取这个函数  对象
         for(var i = 0 ; i < arguments.length ; i++){
	     //接受每一个接口的名字 
	     var interfaceName = arguments[i];
             //判断这个方法成功或者失败
	     var interfaceFound = false;
		 for(var j = 0; j < object.implementsInstances.length; j++){
		    if(object.implementsInstances[j]  == interfaceName){
		         interfaceFound = false;
			    break;
		    }
		 } 

		 if(!interfaceFound){
		    return false;
		 }
	 }
    }





