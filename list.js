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
	for(var i = 0 ; i < this.dataStore.length ; i++){\
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

//写一个测试用例
var names = new List();
names.append("123");
names.append('456');
names.append("789");
console.log(names.toString);
