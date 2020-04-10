// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
Vue.prototype.$qs = qs;
const MyAxios = Axios.create({
  transformRequest: [function (data) {
    // 将数据转换为表单数据
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
Vue.use(VueAxios, MyAxios)
import 'element-ui/lib/theme-chalk/index.css'
Axios.defaults.withCredentials=true;
Axios.defaults.baseURL = 'http://140.143.194.109:8080/jwc/'
Vue.config.productionTip = false
import VueSessionStorage from 'vue-sessionstorage'
Vue.use(VueSessionStorage)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})