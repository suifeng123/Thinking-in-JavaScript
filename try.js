let person = {
	name: "Lydia"
}

function sayHi (age) {
	console.log(`${this.name} is ${age}`)
}

console.log(sayHi.call(person, 21))
console.log(sayHi.bind(person, 21))

const numbers = [1, 2, 3, 4, 5]
const [y] = numbers

console.log(y)

const members = [person]
person = null
console.log(members)

function sumValues(x, y, z) {
	return x + y  + z
}

console.log(sumValues(...[1,2,3]))