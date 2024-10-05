<template>
  <div id="shopDet" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          商铺中心
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">订单管理</div>
        <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div class="check">全部</div>
          <div>代付款</div>
          <div>待发货</div>
          <div>已发货</div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div class="img_name">商品图片/名称</div>
              <div class="xx">客户信息</div>
              <div>售价($)</div>
              <div>购买价($)</div>
              <div>状态</div>
              <div class="gm">操作</div>
            </div>
            <div class="list list_T" v-for="x in 8" :key="x">
              <div class="img_name">
                <div class="on">商品编号：57485852458</div>
                <img class="shop_i" src="../assets/logo.png" />
                <div class="txt_3">
                  啊可视对讲阿克苏京东卡手机打卡萨阿克苏登记卡手机打卡手机卡四大皆空ajs
                </div>
              </div>
              <div class="xx">asd爱都开始的阿斯顿爱高速费</div>
              <div>170.00</div>
              <div>30.00</div>
              <div class="zt">
                <div v-if="x == 1">待发货</div>
                <div class="yjf" v-else-if="x == 2">已交付</div>
                <div class="dzf" v-else-if="x == 3">
                  待支付 <van-count-down :time="300000" format="mm:ss" />
                </div>
                <div class="yfh" v-else>已发货</div>
              </div>
              <div class="gm">详情</div>
            </div>
          </div>
          <div class="bot_fy">
            <a-pagination
              v-model:current="current"
              :total="100"
              show-less-items
              :hideOnSinglePage="true"
              :showSizeChanger="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'

  const current = ref(1)
  const seekValue = ref<string>('')
</script>
<style lang="less" scoped>
  #shopDet {
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
                .on {
                  top: 0px;
                  position: absolute;
                  left: 0;
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
