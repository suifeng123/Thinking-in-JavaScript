/**
 * Created by Administrator on 2017/7/15.
 */
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log('��ˮ��');
};

Beverage.prototype.brew = function() {
    throw  new Error('���������дbrew����');
};

Beverage.prototype.pourInCup = function(){
    throw  new Error('���������дpourIncup����');
};

Beverage.prototype.addCondiments = function(){
    throw  new Error('���������дaddCondiments����');
};

Beverage.prototype.customerWantsCondiments = function(){
    return true; //Ĭ����Ҫ����
};

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if(this.customerWantsCondiments()){
        //����ҹ�����true,����Ҫ����
        this.addCondiments();
    }
}


var Beverage = function(param) {
    var boilWater = function() {
        console.log('��ˮ��');
    };

    var brew = param.brew || function() {
            throw new Error('���봫��brew����');
        };

    var pourInCup = param.pourInCup || function() {
            throw new Error('���봫��pourInCup����');
        };

    var addCondiments = param.addCondiments || function(){
            throw new Error('���봫��addCondiments����');
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
        console.log('�ѷ�ˮ���ݿ���');
    },
    pourInCup: function(){
        console.log('�ѿ��ȵ�������');
    },
    addConmdiments: function(){
        console.log('���Ǻ�ţ��');
    }
});

var id = 0;
window.startUpload = function(uploadType,files) {
    //uploadType�����ǿؼ�����flash
    for(var i = 0,file; file = files[i]; i++){
        var uploadObj = new Upload(uploadType,file.fileName,file.fileSize);
        uploadObj.init(id++);//��upload��������Ψһ��ID
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

    this.dom.innerHTML = '<span>�ļ�����:'+this.fileName+',�ļ���С:'
              +this.fileSize+'</span>'+'<button class="delFile">ɾ��</button>';
    this.dom.querySelector('.delFile').onclick = function(){
        that.delFile();
    }
    document.body.appendChild(this.dom);
};

Upload.prototype.delFile = function(){
    if(this.fileSize < 3000 ){
        return this.dom.parentNode.removeChild(this.dom);
    }

    if(window.confirm('ȷ��ɾ���ļ���?'+this.fileName)){
        return this.dom.parentNode.removeChild(this.dom);
    }
};

var toolTipFactory =(function(){
    var toolTipPool = []; //toolTip�����
    return {
        create: function() {
            if(toolTipPool.length === 0){
                //��������Ϊ��
                var div = document.createElement('div'); //����һ��dom
                return div;
            }else{
                //����������ȡ��һ��dom
                return toolTipPool.shift();
            }
        },
        recover: function(tooltipDom){
            return toolTipPool.push(tooltipDom); //����ػ���dom
        }
    }
})();

var order = function(orderType,pay,stock){
    if(orderType === 1){
        if(pay===true){
            console.log('500Ԫ����Ԥ�����õ�100�Ż�ȯ');
        }else{
            if(stock > 0){
                console.log('��ͨ����,���Ż�ȯ');
            }else{
                console.log('�ֻ���治��');
            }
        }
    }else if(orderType === 2){
        if(pay === true){
            console.log('200Ԫ����Ԥ�����õ�50�Ż�ȯ');
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
        console.log('500Ԫ����Ԥ�����õ�100�Ż�ȯ');
    }else{
        order200(orderType,pay,stock);
    }
}

//200Ԫ����

var order200 = function(orderType,pay,stock){
    if(orderType === 2 && pay === true){
        console.log();
    }else{
        orderNormal(orderType,pay,stock);
    }
};

//��ͨ���򶩵�
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
    this.partners = [];//�����б�
    this.enemies = [];//�����б�
    this.state = 'live'; //���״̬
    this.name = name;//��ɫ����
    this.teamColor = teamColor;//������ɫ
};

Player.prototype.win = function(){
    console.log('winner:'+this.name);
};

Player.prototype.lose = function(){
    console.log('loser:'+this.name);
};

Player.prototype.die = function(){
    //�������
    var all_dead = true;
    this.state = 'dead';

    for(var i= 0,partner;partner = this.partners[i];i++){
        if(partner.state !== 'dead'){
            //�������һ������û������,����Ϸ��δʧ��
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
    console.log('������ͨ�ӵ�');
};

var MissileDecorator = function(plane) {
    this.plane = plane;
};

MissileDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('���䵼��');
};

var AtomDecorator = function(plane) {
    this.plane = plane;
};

AtomDecorator.prototype.fire = function(){
    this.plane.fire();
    console.log('����ԭ�ӵ�');
}

