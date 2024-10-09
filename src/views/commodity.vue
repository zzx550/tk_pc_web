<template>
  <div id="commodity" class="head_b">
    <TopSeek :title="'首页'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/')">首页</div>
        <div class="line">></div>
        <div style="font-weight: 600">
          {{ route.query.id ? "推荐店铺商品" : "推荐商品" }}
        </div>
        <!-- <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
          <img class="icon" src="../assets/home/seek.png" />
        </div> -->
      </div>
      <div class="conte">
        <!-- <div class="left_t" v-if="!route.query.type">
          <div :class="active == '' ? 'check' : ''" @click="changeCat('')">
            全部
          </div>
          <div
            :class="active == x.cat_id ? 'check' : ''"
            @click="changeCat(x.cat_id)"
            v-for="x in goodCat"
            :key="x.cat_id"
          >
            {{ x.cat_name }}
          </div>
        </div> -->
        <div class="con_right">
          <div class="box_t" v-if="route.query.id">
            <img class="logo" src="../assets/logo.png" />
            <div class="name">{{ data.shop_name }}</div>
            <div class="id">ID:{{ data.tiktok_id }}</div>
            <div class="fen">
              <img
                v-for="item in data.star_rating"
                :key="item"
                src="../assets/home/xin.png"
              />
              <div>
                {{
                  data.score_star &&
                  data.score_star != "" &&
                  data.score_star != "0"
                    ? data.score_star + "分"
                    : ""
                }}
              </div>
            </div>
            <div class="sp">
              当前商品
              <p>{{ data.goodsNum }}</p>
              个
            </div>
          </div>
          <div class="shopList">
            <div
              class="boxList"
              v-for="x in goodsList"
              :key="x.goods_id"
              @click="
                isLogin == true
                  ? router.push(`/comm_det?id=${x.goods_id}`)
                  : router.push('./login')
              "
            >
              <div class="bq_">
                访问量 {{ route.query.id ? x.visits : x.goods.visits }}
              </div>
              <img :src="route.query.id ? x.cover_img : x.goods.cover_img" />
              <div class="ms">
                <div class="name">
                  {{ route.query.id ? x.goods_name : x.goods.goods_name }}
                </div>
                <div class="price">
                  ${{ route.query.id ? x.goods_price : x.goods.goods_price }}
                  <p>
                    售价:${{
                      route.query.id ? x.goods_profit : x.goods.goods_profit
                    }}
                  </p>
                </div>
                <div class="xl">
                  日销量&nbsp;&nbsp;{{
                    route.query.id ? x.day_sales_num : x.goods.day_sales_num
                  }}&nbsp; &nbsp;&nbsp;周销量&nbsp;&nbsp;{{
                    route.query.id ? x.week_sales_num : x.goods.week_sales_num
                  }}
                </div>
              </div>
            </div>
            <div style="width: 215px" v-for="x in box" :key="x"></div>
          </div>
          <div class="no_data" v-if="goodsList.length < 1">
            <img style="width: 20%" src="../assets/img/no_data.png" />
            <div>无数据</div>
          </div>
          <div class="bot_fy">
            <a-pagination
              :current="current"
              :pageSize="pageSize"
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
</template>
<script setup lang="ts">
import {
  api_getRecommendGoods,
  api_getRecommendGoods_notLogin,
  api_getShopGoodsList,
  api_getShopGoodsList_notLogin,
  api_goodsCategory,
} from "@/requset/api";
import { useRoute } from "vue-router";
import router from "@/router";
import { ref } from "vue";

const route = useRoute();
const current = ref(1);
const box = ref(0);
const total = ref<number>(1);
const pageSize = ref<number>(15);
const goodsList = ref<any[]>([]);
const data = ref<any>({});
const seekValue = ref<string>("");
// let goodCat = ref<any[]>([])
const active = ref<string | number>("");

// api_goodsCategory({}).then((res: any) => {
//   if (res.success) {
//     goodCat.value = res.data
//   }
// })

let isLogin = ref<boolean>(false);
isLogin.value =
  sessionStorage.getItem("token") != null &&
  sessionStorage.getItem("token") != "" &&
  sessionStorage.getItem("token") != undefined;

// function changeCat(id: string | number) {
//   active.value = id;
//   current.value = 1;
//   get();
// }

const changeList = (page: number, pageSize: number) => {
  current.value = page;
  if (route.query.id) {
    getDp();
  } else {
    get();
  }
};
data.value = JSON.parse(sessionStorage.getItem("data"));

const getDp = () => {
  let promise =
    isLogin.value == true
      ? api_getShopGoodsList({
          id: route.query.id,
          page: current.value,
          pageSize: pageSize.value,
        })
      : api_getShopGoodsList_notLogin({
          id: route.query.id,
          page: current.value,
          pageSize: pageSize.value,
        });
  promise.then((res: any) => {
    if (res.success) {
      total.value = res.data.total;
      goodsList.value = res.data.data;
    }
  });
};

const get = () => {
  let promise =
    isLogin.value == true
      ? api_getRecommendGoods({
          cat_id: active.value,
          page: current.value,
          pageSize: pageSize.value,
        })
      : api_getRecommendGoods_notLogin({
          cat_id: active.value,
          page: current.value,
          pageSize: pageSize.value,
        });
  promise.then((res: any) => {
    if (res.success) {
      total.value = res.data.total;
      goodsList.value = res.data.data;
    }
  });
};

if (route.query.type == 1) {
  pageSize.value = 18;
  box.value = 6 - (total.value % 6);
  if (route.query.id) {
    getDp();
  } else {
    get();
  }
} else {
  active.value = route.query.cat_id;
  pageSize.value = 15;
  box.value = 5 - (total.value % 5);
}
</script>
<style lang="less" scoped>
#commodity {
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
          font-size: 15px;
          cursor: pointer;
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
        min-height: 700px;
        .box_t {
          display: flex;
          background-color: #f6f7f9;
          border-radius: 6px;
          padding: 15px 10px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          position: relative;
          .logo {
            width: 36px;
            height: 36px;
            margin-right: 15px;
            border-radius: 4px;
          }
          .name {
            font-weight: 600;
            padding: 0 8px;
          }
          .id {
            font-size: 12px;
            margin-right: 15px;
          }
          .fen {
            display: flex;
            align-items: center;

            img {
              width: 12px;
              height: 12px;
              position: relative;
              top: -2px;
            }
            div {
              font-size: 12px;
              margin-left: 5px;
            }
          }
          .sp {
            position: absolute;
            font-size: 12px;
            display: flex;
            align-items: center;
            color: #1d1e25;
            right: 20px;
            top: 43%;
            transform: translateX(-50%);
            p {
              font-size: 12px;
              color: #0ae1da;
              margin-bottom: 0;
            }
          }
        }
        .shopList {
          padding: 5px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          .boxList {
            width: 215px;
            position: relative;
            margin-bottom: 20px;
            border: 1px solid #e3e4e4;
            padding: 13px;
            border-radius: 12px;
            .bq_ {
              position: absolute;
              z-index: 2;
              top: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.4);
              color: #fff;
              padding: 6px 10px;
              border-radius: 0 12px 0 12px;
              font-size: 12px;
            }
            img {
              width: 185px;
              height: 185px;
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
                font-size: 14px;
              }
              .price {
                display: flex;
                color: #f40000;
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: 600;
                align-items: flex-end;
                p {
                  font-size: 12px;
                  font-weight: 400;
                  margin-left: 10px;
                  color: #1d1e25;
                  margin-bottom: 0;
                  opacity: 0.8;
                }
              }
              .xl {
                font-size: 12px;
                color: #1d1e25;
                opacity: 0.5;
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
</style>
