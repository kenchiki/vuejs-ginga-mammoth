import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('./views/Accounts.vue')
    },
    {
      path: '/oauth_callback',
      name: 'oauth_callback',
      component: () => import('./views/OauthCallback.vue')
    },
    {
      path: '/timelines',
      name: 'timelines',
      component: () => import('./views/Timelines.vue')
    },
    {
      path: '/statuses',
      name: 'statuses',
      component: () => import('./views/Statuses.vue')
    },
  ]
});
