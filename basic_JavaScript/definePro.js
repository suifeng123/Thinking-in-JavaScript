const man ={
	name:'lihaoze'
}

Object.defineProperty(man,'age',{
	value: 18,
	writable: false,
	configurable: true,
	enumerable: true
})

man.age = 22;
console.log(man.age);