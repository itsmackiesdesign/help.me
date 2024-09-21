import { useInfiniteFetch } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { CALL_LIST } from "@call/urls.ts"
import { CallType } from "@call/types.ts"


export function useCallList() {
    const PAGE_SIZE = 100

    return useInfiniteFetch<CallType>(
        ["calls"],
        ({ pageParam }) =>
            request({
                url: CALL_LIST,
                params: { page: pageParam, size: PAGE_SIZE },
            }),
        {},
        PAGE_SIZE
    )
}
