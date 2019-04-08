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
				//
			}
		}
	})
}