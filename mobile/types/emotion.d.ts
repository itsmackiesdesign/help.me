import "@emotion/react"

declare module "@emotion/react" {
    export interface Theme {
        primary: string
        secondary: string
        accent: string
        neutral: string
        "base-100": string
        info: string
        success: string
        warning: string
        error: string
        lightGray: string
    }
}
