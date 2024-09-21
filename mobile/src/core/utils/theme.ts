import { Theme } from "@emotion/react"
import { storage } from "@core/utils/storage.ts"

const lightColors: Theme = {
    primary: "#D32F2F",
    secondary: "#37474F",
    accent: "#FFCDD2",
    neutral: "#212121",
    "base-100": "#FFFFFF",
    info: "#0288D1",
    success: "#388E3C",
    warning: "#FBC02D",
    error: "#D32F2F",
}

const darkColors: Theme = {
    primary: "#D32F2F",
    secondary: "#37474F",
    accent: "#FFCDD2",
    neutral: "#212121",
    "base-100": "#FFFFFF",
    info: "#0288D1",
    success: "#388E3C",
    warning: "#FBC02D",
    error: "#D32F2F",
}

export const getTheme = storage.getString("theme") === "dark" ? darkColors : lightColors

export { lightColors, darkColors }
