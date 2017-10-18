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
  //添加append方法
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
	delete this.dataStore;
	this.dataStore = [];
	this.listSize = this.pos = 0;
	

}

function contains(element){
	for(var i = 0 ; i < this.dataStore.length ; i++){
		if(this.dataStore[i] === element){
			return true;
		}
	}
	return false;
}

//遍历数组
function front(){
	this.pos = 0;
}

function end(){
	this.pos = this.listSize - 1;
}

function prev(){
	if(this.pos > 0){
		--this.pos;
	}
}

function next(){
	if(this.pos < this.listSize){
		++this.pos;
	}
}

function currPos(){
	return this.pos;
}

function moveTo(position){
	this.pos = position;
}

function getElement(){
	return this.dataStore[this.pos];
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
names.append("qqqq");
names.append("33333");
console.log(names.toString());
names.front();
console.log(names.getElement());
console.log(names.length())
//使用迭代器访问
for(names.front();names.currPos() < names.length();names.next()){
	console.log(names.getElement());
}
