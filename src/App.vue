<template>
  <div id="app">
    <img class="bac_app" style="width: 100%" src="./assets/home/bac_top.png" />
    <a-button type="primary">Primary Button</a-button>
    <router-view class="content" />
  </div>
</template>

<style lang="less" scoped>
  #app {
    .bac_app {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .content {
      padding-top: 10px;
    }
  }
</style>
