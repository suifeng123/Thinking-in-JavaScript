//检测浏览器的呈现引擎
var client = function(){
	var engine = {
		//呈现引擎
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,

		//具体的版本号
		ver:null
	};

	var browser = {
		//浏览器
		ie: 0,
		firefox:0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,

		//具体的版本号
		ver: null
	};
    //平台、设备和操作系统
	var system = {
		win: false,
		mac: false,
		x11: false,

		//移动设备
		iphone: false,
		ipod: false,
		ipad: false,
		ios: false,
		android: false,
		nokiaN: false,
		winMobile: false,

		//游戏系统
		wii: false,
		ps: false
	};
  //下面是具体的代码
	//在此检测呈现引擎，平台和设备
	return {
		engine:engine,
		browser: browser,
		system: system
	}
}();