import { useFetch, useMutate } from "@core/hooks/request.ts"
import { MemberCreateType, MemberType } from "@users/types.ts"
import { request } from "@core/utils/baseAxios.ts"
import { useQueryClient } from "react-query"
import { MEMBER, MEMBER_CREATE, MEMBER_UPDATE } from "@users/urls.ts"

export const useMember = (enabled = false) => {
    return useFetch<MemberType>(["member"], () => request({ url: MEMBER, params: { userOnly: true } }), { enabled })
}

export const useMemberUpdate = (id: number) => {
    const queryClient = useQueryClient()
    const url = MEMBER_UPDATE.replace("{id}", String(id))
    return useMutate<MemberType, MemberCreateType>((data) => request({ method: "put", url, data }), {
        onSuccess: (data) => {
            queryClient.setQueryData<MemberType>(["member"], () => data)
        },
    })
}

export const useMemberCreate = () => {
    const queryClient = useQueryClient()

    return useMutate<MemberType, MemberCreateType>((data) => request({ method: "post", url: MEMBER_CREATE, data }), {
        onSuccess: (data) => {
            queryClient.setQueryData<MemberType>(["member"], () => data)
        },
    })
}
