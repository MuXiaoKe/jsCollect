// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'

import snView from '../sn_component/index.js'

import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);
import md5 from 'js-md5'
Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

Vue.use(snView)
router.beforeEach(({
  path
}, from, next) => {
  let login = sessionStorage.getItem('userId') || ''
  if (!login && path !== '/login' && login && path !== '/register' && login && path !== '/agreement') {
    return next({
      path: '/login'
    })
  }
  //响应拦截器
  axios.interceptors.response.use((res) => {
    if (res.data.login === 'false') {
      this.tips={
        
      }
      // window.location.href=basePath+'/views/feeder/index.html#/login'
      sessionStorage.clear();
      router.push({
        name: 'login'
      });
      return res;
    } else {
      return res;
    }
  }, (err) => {
    return err;
  });
  next()
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
