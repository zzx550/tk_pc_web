<template>
  <div class="top">
    <img class="logo" src="../assets/home/logo.png" />
    <div class="seek">
      <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
      <img class="icon" src="../assets/home/seek.png" />
    </div>
    <div class="right">
      <img class="ts" src="../assets/home/sy.png" />
      <img class="kf" style="margin: 0 25px" src="../assets/home/kf_icon.png" />
      <div class="shop">
        <img src="../assets/home/sp.png" />
        店铺中心
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const seekValue = ref<string>('')
</script>

<style scoped lang="less">
  .top {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 43px;
    }
    .seek {
      margin: 0 30px;
      flex: 1;
      height: 46px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: 1px solid #707070;
        background-color: transparent;
        font-size: 16px;
        &::placeholder {
          color: #1d1e25;
          opacity: 30%;
        }
      }
      .icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        height: 24px;
        width: 24px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
      }
      .shop {
        display: flex;
        align-items: center;
        height: 38px;
        background-color: #0ae2db;
        border-radius: 4px;
        padding: 0 10px;
        font-size: 14px;
        color: #fff;
        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
