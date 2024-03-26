let obj = {
	a: "1",
	b: 2,
	[Symbol.iterator]() {
		let index = 0
		const keys = Object.keys(this)
		return {
			next() {
				if (index < keys.length) {
					return {
						done: false,
						value: obj[keys[index++]]
					}
				}
				return {
					done: true,
					value: undefined
				}
			}
		}
	}
}

for (let item of obj) {
	console.log(item)
}