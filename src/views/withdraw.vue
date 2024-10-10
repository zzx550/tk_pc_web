<template>
  <div id="withdraw" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="box_le">
          <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
            {{ $t("_tx_01") }}
          </div>
          <div class="line">></div>
          <div style="font-weight: 600">{{ $t("_tx_02") }}</div>
        </div>
        <div class="jl" @click="withdrawRecordOpen = true">
          {{ $t("_tx_03") }}
        </div>
      </div>
      <div class="conte">
        <div class="blu">
          {{ $t("_tx_04") }}：${{ getFloat(wallet.cloud_balance) }}
        </div>
        <div style="width: 650px; margin: 0 auto">
          <div class="line" style="margin-bottom: 35px">
            {{ $t("_tx_05") }}：<input
              type="text"
              @input="restrictInput"
              maxlength="10"
              v-model="inputAmount"
              :placeholder="$t('_tx_06')"
            />
          </div>
          <div class="line_tip" v-if="feeRate > 0">
            *{{ $t("_tx_07") }}：{{ feeRate * 100 }}%&nbsp;&nbsp;&nbsp;&nbsp;{{
              $t("_tx_08")
            }}：
            <span style="color: #0ae2db"
              >${{ getFloat(actualReceiptMoney) }}</span
            >
          </div>
          <div class="line" style="margin-bottom: 45px">
            {{ $t("_tx_09") }}：
            <a-select
              ref="select"
              v-model:value="selectPaymentType"
              @focus="focus"
              @change="handleChangePaymentType"
            >
              <a-select-option v-for="item in wayList" :value="item.value">{{
                item.text
              }}</a-select-option>
            </a-select>
            <div class="check cur_p" @click="showWithdrawReceiptWay = true">
              {{ $t("_tx_10") }}
            </div>
          </div>
          <div class="line" v-if="selectPaymentType == 'BANK'">
            {{ $t("_tx_11") }}：<input
              type="text"
              v-model="inputName"
              :placeholder="$t('_tx_12')"
            />
          </div>
          <div class="line" v-if="selectPaymentType == 'BANK'">
            {{ $t("_tx_13") }}：<input
              type="text"
              v-model="inputBankName"
              :placeholder="$t('_tx_14')"
            />
          </div>
          <div class="line" v-if="selectPaymentType == 'BANK'">
            {{ $t("_tx_15") }}：<input
              type="text"
              v-model="inputBankNumber"
              :placeholder="$t('_tx_16')"
            />
          </div>
          <div class="line" v-if="selectPaymentType != 'BANK'">
            {{ $t("_tx_17") }}：<input
              type="text"
              v-model="inputAddress"
              :placeholder="$t('_tx_18')"
            />
          </div>
          <div class="line" style="margin-bottom: 35px">
            {{ $t("_tx_19") }}：<input
              type="password"
              v-model="inputPassword"
              :placeholder="$t('_tx_20')"
            />
          </div>
          <div class="line_tip" style="margin-bottom: 20px">
            *{{ $t("_tx_23") }}：
          </div>
          <div class="but pr_con" @click="goWithdraw">{{ $t("_tx_26") }}</div>
        </div>
      </div>
    </div>
  </div>

  <OpenTip
    :openSetPassword="setPasswordOpen"
    @changePassword="changePassword"
    :isWithdraw="true"
  />

  <a-modal
    class="modal_wit"
    v-model:open="showWithdrawReceiptWay"
    centered
    :footer="null"
    width="488px"
    @ok="showWithdrawReceiptWay = false"
  >
    <div class="title">{{ $t("_tx_10") }}</div>
    <div class="box">
      <div
        class="list"
        v-for="(x, index) in withdrawReceiptWayList"
        :key="x"
        @click="selectWithdrawReceiptWayIndex = index"
        :class="selectWithdrawReceiptWayIndex == index ? 'check' : ''"
      >
        <div style="font-weight: 600">
          {{
            x.pay_type != "BANK" ? `${x.pay_type} Address` : x.bank_card_user
          }}&nbsp;&nbsp;&nbsp;&nbsp;{{
            x.pay_type != "BANK" ? "" : x.bank_name
          }}
        </div>
        <div style="color: #4a4b51">
          {{ x.pay_type != "BANK" ? x.address : x.bank_card_no }}
        </div>
      </div>
    </div>
    <div class="but pr_con" @click="onConfirmSelectReceiptWay">
      {{ $t("_tx_27") }}
    </div>
  </a-modal>

  <!-- <a-modal
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
  </a-modal> -->

  <a-drawer
    v-model:open="withdrawRecordOpen"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <div
        :class="withdrawRecordTab == 0 ? 'check_t' : ''"
        @click="handleWithdrawRecordTab(0)"
      >
        {{ $t("_tx_28") }}
      </div>
      <div
        :class="withdrawRecordTab == 1 ? 'check_t' : ''"
        @click="handleWithdrawRecordTab(1)"
      >
        {{ $t("_tx_29") }}
      </div>
      <div
        :class="withdrawRecordTab == 2 ? 'check_t' : ''"
        @click="handleWithdrawRecordTab(2)"
      >
        {{ $t("_tx_30") }}
      </div>
      <div
        :class="withdrawRecordTab == 3 ? 'check_t' : ''"
        @click="handleWithdrawRecordTab(3)"
      >
        {{ $t("_tx_31") }}
      </div>
      <img
        class="close"
        @click="withdrawRecordOpen = false"
        src="../assets/img/close.png"
      />
    </div>
    <van-list
      v-model="recordLoading"
      :finished="recordFinished"
      :finished-text="$t('_no_more_txt')"
      :immediate-check="false"
      :loading-text="$t('_load_txt')"
      @load="onRecordLoad"
    >
      <div class="list" v-for="x in withdrawRecordList" :key="x">
        <div class="price">
          {{ x.order_sn }}
          <div>-${{ getFloat(x.total_amount) }}</div>
        </div>
        <div class="kh" v-if="x.pay_type == 'BANK'">
          {{ $t("_tx_11") }}：{{ getBankAddressInfo(x).bank_card_user }}
        </div>
        <div class="kh" v-if="x.pay_type == 'BANK'">
          {{ $t("_tx_13") }}：{{ getBankAddressInfo(x).bank_name }}
        </div>
        <div class="kh" v-if="x.pay_type == 'BANK'">
          {{ $t("_tx_15") }}：{{ getBankAddressInfo(x).bank_card_no }}
        </div>
        <div class="kh" v-if="x.pay_type != 'BANK'">
          {{ $t("_tx_17") }}：{{ x.address }}
        </div>
        <div class="kh" v-if="x.fee && Number(x.fee) > 0">
          {{ $t("_tx_07") }}：${{ getFloat(x.fee) }}
        </div>
        <div class="kh" v-if="x.fee && Number(x.fee) > 0">
          {{ $t("_tx_08") }}：${{ getFloat(x.real_amount) }}
        </div>
        <div class="kh">
          {{ x.create_time }}
          <div
            :class="
              x.order_status == 0
                ? 'col_1'
                : x.order_status == 1
                ? 'col_2'
                : x.order_status == 2
                ? ''
                : x.order_status == 3
                ? 'col_1'
                : x.order_status == 4
                ? 'col_1'
                : ''
            "
          >
            {{
              x.order_status == 0
                ? $t("_tx_32")
                : x.order_status == 1
                ? $t("_tx_33")
                : x.order_status == 2
                ? `${$t("_tx_31")}：${x.user_remark ? x.user_remark : ""}`
                : x.order_status == 3
                ? $t("_tx_34")
                : x.order_status == 4
                ? $t("_tx_35")
                : $t("_tx_36")
            }}
          </div>
        </div>
      </div>
    </van-list>
  </a-drawer>
</template>
<script setup lang="ts">
import router from "@/router";
import { ref, watch } from "vue";
import { message } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import {
  api_getInfo,
  api_wallet,
  api_withdraw,
  api_tradeWay,
  api_getOption,
  api_getUserBindBankInfo,
  api_setPwd,
  api_withdraw_list,
} from "@/requset/api";
import { getFloat } from "@/utils";
import i18n from "@/lang";

// const modal = ref<boolean>(false);
// const modal_sm = ref<boolean>(false);
// const modal_rz = ref<boolean>(false);
// const imageUrl = ref<string>("");

const selectPaymentType = ref<string>("");
const inputAmount = ref<string>("");
const inputName = ref("");
const inputBankName = ref<string>("");
const inputBankNumber = ref<string>("");
const inputAddress = ref<string>("");
const inputPassword = ref<string>("");

const withdrawRecordOpen = ref<boolean>(false);
const setPasswordOpen = ref<boolean>(false);
const wayList = ref<any>([]);
const userInfo = ref<any>({});
const wallet = ref<any>({});
const feeRate = ref<number>(0);
const actualReceiptMoney = ref<number>(0);
const showWithdrawReceiptWay = ref<boolean>(false);
const withdrawReceiptWayList = ref<any>([]);
const selectWithdrawReceiptWayIndex = ref<number>(-1);

let recordPage = ref<number>(1);
let recordLoading = ref<boolean>(false);
let recordFinished = ref<boolean>(false);
let recordFlag = ref<boolean>(false);
const withdrawRecordList = ref<any>([]);
const withdrawRecordTab = ref<number>(0);

const getUserInfo = () => {
  api_getInfo({}).then((res: any) => {
    if (res.success) {
      userInfo.value = { ...userInfo.value, ...res.data };
    }
  });
};
getUserInfo();

api_wallet({}).then((res: any) => {
  wallet.value = res.data;
});

api_tradeWay({}).then((res: any) => {
  wayList.value = [];
  if (res.data) {
    Array.from(res.data).forEach((element: any) => {
      let data = {
        text: element.name,
        value: element.name,
      };
      wayList.value.push(data);
      if (element.name == "BANK") {
        selectPaymentType.value = element.name;
      }
    });
  }
});

api_getOption({}).then((res: any) => {
  feeRate.value = res.data.withdraw_fee_rate
    ? Number(res.data.withdraw_fee_rate)
    : 0;
});

const changePassword = (change: boolean, pwd: string, repeat_pwd: string) => {
  if (change == true) {
    if (pwd == "" || pwd.length < 6) {
      message.error(i18n.global.t("_tx_20"));
      return;
    }
    if (repeat_pwd == "" || repeat_pwd.length < 6) {
      message.error(i18n.global.t("_tx_21"));
      return;
    }
    if (pwd != repeat_pwd) {
      message.error(i18n.global.t("_tx_22"));
      return;
    }

    message.loading(i18n.global.t("_load_txt"));
    api_setPwd({ password: repeat_pwd }).then((res: any) => {
      if (res.code == 200) {
        setPasswordOpen.value = false;
        message.success(i18n.global.t("_tx_37"));
        getUserInfo();
      } else if (res.message) {
        message.error(res.message);
      }
    });
  } else {
    setPasswordOpen.value = false;
  }
};

const getUserBindBankInfo = (type: string) => {
  withdrawReceiptWayList.value = [];
  api_getUserBindBankInfo({ payment_type: type }).then((res: any) => {
    if (res.code == 200) {
      withdrawReceiptWayList.value = res.data;
    }
  });
};

const restrictInput = () => {
  inputAmount.value = inputAmount.value.replace(/\D/g, "");
};

watch(inputAmount, (newValue: string) => {
  if (newValue) {
    actualReceiptMoney.value =
      Number(newValue) - Number(newValue) * feeRate.value;
  } else {
    actualReceiptMoney.value = 0;
  }
});

watch(selectPaymentType, (newValue: string) => {
  if (newValue) {
    getUserBindBankInfo(newValue);
  }
});

const onConfirmSelectReceiptWay = () => {
  showWithdrawReceiptWay.value = false;
  let index = selectWithdrawReceiptWayIndex.value;
  console.log("index = ", index);
  if (index == -1) return;
  let item = withdrawReceiptWayList.value[index];
  console.log("item = ", item);
  if (item.pay_type != "BANK") {
    inputAddress.value = item.address;
  } else {
    inputName.value = item.bank_card_user;
    inputBankName.value = item.bank_name;
    inputBankNumber.value = item.bank_card_no;
  }
};

const focus = () => {
  console.log("focus");
};

const handleChangePaymentType = (value: string) => {
  console.log(`selected ${value}`);
  selectPaymentType.value = value;
  selectWithdrawReceiptWayIndex.value = -1;
  inputAddress.value = "";
  inputName.value = "";
  inputBankName.value = "";
  inputBankNumber.value = "";
  inputPassword.value = "";
};

const goWithdraw = () => {
  // 是否设置了安全密码
  if (userInfo.value.payword == null || userInfo.value.payword == "") {
    setPasswordOpen.value = true;
  } else {
    if (inputAmount.value == "") {
      message.error(i18n.global.t("_tx_06"));
      return;
    }

    if (Number(inputAmount.value) - Number(wallet.value.cloud_balance) > 0) {
      message.error(i18n.global.t("_tx_25"));
      return;
    }

    if (selectPaymentType.value != "BANK") {
      if (inputAddress.value == "") {
        message.error(i18n.global.t("_tx_18"));
        return;
      }
    } else {
      if (inputName.value == "") {
        message.error(i18n.global.t("_tx_12"));
        return;
      }
      if (inputBankName.value == "") {
        message.error(i18n.global.t("_tx_14"));
        return;
      }
      if (inputBankNumber.value == "") {
        message.error(i18n.global.t("_tx_16"));
        return;
      }
    }

    if (inputPassword.value == "" || inputPassword.value.length < 6) {
      message.error(i18n.global.t("_tx_20"));
      return;
    }

    message.loading(i18n.global.t("_load_txt"));
    let data =
      selectPaymentType.value != "BANK"
        ? {
            payment_type: selectPaymentType.value,
            price: inputAmount.value,
            payword: inputPassword.value,
            address: inputAddress.value,
          }
        : {
            payment_type: selectPaymentType.value,
            full_name: inputName.value,
            bank: inputBankName.value,
            account: inputBankNumber.value,
            price: inputAmount.value,
            payword: inputPassword.value,
          };
    api_withdraw({ ...data }).then((res: any) => {
      if (res.code == 200) {
        message.success(i18n.global.t("_tx_38"));
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else if (res.code == 201) {
        message.error(i18n.global.t("_tx_39"));
      } else if (res.code == 204) {
        message.error(i18n.global.t("_tx_40"));
      } else if (res.code == 205) {
        message.error(i18n.global.t("_tx_41"));
      } else if (res.code == 207) {
        message.error(i18n.global.t("_tx_42"));
      } else if (res.code == 208) {
        message.error(i18n.global.t("_tx_43"));
      } else if (res.code == 209) {
        message.error(i18n.global.t("_tx_44"));
      } else if (res.code == 400) {
        message.error(i18n.global.t("_tx_45"));
      } else if (res.message) {
        message.error(res.message);
      }
    });
  }
};

function getWithdrawRecordList() {
  recordFlag.value = true;
  let order_status = "";
  if (withdrawRecordTab.value == 0) {
    order_status = "";
  } else if (withdrawRecordTab.value == 1) {
    order_status = "0";
  } else if (withdrawRecordTab.value == 2) {
    order_status = "1";
  } else if (withdrawRecordTab.value == 3) {
    order_status = "2";
  }
  api_withdraw_list({
    order_status,
    page: recordPage.value,
    pageSize: 20,
  }).then((res: any) => {
    if (res.success) {
      if (recordPage.value >= res.data.last_page) {
        recordFinished.value = true;
      }
      withdrawRecordList.value.push(...res.data.data);
      recordFlag.value = false;
      recordLoading.value = false;
      if (res.data.data.length == 0) {
        recordFinished.value = false;
      }
    }
  });
}
getWithdrawRecordList();

function onRecordLoad() {
  if (recordFlag.value) return;
  recordPage.value = recordPage.value + 1;
  getWithdrawRecordList();
}

const resetRecord = () => {
  recordPage.value = 1;
  withdrawRecordList.value = [];
  recordFinished.value = false;
};

const handleWithdrawRecordTab = (index: number) => {
  withdrawRecordTab.value = index;
  resetRecord();
  getWithdrawRecordList();
};

const getBankAddressInfo = (x: any) => {
  return x.address ? JSON.parse(x.address) : "";
  // return (
  //   (jsonInfo.bank_card_user ? jsonInfo.bank_card_user + "-" : "") +
  //   (jsonInfo.bank_name ? jsonInfo.bank_name + "-" : "") +
  //   jsonInfo.bank_card_no
  // );
};

// const handleChangeUp = (info: UploadChangeParam) => {
//   if (info.file.status === "done") {
//     message.success("上传成功");
//     console.log("==>> ", info.file.response.data.http_url);
//     imageUrl.value = info.file.response.data.http_url;
//   }
// };
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
      padding: 50px 0;
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
      .but {
        background-color: #0ae2db;
        width: 180px;
        border-radius: 4px;
        color: #fff;
        padding: 12px;
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
        content: "";
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
      margin-bottom: 6px;
      font-size: 14px;
      margin-right: 10px;
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
