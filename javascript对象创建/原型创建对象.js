function newClass(){
	this.firstName = "frank";
}
newClass.prototype.sayName = function(){
	alert(this.firstName);
}
var nc =  new newClass();
nc.sayName();
