import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _56d77275 = () => interopDefault(import('..\\pages\\graphql.vue' /* webpackChunkName: "pages_graphql" */))
const _3401988f = () => interopDefault(import('..\\pages\\realtime.vue' /* webpackChunkName: "pages_realtime" */))
const _f0b6e972 = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages_settings" */))
const _93245044 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/graphql",
    component: _56d77275,
    name: "graphql___en"
  }, {
    path: "/realtime",
    component: _3401988f,
    name: "realtime___en"
  }, {
    path: "/settings",
    component: _f0b6e972,
    name: "settings___en"
  }, {
    path: "/cn/",
    component: _93245044,
    name: "index___cn"
  }, {
    path: "/cn/graphql",
    component: _56d77275,
    name: "graphql___cn"
  }, {
    path: "/cn/realtime",
    component: _3401988f,
    name: "realtime___cn"
  }, {
    path: "/cn/settings",
    component: _f0b6e972,
    name: "settings___cn"
  }, {
    path: "/es/",
    component: _93245044,
    name: "index___es"
  }, {
    path: "/es/graphql",
    component: _56d77275,
    name: "graphql___es"
  }, {
    path: "/es/realtime",
    component: _3401988f,
    name: "realtime___es"
  }, {
    path: "/es/settings",
    component: _f0b6e972,
    name: "settings___es"
  }, {
    path: "/fa/",
    component: _93245044,
    name: "index___fa"
  }, {
    path: "/fa/graphql",
    component: _56d77275,
    name: "graphql___fa"
  }, {
    path: "/fa/realtime",
    component: _3401988f,
    name: "realtime___fa"
  }, {
    path: "/fa/settings",
    component: _f0b6e972,
    name: "settings___fa"
  }, {
    path: "/fr/",
    component: _93245044,
    name: "index___fr"
  }, {
    path: "/fr/graphql",
    component: _56d77275,
    name: "graphql___fr"
  }, {
    path: "/fr/realtime",
    component: _3401988f,
    name: "realtime___fr"
  }, {
    path: "/fr/settings",
    component: _f0b6e972,
    name: "settings___fr"
  }, {
    path: "/pt/",
    component: _93245044,
    name: "index___pt"
  }, {
    path: "/pt/graphql",
    component: _56d77275,
    name: "graphql___pt"
  }, {
    path: "/pt/realtime",
    component: _3401988f,
    name: "realtime___pt"
  }, {
    path: "/pt/settings",
    component: _f0b6e972,
    name: "settings___pt"
  }, {
    path: "/",
    component: _93245044,
    name: "index___en"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
