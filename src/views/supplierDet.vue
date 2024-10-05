<template>
  <div id="supplierDet" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          商铺中心
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">供应商详情</div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div class="check">全部</div>
          <div>积木</div>
          <div>配件</div>
          <div>电脑与消耗品</div>
        </div>
        <div class="con_right">
          <div class="box_he">
            <div class="list_T">
              <div class="img_name">商品图片/名称</div>
              <div class="price">售价($)</div>
              <div class="price">利润($)</div>
              <div class="gm">购买价($)</div>
              <div class="sel">
                <a-dropdown placement="bottom">
                  <div @click.prevent class="ant-dropdown-link">
                    状态<DownOutlined />
                  </div>
                  <template #overlay>
                    <a-menu @click="onClick">
                      <a-menu-item key="1"> 展示中 </a-menu-item>
                      <a-menu-item key="2"> 已下架 </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
            <div class="list list_T" v-for="x in 3" :key="x">
              <div class="img_name">
                <img class="shop_i" src="../assets/logo.png" />
                <div class="txt_3">
                  啊可视对讲阿克苏京东卡手机打卡萨阿克苏登记卡手机打卡手机卡四大皆空ajs
                </div>
              </div>
              <div class="price">170.00</div>
              <div class="price">30.00</div>
              <div class="gm">140.00</div>
              <div class="sel">
                <div v-if="x != 2">展示中</div>
                <div v-else style="background-color: #e3e4e4">已下架</div>
              </div>
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
  import type { MenuProps } from 'ant-design-vue'
  import { ref } from 'vue'

  const current = ref(1)

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`点击了 ${key}`)
  }
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
