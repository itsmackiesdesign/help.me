import { useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { CALL, CALL_STREAM_START } from "@call/urls.ts"
import { CallCreateType, CallType, JoinStreamType } from "@call/types.ts"

export const useCallCreate = () => {
    return useMutate<CallType, CallCreateType>((data) => request({ method: "post", url: CALL, data }))
}

export const useCallJoinStream = (id: number) => {
    const url = CALL_STREAM_START.replace("{id}", id.toString())
    return useMutate<JoinStreamType, void>(() => request({ method: "put", url }))
}
