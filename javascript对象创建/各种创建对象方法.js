//��������
function createdog(name,age,color){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.color = color;
	o.say = function(){
		return "hello��"+this.name+"age:"+this.age;
	}
	return o;
}
var dog1 = createdog("jack",2,"black");
//���캯��
function Dog(name,age,color)
{
	this.name = name;
	this.age = age;
	this.color = color;
    this.say = function(){
		return "hello��"+this.name+"age:"+this.age;
	}
}
var dog1 = new Dog("jack",2,"balck");
//ԭ�ͷ���
function Dog(){
	Dog.prototype.name = "jack";
	Dog.prototype.color = 'black';
	Dog.prototype.age = 2;
	Dog.prototype.say = function(){
		return "hello"+this.name+"age:"+this.age;
	}
var dog1 = new Dog();
//��Ϸ�ʽ ���캯��+ԭ�ͷ���
function Dog(name,age,color){
       name = this.name;
	   age = this.age;
	   color = this.color;
}
Dog.prototype.say = function(){
	return "hello"+this.name+"age:"+this.age;
}
var dog1 = new Dog("jack",2,"black");
//��̬ԭ�ͷ���
function Dog(name,age,color){
	this.name = name;
	this.age = age;
	this.color = color;
	if(typeof Dog._initialized == "undefined"){
		Dog.prototype.say = function(){
			return "hello"+this.name+"age:"+this.age;
		};
		Dog._initialized = true;
	}
}
var dog1 = new Car("jack",2,"black");


