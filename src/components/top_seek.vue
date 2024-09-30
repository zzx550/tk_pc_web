<template>
  <div class="top_" v-if="!props.title">
    <img class="logo" @click="router.push('/')" src="../assets/home/logo.png" />
    <div class="seek">
      <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
      <img class="icon" src="../assets/home/seek.png" />
    </div>
    <div class="right">
      <div>
        <a-badge count="5" @click="router.push('./about')">
          <img class="ts" src="../assets/home/sy.png" />
        </a-badge>
      </div>
      <img class="kf" style="margin: 0 25px" src="../assets/home/kf_icon.png" />
      <div style="margin-right: 25px">
        <a-dropdown placement="bottom">
          <img src="../assets/home/lang.png" @click.prevent />
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item key="1"> 中文简体 </a-menu-item>
              <a-menu-item key="2"> 中文繁体 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="shop cur_p" @click="router.push('/user_shop')">
        <img src="../assets/home/sp.png" />
        商铺中心
      </div>
    </div>
  </div>
  <div class="top_ two" v-else>
    <img class="logo" @click="router.push('/')" src="../assets/home/logo.png" />
    <div class="seek">
      {{ props.title }}
    </div>
    <div class="right">
      <div class="fk_">
        <img class="kf" src="../assets/img/fk_icon.png" />
        反馈
      </div>
      <div class="shop cur_p" @click="router.push('/user_shop')">
        <img src="../assets/img/tc_icon.png" />
        退出登录
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { ref, defineProps } from 'vue'
  import type { MenuProps } from 'ant-design-vue'

  // 基本写法
  const props = defineProps({
    title: {
      type: String,
      require: false,
    },
  })
  console.log('props :>> ', props)

  const seekValue = ref<string>('')

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`点击了 ${key}`)
  }
</script>

<style scoped lang="less">
  .top_ {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .logo {
      height: 43px;
    }
    .seek {
      margin: 0 30px;
      flex: 1;
      height: 46px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: 1px solid #707070;
        background-color: transparent;
        font-size: 16px;
        &::placeholder {
          color: #1d1e25;
          opacity: 30%;
        }
      }
      .icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        height: 24px;
        width: 24px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
      }
      .shop {
        display: flex;
        align-items: center;
        height: 38px;
        background-color: #0ae2db;
        border-radius: 4px;
        padding: 0 10px;
        font-size: 14px;
        color: #fff;
        img {
          width: 24px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }
  }
  .two {
    align-items: center;
    .seek {
      height: auto;
      font-size: 20px;
      font-weight: 600;
    }
    .right {
      .fk_ {
        margin-right: 20px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
