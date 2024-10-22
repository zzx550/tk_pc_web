<template>
  <div id="inquiryOrder" class="head_b">
    <TopSeek :title="$t('in_01')" />
    <div class="con">
      <div class="shop_l">
        <div class="list_T">
          <div class="img_name">{{ $t('in_02') }}</div>
          <div class="two">{{ $t('in_03') }}</div>
          <div>IP</div>
          <div>{{ $t('in_04') }}</div>
          <div class="gm">{{ $t('in_05') }}</div>
        </div>
        <div class="list list_T" v-for="x in order" :key="x">
          <div class="img_name">
            <img class="shop_i" :src="x.last_msg_content.cover_img" />
            <div class="txt_3">
              {{ x.last_msg_content.goods_name }}
            </div>
          </div>
          <div class="two">
            <img :src="x.headimage" />
            <div>{{ x.nickname }}</div>
          </div>
          <div>{{ x.ip }}</div>
          <div>{{ x.create_time }}</div>
          <div class="gm">
            <div class="but pay" @click="getKF(x.consult_order_id)">
              {{ $t('in_06') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    class="modal_wit"
    v-model:open="modal_fk"
    centered
    :footer="null"
    width="800px"
  >
    <div class="kf">
      <div class="title">{{ $t('in_07') }}</div>
      <div class="consult_list">
        <div
          class="item"
          :class="x.type == 1 ? 'item1' : 'item2'"
          v-for="x in messageChatList"
          :key="x"
        >
          <div class="name">
            <img
              v-if="x.type == 0 && x.consult_user.headimage"
              :src="x.consult_user.headimage"
            />
            <span v-if="x.type == 0 && x.consult_user.nickname">{{
              x.consult_user.nickname
            }}</span>
            <span v-if="x.type == 1">{{
              x.shop_name ? x.shop_name : x.nickname
            }}</span>
            <img
              v-if="x.type == 1 && x.shop_cover_image"
              :src="x.shop_cover_image"
            />
          </div>
          <div
            class="value"
            :class="x.type == 1 ? 'value1' : 'value2'"
            v-if="
              x.content.goods_id == undefined &&
              x.content.order_sn == undefined &&
              String(x.content).startsWith('http') == false
            "
          >
            <!-- 文本消息 -->
            <span :class="x.type == 1 ? 'content1' : 'content2'">{{
              x.content
            }}</span>
          </div>

          <div
            class="value"
            :class="x.type == 1 ? 'value1' : 'value2'"
            v-if="
              x.content.goods_id == undefined &&
              x.content.order_sn == undefined &&
              String(x.content).startsWith('http') == true
            "
          >
            <!-- 图片消息 -->
            <img :src="x.content" />
          </div>

          <div
            class="value"
            :class="x.type == 1 ? 'value1' : 'value2'"
            v-if="
              x.content.order_sn == undefined && x.content.goods_id != undefined
            "
            @click="router.push(`/comm_det?id=${x.content.goods_id}`)"
          >
            <!-- 商品消息 -->
            <img :src="x.content.cover_img" />
            <div class="good_detail">
              <span class="good_name">{{
                x.content.goods_name.length > 30
                  ? x.content.goods_name.substring(0, 30) + '...'
                  : x.content.goods_name
              }}</span>
              <span class="good_price">${{ x.content.goods_price }}</span>
            </div>
          </div>

          <div
            class="value value3"
            :class="x.type == 1 ? 'value1' : 'value2'"
            v-if="
              x.content.goods_id != undefined && x.content.order_sn != undefined
            "
          >
            <!-- 下单问询内容 -->
            <span
              v-if="x.mtype == 3 && x.content.msg_content"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              :style="{
                paddingTop: '10px',
                color: '#fe2c55',
                fontSize: '16px',
              }"
              >{{ x.content.msg_content }}</span
            >
            <div
              class="value"
              @click="router.push(`/comm_det?id=${x.content.goods_id}`)"
            >
              <!-- 商品消息 -->
              <img :src="x.content.cover_img" />
              <div class="good_detail">
                <span class="good_name">{{
                  x.content.goods_name.length > 30
                    ? x.content.goods_name.substring(0, 30) + '...'
                    : x.content.goods_name
                }}</span>
                <span class="good_price">${{ x.content.goods_price }}</span>
              </div>
            </div>

            <!-- 订单信息 -->
            <span
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              :style="{ color: '#fe2c55', fontSize: '16px' }"
              >{{
                x.mtype == 1
                  ? $t('in_08')
                  : x.mtype == 2
                  ? $t('in_09')
                  : $t('in_10')
              }}
              <span
                v-if="
                  x.mtype == 2 && x.content.price > 0 && state.is_Q == false
                "
                >${{ x.content.price }}</span
              >
            </span>
            <span
              v-if="x.content.pay_time"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              >{{ $t('in_11') }}: {{ x.content.pay_time }}</span
            >
            <span
              v-if="x.content.arrival_time"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              >{{ $t('in_12') }}: {{ x.content.arrival_time }}</span
            >
            <span
              v-if="x.content.order_sn"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              >{{ $t('in_13') }}: {{ x.content.order_sn }}</span
            >
            <span
              v-if="x.content.full_name"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              >{{ x.mtype == 1 ? '签收人' : '购买人' }}:
              {{ x.content.full_name }}</span
            >
            <span
              v-if="x.content.address"
              class="content3"
              :class="x.type == 1 ? 'content1' : 'content2'"
              >{{ $t('in_14') }}:
              {{
                x.content.country
                  ? getCountryName(x.content.country) + '-'
                  : ''
              }}{{ x.content.address }}</span
            >
          </div>

          <div class="bottom_text" v-if="x.type == 0 && x.consult_user.country">
            {{ $t('in_15') }}: {{ getCountryName(x.consult_user.country) }}
          </div>
          <div class="bottom_text" v-if="x.type == 0 && x.consult_user.ip">
            IP: {{ x.consult_user.ip }}
          </div>
          <div class="bottom_text">{{ x.create_time }}</div>
        </div>
      </div>

      <div class="fs_info">
        <a-textarea
          v-model:value="value1"
          :placeholder="$t('in_16')"
          auto-size
        />
        <div class="but">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :beforeUpload="beforeUpload"
            :show-upload-list="false"
            action="https://tka-api.zale.mobi/api/upload/uploadImg"
            @change="handleChangeUp"
          >
            <img src="../assets/img/up_img.png" />
          </a-upload>
          <div @click="replyMsg">{{ $t('in_17') }}</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
  import i18n from '@/lang'
  import { useStore } from 'vuex'
  const { state } = useStore()
  import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
  import { message } from 'ant-design-vue'
  import {
    api_getConsultMsgList,
    api_getConsultMsgDetail,
    api_replyConsultMsg,
  } from '@/requset/api'
  import { ref, onMounted, onUnmounted } from 'vue'
  import router from '@/router'

  let value1 = ref<any>('')
  let co_id = ref<any>(0)
  let order = ref<any>([])
  let messageChatList = ref<any>([])
  let modal_fk = ref<boolean>(false)

  let msgDetailInterval = <any>null
  if (co_id.value != 0) {
    msgDetailInterval = setInterval(() => {
      modal_fk.value = false
      getKF(co_id.value)
    }, 5000)
  }

  onUnmounted(() => {
    if (msgDetailInterval != null) {
      clearInterval(msgDetailInterval)
    }
  })

  const handleChangeUp = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      api_replyConsultMsg({
        co_id: co_id.value,
        content: info.file.response.data.http_url,
      }).then((res: any) => {
        if (res.success) {
          setTimeout(() => {
            message.success(i18n.global.t('in_18'))
            getKF(co_id.value)
          }, 1000)
        } else {
          message.error(res.message)
        }
      })
    }
  }
  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error(i18n.global.t('in_19') + '!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error(i18n.global.t('in_20'))
    }
    return isJpgOrPng && isLt2M
  }

  function replyMsg() {
    if (value1.value == '') {
      message.warning(i18n.global.t('in_21'))
      return
    }
    api_replyConsultMsg({ co_id: co_id.value, content: value1.value }).then(
      (res: any) => {
        if (res.success) {
          value1.value = ''
          setTimeout(() => {
            message.success(i18n.global.t('in_18'))
            getKF(co_id.value)
          }, 1000)
        } else {
          message.error(res.message)
        }
      }
    )
  }

  function getList() {
    api_getConsultMsgList({}).then((res: any) => {
      if (res.success) {
        order.value = res.data
      }
    })
  }
  getList()

  function getKF(id: number) {
    co_id.value = id
    api_getConsultMsgDetail({ co_id: id }).then((res: any) => {
      if (res.success) {
        messageChatList.value = res.data
        modal_fk.value = true
        setTimeout(() => {
          var scrollArea = document.getElementsByClassName('consult_list')
          scrollToBottom(scrollArea[0])
        }, 1000)
      }
    })
  }

  function scrollToBottom(element: any) {
    element.scrollTop = element.scrollHeight - element.offsetHeight
  }

  function getCountryName(country: any) {
    let name = ''
    Array.from(state.countryName).forEach((item: any) => {
      if (item['lang'] == country) {
        name = item['country']
      }
    })
    return name
  }
</script>
<style lang="less" scoped>
  #inquiryOrder {
    .con {
      background-color: #fff;
      border-radius: 12px;
      padding: 20px;
      .shop_l {
        // min-height: 600px;
        .list_T {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          background-color: #f6f7f9;
          padding: 8px 0;
          border-radius: 4px;
          .img_name {
            flex: 4;
            text-align: left;
            margin-left: 20px;
          }
          div {
            flex: 1.5;
            color: #484950;
          }
          .sel {
            flex: 0.7;
            color: #000;
            .anticon {
              margin-left: 3px;
              font-size: 13px;
            }
          }
          .two {
            flex: 2;
          }
          .gm {
            flex: 0.6;
          }
        }
        .list {
          background-color: #fff;
          margin-left: 15px;
          padding: 15px 0;
          border-bottom: solid 1px rgba(211, 211, 211, 0.5);
          .img_name {
            position: relative;
            margin-left: 0;
            display: flex;
            align-items: center;
            .on {
              top: 0px;
              position: absolute;
              left: 0;
            }
            .shop_i {
              border-radius: 8px;
              width: 67px;
              height: 67px;
              margin-right: 10px;
            }
            div {
              color: #4a4b51;
              flex: 1.5;
              text-align: left;
              padding-right: 8px;
              font-size: 14px;
            }
          }
          .two {
            flex: 2;
            justify-content: left;
            display: flex;
            align-items: center;
            padding-left: 3%;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 10px;
            }
            div {
              flex: none;
            }
          }

          .zt_ {
            div {
              color: #0e9bf8;
              font-size: 14px;
            }
            .yfh {
              color: #6673ff;
            }
            .yjf {
              color: #888a8e;
            }
            .dzf {
              color: #ff6100;
              ::v-deep .van-count-down {
                color: #ff6100;
                font-size: 12px;
              }
            }
          }
          .gm {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 140px;
            .pay {
              color: #fff;
              border-radius: 4px;
              padding: 6px;
              background-color: #0ae2db;
              margin-bottom: 5px;
            }
            div {
              font-size: 14px;
            }
          }
          .sel {
            div {
              font-size: 14px;
              padding: 10px 15px;
              background-color: #0ae2db;
              border-radius: 4px;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .modal_wit {
    .kf {
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      // .kf_bac {
      //   background-color: #eaf5f5;
      //   border-radius: 8px;
      //   padding: 15px;
      //   height: 500px;
      //   .lef {
      //     display: flex;
      //     align-items: flex-start;
      //     margin-bottom: 15px;
      //     .tx {
      //       border-radius: 8px;
      //       width: 50px;
      //       height: 50px;
      //     }
      //     div {
      //       background-color: #fff;
      //       border-radius: 0 8px 8px 8px;
      //       font-size: 16px;
      //       position: relative;
      //       top: 10px;
      //       padding: 8px 10px;
      //     }
      //   }
      //   .rig {
      //     display: flex;
      //     flex-direction: column;
      //     align-items: flex-end;
      //     margin-bottom: 15px;
      //     .name {
      //       font-size: 15px;
      //       margin-bottom: 4px;
      //     }
      //     .con {
      //       background-color: #fff;
      //       border-radius: 0 8px 8px 8px;
      //       font-size: 16px;
      //       padding: 8px 10px;
      //     }
      //   }
      // }

      .consult_list {
        // display: flex;
        // flex-direction: column;
        // flex: 1;
        // padding: 15px;
        overflow-y: auto;
        height: 45vh;

        background-color: #eaf5f5;
        border-radius: 4px;
        padding: 15px;
        // height: 500px;

        .item {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;

          .name {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 5px;
            img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
            }

            span {
              font-size: 14px;
              color: #323232;
              font-weight: bold;
              margin-right: 5px;
              margin-left: 5px;
            }
          }

          .text {
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .value {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 5px;

            .content1 {
              font-size: 15px;
              color: white;
            }

            .content2 {
              font-size: 15px;
              color: #333333;
            }
            .content3 {
              padding: 2px;
              font-size: 12px;
            }

            img {
              width: 100px;
              height: 100px;
              border-radius: 5px;
            }

            .good_detail {
              display: flex;
              flex-direction: column;
              margin-left: 10px;

              .good_name {
                font-size: 14px;
                color: #333333;
              }
              .good_price {
                font-size: 14px;
                color: #fe2c55;
                padding-top: 10px;
              }
            }
          }

          .value1 {
            background-color: #0ae2db;
            border-radius: 5px;
            padding-left: 15px;
            justify-content: flex-end;
          }
          .value2 {
            background-color: white;
            border-radius: 5px;
            padding-right: 15px;
            justify-content: flex-start;
          }
          .value3 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
          }
          .bottom_text {
            font-size: 12px;
            color: #0b2959;
            margin-bottom: 5px;
          }
        }

        .item1 {
          margin-left: 30%;
          align-items: flex-end;
        }
        .item2 {
          margin-right: 30%;
          align-items: flex-start;
        }
      }

      .fs_info {
        padding-top: 20px;
        display: flex;
        align-items: center;
        .ant-input {
          min-height: 60px;
        }
        .but {
          display: flex;
          align-items: center;
          .ant-upload-wrapper {
            margin: 0 15px 0 30px;
          }
          ::v-deep .ant-upload {
            width: 40px !important;
            height: 40px !important;
            border-radius: 4px;
            border: none;
            height: 156px;
          }
          ::v-deep .ant-upload-wrapper {
            width: 40px !important;
          }
          img {
            width: 40px;
          }
          div {
            width: 100px;
            height: 40px;
            line-height: 40px;
            background-color: #0ae2db;
            border-radius: 4px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
</style>
