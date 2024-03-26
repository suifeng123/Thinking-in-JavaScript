/**
for (let i = 0; i <= 3; i++) {
	((i) => {
		setTimeout(() => {
			console.log(i)
		})
	})(i)
}
**/

async function longSequentially() {
	for(let i = 0; i <= 3; i++) {
		await delayLog(i)
	}
}

function delayLog(i) {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log(i)
			resolve() // 解决了
		})
	})
}

longSequentially()