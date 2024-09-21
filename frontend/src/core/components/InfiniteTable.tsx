import Loader from "@core/components/Loader.tsx"
import InfiniteList, { Props as InfiniteListProps } from "@core/components/InfiniteList.tsx"
import { Fragment } from "react"
import { ModelType, Optional } from "@core/types.ts"
import { TableSkeleton } from "@core/components/Skeleton.tsx"
import { clsx } from "clsx"

export type Columns<Item> = {
    [key in keyof Partial<Item>]: string
} & {
    actions?: string
}

export type Props<Item extends ModelType> = Optional<InfiniteListProps<Item>, "renderItem"> & {
    columns: Columns<Item>
    className?: string
    responsive?: boolean
}

export default function InfiniteTable<Item extends ModelType>({
    className,
    responsive,
    columns,
    query,
    renderItem,
}: Props<Item>) {
    const render = renderItem! ? renderItem : (item: Item) => renderItemDefault(item, columns)
    const notMore = (
        <tr>
            <td colSpan={10} className="text-center text-gray-500">
                Loaded all
            </td>
        </tr>
    )
    const loader = <TableSkeleton columns={Object.keys(columns).length} rows={5} />

    return (
        <Fragment>
            {query.isFetching && !query.isLoading && <Loader center />}

            <div className={clsx("overflow-x-auto", { "sm:rounded-lg": responsive })}>
                <table className={clsx("table w-full", className || "table-zebra")}>
                    <thead>
                        <tr>
                            {Object.entries(columns).map(([key, value]) => (
                                <th key={key} className="px-4 py-2">
                                    {value}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <InfiniteList
                            disableObserver
                            query={query}
                            renderItem={render}
                            loader={loader}
                            notMore={notMore}
                        />
                    </tbody>
                </table>
            </div>

            {query.observer}
        </Fragment>
    )
}

function renderItemDefault<Item extends ModelType>(item: Item, columns: Columns<Item>) {
    return (
        <tr key={item.id}>
            {Object.keys(columns).map((key) => (
                <td key={key} className="px-4 py-2">
                    {item[key as keyof Item] as unknown as string}
                </td>
            ))}
        </tr>
    )
}
