import Loader from "@core/components/Loader.tsx"
import InfiniteList, { Props as InfiniteListProps } from "@core/components/InfiniteList.tsx"
import { Fragment } from "react"
import { ModelType, Optional } from "@core/types.ts"
import { clsx } from "clsx"

export type CardProps<Item> = {
    title: (item: Item) => string
    content: (item: Item) => string | JSX.Element
    actions?: (item: Item) => JSX.Element
}

export type Props<Item extends ModelType> = Optional<InfiniteListProps<Item>, "renderItem"> & {
    cardProps: CardProps<Item>
    className?: string
    responsive?: boolean
}

export default function InfiniteCards<Item extends ModelType>({
    className,
    responsive,
    cardProps,
    query,
    renderItem,
}: Props<Item>) {
    const render = renderItem! ? renderItem : (item: Item) => renderCardDefault(item, cardProps)
    const notMore = <div className="text-center text-gray-500 my-4">Barchasi yuklandi</div>

    return (
        <Fragment>
            {query.isFetching && !query.isLoading && <Loader center />}

            <div className={clsx("grid gap-4", { "sm:grid-cols-2 lg:grid-cols-3": responsive }, className)}>
                <InfiniteList disableObserver query={query} renderItem={render} loader={<Loader />} notMore={notMore} />
            </div>

            {query.observer}
        </Fragment>
    )
}

function renderCardDefault<Item extends ModelType>(item: Item, cardProps: CardProps<Item>) {
    return (
        <div key={item.id} className="p-4 border rounded shadow-md">
            <h3 className="font-bold mb-2">{cardProps.title(item)}</h3>
            <div className="text-gray-700 mb-4">{cardProps.content(item)}</div>
            {cardProps.actions && <div className="mt-2">{cardProps.actions(item)}</div>}
        </div>
    )
}
