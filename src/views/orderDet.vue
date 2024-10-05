<template>
  <div id="orderDet" class="head_b">
    <TopSeek :title="'商铺中心'" />
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
        <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="on">
          商品编号：234599451119859884&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单时间：2020-152
          -44 45:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应商：亚马逊
          <div><img src="../assets/img/kf.png" alt="" />联系买家</div>
        </div>
        <div class="zt">
          <div class="left_con">
            <div class="title">当前商品待发货</div>
            <div class="det">
              <div>收货人：迪丽热巴</div>
              <div>联系方式：1888888888888</div>
              <div class="ts">
                收货地址：迪丽热巴阿萨德卡积分卡安抚巾款式分卡安抚巾款式大方
              </div>
            </div>
          </div>
          <div class="right_con">
            <a-steps :current="1" :items="arr"></a-steps>
          </div>
        </div>
        <div class="shop_l">
          <div class="list_T">
            <div class="img_name">商品图片/名称</div>
            <div>数量</div>
            <div>售价($)</div>
            <div>购买价($)</div>
            <div>状态</div>
            <div class="gm">操作</div>
          </div>
          <div class="list list_T" v-for="x in 2" :key="x">
            <div class="img_name">
              <img class="shop_i" src="../assets/logo.png" />
              <div class="txt_3">
                啊可视对讲阿克苏京东卡手机打卡萨阿克苏登记卡手机打卡手机卡四大皆空ajs
              </div>
            </div>
            <div>170.00</div>
            <div>170.00</div>
            <div>30.00</div>
            <div class="zt_">
              <div v-if="x == 1">待发货</div>
              <div class="yjf" v-else-if="x == 2">已交付</div>
              <div class="dzf" v-else-if="x == 3">
                待支付 <van-count-down :time="300000" format="mm:ss" />
              </div>
              <div class="yfh" v-else>已发货</div>
            </div>
            <div class="gm">
              <div class="but pay" @click="open = true">立即支付</div>
              <div class="but" @click="openOr">取消订单</div>
            </div>
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
    <div class="title">确认付款</div>
    <div class="dz">
      <img src="../assets/img/dz.png" alt="" />
      <div class="adds">
        阿打卡结算单卡斯柯大家啊凯撒登记卡啊可接受的ka
        <div>张大大 1955456321</div>
      </div>
    </div>
    <div class="li">
      商品总数
      <div>1件</div>
    </div>
    <div class="li">
      支付方式
      <div><img src="../assets/logo.png" alt="" />钱包支付</div>
    </div>
    <div class="hj">
      <div class="price">
        合计：
        <p>$6000.00</p>
      </div>
      <div class="but" @click="$emit('changeAdd', true)">确认支付</div>
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
    <p class="tip">是否确定取消订单</p>
    <div class="but_">
      <div>确认</div>
      <div>取消</div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
  import { getFloat } from '@/utils/index'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'

  const current = ref(1)
  const seekValue = ref<string>('')
  const open = ref<boolean>(false)
  const openOr = ref<boolean>(false)
  const arr = [
    {
      title: '船运',
      description: '00:00:08',
    },
    {
      title: '匹配国际货物仓库',
      description: '00:00:08',
    },
    {
      title: '快递',
      description: '00:00:08',
    },
    {
      title: '快递',
      description: '00:00:08',
    },
    {
      title: '快递',
      description: '00:00:08',
    },
    {
      title: '运输',
      description: '00:00:08',
    },
  ]
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
