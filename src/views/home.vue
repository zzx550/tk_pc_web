<template>
  <div id="home" class="head_b">
    <TopSeek />
    <div class="top">
      <div class="shopClass">
        <div class="title">商品分类</div>
        <div class="box">
          <div class="list" v-for="x in 10" :key="x">
            <img src="../assets/home/icon_01.png" />服装配饰
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
          <div>
            1
            <p>待付款</p>
          </div>
          <div>
            1
            <p>待发货</p>
          </div>
          <div>
            1
            <p>已发货</p>
          </div>
          <div>
            23
            <p>已交付</p>
          </div>
        </div>
        <div class="yj">
          <div class="title">下级返佣<img src="../assets/home/wh.png" /></div>
          <div class="shuj">
            <div>
              1
              <p>销售总额</p>
            </div>
            <div>
              1
              <p>返佣总额</p>
            </div>
            <div style="color: #0ae2db">
              10%
              <p>返佣比例</p>
            </div>
          </div>
        </div>
        <div class="data">
          <div class="checkbox">
            <div class="check">本日</div>
            <div>本周</div>
            <div>本月</div>
            <div>整年</div>
          </div>
          <div class="img_data">
            <div style="margin-bottom: 8px">
              <p>销售价格</p>
              15953.00
            </div>
            <div style="margin-bottom: 8px">
              <p>预期利润</p>
              165.00
            </div>
            <div>
              <p>订单数量</p>
              12
            </div>
            <div>
              <p>访问量</p>
              1895
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tj">
      <div class="title">
        <div class="left">推荐商品</div>
        <div class="more cur_p" @click="router.push('/commodity')">
          更多<img src="../assets/home/more.png" />
        </div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in 5"
          :key="x"
          @click="router.push('/comm_det')"
        >
          <div class="bq_">访问量 75936</div>
          <img src="../assets/home/lbt.png" />
          <div class="ms">
            <div class="name">
              爱看书的急啊看实打实打算公开阿爱神的箭阿三阿达萨卡洛夫阿松大asdasd噶
            </div>
            <div class="price">
              $200.00
              <p>售价:$300</p>
            </div>
            <div class="xl">
              日销量&nbsp;&nbsp;1244&nbsp; &nbsp;&nbsp;周销量&nbsp;&nbsp;751356
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tj dp">
      <div class="title">
        <div class="left">推荐店铺</div>
        <div class="more cur_p" @click="router.push('/shop')">
          更多<img src="../assets/home/more.png" />
        </div>
      </div>
      <div class="shopList">
        <div
          class="boxList"
          v-for="x in 10"
          :key="x"
          @click="router.push('/commodity')"
        >
          <img class="img_" src="../assets/home/lbt.png" />
          <div class="name">
            <img class="us_img" src="../assets/home/user_img.png" />
            <div class="u_right">
              <div class="dpm">GETVBLK_AI</div>
              <div class="id">ID:9813311111115482</div>
              <div class="dj">
                <div class="fen">
                  <img v-for="x in 3" :key="x" src="../assets/home/xin.png" />
                  3.5分
                </div>
                三星商户
              </div>
              <div class="sp">
                当前商品
                <p>23</p>
                个
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fs">某某某公司</div>
</template>

<script setup lang="ts">
  import router from '@/router'
  import { ref } from 'vue'
</script>

<style lang="less" scoped>
  #home {
    .top {
      margin-bottom: 35px;
      display: flex;
      justify-content: space-between;
      .shopClass {
        height: 420px;
        padding: 20px 15px 10px;
        background-color: #fff;
        border-radius: 12px;
        width: 200px;
        .title {
          color: #1d1e25;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .box {
          height: 360px;
          overflow: auto;
        }
        .list {
          padding: 9.5px 0;
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
        .shuj {
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: 600;
            p {
              padding-top: 5px;
              color: #1d1e25;
              opacity: 0.7;
              font-size: 12px;
              margin-bottom: 0 !important;
            }
          }
        }
        .yj {
          padding: 10px;
          background-color: #f0fcfb;
          border-radius: 4px;
          .title {
            font-size: 12px;
            color: #1d1e25;
            opacity: 0.7;
            display: flex;
            align-items: center;
            img {
              width: 12px;
              height: 12px;
              margin-left: 10px;
            }
          }
          .shuj {
            padding-top: 8px;
            padding-bottom: 0;
            p {
              color: #1d1e25 !important;
            }
          }
        }
        .data {
          padding-top: 20px;
          .checkbox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            margin-bottom: 15px;
            div {
              font-size: 12px;
              color: #aaaaad;
            }
            .check {
              font-weight: 600;
              color: #1d1e25;
              position: relative;
              &:after {
                position: absolute;
                left: 50%;
                bottom: -4px;
                content: '';
                transform: translateX(-50%);
                background-color: #1d1e25;
                height: 2px;
                width: 70%;
              }
            }
          }
          .img_data {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            div {
              flex-shrink: 0;
              width: 48.5%;
              display: flex;
              flex-direction: column;
              padding: 13px 10px;
              font-weight: 600;
              border-radius: 4px;
              p {
                font-size: 12px;
                margin-bottom: 5px;
              }
              &:nth-child(1) {
                background-color: #f5fdfa;
                background-image: url(../assets/home/ji_1.png);
                background-size: 100% 100%;
              }
              &:nth-child(2) {
                background-color: #f5fafd;
                background-image: url(../assets/home/ji_2.png);
                background-size: 100% 100%;
              }
              &:nth-child(3) {
                background-color: #fef8f9;
                background-image: url(../assets/home/ji_3.png);
                background-size: 100% 100%;
              }
              &:nth-child(4) {
                background-color: #f8fafe;
                background-image: url(../assets/home/ji_4.png);
                background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    .tj {
      margin-bottom: 30px;
      .title {
        margin-bottom: 18px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        .left {
          font-weight: 600;
        }
        .more {
          display: flex;
          align-items: center;
          img {
            height: 18px;
            margin-left: 8px;
          }
        }
      }
      .shopList {
        background: linear-gradient(to bottom, #e4ecff, #fff);
        padding: 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .boxList {
          width: 254px;
          position: relative;
          .bq_ {
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.4);
            color: #fff;
            padding: 6px 10px;
            border-radius: 0 12px 0 12px;
            font-size: 12px;
          }
          img {
            width: 254px;
            height: 254px;
            border-radius: 8px;
          }
          .ms {
            padding-top: 10px;
            .name {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
              text-align: justify;
              margin-bottom: 10px;
              color: #1d1e25;
              font-weight: 600;
              line-height: 20px;
              height: 40px;
            }
            .price {
              display: flex;
              color: #f40000;
              margin-bottom: 10px;
              font-size: 22px;
              font-weight: 600;
              align-items: flex-end;
              p {
                font-size: 14px;
                font-weight: 400;
                margin-left: 10px;
                color: #1d1e25;
                margin-bottom: 0;
                opacity: 0.8;
              }
            }
            .xl {
              font-size: 14px;
              color: #1d1e25;
              opacity: 0.5;
            }
          }
        }
      }
    }
    .dp {
      margin-bottom: 80px;
      .shopList {
        padding: 0;
        background: #fff !important;
        flex-wrap: wrap;
        .boxList {
          width: 264px;
          border: 1px solid #edeeee;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
          .img_ {
            width: 234px;
            height: 234px;
            border-radius: 8px;
            margin-bottom: 8px;
          }
          .name {
            display: flex;
            align-items: flex-start;
            .us_img {
              width: 44px;
              height: 44px;
              margin-right: 4px;
            }
            .u_right {
              display: flex;
              flex-direction: column;
              .dpm {
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 10px;
              }
              .id {
                font-size: 14px;
                margin-bottom: 7px;
              }
              .dj {
                display: flex;
                font-size: 12px;
                margin-bottom: 7px;
                color: #1d1e25;
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
              .sp {
                font-size: 12px;
                display: flex;
                align-items: center;
                color: #1d1e25;
                p {
                  font-size: 12px;
                  color: #0ae1da;
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  .fs {
    background-color: #1d1e25;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
</style>
