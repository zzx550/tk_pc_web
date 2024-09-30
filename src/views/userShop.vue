<template>
  <div id="userShop" class="head_b">
    <h1 @click="router.push('/ranking')">排名</h1>
    <h1 @click="router.push('/supplier_det')">供应商</h1>
    <h1 @click="router.push('/mine_shop')">我的店铺</h1>
    <h1 @click="router.push('/withdraw')">余额提现</h1>
    <h1 @click="router.push('/order')">订单管理</h1>
  </div>
</template>
<script setup lang="ts">
  import router from '@/router'
  import { ref } from 'vue'
</script>
<style lang="less" scoped>
  #userShop {
  }
</style>
