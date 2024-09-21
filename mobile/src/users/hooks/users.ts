import { useFetch, useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { REFRESH, SEND_CODE, SIGN_IN, USER_SETTINGS } from "@users/urls.ts"
import {
    CheckInResponseType,
    CheckInType,
    RefreshTokenType,
    SignInType,
    UserType,
    UserUpdateType,
} from "@users/types.ts"
import { MessageType } from "@core/types.ts"
import { useQueryClient } from "react-query"
import { signIn } from "@users/utils/auth.ts"

export const useUser = () => {
    return useFetch<UserType>(["user"], () => request({ url: "user" }))
}

export const useUserUpdate = () => {
    const queryClient = useQueryClient()

    return useMutate<UserType, UserUpdateType>((data) => request({ method: "put", url: USER_SETTINGS, data }), {
        onSuccess: (data) => {
            queryClient.setQueryData<UserType | undefined>(["user"], () => data)
        },
    })
}

export const useSignIn = () => {
    return useMutate<MessageType, SignInType>((data) => request({ method: "post", url: SEND_CODE, data }, true))
}

export const useCheckIn = () => {
    return useMutate<CheckInResponseType, CheckInType>((data) => request({ method: "post", url: SIGN_IN, data }, true))
}

export const useRefreshToken = () => {
    return useMutate<RefreshTokenType, RefreshTokenType>((data) => request({ method: "post", url: REFRESH, data }), {
        onSuccess: (data) => signIn(data.token),
    })
}
