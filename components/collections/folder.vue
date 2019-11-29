<template>
  <div>
    <div class="flex-wrap">
      <div>
        <button class="icon" @click="toggleShowChildren">
          <i class="material-icons" v-show="!showChildren">arrow_right</i>
          <i class="material-icons" v-show="showChildren">arrow_drop_down</i>
          <i class="material-icons">folder_open</i>
          <span>{{ folder.name }}</span>
        </button>
      </div>
      <v-popover>
        <button class="tooltip-target icon" v-tooltip="'更多'">
          <i class="material-icons">more_vert</i>
        </button>
        <template slot="popover">
          <div>
            <button class="icon" @click="editFolder" v-close-popover>
              <i class="material-icons">edit</i>
              <span>编辑</span>
            </button>
          </div>
          <div>
            <button class="icon" @click="removeFolder" v-close-popover>
              <i class="material-icons">delete</i>
              <span>删除</span>
            </button>
          </div>
        </template>
      </v-popover>
    </div>

    <div v-show="showChildren">
      <ul>
        <li v-for="(request, index) in folder.requests" :key="index">
          <request
            v-bind:request="request"
            v-bind:collection-index="collectionIndex"
            v-bind:folder-index="folderIndex"
            v-bind:request-index="index"
            v-on:edit-request="
              $emit('edit-request', {
                request,
                collectionIndex,
                folderIndex,
                requestIndex: index
              })
            "
          />
        </li>
        <li v-if="folder.requests.length === 0">
          <label>目录为空</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
}

ul li {
  display: flex;
  margin-left: 32px;
  border-left: 1px solid var(--brd-color);
}
</style>

<script>
export default {
  props: {
    folder: Object,
    collectionIndex: Number,
    folderIndex: Number
  },
  components: {
    request: () => import("./request")
  },
  data() {
    return {
      showChildren: false
    };
  },
  methods: {
    toggleShowChildren() {
      this.showChildren = !this.showChildren;
    },
    selectRequest(request) {
      this.$store.commit("postwoman/selectRequest", { request });
    },
    removeFolder() {
      if (!confirm("你确定想删除这个目录?")) return;
      this.$store.commit("postwoman/removeFolder", {
        collectionIndex: this.collectionIndex,
        folderIndex: this.folderIndex
      });
    },
    editFolder() {
      this.$emit("edit-folder");
    }
  }
};
</script>
