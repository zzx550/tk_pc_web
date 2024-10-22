<template>
  <div id="order" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          {{ $t('to_03') }}
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">{{ $t('or_01') }}</div>
        <div class="seek">
          <input type="text" v-model="seekValue" :placeholder="$t('or_02')" />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div :class="tabIndex == 0 ? 'check' : ''" @click="changeTab(0)">
            {{ $t('or_03') }}
          </div>
          <div :class="tabIndex == 1 ? 'check' : ''" @click="changeTab(1)">
            {{ $t('or_04') }}
          </div>
          <div :class="tabIndex == 2 ? 'check' : ''" @click="changeTab(2)">
            {{ $t('or_05') }}
          </div>
          <div :class="tabIndex == 3 ? 'check' : ''" @click="changeTab(3)">
            {{ $t('or_06') }}
          </div>
          <div :class="tabIndex == 4 ? 'check' : ''" @click="changeTab(4)">
            {{ $t('or_07') }}
          </div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div>{{ $t('or_08') }}</div>
              <div class="img_name">{{ $t('or_09') }}</div>
              <div class="xx">客户信息</div>
              <div>{{ $t('or_10') }}($)</div>
              <div>{{ $t('or_11') }}($)</div>
              <div>{{ $t('or_12') }}</div>
              <div class="gm">{{ $t('or_13') }}</div>
            </div>
            <div class="list list_T" v-for="x in orderList" :key="x">
              <div class="on">{{ x.order_sn }}</div>
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
                  {{ $t('or_04') }}
                  <!-- <van-count-down :time="300000" format="mm:ss" /> -->
                </div>
                <div v-else-if="x.order_status == 1">{{ $t('or_14') }}</div>
                <div class="yfh" v-else-if="x.order_status == 2">
                  {{ $t('or_06') }}
                </div>
                <div v-else-if="x.order_status == 6">{{ $t('or_15') }}</div>
                <div v-else-if="x.order_status == 7">{{ $t('or_16') }}</div>
                <div v-else-if="x.order_status == 8">{{ $t('or_17') }}</div>
                <div class="yjf" v-else>{{ $t('or_07') }}</div>
              </div>
              <div
                class="gm cur_p"
                @click="router.push(`/order_det?id=${x.order_id}`)"
              >
                {{ $t('or_18') }}
              </div>
            </div>
            <div class="no_data" v-if="orderList.length < 1">
              <img style="width: 20%" src="../assets/img/no_data.png" />
              <div>{{ $t('or_19') }}</div>
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
</template>
<script setup lang="ts">
  import { api_orderList } from '@/requset/api'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getFloat } from '@/utils'

  const route = useRoute()
  const current = ref(1)
  const seekValue = ref<string>('')
  const tabIndex = ref<number>(0)
  const orderList = ref<any>([])
  const total = ref(0)

  const changeTab = (index: number) => {
    console.log('index = ', index)
    tabIndex.value = index
    get()
  }

  const changeList = (page: number, pageSize: number) => {
    current.value = page
    get()
  }

  function get() {
    api_orderList({
      order_status: tabIndex.value == 0 ? '' : tabIndex.value - 1,
      page: current.value,
      pageSize: 10,
    }).then((res: any) => {
      if (res.success) {
        total.value = res.data.total
        orderList.value = res.data.data
      }
    })
  }

  if (route.query.tabIndex) {
    console.log('tabIndex = ', route.query.tabIndex)
    let tabIndex = Number(route.query.tabIndex)
    changeTab(tabIndex)
  } else {
    changeTab(0)
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
              content: ' ';
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
              .img_name {
                position: relative;
                margin-left: 0;
                display: flex;
                align-items: center;
                padding-top: 28px;
                // .on {
                //   top: 0px;
                //   position: absolute;
                //   left: 0;
                // }
                .goods_info {
                  display: flex;
                  align-items: center;
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
</style>
