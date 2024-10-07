<template>
  <div id="news" class="head_b">
    <TopSeek :title="'消息中心'" />
    <div class="con_box">
      <div class="title_l">
        <div class="breadcrumb cur_p">消息中心</div>
        <div class="right cur_p">全部已读</div>
      </div>
      <div class="conte">
        <div class="left_t">
          <!-- <div >全部</div> -->
          <div :class="type == 1 ? 'check' : ''" @click="changeType(1)">
            风险警告
          </div>
          <div :class="type == 2 ? 'check' : ''" @click="changeType(2)">
            系统公告
          </div>
        </div>
        <div class="con_right">
          <div class="list" v-for="x in noticeList" :key="x">
            <img v-if="x != 2" src="../assets/img/xx_icon.png" />
            <img v-else src="../assets/img/xx_icon_f.png" />
            <div class="txt">
              <div class="t_top">
                <div>{{ x.title }}</div>
                <div class="time">{{ x.create_time }}</div>
              </div>
              <div class="txt_p txt_3" v-html="x.content"></div>
            </div>
            <div
              class="but"
              :style="x.is_read == 1 ? { 'background-color': '#e3e4e4' } : ''"
            >
              <div v-if="x.is_read == 1">已读</div>
              <div v-else @click="goDet(x.id)">查看</div>
            </div>
          </div>
          <div class="no_data" v-if="noticeList.length < 1">
            <img style="width: 20%" src="../assets/img/no_data.png" />
            <div>无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { api_newsList, api_updateNewsStatus } from '@/requset/api'
  import router from '@/router'
  import { ref } from 'vue'

  let type = ref<number>(1) //  1-风控提示 2-系统公告
  const noticeList = ref<any[]>([])

  function changeType(index: number) {
    type.value = index
    getList()
  }

  function goDet(id: number) {
    api_updateNewsStatus({ id }).then((res: any) => {
      if (res.success) {
        router.push(`/new_det?id=${id}`)
      }
    })
  }

  function getList() {
    api_newsList({ type: type.value }).then((res: any) => {
      if (res.success) {
        noticeList.value = res.data
      }
    })
  }
  getList()
</script>
<style lang="less" scoped>
  #news {
    .con_box {
      background-color: #fff;
      border-radius: 12px;
      .title_l {
        border-bottom: 1px solid rgba(211, 211, 211, 0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .breadcrumb {
          padding: 20px 18px;
          font-size: 18px !important;
          font-weight: 600 !important;
        }
        .right {
          color: #0ae2db;
          font-size: 12px;
          padding: 15px;
        }
      }

      .conte {
        min-height: 600px;
        display: flex;
        justify-content: space-between;
        .left_t {
          flex: 0 0 200px;
          padding: 10px;
          width: 200px;
          border-right: 1px solid rgba(211, 211, 211, 0.5);
          div {
            padding: 8px 15px;
            cursor: pointer;
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
          flex: 1;
          .list {
            padding: 20px 0px 20px 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(211, 211, 211, 0.5);
            margin-right: 20px;
            position: relative;
            img {
              position: absolute;
              width: 20px;
              left: 20px;
              top: 20px;
            }
            .txt {
              margin: 0 10px 0 30px;
              flex: 1;
              padding-right: 40px;
              .t_top {
                display: flex;
                justify-content: space-between;
              }
              .time {
                font-size: 14px;
                color: #8d8e91;
              }
              .txt_p {
                flex: 1;
                font-size: 14px;
                color: #8d8e91;
                padding-top: 10px;
              }
            }
            .but {
              padding: 8px 20px;
              background-color: #0ae2db;
              border-radius: 4px;
              color: #fff;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
