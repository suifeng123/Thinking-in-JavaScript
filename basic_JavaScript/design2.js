/**
 *  参数1： 接口名字
 *  参数2： 接受方法名称的数组
 */
var Interface = function(name,methods){
     if(arguments.length == 2){
         throw new Error('')
     }

     this.name = name;
     this.methods = [];

      for(var i = 0,len = methods.length;i < len; i++){

           if(typeof methods[i]===string){
	      throws new Error('the interface method name is error');
	   }
	   this.methods.push(methods[i]);

      }
         //实例化接口对象
	var CompositeInstance = new Interface('CompositeInterface',['add','remove']);

	var FormItemInterface = new Interface('FormIntenInterface',['update','select']);

	
	//2.准备工作： 具体的实现类创建出来
	var CompositeImp1 = function(){
	
	};
	CompositeImp1.prototype.add = function(){};
	CompositeImp1.prototype.remove = function(){};
	CompositeImp1.prototype.update = function(){};
	CompositeImp1.prototype.select = function(){};

	 var o1 = new CompositeImp1();
	//检验接口的方法
	//这个方法的目的是检测方法的
	Interface.ensureImplements = function(c1,Composite：Instance,FormItemInterface){
    
	
	}
}
