//进行player的编写
function Player(name){
    this.name = name;
    this.enemy = null; //定义敌人
};

Player.prototype.win = function(){
     console.log(this.name + 'won');
};


Player.prototype.lose = function(){
     console.log(this.name + 'lost');
};

Player.prototype.die = function(){
      this.lose();
      this.enemy.win();
};

//接下来创建2个玩家对象
var player1 = new Player('皮蛋');
var player2 = new Player('小乖');


//给玩家设置敌人  两个玩家之间互为敌人
player1.enemy = player2;
player2.enemy = player1;
