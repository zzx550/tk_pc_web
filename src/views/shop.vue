<template>
  <div id="shop" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/')">首页</div>
        <div class="line">></div>
        <div style="font-weight: 600">推荐店铺</div>
        <!-- <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索店铺" />
          <img @click="get()" class="icon" src="../assets/home/seek.png" />
        </div> -->
      </div>
      <div class="conte">
        <div class="shopList">
          <div
            class="boxList"
            @click="changeLoc(x)"
            v-for="x in shopList"
            :key="x.tiktok_id"
          >
            <div class="img_">
              <img
                v-for="item in x.hotGoods"
                :key="item.cat_id"
                :src="item.cover_img"
              />
            </div>
            <div class="name">
              <img class="us_img" :src="x.shop_cover_image" />
              <div class="u_right">
                <div class="dpm">{{ x.shop_name }}</div>
                <div class="id">ID:{{ x.tiktok_id }}</div>
                <div class="dj">
                  <div class="fen">
                    <img
                      v-for="item in x.tar_rating"
                      :key="item"
                      src="../assets/home/xin.png"
                    />
                    {{
                      x.score_star && x.score_star != '' && x.score_star != '0'
                        ? x.score_star + '分'
                        : ''
                    }}
                  </div>
                  {{
                    x.star_rating == 1
                      ? '一星商户'
                      : x.star_rating == 2
                      ? '二星商户'
                      : x.star_rating == 3
                      ? '三星商户'
                      : x.star_rating == 4
                      ? '四星商户'
                      : x.star_rating == 5
                      ? '五星商户'
                      : ''
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
          <div style="width: 256px" v-for="x in box" :key="x"></div>
        </div>
        <div class="bot_fy">
          <a-pagination
            v-model:current="current"
            :pageSize="15"
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
</template>
<script setup lang="ts">
  import { api_getShopList, api_getShopList_notLogin } from '@/requset/api'
  import router from '@/router'
  import { ref, watch } from 'vue'

  const current = ref(1)
  const seekValue = ref<string>('')
  const shopList = ref<any>([])
  const total = ref<number>(1)
  const box = ref(0)

  let isLogin = ref<boolean>(false)
  isLogin.value =
    sessionStorage.getItem('token') != null &&
    sessionStorage.getItem('token') != '' &&
    sessionStorage.getItem('token') != undefined

  function changeLoc(x: any) {
    sessionStorage.setItem('data', JSON.stringify(x))
    router.push(`/commodity?type=1&id=${x.id}`)
  }

  seekValue.value = router.currentRoute.value.query.value

  const get = () => {
    let promise =
      isLogin.value == true
        ? api_getShopList({
            keywords: seekValue.value,
            page: current.value,
            pageSize: 15,
          })
        : api_getShopList_notLogin({ page: current.value, pageSize: 15 })
    promise.then((res: any) => {
      if (res.success) {
        total.value = res.data.total
        shopList.value = res.data.data
        box.value = 5 - (total.value % 5)
      }
    })
  }
  get()

  const changeList = (page: number, pageSize: number) => {
    current.value = page
    get()
  }
</script>
<style lang="less" scoped>
  #shop {
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
        padding: 25px 20px;
        .shopList {
          padding: 0;
          background: #fff !important;
          flex-wrap: wrap;
          display: flex;
          justify-content: space-between;
          .boxList {
            width: 256px;
            border: 1px solid #edeeee;
            border-radius: 12px;
            padding: 10px;
            margin-bottom: 20px;
            .img_ {
              width: 226px;
              height: 226px;
              border-radius: 8px;
              margin-bottom: 12px;
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
                width: 44px;
                height: 44px;
                margin-right: 4px;
              }
              .u_right {
                display: flex;
                flex-direction: column;
                .dpm {
                  font-weight: 600;
                  font-size: 18px;
                  margin-bottom: 5px;
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
      .bot_fy {
        padding-top: 30px;
        text-align: right;
        margin-bottom: 50px;
      }
    }
  }
</style>
