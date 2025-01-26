<template>
  <div id="order" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          {{ $t("to_03") }}
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">{{ $t("or_01") }}</div>
        <a-button
          class="payAll"
          @click="open = true"
          type="primary"
          v-if="price > 0"
          >{{ $t("_or_05") }}</a-button
        >
        <div class="seek">
          <input type="text" v-model="seekValue" :placeholder="$t('or_02')" />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div :class="tabIndex == 0 ? 'check' : ''" @click="changeTab(0)">
            {{ $t("or_03") }}
          </div>
          <div :class="tabIndex == 1 ? 'check' : ''" @click="changeTab(1)">
            {{ $t("or_04") }}
          </div>
          <div :class="tabIndex == 2 ? 'check' : ''" @click="changeTab(2)">
            {{ $t("or_05") }}
          </div>
          <div :class="tabIndex == 3 ? 'check' : ''" @click="changeTab(3)">
            {{ $t("or_06") }}
          </div>
          <div :class="tabIndex == 5 ? 'check' : ''" @click="changeTab(5)">
            {{ $t("_or_02") }}
          </div>
          <div :class="tabIndex == 4 ? 'check' : ''" @click="changeTab(4)">
            {{ $t("or_07") }}
          </div>
          <div :class="tabIndex == 6 ? 'check' : ''" @click="changeTab(6)">
            {{ $t("_or_04") }}
          </div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div style="flex: 2">{{ $t("or_08") }}</div>
              <div class="img_name">{{ $t("or_09") }}</div>
              <div class="xx">{{ $t("in_03") }}</div>
              <div>{{ $t("or_10") }}($)</div>
              <div>{{ $t("or_11") }}($)</div>
              <div>{{ $t("or_12") }}</div>
              <div class="gm">{{ $t("or_13") }}</div>
            </div>
            <div class="list list_T" v-for="x in orderList" :key="x">
              <div class="on" style="flex: 2">{{ x.order_sn }}</div>
              <div class="img_name">
                <div
                  class="goods_info"
                  v-for="item in x.goods_info"
                  :key="item.goods_id"
                >
                  <img class="shop_i" :src="item.cover_img" />
                  <div class="txt_3">{{ item.goods_name }}</div>
                  <div>x{{ item.goods_num }}</div>
                </div>
              </div>
              <div
                class="xx"
                v-if="
                  x.address_info &&
                  x.address_info.address &&
                  x.address_info.address != undefined
                "
              >
                {{ x.address_info.real_name }}<br />
                {{ x.address_info.phone }}<br />
                {{ x.address_info.address }}
              </div>
              <div>{{ x.total_profit }}</div>
              <div>{{ x.total_price }}</div>
              <div class="zt">
                <!-- 0 待付款 1 准备发货 2 运输中 3 已到达 4 待结算 5 已结算  6 已取消 7-退货中 8-已退货 -->
                <div class="dzf" v-if="x.order_status == 0">
                  {{ $t("or_04") }}
                  <!-- <van-count-down :time="300000" format="mm:ss" /> -->
                </div>
                <div v-else-if="x.order_status == 1">{{ $t("or_14") }}</div>
                <div class="yfh" v-else-if="x.order_status == 2">
                  {{ $t("or_06") }}
                </div>
                <div class="yfh" v-else-if="x.order_status == 4">
                  {{ $t("_or_02") }}
                </div>
                <div class="yfh" v-else-if="x.order_status == 3">
                  {{ $t("_or_03") }}
                </div>
                <div class="yfh" v-else-if="x.order_status == 5">
                  {{ $t("_or_04") }}
                </div>
                <div v-else-if="x.order_status == 6">{{ $t("or_15") }}</div>
                <div v-else-if="x.order_status == 7">{{ $t("or_16") }}</div>
                <div v-else-if="x.order_status == 8">{{ $t("or_17") }}</div>
                <div class="yjf" v-else>{{ $t("or_07") }}</div>
              </div>
              <div
                class="gm cur_p"
                @click="router.push(`/order_det?id=${x.order_id}`)"
              >
                {{ $t("or_18") }}
              </div>
            </div>
            <div class="no_data" v-if="orderList.length < 1">
              <img style="width: 20%" src="../assets/img/no_data.png" />
              <div>{{ $t("or_19") }}</div>
            </div>
          </div>
          <div class="bot_fy">
            <a-pagination
              v-model:current="current"
              :total="total"
              show-less-items
              :hideOnSinglePage="true"
              :showSizeChanger="false"
              @change="changeList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    class="modal_wit"
    v-model:open="open"
    centered
    :footer="null"
    width="471px"
  >
    <div class="title">{{ $t("or_30") }}</div>
    <!-- <div class="dz">
      <img src="../assets/img/dz.png" />
      <div class="adds">
        {{ order.address_info.address }}
        <div>{{ order.address_info.phone }} {{ order.address_info.phone }}</div>
      </div>
    </div> -->
    <div class="li">
      {{ $t("or_31") }}
      <div>${{ getFloat(balance) }}</div>
    </div>
    <div class="li">
      {{ $t("or_32") }}
      <div><img src="../assets/logo.png" />{{ $t("or_33") }}</div>
    </div>
    <div class="li">
      <input type="password" v-model="payPassword" :placeholder="$t('or_34')" />
    </div>
    <div class="hj">
      <div class="price">
        {{ $t("or_35") }}：
        <p>
          ${{ getFloat(price)
          }}{{
            unitData != null && unitRate != 0
              ? ` ≈  ${getFloat(price * unitRate)}${unitData}`
              : ""
          }}
        </p>
      </div>
      <div class="but" @click="handlePay">{{ $t("or_36") }}</div>
    </div>
  </a-modal>
  <OpenTip
    :openSetPassword="setPasswordOpen"
    @changePassword="changePassword"
    :isWithdraw="false"
  />
</template>
<script setup lang="ts">
import i18n from "@/lang";
import {
  api_orderList,
  api_payAll,
  api_wallet,
  api_optionDesc,
  api_getInfo,
  api_setPwd,
  api_getAllNotPayOrder,
} from "@/requset/api";
import { DownOutlined } from "@ant-design/icons-vue";
import router from "@/router";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getFloat } from "@/utils";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
const { state } = useStore();

const balance = ref<number>(0);
const open = ref<boolean>(false);
const price = ref<number>(0);
const payPassword = ref<string>("");
const route = useRoute();
const current = ref(1);
const seekValue = ref<string>("");
const tabIndex = ref<number>(0);
const orderList = ref<any>([]);
const total = ref(0);
const unitData = ref<string>("");
const unitRate = ref<number>(0);

const changeTab = (index: number) => {
  console.log("index = ", index);
  tabIndex.value = index;
  get();
};

function getBalance() {
  api_wallet({}).then((res: any) => {
    if (res.success) {
      balance.value = res.data.cloud_balance
        ? Number(res.data.cloud_balance)
        : 0;
    }
  });

  api_optionDesc({ name: "exchange_rate" }).then((res: any) => {
    if (res.success) {
      unitRate.value = res.data;
      Array.from(state.currencyUnit).forEach((item: any) => {
        if (
          item["lang"] != "en" &&
          item["lang"] == sessionStorage.getItem("lang")
        ) {
          unitData.value = item["unit"];
        }
      });
    }
  });
}
getBalance();

const changePassword = (change: boolean, pwd: string, repeat_pwd: string) => {
  if (change == true) {
    if (pwd == "" || pwd.length < 6) {
      message.error(i18n.global.t("or_46"));
      return;
    }
    if (repeat_pwd == "" || repeat_pwd.length < 6) {
      message.error(i18n.global.t("or_47"));
      return;
    }
    if (pwd != repeat_pwd) {
      message.error(i18n.global.t("or_48"));
      return;
    }
    message.loading(i18n.global.t("or_49"));
    api_setPwd({ password: repeat_pwd }).then((res: any) => {
      if (res.code == 200) {
        setPasswordOpen.value = false;
        message.success(i18n.global.t("or_50"));
        getUserInfo();
      } else if (res.message) {
        message.error(res.message);
      }
    });
  } else {
    setPasswordOpen.value = false;
  }
};

const changeList = (page: number, pageSize: number) => {
  current.value = page;
  get();
};

const userInfo = ref<any>({});
const setPasswordOpen = ref<boolean>(false);
const getUserInfo = () => {
  api_getInfo({}).then((res: any) => {
    if (res.success) {
      userInfo.value = { ...userInfo.value, ...res.data };
    }
  });
};
getUserInfo();

function handlePay() {
  // 是否设置了安全密码
  if (userInfo.value.payword == null || userInfo.value.payword == "") {
    setPasswordOpen.value = true;
    return;
  }
  if (payPassword.value == "" || payPassword.value.length < 6) {
    message.error(i18n.global.t("or_52"));
    return;
  }
  // 全部支付
  api_payAll({ pwd: payPassword.value }).then((res: any) => {
    if (res.success) {
      open.value = false;
      message.success(i18n.global.t("or_53"));
      setTimeout(() => {
        get();
        getBalance();
      }, 1500);
    } else if (res.code == 201) {
      message.error(i18n.global.t("or_54"));
    } else if (res.code == 202) {
      message.error(i18n.global.t("or_55"));
    } else if (res.code == 203) {
      message.error(i18n.global.t("or_56"));
    } else if (res.code == 204) {
      message.error(i18n.global.t("or_58"));
    }
    // else if (res.code == 205) {
    //   message.error(i18n.global.t("用户信息不存在"));
    // }
    else if (res.code == 209) {
      message.error(i18n.global.t("or_57"));
    } else if (res.message) {
      message.error(res.message);
    }
  });
}

function get() {
  api_getAllNotPayOrder({}).then((res: any) => {
    if (res.success) {
      price.value = res.data.total_price;
    }
  });
  api_orderList({
    order_status: tabIndex.value == 0 ? "" : tabIndex.value - 1,
    page: current.value,
    pageSize: 10,
  }).then((res: any) => {
    if (res.success) {
      total.value = res.data.total;
      orderList.value = res.data.data;
    }
  });
}

if (route.query.tabIndex) {
  console.log("tabIndex = ", route.query.tabIndex);
  let tabIndex = Number(route.query.tabIndex);
  changeTab(tabIndex);
} else {
  changeTab(0);
}
</script>
<style lang="less" scoped>
#order {
  .con_box {
    background-color: #fff;
    border-radius: 12px;
    .title_l {
      border-bottom: 1px solid rgba(211, 211, 211, 0.5);
      display: flex;
      align-items: center;
      position: relative;
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
      .payAll {
        position: absolute;
        right: 25%;
        top: 50%;
        transform: translateY(-50%);
      }
      .seek {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding: 0;
        input {
          width: 300px;
          height: 34px;
          border-radius: 8px;
          border: 1px solid #dddddd;
          background-color: transparent;
          font-size: 14px;
          &::placeholder {
            color: #1d1e25;
            opacity: 30%;
          }
        }
        .icon {
          position: absolute;
          right: 10px;
          top: 70%;
          transform: translateY(-80%);
          height: 24px;
          width: 24px;
        }
      }
    }

    .conte {
      display: flex;
      justify-content: space-between;
      .left_t {
        flex: 0 0 200px;
        padding: 10px;
        width: 200px;
        border-right: 1px solid rgba(211, 211, 211, 0.5);
        div {
          padding: 8px 15px;
        }
        .check {
          font-weight: 600;
          position: relative;
          &:after {
            content: " ";
            position: absolute;
            height: 60%;
            width: 2px;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #0ae2db;
          }
        }
      }

      .con_right {
        padding: 15px;
        flex: 1;
        .box_he {
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
            .xx {
              flex: 2.3;
            }
            div {
              flex: 1;
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
          }
          .list {
            background-color: #fff;
            margin-left: 15px;
            padding: 15px 0;
            border-bottom: solid 1px rgba(211, 211, 211, 0.5);
            .on {
              font-size: 14px;
            }
            .img_name {
              position: relative;
              margin-left: 0;
              display: flex;
              align-items: center;
              padding-left: 12px;
              // padding-top: 28px;
              .goods_info {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                .txt_3 {
                  flex: 1;
                }
                div {
                  flex: none;
                }
              }
              .shop_i {
                border-radius: 8px;
                width: 56px;
                height: 56px;
                margin-right: 10px;
              }
              div {
                color: #4a4b51;
                flex: 1;
                text-align: left;
                padding-right: 8px;
              }
            }
            .xx {
              flex: 2.3;
              padding: 0 10px;
            }

            .zt {
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
              color: #0ae2db;
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
        .bot_fy {
          padding-top: 30px;
          text-align: right;
          margin-bottom: 50px;
        }
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
  .li {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
    div {
      font-weight: 600;
      display: flex;
      align-items: center;
      color: #1d1e25;
      img {
        width: 20px;
        margin-right: 5px;
      }
    }
    input {
      width: 100%;
      border-radius: 12px;
      border: 1px solid rgba(29, 30, 37, 0.08);
      padding: 10px 20px;
    }
  }
  .hj {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    .price {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
      p {
        margin-bottom: 0;
        font-size: 26px;
        color: red;
      }
    }
    .but {
      background-color: #0ae2db;
      color: #fff;
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
}
</style>
