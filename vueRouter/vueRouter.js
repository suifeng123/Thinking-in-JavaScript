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
	const normalizedPath = normalizePath(path,parent,pathToRegexpOptions.strict);
	//生成记录对象
	const record: RouteRecord = {
		path: normalizedPath,
		regex: compileRouteRegex(normalizedPath,pathToRegexpOptions),
		components: route.components || {default: route.component},
		instances: {},
		name,
		parent,
		matchAs,
		redirect: route.redirect,
		meta: route.meta || {},
		props: route.props == null ? {} : route.components ? route.props ,
		: {default: route.props}
	}
	
	if(route.children){
		//递归路由配置的children属性  添加路由记录
		route.children.forEach(child => {
			const childMatchAs = matchAs 
			? cleanPath(`${matchAs}/${child.path}`)
			: undefined ;
			addRouteRecord(pathList,pathMap,nameMap,child,record,childMatchAs);
		})
	}
	//如果路由有别名的话
	//给别名也添加路由记录
	if(route.alias !== undefined){
		const aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
		
		aliases.forEach(alias => {
			const aliasRoute = {
				path: alias,
				children: route.children 
			}
			addRouteRecord(
			   pathList,
			   pathMap,
			   nameMap,
			   aliasRoute,
			   parent,
			   record.path || '/'
			)
		})
	}
	//更新映射表
	if(!pathMap[record.path]){
		pathList.push(record.path) 
		pathMap[record.path] = record 
	}
	
	//命名路由添加记录
	if(name){
		if(!nameMap[name]){
			nameMap[name] = record 
		}else if(process.env.NODE_ENV !== 'production' && !matchAs){
			warn()
		}
	}
}

init(app: any/* Vue component instance */){
	//保存组件实例
	this.apps.push(app);
	//如果组件已经有了返回
	if(this.app){
		return 
	}
	this.app = app 
	//赋值路由模式
	const history = this.history 
	//判断路由模式 ，以哈希模式为例
	if(history instanceof HTML5History){
		history.transitionTo(history.getCurrentLocation())
	}else if(history instanceof HashHistory){
		//添加 hashchange监听
		const setupHashListener = () => {
			history.setupListeners();
		}
		//路由跳转
		history.transitionTo(
		    history.getCurrentLocation(),
			setupHashListener,
			setupHashListener
		)
	}
	
	//该回调会在 transitionTo 中调用
	//对组件的 _route 属性进行赋值，触发组件渲染
	history.listen(route => {
		this.apps.forEach(app => {
			app._route = route 
		})
	})
}

transitionTo(location: RawLocation,onComplete?: Function,onAbort?:Function){
	//获取匹配的路由信息
	const route = this.router.match(location,this.current)
	//确认切换路由信息
	this.confirmTransition(route,() => {
		//以下为切换路由成功或者失败的回调
		//更新路由信息，对组件_route属性进行赋值，触发组件渲染
		//调用afterHooks中的钩子函数
		this.updateRoute(route);
		//添加hashchange的监听
		onComplete && onComplete(route);
		//更新URL
		this.ensureURL();
		//只执行一次ready回调
		if(!this.ready){
			this.ready = true 
			this.readyCbs.forEach(cb => {cb(route)})
		}
	},err => {
		//错误处理
		if(onAbort){
			onAbort(err)
		}
		if(err && !this.ready){
			this.ready = true 
			this.readyErrorsCbs.forEach(cb => {cb(err)})
		}
	})
}
/**
 * 在跳转路由中，需要先获取匹配的路由信息
 */
function match(
    raw: RawLocation,
	currentRoute?: Route,
	redirectedForm?: Location
): Route{
	//序列化 url
	//比如对于该url
	const location = normalizeLocation(raw,currentRoute,false,router);
	const { name } = location;
	//如果时命名路由，就判断记录中是否有该命名路由配置
	if(name){
		const record = nameMap[name];
		//如果没找到表示匹配的路由
		if(!record) return _createRoute(null,location);
		const paramNames = record.regex.keys
		.filter(key => !key.optional)
		.map(key => key.name);
		//参数处理
		if(typeof location.params !== 'object'){
			location.params = {};
		}
		
		if(currentRoute && typeof currentRoute.params === 'object'){
			location.params = {};
		}
		if(currentRoute && typeof currentRoute.params === 'object'){
			for(const key in currentRoute.params){
				if(!(key in location.params) && paramNames.indexOf(key)>-1){
					location.params[key] = currentRoute.params[key];
				}
			}
		}
		
		if(record){
			location.path = fillParams(record.path,location.params,`named route "{name}"`);
			return _createRoute(record,location,redirectedForm);
		}
	}else if(location.path){
		//非命名路由处理
		location.params = {};
		for(let i = 0 ; i < pathList.length; i++){
			//查找记录
			const path = pathList[i];
			const record = pathMap[path];
			//如果匹配路由  则创建路由
			if(matchRoute(record.regex,location.path,location.params)){
				return _createRoute(record,location,redirectedForm,router);
			}
		}
	}
	
	//没有匹配的路由
	return _createRoute(null,location);
}

//根据条件创建不同的路由
function _createRoute(
    record: ?RouteRecord,
	location: Location,
	redirectedForm?: Location
): Route{
	if(record && record.redirect){
		return redirect(record, redirectedForm || location);
	}
	
	if(record && record.matchAs){
		return alias(record,location,record.matchAs);
	}
	
	return createRoute(record,location,redirectedForm,router);
}

export function createRoute(
    record: ?RouteRecord,
	location: Location,
	redirectedForm?: ?Location,
	router?: VueRouter
): Route{
	const stringifyQuery = router && router.options.stringifyQuery;
	//克隆参数
	let query: any = location.query || {};
	try{
		query = clone(query);
	}catch(e){
		//创建路由对象
		const route: Route = {
			name: location.name || (record && record.name),
			meta: (record && record.meta) || {},
			path: location.path || '/',
			hash: location.hash || ''
		}
	}
}