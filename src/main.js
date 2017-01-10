// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import Users from './components/Users.vue';
import Test from './components/Test.vue';
import Scoreboard from './components/Scoreboard.vue';

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: "/", component: App},
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `<div id="app">
  <router-view></router-view>
  </div>
  `
}).$mount("#app");
