<template>
  <div id="mineShop" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          商铺中心
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">我的店铺</div>
        <div class="seek">
          <input
            type="text"
            v-model="seekValue"
            placeholder="请输入好友ID"
            @change="changeStatus(3)"
          />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div :class="status == 3 ? 'check' : ''" @click="changeStatus(3)">
            全部
          </div>
          <div :class="status == 0 ? 'check' : ''" @click="changeStatus(0)">
            展示中
          </div>
          <div :class="status == 1 ? 'check' : ''" @click="changeStatus(1)">
            已下架
          </div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div class="img_name">商品图片/名称</div>
              <div class="price">访问量</div>
              <div class="price">日销量</div>
              <div class="price">周销量</div>
              <div class="gm">售价($)</div>
            </div>
            <div
              class="list list_T"
              v-for="item in goodShowcaseList"
              :key="item.id"
            >
              <div class="img_name">
                <img class="shop_i" :src="item.goods.cover_img" />
                <div class="txt_3">
                  {{ item.goods.goods_name }}
                </div>
              </div>
              <div class="price">{{ item.goods.visits }}</div>
              <div class="price">{{ item.goods.day_sales_num }}</div>
              <div class="price">{{ item.goods.week_sales_num }}</div>
              <div class="gm">{{ item.goods.goods_profit }}</div>
            </div>
            <div class="no_data" v-if="goodShowcaseList.length < 1">
              <img style="width: 20%" src="../assets/img/no_data.png" />
              <div>无数据</div>
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
  import { api_myGoods } from '@/requset/api'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref, watch } from 'vue'

  const current = ref(1)
  const total = ref(0)
  const status = ref<string | number>(3)
  const seekValue = ref<string>('')
  const goodShowcaseList = ref<any>([])

  const changeList = (page: number, pageSize: number) => {
    current.value = page
    get()
  }

  function changeStatus(index: number) {
    status.value = index
    get()
  }

  const get = () => {
    api_myGoods({
      tiktok_id: seekValue.value,
      status: status.value,
      page: current.value,
      pageSize: 10,
    }).then((res: any) => {
      if (res.success) {
        total.value = res.data.total
        goodShowcaseList.value = res.data.data
      }
    })
  }
  get()
</script>
<style lang="less" scoped>
  #mineShop {
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
            cursor: pointer;
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
            min-height: 600px;
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
                margin-left: 0;
                display: flex;
                align-items: center;
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
                }
              }
              .gm {
                color: #f40000;
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
