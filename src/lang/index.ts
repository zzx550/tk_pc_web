import { createI18n } from "vue-i18n";

import zh from "./zh";
import en from "./en";

const i18n = createI18n({
  locale: sessionStorage.getItem("lang") || "en",
  messages: { zh,en },
});

export default i18n;