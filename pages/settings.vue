<template>
  <div class="page">
    <pw-section class="cyan" label="主题" ref="theme">
      <ul>
        <li>
          <h3 class="title">背景颜色</h3>
          <div class="backgrounds">
            <span
              :key="theme.class"
              @click="applyTheme(theme)"
              v-for="theme in themes"
            >
              <swatch
                :active="settings.THEME_CLASS === theme.class"
                :class="{ vibrant: theme.vibrant }"
                :color="theme.color"
                :name="theme.name"
              ></swatch>
            </span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <h3 class="title">字体颜色</h3>
          <div class="colors">
            <span
              :key="entry.color"
              @click.prevent="setActiveColor(entry.color, entry.vibrant)"
              v-for="entry in colors"
            >
              <swatch
                :active="settings.THEME_COLOR === entry.color.toUpperCase()"
                :class="{ vibrant: entry.vibrant }"
                :color="entry.color"
                :name="entry.name"
              />
            </span>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <h3 class="title">标签</h3>
          <span>
            <pw-toggle
              :on="settings.FRAME_COLORS_ENABLED"
              @change="toggleSetting('FRAME_COLORS_ENABLED')"
              >多色
              {{
                settings.FRAME_COLORS_ENABLED ? "打开" : "关闭"
              }}</pw-toggle
            >
          </span>
        </li>
      </ul>
    </pw-section>

    <pw-section class="blue" label="代理" ref="proxy">
      <ul>
        <li>
          <div class="flex-wrap">
            <span>
              <pw-toggle
                :on="settings.PROXY_ENABLED"
                @change="toggleSetting('PROXY_ENABLED')"
                >代理
                {{ settings.PROXY_ENABLED ? "打开" : "关闭" }}</pw-toggle
              >
            </span>
            <a
              href="https://github.com/liyasthomas/postwoman/wiki/Proxy"
              target="_blank"
              rel="noopener"
            >
              <button class="icon" v-tooltip="'Wiki帮助'">
                <i class="material-icons">help</i>
              </button>
            </a>
          </div>
        </li>
      </ul>
      <ul>
        <li>
          <div class="flex-wrap">
            <label for="url">URL</label>
            <button
              class="icon"
              @click="settings.PROXY_URL = `https://postwoman.apollotv.xyz/`"
              v-tooltip.bottom="'重置为默认'"
            >
              <i class="material-icons">clear_all</i>
            </button>
          </div>
          <input
            id="url"
            type="url"
            v-model="settings.PROXY_URL"
            :disabled="!settings.PROXY_ENABLED"
          />
        </li>
      </ul>
      <ul class="info">
        <li>
          <p>实例代理</p>
        </li>
      </ul>
      <!--
      PROXY SETTINGS URL AND KEY
      --------------
		  This feature is currently not finished.
			<ul>
				<li>
					<label for="url">URL</label>
					<input id="url" type="url" v-model="settings.PROXY_URL" :disabled="!settings.PROXY_ENABLED">
				</li>
				<li>
					<label for="key">Key</label>
					<input id="key" type="password" v-model="settings.PROXY_KEY" :disabled="!settings.PROXY_ENABLED" @change="applySetting('PROXY_KEY', $event)">
				</li>
			</ul>
      -->
    </pw-section>
  </div>
</template>

<style scoped>
.info {
  margin-left: 4px;
  color: var(--fg-light-color);
}
</style>

<script>
export default {
  components: {
    "pw-section": () => import("../components/section"),
    "pw-toggle": () => import("../components/toggle"),
    swatch: () => import("../components/settings/swatch")
  },

  data() {
    return {
      // NOTE:: You need to first set the CSS for your theme in /assets/css/themes.scss
      //        You should copy the existing light theme as a template and then just
      //        set the relevant values.
      themes: [
        {
          color: "#252628",
          name: "暗黑",
          class: "",
          aceEditor: "dracula"
        },
        {
          color: "#ffffff",
          name: "纯白",
          vibrant: true,
          class: "light",
          aceEditor: "xcode"
        },
        {
          color: "#000000",
          name: "重黑",
          class: "black",
          aceEditor: "vibrant_ink"
        },
        {
          color: "var(--bg-color)",
          name: "跟随系统",
          vibrant: window.matchMedia("(prefers-color-scheme: light)").matches,
          class: "auto",
          aceEditor: window.matchMedia("(prefers-color-scheme: light)").matches
            ? "xcode"
            : "dracula"
        }
      ],
      // You can define a new color here! It will simply store the color value.
      colors: [
        // If the color is vibrant, black is used as the active foreground color.
        {
          color: "#50fa7b",
          name: "绿色",
          vibrant: true
        },
        {
          color: "#f1fa8c",
          name: "黄色",
          vibrant: true
        },
        {
          color: "#ff79c6",
          name: "粉丝",
          vibrant: true
        },
        {
          color: "#ff5555",
          name: "红色",
          vibrant: false
        },
        {
          color: "#bd93f9",
          name: "紫色",
          vibrant: true
        },
        {
          color: "#ffb86c",
          name: "橙色",
          vibrant: true
        },
        {
          color: "#8be9fd",
          name: "浅蓝",
          vibrant: true
        },
        {
          color: "#57b5f9",
          name: "深蓝",
          vibrant: false
        }
      ],

      settings: {
        THEME_CLASS: this.$store.state.postwoman.settings.THEME_CLASS || "",
        THEME_COLOR: "",
        THEME_TAB_COLOR: "",
        THEME_COLOR_VIBRANT: true,

        FRAME_COLORS_ENABLED:
          this.$store.state.postwoman.settings.FRAME_COLORS_ENABLED || false,
        PROXY_ENABLED:
          this.$store.state.postwoman.settings.PROXY_ENABLED || false,
        PROXY_URL:
          this.$store.state.postwoman.settings.PROXY_URL ||
          "https://postwoman.apollotv.xyz/",
        PROXY_KEY: this.$store.state.postwoman.settings.PROXY_KEY || ""
      }
    };
  },

  watch: {
    proxySettings: {
      deep: true,
      handler(value) {
        this.applySetting("PROXY_URL", value.url);
        this.applySetting("PROXY_KEY", value.key);
      }
    }
  },

  methods: {
    applyTheme({ class: name, color, aceEditor }) {
      this.applySetting("THEME_CLASS", name);
      this.applySetting("THEME_ACE_EDITOR", aceEditor);
      document
        .querySelector("meta[name=theme-color]")
        .setAttribute("content", color);
      this.applySetting("THEME_TAB_COLOR", color);
      document.documentElement.className = name;
    },
    setActiveColor(color, vibrant) {
      // By default, the color is vibrant.
      if (vibrant === null) vibrant = true;
      document.documentElement.style.setProperty("--ac-color", color);
      document.documentElement.style.setProperty(
        "--act-color",
        vibrant ? "rgb(37, 38, 40)" : "#f8f8f2"
      );
      this.applySetting("THEME_COLOR", color.toUpperCase());
      this.applySetting("THEME_COLOR_VIBRANT", vibrant);
    },
    getActiveColor() {
      // This strips extra spaces and # signs from the strings.
      const strip = str => str.replace(/#/g, "").replace(/ /g, "");
      return `#${strip(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--ac-color")
      ).toUpperCase()}`;
    },
    applySetting(key, value) {
      this.settings[key] = value;
      this.$store.commit("postwoman/applySetting", [key, value]);
    },
    toggleSetting(key) {
      this.settings[key] = !this.settings[key];
      this.$store.commit("postwoman/applySetting", [key, this.settings[key]]);
      this.$router.replace("/settings", {
        force: true
      });
    }
  },
  beforeMount() {
    this.settings.THEME_COLOR = this.getActiveColor();
  },

  computed: {
    proxySettings() {
      return {
        url: this.settings.PROXY_URL,
        key: this.settings.PROXY_KEY
      };
    }
  }
};
</script>
