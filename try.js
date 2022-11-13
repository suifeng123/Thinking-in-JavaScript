class Bird {
	constructor() {
	    console.log("I am a bird")
	}
}

class Flamingo extends Bird {
	constructor() {
		console.log("I am pink")
		super()
	}
}

const person = new Flamingo()