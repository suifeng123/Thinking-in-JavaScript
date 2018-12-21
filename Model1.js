//进行享元模式的编写
var Model = function(sex){
     this.sex = sex;
};

Model.prototype.takePhoto = function(){
     console.log('sex=' + this.sex + 'underwear' + this.underwear);
};

//分别创建一个男模特和一个女模特的对象
var maleModel = new Model('male'),
    femaleModel = new Model('female');

//依次给男模特穿上所有衣服
for(var i = 1 ;  i < 50 ; i++){
      maleModel.underwear = 'underwear' + i;
      maleModel.takePhoto();
};

//依次给女模特穿上所有衣服
for(var j = 1; j <  50; j++){
      femaleModel.underwear = 'underwear' + j;
      femaleModel.takePhoto();
};


