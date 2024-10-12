<template>
  <img class="bac_wz_" src="../assets/wz_bac.jpg" />
  <div class="step-div head_b_ content_wz" style="padding: 40px 0">
    <div v-html="txt"></div>
  </div>
  <a href="#/">
    <img class="home_bq_" src="../assets/home.png" />
  </a>
</template>

<script setup lang="ts">
  import { api_indexDesc } from '@/requset/api'
  import { ref } from 'vue'

  let txt = ref<string>('')

  api_indexDesc({ name: 'delivery_pickup' }).then((res: any) => {
    if (res.success) {
      txt.value = res.data
    }
  })
</script>
