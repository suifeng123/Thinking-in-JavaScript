const man ={
	name:'lihaoze'
}

Object.defineProperty(man,'age',{
	value: 18,
	writable: false,
	configurable: true,
	enumerable: true
})

man.age = 22; //此时已经不能通过.来改变相应的数值了
console.log(man.age);