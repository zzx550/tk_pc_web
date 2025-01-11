<template>
  <div id="newDet" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/news')">
          {{ $t('ne_01') }}
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">{{ $t('ne_02') }}</div>
      </div>
      <div class="txt_Con">
        <div class="title">{{ txt.title }}</div>
        <div class="time">{{ txt.release_time }}</div>
        <div class="txt" v-html="txt.content"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { api_newsDetail } from '@/requset/api'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  import { ref } from 'vue'

  const {
    query: { id },
  } = route
  const txt = ref<any>([])

  // router.currentRoute.value.query.id
  api_newsDetail({ id }).then((res: any) => {
    txt.value = res.data
  })
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
        // min-height: 600px;
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
