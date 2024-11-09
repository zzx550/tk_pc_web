<template>
  <div id="home" class="head_b">
    <TopSeek @shopTrue="enter = true" />
    <div class="top" id="top">
      <a-carousel autoplay style="width: 780px">
        <img src="../assets/bal.png" width="100%" height="420px" />
        <img src="../assets/bal2.png" width="100%" height="420px" />
        <img src="../assets/bal3.png" width="100%" height="420px" />
      </a-carousel>
      <div class="bor_1">
        <a-carousel autoplay style="width: 300px">
          <img src="../assets/x1.jpeg" width="100%" height="205px" />
          <img src="../assets/x2.jpeg" width="100%" height="205px" />
        </a-carousel>
        <a-carousel autoplay style="width: 300px">
          <img src="../assets/x3.jpeg" width="100%" height="205px" />
          <img src="../assets/x4.jpeg" width="100%" height="205px" />
        </a-carousel>
      </div>
      <div class="bor_1" v-if="isSeller == false">
        <a-carousel autoplay style="width: 300px">
          <img src="../assets/x5.jpeg" width="100%" height="205px" />
        </a-carousel>
        <a-carousel autoplay style="width: 300px">
          <img src="../assets/x7.jpeg" width="100%" height="205px" />
          <img src="../assets/x8.jpeg" width="100%" height="205px" />
        </a-carousel>
      </div>

      <div
        class="user"
        v-if="isSeller == true"
        @click="router.push('/user_shop')"
      >
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
              {{ $t('ho_01') }}：{{ userInfo.shop_name }}
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
                  userInfo.score_star != '' &&
                  userInfo.score_star != '0'
                    ? userInfo.score_star + $t('ho_26')
                    : ''
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="shuj">
          <div>
            {{ ordersNumber.orderStatus_0 }}
            <p>{{ $t('ho_07') }}</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_1 }}
            <p>{{ $t('ho_08') }}</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_2 }}
            <p>{{ $t('ho_09') }}</p>
          </div>
          <div>
            {{ ordersNumber.orderStatus_3 }}
            <p>{{ $t('ho_10') }}</p>
          </div>
        </div>
        <div class="yj">
          <div class="title" @click.stop="fyRuleOpen = true">
            {{ $t('ho_11') }}<img src="../assets/home/wh.png" />
          </div>
          <div class="shuj">
            <div>
              {{ getFloat(rebateInfo.sale_amount) }}
              <p>{{ $t('ho_12') }}</p>
            </div>
            <div>
              {{ getFloat(rebateInfo.total_rebate) }}
              <p>{{ $t('ho_13') }}</p>
            </div>
            <div style="color: #0ae2db">
              {{ rebateInfo.max_rate * 100 }}%
              <p>{{ $t('ho_14') }}</p>
            </div>
          </div>
        </div>
        <div class="data">
          <div class="checkbox">
            <div
              :class="statisticsTab == 0 ? 'check' : ''"
              @click="changeStatisticsTab(0)"
            >
              {{ $t('ho_15') }}
            </div>
            <div
              :class="statisticsTab == 1 ? 'check' : ''"
              @click="changeStatisticsTab(1)"
            >
              {{ $t('ho_16') }}
            </div>
            <div
              :class="statisticsTab == 2 ? 'check' : ''"
              @click="changeStatisticsTab(2)"
            >
              {{ $t('ho_17') }}
            </div>
            <div
              :class="statisticsTab == 3 ? 'check' : ''"
              @click="changeStatisticsTab(3)"
            >
              {{ $t('ho_18') }}
            </div>
          </div>
          <div class="img_data">
            <div style="margin-bottom: 8px">
              <p>{{ $t('ho_19') }}</p>
              {{ getFloat(statisticsData.total_profit) }}
            </div>
            <div style="margin-bottom: 8px">
              <p>{{ $t('ho_20') }}</p>
              {{ getFloat(statisticsData.pure_profit) }}
            </div>
            <div>
              <p>{{ $t('ho_21') }}</p>
              {{ statisticsData.order_count }}
            </div>
            <div>
              <p>{{ $t('ho_22') }}</p>
              {{ statisticsData.goods_click }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sp_fl" id="fl">
      <div class="title">
        <div class="left">{{ $t('_ho_28') }}</div>
      </div>
      <swiper
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :loop="true"
        :modules="modules"
        :slides-per-view="12"
        :space-between="50"
      >
        <swiper-slide
          v-for="x in goodsList"
          :key="x.cat_id"
          @click="router.push(`/commodity?cat_id=${x.cat_id}`)"
        >
          <div class="list">
            <img src="../assets/logo.png" />
            <div>{{ x.cat_name }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div class="tj" id="tj">
      <div class="title">
        <div class="left">{{ $t('ho_23') }}</div>
        <div class="more cur_p" @click="router.push('/commodity?type=1')">
          {{ $t('ho_24') }}<img src="../assets/home/more.png" />
        </div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in tjList"
          :key="x.goods_id"
          @click="
            isLogin
              ? router.push(`/comm_det?id=${x.goods_id}`)
              : router.push('/login')
          "
        >
          <div class="bq_">{{ $t('co_d_05') }} {{ x.goods.visits }}</div>
          <img :src="x.goods.cover_img" />
          <div class="ms">
            <div class="price">
              ${{ x.goods.goods_price }}
              <p>{{ $t('co_d_06') }}:${{ x.goods.goods_profit }}</p>
            </div>
            <div class="xl">
              <p>{{ $t('co_d_07') }}&nbsp;&nbsp;{{ x.goods.day_sales_num }}</p>
            </div>
            <div class="name">
              {{ x.goods.goods_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shop_">
      <img src="../assets/sj.png" />
      <div class="txt">
        <div>{{ $t('_ho_24') }}</div>
        <div>{{ $t('_ho_25') }}</div>
        <div class="price">{{ $t('_ho_26') }}$100,000</div>
        <button
          @click="isLogin == true ? (enter = true) : router.push('./login')"
        >
          {{ $t('_ho_27') }}
        </button>
      </div>
    </div>
    <div class="tj dp" id="sj">
      <div class="title">
        <div class="left">{{ $t('ho_25') }}</div>
        <div class="more cur_p" @click="router.push('/shop')">
          {{ $t('ho_24') }}<img src="../assets/home/more.png" />
        </div>
      </div>
      <swiper
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        :modules="modules"
        :slides-per-view="4"
        :space-between="50"
      >
        <swiper-slide v-for="x in shopList" :key="x.cat_id">
          <div class="list_s">
            <img
              v-if="x.shop_cover_image != null && x.shop_cover_image != ''"
              class="us_img"
              :src="x.shop_cover_image"
            />
            <img v-else class="us_img" src="../assets/home/user_img.png" />
            <div class="con">
              <div class="name">{{ x.shop_name }}</div>
              <div>{{ $t('_ho_22') }}：{{ x.goodsNum }}</div>
              <div>{{ $t('_ho_21') }}：{{ x.goodsNum }}</div>
              <div>{{ $t('_ho_20') }}：{{ x.star_rating }}</div>
            </div>
            <button @click="changeLoc(x)">{{ $t('_ho_19') }} ></button>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="tj hot_" id="hot">
      <div class="title">
        <div class="left">{{ $t('_ho_23') }}</div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in HotList"
          :key="x.goods_id"
          @click="
            isLogin
              ? router.push(`/comm_det?id=${x.goods_id}`)
              : router.push('/login')
          "
        >
          <div class="bq_">{{ $t('co_d_05') }} {{ x.visits }}</div>
          <img :src="x.cover_img" />
          <div class="ms">
            <div class="price">
              ${{ x.goods_price }}
              <p>{{ $t('co_d_06') }}:${{ x.goods_profit }}</p>
            </div>
            <div class="xl">
              <p>{{ $t('co_d_07') }}&nbsp;&nbsp;{{ x.day_sales_num }}</p>
            </div>
            <div class="name">
              {{ x.goods_name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="botmm">
      <div>
        <img src="../assets/1.png" />
        {{ $t('_ho_01') }}
      </div>
      <div>
        <img src="../assets/2.png" />
        {{ $t('_ho_02') }}
      </div>
      <div>
        <img src="../assets/3.png" />
        {{ $t('_ho_03') }}
      </div>
      <div>
        <img src="../assets/4.png" />
        {{ $t('_ho_04') }}
      </div>
    </div>
  </div>

  <OpenTip
    :openFyRule="fyRuleOpen"
    @changeFyRule="fyRuleOpen = false"
    :fyRule="rebateInfo.rules_desc"
  />
  <OpenTip :openEnter="enter" @changeEnter="enter = false" />

  <div class="cbl">
    <img @click="anchor('fl')" src="../assets/fl.png" />
    <img @click="anchor('tj')" src="../assets/tj.png" />
    <img @click="anchor('sj')" src="../assets/sj_icon.png" />
    <img @click="anchor('hot')" src="../assets/hot.png" />
    <img @click="anchor('top')" src="../assets/top.png" />
  </div>
</template>

<script setup lang="ts">
  import { Autoplay } from 'swiper/modules'
  const modules = [Autoplay]
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
    api_getHotGoodsList,
    api_getCat,
  } from '@/requset/api'
  import { getFloat } from '@/utils'
  import { goods_fl, goods_tj } from '@/base/index'
  import router from '@/router'
  import { ref } from 'vue'

  const fyRuleOpen = ref<boolean>(false)
  let goodsList = ref<goods_fl[]>([])
  let tjList = ref<goods_tj[]>([])
  const statisticsTab = ref<number>(0)
  let statisticsData = ref({
    total_profit: 0.0,
    pure_profit: 0.0,
    order_count: 0,
    goods_click: 0,
  })
  let ordersNumber = ref({
    orderStatus_0: 0,
    orderStatus_1: 0,
    orderStatus_2: 0,
    orderStatus_3: 0,
  })
  const userInfo = ref<any>({})
  const rebateInfo = ref<any>({})
  const shopList = ref<any>([])
  const HotList = ref<any>([])

  let enter = ref<boolean>(false)
  let isSeller = ref<boolean>(false)
  let isLogin = ref<boolean>(false)
  isLogin.value =
    sessionStorage.getItem('token') != null &&
    sessionStorage.getItem('token') != '' &&
    sessionStorage.getItem('token') != undefined

  function changeLoc(x: any) {
    sessionStorage.setItem('data', JSON.stringify(x))
    router.push(`/commodity?type=1&id=${x.id}`)
  }

  /*锚链接跳转*/
  function anchor(anchorName: string) {
    let anchorElement = document.getElementById(anchorName)
    console.log('anchorElement :>> ', anchorElement)
    if (anchorElement) {
      anchorElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }

  // 切换
  const changeStatisticsTab = (index: number) => {
    statisticsTab.value = index
    // today week month year
    let type =
      index == 0
        ? 'today'
        : index == 1
        ? 'week'
        : index == 2
        ? 'month'
        : index == 3
        ? 'year'
        : ''
    api_mainStatistics({ type }).then((res: any) => {
      if (res.success) {
        statisticsData.value = res.data
      }
    })
  }

  api_getHotGoodsList({ page: 1, pageSize: 18 }).then((res: any) => {
    if (res.success) {
      HotList.value = res.data.data
    }
  })

  if (isLogin.value == true) {
    api_rebateInfo({}).then((res: any) => {
      console.log('res :>> ', res)
      rebateInfo.value = res.data
    })

    api_goodsCategory({}).then((res: any) => {
      if (res.success) {
        goodsList.value = res.data
      }
    })

    api_getShopList({ keywords: '', page: 1, pageSize: 15 }).then(
      (res: any) => {
        if (res.success) {
          shopList.value = res.data.data
        }
      }
    )

    api_getOrderTypeNum({}).then((res: any) => {
      if (res.success) {
        ordersNumber.value = res.data
      }
    })

    api_getRecommendGoods({ page: 1, pageSize: 12 }).then((res: any) => {
      if (res.success) {
        tjList.value = res.data.data
      }
    })

    api_getInfo({}).then((res: any) => {
      if (res.success) {
        userInfo.value = { ...userInfo.value, ...res.data }
        // 是否领取过新手礼包
        // utype,0-买家 1-卖家
        isSeller.value = res.data.utype == 1
      }
    })
    changeStatisticsTab(0)
  } else {
    console.log('111 :>> ', 111)
    api_getCat({}).then((res: any) => {
      if (res.success) {
        goodsList.value = res.data
      }
    })

    api_getShopList_notLogin({ keywords: '', page: 1, pageSize: 15 }).then(
      (res: any) => {
        if (res.success) {
          shopList.value = res.data.data
        }
      }
    )
    api_getRecommendGoods_notLogin({ page: 1, pageSize: 12 }).then(
      (res: any) => {
        if (res.success) {
          tjList.value = res.data.data
        }
      }
    )
  }
</script>

<style lang="less" scoped>
  #home {
    .top {
      margin-bottom: 35px;
      display: flex;
      justify-content: space-between;
      .bor_1 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .user {
        height: 420px;
        background-image: url(../assets/home/user_bac.png);
        background-size: 100% 100%;
        width: 300px;
        padding: 16px 10px;
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
              align-items: center;
              justify-content: space-between;
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
                content: '';
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
    .sp_fl {
      padding-top: 10px;
      margin-bottom: 40px;
      min-height: 100px;
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
          font-size: 14px;
          img {
            position: relative;
            top: -1.5px;
            height: 12px;
            margin-left: 8px;
          }
        }
      }
      .list {
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        text-align: center;
        img {
          border: 1px solid #eee;
          padding: 8px;
          width: 60px;
          margin-bottom: 5px;
          border-radius: 4px;
        }
      }
    }

    .tj {
      margin-bottom: 10px;
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
          font-size: 14px;
          img {
            position: relative;
            top: -1.5px;
            height: 12px;
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
        flex-wrap: wrap;
        .boxList {
          width: 206px;
          position: relative;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          padding: 6px;
          margin-bottom: 30px;
          .bq_ {
            position: absolute;
            top: 6px;
            right: 6px;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            padding: 6px 10px;
            border-radius: 0 12px 0 12px;
            font-size: 12px;
          }
          img {
            width: 194px;
            height: 194px;
            border-radius: 8px;
            margin-bottom: 8px;
            object-fit: cover;
            // background-position:-26px -79px;
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
              color: #1d1e25;
              font-weight: 600;
              line-height: 20px;
              height: 40px;
              font-size: 14px;
            }
            .price {
              margin-bottom: 5px;
              display: flex;
              justify-content: space-between;
              color: #f40000;
              font-size: 20px;
              font-weight: 600;
              align-items: flex-end;
              p {
                font-size: 14px;
                font-weight: 400;
                color: #1d1e25;
                margin-bottom: 0;
                opacity: 0.8;
              }
            }
            .xl {
              p {
                opacity: 0.5 !important;
                color: #1d1e25 !important;
                font-size: 12px !important;
                margin-bottom: 5px !important;
              }
            }
          }
          &:hover {
            transform: scale(1.1);
            border: 1px solid #696969;
          }
        }
      }
    }
    .shop_ {
      margin-bottom: 40px;
      position: relative;
      img {
        width: 100%;
      }
      .txt {
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        div {
          font-size: 40px;
          font-weight: 600;
          line-height: 54px;
        }
        .price {
          font-size: 43px;
          color: #fa3835;
          margin-bottom: 10px;
        }
      }
      button {
        border-radius: 20px;
        height: 46px;
        color: #f1ce5a;
        background-color: #181818;
        padding: 0 40px;
        font-size: 18px;
      }
    }
    .dp {
      margin-bottom: 80px;
      .list_s {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .con {
          flex: 1;
          font-size: 14px;
          .name {
            font-size: 16px;
            margin-bottom: 5px;
            color: #000;
          }
          div {
            color: #575757;
          }
        }
        button {
          position: absolute;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 12px;
          background-color: #fcf2e2;
          color: #000;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
        }
        &:hover {
          border-color: #000;
        }
      }
    }
    .hot_ {
      margin-bottom: 60px;
      .shopList {
        background: none;
        padding: 0px;
        border-radius: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 400px;
        flex-wrap: wrap;
        .boxList {
          padding: 10px;
          width: 214px;
        }
      }
      img {
        object-fit: cover;
      }
    }

    .botmm {
      display: flex;
      justify-content: space-between;
      margin-bottom: 100px;
      div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img {
          width: 90px;
          margin-bottom: 10px;
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

  .cbl {
    position: fixed;
    background-color: #fff;
    bottom: 10%;
    left: 10%;
    z-index: 99;
    border-radius: 8px;
    img {
      width: 40px;
      height: 40px;
      padding: 5px;
    }
  }
</style>
