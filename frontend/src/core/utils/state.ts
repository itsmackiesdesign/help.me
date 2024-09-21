import { InfiniteData } from "react-query"
import { ModelType, Pagination } from "../types"

export function addToInfinite<Data>(item: Data) {
    return (old: InfiniteData<Pagination<Data>> | undefined) => {
        if (!old?.pages) return
        const firstPage = old.pages[0]
        old.pages[0].results = [item, ...firstPage.results]
        return old
    }
}

export function updateInfinite<Data extends ModelType>(newItem: Data) {
    return (old: InfiniteData<Pagination<Data>> | undefined) => {
        if (!old?.pages) return
        return {
            ...old,
            pages: old.pages.map((page) => ({
                ...page,
                results: page.results.map((item) => (item.id === newItem.id ? newItem : item)),
            })),
        }
    }
}

export function deleteFromInfinite<Data extends ModelType>(id: number) {
    return (old: InfiniteData<Pagination<Data>> | undefined) => {
        if (!old?.pages) return
        return {
            ...old,
            pages: old.pages.map((page) => ({
                ...page,
                results: page.results.filter((item) => item.id != id),
            })),
        }
    }
}

export function addToList<Data>(item: Data, position: "start" | "end" = "start") {
    return (old: Pagination<Data> | undefined) => {
        if (!old) return
        if (position === "start") old.results = [item, ...old.results]
        else old.results = [...old.results, item]
        return old
    }
}

export function updateList<Data extends ModelType>(newItem: Data) {
    return (old: Pagination<Data> | undefined) => {
        if (!old) return { page: 1, totalPages: 1, count: 1, total: 1, results: [newItem] }
        old.results = old.results.map((item) => (item.id === newItem.id ? newItem : item))
        return old
    }
}

export function deleteFromList<Data extends ModelType>(id: number) {
    return (old: Pagination<Data> | undefined) => {
        if (!old) return
        old.results = old.results.filter((item) => item.id != id)
        return old
    }
}

export function updateObject<Data>(data: Data) {
    return (old: Data | undefined) => {
        if (!old) return
        return { ...old, ...data }
    }
}
