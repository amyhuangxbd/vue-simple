import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import ticket from '@/pages/ticket'
import success from '@/pages/success'
import login from '@/pages/login'
import wechat from '@/pages/wechat'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'cur',
  saveScrollPosition: true,
  routes: [{
    path: '/',
    component: index,
    name: 'index'
  }, {
    path: '/ticket',
    name: 'ticket',
    component: ticket
  }, {
    path: '/success',
    name: 'success',
    component: success
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/wechat',
    name: 'wechat',
    component: wechat
  }]
})
