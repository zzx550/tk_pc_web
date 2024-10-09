<template>
  <div class="floating-icon" @click="changeCz">
    <img src="../assets/contact_green_icon.png" />
  </div>
</template>

<script setup lang="ts">
  import { api_getOption } from '@/requset/api'
  import { message } from 'ant-design-vue'

  const changeCz = () => {
    api_getOption({}).then((res: any) => {
      if (res.success) {
        let serviceUrl = res.data.recharge_service_link
        if (serviceUrl != '' && serviceUrl != null) {
          window.open(serviceUrl)
        } else {
          message.error('客服链接未配置~')
        }
      }
    })
  }
</script>

<style lang="less" scoped>
  .floating-icon {
    position: fixed;
    bottom: 11%;
    right: 8%;
    z-index: 99;
    width: 80px;
    height: 80px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background 0.3s;
    border: 2px solid #10dbd5;

    img {
      width: 50px;
      height: 50px;
      color: white;
    }
  }
</style>
