//使用definePrototype
var person = {};
Object.defineProperty(person,"name",{
	writable:false,
	value:'wangshengwen'
});

console.log(person.name);
person.name = "nihaoma";
console.log(person.name);