import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_workbox_2b91f536 from 'nuxt_plugin_workbox_2b91f536' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_24957aee from 'nuxt_plugin_nuxticons_24957aee' // Source: .\\nuxt-icons.js (mode: 'all')
import nuxt_plugin_pluginrouting_77c88f5f from 'nuxt_plugin_pluginrouting_77c88f5f' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_73aeb070 from 'nuxt_plugin_pluginmain_73aeb070' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_googletagmanager_7401add0 from 'nuxt_plugin_googletagmanager_7401add0' // Source: .\\google-tag-manager.js (mode: 'client')
import nuxt_plugin_googleanalytics_c9a95568 from 'nuxt_plugin_googleanalytics_c9a95568' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_toast_8eb1e96e from 'nuxt_plugin_toast_8eb1e96e' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_axios_271282cc from 'nuxt_plugin_axios_271282cc' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_vuexpersist_13f465a2 from 'nuxt_plugin_vuexpersist_13f465a2' // Source: ..\\plugins\\vuex-persist (mode: 'all')
import nuxt_plugin_vtooltip_74057214 from 'nuxt_plugin_vtooltip_74057214' // Source: ..\\plugins\\v-tooltip (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn(`<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead`)
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error('inject(key, value) has no value provided')
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_2b91f536 === 'function') {
    await nuxt_plugin_workbox_2b91f536(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_24957aee === 'function') {
    await nuxt_plugin_nuxticons_24957aee(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_77c88f5f === 'function') {
    await nuxt_plugin_pluginrouting_77c88f5f(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_73aeb070 === 'function') {
    await nuxt_plugin_pluginmain_73aeb070(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googletagmanager_7401add0 === 'function') {
    await nuxt_plugin_googletagmanager_7401add0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_c9a95568 === 'function') {
    await nuxt_plugin_googleanalytics_c9a95568(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_8eb1e96e === 'function') {
    await nuxt_plugin_toast_8eb1e96e(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_271282cc === 'function') {
    await nuxt_plugin_axios_271282cc(app.context, inject)
  }

  if (typeof nuxt_plugin_vuexpersist_13f465a2 === 'function') {
    await nuxt_plugin_vuexpersist_13f465a2(app.context, inject)
  }

  if (typeof nuxt_plugin_vtooltip_74057214 === 'function') {
    await nuxt_plugin_vtooltip_74057214(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
