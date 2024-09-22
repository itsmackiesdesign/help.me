import { useInfiniteFetch } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { MEMBER_LIST } from "@members/urls.ts"
import { MemberType } from "@members/types.ts"

export function useMemberList() {
    const PAGE_SIZE = 20

    return useInfiniteFetch<MemberType>(
        ["members"],
        ({ pageParam }) =>
            request({
                url: MEMBER_LIST,
                params: { page: pageParam, size: PAGE_SIZE },
            }),
        {},
        PAGE_SIZE
    )
}
