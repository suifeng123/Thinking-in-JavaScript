//适配器模式的js代码
var googleMap = {
     show: function(){
         console.log(‘开始渲染谷歌地图’);
     }
};

var baiduMap = {
     show: function(){
          console.log('开始渲染百度地图');
     }
};

var renderMap = function(map){
    if(map.show instanceof Function){
        //如果有相应的渲染函数
	map.show();
    }
}

var getGuangdongCity = function(){
    var guangdongCity = [
        {
	    name:'shenzhen',
	    id: 11
	},{
	    name: 'guangzhou',
	    id: 12
	}
    ];

	return guangdongCity;
};


var render = function(fn){
     console.log('开始渲染广东地图');
	document.write(JSON.stringify(fn()));
};

render(getGuangdongCity);
