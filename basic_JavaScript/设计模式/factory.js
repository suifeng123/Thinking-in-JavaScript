/**
 * 简单工厂模式
 */
function User(name, age, career, work) {
	this.name = name
	this.age = age
	this.career = career
	this.work = work
}

function Factory(name, age, career) {
	let work;
	switch(career) {
		case "coder":
		   work = ["写代码", "改bug", "码产品"]
		   break
		case "product manager":
		   work = ["订会议室", "画原型图", "催更"]
		   break
	}
	
	return new User(name, age, career, work)
}

// 抽象工厂模式
class MobilePhoneFactory {
	// 操作系统
	createOS() {
		throw new Error("抽象工厂不允许直接调用，需重写")
	}
	// 硬件
	createHardWare() {
		throw new Error("抽象工厂方法不允许直接调用，需要重写")
	}
}

class Banana extends MobilePhoneFactory {
	createOS() {
		return new AndroidOS()
	}
	
	createHardWare() {
		return new QualcommHardWare()
	}
}

class OS {
	controlHardWare() {
		console.log("抽象方法不允许直接调用，需要重写")
	}
}

class AndroidOS extends OS {
	controlHardWare() {
		console.log("安卓操作硬件")
	}
}

class AppleOS extends OS {
	controlHardWare() {
		console.log("苹果操作硬件")
	}
}

class HardWare {
	operateByOrder() {
		throw new Error("抽象方法不允许调用，需要重写")
	}
}

class QualcommHardWare extends HardWare {
	operateByOrder() {
		console.log("高通的运行方式")
	}
}

class MiWare extends HardWare {
	operateByOrder() {
		console.log("小米的运行方式")
	}
}

const myPhone = new Banana()
const myOS = myPhone.createOS()
const myHardWare = myPhone.createHardWare()
myOS.controlHardWare()
myHardWare.operateByOrder()