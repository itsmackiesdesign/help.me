import axios, { AxiosRequestConfig } from "axios"
import humps from "humps"
import { API_URL } from "@env"
import { auth } from "@users/utils/auth"

export const domain = API_URL

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
    const authorization = auth()
    options = isPublic ? options : { ...options, ...authorization }
    const { data } = await baseAxios(options)
    return data
}
