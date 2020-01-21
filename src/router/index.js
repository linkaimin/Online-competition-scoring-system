import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Topindex from '@/components/Topindex'
import manageUser from '@/components/manageUser'
import newUser from '@/components/newUser'
import manageActivity from '@/components/manageActivity'
import addActivity from '@/components/addActivity'
import newActivity from '@/components/newActivity'
import show from '@/components/show'
import formulate from '@/components/formulate'
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
    },
    {
      path: '/manageUser',
      name: 'manageUser',
      component: manageUser
    },
    {
      path: '/show',
      name: 'show',
      component: show
    },
    {
      path: '/formulate',
      name: 'formulate',
      component: formulate
    },
    {
      path: '/newActivity',
      name: 'newActivity',
      component: newActivity
    },
    {
      path: '/addActivity',
      name: 'addActivity',
      component: addActivity
    },
    {
      path: '/manageActivity',
      name: 'manageActivity',
      component: manageActivity
    },
    {
      path: '/newUser',
      name: 'newUser',
      component: newUser
    },
  ]
})
