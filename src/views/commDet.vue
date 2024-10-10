<template>
  <div id="commDet" class="head_b">
    <TopSeek :title="$t('to_03')" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/')">
          {{ $t('co_01') }}
        </div>
        <div class="line">></div>
        <div>{{ $t('co_02') }}</div>
      </div>
      <div class="conte">
        <div class="js_goods">
          <img class="yt" :src="goodsDet.cover_img" />
          <div class="right_con">
            <div class="name">{{ goodsDet.goods_name }}</div>
            <div class="price">
              <div><span>$</span>{{ goodsDet.goods_price }}</div>
              {{ $t('co_03') }}：${{ goodsDet.goods_profit }}
            </div>
            <div class="li">
              {{ $t('co_04') }}：<span>{{ goodsDet.visits }}</span>
            </div>
            <div class="li">
              {{ $t('co_05') }}：<span>{{ goodsDet.day_sales_num }}</span>
            </div>
            <div class="li">
              {{ $t('co_06') }}：<span>{{ goodsDet.week_sales_num }}</span>
            </div>
          </div>
        </div>
        <div class="det">
          <div class="title">{{ $t('co_07') }}</div>
          <div class="txt" v-html="goodsDet.goods_content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { api_goodsDetails } from '@/requset/api'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'

  const goodsDet = ref<any>({})

  api_goodsDetails({ goods_id: router.currentRoute.value.query.id }).then(
    (res: any) => {
      console.log('res :>> ', res)
      goodsDet.value = res.data
    }
  )
</script>
<style lang="less" scoped>
  #commDet {
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
        padding: 25px 30px;
        .js_goods {
          display: flex;
          margin-bottom: 50px;
          .yt {
            width: 600px;
            margin-right: 20px;
            border-radius: 4px;
          }
          .right_con {
            flex: 1;
            .name {
              font-weight: 600px;
              font-size: 18px;
              margin-bottom: 20px;
              line-height: 28px;
            }
            .price {
              display: flex;
              align-items: flex-end;
              color: rgba(29, 30, 37, 0.8);
              margin-bottom: 20px;
              div {
                color: red;
                font-weight: 600;
                font-size: 25px;
                margin-right: 15px;
                span {
                  font-size: 18px;
                  font-weight: 600;
                }
              }
            }
            .li {
              line-height: 40px;
              color: rgba(29, 30, 37, 0.5);
              span {
                color: #000;
              }
            }
          }
        }
        .det {
          .title {
            font-size: 18px;
            font-weight: 600;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .txt {
            padding-top: 20px;
            color: rgba(29, 30, 37, 0.8);
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
    }
  }
</style>
