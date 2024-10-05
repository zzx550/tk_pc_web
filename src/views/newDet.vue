<template>
  <div id="newDet" class="head_b">
    <TopSeek :title="'消息中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/news')">
          消息中心
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">详情</div>
      </div>
      <div class="txt_Con">
        <div class="title">表艾克赛德</div>
        <div class="time">2024-12-05 12:26:00</div>
        <div class="txt">
          阿加莎德哈卡汕德卡十九大阿斯卡大家啊上课了登记卡手机打卡机苏卡达久啊立卡手打卡萨丁久啊上课的啊可视对讲啊可视角度立卡时间段lkd
          阿加莎德哈卡汕德卡十九大阿斯卡大家啊上课了登记卡手机打卡机苏卡达久啊立卡手打卡萨丁久啊上课的啊可视对讲啊可视角度立卡时间段lkd
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import router from '@/router'
  import { ref } from 'vue'
</script>
<style lang="less" scoped>
  #newDet {
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
      .txt_Con {
        min-height: 600px;
        text-align: center;
        padding: 20px 120px 50px;
        .title {
          font-size: 24px;
        }
        .time {
          padding: 10px 0 15px;
        }
        .txt {
          color: #1d1e25;
        }
      }
    }
  }
</style>
