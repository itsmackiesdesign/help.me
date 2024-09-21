import type { Config } from "tailwindcss"
import daisyui from "daisyui"

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                healthcare: {
                    primary: "#D32F2F",
                    secondary: "#37474F",
                    accent: "#FFCDD2",
                    neutral: "#212121",
                    "base-100": "#FFFFFF",
                    info: "#0288D1",
                    success: "#388E3C",
                    warning: "#FBC02D",
                    error: "#D32F2F",
                },
            },
        ],
    },
}
export default config
