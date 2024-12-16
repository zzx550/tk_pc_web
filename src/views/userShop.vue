<template>
  <div id="userShop" class="head_b">
    <TopSeek :title="$t('to_03')" />
    <div class="box_con">
      <div class="con_left">
        <div class="data_hx">
          <div class="title">
            <div class="left">{{ $t('_us_01') }}</div>
            <div class="right_check">
              <div
                :class="statisticsTab == 0 ? 'check' : ''"
                @click="changeStatisticsTab(0)"
              >
                {{ $t('_us_02') }}
              </div>
              <div
                :class="statisticsTab == 1 ? 'check' : ''"
                @click="changeStatisticsTab(1)"
              >
                {{ $t('_us_03') }}
              </div>
              <div
                :class="statisticsTab == 2 ? 'check' : ''"
                @click="changeStatisticsTab(2)"
              >
                {{ $t('_us_04') }}
              </div>
              <div
                :class="statisticsTab == 3 ? 'check' : ''"
                @click="changeStatisticsTab(3)"
              >
                {{ $t('_us_05') }}
              </div>
            </div>
          </div>
          <div class="data">
            <div class="li">
              {{ $t('_us_06') }}
              <div>{{ getFloat(statisticsData.total_profit) }}</div>
            </div>
            <div class="li">
              {{ $t('_us_07') }}
              <div>{{ getFloat(statisticsData.pure_profit) }}</div>
            </div>
            <div class="li">
              {{ $t('_us_08') }}
              <div>{{ statisticsData.order_count }}</div>
            </div>
            <div class="li">
              {{ $t('_us_09') }}
              <div>{{ statisticsData.goods_click }}</div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="title_">
            {{ $t('_us_10') }}
            <div
              style="color: #0ae1da"
              @click="router.push('/order?tabIndex=0')"
            >
              {{ $t('_us_11') }}
            </div>
          </div>
          <div class="type">
            <div class="li" @click="router.push('./order?tabIndex=1')">
              {{ ordersNumber.orderStatus_0 }}
              <div>{{ $t('_us_12') }}</div>
            </div>
            <div class="li" @click="router.push('./order?tabIndex=2')">
              {{ ordersNumber.orderStatus_1 }}
              <div>{{ $t('_us_13') }}</div>
            </div>
            <div class="li" @click="router.push('./order?tabIndex=3')">
              {{ ordersNumber.orderStatus_2 }}
              <div>{{ $t('_us_14') }}</div>
            </div>
            <div class="li" @click="router.push('./order?tabIndex=4')">
              {{ ordersNumber.orderStatus_3 }}
              <div>{{ $t('_us_15') }}</div>
            </div>
          </div>
        </div>

        <div class="bottom_b">
          <div class="bot_le">
            <div class="gys">
              <div class="title">
                {{ $t('_us_16') }}
                <div @click.stop="supplierOpen = true">{{ $t('_us_17') }}</div>
              </div>
              <div class="box">
                <img
                  class="but"
                  src="../assets/home/z_icon.png"
                  @click.stop="
                    currentSupplierItemIndex = currentSupplierItemIndex - 1
                  "
                />
                <div
                  class="list"
                  v-if="supplierItem && supplierItem.goods_supplier"
                >
                  <img
                    class="pr_con"
                    :src="supplierItem.goods_supplier.logo"
                    @click="goSupplierDet(supplierItem.supplier_id)"
                  />
                  <div
                    class="ti"
                    @click="goSupplierDet(supplierItem.supplier_id)"
                  >
                    {{ $t('_us_18') }}：{{
                      supplierItem.goods_supplier.supplier_sn
                    }}
                  </div>
                  <div
                    class="on"
                    @click="goSupplierDet(supplierItem.supplier_id)"
                  >
                    {{ supplierItem.goods_supplier.full_name }}
                  </div>
                  <div
                    class="txt"
                    @click="goSupplierDet(supplierItem.supplier_id)"
                  >
                    {{ supplierItem.goods_supplier.tags }}
                  </div>
                  <div
                    class="go pr_con"
                    @click="handleAddAll(supplierItem.supplier_id)"
                  >
                    {{ $t('_us_19') }}
                  </div>
                </div>
                <div class="no_data" v-else>
                  <img style="width: 50%" src="../assets/img/no_data.png" />
                  <div style="font-size: 13px">{{ $t('co_d_08') }}</div>
                </div>
                <img
                  class="but"
                  src="../assets/home/y_icon.png"
                  @click.stop="
                    currentSupplierItemIndex = currentSupplierItemIndex + 1
                  "
                />
              </div>
            </div>
            <div class="mine_shop">
              <div class="title">
                {{ $t('_us_20') }}
                <div @click="router.push('/mine_shop')">{{ $t('_us_21') }}</div>
              </div>
              <div class="qhGods">
                <img
                  class="but"
                  src="../assets/home/z_icon.png"
                  @click="goodIndex = goodIndex - 1"
                />
                <div class="list" v-if="goodObj && goodObj.goods">
                  <div class="shop_t">
                    <img :src="goodObj.goods.cover_img" />
                    <div class="txt_3">
                      {{ goodObj.goods.goods_name }}
                    </div>
                  </div>
                  <div class="price">
                    {{ $t('_us_22') }}：
                    <p style="margin-bottom: 0; color: red">
                      ${{ goodObj.goods.goods_price }}
                    </p>
                  </div>
                  <div class="price">
                    {{ $t('_us_23') }}：
                    <p style="margin-bottom: 0; color: #000">
                      ${{ goodObj.goods.goods_profit }}
                    </p>
                  </div>
                  <div class="txt">
                    {{ $t('_us_24') }}：{{ goodObj.goods.week_sales_num }}
                  </div>
                  <div class="txt">
                    {{ $t('_us_25') }}：{{ goodObj.goods.day_sales_num }}
                  </div>
                  <div class="txt">
                    {{ $t('_us_26') }}：{{ goodObj.goods.visits }}
                  </div>
                </div>
                <div class="no_data" v-if="!goodObj">
                  <img style="width: 50%" src="../assets/img/no_data.png" />
                  <div style="font-size: 13px">{{ $t('co_d_08') }}</div>
                </div>
                <img
                  class="but"
                  src="../assets/home/y_icon.png"
                  @click="goodIndex = goodIndex + 1"
                />
              </div>
            </div>
          </div>
          <div class="bot_ri">
            <div class="bot_ri_content">
              <div class="title_">
                {{ $t('_us_27') }}
                <div style="color: #0ae1da" @click="router.push('/ranking')">
                  {{ $t('_us_21') }}
                </div>
              </div>
              <div class="list_T">
                <div class="title">{{ $t('_us_28') }}</div>
                <div class="time">{{ $t('_us_29') }}</div>
                <div class="txt">{{ $t('_us_30') }}</div>
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
      </div>
      <div class="right_user">
        <div class="top_user">
          <div class="name">
            <a-upload
              action="https://g-shop.bond/api/upload/uploadImg"
              :beforeUpload="beforeUpload"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              @change="handleChangeUp"
            >
              <img
                v-if="
                  userInfo.shop_cover_image != null &&
                  userInfo.shop_cover_image != ''
                "
                class="us_img"
                :src="userInfo.shop_cover_image"
              />
              <img v-else class="us_img" src="../assets/home/user_img.png" />
            </a-upload>
            <!-- <van-uploader
              v-model="avatarFileList"
              :after-read="avatarAfterRead"
              :preview-image="false"
            >
             
            </van-uploader> -->
            <div class="u_right">
              <div
                v-if="userInfo.shop_name != null && userInfo.shop_name != ''"
                class="shop_name"
                @click="shopNameOpen = userInfo.change_shop_name == 1"
              >
                {{ $t('_us_31') }}：{{ userInfo.shop_name }}
              </div>
              <div class="id">ID：{{ userInfo.tiktok_id }}</div>
              <div class="dj">
                <div class="fen">
                  <img
                    v-if="userInfo.star_rating"
                    v-for="x in userInfo.star_rating"
                    :key="x"
                    src="../assets/home/xin.png"
                  />
                  {{
                    userInfo.score_star &&
                    userInfo.score_star != '' &&
                    userInfo.score_star != '0'
                      ? userInfo.score_star + $t('_us_84')
                      : ''
                  }}
                </div>
                {{
                  userInfo.star_rating == 1
                    ? $t('_us_32')
                    : userInfo.star_rating == 2
                    ? $t('_us_33')
                    : userInfo.star_rating == 3
                    ? $t('_us_34')
                    : userInfo.star_rating == 4
                    ? $t('_us_35')
                    : userInfo.star_rating == 5
                    ? $t('_us_36')
                    : ''
                }}
              </div>
            </div>
          </div>
          <div class="bal">
            <div class="ls cur_p" @click="openAssets = true">
              {{ $t('_us_37') }}
            </div>
            <div class="z_bal">
              {{ getFloat(walletInfo.totalAssets) }}
              <div>{{ $t('_us_38') }}</div>
            </div>
            <div class="two_bal">
              <div class="z_bal">
                {{ getFloat(walletInfo.cloud_balance) }}
                <div>{{ $t('_us_39') }}</div>
              </div>
              <div class="z_bal">
                {{ getFloat(walletInfo.wait_balance) }}
                <div>{{ $t('_us_40') }}</div>
              </div>
            </div>
            <div class="but">
              <div @click="czOpen = true">{{ $t('_us_41') }}</div>
              <div class="tx" @click="router.push('./withdraw')">
                {{ $t('_tx_26') }}
              </div>
            </div>
          </div>
        </div>
        <div class="xji">
          <div class="title_fy">
            <div class="left" @click.stop="fyRuleOpen = true">
              {{ $t('_us_43') }}<img src="../assets/home/wh.png" />
            </div>
            <div
              class="cur_p"
              style="color: #0ae1da"
              @click.stop="openFy = true"
            >
              {{ $t('_us_44') }}
            </div>
          </div>
          <div class="data">
            <div class="li">
              <div>{{ getFloat(rebateInfo.sale_amount) }}</div>
              {{ $t('_us_45') }}
            </div>
            <div class="li">
              <div>{{ getFloat(rebateInfo.total_rebate) }}</div>
              {{ $t('_us_46') }}
            </div>
            <div class="li">
              <div style="color: #0ae1da">{{ rebateInfo.max_rate * 100 }}%</div>
              {{ $t('_us_47') }}
            </div>
          </div>
        </div>
        <div class="tg" @click="llbOpen = true">
          <img src="../assets/home/img.png" />
          <div class="por_l">
            <p style="color: #ff8811">{{ $t('_us_48') }}</p>
            {{ $t('_us_49') }}
          </div>
          <div class="por_r">
            {{ $t('_us_50') }}
            <p style="color: #ff8811">{{ $t('_us_51') }}</p>
            {{ $t('_us_83') }}
          </div>
        </div>
        <div class="bx_">
          <div>{{ $t('_us_52') }}</div>
          <div class="but" @click="hyOpen = true">{{ $t('_us_53') }}</div>
          <img src="../assets/img/bx_icon.png" />
        </div>
      </div>
    </div>
  </div>

  <OpenTip :openAdd="supplierOpen" @changeAdd="addSupplier" />
  <OpenTip :openCz="czOpen" @changeCz="changeCz" />
  <OpenTip
    :openLlb="llbOpen"
    @changeLlb="changeLlb"
    :llbRule="llbRule"
    :llbHasGet="llbHasGet"
  />
  <OpenTip
    :openShopName="shopNameOpen"
    @changeShopName="changeShopName"
    :isUpdateShopName="userInfo.shop_name != null && userInfo.shop_name != ''"
  />
  <OpenTip
    :openFyRule="fyRuleOpen"
    @changeFyRule="fyRuleOpen = false"
    :fyRule="rebateInfo.rules_desc"
  />

  <a-modal
    class="modal_wit"
    v-model:open="hyOpen"
    centered
    :footer="null"
    width="561px"
    @cancel="hyOpen = false"
  >
    <div class="title">{{ $t('_us_53') }}</div>
    <img class="pr_con" src="../assets/img/hyzl.png" />
    <div class="pr_con yqm">
      {{ $t('_us_54') }}
      <div class="img">
        {{ userInfo.invite_code }}
        <img
          src="../assets/img/copy.png"
          @click="copyValue(userInfo.invite_code)"
        />
      </div>
    </div>
    <input
      type="text"
      v-model="inputInviteCode"
      class="pr_con"
      :placeholder="$t('_us_55')"
    />
    <div class="but pr_con" @click="bindInviteCode">{{ $t('_us_42') }}</div>

    <div class="box_rec">
      <div class="title">
        <div
          :class="inviteCheckTab == 1 ? 'check' : ''"
          @click="changeInviteTab(1)"
        >
          {{ $t('_us_56') }}
        </div>
        <div
          :class="inviteCheckTab == 2 ? 'check' : ''"
          @click="changeInviteTab(2)"
        >
          {{ $t('_us_57') }}
        </div>
        <div
          :class="inviteCheckTab == 3 ? 'check' : ''"
          @click="changeInviteTab(3)"
        >
          {{ $t('_us_58') }}
        </div>
        <div
          :class="inviteCheckTab == 4 ? 'check' : ''"
          @click="changeInviteTab(4)"
        >
          {{ $t('_us_59') }}
        </div>
      </div>
      <div class="content_">
        <template v-if="inviteCheckTab != 4">
          <van-list
            v-model="inviteLoading"
            :finished-text="$t('_no_more_txt')"
            :immediate-check="false"
            :loading-text="$t('_load_txt')"
            @load="onInviteLoad"
          >
            <div class="list" v-for="(item, index) in inviteList" :key="index">
              <div class="left">
                <div>{{ item.username }}</div>
                <div>ID: {{ item.tiktok_id }}</div>
              </div>
              <div>{{ item.create_time }}</div>
            </div>
          </van-list>
        </template>
        <template v-else>
          <div v-html="inviteRule"></div>
        </template>
      </div>
    </div>
  </a-modal>

  <a-drawer
    v-model:open="openAssets"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <!-- <div class="check_t">收支明细</div>
      <div>收入</div>
      <div>支出</div> -->
      <img
        class="close"
        @click="openAssets = false"
        src="../assets/img/close.png"
      />
    </div>
    <van-list
      v-model="assetsLoading"
      :finished="assetsFinished"
      :finished-text="$t('_no_more_txt')"
      :immediate-check="false"
      :loading-text="$t('_load_txt')"
      @load="onAssetsLoad"
    >
      <div class="list" v-for="x in assetsList" :key="x.id">
        <div>
          <div class="price">{{ getAssetsTypeTxt(x.type) }}</div>
          <div class="kh" v-if="x.json">
            {{ $t('_us_18') }}：{{
              x.json.order_sn
                ? x.json.order_sn
                : x.json.goods_id
                ? x.json.goods_id
                : x.id
            }}
          </div>
          <div class="kh">{{ x.create_time }}</div>
        </div>
        <div class="red_" :style="x.trade_type == 0 ? { color: 'red' } : ''">
          {{ x.trade_type == 0 ? '+' : '-' }}
          ${{
            x.amount.substr(0, 1) !== '-'
              ? getFloat(x.amount)
              : getFloat(x.amount.substr(1))
          }}
        </div>
      </div>
    </van-list>
  </a-drawer>
  <a-drawer
    v-model:open="openFy"
    class="custom-class"
    :closable="false"
    placement="right"
  >
    <div class="check">
      <div
        :class="rebateType == 1 ? 'check_t' : ''"
        @click="changeRebateTab(1)"
      >
        {{ $t('_us_60') }}
      </div>
      <div
        :class="rebateType == 2 ? 'check_t' : ''"
        @click="changeRebateTab(2)"
      >
        {{ $t('_us_61') }}
      </div>
      <div
        :class="rebateType == 3 ? 'check_t' : ''"
        @click="changeRebateTab(3)"
      >
        {{ $t('_us_62') }}
      </div>
      <img
        class="close"
        @click="openFy = false"
        src="../assets/img/close.png"
      />
    </div>
    <van-list
      v-model="rebateLoading"
      :finished="rebateFinished"
      :finished-text="$t('_no_more_txt')"
      :immediate-check="false"
      :loading-text="$t('_load_txt')"
      @load="onRebateLoad"
    >
      <div class="list" v-for="x in rebateList" :key="x">
        <div>
          <div class="price">ID：{{ x.tiktok_id }}</div>
          <div class="kh">
            {{ $t('_us_63') }}：${{ getFloat(x.sale_amount) }}
          </div>
          <div class="kh">{{ x.create_time }}</div>
        </div>
        <div class="red_" :style="{ color: 'red' }">
          + ${{ getFloat(x.commission_amount) }}
        </div>
      </div>
    </van-list>
  </a-drawer>
</template>
<script setup lang="ts">
  import router from '@/router'
  import { reactive, ref, watch, onUnmounted } from 'vue'
  import {
    api_getGiftPack,
    api_optionDesc,
    api_getInfo,
    api_GoodsRanking,
    api_mainStatistics,
    api_uploadImg,
    api_update_shopInfo,
    api_bind_shopInfo,
    api_rebateInfo,
    api_getOrderTypeNum,
    api_wallet,
    api_mySupplier,
    api_bindSupplier,
    api_addAllGoods,
    api_myGoods,
    api_transferLog,
    api_rateList,
    api_bind_invite_code,
    api_team_list,
    api_helpLog,
    api_getOption,
  } from '@/requset/api'
  import { message } from 'ant-design-vue'
  import useClipboard from 'vue-clipboard3'
  const { toClipboard } = useClipboard()
  import { getFloat } from '@/utils'
  import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
  import i18n from '@/lang'

  interface Item {
    id: number
    goods_names: string
    ranking_value: string
  }

  const userInfo = ref<any>({})
  let ranking = ref<Item[]>([])
  const openAssets = ref<boolean>(false)
  const openFy = ref<boolean>(false)
  const fyRuleOpen = ref<boolean>(false)
  const supplierOpen = ref<boolean>(false)
  const czOpen = ref<boolean>(false)
  const hyOpen = ref<boolean>(false)
  const shopNameOpen = ref<boolean>(false)
  const llbOpen = ref<boolean>(false)
  const llbRule = ref<string>('')
  const llbHasGet = ref<string>('')
  let statisticsData = ref({
    total_profit: 0.0,
    pure_profit: 0.0,
    order_count: 0,
    goods_click: 0,
  })
  let ordersNumber = ref({
    orderStatus_0: 0,
    orderStatus_1: 0,
    orderStatus_2: 0,
    orderStatus_3: 0,
  })
  const statisticsTab = ref<number>(0)
  const avatarFileList = ref([])
  const rebateInfo = ref<any>({})
  let walletInfo = ref({
    totalAssets: 0,
    cloud_balance: 0,
    wait_balance: 0,
    open_cryptocurrency_address: 0,
    cryptocurrency_address: [{ name: '', address: '' }],
  })
  const supplierList = ref<any>([])
  let currentSupplierItemIndex = ref<number>(0)
  const supplierItem = ref<any>({})
  const goodShowcaseList = ref<any>([])
  const goodObj = ref<any>({})

  let assetsPage = ref<number>(1)
  let assetsLoading = ref<boolean>(false)
  let assetsFinished = ref<boolean>(false)
  const assetsList = ref<any>([])
  let assetsFlag = ref<boolean>(false)

  let rebateType = ref<number>(1)
  let rebatePage = ref<number>(1)
  let rebateLoading = ref<boolean>(false)
  let rebateFinished = ref<boolean>(false)
  let rebateFlag = ref<boolean>(false)
  const rebateList = ref<any>([])

  const inputInviteCode = ref<string>('')
  const inviteCheckTab = ref<number>(1)
  let invitePage = ref<number>(1)
  let inviteLoading = ref<boolean>(false)
  let inviteFinished = ref<boolean>(false)
  let inviteFlag = ref<boolean>(false)
  const inviteList = ref<any>([])
  const inviteRule = ref<string>('')

  const goodIndex = ref<number>(0)

  watch(currentSupplierItemIndex, (newValue, oldValue) => {
    if (supplierList.value.length == 1) {
      message.warning(i18n.global.t('_us_64'))
      return
    }
    if (newValue < 0) {
      currentSupplierItemIndex.value = supplierList.value.length - 1
    } else if (newValue > supplierList.value.length - 1) {
      currentSupplierItemIndex.value = 0
    } else {
      supplierItem.value = supplierList.value[newValue]
    }
  })

  watch(goodIndex, (newValue, oldValue) => {
    if (goodShowcaseList.value.length == 1) {
      message.warning(i18n.global.t('_us_65'))
      return
    }
    if (newValue < 0) {
      goodIndex.value = goodShowcaseList.value.length - 1
    } else if (newValue > goodShowcaseList.value.length - 1) {
      goodIndex.value = 0
    } else {
      goodObj.value = goodShowcaseList.value[newValue]
      console.log(' goodObj.value :>> ', goodObj.value, newValue)
    }
  })

  const changeStatisticsTab = (index: number) => {
    statisticsTab.value = index
    // today week month year
    let type =
      index == 0
        ? 'today'
        : index == 1
        ? 'week'
        : index == 2
        ? 'month'
        : index == 3
        ? 'year'
        : ''
    api_mainStatistics({ type }).then((res: any) => {
      if (res.success) {
        statisticsData.value = res.data
      }
    })
  }
  changeStatisticsTab(0)

  const getUserInfo = () => {
    api_getInfo({}).then((res: any) => {
      if (res.success) {
        userInfo.value = { ...userInfo.value, ...res.data }
        // 是否领取过新手礼包
        llbHasGet.value = res.data.month_gift_pack
      }
    })
  }
  getUserInfo()

  const getWalletInfo = () => {
    api_wallet({}).then((res: any) => {
      if (res.code == 200) {
        walletInfo.value = { ...walletInfo.value, ...res.data }
        walletInfo.value.totalAssets =
          Number(res.data.cloud_balance) + Number(res.data.wait_balance)
        // if (walletInfo.value.cryptocurrency_address.length > 0) {
        //   qrCodeValue.value = walletInfo.value.cryptocurrency_address[0].address;
        //   selectRechargeAddressTab.value =
        //   walletInfo.value.cryptocurrency_address[0].name;
        // }
      }
    })
  }
  getWalletInfo()

  let msgDetailInterval = <any>null
  msgDetailInterval = setInterval(() => {
    getWalletInfo()
  }, 5000)

  onUnmounted(() => {
    if (msgDetailInterval != null) {
      clearInterval(msgDetailInterval)
    }
  })

  function getSupplierList() {
    api_mySupplier({}).then((res: any) => {
      if (res.success) {
        supplierList.value = res.data
        if (supplierList.value.length > 0) {
          supplierItem.value = supplierList.value[0]
          // 判断是否需要显示添加店铺名称的弹框
          // api_getInfo({}).then((res: any) => {
          //   if (res.success) {
          //     shopNameOpen.value =
          //       res.data.shop_name == null ||
          //       res.data.shop_name == '' ||
          //       res.data.custom_type == null ||
          //       res.data.custom_type == ''
          //   }
          // })
        }
      }
    })
  }
  getSupplierList()

  // 这里只展示上架中的第一页前五条记录
  api_myGoods({
    status: 0,
    page: 1,
    pageSize: 5,
  }).then((res: any) => {
    if (res.success) {
      goodShowcaseList.value = res.data.data
      goodObj.value = res.data.data[goodIndex.value]
    }
  })

  const goSupplierDet = (supplier_id: number) => {
    router.push('/supplier_det?supplier_id=' + supplier_id)
  }

  const handleAddAll = (supplier_id: number) => {
    api_addAllGoods({ supplier_id }).then((res: any) => {
      if (res.success) {
        message.success(i18n.global.t('_us_66'))
        getSupplierList()
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }

  api_rebateInfo({}).then((res: any) => {
    rebateInfo.value = res.data
  })

  api_getOrderTypeNum({}).then((res: any) => {
    if (res.code == 200) {
      ordersNumber.value = res.data
    }
  })

  api_GoodsRanking({}).then((res: any) => {
    if (res.code == 200) {
      ranking.value = res.data
      // 这里排行榜只取前三条
      if (ranking.value.length > 3) {
        ranking.value = ranking.value.slice(0, 3)
      }
    }
  })

  api_optionDesc({ name: 'gift_pack_rules' }).then((res: any) => {
    if (res.code == 200) {
      // 新手礼包规则
      llbRule.value = res.data
    }
  })

  const getInviteRule = () => {
    api_optionDesc({ name: 'recommend_level' }).then((res: any) => {
      if (res.code == 200) {
        // 好友助力规则
        inviteRule.value = res.data
      }
    })
  }
  getInviteRule()

  const changeLlb = (change: boolean) => {
    if (change == true) {
      message.loading(i18n.global.t('_load_txt'))
      api_getGiftPack({}).then((res: any) => {
        if (res.code == 200) {
          message.success(i18n.global.t('_us_67'))
          getUserInfo()
        } else if (res.message) {
          message.error(res.message)
        }
      })
    } else {
      llbOpen.value = false
    }
  }

  const changeShopName = (change: boolean, name: string) => {
    if (change == true) {
      if (name == '') {
        message.error(i18n.global.t('_us_68'))
        return
      }
      message.loading(i18n.global.t('_load_txt'))
      if (userInfo.value.shop_name != null && userInfo.value.shop_name != '') {
        api_update_shopInfo({
          shop_name: name,
          shop_cover_image: userInfo.value.shop_cover_image,
        }).then((res: any) => {
          if (res.code == 200) {
            shopNameOpen.value = false
            message.success(i18n.global.t('_us_69'))
            getUserInfo()
          } else if (res.message) {
            message.error(res.message)
          }
        })
      } else {
        api_bind_shopInfo({
          shop_name: name,
        }).then((res: any) => {
          if (res.code == 200) {
            shopNameOpen.value = false
            message.success(i18n.global.t('_us_70'))
            getUserInfo()
          } else if (res.message) {
            message.error(res.message)
          }
        })
      }
    } else {
      shopNameOpen.value = false
    }
  }

  const addSupplier = (change: boolean, num: string) => {
    if (change == true) {
      if (num == '') {
        message.error(i18n.global.t('_us_71'))
        return
      }
      message.loading(i18n.global.t('_load_txt'))
      api_bindSupplier({ supplier_sn: num }).then((res: any) => {
        if (res.code == 200) {
          supplierOpen.value = false
          message.success(i18n.global.t('_us_72'))
          getSupplierList()
        } else if (res.code == 201) {
          message.error(i18n.global.t('_us_73'))
        } else if (res.code == 202) {
          message.error(i18n.global.t('_us_74'))
        } else if (res.message) {
          message.error(res.message)
        }
      })
    } else {
      supplierOpen.value = false
    }
  }

  const handleChangeUp = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      api_update_shopInfo({
        shop_cover_image: info.file.response.data.http_url,
        shop_name: userInfo.value.shop_name,
      }).then((res: any) => {
        if (res.code == 200) {
          message.success
          getUserInfo()
        } else {
          message.error(res.message)
        }
      })
    }
  }

  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error(i18n.global.t('_us_75'))
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error(i18n.global.t('_us_76'))
    }
    return isJpgOrPng && isLt2M
  }

  // const avatarAfterRead = (file: any) => {
  //   message.loading('加载中...')
  //   console.log('file :>> ', file)
  //   // api_uploadImg(file).then((res: any) => {
  //   //   if (res.code == 200) {
  //   //     api_update_shopInfo({
  //   //       shop_cover_image: res.data.http_url,
  //   //       shop_name: userInfo.value.shop_name,
  //   //     }).then((res: any) => {
  //   //       if (res.code == 200) {
  //   //         message.success
  //   //         getUserInfo()
  //   //       } else {
  //   //         message.error(res.message)
  //   //       }
  //   //     })
  //   //   } else if (res.message) {
  //   //     message.error(res.message)
  //   //   }
  //   // })
  // }

  const getAssetsList = () => {
    assetsFlag.value = true
    api_transferLog({
      page: assetsPage.value,
      pageSize: 20,
    }).then((res: any) => {
      if (res.success) {
        if (assetsPage.value >= res.data.last_page) {
          assetsFinished.value = true
        }
        assetsList.value.push(...res.data.data)
        assetsFlag.value = false
        assetsLoading.value = false
      }
    })
  }
  getAssetsList()

  const onAssetsLoad = () => {
    if (assetsFlag.value) return
    assetsPage.value = assetsPage.value + 1
    getAssetsList()
  }

  const getAssetsTypeTxt = (type: number) => {
    switch (type) {
      case 1:
        return i18n.global.t('_us_t_01')
      case 2:
        return i18n.global.t('_us_t_02')
      case 3:
        return i18n.global.t('_us_t_03')
      case 4:
        return i18n.global.t('_us_t_04')
      case 5:
        return i18n.global.t('_us_t_05')
      case 6:
        return i18n.global.t('_us_t_06')
      case 7:
        return i18n.global.t('_us_t_07')
      case 8:
        return i18n.global.t('_us_t_08')
      case 9:
        return i18n.global.t('_us_t_09')
      case 10:
        return i18n.global.t('_us_t_10')
      case 11:
        return i18n.global.t('_us_t_11')
      case 12:
        return i18n.global.t('_us_t_12')
      default:
        return ''
    }
  }

  function getRebateList() {
    rebateFlag.value = true
    api_rateList({
      type: rebateType.value,
      page: rebatePage.value,
      pageSize: 20,
    }).then((res: any) => {
      if (res.success) {
        if (rebatePage.value >= res.data.last_page) {
          rebateFinished.value = true
        }
        rebateList.value.push(...res.data.data)
        rebateFlag.value = false
        rebateLoading.value = false
        if (res.data.data.length == 0) {
          rebateFinished.value = false
        }
      }
    })
  }
  getRebateList()

  const onRebateLoad = () => {
    if (rebateFlag.value) return
    rebatePage.value = rebatePage.value + 1
    getRebateList()
  }

  const rebateReset = () => {
    rebatePage.value = 1
    rebateList.value = []
    rebateFinished.value = false
  }

  const changeRebateTab = (index: number) => {
    rebateType.value = index
    rebateReset()
    getRebateList()
  }

  const bindInviteCode = () => {
    if (inputInviteCode.value == '') {
      message.error(i18n.global.t('_us_55'))
      return
    }
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    let currentTime = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now
      .getDate()
      .toString()
      .padStart(2, '0')} ${hours}:${minutes}:${seconds}`

    message.loading(i18n.global.t('_load_txt'))
    api_bind_invite_code({
      invite_code: inputInviteCode.value,
      time: currentTime,
    }).then((res: any) => {
      if (res.code == 200) {
        hyOpen.value = false
        message.success(i18n.global.t('_us_77'))
        inputInviteCode.value = ''
      } else if (res.code == 202) {
        message.error(i18n.global.t('_us_78'))
      } else if (res.code == 203) {
        message.error(i18n.global.t('_us_79'))
      } else if (res.code == 205) {
        message.error(i18n.global.t('_us_80'))
      } else if (res.code == 206) {
        message.error(i18n.global.t('_us_81'))
      } else if (res.message) {
        message.error(res.message)
      }
    })
  }

  const getInviteList = () => {
    if (inviteCheckTab.value == 4) return
    inviteFlag.value = true
    let param =
      inviteCheckTab.value == 3
        ? {
            page: invitePage.value,
            pageSize: 20,
          }
        : {
            page: invitePage.value,
            pageSize: 20,
            type: inviteCheckTab.value,
          }
    let promise =
      inviteCheckTab.value == 3 ? api_team_list(param) : api_helpLog(param)
    promise.then((res: any) => {
      if (res.success) {
        if (invitePage.value >= res.data.last_page) {
          inviteFinished.value = true
        }
        inviteList.value.push(...res.data.data)
        inviteFlag.value = false
        inviteLoading.value = false
        if (res.data.data.length == 0) {
          inviteFinished.value = false
        }
      }
    })
  }
  getInviteList()

  const onInviteLoad = () => {
    if (inviteFlag.value) return
    invitePage.value = invitePage.value + 1
    getInviteList()
  }

  const inviteReset = () => {
    invitePage.value = 1
    inviteList.value = []
    inviteFinished.value = false
  }

  const changeInviteTab = (index: number) => {
    inviteCheckTab.value = index
    if (index != 4) {
      inviteReset()
      getInviteList()
    } else {
      getInviteRule()
    }
  }

  const changeCz = (change: boolean) => {
    if (change == false) {
      czOpen.value = false
      return
    }
    api_getOption({}).then((res: any) => {
      if (res.code == 200) {
        czOpen.value = false
        let serviceUrl = res.data.recharge_service_link
        if (serviceUrl != '' && serviceUrl != null) {
          setTimeout(() => {
            window.open(serviceUrl)
          }, 1000)
        } else {
          message.error(i18n.global.t('_us_82'))
        }
      }
    })
  }

  const copyValue = (value: any) => {
    if (value == '') {
      return
    }
    try {
      toClipboard(value)
      message.success(i18n.global.t('_copy_suc_txt'))
    } catch (e) {
      message.error(i18n.global.t('_copy_fail_txt'))
    }
  }
</script>
<style lang="less" scoped>
  #userShop {
    padding-bottom: 40px;
    .box_con {
      display: flex;
      justify-content: space-between;
      .con_left {
        width: 940px;
        .data_hx {
          background-color: #fff;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          .title {
            display: flex;
            justify-content: space-between;
            .left {
              font-size: 20px;
              font-weight: 600;
            }
            .right_check {
              display: flex;
              background-color: #f4f5f8;
              border-radius: 4px;
              padding: 4px 10px;
              div {
                padding: 4px 15px;
                font-size: 13px;
                border-radius: 3px;
                color: #88898e;
              }
              .check {
                color: #000;
                font-weight: 600;
                background-color: #ffffff;
              }
            }
          }
          .data {
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            .li {
              padding: 10px;
              border-radius: 4px;
              height: 104px;
              width: 210px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              color: #616065;
              &:nth-child(1) {
                background-image: url('../assets/home/ji_1.png');
                background-color: #e8faf3;
                background-size: 100% 100%;
              }
              &:nth-child(2) {
                background-image: url('../assets/home/ji_2.png');
                background-color: #e4f6fd;
                background-size: 100% 100%;
              }
              &:nth-child(3) {
                background-image: url('../assets/home/ji_3.png');
                background-color: #fff7f9;
                background-size: 100% 100%;
              }
              &:nth-child(4) {
                background-image: url('../assets/home/ji_4.png');
                background-color: #eef3ff;
                background-size: 100% 100%;
              }
              div {
                padding-top: 8px;
                font-size: 26px;
                color: #000;
                font-weight: 600;
              }
            }
          }
        }
        .order {
          background-color: #fff;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 20px;
          .title_ {
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              font-size: 14px;
              cursor: pointer;
            }
          }
          .type {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            padding-top: 20px;
            .li {
              font-size: 30px;
              font-weight: 600;
              color: #000;
              width: 20%;
              div {
                color: #616065;
                font-size: 16px;
                padding-top: 10px;
              }
            }
          }
        }
        .bottom_b {
          display: flex;
          justify-content: space-between;
          .bot_le {
            width: 320px;
            .gys {
              background-color: #fff;
              border-radius: 12px;
              padding: 25px 20px;
              margin-bottom: 20px;
              .title {
                font-size: 20px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
                div {
                  color: #0ae1da;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .but {
                  width: 30px;
                }
              }
              .list {
                margin: 0 10px;
                padding: 20px 15px;
                border: 1px solid #ededee;
                border-radius: 8px;
                text-align: center;
                flex: 1;
                img {
                  width: 80px;
                  height: 80px;
                  border-radius: 8px;
                }
                .ti {
                  font-size: 18px;
                  font-weight: 600;
                  padding: 15px 0 8px;
                }
                .on {
                  padding-bottom: 8px;
                  font-size: 16px;
                  color: #4a4b51;
                }
                .txt {
                  font-size: 14px;
                  color: #88898e;
                  padding-bottom: 8px;
                }
                .go {
                  background-color: #0ae2db;
                  color: #fff;
                  text-align: center;
                  height: 38px;
                  line-height: 38px;
                  border-radius: 4px;
                }
              }
            }
            .mine_shop {
              background-color: #fff;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 20px;

              .title {
                font-size: 20px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
                div {
                  color: #0ae1da;
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .qhGods {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .but {
                  width: 30px;
                }
              }
              .list {
                padding: 0 10px;
                .shop_t {
                  padding: 10px 0;
                  display: flex;
                  justify-content: space-between;
                  img {
                    width: 76px;
                    border-radius: 8px;
                    margin-right: 15px;
                  }
                  .txt_3 {
                    height: 64px;
                    font-size: 14px;
                    line-height: 22px;
                  }
                }
                .price {
                  display: flex;
                  font-size: 12px;
                  margin-bottom: 5px;
                  color: #4a4b51;
                  p {
                    font-size: 12px;
                  }
                }
                .txt {
                  font-size: 12px;
                  color: #8d8e91;
                }
              }
            }
          }
          .bot_ri {
            width: 595px;
            .bot_ri_content {
              padding: 20px;
              background-color: #fff;
              border-radius: 12px;
              .title_ {
                font-size: 20px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
                div {
                  font-size: 14px;
                  cursor: pointer;
                }
              }
              .list_T {
                display: flex;
                align-items: center;
                justify-content: space-between;
                text-align: center;
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
      }
      .right_user {
        width: 440px;
        .top_user {
          background-color: rgba(255, 255, 255, 0.5);
          padding: 25px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          .name {
            display: flex;
            align-items: center;
            margin-bottom: 18px;

            .ant-upload-wrapper {
              // margin: 0 15px 0 30px;
            }
            ::v-deep .ant-upload {
              width: 58px !important;
              height: 58px !important;
              border-radius: 4px;
              border: none;
              height: 156px;
            }
            ::v-deep .ant-upload-wrapper {
              width: 58px !important;
              height: 58px !important;
            }
            .us_img {
              width: 58px !important;
              height: 58px !important;
              border-radius: 50%;
            }
            .u_right {
              margin-left: 8px;
              display: flex;
              flex-direction: column;
              .shop_name {
                font-size: 14px;
                margin-bottom: 5px;
              }
              .id {
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 22px;
              }
              .dj {
                display: flex;
                font-size: 14px;
                .fen {
                  display: flex;
                  color: #0ae1da;
                  align-items: center;
                  font-size: 14px;
                  margin-right: 12px;
                  img {
                    width: 16px;
                    height: 16px;
                    margin-right: 5px;
                  }
                }
              }
            }
          }
          .bal {
            background-color: #fff;
            border-radius: 8px;
            padding: 25px 20px;
            padding-top: 40px;
            position: relative;
            .ls {
              position: absolute;
              right: 20px;
              top: 18px;
              font-size: 14px;
              color: #0ae1da;
              cursor: pointers;
            }
            .z_bal {
              text-align: center;
              font-size: 26px;
              color: #000;
              div {
                color: #686868;
                padding-top: 8px;
                font-size: 16px;
              }
            }
            .two_bal {
              padding-top: 30px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .but {
              display: flex;
              justify-content: space-between;
              align-items: center;
              div {
                width: 46%;
                height: 38px;
                line-height: 38px;
                background-color: #0ae2db;
                border-radius: 4px;
                color: #fff;
                text-align: center;
                font-size: 14px;
              }
              .tx {
                border: 1px solid #e7e8e8;
                background-color: #fff;
                color: #bdbdbd;
              }
            }
          }
        }
        .xji {
          padding: 20px;
          background-color: #fff;
          border-radius: 12px;
          margin-bottom: 20px;
          .title_fy {
            display: flex;
            justify-content: space-between;
            border-radius: 12px;
            margin-bottom: 25px;
            .left {
              display: flex;
              align-items: center;
              image-orientation: 15px;
              font-size: 20px;
              font-weight: 600;
              img {
                width: 16px;
                margin-left: 5px;
                height: 16px;
              }
            }
          }
          .data {
            display: flex;
            justify-content: space-between;
            text-align: center;
            .li {
              div {
                padding-bottom: 8px;
                font-weight: 600;
                font-size: 24px;
              }
            }
          }
        }
        .tg {
          width: 100%;
          position: relative;
          margin-bottom: 20px;
          img {
            width: 100%;
          }
          .por_l {
            position: absolute;
            display: flex;
            top: 20%;
            font-size: 20px;
            font-weight: 600;
            left: 20%;
            width: 70%;
            color: #1e458e;
            p {
              font-weight: 600;
              margin-bottom: 0px;
            }
          }
          .por_r {
            display: flex;
            position: absolute;
            bottom: 20%;
            font-size: 20px;
            font-weight: 600;
            right: 20%;
            width: 70%;
            color: #1e458e;
            justify-content: flex-end;
            p {
              font-weight: 600;
              margin-bottom: 0px;
            }
          }
        }
        .bx_ {
          font-size: 20px;
          height: 120px;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          position: relative;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          img {
            position: absolute;
            width: 180px;
            bottom: 0;
            right: 0;
          }
          div {
            position: relative;
            z-index: 10;
            font-weight: 600;
          }
          .but {
            background-color: #0ae1da;
            padding: 10px 15px;
            width: 160px;
            font-weight: 400;
            color: #fff;
            border-radius: 8px;
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
  }
  .custom-class {
    .check {
      display: flex;
      padding-bottom: 12px;
      // border-bottom: 1px solid #cfcfcf;
      div {
        padding: 10px;
        color: #9e9ea1;
      }
      .check_t {
        font-weight: 600;
        position: relative;
        color: #000;
        &:after {
          position: absolute;
          left: 50%;
          bottom: -4px;
          content: '';
          transform: translateX(-50%);
          background-color: #1d1e25;
          height: 2px;
          width: 60%;
        }
      }
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 16px;
      }
    }
    .list {
      padding: 15px 0;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        margin-bottom: 10px;
        font-size: 16px;
        div {
          font-weight: 700;
          font-size: 20px;
        }
      }
      .kh {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #8d8e91;
        padding: 5px 0;
      }
      .red_ {
        font-size: 18px;
      }
    }
  }

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
          padding: 10px 16px;
          font-size: 14px;
          cursor: pointer;
        }
        .check {
          font-weight: 600;
          position: relative;
          &:after {
            content: ' ';
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
          .left {
            display: flex;
            // align-items: center;
            flex-direction: column;
          }
        }
      }
    }
  }
</style>
