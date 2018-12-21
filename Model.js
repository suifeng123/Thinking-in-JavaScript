//故事是这样的 工厂里要生产内衣  内衣需要内衣模特
var Model = function(sex,underwear){
       //定义模特  模特有两个属性  性别和内衣
       this.sex = sex;
       this.underwear = underwear;
};


//定义模特的一些属性
Model.prototype.takePhoto = function(){
    console.log('sex ='+ this.sex + 'underwear=' + this.underwear);
};


for(var i = 1 ; i <= 50; i++){
          var maleModel = new Model('male','Underwear' + i);
	  maleModel.takePhoto();
};

for(var j = 1; j <= 50; j++){
    var femaleModel = new Model('female','Underwear' + j);
    femaleModel.takePhoto();
}
