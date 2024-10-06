<template>
  <div id="commodity" class="head_b">
    <TopSeek :title="'首页'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p" @click="router.push('/')">首页</div>
        <div class="line">></div>
        <div style="font-weight: 600">推荐商品</div>
        <div class="seek">
          <input type="text" v-model="seekValue" placeholder="请输入搜索内容" />
          <img class="icon" src="../assets/home/seek.png" />
        </div>
      </div>
      <div class="conte">
        <div class="left_t">
          <div class="check">全部</div>
          <div>口红</div>
          <div>包包</div>
          <div>香水</div>
        </div>
        <div class="con_right">
          <div class="shopList">
            <div class="boxList" v-for="x in 15" :key="x">
              <div class="bq_">访问量 75936</div>
              <img class="pr_con" src="../assets/home/lbt.png" />
              <div class="ms">
                <div class="name">
                  爱看书的急啊看实打实打算公开阿爱神的箭阿三阿达萨卡洛夫阿松大asdasd噶
                </div>
                <div class="price">
                  $200.00
                  <p>售价:$300</p>
                </div>
                <div class="xl">
                  日销量&nbsp;&nbsp;1244&nbsp;
                  &nbsp;&nbsp;周销量&nbsp;&nbsp;751356
                </div>
              </div>
            </div>
          </div>
          <div class="bot_fy">
            <a-pagination
              :current="current"
              :pageSize="15"
              :total="total"
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
  import { api_getRecommendGoods } from '@/requset/api'
  import { DownOutlined } from '@ant-design/icons-vue'
  import router from '@/router'
  import { ref } from 'vue'

  const current = ref(1)
  const page = ref<number>(1)
  const total = ref<number>(1)
  const goodsList = ref<object[]>([])
  const seekValue = ref<string>('')

  api_getRecommendGoods({
    page,
    pageSize: 15,
  }).then((res: any) => {
    if (res.success) {
      total.value = res.data.total
      if (page >= res.data.last_page) {
        goodsList.value = res.data.data
        console.log('goodsList.value :>> ', goodsList.value)
      }
    }
  })
</script>
<style lang="less" scoped>
  #commodity {
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
          .shopList {
            padding: 5px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .boxList {
              width: 215px;
              position: relative;
              margin-bottom: 20px;
              border: 1px solid #e3e4e4;
              padding: 13px;
              border-radius: 12px;
              .bq_ {
                position: absolute;
                z-index: 2;
                top: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.4);
                color: #fff;
                padding: 6px 10px;
                border-radius: 0 12px 0 12px;
                font-size: 12px;
              }
              img {
                width: 185px;
                height: 185px;
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
                  font-size: 14px;
                }
                .price {
                  display: flex;
                  color: #f40000;
                  margin-bottom: 10px;
                  font-size: 18px;
                  font-weight: 600;
                  align-items: flex-end;
                  p {
                    font-size: 12px;
                    font-weight: 400;
                    margin-left: 10px;
                    color: #1d1e25;
                    margin-bottom: 0;
                    opacity: 0.8;
                  }
                }
                .xl {
                  font-size: 12px;
                  color: #1d1e25;
                  opacity: 0.5;
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
