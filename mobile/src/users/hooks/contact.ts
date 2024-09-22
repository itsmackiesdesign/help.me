import { useFetchList, useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { ContactCreateType, ContactType } from "@users/types.ts"
import { ModelType } from "@core/types.ts"
import { CONTACT_DETAIL, CONTACT_LIST } from "@users/urls.ts"

export const useContactList = () => {
    return useFetchList<ContactType>(["contact list"], () => request({ url: CONTACT_LIST }))
}

export const useContactCreate = () => {
    return useMutate<ContactType, ContactCreateType>((data) => request({ method: "post", url: CONTACT_LIST, data }), {
        onError: (error) => console.log(JSON.stringify(error.response?.data, null, 2)),
    })
}

export const useContactUpdate = (id?: number) => {
    const url = CONTACT_DETAIL.replace("{id}", String(id))
    return useMutate<ContactType, ContactCreateType>((data) => request({ method: "put", url, data }))
}

export const useContactDelete = (id: number) => {
    const url = CONTACT_DETAIL.replace("{id}", String(id))
    return useMutate<ModelType, void>((data) => request({ method: "delete", url, data }))
}
