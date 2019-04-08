export function initUse(Vue: GlobalAPI){
	Vue.use = function(plugin: Function | Object){
		//判断重复安装插件
		const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
		if(installedPlugins.indexOf(plugin) > -1){
			return this
		}
		const args = toArray(arguments,1)
		//插入Vue
		args.unshift(this)
		//一般插件都会有一个install函数
		//通过该函数让插件可以使用Vue
		if(typeof plugin.install === 'function'){
			plugin.install.apply(plugin,args);
		}else if(typeof plugin === 'function'){
			plugin.apply(null,args);
		}
		
		installedPlugins.push(plugin)
		return this
	}
}

//下面是install函数的部分实现
export function install(Vue){
	//确保install调用一次
	if(install.installed && _Vue === Vue) return 
	install.installed = true 
	//把Vue赋值给全局变量
	_Vue = Vue 
	const registerInstance = (vm,callVal) => {
	    let  i = vm.$options._parentVnode
		if(isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)){
			i(vm,callVal)
		}
	}
	//给每个组件的钩子函数混入现实
	//可以发现在‘beforeCreate’钩子函数执行时
	//会初始化路由
	Vue.mixin({
		beforeCreate(){
			//判断组件是否存在router对象，该对象只在根组件上有
			if(isDef(this.$options.router)){
				//根路由设置为自己
				this._routerRoot = this 
				this._router = this.$options.router 
				//初始化路由
				this._router.init(this);
				//很重要 为_router 属性实现双向绑定
				//触发组件渲染
				Vue.util.defineReative(this,'_route',this._router.history.current)
			}else{
				//用于router-view层级判断
				this._routerRoot = (this.$parent && this.$parent._routerRoot) || this 
			}
			registerInstance(this,this);
		},
		destroyed(){
			registerInstance(this)
		}
	})
	
	//全局注册组件 router-link 和 router-view
	Vue.component('RouterView',View);
	Vue.component('RouterLink',Link);
	
}

/**
 * 在安装插件后，对VueRouter进行实例化
 */
const Home = { template: '<div>Home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

//3.Create the router 
const router = new VueRouter({
	mode:'hash',
	base: __dirname,
	routes:[
		{path:'/',component: Home},
		{path:'/foo',component: Foo},
		{path:'/bar',component: Bar}
	]
})

//construction 构造函数
constructor(options: RouterOptions = {}){
	//...
	//路由匹配对象
	this.matcher = createMatcher(options.routes || [],this);
	
	//根据mode采取不同的路由方式
	let mode = options.mode || 'hash';
	this.fallback = mode === 'history' && !supportsPushState
	&& options.fallback !== false 
	if(this.fallback){
		mode = 'hash';
	}
	if(!inBrowser){
		mode = 'abstract';
	}
	this.mode = mode;
	
	switch(mode){
		case 'history':
		   this.history = new HTML5History(this,options.base);
		   break;
		case 'hash':
		   this.history = new HashHistory(this,options.base,this.fallback);
		   break;
		case 'abstract':
		   this.history = new AbstractHistory(this,options.base);
		   break;
		default:
		   if(process.env.NODE_ENV !== 'production'){
			   assert(false,`invalid mode: ${mode}`)
		   }
	}
}

export function createMatcher(
    routes: Array<RouteConfig>,
	router: VueRouter
): Matcher{
	//创建路由映射表
	const { pathList,pathMap,nameMap } = createRouteMap(routes);
	
	function addRoutes(routes){
		createRouteMap(routes,pathList,pathMap,nameMap);
	}
	
	//路由匹配
	function match(
	  raw: RawLocation,
	  currentRoute?: Route,
	  redirectedForm?: Location
	): Route{
		//... 
	}
	
	return {
		match,
		addRoutes 
	}
}

export function createRouteMap(
   routes: Array<RouteConfig>,
   oldPathList?: Array<string>,
   oldPathMap?: Dictionary<RouteRecord>,
   oldNameMap?: Dictionary<RouteRecord>
):{
	pathList: Array<string>;
	pathMap: Dictionary<RouteRecord>;
	nameMap: Dictionary<RouteRecord>;
}{
	//创建相应的映射表
	const pathList: Array<string> = oldPathList || [],
	const pathMap: Dictionary<RouteRecord> = oldPathMap || object.create(null)
	const nameMap: Dictionary<RouteRecord> = oldNameMap || object.create(null)
	//遍历路由配置 为每个配置添加路由记录
	routes.forEach(route => {
		addRouteRecord(pathList,pathMap,nameMap,route)
	})
	
	//确保通配符在最后
	for(let i = 0, l = pathList.length; i < l; i++){
		if(pathList[i] === '*'){
			pathList.push(pathList.splice(i,1)[0]);
			l--;
			i--;
		}
	}
	return {
		pathList,
		pathMap,
		nameMap
	}
}

//添加路由记录
function addRouteRecord(
   pathList: Array<string>,
   pathMap: Dictionary<RouteRecord>,
   nameMap: Dictionary<RouteRecord>,
   route:RouteConfig,
   parent?:RouteRecord,
   matchAs?:string 
){
	//获得路由配置下的属性
	const { path,name } = route 
	const pathToRegexpOptions: PathToRegexpOptions = route.pathToRegexpOptions || {},
	//格式化 url, 替换
	const normalizedPath = normalizePath(path,parent,pathToRegexpOptions.strict)
}