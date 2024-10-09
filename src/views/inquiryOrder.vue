<template>
  <div id="inquiryOrder" class="head_b">
    <TopSeek :title="'询单列表'" />
    <div class="con">
      <div class="shop_l">
        <div class="list_T">
          <div class="img_name">商品图片/名称</div>
          <div class="two">客户信息</div>
          <div>IP</div>
          <div>购买时间</div>
          <div class="gm">操作</div>
        </div>
        <div class="list list_T" v-for="x in order" :key="x">
          <div class="img_name">
            <img class="shop_i" :src="x.last_msg_content.cover_img" />
            <div class="txt_3">
              {{ x.last_msg_content.goods_name }}
            </div>
          </div>
          <div class="two">
            <img :src="x.headimage" />
            <div>{{ x.nickname }}</div>
          </div>
          <div>{{ x.ip }}</div>
          <div>{{ x.create_time }}</div>
          <div class="gm">
            <div class="but pay" @click="getKF(x.consult_order_id)">联系</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    class="modal_wit"
    v-model:open="modal_fk"
    centered
    :footer="null"
    width="800px"
  >
    <div class="kf">
      <div class="title">专属客服</div>
      <!-- <div class="kf_bac">
        <div class="lef">
          <img class="tx" src="../assets/logo.png" />
          <div>dnasifajdaksd afkasdman阿卡莎开始</div>
        </div>
        <div class="rig">
          <div class="name">张三</div>
          <div class="con">dnasifajdaksd afkasdman阿卡莎开始</div>
        </div>
      </div> -->
      <div class="consult_list">
        <div
          class="item"
          :class="x.type == 0 ? 'item1' : 'item2'"
          v-for="(x, y) in messageChatList"
          :key="y"
        >
          <div class="name">
            <img
              v-if="x.type == 1 && x.shop_cover_image"
              :src="x.shop_cover_image"
            />
            <span v-if="x.type == 0 && x.consult_user.nickname">{{
              x.consult_user.nickname
            }}</span>
            <span v-if="x.type == 1">{{
              x.shop_name ? x.shop_name : x.nickname
            }}</span>
            <img
              v-if="x.type == 0 && x.consult_user.headimage"
              :src="x.consult_user.headimage"
            />
          </div>
          <div
            class="value"
            :class="x.type == 0 ? 'value1' : 'value2'"
            v-if="
              x.content.goods_id == undefined &&
              String(x.content).startsWith('http') == false
            "
          >
            <!-- 文本消息 -->
            <span :class="x.type == 0 ? 'content1' : 'content2'">{{
              x.content
            }}</span>
          </div>

          <div
            class="value"
            :class="x.type == 0 ? 'value1' : 'value2'"
            v-if="
              x.content.goods_id == undefined &&
              String(x.content).startsWith('http') == true
            "
          >
            <!-- 图片消息 -->
            <img :src="x.content" />
          </div>

          <div
            class="value"
            :class="x.type == 0 ? 'value1' : 'value2'"
            v-if="x.content.goods_id != undefined"
          >
            <!-- 商品消息 -->
            <img :src="x.content.cover_img" />
            <div class="good_detail">
              <span class="good_name">{{
                x.content.goods_name.length > 30
                  ? x.content.goods_name.substring(0, 30) + "..."
                  : x.content.goods_name
              }}</span>
              <span class="good_price">${{ x.content.goods_price }}</span>
            </div>
          </div>
          <div class="bottom_text" v-if="x.type == 0 && x.consult_user.country">
            {{ getCountryName(x.consult_user.country) }}
          </div>
          <div class="bottom_text" v-if="x.type == 0 && x.consult_user.ip">
            IP: {{ x.consult_user.ip }}
          </div>
          <div class="bottom_text">{{ x.create_time }}</div>
        </div>
      </div>

      <div class="fs_info">
        <a-textarea
          v-model:value="value1"
          :placeholder="'Autosize height based on content lines'"
          auto-size
        />
        <div class="but">
          <a-upload
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://tkg-api.zale.mobi/api/upload/uploadImg"
            @change="handleChangeUp"
          >
            <img src="../assets/img/up_img.png" />
          </a-upload>
          <div>发送</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
const { state } = useStore();
import type { UploadChangeParam } from "ant-design-vue";
import { message } from "ant-design-vue";
import { api_getConsultMsgList, api_getConsultMsgDetail } from "@/requset/api";
import { ref } from "vue";

let value1 = ref<any>("");
let imageUrl = ref<any>("");
let order = ref<any>([]);
let messageChatList = ref<any>([]);
let modal_fk = ref<boolean>(false);

const handleChangeUp = (info: UploadChangeParam) => {
  if (info.file.status === "done") {
    message.success("发送成功");
    imageUrl.value = info.file.response.data.http_url;
  }
};

function getList() {
  api_getConsultMsgList({}).then((res: any) => {
    if (res.success) {
      order.value = res.data;
    }
  });
}
getList();

function getKF(id: number) {
  api_getConsultMsgDetail({ co_id: id }).then((res: any) => {
    if (res.success) {
      messageChatList.value = res.data;
      modal_fk.value = true;
    }
  });
}

function getCountryName(country: any) {
  let name = "";
  Array.from(state.countryName).forEach((item: any) => {
    if (item["lang"] == country) {
      name = item["country"];
    }
  });
  return name;
}
</script>
<style lang="less" scoped>
#inquiryOrder {
  .con {
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
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
          flex: 1.5;
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
        .two {
          flex: 2;
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
            flex: 1.5;
            text-align: left;
            padding-right: 8px;
            font-size: 14px;
          }
        }
        .two {
          flex: 2;
          justify-content: left;
          display: flex;
          align-items: center;
          padding-left: 3%;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
          }
          div {
            flex: none;
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
  }
}

.modal_wit {
  .kf {
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    // .kf_bac {
    //   background-color: #eaf5f5;
    //   border-radius: 8px;
    //   padding: 15px;
    //   height: 500px;
    //   .lef {
    //     display: flex;
    //     align-items: flex-start;
    //     margin-bottom: 15px;
    //     .tx {
    //       border-radius: 8px;
    //       width: 50px;
    //       height: 50px;
    //     }
    //     div {
    //       background-color: #fff;
    //       border-radius: 0 8px 8px 8px;
    //       font-size: 16px;
    //       position: relative;
    //       top: 10px;
    //       padding: 8px 10px;
    //     }
    //   }
    //   .rig {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: flex-end;
    //     margin-bottom: 15px;
    //     .name {
    //       font-size: 15px;
    //       margin-bottom: 4px;
    //     }
    //     .con {
    //       background-color: #fff;
    //       border-radius: 0 8px 8px 8px;
    //       font-size: 16px;
    //       padding: 8px 10px;
    //     }
    //   }
    // }

    .consult_list {
      // display: flex;
      // flex-direction: column;
      // flex: 1;
      // padding: 15px;
      overflow-y: auto;
      height: 45vh;

      background-color: #eaf5f5;
      border-radius: 4px;
      padding: 15px;
      // height: 500px;

      .item {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;

        .name {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 5px;
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }

          span {
            font-size: 14px;
            color: #323232;
            font-weight: bold;
            margin-right: 5px;
            margin-left: 5px;
          }
        }

        .text {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .value {
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 5px;

          .content1 {
            font-size: 14px;
            color: white;
          }

          .content2 {
            font-size: 14px;
            color: #333333;
          }

          img {
            width: 100px;
            height: 100px;
            border-radius: 5px;
          }

          .good_detail {
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            .good_name {
              font-size: 14px;
              color: #333333;
            }
            .good_price {
              font-size: 14px;
              color: #fe2c55;
              padding-top: 10px;
            }
          }
        }

        .value1 {
          background-color: #0ae2db;
          border-radius: 8px;
          padding-left: 25px;
          justify-content: flex-end;
        }
        .value2 {
          background-color: white;
          border-radius: 8px;
          padding-right: 25px;
          justify-content: flex-start;
        }
        .bottom_text {
          font-size: 12px;
          color: #0b2959;
          margin-bottom: 5px;
        }
      }

      .item1 {
        margin-left: 30%;
        align-items: flex-end;
      }
      .item2 {
        margin-right: 30%;
        align-items: flex-start;
      }
    }

    .fs_info {
      padding-top: 20px;
      display: flex;
      align-items: center;
      .ant-input {
        min-height: 60px;
      }
      .but {
        display: flex;
        align-items: center;
        .ant-upload-wrapper {
          margin: 0 15px 0 30px;
        }
        ::v-deep .ant-upload {
          width: 40px !important;
          height: 40px !important;
          border-radius: 4px;
          border: none;
          height: 156px;
        }
        ::v-deep .ant-upload-wrapper {
          width: 40px !important;
        }
        img {
          width: 40px;
        }
        div {
          width: 100px;
          height: 40px;
          line-height: 40px;
          background-color: #0ae2db;
          border-radius: 4px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
</style>
