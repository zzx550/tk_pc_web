<template>
  <div id="withdraw" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb" @click="router.push('/news')">商铺中心</div>
        <div class="line">></div>
        <div>余额提现</div>
      </div>
      <div class="conte"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'
</script>
<style lang="less" scoped>
  #withdraw {
    .con_box {
      background-color: #fff;
      border-radius: 12px;
      .title_l {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
        display: flex;
        align-items: center;
        div {
          padding: 20px 18px;
          font-size: 18px;
        }
        .breadcrumb {
          color: #8d8e91;
        }
        .line {
          color: #8d8e91;
          padding: 0 4px;
        }
      }

      .conte {
      }
    }
  }
</style>
