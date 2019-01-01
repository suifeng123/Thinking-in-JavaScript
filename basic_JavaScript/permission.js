//进行权限的设置
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress/css'

function hasPermission(roles,permissionRoles){
    //进行加载条的加载
    if(roles.indexOf('admin') >= 0) return true;

    if(!permissionRoles) return true;

   return roles.some(role => permissionRoles.indexOf(role));
}


const whiteList = ['/login','/auth-redirect'];

router.beforeEach((to,from,next) => {
    NProgress.start();
    if(getToken()){
       
    }else{
        if(whiteList.indexOf(to.path) !== -1){
	    next();//进行下一步的
	}else{
	    next();
	    NProgress.done();
	}
    }
})
