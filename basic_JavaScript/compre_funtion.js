/*
写一个升级版本的compare
 */

function createCompareFunction(prop){
	return function(object1,object2){
		var value1 = object1[prop];
		var value2 = object2[prop];

		if(value1 < value2){
			return -1;
		}else if(value1 > value2){
			return 1 ;
		}else{
			return 0;
		}
	};
}

var data = [
{
   name:'Zadf',
   age: 25,
},{
	name:'asdf',
	age: 14

}];


data.sort(createCompareFunction('name'));
console.log(data[0]);
data.sort(createCompareFunction('age'));
console.log(data[0]);


