<template>
  <a-modal
    class="modal_wit"
    v-model:open="props.openAdd"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeAdd', false, '')"
  >
    <div class="title">{{ $t('op_01') }}</div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="text"
      class="pr_con"
      v-model="supplier_num"
      :placeholder="$t('op_02')"
    />
    <div class="but pr_con" @click="$emit('changeAdd', true, supplier_num)">
      {{ $t('op_03') }}
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openShopName"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeShopName', false, '')"
  >
    <div class="title">
      {{ props.isUpdateShopName == true ? $t('op_04') : $t('op_05')
      }}{{ $t('op_06') }}
    </div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="text"
      class="pr_con"
      v-model="shop_name"
      :placeholder="$t('op_07')"
    />
    <div class="but pr_con" @click="$emit('changeShopName', true, shop_name)">
      {{ $t('op_08') }}
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openCz"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeCz', false)"
  >
    <div class="title">{{ $t('op_09') }}</div>
    <img class="pr_con" src="../assets/home/cz.png" />
    <div class="txt">{{ $t('op_10') }}</div>
    <div
      style="width: 180px"
      class="but pr_con"
      @click="$emit('changeCz', true)"
    >
      {{ $t('op_11') }}
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openLlb"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeLlb', false)"
  >
    <div class="title">{{ $t('op_12') }}</div>
    <img class="pr_con" src="../assets/img/llb.png" />
    <div class="pr_con llb">
      {{ $t('op_13') }}
      <div>{{ $t('op_14') }}</div>
    </div>
    <div
      v-if="props.llbHasGet"
      class="but pr_con"
      style="background-color: #e3e4e4"
    >
      {{ $t('op_15') }}
    </div>
    <div v-else class="but pr_con" @click="$emit('changeLlb', true)">
      {{ $t('op_16') }}
    </div>

    <div class="box_rec">
      <div class="title">
        <div>{{ $t('op_17') }}</div>
      </div>
      <div class="content_" v-html="props.llbRule"></div>
      <div class="no_data" v-if="!props.llbRule">
        <img style="width: 20%" src="../assets/img/no_data.png" />
        <div>{{ $t('or_19') }}</div>
      </div>
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openFyRule"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeFyRule', false)"
  >
    <div class="title">{{ $t('op_18') }}</div>
    <div class="txt" v-html="props.fyRule"></div>
    <div class="no_data" v-if="!props.fyRule">
      <img style="width: 20%" src="../assets/img/no_data.png" />
      <div>{{ $t('or_19') }}</div>
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openSetPassword"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changePassword', false, '', '')"
  >
    <div class="title">
      {{ $t('op_21') }}{{ props.isWithdraw == true ? $t('op_19') : $t('op_20')
      }}{{ $t('op_22') }}
    </div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="password"
      class="pr_con"
      :style="{ marginTop: '35px', marginBottom: '20px' }"
      v-model="pwd"
      :placeholder="
        $t('op_23') +
        (props.isWithdraw == true ? $t('op_19') : $t('op_20')) +
        $t('op_22')
      "
    />
    <input
      type="password"
      class="pr_con"
      :style="{ marginTop: 0 }"
      v-model="repeat_pwd"
      :placeholder="
        $t('op_24') +
        (props.isWithdraw == true ? $t('op_19') : $t('op_20')) +
        $t('op_22')
      "
    />
    <div
      class="but pr_con"
      @click="$emit('changePassword', true, pwd, repeat_pwd)"
    >
      {{ $t('op_08') }}
    </div>
  </a-modal>

  <!-- 商家入驻 -->
  <a-modal
    class="modal_wit"
    v-model:open="props.openEnter"
    centered
    :footer="null"
    width="500px"
    @cancel="$emit('changeEnter', false)"
  >
    <div class="title">{{ $t('_ho_12') }}</div>
    <div class="from">
      <div class="data">
        <div>{{ $t('_ho_06') }}</div>
        <input
          type="text"
          v-model="enter.shop_name"
          :placeholder="$t('_ho_07')"
        />
      </div>
      <div class="data">
        <div>{{ $t('_ho_08') }}</div>
        <input
          type="text"
          v-model="enter.telephone"
          :placeholder="$t('_ho_09')"
        />
      </div>
      <div class="data">
        <div>{{ $t('_ho_10') }}</div>
        <input
          type="text"
          v-model="enter.shop_code"
          :placeholder="$t('_ho_11')"
        />
      </div>
      <Captcha
        style="margin-bottom: 30px"
        @captchaValid="handleCaptchaValidation"
      />

      <div class="but pr_con" @click="EnterShop">
        {{ $t('op_08') }}
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import i18n from '@/lang'
  import { api_createJoinInApply } from '@/requset/api'
  import { message } from 'ant-design-vue'
  import { ref, defineProps, defineEmits } from 'vue'

  const emit = defineEmits([
    'changeAdd',
    'changeCz',
    'changeHy',
    'changeLlb',
    'changeShopName',
    'changeFyRule',
    'changePassword',
    'changeEnter',
  ])

  const props = defineProps({
    openCz: {
      type: Boolean,
      require: false,
    },
    openAdd: {
      type: Boolean,
      require: false,
    },
    openEnter: {
      type: Boolean,
      require: false,
    },
    openLlb: {
      type: Boolean,
      require: false,
    },
    llbRule: {
      type: String,
      require: '',
    },
    llbHasGet: {
      type: String,
      require: '',
    },
    openShopName: {
      type: Boolean,
      require: false,
    },
    isUpdateShopName: {
      type: Boolean,
      require: false,
    },
    openFyRule: {
      type: Boolean,
      require: false,
    },
    fyRule: {
      type: String,
      require: '',
    },
    openSetPassword: {
      type: Boolean,
      require: false,
    },
    isWithdraw: {
      type: Boolean,
      require: false,
    },
  })
  const shop_name = ref<string>('')
  const supplier_num = ref<string>('')
  const pwd = ref<string>('')
  const repeat_pwd = ref<string>('')
  const isCaptchaValid = ref<boolean>(false)
  const enter = ref<any>({ shop_name: '', telephone: '', shop_code: '' })

  function EnterShop() {
    if (enter.value.shop_name == '') {
      message.error(i18n.global.t('_ho_07'))
      return
    }
    if (enter.value.telephone == '') {
      message.error(i18n.global.t('_ho_09'))
      return
    }
    if (enter.value.shop_code == '') {
      message.error(i18n.global.t('_ho_11'))
      return
    }
    if (!isCaptchaValid.value) {
      message.error(i18n.global.t('_ho_13'))
      return
    }
    api_createJoinInApply({ ...enter.value }).then((res: any) => {
      if (res.code == 200) {
        message.success(i18n.global.t('_ho_14'))
        emit('changeEnter', false)
      } else if (res.code == 201) {
        message.error(i18n.global.t(i18n.global.t('_ho_15')))
      } else if (res.code == 202) {
        message.error(i18n.global.t(i18n.global.t('_ho_16')))
      } else if (res.code == 2002) {
        message.error(i18n.global.t(i18n.global.t('_ho_17')))
      } else if (res.code == 2003) {
        message.error(i18n.global.t(i18n.global.t('_ho_18')))
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }

  const handleCaptchaValidation = (valid: boolean) => {
    isCaptchaValid.value = valid
  }
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
    .from {
      .data {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        div {
          flex: 1;
          text-align: right;
          font-size: 14px !important;
        }
        input {
          margin: 0;
        }
      }
      ::v-deep .d_input {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        flex-direction: row;
        .d_title {
          text-align: right;
          font-size: 14px !important;
          flex: 1;
        }
        .d_content {
          margin: 0;
        }
        input {
          width: 220px !important;
          margin: 0 20px;
        }
      }
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
