var newObject = new Object();
new Object.firstname = "frank";
newObject.sayName = function(){
	alert(this.name);
}
var theFirstName = newObject["firstName"];
newObject['sayName']();
var whatFunction;
if(whatVolume == 1)
{
	whatFunction = "sayName";
}
if(whatVolume == 2)
{
	whatFunction = "sayLoudly";
}
newObject[whatFunction]();