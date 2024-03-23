class Component {
	pending = false
	_data = {
		name: "wsw"
	}
	
	constructor() {
		this.data = new Proxy(this._data, {
			set: (target, propKey, receiver) => {
				target[propKey] = receiver
				if(!this.pending) {
					this.pending = true
					/**
					Promise.resolve().then(() => {
						this.render()
					})
					**/
					setTimeout(() => {
						this.render()
					})
				}
			}
		})
	}
	
	render() {
		this.pending = false
		console.log(`${this._data.name}`)
	}
}

let c = new Component()
c.data.name = "sheng"
c.data.name = "wen"