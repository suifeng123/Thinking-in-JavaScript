var re = null;
var i;

for(var i = 0; i < 10 ; i++){
	re = /cat/g;
	re.test('catastorehe');
	//console.log(re.test('catastorehe'));
}

for(i=0; i< 10; i++){
	re = new RegExp("cat","g");
	re.test('catastorehe');
	//console.log(re.test('catastorehe'));
}