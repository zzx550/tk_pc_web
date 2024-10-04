<template>
  <a-modal
    class="modal_wit"
    v-model:open="props.openAdd"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeAdd', false)"
  >
    <div class="title">添加供应商</div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input type="text " class="pr_con" :placeholder="'请输入供应商编号'" />
    <div class="but pr_con" @click="$emit('changeAdd', false)">提交</div>
  </a-modal>
  <a-modal
    class="modal_wit"
    v-model:open="props.openCz"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeCz', false)"
  >
    <div class="title">充值提示</div>
    <img class="pr_con" src="../assets/home/cz.png" />
    <div class="txt">由于各国家商户承销币种问题，目前充值需联系客服</div>
    <div class="but pr_con">联系客服</div>
  </a-modal>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { ref, defineProps, defineEmits } from 'vue'

  const emit = defineEmits(['changeAdd', 'changeCz'])

  const props = defineProps({
    openCz: {
      type: Boolean,
      required: false,
    },
    openAdd: {
      type: Boolean,
      require: false,
    },
  })
</script>

<style lang="less" scoped>
  .modal_wit {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    img {
      width: 120px;
    }
    input {
      background-color: #f6f7f9 !important;
      height: 42px !important;
      width: 333px !important;
      border-radius: 4px !important;
      margin-left: 20px !important;
      margin: 20px 0 35px;
    }
    .txt {
      margin: 20px 0 35px;
      text-align: center;
    }
    .but {
      width: 150px;
      padding: 8px 10px;
      border-radius: 4px;
      background-color: #0ae2db;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
  }
</style>
