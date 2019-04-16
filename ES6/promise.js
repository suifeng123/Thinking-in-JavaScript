class Api{
	constructor(){
		this.user = {id: 1,name: 'test'},
		this.friends = [this.user,this.user,this.user]
		this.photo = 'not a real photo'
	}
	
	getUser(){
		return new Promise((resolve,reject) => {
			setTimeout(() => resolve(this.user),200)
		})
	}
	
	getFriends(userId){
		return new Promise((resolve,reject) => {
			setTimeout(() => resolve(this.friends.slice()),200)
		})
	}
	
	getPhoto(userId){
		return new Promise((resolve,reject) => {
			setTimeout(() => resolve(this.photo),200)
		})
	}
	
	throwError(){
		return new Promise((resolve,reject) => {
			setTimeout(() => reject(new Error('Interinal Error')),200)
		})
	}
}

//尝试进行嵌套的Promise回调函数调用
function callbackHell(){
	const api = new Api();
	let user,friends;
	api.getUser().then(function(returnedUser){
		user = returnedUser;
		api.getFriends(user.id).then(function(returnedFriends){
			friends = returnedFriends;
			api.getPhoto(user.id).then(function(photo){
				console.log('callbackHell',{user,friends,photo})
			})
		})
	})
}

//进行相应的调用的函数
//callbackHell();

function promiseChain(){
	const api = new Api();
	let user,friends;
	api.getUser()
	.then((returnedUser) => {
		user = returnedUser;
		return api.getFriends(user.id);
	})
	.then((returnedFriends) => {
		friends = returnedFriends;
		return api.getPhoto(user.id);
	})
	.then((photo) => {
		console.log('promiseChain',{user,friends,photo})
	})
} 

//进行获取的
//promiseChain();

async function asyncAwaitIsYourNewBestFriend(){
	const api = new Api();
	const user = await api.getUser();
	const friends = await api.getFriends(user.id);
	const photo = await api.getPhoto(user.id);
	console.log('asyncAwaitIsYourNewBestFriend',{user,friends,photo});
}

//asyncAwaitIsYourNewBestFriend();

function promiseLoops(){
	const api = new Api();
	api.getUser()
	.then((user) => {
		return api.getFriends(user.id)
	})
	.then((returnedFriends) => {
		const getFriendsOfFriends = (friends) =>{
			if(friends.length > 0){
				let friend = friends.pop();
				return api.getFriends(friend.id)
				.then((moreFriends) => {
					console.log('promiseLoops',moreFriends)
					return getFriendsOfFriends(friends)
				})
			}
		}
		return getFriendsOfFriends(returnedFriends)
	})
}

function defineReactive(obj,key,val){
	Object.defineProperty(obj,key,{
		enumerable: true,//可枚举
		configurable: true,//可写
		get: function(){
			console.log('get');
			return val;
		},
		set: function(newVal){
			//设置时，可以添加相应的操作
			console.log('set');
			val += newVal;
		}
	});
}

let obj = {name:'成龙大哥',say:'其实我之前是拒绝拍游戏广告的'};

Object.keys(obj).forEach(k => {
	defineReactive(obj,k,obj[k]);
});
obj.say = '后来我试玩了一下，哇，好热血，蛮好玩的';
console.log(obj.name + obj.say);
obj.eat = '香蕉';