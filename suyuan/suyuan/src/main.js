// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VConsole from 'vconsole'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible/flexible'
import './assets/css/reset.css'

Vue.use(ElementUI)
let vConsole = new VConsole()
Vue.use(vConsole)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})