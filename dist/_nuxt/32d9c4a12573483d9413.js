(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{240:function(t,e,o){var content=o(672);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(43).default)("dfe5f40e",content,!0,{sourceMap:!1})},671:function(t,e,o){"use strict";var n=o(240);o.n(n).a},672:function(t,e,o){(t.exports=o(42)(!1)).push([t.i,".info[data-v-ed90d186]{margin-left:4px;color:var(--fg-light-color)}",""])},721:function(t,e,o){"use strict";o.r(e);o(44);var n={components:{"pw-section":function(){return o.e(1).then(o.bind(null,263))},"pw-toggle":function(){return o.e(11).then(o.bind(null,725))},swatch:function(){return o.e(29).then(o.bind(null,726))}},data:function(){return{themes:[{color:"#252628",name:"暗黑",class:"",aceEditor:"dracula"},{color:"#ffffff",name:"纯白",vibrant:!0,class:"light",aceEditor:"xcode"},{color:"#000000",name:"重黑",class:"black",aceEditor:"vibrant_ink"},{color:"var(--bg-color)",name:"跟随系统",vibrant:window.matchMedia("(prefers-color-scheme: light)").matches,class:"auto",aceEditor:window.matchMedia("(prefers-color-scheme: light)").matches?"xcode":"dracula"}],colors:[{color:"#50fa7b",name:"绿色",vibrant:!0},{color:"#f1fa8c",name:"黄色",vibrant:!0},{color:"#ff79c6",name:"粉丝",vibrant:!0},{color:"#ff5555",name:"红色",vibrant:!1},{color:"#bd93f9",name:"紫色",vibrant:!0},{color:"#ffb86c",name:"橙色",vibrant:!0},{color:"#8be9fd",name:"浅蓝",vibrant:!0},{color:"#57b5f9",name:"深蓝",vibrant:!1}],settings:{THEME_CLASS:this.$store.state.postwoman.settings.THEME_CLASS||"",THEME_COLOR:"",THEME_TAB_COLOR:"",THEME_COLOR_VIBRANT:!0,FRAME_COLORS_ENABLED:this.$store.state.postwoman.settings.FRAME_COLORS_ENABLED||!1,PROXY_ENABLED:this.$store.state.postwoman.settings.PROXY_ENABLED||!1,PROXY_URL:this.$store.state.postwoman.settings.PROXY_URL||"https://postwoman.apollotv.xyz/",PROXY_KEY:this.$store.state.postwoman.settings.PROXY_KEY||""}}},watch:{proxySettings:{deep:!0,handler:function(t){this.applySetting("PROXY_URL",t.url),this.applySetting("PROXY_KEY",t.key)}}},methods:{applyTheme:function(t){var e=t.class,o=t.color,n=t.aceEditor;this.applySetting("THEME_CLASS",e),this.applySetting("THEME_ACE_EDITOR",n),document.querySelector("meta[name=theme-color]").setAttribute("content",o),this.applySetting("THEME_TAB_COLOR",o),document.documentElement.className=e},setActiveColor:function(t,e){null===e&&(e=!0),document.documentElement.style.setProperty("--ac-color",t),document.documentElement.style.setProperty("--act-color",e?"rgb(37, 38, 40)":"#f8f8f2"),this.applySetting("THEME_COLOR",t.toUpperCase()),this.applySetting("THEME_COLOR_VIBRANT",e)},getActiveColor:function(){var t;return"#".concat((t=window.getComputedStyle(document.documentElement).getPropertyValue("--ac-color"),t.replace(/#/g,"").replace(/ /g,"")).toUpperCase())},applySetting:function(t,e){this.settings[t]=e,this.$store.commit("postwoman/applySetting",[t,e])},toggleSetting:function(t){this.settings[t]=!this.settings[t],this.$store.commit("postwoman/applySetting",[t,this.settings[t]]),this.$router.replace("/settings",{force:!0})}},beforeMount:function(){this.settings.THEME_COLOR=this.getActiveColor()},computed:{proxySettings:function(){return{url:this.settings.PROXY_URL,key:this.settings.PROXY_KEY}}}},l=(o(671),o(33)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page"},[o("pw-section",{ref:"theme",staticClass:"cyan",attrs:{label:"主题"}},[o("ul",[o("li",[o("h3",{staticClass:"title"},[t._v("背景颜色")]),t._v(" "),o("div",{staticClass:"backgrounds"},t._l(t.themes,(function(e){return o("span",{key:e.class,on:{click:function(o){return t.applyTheme(e)}}},[o("swatch",{class:{vibrant:e.vibrant},attrs:{active:t.settings.THEME_CLASS===e.class,color:e.color,name:e.name}})],1)})),0)])]),t._v(" "),o("ul",[o("li",[o("h3",{staticClass:"title"},[t._v("字体颜色")]),t._v(" "),o("div",{staticClass:"colors"},t._l(t.colors,(function(e){return o("span",{key:e.color,on:{click:function(o){return o.preventDefault(),t.setActiveColor(e.color,e.vibrant)}}},[o("swatch",{class:{vibrant:e.vibrant},attrs:{active:t.settings.THEME_COLOR===e.color.toUpperCase(),color:e.color,name:e.name}})],1)})),0)])]),t._v(" "),o("ul",[o("li",[o("h3",{staticClass:"title"},[t._v("标签")]),t._v(" "),o("span",[o("pw-toggle",{attrs:{on:t.settings.FRAME_COLORS_ENABLED},on:{change:function(e){return t.toggleSetting("FRAME_COLORS_ENABLED")}}},[t._v("多色\n              "+t._s(t.settings.FRAME_COLORS_ENABLED?"打开":"关闭"))])],1)])])]),t._v(" "),o("pw-section",{ref:"proxy",staticClass:"blue",attrs:{label:"代理"}},[o("ul",[o("li",[o("div",{staticClass:"flex-wrap"},[o("span",[o("pw-toggle",{attrs:{on:t.settings.PROXY_ENABLED},on:{change:function(e){return t.toggleSetting("PROXY_ENABLED")}}},[t._v("代理\n                "+t._s(t.settings.PROXY_ENABLED?"打开":"关闭"))])],1),t._v(" "),o("a",{attrs:{href:"https://github.com/liyasthomas/postwoman/wiki/Proxy",target:"_blank",rel:"noopener"}},[o("button",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"Wiki帮助",expression:"'Wiki帮助'"}],staticClass:"icon"},[o("i",{staticClass:"material-icons"},[t._v("help")])])])])])]),t._v(" "),o("ul",[o("li",[o("div",{staticClass:"flex-wrap"},[o("label",{attrs:{for:"url"}},[t._v("URL")]),t._v(" "),o("button",{directives:[{name:"tooltip",rawName:"v-tooltip.bottom",value:"重置为默认",expression:"'重置为默认'",modifiers:{bottom:!0}}],staticClass:"icon",on:{click:function(e){t.settings.PROXY_URL="https://postwoman.apollotv.xyz/"}}},[o("i",{staticClass:"material-icons"},[t._v("clear_all")])])]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.PROXY_URL,expression:"settings.PROXY_URL"}],attrs:{id:"url",type:"url",disabled:!t.settings.PROXY_ENABLED},domProps:{value:t.settings.PROXY_URL},on:{input:function(e){e.target.composing||t.$set(t.settings,"PROXY_URL",e.target.value)}}})])]),t._v(" "),o("ul",{staticClass:"info"},[o("li",[o("p",[t._v("实例代理")])])])])],1)}),[],!1,null,"ed90d186",null);e.default=component.exports}}]);