import { useCallback } from "react"
import { AxiosError } from "axios"
import { UseMutationOptions } from "react-query/types/react/types"
import { ModelType, Pagination, StackNavigationType } from "@core/types"
import { addToList, deleteFromList, updateList, updateObject } from "@core/utils/state"
import {
    MutationFunction,
    QueryFunction,
    QueryKey,
    useIsFetching,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from "react-query"
import { useNavigation } from "@react-navigation/native"
import { showToast } from "@core/utils/toast.ts"
import { errorReader } from "@core/utils/errorReader.tsx"
import { signOut } from "@users/utils/auth.ts"

type ServerErrorType = Record<string, string>
export type BaseError = AxiosError<ServerErrorType>

function useErrorHandler(onError?: (err: BaseError) => void) {
    const navigation = useNavigation<StackNavigationType>()
    const client = useQueryClient()

    return (error: BaseError) => {
        onError?.(error)
        showToast({ type: "error", title: errorReader(error) })

        if (error.response === undefined || error.response.status === 0) {
            showToast({ type: "error", title: "Please check internet connection" })
        } else if (error.response.status >= 500) {
            showToast({ type: "error", title: "Server error" })
        } else if (error.response.status === 401) {
            showToast({ type: "error", title: "Sign in again" })
            signOut()
            navigation.navigate("SignIn")
            client.invalidateQueries()
        } else if (error.response.status === 400) {
            showToast({ type: "error", title: errorReader(error) })
        }
    }
}

export function useFetch<Data = unknown>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Data>,
    options?: Omit<UseQueryOptions<Data, BaseError>, "queryKey" | "queryFn">
) {
    const onError = useErrorHandler(options?.onError)

    return useQuery<Data, BaseError>(queryKey, queryFn, {
        ...options,
        onError,
    })
}

export function useFetchList<Data extends ModelType>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Pagination<Data>>,
    options?: Omit<UseQueryOptions<Pagination<Data>, BaseError>, "queryKey" | "queryFn">
) {
    const client = useQueryClient()
    const result = useFetch(queryKey, queryFn, options)

    const addItem = useCallback(
        (item: Data) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, addToList(item))
        },
        [queryKey]
    )

    const updateItem = useCallback(
        (item: Data) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, updateList(item))
        },
        [queryKey]
    )

    const deleteItem = useCallback(
        (id: number) => {
            client.setQueryData<Pagination<Data> | undefined>(queryKey, deleteFromList(id))
        },
        [queryKey]
    )

    return { ...result, addItem, updateItem, deleteItem }
}

export function useFetchOne<Data>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Data>,
    options?: Omit<UseQueryOptions<Data, BaseError>, "queryKey" | "queryFn">
) {
    const client = useQueryClient()
    const result = useFetch(queryKey, queryFn, options)

    const setData = useCallback(
        (item: Partial<Data>) => {
            client.setQueryData<Partial<Data> | undefined>(queryKey, updateObject(item))
        },
        [queryKey]
    )

    return { ...result, setData }
}

export function useMutate<Data, Variables>(
    mutationFn: MutationFunction<Data, Variables>,
    options?: Omit<UseMutationOptions<Data, BaseError, Variables>, "mutationFn">
) {
    const onError = useErrorHandler(options?.onError as (err: BaseError) => void)
    return useMutation(mutationFn, { ...options, onError })
}

export function useIsUpdating() {
    const isLoading = useIsFetching({ predicate: (query) => query.state.status === "loading" })
    const isFetching = useIsFetching()

    return isFetching && !isLoading
}
