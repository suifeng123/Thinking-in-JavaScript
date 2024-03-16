function myInstanceOf(left, right) {
	if (typeof left !== "object" || left == null) return
  let proto = Object.getPrototypeOf(left)
   while(true) {
	   if (proto == null) return false
	   if (proto === right.prototype) return true
	   proto = Object.getPrototypeOf(proto)
   }	
}

function Person() {
	
}
let p = new Person()

console.log(myInstanceOf(p, Object))