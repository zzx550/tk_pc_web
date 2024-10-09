<template>
  <div id="home" class="head_b">
    <TopSeek />
    <div class="top">
      <!-- <div class="shopClass">
        <div class="title">商品分类</div>
        <div class="box">
          <div
            @click="router.push(`/commodity?cat_id=${x.cat_id}`)"
            class="list cur_p"
            v-for="x in goodsList"
            :key="x.cat_id"
          >
            {{ x.cat_name }}
          </div>
        </div>
      </div> -->
      <img src="../assets/home/lbt.png" width="100%" height="420px" />
      <div class="user" v-if="isLogin == true">
        <div class="name">
          <img
            v-if="
              userInfo.shop_cover_image != null &&
              userInfo.shop_cover_image != ''
            "
            class="us_img"
            :src="userInfo.shop_cover_image"
          />
          <img v-else class="us_img" src="../assets/home/user_img.png" />
          <div class="u_right">
            <div
              v-if="userInfo.shop_name != null && userInfo.shop_name != ''"
              class="shop_name"
            >
              店铺名称：{{ userInfo.shop_name }}
            </div>
            <div class="id">ID:{{ userInfo.tiktok_id }}</div>
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
        <div class="shuj">
          <div>
            {{ ordersNumber.orderStatus_0 }}
            <p>待付款</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_1 }}
            <p>待发货</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_2 }}
            <p>已发货</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_3 }}
            <p>已交付</p>
          </div>
        </div>
        <div class="yj">
          <div class="title" @click.stop="fyRuleOpen = true">
            下级返佣<img src="../assets/home/wh.png" />
          </div>
          <div class="shuj">
            <div>
              {{ getFloat(rebateInfo.sale_amount) }}
              <p>销售总额</p>
            </div>
            <div>
              {{ getFloat(rebateInfo.total_rebate) }}
              <p>返佣总额</p>
            </div>
            <div style="color: #0ae2db">
              {{ rebateInfo.max_rate * 100 }}%
              <p>返佣比例</p>
            </div>
          </div>
        </div>
        <div class="data">
          <div class="checkbox">
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
          <div class="img_data">
            <div style="margin-bottom: 8px">
              <p>销售价格</p>
              {{ getFloat(statisticsData.total_profit) }}
            </div>
            <div style="margin-bottom: 8px">
              <p>预期利润</p>
              {{ getFloat(statisticsData.pure_profit) }}
            </div>
            <div>
              <p>订单数量</p>
              {{ statisticsData.order_count }}
            </div>
            <div>
              <p>访问量</p>
              {{ statisticsData.goods_click }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tj">
      <div class="title">
        <div class="left">推荐商品</div>
        <div class="more cur_p" @click="router.push('/commodity?type=1')">
          更多<img src="../assets/home/more.png" />
        </div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in tjList"
          :key="x.goods_id"
          @click="
            isLogin == true
              ? router.push(`/comm_det?id=${x.goods_id}`)
              : router.push('./login')
          "
        >
          <div class="bq_">访问量 {{ x.goods.visits }}</div>
          <img :src="x.goods.cover_img" />
          <div class="ms">
            <div class="name">
              {{ x.goods.goods_name }}
            </div>
            <div class="price">
              ${{ x.goods.goods_price }}
              <p>售价:${{ x.goods.goods_profit }}</p>
            </div>
            <div class="xl">
              日销量&nbsp;&nbsp;{{ x.goods.day_sales_num }}&nbsp;
              &nbsp;&nbsp;周销量&nbsp;&nbsp;{{ x.goods.week_sales_num }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tj dp">
      <div class="title">
        <div class="left">推荐店铺</div>
        <div class="more cur_p" @click="router.push('/shop')">
          更多<img src="../assets/home/more.png" />
        </div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in shopList"
          :key="x.tiktok_id"
          @click="changeLoc(x)"
        >
          <div class="img_">
            <img
              v-for="item in x.hotGoods"
              :key="item.cat_id"
              :src="item.cover_img"
            />
          </div>
          <div class="name">
            <img
              v-if="x.shop_cover_image != null && x.shop_cover_image != ''"
              class="us_img"
              :src="x.shop_cover_image"
            />
            <img v-else class="us_img" src="../assets/home/user_img.png" />
            <div class="u_right">
              <div class="dpm">{{ x.shop_name }}</div>
              <div class="id">ID:{{ x.tiktok_id }}</div>
              <div class="dj">
                <div class="fen">
                  <img
                    v-for="item in x.star_rating"
                    :key="item"
                    src="../assets/home/xin.png"
                  />
                  {{
                    x.score_star && x.score_star != "" && x.score_star != "0"
                      ? x.score_star + "分"
                      : ""
                  }}
                </div>
                {{
                  x.star_rating == 1
                    ? "一星商户"
                    : x.star_rating == 2
                    ? "二星商户"
                    : x.star_rating == 3
                    ? "三星商户"
                    : x.star_rating == 4
                    ? "四星商户"
                    : x.star_rating == 5
                    ? "五星商户"
                    : ""
                }}
              </div>
              <div class="sp">
                当前商品
                <p>{{ x.goodsNum }}</p>
                个
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BotBase />

  <OpenTip
    :openFyRule="fyRuleOpen"
    @changeFyRule="fyRuleOpen = false"
    :fyRule="rebateInfo.rules_desc"
  />
</template>

<script setup lang="ts">
import {
  api_goodsCategory,
  api_getRecommendGoods,
  api_getRecommendGoods_notLogin,
  api_mainStatistics,
  api_getInfo,
  api_getOrderTypeNum,
  api_rebateInfo,
  api_getShopList,
  api_getShopList_notLogin,
} from "@/requset/api";
import { getFloat } from "@/utils";
import { goods_fl, goods_tj } from "@/base/index";
import router from "@/router";
import { ref } from "vue";

const fyRuleOpen = ref<boolean>(false);
let goodsList = ref<goods_fl[]>([]);
let tjList = ref<goods_tj[]>([]);
const statisticsTab = ref<number>(0);
let statisticsData = ref({
  total_profit: 0.0,
  pure_profit: 0.0,
  order_count: 0,
  goods_click: 0,
});
let ordersNumber = ref({
  orderStatus_0: 0,
  orderStatus_1: 0,
  orderStatus_2: 0,
  orderStatus_3: 0,
});
const userInfo = ref<any>({});
const rebateInfo = ref<any>({});
const shopList = ref<any>([]);

let isLogin = ref<boolean>(false);
isLogin.value =
  sessionStorage.getItem("token") != null &&
  sessionStorage.getItem("token") != "" &&
  sessionStorage.getItem("token") != undefined;

function changeLoc(x: any) {
  sessionStorage.setItem("data", JSON.stringify(x));
  router.push(`/commodity?type=1&id=${x.id}`);
}

// 切换
const changeStatisticsTab = (index: number) => {
  statisticsTab.value = index;
  api_mainStatistics({ type: index }).then((res: any) => {
    if (res.success) {
      statisticsData.value = res.data;
    }
  });
};

if (isLogin.value == true) {
  api_rebateInfo({}).then((res: any) => {
    rebateInfo.value = res.data;
  });

  api_goodsCategory({}).then((res: any) => {
    if (res.success) {
      goodsList.value = res.data;
    }
  });

  api_getShopList({ keywords: "", page: 1, pageSize: 20 }).then((res: any) => {
    if (res.success) {
      shopList.value = res.data.data;
    }
  });

  api_getOrderTypeNum({}).then((res: any) => {
    if (res.success) {
      ordersNumber.value = res.data;
    }
  });

  api_getRecommendGoods({ page: 1, pageSize: 5 }).then((res: any) => {
    if (res.success) {
      tjList.value = res.data.data;
    }
  });

  api_getInfo({}).then((res: any) => {
    if (res.success) {
      userInfo.value = { ...userInfo.value, ...res.data };
      // 是否领取过新手礼包
    }
  });
  changeStatisticsTab(0);
} else {
  api_getShopList_notLogin({ keywords: "", page: 1, pageSize: 20 }).then(
    (res: any) => {
      if (res.success) {
        shopList.value = res.data.data;
      }
    }
  );
  api_getRecommendGoods_notLogin({ page: 1, pageSize: 5 }).then((res: any) => {
    if (res.success) {
      tjList.value = res.data.data;
    }
  });
}
</script>

<style lang="less" scoped>
#home {
  .top {
    margin-bottom: 35px;
    display: flex;
    justify-content: space-between;
    .shopClass {
      height: 420px;
      padding: 20px 15px 10px;
      background-color: #fff;
      border-radius: 12px;
      width: 200px;
      .title {
        color: #1d1e25;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .box {
        height: 360px;
        overflow: auto;
      }
      .list {
        padding: 9.5px 0;
        display: flex;
        font-size: 14px;
        &:hover {
          color: #0ae1da;
        }
        img {
          margin-right: 15px;
          width: 17px;
          height: 17px;
        }
      }
    }
    .user {
      height: 420px;
      background-image: url(../assets/home/user_bac.png);
      background-size: 100% 100%;
      width: 290px;
      padding: 16px 10px;
      margin-left: 30px;
      .name {
        display: flex;
        align-items: center;
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
            margin-bottom: 4px;
          }
          .id {
            font-weight: 600;
            margin-bottom: 5px;
          }
          .dj {
            display: flex;
            font-size: 12px;
            .fen {
              display: flex;
              color: #0ae1da;
              align-items: center;
              font-size: 12px;
              margin-right: 8px;
              img {
                width: 12px;
                height: 12px;
                margin-right: 5px;
              }
            }
          }
        }
      }
      .shuj {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 600;
          p {
            padding-top: 5px;
            color: #1d1e25;
            opacity: 0.7;
            font-size: 12px;
            margin-bottom: 0 !important;
          }
        }
      }
      .yj {
        padding: 10px;
        background-color: #f0fcfb;
        border-radius: 4px;
        .title {
          font-size: 12px;
          color: #1d1e25;
          opacity: 0.7;
          display: flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
            margin-left: 10px;
          }
        }
        .shuj {
          padding-top: 8px;
          padding-bottom: 0;
          p {
            color: #1d1e25 !important;
          }
        }
      }
      .data {
        padding-top: 20px;
        .checkbox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          margin-bottom: 15px;
          div {
            font-size: 12px;
            color: #aaaaad;
            cursor: pointer;
          }
          .check {
            font-weight: 600;
            color: #1d1e25;
            position: relative;
            &:after {
              position: absolute;
              left: 50%;
              bottom: -4px;
              content: "";
              transform: translateX(-50%);
              background-color: #1d1e25;
              height: 2px;
              width: 70%;
            }
          }
        }
        .img_data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          div {
            flex-shrink: 0;
            width: 48.5%;
            display: flex;
            flex-direction: column;
            padding: 13px 10px;
            font-weight: 600;
            border-radius: 4px;
            p {
              font-size: 12px;
              margin-bottom: 5px;
            }
            &:nth-child(1) {
              background-color: #f5fdfa;
              background-image: url(../assets/home/ji_1.png);
              background-size: 100% 100%;
            }
            &:nth-child(2) {
              background-color: #f5fafd;
              background-image: url(../assets/home/ji_2.png);
              background-size: 100% 100%;
            }
            &:nth-child(3) {
              background-color: #fef8f9;
              background-image: url(../assets/home/ji_3.png);
              background-size: 100% 100%;
            }
            &:nth-child(4) {
              background-color: #f8fafe;
              background-image: url(../assets/home/ji_4.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  .tj {
    margin-bottom: 30px;
    .title {
      margin-bottom: 18px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      .left {
        font-weight: 600;
      }
      .more {
        display: flex;
        align-items: center;
        img {
          height: 18px;
          margin-left: 8px;
        }
      }
    }
    .shopList {
      background: linear-gradient(to bottom, #e4ecff, #fff);
      padding: 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 400px;
      .boxList {
        width: 254px;
        position: relative;
        // overflow-x: hidden;
        .bq_ {
          position: absolute;
          top: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
          padding: 6px 10px;
          border-radius: 0 12px 0 12px;
          font-size: 12px;
        }
        img {
          width: 254px;
          height: 254px;
          border-radius: 8px;
        }
        .ms {
          padding-top: 10px;
          .name {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: justify;
            margin-bottom: 10px;
            color: #1d1e25;
            font-weight: 600;
            line-height: 20px;
            height: 40px;
          }
          .price {
            display: flex;
            color: #f40000;
            margin-bottom: 10px;
            font-size: 22px;
            font-weight: 600;
            align-items: flex-end;
            p {
              font-size: 14px;
              font-weight: 400;
              margin-left: 10px;
              color: #1d1e25;
              margin-bottom: 0;
              opacity: 0.8;
            }
          }
          .xl {
            font-size: 14px;
            color: #1d1e25;
            opacity: 0.5;
          }
        }
      }
    }
  }
  .dp {
    margin-bottom: 80px;
    .shopList {
      min-height: 710px;
      padding: 0;
      background: #fff !important;
      flex-wrap: wrap;
      .boxList {
        width: 264px;
        border: 1px solid #edeeee;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
        .img_ {
          width: 234px;
          height: 234px;
          border-radius: 8px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          align-items: center;
          img {
            width: 110px;
            height: 105px;
          }
        }
        .name {
          display: flex;
          align-items: flex-start;
          .us_img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 4px;
          }
          .u_right {
            display: flex;
            flex-direction: column;
            .dpm {
              font-weight: 600;
              font-size: 18px;
              margin-bottom: 10px;
            }
            .id {
              font-size: 14px;
              margin-bottom: 7px;
            }
            .dj {
              display: flex;
              font-size: 12px;
              margin-bottom: 7px;
              color: #1d1e25;
              .fen {
                display: flex;
                color: #0ae1da;
                align-items: center;
                font-size: 12px;
                margin-right: 8px;
                img {
                  width: 12px;
                  height: 12px;
                  margin-right: 5px;
                }
              }
            }
            .sp {
              font-size: 12px;
              display: flex;
              align-items: center;
              color: #1d1e25;
              p {
                font-size: 12px;
                color: #0ae1da;
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
.fs {
  background-color: #1d1e25;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
</style>
