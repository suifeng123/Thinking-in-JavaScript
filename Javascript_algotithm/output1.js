
/**
function sayHi(){
	console.log(name);
	console.log(age);
	var name = "Lydia";
	let age = 21;
}

sayHi();
**/
const shape = {
	radius:10,
	diameter(){
		return  this.radius * 2
	},
	perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter()); //进项返回半径的操作
console.log(shape.perimeter()); //进行面积的计算