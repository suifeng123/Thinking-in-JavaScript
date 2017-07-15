/**
 * Created by Administrator on 2017/7/15.
 */
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('把水煮开');
};

Beverage.prototype.brew = function() {
    throw  new Error('子类必须重写brew方法');
};

Beverage.prototype.pourInCup = function(){
    throw  new Error('子类必须重写pourIncup方法');
};

Beverage.prototype.addCondiments = function(){
    throw  new Error('子类必须重写addCondiments方法');
};

Beverage.prototype.customerWantsCondiments = function(){
    return true; //默认需要调料
};

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if(this.customerWantsCondiments()){
        //如果挂钩返回true,则需要调料
        this.addCondiments();
    }
}


var Beverage = function(param) {
    var boilWater = function() {
        console.log('把水煮开');
    };

    var brew = param.brew || function() {
            throw new Error('必须传递brew方法');
        };

    var pourInCup = param.pourInCup || function() {
            throw new Error('必须传递pourInCup方法');
        };

    var addCondiments = param.addCondiments || function(){
            throw new Error('必须传递addCondiments方法');
        };

    var F = function(){};

    F.prototype.init = function(){
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    };

    return F;
};


var Coffee = Beverage({
    brew: function() {
        console.log('把沸水冲泡咖啡');
    },
    pourInCup: function(){
        console.log('把咖啡倒进杯子');
    },
    addConmdiments: function(){
        console.log('加糖和牛奶');
    }
});

var id = 0;
window.startUpload = function(uploadType,files) {
    //uploadType区分是控件还是flash
    for(var i = 0,file; file = files[i]; i++){
        var uploadObj = new Upload(uploadType,file.fileName,file.fileSize);
        uploadObj.init(id++);//给upload对象设置唯一的ID
    }
};

var Upload = function(uploadType,fileName,fileSize){
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
};

Upload.prototype.init = function(id){
    var that = this;
    this.id = id;
    this.dom = document.createElement('div');

    this.dom.innerHTML = '<span>文件名称:'+this.fileName+',文件大小:'
              +this.fileSize+'</span>'+'<button class="delFile">删除</button>';
    this.dom.querySelector('.delFile').onclick = function(){
        that.delFile();
    }
    document.body.appendChild(this.dom);
};

Upload.prototype.delFile = function(){
    if(this.fileSize < 3000 ){
        return this.dom.parentNode.removeChild(this.dom);
    }

    if(window.confirm('确定删除文件吗?'+this.fileName)){
        return this.dom.parentNode.removeChild(this.dom);
    }
};

var toolTipFactory =(function(){
    var toolTipPool = []; //toolTip对象池
    return {
        create: function() {
            if(toolTipPool.length === 0){
                //如果对象池为空
                var div = document.createElement('div'); //创建一个dom
                return div;
            }else{
                //如果对象池中取出一个dom
                return toolTipPool.shift();
            }
        },
        recover: function(tooltipDom){
            return toolTipPool.push(tooltipDom); //对象池回收dom
        }
    }
})();

var order = function(orderType,pay,stock){
    if(orderType === 1){
        if(pay===true){
            console.log('500元定金预购，得到100优惠券');
        }else{
            if(stock > 0){
                console.log('普通购买,无优惠券');
            }else{
                console.log('手机库存不足');
            }
        }
    }else if(orderType === 2){
        if(pay === true){
            console.log('200元定金预购，得到50优惠券');
        }else{
            if(stock > 0){
                console.log('')
            }else{
                console.log();
            }
        }
    }else if(orderType === 3){
        if(stock > 0){
            console.log();
        }else{
            console.log();
        }
    }
};

order(1,true,500);

var order500 = function(orderType,pay,stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100优惠券');
    }else{
        order200(orderType,pay,stock);
    }
}

//200元订单

var order200 = function(orderType,pay,stock){
    if(orderType === 2 && pay === true){
        console.log();
    }else{
        orderNormal(orderType,pay,stock);
    }
};

//普通购买订单
var orderNormal = function(orderType,pay,stock){
    if(stock > 0){
        console.log();
    }else{
        console.log();
    }
};


var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
};

Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this,arguments);

    if(ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }

    return ret;
};

var fn1 = new Chain(function(){
    console.log(1);
    return 'nextSuccessor';
});

var fn2 = new Chain(function(){
    console.log(2);
    var self = this;
    setTimeout(function(){
        self.next();
    },1000);
});

var fn3 = new Chain(function(){
    console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

function Player(name,teamColor) {
    this.partners = [];//队列列表
    this.enemies = [];//敌人列表
    this.state = 'live'; //玩家状态
    this.name = name;//角色名字
    this.teamColor = teamColor;//队列颜色
};

Player.prototype.win = function(){
    console.log('winner:'+this.name);
};

Player.prototype.lose = function(){
    console.log('loser:'+this.name);
};

Player.prototype.die = function(){
    //玩家死亡
    var all_dead = true;
    this.state = 'dead';

    for(var i= 0,partner;partner = this.partners[i];i++){
        if(partner.state !== 'dead'){
            //如果还有一个队友没有死亡,则游戏还未失败
            all_dead = false;
            break;
        }
    }

    if(all_dead === true){
        this.close();
        for(var i= 0,partner;partner=this.partners[i];i++){
            partner.close();
        }
        for(var i= 0,enemy,enemy = this.enemies[i];i++){
            enemy.win();
        }
    }
};


var Plane = function(){}

Plane.prototype.fire = function(){
    console.log('发射普通子弹');
};

var MissileDecorator = function(plane) {
    this.plane = plane;
};

MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('发射导弹');
};

var AtomDecorator = function(plane) {
    this.plane = plane;
};

AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('发射原子弹');
}

