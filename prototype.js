//书写一个原型模式
function  Person(){}
	Person.prototype.name = "wangshengwen";
	Person.prototype.age = 29;
	Person.prototype.job = "Software Engineer";

	Person.prototype.sayName = function(){
		console.log(this.name);
	};

var person1 = new Person();
person1.sayName();

var person2 = new Person();
person2.sayName();

console.log(person1.sayName == person2.sayName);

console.log('isPrototypeOf');
console.log(Person.prototype.isPrototypeOf(person1));
console.log(Person.prototype.isPrototypeOf(person2));

console.log('getPrototypeOf');
console.log(Object.getPrototypeOf(person1) == Person.prototype);
console.log(Object.getPrototypeOf(person2) === Person.prototype);

//判断一个属性在原型中，还是在实例中
function hasPrototypeProperty(object,name){
	return !object.hasOwnProperty(name) && (name in object);                                                                     
}