<template>
  <div id="login">
    <div class="box">
      <div class="content" v-if="show">
        <div class="lang_reg">
          <a-dropdown placement="bottom">
            <div @click.prevent class="ant-dropdown-link">
              中文简体 <DownOutlined />
            </div>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="1"> 中文简体 </a-menu-item>
                <a-menu-item key="2"> 中文繁体 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div style="color: #0ae2db; cursor: pointer" @click="show = false">
            去注册
          </div>
        </div>
        <img class="logo" src="../assets/logo.png" />
        <div class="from">
          <div class="data">
            用户名
            <input
              type="text"
              v-model="loginDat.tiktok_id"
              :placeholder="'请输入用户名'"
            />
          </div>
          <div class="data" style="margin-bottom: 30px">
            登录密码
            <input
              type="text"
              v-model="loginDat.password"
              :placeholder="'请输入登录密码'"
            />
          </div>
        </div>
        <div class="go pr_con" @click="login()">登录</div>
      </div>
      <div class="content" v-else>
        <div class="lang_reg">
          <a-dropdown placement="bottom">
            <div @click.prevent class="ant-dropdown-link">
              中文简体 <DownOutlined />
            </div>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="1"> 中文简体 </a-menu-item>
                <a-menu-item key="2"> 中文繁体 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <div style="color: #0ae2db; cursor: pointer" @click="show = true">
            去登录
          </div>
        </div>
        <img class="logo" src="../assets/logo.png" />
        <div class="from">
          <div class="data">
            用户名
            <input type="text" :placeholder="'请输入用户名'" />
          </div>
          <div class="data">
            登录密码
            <input type="text" :placeholder="'请输入登录密码'" />
          </div>
          <div class="data">
            确认登录密码
            <input type="text" :placeholder="'再次输入登录密码'" />
          </div>
          <div class="data" style="margin-bottom: 30px">
            开店邀请码
            <input type="text" :placeholder="'请输入开店邀请码'" />
          </div>
        </div>
        <div class="go pr_con">注册</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  import type { MenuProps } from 'ant-design-vue'
  import { api_web_login, api_login } from '@/requset/api'
  import { ref, reactive } from 'vue'
  import router from '@/router'

  let show = ref<boolean>(true)
  let loginDat = reactive({ tiktok_id: '', password: '', lang: 'zh' })

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`点击了 ${key}`)
  }

  const login = () => {
    if (loginDat.tiktok_id.length < 1) {
      message.error('请输入账号')
      return
    }
    if (loginDat.password.length < 1) {
      message.error('请输入密码')
      return
    }
    api_web_login({ ...loginDat }).then((res: any) => {
      if (res.code == 200) {
        if (res.data.data) {
          let info = JSON.parse(atob(res.data.data))
          console.log('info = ', info)
          api_login({ tiktok_id: info.tiktok_id }).then((res1: any) => {
            sessionStorage.setItem('token', res1.data.token)
            router.push('/')
          })
        } else {
          console.log('error, data is null')
        }
      } else if (res.code == 201) {
        // showToast(i18n.global.t("h_c_12"));
      } else if (res.code == 202) {
        // showToast(i18n.global.t("h_c_13"));
      } else if (res.message) {
        // showToast(res.message);
      }
    })
  }
</script>
<style lang="less" scoped>
  #login {
    background: url(../assets/login_bac.png);
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;
    position: relative;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.4);
      width: 485px;
      .content {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        .lang_reg {
          display: flex;
          justify-content: space-between;
          align-self: start;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .logo {
          border-radius: 50%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 50px;
          width: 90px;
        }
        .from {
          width: 336px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          div {
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
            font-size: 20px;
            font-weight: 500;
            input {
              margin-top: 15px;
              font-size: 14px;
              width: 336px;
              height: 46px;
              border-radius: 4px;
              background-color: #f6f7f9;
            }
          }
        }
        .go {
          width: 336px;
          background-color: #0ae2db;
          color: #fff;
          text-align: center;
          height: 46px;
          line-height: 46px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
