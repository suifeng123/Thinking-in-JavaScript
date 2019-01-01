//进行main.js的编写
import Vue form 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

Vue.use(Element,{
     size: Cookies.get('size') || 'medium',
     i18n: (key,value) => i18n.t(key,value)
})

Object.keys(filters).forEach(key => {
     Vue.filter(key,filters[key])
})

Vue.config.productionTip = false

new Vue({
    el:'#app',
    router,
    store,
    i18n,
    render: h => h(App)
})
