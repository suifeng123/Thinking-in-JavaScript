/**
 * Created by Administrator on 2017/6/25.
 */
Array.prototype.indexOf = function(item,index){
    var n = this.length, i = ~~index;
    if(i<0){
        i+=n;
    }
    for(;i<n;i++){
        if(this[i]===item) return i;

    }
    return -1;
}
Array.prototype.lastIndex = function(item,index){
    var n = this.lenghth;
    var i = index == null?n-1:index;
    if(i<0)
       i = Math.max(0,n+i);
    for(;i>=0;i--){
        if(this[i]===item) return i;
    }
    return -1;
}

function removeAt(target,index){
    return !!target.splice(index,1).length;
}

function remove(target,item){
    var index = target.indexOf(item);
    if(~index)
    return removeAt(target,index)
    return false;
}

function shuffle(target){
    var j, x,i = target.length;
    for(;i>0;j=parseInt(Math.random()*i),
    x=target[--i],target[i]=target[j],target[j]=x){

    }
    return target;
}

function random(target){
    return target[Math.floor(Math.random()*target.length)];
}

function flatten(target){
    var result = [];
    target.forEach(function(item){
        if(Array.isArray(item)){
            result = result.concat(flatten(item));
        }else{
            result.push(item)
        }
    });
    return result;
}

function unique(target){
    var result = [];
    loop: for(var i= 0,n = target.length;i<n;i++){
        for(var x=i+1;x<n;x++){
            if(target[x]===target[i])
            continue loop;
        }
        result.push(target[i])
    }
    return result
}
//对数组取并集
function union(target,array) {
    return unique(target.concat(array));
}

//对数组取交集
function intersect(target,array) {
    return target.filter(function(n){
        return ~array.indexOf(n);
    })
}

//对数组取补集
function diff(target,array){
    var result = target.slice();
    for(var i=0;i<result.length;i++){
        for(var j=0;j<array.length;j++){
            if(result[i] === array[j]) {
                result.splice(i,1);
                i--;
                break;
            }
        }
    }
    return result;
}

function min(target){
    return Math.min.apply(0,target);
}

function max(target){
    return Math.max.apply(0,target);
}

var toIngeger = function(n){
    n = +n;
    if(n!==n){
        //这个数组是NaN
        n = 0;
    }else if(n!==0&& n!==(1/0)&& n!==-(1/0)){
        n = (n>0||-1)*Math.floor(Math.abs(n));
    }
    return n;
}


