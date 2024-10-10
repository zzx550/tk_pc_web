<template>
  <div class="top_" v-if="!props.title">
    <img class="logo" @click="router.push('/')" src="../assets/home/logo.png" />
    <div class="seek">
      <input type="text" v-model="seekValue" :placeholder="$t('to_01')" />
      <img class="icon" src="../assets/home/seek.png" />
      <button @click="sou">{{ $t('to_02') }}</button>
    </div>
    <div class="right" v-if="isLogin == true">
      <div>
        <a-badge :count="notReadMsgNum" @click="router.push('./news')">
          <img class="ts" src="../assets/home/sy.png" />
        </a-badge>
      </div>
      <img
        @click="router.push('./inquiry')"
        class="kf"
        src="../assets/home/kf_icon.png"
      />
      <div>
        <a-dropdown placement="bottom">
          <img src="../assets/home/lang.png" @click.prevent />
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item v-for="x in state.countryLang" :key="x.lang">
                {{ x.value }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="shop cur_p" @click="router.push('/user_shop')">
        <img src="../assets/home/sp.png" />
        {{ $t('to_03') }}
      </div>
    </div>
    <div v-else class="right cur_p" style="justify-content: right">
      <div class="loginAnd">
        <div @click="router.push('./login')">{{ $t('to_04') }}</div>
        {{ $t('to_05') }}
        <div @click="router.push('./login?type=1')" style="padding-left: 10px">
          {{ $t('to_06') }}
        </div>
      </div>
    </div>
  </div>
  <div class="top_ two" v-else>
    <img class="logo" @click="router.push('/')" src="../assets/home/logo.png" />
    <div class="seek" style="text-align: left">
      {{ props.title }}
    </div>
    <div class="right">
      <div class="fk_ cur_p" @click="modal_fk = true">
        <img class="kf" src="../assets/img/fk_icon.png" />
        {{ $t('to_07') }}
      </div>
      <div class="shop cur_p" @click="loginOut">
        <img src="../assets/img/tc_icon.png" />
        {{ $t('to_08') }}
      </div>
    </div>
  </div>

  <a-modal
    class="modal_wit"
    v-model:open="modal_fk"
    centered
    :footer="null"
    width="561px"
  >
    <div class="title">{{ $t('to_09') }}</div>
    <textarea class="txt" v-model="feebackContent"></textarea>
    <div class="but pr_con" @click="feedBackSubmit">{{ $t('to_10') }}</div>
  </a-modal>
</template>

<script setup lang="ts">
  import i18n from '@/lang'
  import { useStore } from 'vuex'
  const { state } = useStore()
  import { api_logout, api_problemFeedback, api_getInfo } from '@/requset/api'
  import router from '@/router'
  import { ref, defineProps, watch, defineEmits } from 'vue'
  import { message, type MenuProps } from 'ant-design-vue'

  const emit = defineEmits(['changeKey'])

  // 基本写法
  const props = defineProps({
    title: {
      type: String,
      require: false,
    },
  })

  const seekValue = ref<string>('')
  const modal_fk = ref<boolean>(false)
  const feebackContent = ref<string>('')
  let isLogin = ref<boolean>(false)
  let notReadMsgNum = ref<number>(0)

  isLogin.value =
    sessionStorage.getItem('token') != null &&
    sessionStorage.getItem('token') != '' &&
    sessionStorage.getItem('token') != undefined

  function sou() {
    router.push('/shop?value=' + seekValue.value)
    if (router.currentRoute.value.path == '/shop') {
      setTimeout(() => {
        router.go(0)
      }, 500)
    }
  }

  if (isLogin.value == true) {
    api_getInfo({}).then((res: any) => {
      notReadMsgNum.value = res.data.notReadMsgNum
        ? Number(res.data.notReadMsgNum)
        : 0
    })
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    state.countryLang.forEach((x: any, y: number) => {
      if (x.lang == key) {
        sessionStorage.setItem('lang', String(key))
        sessionStorage.setItem('lang_w', x.value)
        router.go(0)
      }
    })
  }

  const feedBackSubmit = () => {
    if (feebackContent.value == '') return
    api_problemFeedback({
      content: feebackContent.value,
    }).then((res: any) => {
      if (res.code == 200) {
        modal_fk.value = false
        message.success(i18n.global.t('to_11'))
        feebackContent.value = ''
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }

  const loginOut = () => {
    api_logout({}).then((res: any) => {
      if (res.success) {
        sessionStorage.removeItem('token')
        router.push('./')
      }
    })
  }
</script>

<style scoped lang="less">
  .top_ {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 30px;
    .logo {
      height: 43px;
    }
    .seek {
      margin: 0 20px;
      flex: 1;
      height: 48px;
      position: relative;
      text-align: center;
      input {
        width: 400px;
        height: 100%;
        border-radius: 8px;
        border: 1px solid #dcdfe6;
        background-color: transparent;
        padding-left: 40px;
        font-size: 16px;
        &::placeholder {
          color: #1d1e25;
          opacity: 30%;
        }
      }
      .icon {
        position: absolute;
        left: 28%;
        top: 50%;
        transform: translateY(-50%);
        height: 24px;
        width: 24px;
      }
      button {
        position: absolute;
        background-color: #000;
        border-radius: 8px;
        width: 80px;
        height: 40px;
        color: #fff;
        font-size: 14px;
        right: 27.5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      padding: 10px;
      color: #0ae2db;
      width: 330px;
      .loginAnd {
        display: flex;
        font-size: 14px;
        align-items: center;
        div {
          padding: 0 8px;
        }
      }
      .ts {
        position: relative;
        top: 1.5px;
      }
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
      padding-left: 110px;
      .fk_ {
        font-size: 14px;
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .modal_wit {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .txt {
      width: 513px;
      height: 317px;
      background-color: #f6f7f9;
      border-radius: 8px;
      border: none;
      padding: 5px;
      font-size: 16px;
      margin-bottom: 40px;
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
