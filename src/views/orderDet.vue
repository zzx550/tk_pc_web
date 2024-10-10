<template>
  <div id="orderDet" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          商铺中心
        </div>
        <div class="line">></div>
        <div class="breadcrumb cur_p" @click="router.push('/order')">
          订单管理
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">详情</div>
        <!-- <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
          <img class="icon" src="../assets/home/seek.png" />
        </div> -->
      </div>
      <div class="conte">
        <div class="on">
          商品编号：{{
            order.order_sn
          }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单时间：{{
            order.create_time
          }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应商：{{
            order.supplier_name
          }}
          <div><img src="../assets/img/kf.png" />联系买家</div>
        </div>
        <div class="zt">
          <div class="left_con">
            <div class="title">当前商品待发货</div>
            <div class="det" v-if="order.address_info">
              <div>收货人：{{ order.address_info.full_name }}</div>
              <div>联系方式：{{ order.address_info.phone }}</div>
              <div class="ts">
                {{ order.address_info.address }}
              </div>
            </div>
          </div>
          <div class="right_con">
            <a-steps :current="current" :items="arr"></a-steps>
          </div>
        </div>
        <div class="shop_l">
          <div class="list_T">
            <div class="img_name">商品图片/名称</div>
            <div>数量</div>
            <div>商品售价($)</div>
            <div>商品进价($)</div>
            <div>状态</div>
            <div class="gm">操作</div>
          </div>
          <div class="list list_T" v-for="x in order.goods_info" :key="x">
            <div class="img_name">
              <img class="shop_i" :src="x.cover_img" />
              <div class="txt_3">
                {{ x.goods_name }}
              </div>
            </div>
            <div>{{ x.goods_num }}</div>
            <div>{{ x.goods_profit }}</div>
            <div>{{ x.goods_price }}</div>
            <div class="zt_">
              <!-- 0 待付款 1 准备发货 2 运输中 3 已到达 4 待结算 5 已结算  6 已取消 7-退货中 8-已退货 -->
              <div class="dzf" v-if="order.order_status == 0">
                待付款
                <!-- <van-count-down :time="300000" format="mm:ss" /> -->
              </div>
              <div v-if="order.order_status == 1">准备发货</div>
              <div class="yfh" v-if="x.order_status == 2">已发货</div>
              <div v-if="order.order_status == 6">已取消</div>
              <div v-if="order.order_status == 7">退货中</div>
              <div v-if="order.order_status == 8">已退货</div>
              <div class="yjf" v-else>已交付</div>
            </div>
            <div class="gm">
              <div
                class="but pay"
                v-if="order.order_status === 0"
                @click="openPay(order)"
              >
                立即支付
              </div>
              <div
                class="but"
                v-if="order.order_status === 3"
                @click="openOr = true"
              >
                退货
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <OpenTip
    :openSetPassword="setPasswordOpen"
    @changePassword="changePassword"
    :isWithdraw="false"
  />

  <a-modal
    class="modal_wit"
    v-model:open="open"
    centered
    :footer="null"
    width="471px"
  >
    <div class="title">确认付款</div>
    <div class="dz">
      <img src="../assets/img/dz.png" />
      <div class="adds">
        {{ order.address_info.address }}
        <div>{{ order.address_info.phone }} {{ order.address_info.phone }}</div>
      </div>
    </div>
    <div class="li">
      钱包余额
      <div>${{ getFloat(balance) }}</div>
    </div>
    <div class="li">
      支付方式
      <div><img src="../assets/logo.png" />钱包支付</div>
    </div>
    <div class="li">
      <input
        type="password"
        v-model="payPassword"
        :placeholder="'请输入安全密码'"
      />
    </div>
    <div class="hj">
      <div class="price">
        合计：
        <p>
          ${{ price
          }}{{
            unitData != null && unitRate != 0
              ? ` ≈  ${getFloat(price * unitRate)}${unitData}`
              : ''
          }}
        </p>
      </div>
      <div class="but" @click="handlePay">确认支付</div>
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="openOr"
    centered
    :footer="null"
    width="338px"
  >
    <div class="title">提示</div>
    <p class="tip">是否确定退货</p>
    <div class="but_">
      <div @click="applyReturnOrder">确认</div>
      <div @click="openOr = false">取消</div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
  import { useStore } from 'vuex'
  const { state } = useStore()
  import {
    api_wallet,
    api_pay,
    api_orderDetail,
    api_applyReturnOrder,
    api_optionDesc,
    api_getInfo,
    api_setPwd,
  } from '@/requset/api'
  import { getFloat } from '@/utils/index'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { message } from 'ant-design-vue'

  const route = useRoute()
  const current = ref<string | number>('')
  const seekValue = ref<string>('')
  const open = ref<boolean>(false)
  const openOr = ref<boolean>(false)
  const order = ref<any>([])
  const arr = ref<any>([
    { id: 1, title: '已发货', description: '' },
    { id: 2, title: '匹配国际货品仓库', description: '' },
    { id: 3, title: '快递收揽中', description: '' },
    { id: 4, title: '运输中', description: '' },
    { id: 5, title: '配送中', description: '' },
    { id: 6, title: '已签收', description: '' },
  ])
  let isShowLogi = ref<boolean>(false)
  const payPassword = ref<string>('')
  const userInfo = ref<any>({})
  const setPasswordOpen = ref<boolean>(false)
  const balance = ref<number>(0)
  const price = ref<number>(0)
  const unitData = ref<string>('')
  const unitRate = ref<number>(0)

  const getUserInfo = () => {
    api_getInfo({}).then((res: any) => {
      if (res.success) {
        userInfo.value = { ...userInfo.value, ...res.data }
      }
    })
  }
  getUserInfo()

  const changePassword = (change: boolean, pwd: string, repeat_pwd: string) => {
    if (change == true) {
      if (pwd == '' || pwd.length < 6) {
        message.error('请输入安全密码')
        return
      }
      if (repeat_pwd == '' || repeat_pwd.length < 6) {
        message.error('请再次输入安全密码')
        return
      }
      if (pwd != repeat_pwd) {
        message.error('2次安全密码不一致')
        return
      }

      message.loading('加载中...')
      api_setPwd({ password: repeat_pwd }).then((res: any) => {
        if (res.code == 200) {
          setPasswordOpen.value = false
          message.success('提交成功')
          getUserInfo()
        } else if (res.message) {
          message.error(res.message)
        }
      })
    } else {
      setPasswordOpen.value = false
    }
  }

  function getBalance() {
    api_wallet({}).then((res: any) => {
      if (res.success) {
        balance.value = res.data.cloud_balance
          ? Number(res.data.cloud_balance)
          : 0
      }
    })

    api_optionDesc({ name: 'exchange_rate' }).then((res: any) => {
      if (res.success) {
        unitRate.value = res.data
        Array.from(state.currencyUnit).forEach((item: any) => {
          if (
            item['lang'] != 'en' &&
            item['lang'] == sessionStorage.getItem('lang')
          ) {
            unitData.value = item['unit']
          }
        })
      }
    })
  }
  getBalance()

  function applyReturnOrder() {
    api_applyReturnOrder({ order_id: route.query.id }).then((res: any) => {
      if (res.success) {
        openOr.value = false
        message.success('退货成功')
        getBalance()
        getOrderDetail()
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }

  getOrderDetail()
  function getOrderDetail() {
    api_orderDetail({ order_id: route.query.id }).then((res: any) => {
      if (res.success) {
        order.value = res.data
        // 0 待付款 1 准备发货 2 运输中 3 已到达 4 待结算 5 已结算  6 已取消 7-退货中 8-已退货
        isShowLogi.value =
          order.value.order_status >= 2 && order.value.order_status <= 5
        Array.from(arr.value).forEach((item: any) => {
          if (item.id == 1 || item.id == 2 || item.id == 3 || item.id == 4) {
            item.description = order.value.ship_time
          } else if (item.id == 6) {
            item.description = order.value.arrival_time
          }

          if (isShowLogi.value == true) {
            if (order.value.order_status == 1) {
              current.value = 1
            }
            if (order.value.order_status == 2) {
              current.value = 4
            }
            if (order.value.arrival_time && order.value.order_status > 2) {
              current.value = 6
            }
          }
        })
      }
    })
  }

  let order_id = ''
  function openPay(item: any) {
    // 是否设置了安全密码
    if (userInfo.value.payword == null || userInfo.value.payword == '') {
      router.push('./set_pwd')
    } else {
      price.value = item.total_price
      order_id = item.order_id
      open.value = true
    }
  }

  function handlePay() {
    if (payPassword.value == '' || payPassword.value.length < 6) {
      message.error('请输入安全密码')
      return
    }
    api_pay({ order_id, pwd: payPassword.value }).then((res: any) => {
      if (res.success) {
        open.value = false
        message.success('支付成功')
        setTimeout(() => {
          getOrderDetail()
          getBalance()
        }, 1500)
      } else if (res.code == 201) {
        message.error('订单状态异常')
      } else if (res.code == 202) {
        message.error('资产余额不足')
      } else if (res.code == 203) {
        message.error('支付失败')
      } else if (res.code == 204) {
        message.error('商户交易已冻结，请联系客服')
      } else if (res.code == 209) {
        message.error('安全密码错误')
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }
</script>
<style lang="less" scoped>
  #orderDet {
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
        padding: 20px;
        .on {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          margin-bottom: 20px;
          div {
            display: flex;
            align-items: center;
            color: #0ae2db;
            font-size: 14px;
            font-weight: 600;
            img {
              width: 20px;
              margin-right: 5px;
            }
          }
        }
        .zt {
          display: flex;
          justify-content: space-between;
          border: 1px solid #eee;
          align-items: center;
          border-radius: 8px;
          margin-bottom: 25px;
          .left_con {
            padding: 20px;
            font-size: 14px;
            color: rgba(29, 30, 37, 0.8);
            padding: 15px;
            width: 410px;
            border-right: 1px solid #eee;
            border-radius: 8px;
            .title {
              font-weight: 600;
              font-size: 18px;
              margin-bottom: 10px;
            }
            .det {
              padding: 10px;
              background-color: #f6f7f9;
              border-radius: 4px;
              div {
                padding: 7px;
              }
              .ts {
                line-height: 22px;
              }
            }
          }
          .right_con {
            padding: 20px;
            flex: 1;
            ::v-deep .ant-steps-item-content {
              .ant-steps-item-title {
                font-size: 14px;
              }
              .ant-steps-item-description {
                font-size: 12px;
                text-align: center;
              }
            }
          }
        }
        .shop_l {
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
              .anticon {
                margin-left: 3px;
                font-size: 13px;
              }
            }
            .gm {
              flex: 0.6;
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
              .on {
                top: 0px;
                position: absolute;
                left: 0;
              }
              .shop_i {
                border-radius: 8px;
                width: 67px;
                height: 67px;
                margin-right: 10px;
              }
              div {
                color: #4a4b51;
                flex: 1;
                text-align: left;
                padding-right: 8px;
              }
            }

            .zt_ {
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
              display: flex;
              flex-direction: column;
              justify-content: center;
              width: 140px;
              .pay {
                color: #fff;
                border-radius: 4px;
                padding: 6px;
                background-color: #0ae2db;
                margin-bottom: 5px;
              }
              div {
                font-size: 14px;
              }
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
