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
			hash: location.hash || '',
			query,
			params: location.params || {},
			fullPath: getFullPath(location,stringifyQuery),
			matched: record ? formMath(record) : []
		}
		if(redirectedForm){
			route.redirectedForm = getFullPath(redirectedForm,stringifyQuery);
		}
		//让路由对象不可修改
		return Object.freeze(route);
	}
	//获得包含当前路由的所有嵌套路径片段的路由记录
	//包含从根路由到当前路由的匹配记录，从上到下
	function formatMatch(record: ?RouteRecord): Array<RouteRecord>{
		const res = [];
		while(record){
			res.unshift(record);
			record = record.parent;
		}
		return res;
	}
}

const queue: Array<?NavigationGuard> = [].concat(,
     //失活的组件钩子
	 extractLeaveGuards(deactivated),
	 //全局beforeEach钩子
	 this.router.beforeHooks,
	 //在当前路由改变，但是该组件被复用时调用
	 extractUpdateHooks(updated),
	 //需要渲染组件 enter 守卫钩子
	 activated.map(m => m.beforeEnter),
	 //解析异步路由组件
	 resolveAsyncComponents(activated)
)

//第一步时先执行失活组件的钩子函数
function extractLeaveGuards(deactivated: Array<RouteRecord>): Array<?Function>{
	//传入需要执行的钩子函数
	return extractLeaveGuards(deactivated,'beforeRouteLeave',bindGuard,true);
}

function extractGuards(
    records: Array<RouteRecord>,
	name: string,
	bind: Function,
	reverse?: boolean
): Array<?Function>{
	const guards = flatMapComponents(records,(def,instance,match,key) => {
		//找出组件中对应的钩子函数
		const guard = extractGuard(def,name);
		if(guard){
			//给每个钩子函数添加上下文对象为组件自身
			return Array.isArray(guard) 
			 ? guard.map(guard => bind(guard,instance,match,key))
			 : bind(guard,instance,match,key);
		}
	})
	//数组降维，并且判断是否需要反转数组
	//因为某些钩子函数需要从子执行到父
	return flatten(reverse ? guards.reverse(): guards);
}

export function flatMapComponents(
     matched: Array<RouteRecord>,
	 fn: Function
): Array<?Function>{
	//数组降维
	return flatten(matched.map(m => {
		//将数组中的对象传入回调函数中，获得钩子函数数组
		return Object.keys(m.components).map(key => fn(
		    m.components[key],
			m.instances[key],
			m,key
		))
	}))
}

beforeEach(fn: Function): Function{
	return registerHook(this.beforeHooks,fn);
}

function registerHook(list: Array<any>,fn: Function): Function{
    return (to,from,next) => {
		let hasAsync = false;
		let pending = 0;
		let error = null;
		//该函数作用之前已经价绍过了
		flatMapComponents(matched,(def,_,match,key) => {
			//判断是否时异步组件
			if(typeof def === 'function' && def.cid === undefined){
				hasAsync = true;
				pending++;
				//成功回调
				//once函数确保异步组件只加载一次
				const resolve = once(resolvedDef => {
					if(isESModule(resolvedDef)){
						resolvedDef = resolvedDef.default
					}
					//判断是否时构造函数
					//不是的话通过Vue来生成组件构造函数
					def.resolved = typeof resolvedDef === 'function'
					? resolvedDef 
					: _Vue.extend(resolvedDef);
					def.resolved = typeof resolvedDef === 'function'
					? resolvedDef
					: _Vue.extend(resolvedDef)
					//赋值组件
					//如果组件全部解析完毕，继续下一步
					match.components[key] = resolvedDef;
					pending--;
					if(pending <= 0){
						next();
					}
				})
				
				//失败回调
				const reject = once(reason => {
				const msg = `Failed to resolve async component ${key}: ${reason}`
                process.env.NODE_ENV !== 'production' && warn(false, msg)
				if(!error){
					error = isError(reason) ? reason : new Error(msg);
					next(error)
				}
				
				})
				
				let res;
				try{
					//执行异步组件函数
					res = def(resolve,reject);
				}catch(e){
					reject(e);
				}
				if(res) {
					//下载完成执行回调
					if(typeof res.then === 'function'){
						res.then(resolve,reject);
					}else{
						const comp = res.component 
						if(comp && typeof comp.then === 'function'){
							comp.then(resolve,reject);
						}
					}
				}
			}
		})
		
		//不是异步组件直接下一步
		if(!hasAsync) next();
	}
}

//该回调用于保存'beforeRouteEnter'钩子中的回调函数
const postEnterCbs = [];
const isValid = () => this.current === route;
