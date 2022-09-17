function Car (brand) {
	this.brand = brand;
	_that = this
	this.start = function () {
		console.log(this)
		console.log(`brand is ${this.brand}`)
	}
	
	this.startDelay = function (time) {
		setTimeout(() => {
			console.log(`brand is ${_that.brand}`)
		}, time)
	}
}

var car = new Car('bw')
car.start()