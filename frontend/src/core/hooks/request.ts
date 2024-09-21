import { useCallback, useContext, useEffect, useState } from "react"
import { UseInfiniteQueryOptions, UseMutationOptions } from "react-query/types/react/types"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import useIntersectionObserver from "@core/hooks/observer"
import { ModelType, Pagination } from "@core/types"
import { ToastContext } from "@core/components/ToastProvider.tsx"

import {
    addToInfinite,
    addToList,
    deleteFromInfinite,
    deleteFromList,
    updateInfinite,
    updateList,
    updateObject,
} from "@core/utils/state"

import {
    InfiniteData,
    MutationFunction,
    QueryFunction,
    QueryKey,
    useInfiniteQuery,
    useIsFetching,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from "react-query"
import { signOut } from "@users/utils/auth.ts"
import { errorReader } from "@core/utils/errorReader.ts"

type ServerErrorType = Record<string, string>
export type BaseError = AxiosError<ServerErrorType>

function useErrorHandler(onError?: (err: BaseError) => void) {
    const { setToasts } = useContext(ToastContext)
    const navigate = useNavigate()
    const client = useQueryClient()

    return (error: BaseError) => {
        onError?.(error)

        if (error.response === undefined || error.response.status === 0) {
            setToasts((prev) => [
                ...prev,
                { key: "network error", color: "error", children: "Проверьте интернет соединение" },
            ])
        } else if (error.response.status >= 500) {
            setToasts((prev) => [...prev, { key: "server error", color: "error", children: "Ошибка сервера." }])
        } else if (error.response.status === 400) {
            setToasts((prev) => [...prev, { key: errorReader(error), color: "error", children: errorReader(error) }])
        } else if (error.response.status === 401) {
            signOut(navigate, client.invalidateQueries)
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

export function useInfiniteFetch<Data extends ModelType>(
    queryKey: QueryKey,
    queryFn: QueryFunction<Pagination<Data>>,
    options?: Omit<UseInfiniteQueryOptions<Pagination<Data>, BaseError>, "queryKey" | "queryFn">,
    pageSize = 50
) {
    const client = useQueryClient()
    const onError = useErrorHandler(options?.onError)

    const result = useInfiniteQuery(queryKey, queryFn, {
        getNextPageParam: (last, pages) => {
            const maxPages = Math.ceil(last.count / pageSize)
            const nextPage = pages.length + 1
            return nextPage <= maxPages ? nextPage : undefined
        },
        ...options,
        onError,
    })

    const observer = useIntersectionObserver({
        onIntersect: result.fetchNextPage,
        enabled: result.hasNextPage && !result.isFetchingNextPage,
    })

    const addItem = useCallback(
        (item: Data) => {
            client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, addToInfinite(item))
        },
        [queryKey]
    )

    const updateItem = useCallback(
        (item: Data) => {
            client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, updateInfinite(item))
        },
        [queryKey]
    )

    const deleteItem = useCallback(
        (id: number) => {
            client.setQueryData<InfiniteData<Pagination<Data>> | undefined>(queryKey, deleteFromInfinite(id))
        },
        [queryKey]
    )

    return { observer, addItem, updateItem, deleteItem, ...result }
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

export function useIsOnline() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        const online = () => setIsOnline(true)
        const offline = () => setIsOnline(false)

        window.addEventListener("online", online)
        window.addEventListener("offline", offline)

        return () => {
            window.removeEventListener("online", online)
            window.removeEventListener("offline", offline)
        }
    }, [])

    return isOnline
}
