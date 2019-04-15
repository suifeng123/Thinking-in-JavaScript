function arr(){
	this.install = [1,3,4];
	var arr = (this.install || (this.install = []));
	console.log(arr);
	
}

arr();