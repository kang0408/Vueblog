// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import ElementUI from 'element-ui'
import CommonConfig from '../commonconfig.js'
import 'element-ui/lib/theme-default/index.css'
import mavonEditor from 'mavon-editor'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.use(jQuery)
Vue.prototype.$commonConfig = CommonConfig

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
