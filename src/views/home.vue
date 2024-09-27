<template>
  <div id="home" class="head_b">
    <TopSeek />
    <div class="top">
      <div class="shopClass">
        <div class="title">商品分类</div>
        <div class="box">
          <div class="list" v-for="x in 10" :key="x">
            <img src="../assets/home/icon_01.png" alt="" />服装配饰
          </div>
        </div>
      </div>
      <img src="../assets/home/lbt.png" width="880px" height="420px" />
      <div class="user">
        <div class="name">
          <img class="us_img" src="../assets/home/user_img.png" />
          <div class="u_right">
            <div class="id">ID:9813311111115482</div>
            <div class="dj">
              <div class="fen">
                <img v-for="x in 3" :key="x" src="../assets/home/xin.png" />
                3.5分
              </div>
              三星商户
            </div>
          </div>
        </div>
        <div class="shuj">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
</script>

<style lang="less" scoped>
  #home {
    .top {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      .shopClass {
        height: 420px;
        padding: 20px 15px;
        background-color: #fff;
        border-radius: 12px;
        width: 200px;
        .title {
          color: #1d1e25;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .box {
          height: 350px;
          overflow: auto;
        }
        .list {
          padding: 8px 0;

          display: flex;
          font-size: 14px;
          img {
            margin-right: 15px;
            width: 17px;
            height: 17px;
          }
        }
      }
      .user {
        height: 420px;
        background-image: url(../assets/home/user_bac.png);
        background-size: 100% 100%;
        width: 290px;
        padding: 16px 10px;
        .name {
          display: flex;
          align-items: center;
          .us_img {
            width: 48px;
            height: 48px;
            margin-right: 8px;
          }
          .u_right {
            display: flex;
            flex-direction: column;
            .id {
              font-weight: 600;
              margin-bottom: 5px;
            }
            .dj {
              display: flex;
              font-size: 12px;
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
          }
        }
      }
    }
  }
</style>
