<template>
  <div class="notice">
    <img
      v-if="is_mandatory == false"
      class="close"
      src="@/assets/img/icon_white.png"
      @click="emitCloseIcon"
    />
    <div class="pop_title">
      <van-icon
        v-if="pop_title_icon"
        :name="pop_title_icon"
        size="35"
        :color="pop_title_color"
      />
      <span :style="{ color: pop_title_color }">{{ pop_title }}</span>
    </div>

    <div class="content">
      <div class="content_title">{{ content_title }}</div>
      <div class="content_des" v-html="content_des"></div>
    </div>

    <div class="btnWrap">
      <van-button type="primary" block @click="emitButton">{{
        button_text
      }}</van-button>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'

  defineProps([
    'pop_title',
    'pop_title_color',
    'pop_title_icon',
    'content_title',
    'content_des',
    'button_text',
    'is_mandatory',
  ])

  const emit = defineEmits(['funCloseIcon', 'funButton'])
  function emitCloseIcon() {
    emit('funCloseIcon')
  }
  function emitButton() {
    emit('funButton')
  }
</script>

<style lang="less">
  .notice {
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 16px;
    padding: 20px;

    .close {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 2%;
      top: 2%;
    }

    .pop_title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 5%;

      span {
        font-size: 48px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;

      .content_title {
        font-size: 32px;
        color: #333333;
      }
      .content_des {
        font-size: 24px;
        line-height: 45px;
        color: #666666;
        padding: 3%;
        max-height: 25vh;
        min-height: 25vh;
        overflow-y: scroll;
      }
    }
    .btnWrap {
      position: sticky;
      width: 100%;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      padding: 20px;

      .van-button--primary {
        background: #499feb;
        border: none;
        border-radius: 50px;
      }
    }
  }
</style>
