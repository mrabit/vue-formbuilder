import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import render from '@/components/render'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/render',
    name: 'render',
    component: render
  }]
})
