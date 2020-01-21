import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Topindex from '@/components/Topindex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'Index',
      component: Topindex
    }
  ]
})
