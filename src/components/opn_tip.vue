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
    <div style="width: 180px" class="but pr_con">联系客服</div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openHy"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeLlb', false)"
  >
    <div class="title">好友助力</div>
    <img class="pr_con" src="../assets/img/hyzl.png" />
    <div class="pr_con yqm">
      我的邀请码
      <div class="img">4489ag8Ks <img src="../assets/img/copy.png" /></div>
    </div>
    <input type="text " class="pr_con" :placeholder="'请输入助力好友邀请码'" />
    <div class="but pr_con">提交</div>

    <div class="box_rec">
      <div class="title">
        <div :class="check ? 'check' : ''" @click="check = true">助力明细</div>
        <div :class="!check ? 'check' : ''" @click="check = false">
          活动规则
        </div>
      </div>
      <div class="content_">
        <div class="list" v-if="check" v-for="x in 8" :key="x">
          张大大
          <div>2014-02-15 14:00</div>
        </div>
        <div v-else>
          啊实打实大卡司阿帆阿是阿德奥德赛阿嘎奥古斯丁噶拉个艾克赛德爱哭鬼
        </div>
      </div>
    </div>
  </a-modal>
  <a-modal
    class="modal_wit"
    v-model:open="props.openLlb"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeHy', false)"
  >
    <div class="title">流量包</div>
    <img class="pr_con" src="../assets/img/llb.png" />
    <div class="pr_con llb">
      新人扶持流量包
      <div>领取百万商品</div>
    </div>
    <div v-if="1" class="but pr_con">领取</div>
    <div v-else class="but pr_con" style="background-color: #e3e4e4">
      已领取
    </div>

    <div class="box_rec">
      <div class="title">
        <div>活动规则</div>
      </div>
      <div class="content_">
        啊实打实大卡司阿帆阿是阿德奥德赛阿嘎奥古斯丁噶拉个艾克赛德爱哭鬼
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { ref, defineProps, defineEmits } from 'vue'

  const emit = defineEmits(['changeAdd', 'changeCz', 'changeHy', 'changeLlb'])

  const props = defineProps({
    openCz: {
      type: Boolean,
      required: false,
    },
    openAdd: {
      type: Boolean,
      require: false,
    },
    openHy: {
      type: Boolean,
      require: false,
    },
    openLlb: {
      type: Boolean,
      require: false,
    },
  })
  const check = ref<boolean>(true)
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
    .yqm {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      text-align: center;
      div {
        padding: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        img {
          width: 15px;
          margin-left: 5px;
        }
      }
    }
    .llb {
      text-align: center;
      font-size: 18px;
      padding-top: 10px;
      margin-bottom: 20px;
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
    .box_rec {
      padding-top: 40px;
      .title {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        div {
          padding: 0 16px;
          font-size: 14px;
          cursor: pointer;
        }
        .check {
          font-weight: 600;
          position: relative;
          &:after {
            content: ' ';
            position: absolute;
            height: 2px;
            width: 50%;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000;
            bottom: 0;
          }
        }
      }
      .content_ {
        max-height: 200px;
        overflow: auto;
        .list {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
        }
      }
    }
  }
</style>
