<template>
  <div class="wrapper">
    <header class="header">
      <div class="flex-wrap">
        <div class="slide-in">
          <nuxt-link :to="localePath('index')">
            <h1 class="logo">Postwoman</h1>
          </nuxt-link>
        </div>
        <div class="">
          <a>
            发送快捷键Ctr+G/保存到集合Ctrl+S/复制请求连接ctrl+K
          </a>
          <a
            href="https://github.com/logoove/postwoman"
            target="_blank"
            aria-label="GitHub"
            rel="noopener"
          >GitHub汉化官方
          </a> |
          <a
                  href="https://gitee.com/yoby/postwoman"
                  target="_blank"
                  aria-label="GitHub"
                  rel="noopener"
          >Gitee汉化官方
          </a>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="columns">
        <aside class="nav-first">
          <nav class="primary-nav">
            <!--
              We're using manual checks for linkActive because the query string
              seems to mess up the nuxt-link active class.
            -->
            <nuxt-link
              :to="localePath('index')"
              :class="linkActive('/')"
              v-tooltip.right="'首页'"
              aria-label="Home"
            >
              <logo alt style="height: 24px;"></logo>
            </nuxt-link>
            <nuxt-link
              :to="localePath('realtime')"
              :class="linkActive('/realtime')"
              v-tooltip.right="'即时'"
            >
              <i class="material-icons">settings_input_hdmi</i>
            </nuxt-link>
            <nuxt-link
              :to="localePath('graphql')"
              :class="linkActive('/graphql')"
              v-tooltip.right="'描述数据请求方法'"
            >
              <i class="material-icons">cloud</i>
            </nuxt-link>
            <nuxt-link
              :to="localePath('settings')"
              :class="linkActive('/settings')"
              v-tooltip.right="'设置'"
              aria-label="Settings"
            >
              <i class="material-icons">settings</i>
            </nuxt-link>
          </nav>
          <div v-if="$route.path === '/'">
            <nav class="secondary-nav">
              <ul>
                <li>
                  <a href="#request" v-tooltip.right="'请求'">
                    <i class="material-icons">cloud_upload</i>
                  </a>
                </li>
                <li>
                  <a href="#options" v-tooltip.right="'选项'">
                    <i class="material-icons">toc</i>
                  </a>
                </li>
                <li>
                  <a href="#response" v-tooltip.right="'请求'">
                    <i class="material-icons">cloud_download</i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div v-else-if="$route.path === '/realtime'">
            <nav class="secondary-nav">
              <ul>
                <li>
                  <a href="#request" v-tooltip.right="'请求'">
                    <i class="material-icons">cloud_upload</i>
                  </a>
                </li>
                <li>
                  <a href="#response" v-tooltip.right="'通信'">
                    <i class="material-icons">cloud_download</i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div v-else-if="$route.path === '/graphql'">
            <nav class="secondary-nav">
              <ul>
                <li>
                  <a href="#endpoint" v-tooltip.right="'端点'">
                    <i class="material-icons">cloud_upload</i>
                  </a>
                </li>
                <li>
                  <a href="#schema" v-tooltip.right="'模式'">
                    <i class="material-icons">cloud_download</i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div v-else-if="$route.path === '/settings'">
            <nav class="secondary-nav">
              <ul>
                <li>
                  <a href="#theme" v-tooltip.right="'主题'">
                    <i class="material-icons">brush</i>
                  </a>
                </li>
                <li>
                  <a href="#proxy" v-tooltip.right="'代理'">
                    <i class="material-icons">public</i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <transition name="layout" appear>
          <nuxt id="main" class="main" />
        </transition>
        <aside class="nav-second"></aside>
      </div>
    </div>
    <footer class="footer">
      <div class="flex-wrap">
        <!-- Bottom section of footer: version/author information -->
        <div>
          <span v-if="version.name" class="mono">
            <!-- <span v-if="version.hash">
              -
              <a
                v-bind:href="'https://github.com/liyasthomas/postwoman/commit/' + version.hash"
                target="_blank"
                rel="noopener"
              >{{version.hash}}</a>
            </span> -->
            <!-- <span v-if="version.variant">({{version.variant}})</span> -->
          </span>
        </div>
        <div class="flex-wrap">
          <!--<v-popover>
            <button class="icon" v-tooltip="'选择语言'">
              <i class="material-icons">translate</i>
            </button>
            <template slot="popover">
              <div v-for="locale in availableLocales"
              :key="locale.code">
              <nuxt-link
                :to="switchLocalePath(locale.code)"
              >
                <button class="icon" v-close-popover>
                  {{ locale.name }}
                </button>
              </nuxt-link>
            </div>
            </template>
          </v-popover>-->
        </div>
      </div>
    </footer>
    <modal v-if="showShortcuts" @close="showShortcuts = false">
      <div slot="header">
        <ul>
          <li>
            <div class="flex-wrap">
              <h3 class="title">快捷键</h3>
              <div>
                <button class="icon" @click="showShortcuts = false">
                  <i class="material-icons">close</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div slot="body">
        <br />
        <div>
          <label>Send Request</label>
          <kbd>⌘ G</kbd>
        </div>
        <br />
        <div>
          <label>Save to Collections</label>
          <kbd>⌘ S</kbd>
        </div>
        <br />
        <div>
          <label>Copy Request Link</label>
          <kbd>⌘ K</kbd>
        </div>
        <br />
        <div>
          <label>Reset Request</label>
          <kbd>⌘ L</kbd>
        </div>
        <br />
      </div>
      <div slot="footer"></div>
    </modal>
    <modal v-if="showSupport" @close="showSupport = false">
      <div slot="header">
        <ul>
          <li>
            <div class="flex-wrap">
              <h3 class="title">Support us on</h3>
              <div>
                <button class="icon" @click="showSupport = false">
                  <i class="material-icons">close</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div slot="body">
        <div>
          <a
            href="https://opencollective.com/postwoman"
            target="_blank"
            rel="noopener"
          >
            <button class="icon">
              <i class="material-icons">favorite</i>
              <span>Open Collective</span>
            </button>
          </a>
        </div>
        <div>
          <a
            href="https://www.paypal.me/liyascthomas"
            target="_blank"
            rel="noopener"
          >
            <button class="icon">
              <i class="material-icons">favorite</i>
              <span>PayPal</span>
            </button>
          </a>
        </div>
        <div>
          <a
            href="https://www.patreon.com/liyasthomas"
            target="_blank"
            rel="noopener"
          >
            <button class="icon">
              <i class="material-icons">favorite</i>
              <span>Patreon</span>
            </button>
          </a>
        </div>
      </div>
      <div slot="footer"></div>
    </modal>
  </div>
</template>

<style lang="scss"></style>

<script>
import intializePwa from "../assets/js/pwa";
import * as version from "../.postwoman/version.json";

export default {
  components: {
    logo: () => import("../components/logo"),
    modal: () => import("../components/modal")
  },

  methods: {
    linkActive(path) {
      return {
        "nuxt-link-exact-active": this.$route.path === path,
        "nuxt-link-active": this.$route.path === path
      };
    }
  },

  data() {
    return {
      // Once the PWA code is initialized, this holds a method
      // that can be called to show the user the installation
      // prompt.
      showInstallPrompt: null,
      version: {},
      showShortcuts: false,
      showSupport: false
    };
  },

  beforeMount() {
    // Set version data
    this.version = version.default;

    // Load theme settings
    (() => {
      // Apply theme from settings.
      document.documentElement.className =
        this.$store.state.postwoman.settings.THEME_CLASS || "";
      // Load theme color data from settings, or use default color.
      let color = this.$store.state.postwoman.settings.THEME_COLOR || "#50fa7b";
      let vibrant = this.$store.state.postwoman.settings.THEME_COLOR_VIBRANT;
      if (vibrant == null) vibrant = true;
      document.documentElement.style.setProperty("--ac-color", color);
      document.documentElement.style.setProperty(
        "--act-color",
        vibrant ? "rgb(37, 38, 40)" : "#ffffff"
      );
    })();
  },

  mounted() {
    if (process.client) {
      document.body.classList.add("afterLoad");
    }

    document
      .querySelector("meta[name=theme-color]")
      .setAttribute(
        "content",
        this.$store.state.postwoman.settings.THEME_TAB_COLOR || "#252628"
      );

    // Initializes the PWA code - checks if the app is installed,
    // etc.
    (async () => {
      this.showInstallPrompt = await intializePwa();
      let cookiesAllowed = localStorage.getItem("cookiesAllowed") === "yes";
      if (!cookiesAllowed) {
        this.$toast.show("We use cookies", {
          icon: "info",
          duration: 5000,
          theme: "toasted-primary",
          action: [
            {
              text: "Dismiss",
              onClick: (e, toastObject) => {
                localStorage.setItem("cookiesAllowed", "yes");
                toastObject.goAway(0);
              }
            }
          ]
        });
      }
    })();

    window.addEventListener("scroll", event => {
      let mainNavLinks = document.querySelectorAll("nav ul li a");
      let fromTop = window.scrollY;
      mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
          section &&
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("current");
        } else {
          link.classList.remove("current");
        }
      });
    });
  },

  watch: {
    $route() {
      this.$toast.clear();
    }
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  }
};
</script>
