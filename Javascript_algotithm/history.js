import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

//获取当前history 
const location = history.location;

//监听当前location 的更改
const unlisten = history.listen((location,action)=>{
	// location是一个类似于window.location的对象
	console.log(action,location.pathname,location.state);
});

//使用 push replace 和go 来进行导航
history.push('/home',{some: 'state'});

//若要停止监听,请调用listen()返回的函数
unlisten();

function getHashPath() {
   const href = window.location.href;
   const hashIndex = href.indexOf('#');
   return hashIndex === -1 ? '' :href.substring(hashIndex + 1);
}