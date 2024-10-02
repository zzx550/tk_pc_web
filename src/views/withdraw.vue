<template>
  <div id="withdraw" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="box_le">
          <div class="breadcrumb" @click="router.push('/user_shop')">
            商铺中心
          </div>
          <div class="line">></div>
          <div style="font-weight: 600">余额提现</div>
        </div>
        <div class="jl">提现记录</div>
      </div>
      <div class="conte">
        <div class="blu">当前余额:$34258.00</div>
      </div>
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
        justify-content: space-between;
        .box_le {
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
        .jl {
          color: #0ae2db;
          font-size: 16px;
          margin-right: 20px;
        }
      }

      .conte {
        padding-top: 80px;
        text-align: center;
        .blu {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
</style>
