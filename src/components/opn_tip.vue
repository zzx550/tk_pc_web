<template>
  <a-modal
    class="modal_wit"
    v-model:open="props.openAdd"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeAdd', false, '')"
  >
    <div class="title">添加供应商</div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="text"
      class="pr_con"
      v-model="supplier_num"
      :placeholder="'请输入供应商编号'"
    />
    <div class="but pr_con" @click="$emit('changeAdd', true, supplier_num)">
      提交
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openShopName"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeShopName', false, '')"
  >
    <div class="title">
      {{ props.isUpdateShopName == true ? "修改" : "添加" }}店铺名称
    </div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="text"
      class="pr_con"
      v-model="shop_name"
      :placeholder="'请输入店铺名称'"
    />
    <div class="but pr_con" @click="$emit('changeShopName', true, shop_name)">
      提交
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openCz"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeCz', false)"
  >
    <div class="title">充值提示</div>
    <img class="pr_con" src="../assets/home/cz.png" />
    <div class="txt">由于各国家商户承销币种问题，目前充值需联系客服</div>
    <div
      style="width: 180px"
      class="but pr_con"
      @click="$emit('changeCz', true)"
    >
      联系客服
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openLlb"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeLlb', false)"
  >
    <div class="title">流量包</div>
    <img class="pr_con" src="../assets/img/llb.png" />
    <div class="pr_con llb">
      新人扶持流量包
      <div>领取百万商品</div>
    </div>
    <div
      v-if="props.llbHasGet"
      class="but pr_con"
      style="background-color: #e3e4e4"
    >
      已领取
    </div>
    <div v-else class="but pr_con" @click="$emit('changeLlb', true)">领取</div>

    <div class="box_rec">
      <div class="title">
        <div>活动规则</div>
      </div>
      <div class="content_" v-html="props.llbRule"></div>
    </div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openFyRule"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changeFyRule', false)"
  >
    <div class="title">返佣规则</div>
    <div class="txt" v-html="props.fyRule"></div>
  </a-modal>

  <a-modal
    class="modal_wit"
    v-model:open="props.openSetPassword"
    centered
    :footer="null"
    width="561px"
    @cancel="$emit('changePassword', false, '', '')"
  >
    <div class="title">
      设置{{ props.isWithdraw == true ? "提现" : "安全" }}密码
    </div>
    <img class="pr_con" src="../assets/home/add.png" />
    <input
      type="password"
      class="pr_con"
      :style="{ marginTop: '35px', marginBottom: '20px' }"
      v-model="pwd"
      :placeholder="
        '请输入' + (props.isWithdraw == true ? '提现' : '安全') + '密码'
      "
    />
    <input
      type="password"
      class="pr_con"
      :style="{ marginTop: 0 }"
      v-model="repeat_pwd"
      :placeholder="
        '请再次输入' + (props.isWithdraw == true ? '提现' : '安全') + '密码'
      "
    />
    <div
      class="but pr_con"
      @click="$emit('changePassword', true, pwd, repeat_pwd)"
    >
      提交
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, defineProps, defineEmits, watch } from "vue";

const emit = defineEmits([
  "changeAdd",
  "changeCz",
  "changeHy",
  "changeLlb",
  "changeShopName",
  "changeFyRule",
  "changePassword",
]);

const props = defineProps({
  openCz: {
    type: Boolean,
    require: false,
  },
  openAdd: {
    type: Boolean,
    require: false,
  },
  openLlb: {
    type: Boolean,
    require: false,
  },
  llbRule: {
    type: String,
    require: "",
  },
  llbHasGet: {
    type: String,
    require: "",
  },
  openShopName: {
    type: Boolean,
    require: false,
  },
  isUpdateShopName: {
    type: Boolean,
    require: false,
  },
  openFyRule: {
    type: Boolean,
    require: false,
  },
  fyRule: {
    type: String,
    require: "",
  },
  openSetPassword: {
    type: Boolean,
    require: false,
  },
  isWithdraw: {
    type: Boolean,
    require: false,
  },
});
const shop_name = ref<string>("");
const supplier_num = ref<string>("");
const pwd = ref<string>("");
const repeat_pwd = ref<string>("");
</script>

<style lang="less" scoped>
.modal_wit {
  .title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  img {
    width: 120px;
  }
  input {
    background-color: #f6f7f9 !important;
    height: 42px !important;
    width: 333px !important;
    border-radius: 4px !important;
    margin-left: 20px !important;
    margin: 20px 0 35px;
  }
  .yqm {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    text-align: center;
    div {
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      img {
        width: 15px;
        margin-left: 5px;
      }
    }
  }
  .llb {
    text-align: center;
    font-size: 18px;
    padding-top: 10px;
    margin-bottom: 20px;
  }
  .txt {
    margin: 20px 0 35px;
    text-align: center;
  }
  .but {
    width: 150px;
    padding: 8px 10px;
    border-radius: 4px;
    background-color: #0ae2db;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .box_rec {
    padding-top: 40px;
    .title {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
      div {
        padding: 0 16px;
        font-size: 14px;
        cursor: pointer;
      }
      .check {
        font-weight: 600;
        position: relative;
        &:after {
          content: " ";
          position: absolute;
          height: 2px;
          width: 50%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #000;
          bottom: 0;
        }
      }
    }
    .content_ {
      max-height: 200px;
      overflow: auto;
      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }
    }
  }
}
</style>
