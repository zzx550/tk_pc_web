import { createStore } from 'vuex'

export default createStore({
  state: {
    countryLang: [
      { lang: "zh", value: "中文简体" },
      { lang: "en", value: "English" },
      { lang: "hk", value: "中文繁體" },
      { lang: "ja", value: "日本語" },
      { lang: "ko", value: "한국인" },
      { lang: "th", value: "แบบไทย" },
      { lang: "vi", value: "Tiếng Việt" },
      { lang: "id", value: "Indonesia" },
      { lang: "de", value: "Deutsch" },
      { lang: "fr", value: "Français" },
      { lang: "russian", value: "Русский" },
    ],
    currencyUnit: [
      { lang: "zh", unit: "RMB" },
      { lang: "id", unit: "IDR" },
      { lang: "th", unit: "THB" },
      { lang: "fr", unit: "FRF" },
      { lang: "de", unit: "DEM" },
      { lang: "en", unit: "USD" },
      { lang: "hk", unit: "HKD" },
      { lang: "ja", unit: "JPY" },
      { lang: "russian", unit: "SUR" },
      { lang: "ko", unit: "KRW" },
      { lang: "vi", unit: "VND" },
    ],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
