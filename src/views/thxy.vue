<template>
  <img class="bac_wz_" src="../assets/wz_bac.jpg" />
  <div class="content_wz head_b_" style="padding: 40px 0">
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

  api_indexDesc({ name: 'return_policy' }).then((res: any) => {
    if (res.success) {
      txt.value = res.data
    }
  })
</script>
