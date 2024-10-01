<template>
  <div id="ranking" class="head_b">
    <TopSeek :title="'商铺中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/user_shop')">
          商铺中心
        </div>
        <div class="line">></div>
        <div>产品排名</div>
      </div>
      <div class="txt_Con">
        <div class="list_T">
          <div class="title">排名</div>
          <div class="time">商品</div>
          <div class="txt">热度</div>
        </div>
        <div class="list list_T" v-for="x in 8" :key="x">
          <div class="title">
            <img v-if="x == 1" src="../assets/img/1.png" />
            <img v-else-if="x == 2" src="../assets/img/2.png" />
            <img v-else-if="x == 3" src="../assets/img/3.png" />
            <div v-else>{{ x }}</div>
          </div>
          <div class="time">
            <img class="shop_i" src="../assets/logo.png" />
            <div>
              啊可视对讲阿克苏京东卡手机打卡萨阿克苏登记卡手机打卡手机卡四大皆空ajs
            </div>
          </div>
          <div class="txt">{{ x * 100 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { api_GoodsRanking } from "@/requset/api";

let ranking = ref<any>([]);
api_GoodsRanking({}).then((res: any) => {
  if (res.success) {
    ranking.value.push(...res.data);
  }
});
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
