<template>
  <div id="supplierDet" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          {{ $t('to_03') }}
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">{{ $t('su_01') }}</div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div :class="active == '' ? 'check' : ''" @click="changeCat('')">
            {{ $t('su_02') }}
          </div>
          <div
            :class="active == x.cat_id ? 'check' : ''"
            @click="changeCat(x.cat_id)"
            v-for="x in cateList"
            :key="x.id"
          >
            {{ x.cat_name }}
          </div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div class="img_name">{{ $t('su_03') }}</div>
              <div class="price">{{ $t('su_04') }}($)</div>
              <div class="gm">{{ $t('su_05') }}($)</div>
              <div class="price">{{ $t('su_06') }}($)</div>
              <div class="sel">
                <a-dropdown placement="bottom">
                  <div @click.prevent class="ant-dropdown-link">
                    {{ $t('su_07') }}
                    <!-- <DownOutlined /> -->
                  </div>
                  <!-- <template #overlay>
                    <a-menu @click="onClick">
                      <a-menu-item key="1"> 展示中 </a-menu-item>
                      <a-menu-item key="2"> 已下架 </a-menu-item>
                    </a-menu>
                  </template> -->
                </a-dropdown>
              </div>
            </div>
            <div class="list list_T" v-for="x in goodsList" :key="x">
              <div class="img_name">
                <img class="shop_i" :src="x.cover_img" />
                <div class="txt_3">
                  {{ x.goods_name }}
                </div>
              </div>
              <div class="price">{{ x.goods_profit }}</div>
              <div class="price">{{ x.goods_price }}</div>
              <div class="gm">
                {{ jsAll(x.goods_profit, x.goods_price) }}
              </div>
              <div class="sel">
                <div
                  v-if="x.ug_status != null && x.ug_status == 0"
                  @click="changeOpen(x)"
                >
                  {{ $t('su_08') }}
                </div>
                <div v-else style="background-color: #e3e4e4">
                  {{ $t('su_09') }}
                </div>
              </div>
            </div>
            <div class="no_data" v-if="goodsList.length < 1">
              <img style="width: 20%" src="../assets/img/no_data.png" />
              <div>{{ $t('su_10') }}</div>
            </div>
          </div>

          <div class="bot_fy">
            <a-pagination
              v-model:current="current"
              :total="total"
              :pageSize="15"
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
    v-model:open="openOr"
    centered
    :footer="null"
    width="338px"
  >
    <div class="title">{{ $t('su_11') }}</div>
    <p class="tip">{{ $t('su_12') }}</p>
    <div class="but_">
      <div @click="handleRemove()">{{ $t('su_13') }}</div>
      <div @click="openOr = false">{{ $t('su_14') }}</div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
  import i18n from '@/lang'
  import {
    api_goodsList,
    api_goodsCategory,
    api_removeGood,
    api_getOption,
  } from '@/requset/api'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { message, type MenuProps } from 'ant-design-vue'
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { get } from 'vant/lib/utils'
  import { getFloat } from '@/utils'
  const route = useRoute()

  const current = ref(1)
  const active = ref<string | number>('')
  const cateList = ref<any>([])
  const goodsList = ref<any>([])
  const total = ref(0)
  const isOpenRemove = ref(true)
  const openOr = ref(false)

  api_getOption({}).then((res: any) => {
    isOpenRemove.value = res.data.open_user_delist_goods == 1
  })

  api_goodsCategory({}).then((res: any) => {
    if (res.success) {
      cateList.value = res.data
      active.value = ''
      getList()
    }
  })

  function jsAll(x: any, y: any) {
    let c = x.replace(',', '')
    console.log('x :>> ', x)
    return getFloat(Number(c) - Number(y))
  }

  let data = ref<any>({})
  function changeOpen(x: any) {
    data.value = x
    openOr.value = true
  }

  function handleRemove() {
    if (isOpenRemove.value == false) {
      message.error(i18n.global.t('su_15'))
      openOr.value = false
      return
    }
    if (data.value.is_delist_goods == false) {
      return
    }
    api_removeGood({ goods_id: data.value.goods_id }).then((res: any) => {
      if (res.success) {
        message.success(i18n.global.t('su_16'))
        getList()
        openOr.value = false
      }
    })
  }

  const changeList = (page: number, pageSize: number) => {
    current.value = page
    getList()
  }

  function changeCat(id: string | number) {
    active.value = id
    current.value = 1
    getList()
  }

  function getList() {
    api_goodsList({
      supplier_id: route.query.supplier_id,
      cat_id: active.value,
      page: current.value,
      pageSize: 15,
    }).then((res: any) => {
      if (res.success) {
        total.value = res.data.total
        goodsList.value = res.data.data
      }
    })
  }

  // const onClick: MenuProps['onClick'] = ({ key }) => {
  //   console.log(`点击了 ${key}`)
  // }
</script>
<style lang="less" scoped>
  #supplierDet {
    .con_box {
      background-color: #fff;
      border-radius: 12px;
      .title_l {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
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
              div {
                flex: 1;
                color: #484950;
              }
              .sel {
                flex: 0.7;
                color: #000;
                cursor: pointer;
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
  .modal_wit {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .dz {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(29, 30, 37, 0.08);
      margin-bottom: 20px;
      background: #fff;
      img {
        width: 26px;
        margin-right: 15px;
      }
      .adds {
        flex: 1;
        font-weight: 600;
        font-size: 16px;
        div {
          font-size: 14px;
          color: #8d8e91;
        }
      }
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
    .tip {
      text-align: center;
      font-weight: 600;
      padding: 10px 30px;
      margin-bottom: 30px;
    }
    .but_ {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      div {
        border-radius: 4px;
        padding: 8px 20px;
        cursor: pointer;
        &:nth-child(1) {
          border: 1px solid #eee;
        }
        &:nth-child(2) {
          border: 1px solid #0ae2db;
          background-color: #0ae2db;
          color: #fff;
        }
      }
    }
  }
</style>
