//写一个List列表
function List(){
	this.listSize = 0;
	this.dataStore = []; //定义一个数组取存取这个列表
	this.pos = 0;//指代当前的位置
	this.clear = clear; 
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev = prev;
	this.next = next;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
    this.contains = contains;
}

function append(data){
	this.dataStore[this.listSize++] = data;
}

function find(element){
	console.log('显示我们想要的数组');
	console.log(this.dataStore);
	for(var i = 0 ; i < this.dataStore.length ; i++){
        if(this.dataStore[i] == element){
        	return i;
        }
	}
	return -1;
}

function remove(element){
    if(this.find(element)!=-1){
    	//说明找到了这个元素
    	this.dataStore.splice(this.find(element),1);
    	this.listSize--;
    	return true;
    }
    return false;
}

function length(){
	return this.listSize;
}

function toString(){
	return this.dataStore;
}

function clear(){
	//清空整个数组
	

}

function contains(){

}

function moveTo(){

}

function front(){

}

function end(){

}

function prev(){

}

function next(){

}

function currPos(){

}

function getElement(){

}

function insert(element,after){
	console.log(this);
   //element 表示将要插入的元素
   //after表示插在哪个元素后
   var inserPos = this.find(after);
   if(inserPos > -1){
   	this.dataStore.splice(inserPos+1,0,element);
   	++this.listSize;
   	return true;
   }
   return false;
}
//写一个测试用例
var names = new List();
names.append("123");
names.append('456');
names.append("789");
console.log(names.toString());
names.remove('123');
console.log(names.toString())
names.insert('DSAF','456');
console.log(names.toString());