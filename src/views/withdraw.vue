<template>
  <div id="withdraw" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="box_le">
          <div class="breadcrumb" @click="router.push('/user_shop')">
            商铺中心
          </div>
          <div class="line">></div>
          <div style="font-weight: 600">余额提现</div>
        </div>
        <div class="jl" @click="open = true">提现记录</div>
      </div>
      <div class="conte">
        <div class="blu">当前余额:$34258.00</div>
        <div style="width: 650px; margin: 0 auto">
          <div class="line" style="margin-bottom: 35px">
            提现金额:<input type="text" :placeholder="'请输入提现金额'" />
          </div>
          <div class="line_tip">
            *手续费：2%&nbsp;&nbsp;&nbsp;&nbsp;实际到账：
            <span style="color: #0ae2db">9925.00</span>
          </div>
          <div class="line" style="margin-bottom: 45px">
            提现方式:
            <a-select
              ref="select"
              v-model:value="value1"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="银行卡">银行卡</a-select-option>
              <a-select-option value="USDT">USDT</a-select-option>
            </a-select>
            <div class="check cur_p" @click="modal = true">
              选择已有提现方式
            </div>
          </div>
          <div class="line">
            姓名:<input type="text" :placeholder="'请输入姓名'" />
          </div>
          <div class="line">
            卡类型:<input type="text" :placeholder="'请输入卡类型'" />
          </div>
          <div class="line">
            卡号:<input type="text" :placeholder="'请输入卡号'" />
          </div>
          <div class="line">
            地址:<input type="text" :placeholder="'请输入地址'" />
          </div>
          <div class="line">
            提现密码:<input type="text" :placeholder="'请输入提现密码'" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    class="modal_wit"
    v-model:open="modal"
    centered
    :footer="null"
    width="488px"
    @ok="modal = false"
  >
    <div class="title">选择已有收款方式</div>
    <div class="box">
      <div class="list" :class="x == 1 ? 'check' : ''" v-for="x in 6" :key="x">
        <div style="font-weight: 600">银行卡&nbsp;&nbsp;&nbsp;&nbsp;卡类型</div>
        <div style="color: #4a4b51">365821558991</div>
      </div>
    </div>
    <div class="but pr_con">确认</div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="modal_sm"
    centered
    :footer="null"
    width="488px"
    @ok="modal_sm = false"
  >
    <div class="title">实名认证</div>
    <img class="pr_con" width="150px" src="../assets/img/sm_icon.png" />
    <div class="txt">为保证您的账户安全，需先完成实名认证才可进行提现</div>
    <div class="but pr_con" @click="modal_rz = true">前往验证</div>
  </a-modal>

  <a-modal
    class="modal_sm modal_wit"
    v-model:open="modal_rz"
    centered
    :footer="null"
    width="630px"
    @ok="modal_rz = false"
  >
    <div class="title">实名认证</div>
    <div class="box">
      <div class="line">
        邮箱:<input type="text" :placeholder="'请输入邮箱'" />
      </div>
      <div class="line">
        邮箱验证码:<input type="text" :placeholder="'请输入邮箱验证码'" />
        <div class="yzm cur_p">获取验证码</div>
      </div>
      <div class="line">
        姓名:<input type="text" :placeholder="'请输入姓名'" />
      </div>
      <div class="line">
        身份证/护照号码:<input
          type="text"
          :placeholder="'请输入身份证/护照号码'"
        />
      </div>
      <div class="line">
        邀请码:<input type="text" :placeholder="'请输入邀请码'" />
      </div>
      <div class="line">
        证件上传:
        <a-upload
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://tkg-api.zale.mobi/api/upload/uploadImg"
          @change="handleChangeUp"
        >
          <img v-if="imageUrl" :src="imageUrl" />
          <div v-else class="sc_icon">
            <img class="icon" src="../assets/img/xj_icon.png" />
            图片上传
          </div>
        </a-upload>
      </div>
    </div>
    <div class="but pr_con" @click="modal_rz = true">提交</div>
  </a-modal>

  <a-drawer
    v-model:open="open"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <div class="check_t">全部</div>
      <div>未审核</div>
      <div>已审核</div>
      <div>提现失败</div>
      <img
        class="close"
        @click="open = false"
        src="../assets/img/close.png"
        alt=""
      />
    </div>
    <div class="list" v-for="x in 3" :key="x">
      <div class="price">
        银行卡
        <div>-$68.00</div>
      </div>
      <div class="kh" v-if="x == 1">卡号：6585498</div>
      <div class="kh" v-else>地址：6585498</div>
      <div class="kh">
        2021-01-25
        <div class="col_2" v-if="x == 1">未审核</div>
        <div class="col_1" v-else-if="x == 2">已审核</div>
        <div v-else>提现失败：星系有误</div>
      </div>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
  import router from '@/router'
  import { ref } from 'vue'
  import { message } from 'ant-design-vue'
  import type { UploadChangeParam } from 'ant-design-vue'

  const value1 = ref('请选择提现方式')
  const modal = ref<boolean>(false)
  const modal_sm = ref<boolean>(false)
  const modal_rz = ref<boolean>(false)
  const open = ref<boolean>(false)
  const imageUrl = ref<string>('')

  const showDrawer = () => {
    open.value = true
  }

  const handleChangeUp = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      message.success('上传成功')
      console.log('==>> ', info.file.response.data.http_url)
      imageUrl.value = info.file.response.data.http_url
    }
  }

  const focus = () => {
    console.log('focus')
  }

  const handleChange = (value: string) => {
    console.log('value :>> ', value)
    console.log(`selected ${value}`)
  }
</script>
<style lang="less" scoped>
  #withdraw {
    .con_box {
      background-color: #fff;
      border-radius: 12px;
      .title_l {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .box_le {
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
        .jl {
          color: #0ae2db;
          font-size: 16px;
          margin-right: 20px;
        }
      }

      .conte {
        padding-top: 80px;
        text-align: center;
        .blu {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 30px;
        }
        .line {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: right;
          margin-bottom: 25px;
          .check {
            position: absolute;
            right: 489px;
            bottom: -25px;
            transform: translateX(103%);
            color: #0ae2db;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          input,
          .ant-select {
            background-color: #f6f7f9 !important;
            height: 42px !important;
            width: 489px !important;
            border-radius: 4px !important;
            margin-left: 20px !important;
          }
          ::v-deep .ant-select-selector {
            border: none !important;
            background-color: #f6f7f9 !important;
            height: 42px !important;
            width: 489px !important;
          }
          ::v-deep .ant-select-selection-item {
            line-height: 42px;
          }
        }
        .line_tip {
          font-size: 14px;
          text-align: right;
          position: relative;
          top: -30px;
          color: #8d8e91;
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
      padding: 30px 80px;
      text-align: center;
    }
    .box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 30px;
      .list {
        width: 211px;
        height: 88px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #e3e4e4;
      }
      .check {
        background-color: #e7fdfc;
        border-color: #0ae2db;
      }
    }
    .but {
      background-color: #0ae2db;
      padding: 10px 0;
      color: #fff;
      border-radius: 4px;
      width: 140px;
      text-align: center;
      font-size: 14px;
    }
  }
  .modal_sm {
    .box {
      padding: 15px 40px;
      .line {
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: right;
        margin-bottom: 25px;
        font-weight: 600;
        .yzm {
          position: absolute;
          right: 10px;
          color: #0ae2db;
        }
        input {
          background-color: #f6f7f9;
          height: 42px;
          width: 330px;
          border-radius: 4px;
          margin-left: 25px;
        }
        ::v-deep .ant-upload {
          width: 330px !important;
          background-color: #f6f7f9;
          height: 42px;
          width: 330px;
          border-radius: 4px;
          border: none;
          height: 156px;
        }
        ::v-deep .ant-upload-wrapper {
          margin-left: 25px;
          width: 330px !important;
        }
        img {
          height: 42px;
          width: 330px;
          border-radius: 4px;
        }
        .sc_icon {
          display: flex;
          align-items: center;
          color: #afafaf;
          img {
            margin-right: 5px;
            width: 20px;
            height: auto;
          }
        }
      }
    }
    .but {
      width: 300px;
    }
  }
  .custom-class {
    .check {
      display: flex;
      padding-bottom: 12px;
      border-bottom: 1px solid #cfcfcf;
      div {
        padding: 0 10px;
        color: #9e9ea1;
      }
      .check_t {
        font-weight: 600;
        position: relative;
        color: #000;
        &:after {
          position: absolute;
          left: 50%;
          bottom: -4px;
          content: '';
          transform: translateX(-50%);
          background-color: #1d1e25;
          height: 2px;
          width: 60%;
        }
      }
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 16px;
      }
    }
    .list {
      padding: 10px 0;
      border-bottom: 1px solid #f1f1f1;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        margin-bottom: 6px;
        font-size: 16px;
        div {
          font-weight: 700;
          font-size: 20px;
        }
      }
      .kh {
        margin-bottom: 6px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #8d8e91;
        div {
          font-size: 14px;
          color: #ff6100;
        }
        .col_2 {
          color: #16b1ac;
        }
        .col_1 {
          color: #8d8e91;
        }
      }
    }
  }
</style>
