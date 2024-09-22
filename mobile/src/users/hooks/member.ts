import { useFetch, useMutate } from "@core/hooks/request.ts"
import { MemberCreateType, MemberType } from "@users/types.ts"
import { request } from "@core/utils/baseAxios.ts"
import { useQueryClient } from "react-query"
import { MEMBER, MEMBER_CREATE, MEMBER_UPDATE } from "@users/urls.ts"

export const useMember = () => {
    return useFetch<MemberType>(["member"], () => request({ url: MEMBER, params: { userOnly: true } }))
}

export const useMemberUpdate = () => {
    const queryClient = useQueryClient()

    return useMutate<MemberType, MemberType>((data) => request({ method: "put", url: MEMBER_UPDATE, data }), {
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
        onError: (error) => console.log(JSON.stringify(error.response?.data)),
    })
}
