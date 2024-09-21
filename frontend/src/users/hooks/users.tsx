import { useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { CHECK_IN, SIGN_IN } from "@users/urls.ts"
import { CheckInFormData, CheckInType, SignInFormData, SignInType } from "@users/types.ts"

export function useSignIn() {
    return useMutate<SignInType, SignInFormData>((data) => request({ method: "POST", url: SIGN_IN, data }, true))
}

export function useCheckIn() {
    return useMutate<CheckInType, CheckInFormData>((data) => request({ method: "POST", url: CHECK_IN, data }, true))
}
