function sayLoudly(){
	alert(this.firstName.toUpperCase());
}
var newObject = {
	firstName : "frank",
	sayName:function(){alert(this.firstName);},
	sayLoudly:sayLoudly
};
