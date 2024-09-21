import { BaseError } from "@core/hooks/request.ts"

export const errorReader = (error: BaseError) => {
    let errorText = ""
    for (const key of Object.keys(error.response?.data as Record<string, unknown>)) {
        errorText += error.response?.data[key] + " "
    }
    return errorText
}
