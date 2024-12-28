<template>
  <div class="footer">
    <div class="app-container head_b">
      <div class="footer-wrapper">
        <div class="footer-title">
          <div class="logo">
            <img src="../assets/logo.png" />
            MaCys Shop
          </div>
          <p>{{ $t('bo_01') }}</p>
          <div class="el-input">
            <!----><input
              v-model="yx"
              :placeholder="$t('bo_02')"
            /><!----><!----><!----><!---->
          </div>
          <div class="sub cur_p" @click="changeDy">{{ $t('bo_03') }}</div>
        </div>
        <div class="footer-nav">
          <div class="footer-nav-item">
            <span>{{ $t('bo_04') }}</span>
            <ul>
              <li class="el-tooltip" @click="changeCz">{{ $t('bo_05') }}</li>
              <!-- <li class="el-tooltip">联系我们</li> -->
              <li class="el-tooltip"></li>
              <li class="el-tooltip"></li>
              <li class="el-tooltip"></li>
            </ul>
          </div>
          <div class="footer-nav-item">
            <span>{{ $t('bo_06') }}</span>
            <ul>
              <li class="el-tooltip" @click="router.push('/yszc')">
                {{ $t('bo_07') }}
              </li>
              <li class="el-tooltip" @click="router.push('/thxy')">
                {{ $t('bo_08') }}
              </li>
              <li class="el-tooltip" @click="router.push('/shqh')">
                {{ $t('bo_09') }}
              </li>
              <li class="el-tooltip" @click="router.push('/mjzc')">
                {{ $t('bo_10') }}
              </li>
            </ul>
          </div>
          <div class="footer-nav-item">
            <span>{{ $t('bo_11') }}</span>
            <ul>
              <li class="el-tooltip" @click="router.push('/login?type=1')">
                {{ $t('bo_12') }}
              </li>
              <li class="el-tooltip" @click="goOrder">
                {{ $t('bo_13') }}
              </li>
              <li class="el-tooltip" @click="goShop">
                {{ $t('bo_14') }}
              </li>
            </ul>
          </div>
          <div class="footer-nav-item">
            <span>{{ $t('bo_15') }}</span>
            <ul>
              <li
                class="el-tooltip"
                @click="open('https://www.shopify.com/ph')"
              >
                {{ $t('bo_15') }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-wrapper">
        <div class="payment">
          <div class="title-f">{{ $t('bo_16') }}</div>
          <div class="payment-methods">
            <div class="pay" @click="open('https://www.binance.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABgFBMVEVMaXHwuQvxuAvxugvwuQrwuQvvtwvvtwjvrxDwugvvvxDvuAzvugvxuQvwuQvvtwvwugvxuwvvuAvvtQvvtwrvtgv6+vrwuQvwuQ/wuQr58tvxwSfwuhDxwCLywSX589zwuQ7246zxwSrxwSn589758dv6+/v69/PwuhX6+vv6+PX00mfxvyLxwCvxwCTxwCj58+T58tz58uDywSf58+L58t3xwCnxwCf58djywCj5+PT236L246701HH003D59/P00m3xwTL58NjxwjTywCf58t/ywCr58tnywCv01Yb58+D58dzxwTP58d7zzFzywCPzzl/xwCb014/58t7xwS70z1/13ZT01G/5893236b246v24qz01Gvz0WL124v34rDzzWHwuhfwuRL23qLzzmX24ar236X24an24af247D23KD00GrwuhT00W324qr24qj24qf236n236P24KXwuxj236HwuAr13KDwuRTwuQn236T0z2b00GbyzWHzzWDzz2ZuBGpuAAAAFnRSTlMAz5+f399gIBDvEJAwj++gz4+QMKCQP3dnLAAAAdNJREFUGBllwYV220AQQNExSCvZ4bbzJLPDzMxlZmZmZm5/vRtrT5Im98qWwE+nQghTGT+Q3UxzyJaMkf8FzezQHsg2JoszUsTxjGxqyuIUCxNjON4ecUwWZ7RbdWYUxzPSEGRx5k6r1T2F4wWyoRmnWNCGwhGcdrEMzmy3OoUpHCMiGRJjPWotv1drZoFEh0iORPGaWl+j6K1aPQs0tATik7i9qDpQjyD6oKqD50j4ksF5tKb1CKu/rr23YhJpSWGV79Tg9Y9++PUbomerMdHxs1htEgLne/T6A4hhXfvWIYbohlYrQIsAxYKqLtWAP2uqOgT0L6lq4RggwMhJVX34ChgaUB38CZQeq+rEIUBCoOuE3ozgO/HqYO8KfIH7d3VyFmiRFFbXhYh45WNE/HcIPj19CaUrc1htspdEfLVX33zDKj3XvnsQsyEtPokzi6r6uQal5QHVvsskfMmFNJy6qNa7WumFWtUKiUCkg8SlabWe1NWaL5NIi4jB6RxXp1rGMWLlcQ4e1oajFZy8bMhlcTqn1ZofxvECaTBZnK5x1eowjmfEacri7J88UMHxmmSTyeJ0lnE8I9vk8uyQD+R/ppUt4T4juwV+ayqEMJX2A9n0D37eYD1E3XEXAAAAAElFTkSuQmCC"
              /><span>Binance</span>
            </div>
            <div class="pay" @click="open('https://www.htx.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABUFBMVEVMaXH///////////////////////////////////////////////8cIUMqquApquCztcAtq+EbIEMaH0IeI0Vjwejb8fpow+mFz+6SlaZ1yOtKt+X09fd2yeu0tMApqeDv+P3t+PwoLU1tcIecnq7n5+q9vsimqLZ2x+qho7LR0tjC5vY3O1qq3vNwc4mtrbq3usXe3+T3+Pj6+vv1+/7i5Og/Q2CprLkkKUoyN1WM0e4yOFcsMVF5fI9ydosbIEJUWHKw3/P9/f07P1yzs78+suOfobFna4IaIEKk2vJgZH1Tuubn6Ozk9PtQVG78/v/f8voqLk9NUWz4/P49Ql+P0++kprMvM1NHteX39/ja3OH6/P6RkqMwrOF5yew0OFa44vSSlKVLUGzg4eZlwund8fo0OVno9vyvsbyFzu3i4+hGteS95Pb19feIi51XW3M9wjk2AAAADHRSTlMAYJCP75/P3yAQMKDK7SVNAAABaklEQVQ4y4WTVZeDMBCFAy0U2plU193dXbvu7u6u//9tk24hA+WczlMm3yVzw0wYc8PWDDMMEDYNzWaFYYUEdMOwfNgOgS9CnlOsCBREhBwSDeBCEQ36fizgDJvwoak+qvj3Qf0NZEYHqdNcAVq3H1MJmssiBt2YRZyhuS4c0HxkAnGOboRtptG8FxGPPHfVPBU60kLw4BEYzFRJ27jgeA+HRGAy1aLWaclfPuDumJhg7rKlW/LMG8ATX1cKJWiSHH8AvuJ8eVgJnBLVjZL/fsPrJ+e8R5VwTNZKfvsI8C44r1EmY/lVhRRcATxfS0GJuqbzo5oFX7sAuJGcl6kfZedNdGYRTwEuz3KCckcgGq7nl4uI+wB7ccnrSt0Kqt0rKUxvwXZSCippu90jNhBPYHdT8KoG1W0ycgureHAO8/Fke7135NTQJnaWACa7Cge/2NgXfzjCh+7nuv8BWzE6iroV8L5tLRbw/P8Aqe85qk35kwoAAAAASUVORK5CYII="
              /><span>Huobi</span>
            </div>
            <div class="pay" @click="open('https://www.okx.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAgVBMVEVMaXEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAADZ2dnz8/Ps7Ozr6+vc3NyysrJVVVVvb29ZWVl3d3e/v7+1tbW3t7e+vr6fn5+rq6vLy8uvr6+8vLyZmZmmpqalpaXe3t7CwsLFxcWzs7OioqKkpKS0tLSe03pJAAAADHRSTlMAYJCP75/PECDfMKA7W4s6AAAA4ElEQVQ4y42T1xLEIAhF1Wg0hWzvvZf//8AV3Mm4Kbr3JUM4AgowVktzlUoAmSquWVsmsc5ayjTcOoGGkp8oJoOWMi9I3uG3RB4678fQ1n8boY7OcSGjsoSrA+urStTYARMyBlgpJYB+ADCJCgHCVgAhQGrGgwBwlwHOG9R7TnouUTv35iz1Lj6lo+XC+5UyGQYkgzAAcSCaIlpkQd/TGvWYkV4r1OF7zehDaRkEbMNFCFD/tJtC9ACiHrn7ELV3wJaMaz1y0aGNj318cWwdoukXzQU2hd8iYTr2W/OiY/0/wzcsB83QzNwAAAAASUVORK5CYII="
              /><span>OKX</span>
            </div>
            <div class="pay" @click="open('https://www.kraken.com/')">
              <img
                src="data:image/png;base64,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"
              /><span>KraKen</span>
            </div>
            <div class="pay" @click="open('https://www.coinbase.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA/FBMVEVMaXEAUf0AUv8AUPoAUv8AUP8AUPcAUv4AUP8AUv4AUf8AUPwAUf0AUvwAU/4AUf4AUP////8AUv4AUf4AUP4WX/42df4KWP42dP4DU/7f6P+qw//o7/+3zf9gkf7k6//5+/9Bff6vxv9unP5hkv6AqP/g6P9AfP5Cff6owv+Ap/5llf/f5/+Nr//g5/9fkP6lwP6Orv4+e/6Mr/+qw/5gkP7l7P+0yv9hkv/3+P8/e/7e5v9llf6Lrv6lwP/p7//4+f/3+v8DUv62zP+Nrv6Jrf+Jrf4XYP73+f9tnP9nlv6Krv9/qP5unf6mwP4ycv5mlv4KWf4CUv60y/9rlFLOAAAAEXRSTlMAkI8wnyAg3xDvz2CgYM/PYN8HObAAAAFrSURBVDjLhVPXdoMwDDWEJCaQpqzQLLJH99577/3//1JbslPjcE7uC9K9wpIsmZApqGOVbN+3S1aZklnkTSZOYRU0mZq+BjN1Sr7oz6CoHJLL0FlELuP/IAxnz6BSj1cP20+dUWtwIyOwDlnfc9MTWDuSlUIC4dx7CtYFyZNYaO56Kbwia7AK0Nr0NLwDbVPigFGrA7vVjaKdBpjNGISyyLAP5EoArb6B84V3Thbge8upvUBcxgf3fsEuERzRKafG8oYm3GtDuE2ACa849SgDvqsMn2iLgGMeEMmAnyWGKiYUKdo8YCIDxtwbYZ+iyB6nlmWR0GhLFOnC9ww6G2KbQ3AS0eYiDhIH1TiJou4FmPWauCiKRfT1qx5gOjZwA62HtL4tllcZ952qnwf/45ZH+Eldypd9fzptdeVqSWujc33Qe4nTK6ctbZCx+PPWfv7DYXUYum7oDzjvKqptFDLeN3XcCn/+FctR/v4Ddz1A7t4UZBEAAAAASUVORK5CYII="
              /><span>Coinbase</span>
            </div>
            <div class="pay" @click="open('https://www.bitoex.com/')">
              <img
                src="data:image/png;base64,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"
              /><span>MetaMask</span>
            </div>
            <div class="pay" @click="open('https://www.kucoin.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABelBMVEVMaXETrowQr48Qr4AQp4cSrowTrYoSro0Qr4cTro0Qn4AQn48SrowTro0Ur40TrowSro0TrY0Sr4wTrosTr40Tr4wTrY0Qr4oUrowSr40VqooQqooSrowSrosTror///8Troyq4dXf9O/9/v76/v4SrowTrYvZ8u0uuJl50b8vuJn8/v4utpjg9O8Wr40RrYsWrox40b43u5560b85u56b3M6a3M7Z8ezY8exIv6Z30b6E1cSF1cQvuJoktJQ4up78//8ut5hLw6n9/v+i39Jgx7B70b9szbmj39Pu+PdLwahSw6v0+vkYr44yuZuM18af3dCt49eR2co4u58Xro2a3M225ts5u584uZ3b8+3a8uwvtpg2u57y+vgSrYs4u56a287f8+4ut5c5uJ38//7g8+/Y8uwyuJpHwKed3M86vKCM1sWc3M4rtZYRrYrZ8+0csZEtuJmC08FiybNrzLfn9PHt+fZhx7Ejs5SJ1sW35Nsjs5Nmy7a96uGD1Bb0AAAAH3RSTlMAkBAQIM9g3yDfEBDv74/v72CfoJ+fnzDPjzAwkKCQ88IaOAAAAbhJREFUOMttk1dDGlEQhYe+giigRk07n7tuIGCAFEuq6b333nvvPf89D7vLLsi8nu/cmTvFrBfFam2mDOWZyXzR1kZ2rEwck9kBuTjLQIyV+uwjrImRxCMbhugwsn64/8De3QNvFPv0BVfenogI6pgFrl67fgWAQ66k1vaoUjOzLMBl6VYn8EtSa2tIZM1sHcCcNL8FHruSPEleSKTM0sTArm2S6u/eSvKOAzBesnwMBHqT7pKkgycAyAcZmJPmn4Q6dBclHQWgZrkIePpMUr0BQPeNTp0GIGejEaBA9//+/tXh/cvzQZXjRgJYacCfb9LXROP6gHrT5+d36Qv4fgT0pfjQ8Pnx7/NHv/N6IUrRK7L1SNLKJwC//Upnz4RFbup986YrabkBfntR0kkApqwaN+qGK2m5SXtJ0pFjYaPSo3GrH7iSnr94KMkLB1oy25gY1l1X0r3EsKbMzAG4IN2+D+wIxh3pOGZmKeDcxUt3ICK8nfSmbWbpQnLlVt1YL2SCpXT6iP37Dke6E631dGHY2hem48NwhhCx38wsnRrUU5mB63QmEmplszPkvjP5iVwFKrlaNeH+D0pgdXTVzo/YAAAAAElFTkSuQmCC"
              /><span>KuCoin</span>
            </div>
            <div class="pay" @click="open('https://max.maicoin.com/')">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACUlBMVEVMaXH///////////////////////////////////////////////////////////////////////////////8tRpIuR5OXpMna3uyzvdhidK35+vwvSJNhdK39/f5QZKRcb6rGzOH7+/329/v8/f3b3+y9xd06UZkySpUwSJMxSpRecqz+/v4zS5X+/v/6+/07Upn6+/zx8vieqs3i5fA1TZYuR5IuRpKsttTd4e04UJg0TJXw8vdld68wSZSIlsG2vtnd4u3FzOGqtdOtt9Sps9Lk6PGcqMyrtdTn6vMyS5Tx8vfIz+M8VJnV2uje4u63wNquuNV+jbw1TpfN0uXm6fIwSZOrtdO4wdqYpMrY3ev09fmirc9sfbJNYqI9VJrS1+iYpMmXo8nv8fY8U5o4UJfN0+VoerFwgbR/jr17i7pugLTo6vNPZKPq7PTHzuJAVpx1hbjS1+fDy+BGXJ/n6fJhda3v8fdyg7VCWJ3u8Pbr7fX8/P319vqUocj5+fs0TZVfcqzc4e03T5fT1+i7w9z3+Pvb4OxVaabR1+cySpS8xdyQncXp6/NDWZ719vmBkL6+xd6GlcHb3+03TpdIXaBnebCyu9eVoshBV52Ckb5JX6FBV5w6UpnL0uRRZqXn6vLm6vM8VJqeqc15ibrz9fmqs9Nkd69LYKI0TJbT2OjAx97X3Orl6PHi5vCJl8JOY6Pe4e1rfLL19/rJz+RrfLFmd69uf7QzTJVRZqT4+PtLYaGwudbY3Ot0hLfW2+pCWJySn8fGzOLDyuBoerDEy+CeWUS1AAAAFHRSTlMAkHAQz4Bg3+8gQJ+Pr6C/f1BvsFc6sn4AAAL+SURBVFjDrVdlg9pQEAwHIQl6tLsk7XHQ0nN3v17d3d3d3d3d3d3d3fu/+khSIBxwJO/m00Rm3j7JZpdhEkCwOpwWDgg4i5P1CIwu2ByyNBqc3Zaq2pzOQ1xwVoFGHgLvaNOiQxK5EkVSueCGNsEJxodX55GWSO+AFJEeX2+HlGGPp7eADlioxo8bQzrohCNm/UE3NHsh8PoN+OjzwIEBuCN6KxhCeBICZ8yAN+s9gbFgja+gJgQrAF0InHEDXs5/QAGb/o9ACxPdDEh6InsAVBAYD52BlWHpDEyM8z/tKRIMk+nkKYT2UG5PmiiK/UIk2FsU+5SHWI4o9vWrqo6RTNbJi4jNMt3rI7SzTEvXETpKpr3KsKY/EY4YjQ1DIrmN0xj49hD2+i2GDU4WEFo8XOYDBmHeBBgzFPNGRm0DRBl88OE5wt74sEE1OH4du19CnKq8Mr4R586ajuPq/JFF0BgUfsTaJ1D6DRtbVIN7+Xjn7lWsnSG/UlQZisdbmQUJDDLravBV0fdi/PNbMbj5AB8+gtuI8xVN+UJisCgICQ2aPqPv60/M+9tVMbjgw/s3mqrOYNm80Cv+nI3EIHe1xiB6ETO7fUF8/wObSxWDZ1cQbwUCgWrEBdvJDHLOYnVhMa5YnhW1iBaNQcYLMkT3XyAblDxHvNglhFzMPQxw8BgeOrJ5ZT6uWRX1i3JqDOA8MXgXVAxeXsYd1zJCmIm4c9/+ABac2gpLFntxaT2ED5JJaxAM4O7HIBv4W7y4YYv8rGIO5m87gN4T68nF2kLEaWPDOSmc0GZnS09LAAZK2RkAnySpvuSoJFWoD6skaZcknd4kXyzLlqTB6gMP/edMnVAii2AE9vZIqgxPNwOGJicpRaPZ+K9NLRFYmr8CTQiRmjWNZgVkuI1vQTsVWUYmEVNy6z7QbGyp6tKnd7V/sa0rBlf8hoHVewJbIY2y5UmtZnUn7/ysnPHh1SBMyRpP1pxC7yokiiI1udJ8u1o33yabvgZe8LCR9t+UuO3+ByeHPZNCxB3rAAAAAElFTkSuQmCC"
              /><span>Bitfinex</span>
            </div>
          </div>
        </div>
        <div class="argos">
          <div class="title">MaCys-Wholesale</div>
          <div class="dec">
            {{ $t('bo_17') }}
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p style="text-align: center">
          MaCys-Wholesale @2024 all rights reserved
        </p>
        <p style="text-align: center">
          Shopify is headquartered in Ottawa, 151 O'Connor Street, Ground Floor,
          Canada, and has 6 office locations.
        </p>
      </div>
    </div>
    <!---->
  </div>
  <van-popup
    v-model:show="risk_pop"
    position="center"
    :style="{ height: '50%', width: '20%' }"
    :close-on-click-overlay="false"
    round
    :overlay="true"
  >
    <NoticePop
      :pop_title="$t('np_01')"
      :pop_title_color="'#f40000'"
      :pop_title_icon="'warn-o'"
      :content_title="risk_pop_data.content_title"
      :content_des="risk_pop_data.content_des"
      :button_text="$t('op_11')"
      :is_mandatory="risk_pop_data.is_mandatory"
      @funCloseIcon="risk_pop = false"
      @funButton="noticePopButton"
    />
  </van-popup>
</template>

<script setup lang="ts">
  import i18n from '@/lang'
  import {
    api_getOption,
    api_emailSubscription,
    api_getInfo,
    api_riskNewsInfo,
    api_updateNewsStatus,
  } from '@/requset/api'
  import { message } from 'ant-design-vue'
  import router from '@/router'
  import { ref, defineEmits } from 'vue'

  const emit = defineEmits(['shopTrue'])

  let yx = ref<string>('')
  const isSeller = ref<boolean>(false)

  let risk_pop = ref(false)
  let risk_pop_data = ref({
    id: 0,
    content_title: '',
    content_des: '',
    is_mandatory: false,
  })

  if (sessionStorage.getItem('token')) {
    getRickData()
  }
  function getRickData() {
    api_riskNewsInfo({ type: 1 }).then((res: any) => {
      if (res.success) {
        // || res.data.is_read == 0
        if (res.data.id) {
          let isShow = res.data.show_type == 2 || res.data.show_type == 4
          risk_pop.value = isShow
          risk_pop_data.value.id = res.data.id
          risk_pop_data.value.content_title = res.data.title
          risk_pop_data.value.content_des = res.data.content
          risk_pop_data.value.is_mandatory =
            res.data.show_type == 2 || res.data.show_type == 4
          if (!isShow) {
            api_updateNewsStatus({ id: res.data.id }).then((res) => {
              console.log(`res = ${res}`)
            })
          }
        }
      }
    })
  }

  function noticePopButton() {
    if (risk_pop_data.value.is_mandatory == false) {
      risk_pop.value = false
    }
    // 联系客服
    api_getOption({}).then((res: any) => {
      if (res.code == 200) {
        let serviceUrl = res.data.recharge_service_link
        if (serviceUrl != '' && serviceUrl != null) {
          window.open(serviceUrl)
        } else {
          message.error(i18n.global.t('bo_18'))
        }
      }
    })
  }

  const open = (url: string) => {
    window.open(url, '_blank') // 使用'_blank'标识符在新标签页中打开URL
  }

  // api_getInfo({}).then((res: any) => {
  //   isSeller.value = res.data.utype == 1
  // })

  function goOrder() {
    // if (!isSeller.value) {
    //   emit('shopTrue', 'ture')
    //   return
    // }
    router.push('/order')
  }
  function goShop() {
    // if (!isSeller.value) {
    //   emit('shopTrue', 'ture')
    //   return
    // }
    router.push('/user_shop')
  }

  const changeCz = () => {
    api_getOption({}).then((res: any) => {
      if (res.success) {
        let serviceUrl = res.data.recharge_service_link
        if (serviceUrl != '' && serviceUrl != null) {
          window.open(serviceUrl)
        } else {
          message.error(i18n.global.t('bo_18'))
        }
      }
    })
  }

  function changeDy() {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegex.test(yx.value)) {
      message.error(i18n.global.t('bo_19'))
      return
    }
    api_emailSubscription({ email: yx.value, telephone: yx.value }).then(
      (res: any) => {
        if (res.success) {
          yx.value = ''
          message.success(i18n.global.t('bo_20'))
        } else {
          message.error(res.message)
        }
      }
    )
  }
</script>

<style lang="less" scoped>
  .footer {
    position: relative;
    z-index: 10;
    background-color: #000;
    color: #fff;
    .footer-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      border-top: 0.2px solid #3f3f3f;
      border-bottom: 0.2px solid #3f3f3f;
      margin-bottom: 30px;
      &:nth-child(1) {
        padding-top: 30px;
        border: none;
        align-items: flex-start;
        margin-bottom: 0;
      }
      .footer-title {
        margin-right: 150px;
        .logo {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 30px;
          margin-bottom: 50px;
          img {
            margin-right: 10px;
            width: 50px;
            border-radius: 6px;
          }
        }
        p {
          color: #eb174f;
        }
        .el-input {
          margin-bottom: 26px;
          input {
            width: 320px;
            height: 44px;
            border-radius: 8px;
            font-size: 15px;
          }
        }
        .sub {
          border: 1px solid #eb174f;
          padding: 15px 0;
          width: 160px;
          text-align: center;
          color: #eb174f;
          font-size: 14px;
        }
      }
      .footer-nav {
        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
        flex: 1;
        .footer-nav-item {
          // width: 25%;
          span {
            color: #eb174f;
            font-size: 18px;
          }
          ul {
            padding-top: 20px;
            li {
              line-height: 50px;
              font-size: 13px;
              cursor: pointer;
              &:hover {
                color: #eb174f;
              }
            }
          }
        }
      }
      .payment {
        width: 40%;
        .title-f {
          padding-left: 20px;
          margin-bottom: 20px;
        }
        .payment-methods {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          .pay {
            margin-bottom: 20px;
            width: 25%;
            text-align: center;
            &:hover {
              color: #eb174f;
            }
            img {
              margin: 0 auto;
              width: 35px;
              height: 35px;
              margin-bottom: 8px;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
      .argos {
        padding: 0 140px 0 60px;
        .title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .dec {
          font-size: 14px;
        }
      }
    }
    .footer-bottom {
      font-size: 12px;
      color: #bbb;
      padding: 15px 0;
      p {
        margin-bottom: 30px;
      }
    }
  }
  input {
    background-color: #fff;
    color: #474747;
  }
</style>
