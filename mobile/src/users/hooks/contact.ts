import { useFetchList, useMutate } from "@core/hooks/request.ts"
import { request } from "@core/utils/baseAxios.ts"
import { ContactCreateType, ContactType } from "@users/types.ts"
import { ModelType } from "@core/types.ts"

const useContactList = () => {
    return useFetchList<ContactType>(["contact list"], () => request({ url: "/contacts" }))
}

const useContactCreate = () => {
    return useMutate<ContactType, ContactCreateType>((data) => request({ method: "post", url: "/contacts", data }))
}

const useContactUpdate = () => {
    return useMutate<ContactType, ContactCreateType>((data) => request({ method: "put", url: "/contacts", data }))
}

const useContactDelete = () => {
    return useMutate<ModelType, void>((data) => request({ method: "delete", url: "/contacts", data }))
}
