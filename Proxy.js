//进行一个代理模式的开发 
//故事是这样的： 小明暗恋一个姑娘A,他想通过姑娘A的朋友B进行送花
//首先定义一个花的函数
function Flower(){}


var xiaoming = {
	sendFlower: function(target){
		//定义一个花的函数
	     var flower = new Flower();
	      //姑娘A的朋友B一定有一个函数receiverFlower函数
	      target.receiverFlower(flower);
	}
};

var A = {
	//定义一个函数  接受花的函数
	receiverFlower: function(flower){
	     console.log("接受到了花" + flower);
	},
	listenGoodMood: function(fn){
	     setTimeout(function(){
	        fn(); //传入的参数是一个函数
	     },10000);//假设10秒后A的心情能够变好
	}
}

xiaoming.sendFlower(A);//这个调用是说小明将花递送给了中间人
//上述函数的故事是讲述的是小明直接将花送给了A

var B = {
	//进行监听A的心情，
	reveriverFlower: function(flower){
		A.listenGoodMood(function(){
		     //进行监听A的心情
		     A.receiverFlower(flower);
		});

	}
}

