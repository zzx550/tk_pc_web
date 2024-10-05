<template>
  <div id="userShop" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="box_con">
      <div class="con_left">
        <div class="data_hx">
          <div class="title">
            <div class="left">核心数据</div>
            <div class="right_check">
              <div
                :class="statisticsTab == 0 ? 'check' : ''"
                @click="changeStatisticsTab(0)"
              >
                本日
              </div>
              <div
                :class="statisticsTab == 1 ? 'check' : ''"
                @click="changeStatisticsTab(1)"
              >
                本周
              </div>
              <div
                :class="statisticsTab == 2 ? 'check' : ''"
                @click="changeStatisticsTab(2)"
              >
                本月
              </div>
              <div
                :class="statisticsTab == 3 ? 'check' : ''"
                @click="changeStatisticsTab(3)"
              >
                整年
              </div>
            </div>
          </div>
          <div class="data">
            <div class="li">
              商品售价($)
              <div>{{ statisticsData.total_profit }}</div>
            </div>
            <div class="li">
              预期利润($)
              <div>{{ statisticsData.pure_profit }}</div>
            </div>
            <div class="li">
              订单数量
              <div>{{ statisticsData.order_count }}</div>
            </div>
            <div class="li">
              访问量
              <div>{{ statisticsData.goods_click }}</div>
            </div>
          </div>
        </div>
        <div class="order" @click="router.push('/order')">
          <div class="title">我的订单</div>
          <div class="type">
            <div class="li">
              {{ ordersNumber.orderStatus_0 }}
              <div>待付款</div>
            </div>
            <div class="li">
              {{ ordersNumber.orderStatus_1 }}
              <div>待发货</div>
            </div>
            <div class="li">
              {{ ordersNumber.orderStatus_2 }}
              <div>已发货</div>
            </div>
            <div class="li">
              {{ ordersNumber.orderStatus_3 }}
              <div>已交付</div>
            </div>
          </div>
        </div>

        <div class="bottom_b">
          <div class="bot_le">
            <div class="gys" @click="router.push('/supplier_det')">
              <div class="title">
                供应商
                <div @click.stop="addOpen = true">添加供应商</div>
              </div>
              <div class="box">
                <img class="but" src="../assets/home/z_icon.png" />
                <div class="list">
                  <img class="pr_con" src="../assets/logo.png" />
                  <div class="ti">供应商名称</div>
                  <div class="on">编号：1549619645</div>
                  <div class="txt">送货.供货</div>
                </div>
                <img class="but" src="../assets/home/y_icon.png" />
              </div>
            </div>
            <div class="mine_shop" @click="router.push('/mine_shop')">
              <div class="title">
                我的店铺
                <div>更多</div>
              </div>
              <div class="list">
                <div class="shop_t">
                  <img src="../assets/logo.png" />
                  <div class="txt_3">
                    ask大可视对讲卡视角打asd
                    撒打算卡手机啊可视对讲卡卡贷款阿九久啊上课的
                  </div>
                </div>
                <div class="price">
                  产品进价:
                  <p style="margin-bottom: 0; color: red">$100.00</p>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 产品售价:
                  <p style="margin-bottom: 0; color: #000">$100.00</p>
                </div>
                <div class="txt">
                  日销量:120&nbsp;&nbsp;周销量:1200&nbsp;&nbsp;访问量:15233
                </div>
              </div>
            </div>
          </div>
          <div class="bot_ri">
            <div class="title_">
              产品排名
              <div style="color: #0ae1da" @click="router.push('/ranking')">
                更多
              </div>
            </div>
            <div class="list_T">
              <div class="title">排名</div>
              <div class="time">商品</div>
              <div class="txt">热度</div>
            </div>
            <div class="list list_T" v-for="(x, y) in ranking" :key="x.id">
              <div class="title">
                <img v-if="y == 0" src="../assets/img/1.png" />
                <img v-else-if="y == 1" src="../assets/img/2.png" />
                <img v-else-if="y == 2" src="../assets/img/3.png" />
                <div v-else>{{ y + 1 }}</div>
              </div>
              <div class="time">
                <img class="shop_i" src="../assets/logo.png" />
                <div>{{ x.goods_names }}</div>
              </div>
              <div class="txt">{{ x.ranking_value }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right_user">
        <div class="top_user">
          <div class="name">
            <van-uploader
              v-model="avatarFileList"
              :after-read="avatarAfterRead"
              :preview-image="false"
            >
              <img
                v-if="
                  userInfo.shop_cover_image != null &&
                  userInfo.shop_cover_image != ''
                "
                class="us_img"
                :src="userInfo.shop_cover_image"
                alt=""
              />
              <img v-else class="us_img" src="../assets/home/user_img.png" />
            </van-uploader>
            <div class="u_right">
              <div
                v-if="userInfo.shop_name != null && userInfo.shop_name != ''"
                class="shop_name"
                @click="shopNameOpen = userInfo.change_shop_name == 1"
              >
                店铺名称：{{ userInfo.shop_name }}
              </div>
              <div class="id" @click="copyID">ID：{{ userInfo.tiktok_id }}</div>
              <div class="dj">
                <div class="fen">
                  <img
                    v-if="userInfo.star_rating"
                    v-for="x in userInfo.star_rating"
                    :key="x"
                    src="../assets/home/xin.png"
                  />
                  {{
                    userInfo.score_star &&
                    userInfo.score_star != "" &&
                    userInfo.score_star != "0"
                      ? userInfo.score_star + "分"
                      : ""
                  }}
                </div>
                {{
                  userInfo.star_rating == 1
                    ? "一星商户"
                    : userInfo.star_rating == 2
                    ? "二星商户"
                    : userInfo.star_rating == 3
                    ? "三星商户"
                    : userInfo.star_rating == 4
                    ? "四星商户"
                    : userInfo.star_rating == 5
                    ? "五星商户"
                    : ""
                }}
              </div>
            </div>
          </div>
          <div class="bal">
            <div class="ls cur_p" @click="open = true">历史记录</div>
            <div class="z_bal">
              {{ walletInfo.totalAssets }}
              <div>总资产($)</div>
            </div>
            <div class="two_bal">
              <div class="z_bal">
                {{ walletInfo.cloud_balance }}
                <div>余额($)</div>
              </div>
              <div class="z_bal">
                {{ walletInfo.wait_balance }}
                <div>待结算($)</div>
              </div>
            </div>
            <div class="but">
              <div @click="czOpen = true">充值</div>
              <div class="tx" @click="router.push('/withdraw')">提现</div>
            </div>
          </div>
        </div>
        <div class="xji">
          <div class="title_fy">
            <div class="left">下级返佣<img src="../assets/home/wh.png" /></div>
            <div class="cur_p" style="color: #0ae1da" @click="openFy = true">
              返佣记录
            </div>
          </div>
          <div class="data">
            <div class="li">
              <div>{{ rebateInfo.sale_amount }}</div>
              销售总额($)
            </div>
            <div class="li">
              <div>{{ rebateInfo.total_rebate }}</div>
              返佣总额($)
            </div>
            <div class="li">
              <div style="color: #0ae1da">{{ rebateInfo.max_rate * 100 }}%</div>
              返佣比例
            </div>
          </div>
        </div>
        <div class="tg" @click="llbOpen = true">
          <img src="../assets/home/img.png" />
          <div class="por_l">
            <p style="color: #ff8811">新人扶持</p>
            流量包
          </div>
          <div class="por_r">
            领取
            <p style="color: #ff8811">百万次</p>
            商品曝光
          </div>
        </div>
        <div class="bx_">
          <div>助力好友店铺 获取商品加热</div>
          <div class="but" @click="hyOpen = true">朋友助力</div>
          <img src="../assets/img/bx_icon.png" />
        </div>
      </div>
    </div>
  </div>

  <OpenTip :openAdd="addOpen" @changeAdd="addOpen = false" />
  <OpenTip :openCz="czOpen" @changeCz="czOpen = false" />
  <OpenTip :openHy="hyOpen" @changeHy="hyOpen = false" />
  <OpenTip
    :openLlb="llbOpen"
    @changeLlb="changeLlb"
    :llbRule="llbRule"
    :llbHasGet="llbHasGet"
  />
  <OpenTip
    :openShopName="shopNameOpen"
    @changeShopName="changeShopName"
    :isUpdateShopName="userInfo.shop_name != null && userInfo.shop_name != ''"
  />

  <a-drawer
    v-model:open="open"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <div class="check_t">收支明细</div>
      <div>收入</div>
      <div>支出</div>
      <img class="close" @click="open = false" src="../assets/img/close.png" />
    </div>
    <div class="list" v-for="x in 3" :key="x">
      <div>
        <div class="price">注册礼品</div>
        <div class="kh">编号：6585498</div>
        <div class="kh">2024-12-10 12:0</div>
      </div>
      <div class="red_" :style="x == 1 ? { color: 'red' } : ''">+$68</div>
    </div>
  </a-drawer>
  <a-drawer
    v-model:open="openFy"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <div class="check_t">一级返佣</div>
      <div>二级返佣</div>
      <div>三级返佣</div>
      <img
        class="close"
        @click="openFy = false"
        src="../assets/img/close.png"
      />
    </div>
    <div class="list" v-for="x in 3" :key="x">
      <div>
        <div class="price">返佣人</div>
        <div class="kh">返佣编号：6585498</div>
        <div class="kh">2024-12-10 12:0</div>
      </div>
      <div class="red_" :style="x == 1 ? { color: 'red' } : ''">+$68</div>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import router from "@/router";
import { reactive, ref } from "vue";
import {
  api_getGiftPack,
  api_optionDesc,
  api_getInfo,
  api_GoodsRanking,
  api_mainStatistics,
  api_uploadImg,
  api_update_shopInfo,
  api_bind_shopInfo,
  api_rebateInfo,
  api_getOrderTypeNum,
  api_wallet,
} from "@/requset/api";
import { message } from "ant-design-vue";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

interface Item {
  id: number;
  goods_names: string;
  ranking_value: string;
}

const userInfo = ref<any>({});
let ranking = ref<Item[]>([]);
const open = ref<boolean>(false);
const openFy = ref<boolean>(false);
const addOpen = ref<boolean>(false);
const czOpen = ref<boolean>(false);
const hyOpen = ref<boolean>(false);
const shopNameOpen = ref<boolean>(false);
const llbOpen = ref<boolean>(false);
const llbRule = ref<string>("");
const llbHasGet = ref<string>("");
let statisticsData = ref({
  total_profit: "0.00",
  pure_profit: "0.00",
  order_count: "0",
  goods_click: "0",
});
let ordersNumber = ref({
  orderStatus_0: 0,
  orderStatus_1: 0,
  orderStatus_2: 0,
  orderStatus_3: 0,
});
const statisticsTab = ref<number>(0);
const avatarFileList = ref([]);
const rebateInfo = ref<any>({});
let walletInfo = ref({
  totalAssets: 0,
  cloud_balance: 0,
  wait_balance: 0,
  open_cryptocurrency_address: 0,
  cryptocurrency_address: [{ name: "ERC20", address: "aaa" }],
});

const changeStatisticsTab = (index: number) => {
  statisticsTab.value = index;
  api_mainStatistics({ type: index }).then((res: any) => {
    if (res.success) {
      statisticsData.value = res.data;
    }
  });
};
changeStatisticsTab(0);

const getUserInfo = () => {
  api_getInfo({}).then((res: any) => {
    if (res.success) {
      userInfo.value = { ...userInfo.value, ...res.data };
      // 是否领取过新手礼包
      llbHasGet.value = res.data.month_gift_pack;
    }
  });
};
getUserInfo();

const getWalletInfo = () => {
  api_wallet({}).then((res: any) => {
    if (res.code == 200) {
      walletInfo.value = { ...walletInfo.value, ...res.data };
      walletInfo.value.totalAssets =
        Number(res.data.cloud_balance) + Number(res.data.wait_balance);
      // if (walletInfo.value.cryptocurrency_address.length > 0) {
      //   qrCodeValue.value = walletInfo.value.cryptocurrency_address[0].address;
      //   selectRechargeAddressTab.value =
      //   walletInfo.value.cryptocurrency_address[0].name;
      // }
    }
  });
};
getWalletInfo();

api_rebateInfo({}).then((res: any) => {
  rebateInfo.value = res.data;
});

api_getOrderTypeNum({}).then((res: any) => {
  if (res.code == 200) {
    ordersNumber.value = res.data;
  }
});

api_GoodsRanking({}).then((res: any) => {
  if (res.code == 200) {
    ranking.value.push(...res.data);
  }
});

api_optionDesc({ name: "gift_pack_rules" }).then((res: any) => {
  if (res.code == 200) {
    // 新手礼包规则
    llbRule.value = res.data;
  }
});

const changeLlb = (change: boolean) => {
  if (change == true) {
    message.loading("加载中...");
    api_getGiftPack({}).then((res: any) => {
      if (res.code == 200) {
        message.success("领取成功");
        getUserInfo();
      } else if (res.message) {
        message.error(res.message);
      }
    });
  } else {
    llbOpen.value = false;
  }
};

const changeShopName = (change: boolean, name: string) => {
  console.log("change = ", change);
  console.log("name = ", name);
  if (change == true) {
    if (name == "") {
      message.error("请输入店铺名称");
      return;
    }
    message.loading("加载中...");
    if (userInfo.value.shop_name != null && userInfo.value.shop_name != "") {
      api_update_shopInfo({
        shop_name: name,
        shop_cover_image: userInfo.value.shop_cover_image,
      }).then((res: any) => {
        if (res.code == 200) {
          shopNameOpen.value = false;
          message.success("店铺名称修改成功");
          getUserInfo();
        } else if (res.message) {
          message.error(res.message);
        }
      });
    } else {
      api_bind_shopInfo({
        shop_name: name,
      }).then((res: any) => {
        if (res.code == 200) {
          shopNameOpen.value = false;
          message.success("店铺名称添加成功");
          getUserInfo();
        } else if (res.message) {
          message.error(res.message);
        }
      });
    }
  } else {
    shopNameOpen.value = false;
  }
};

async function copyID() {
  try {
    await toClipboard(userInfo.value.tiktok_id);
    message.success("复制成功");
  } catch (e) {
    message.error("复制失败");
  }
}

const avatarAfterRead = (file: any) => {
  message.loading("加载中...");
  api_uploadImg(file).then((res: any) => {
    if (res.code == 200) {
      api_update_shopInfo({
        shop_cover_image: res.data.http_url,
        shop_name: userInfo.value.shop_name,
      }).then((res: any) => {
        if (res.code == 200) {
          message.success;
          getUserInfo();
        } else {
          message.error(res.message);
        }
      });
    } else if (res.message) {
      message.error(res.message);
    }
  });
};
</script>
<style lang="less" scoped>
#userShop {
  .box_con {
    display: flex;
    justify-content: space-between;
    .con_left {
      width: 940px;
      .data_hx {
        background-color: #fff;
        border-radius: 12px;
        padding: 25px;
        margin-bottom: 20px;
        .title {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 20px;
            font-weight: 600;
          }
          .right_check {
            display: flex;
            background-color: #f4f5f8;
            border-radius: 4px;
            padding: 4px 10px;
            div {
              padding: 4px 15px;
              font-size: 13px;
              border-radius: 3px;
              color: #88898e;
            }
            .check {
              color: #000;
              font-weight: 600;
              background-color: #ffffff;
            }
          }
        }
        .data {
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          .li {
            padding: 10px;
            border-radius: 4px;
            height: 104px;
            width: 210px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            color: #616065;
            &:nth-child(1) {
              background-image: url("../assets/home/ji_1.png");
              background-color: #e8faf3;
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              background-image: url("../assets/home/ji_2.png");
              background-color: #e4f6fd;
              background-size: 100% 100%;
            }
            &:nth-child(3) {
              background-image: url("../assets/home/ji_3.png");
              background-color: #fff7f9;
              background-size: 100% 100%;
            }
            &:nth-child(4) {
              background-image: url("../assets/home/ji_4.png");
              background-color: #eef3ff;
              background-size: 100% 100%;
            }
            div {
              padding-top: 8px;
              font-size: 26px;
              color: #000;
              font-weight: 600;
            }
          }
        }
      }
      .order {
        background-color: #fff;
        border-radius: 12px;
        padding: 25px;
        margin-bottom: 20px;
        .title {
          font-size: 20px;
          font-weight: 600;
        }
        .type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          padding-top: 20px;
          .li {
            font-size: 30px;
            font-weight: 600;
            color: #000;
            width: 20%;
            div {
              color: #616065;
              font-size: 16px;
              padding-top: 10px;
            }
          }
        }
      }
      .bottom_b {
        display: flex;
        justify-content: space-between;
        .bot_le {
          width: 320px;
          .gys {
            background-color: #fff;
            border-radius: 12px;
            padding: 25px 20px;
            margin-bottom: 20px;
            .title {
              font-size: 20px;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 15px;
              div {
                color: #0ae1da;
                font-size: 14px;
                cursor: pointer;
              }
            }
            .box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .but {
                width: 30px;
              }
            }
            .list {
              margin: 0 10px;
              padding: 20px 15px;
              border: 1px solid #ededee;
              border-radius: 8px;
              text-align: center;
              flex: 1;
              img {
                width: 60px;
                border-radius: 8px;
              }
              .ti {
                font-size: 18px;
                font-weight: 600;
                padding: 15px 0 8px;
              }
              .on {
                padding-bottom: 8px;
                font-size: 16px;
                color: #4a4b51;
              }
              .txt {
                font-size: 14px;
                color: #88898e;
              }
            }
          }
          .mine_shop {
            background-color: #fff;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            .title {
              font-size: 20px;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 15px;
              div {
                color: #0ae1da;
                font-size: 14px;
                cursor: pointer;
              }
            }
            .list {
              .shop_t {
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                img {
                  width: 76px;
                  border-radius: 8px;
                  margin-right: 15px;
                }
                .txt_3 {
                  font-size: 14px;
                  line-height: 22px;
                }
              }
              .price {
                display: flex;
                font-size: 12px;
                padding: 8px 0;
                margin-bottom: 4px;
                color: #4a4b51;
                p {
                  font-size: 12px;
                }
              }
              .txt {
                font-size: 12px;
                color: #8d8e91;
              }
            }
          }
        }
        .bot_ri {
          width: 595px;
          background-color: #fff;
          border-radius: 12px;
          padding: 20px;
          .title_ {
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
            div {
              font-size: 14px;
              cursor: pointer;
            }
          }
          .list_T {
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            padding: 8px 0;
            border-radius: 4px;
            .title {
              flex: 1;
            }
            .time {
              flex: 8;
            }
            .txt {
              flex: 1;
            }
          }
          .list {
            background-color: #fff;
            padding: 15px 0;
            .title {
              font-size: 20px;
              color: #8d8e91;
              img {
                margin: 0 auto;
                width: 50px;
              }
            }
            .time {
              padding: 0 20px;
              display: flex;
              align-items: center;
              .shop_i {
                border-radius: 8px;
                width: 56px;
                height: 56px;
                margin-right: 10px;
              }
              div {
                flex: 1;
                text-align: left;
              }
            }
            .txt {
              font-size: 20px;
            }
          }
        }
      }
    }
    .right_user {
      width: 440px;
      .top_user {
        background-color: rgba(255, 255, 255, 0.5);
        padding: 25px 20px;
        border-radius: 12px;
        margin-bottom: 20px;
        .name {
          display: flex;
          align-items: center;
          margin-bottom: 18px;
          .us_img {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .u_right {
            display: flex;
            flex-direction: column;
            .shop_name {
              font-size: 14px;
              margin-bottom: 5px;
            }
            .id {
              font-weight: 600;
              margin-bottom: 8px;
              font-size: 22px;
            }
            .dj {
              display: flex;
              font-size: 14px;
              .fen {
                display: flex;
                color: #0ae1da;
                align-items: center;
                font-size: 14px;
                margin-right: 12px;
                img {
                  width: 16px;
                  height: 16px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
        .bal {
          background-color: #fff;
          border-radius: 8px;
          padding: 25px 20px;
          padding-top: 40px;
          position: relative;
          .ls {
            position: absolute;
            right: 20px;
            top: 18px;
            font-size: 14px;
            color: #0ae1da;
            cursor: pointers;
          }
          .z_bal {
            text-align: center;
            font-size: 26px;
            color: #000;
            div {
              color: #686868;
              padding-top: 8px;
              font-size: 16px;
            }
          }
          .two_bal {
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .but {
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
              width: 46%;
              height: 38px;
              line-height: 38px;
              background-color: #0ae2db;
              border-radius: 4px;
              color: #fff;
              text-align: center;
              font-size: 14px;
            }
            .tx {
              border: 1px solid #e7e8e8;
              background-color: #fff;
              color: #bdbdbd;
            }
          }
        }
      }
      .xji {
        padding: 20px;
        background-color: #fff;
        border-radius: 12px;
        margin-bottom: 20px;
        .title_fy {
          display: flex;
          justify-content: space-between;
          border-radius: 12px;
          margin-bottom: 25px;
          .left {
            display: flex;
            align-items: center;
            image-orientation: 15px;
            font-size: 20px;
            font-weight: 600;
            img {
              width: 16px;
              margin-left: 5px;
              height: 16px;
            }
          }
        }
        .data {
          display: flex;
          justify-content: space-between;
          text-align: center;
          .li {
            div {
              padding-bottom: 8px;
              font-weight: 600;
              font-size: 24px;
            }
          }
        }
      }
      .tg {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
        img {
          width: 100%;
        }
        .por_l {
          position: absolute;
          display: flex;
          top: 20%;
          font-size: 20px;
          font-weight: 600;
          left: 20%;
          width: 70%;
          color: #1e458e;
          p {
            font-weight: 600;
            margin-bottom: 0px;
          }
        }
        .por_r {
          display: flex;
          position: absolute;
          bottom: 20%;
          font-size: 20px;
          font-weight: 600;
          right: 20%;
          width: 70%;
          color: #1e458e;
          justify-content: flex-end;
          p {
            font-weight: 600;
            margin-bottom: 0px;
          }
        }
      }
      .bx_ {
        font-size: 20px;
        height: 120px;
        background-color: #fff;
        border-radius: 8px;
        padding: 20px;
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        img {
          position: absolute;
          width: 180px;
          bottom: 0;
          right: 0;
        }
        div {
          position: relative;
          z-index: 10;
          font-weight: 600;
        }
        .but {
          background-color: #0ae1da;
          padding: 10px 15px;
          width: 160px;
          font-weight: 400;
          color: #fff;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
        }
      }
    }
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
    padding: 15px 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      margin-bottom: 10px;
      font-size: 16px;
      div {
        font-weight: 700;
        font-size: 20px;
      }
    }
    .kh {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #8d8e91;
      padding: 5px 0;
    }
    .red_ {
      font-size: 20px;
    }
  }
}
</style>
