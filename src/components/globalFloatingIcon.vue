<template>
  <div class="floating-icon" @click="changeCz">
    <img src="../assets/contact_green_icon.png" />
  </div>
</template>

<script setup lang="ts">
import i18n from "@/lang";
import { ref } from "vue";
import { api_getOption, api_getOption_notLogin } from "@/requset/api";
import { message } from "ant-design-vue";

let isLogin = ref<boolean>(false);
isLogin.value =
  sessionStorage.getItem("token") != null &&
  sessionStorage.getItem("token") != "" &&
  sessionStorage.getItem("token") != undefined;

const changeCz = () => {
  let promise =
    isLogin.value == true ? api_getOption({}) : api_getOption_notLogin({});
  promise.then((res: any) => {
    if (res.success) {
      let serviceUrl = res.data.recharge_service_link;
      if (serviceUrl != "" && serviceUrl != null) {
        window.open(serviceUrl);
      } else {
        message.error(i18n.global.t("bo_18"));
      }
    }
  });
};
</script>

<style lang="less" scoped>
.floating-icon {
  position: fixed;
  bottom: 11%;
  right: 8%;
  z-index: 99;
  width: 80px;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background 0.3s;
  border: 2px solid #10dbd5;

  img {
    width: 50px;
    height: 50px;
    color: white;
  }
}
</style>
