<template>
  <div class="flex-wrap">
    <div>
      <button class="icon" @click="selectRequest()" v-tooltip="'使用请求'">
        <i class="material-icons">insert_drive_file</i>
        <span>{{ request.name }}</span>
      </button>
    </div>
    <v-popover>
      <button class="tooltip-target icon" v-tooltip="'更多'">
        <i class="material-icons">more_vert</i>
      </button>
      <template slot="popover">
        <div>
          <button class="icon" @click="$emit('edit-request')" v-close-popover>
            <i class="material-icons">edit</i>
            <span>编辑</span>
          </button>
        </div>
        <div>
          <button class="icon" @click="removeRequest" v-close-popover>
            <i class="material-icons">delete</i>
            <span>删除</span>
          </button>
        </div>
      </template>
    </v-popover>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
}

ul li {
  display: flex;
  padding-left: 16px;
  border-left: 1px solid var(--brd-color);
}
</style>

<script>
export default {
  props: {
    request: Object,
    collectionIndex: Number,
    folderIndex: Number,
    requestIndex: Number
  },
  methods: {
    selectRequest() {
      this.$store.commit("postwoman/selectRequest", { request: this.request });
    },
    removeRequest() {
      if (!confirm("你确定要删除请求?")) return;
      this.$store.commit("postwoman/removeRequest", {
        collectionIndex: this.collectionIndex,
        folderIndex: this.folderIndex,
        requestIndex: this.requestIndex
      });
    }
  }
};
</script>
