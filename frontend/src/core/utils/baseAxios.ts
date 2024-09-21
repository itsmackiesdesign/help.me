import axios, { AxiosRequestConfig } from "axios"
import humps from "humps"
import { auth } from "@users/utils/auth.ts"

export const domain = import.meta.env.VITE_BACKEND_URL

const baseAxios = axios.create({
    baseURL: `${domain}/api/v1/`,
    transformResponse: [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(axios.defaults.transformResponse as any),
        humps.camelizeKeys,
    ],
    transformRequest: [
        function (data, headers: AxiosRequestConfig["headers"]) {
            if (data instanceof FormData) {
                return data
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return humps.decamelizeKeys(data, headers as any)
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(axios.defaults.transformRequest as any),
    ],
})

baseAxios.interceptors.request.use((config) => ({
    ...config,
    params: humps.decamelizeKeys(config.params),
}))

export default baseAxios

export async function request(options: AxiosRequestConfig, isPublic = false) {
    const params = { ...options.params, lang: localStorage.language || "uz" }
    options = isPublic ? options : { ...options, ...auth(), params }
    const { data } = await baseAxios(options)
    return data
}
