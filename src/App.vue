<template>
  <router-view v-if="isRouter"></router-view>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouter: true,
    };
  },
  methods: {
    reload() {
      this.isRouter = false;
      this.$nextTick(() => {
        this.isRouter = true;
      });
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
</style>
