import Loader from "@core/components/Loader.tsx"
import { Fragment, JSX, ReactNode } from "react"
import { ModelType } from "@core/types.ts"
import { useInfiniteFetch } from "@core/hooks/request.ts"

export type Props<Item extends ModelType> = {
    query: ReturnType<typeof useInfiniteFetch<Item>>
    renderItem: (item: Item, index: number) => JSX.Element
    notMore?: ReactNode
    loader?: ReactNode
    disableObserver?: boolean
}

export default function InfiniteList<Item extends ModelType>({
    query,
    loader,
    notMore,
    renderItem,
    disableObserver = false,
}: Props<Item>) {
    const nothingToFetch = !query.isFetchingNextPage && !query.hasNextPage && !query.isLoading
    const loading = query.isFetchingNextPage || query.isLoading

    return (
        <Fragment>
            {query.data?.pages.map((page) =>
                page.results.map((item, index) => <Fragment key={item.id}>{renderItem(item, index)}</Fragment>)
            )}

            {!disableObserver && query.isError && query.observer}

            {loading && !loader && (
                <div className="flex justify-center py-4">
                    <Loader />
                </div>
            )}
            {loading && loader}

            {nothingToFetch && !notMore && <div className="text-center text-gray-500 py-4">Loaded All</div>}
            {nothingToFetch && notMore}
        </Fragment>
    )
}
