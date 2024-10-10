import { createI18n } from "vue-i18n";

// 印尼语（印度尼西亚）: id
// 泰语（泰国）: th
// 法语: fr
// 德语: de
// 英文: en
// 繁体: hk
// 日本: ja
// 俄语: russian
// 韩国: ko
// 越南语: vi
// 波兰语: bl
// 土耳其语: teq
// 意大利语: ydl

import id from "./id";
import de from "./de";
import fr from "./fr";
import th from "./th";
import zh from "./zh";
import en from "./en";
import hk from "./hk";
import ja from "./jp";
import ko from "./ko";
import russian from "./russian";
import vi from "./van";
import bl from "./bl";
import teq from "./teq";
import ydl from "./ydl";

if (!sessionStorage.getItem("lang")) {
  sessionStorage.setItem("lang", "en");
}

const i18n = createI18n({
  locale: sessionStorage.getItem("lang") || "en",
  messages: {
    id,
    de,
    fr,
    th,
    zh,
    en,
    hk,
    ja,
    ko,
    russian,
    vi,
    bl,
    teq,
    ydl,
  },
});

export default i18n;
