import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import translationUZ from "./uz.json"
import translationRU from "./ru.json"
import translationEN from "./en.json"
import { storage } from "@core/utils/storage.ts"

const resources = {
    uz: { translation: translationUZ },
    ru: { translation: translationRU },
    en: { translation: translationEN },
}

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: storage.getString("language") || "uz",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
