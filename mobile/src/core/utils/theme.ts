import { Theme } from "@emotion/react"
import { storage } from "@core/utils/storage.ts"

const lightColors: Theme = {
    primary: "#f65275",
    secondary: "#FFFFFF",
    accent: "#ffc658",
    neutral: "#212121",
    "base-100": "#11111f",
    info: "#0288D1",
    success: "#388E3C",
    warning: "#FBC02D",
    error: "#D32F2F",
    lightGray: "#9aa0a3",
}

const darkColors: Theme = {
    primary: "#f65275",
    secondary: "#FFFFFF",
    accent: "#ffc658",
    neutral: "#212121",
    "base-100": "#11111f",
    info: "#0288D1",
    success: "#388E3C",
    warning: "#FBC02D",
    error: "#D32F2F",
    lightGray: "#9aa0a3",
}

export const getTheme = storage.getString("theme") === "dark" ? darkColors : lightColors

export { lightColors, darkColors }
