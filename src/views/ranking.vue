<template>
  <div id="ranking" class="head_b">
    <TopSeek />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          {{ $t('to_03') }}
        </div>
        <div class="line">></div>
        <div style="font-weight: 600">{{ $t('ra_01') }}</div>
      </div>
      <div class="txt_Con">
        <div class="list_T">
          <div class="title">{{ $t('ra_02') }}</div>
          <div class="time">{{ $t('ra_03') }}</div>
          <div class="txt">{{ $t('ra_04') }}</div>
        </div>
        <div class="list list_T" v-for="(x, y) in ranking" :key="x.id">
          <div class="title">
            <img v-if="y == 0" src="../assets/img/1.png" />
            <img v-else-if="y == 1" src="../assets/img/2.png" />
            <img v-else-if="y == 2" src="../assets/img/3.png" />
            <div v-else>{{ y + 1 }}</div>
          </div>
          <div class="time">
            <img class="shop_i" src="../assets/logo.png" />
            <div>{{ x.goods_names }}</div>
          </div>
          <div class="txt">{{ x.ranking_value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import router from '@/router'
  import { ref } from 'vue'
  import { api_GoodsRanking } from '@/requset/api'

  interface Item {
    id: number
    goods_names: string
    ranking_value: string
  }

  let ranking = ref<Item[]>([])

  api_GoodsRanking({}).then((res: any) => {
    if (res.code == 200) {
      ranking.value = res.data
      console.log('ranking :>> ', ranking.value)
    }
  })
</script>
<style lang="less" scoped>
  #ranking {
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
      .txt_Con {
        padding: 15px;
        .list_T {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          background-color: #f6f7f9;
          padding: 8px 0;
          border-radius: 4px;
          .title {
            flex: 1;
          }
          .time {
            flex: 8;
          }
          .txt {
            flex: 1;
          }
        }
        .list {
          background-color: #fff;
          padding: 15px 0;
          .title {
            font-size: 20px;
            color: #8d8e91;
            img {
              margin: 0 auto;
              width: 50px;
            }
          }
          .time {
            padding: 0 20px;
            display: flex;
            align-items: center;
            .shop_i {
              border-radius: 8px;
              width: 56px;
              height: 56px;
              margin-right: 10px;
            }
            div {
              flex: 1;
              text-align: left;
            }
          }
          .txt {
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
