import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import NuxtError from '..\\layouts\\error.vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\assets\\css\\styles.scss'

import '..\\assets\\css\\themes.scss'

import '..\\assets\\css\\fonts.scss'

import _6f6c098b from '..\\layouts\\default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"Postwoman • API调试工具","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover, minimal-ui"},{"hid":"description","name":"description","content":"支持本地部署的API调试工具."},{"name":"keywords","content":"postwoman, postwoman chrome, postwoman online, postwoman for mac, postwoman app, postwoman for windows, postwoman google chrome, postwoman chrome app, get postwoman, postwoman web, postwoman android, postwoman app for chrome, postwoman mobile app, postwoman web app, api, request, testing, tool, rest, websocket, sse, graphql"},{"name":"X-UA-Compatible","content":"IE=edge, chrome=1"},{"itemprop":"name","content":"Postwoman • API调试工具"},{"itemprop":"description","content":"支持本地部署的API调试工具."},{"itemprop":"image","content":"\u002Flogo.jpg"},{"name":"application-name","content":"Postwoman"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-status-bar-style","content":"black-translucent"},{"name":"apple-mobile-web-app-title","content":"Postwoman"},{"name":"msapplication-TileImage","content":"\u002Ficons\u002Ficon-144x144.png"},{"name":"msapplication-TileColor","content":"#252628"},{"name":"msapplication-tap-highlight","content":"no"},{"property":"og:site_name","content":"Postwoman"},{"property":"og:url","content":"https:\u002F\u002Fpostwoman.io"},{"property":"og:type","content":"website"},{"property":"og:title","content":"Postwoman • API调试工具"},{"property":"og:description","content":"支持本地部署的API调试工具."},{"property":"og:image","content":"\u002Flogo.jpg"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:site","content":"@liyasthomas"},{"name":"twitter:creator","content":"@liyasthomas"},{"name":"twitter:url","content":"https:\u002F\u002Fpostwoman.io"},{"name":"twitter:title","content":"Postwoman • API调试工具"},{"name":"twitter:description","content":"支持本地部署的API调试工具."},{"name":"twitter:image","content":"\u002Flogo.jpg"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"author","name":"author","content":"liyasthomas"},{"hid":"theme-color","name":"theme-color","content":"#252628"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"apple-touch-icon","href":"\u002Ficons\u002Ficon-48x48.png"},{"rel":"apple-touch-icon","sizes":"72x72","href":"\u002Ficons\u002Ficon-72x72.png"},{"rel":"apple-touch-icon","sizes":"96x96","href":"\u002Ficons\u002Ficon-96x96.png"},{"rel":"apple-touch-icon","sizes":"144x144","href":"\u002Ficons\u002Ficon-144x144.png"},{"rel":"apple-touch-icon","sizes":"192x192","href":"\u002Ficons\u002Ficon-192x192.png"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.772c4c29.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.9359c9.png"}],"style":[],"script":[{"src":"\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id=GTM-MXWD8NQ&l=dataLayer","async":true}],"htmlAttrs":{"lang":"en"},"noscript":[{"hid":"gtm-noscript","innerHTML":"\u003Ciframe src=\"\u002F\u002Fwww.googletagmanager.com\u002Fns.html?id=GTM-MXWD8NQ&l=dataLayer\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"\u003E\u003C\u002Fiframe\u003E","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"gtm-noscript":["innerHTML"]}},

  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    if (this.nuxt.err && NuxtError.layout) {
      this.setLayout(
        typeof NuxtError.layout === 'function'
          ? NuxtError.layout(this.context)
          : NuxtError.layout
      )
    }

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail()
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail()
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },

  components: {
    NuxtLoading
  }
}
