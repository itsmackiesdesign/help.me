import Button from "./Button"
import { range } from "lodash"

export type Props = {
    page?: number | string
    count: number
    pageSize?: number
    onSelect: (item: number) => void
}

export default function Pagination({ page = 1, count, pageSize = 15, onSelect }: Props) {
    const current = parseInt(page as string, 10)
    const pagesNumber = Math.ceil(count / pageSize)

    if (count <= pageSize || count === undefined) {
        return null
    }

    return (
        <div className="join">
            {current - 1 > 0 ? (
                <Button text="&larr;&nbsp; Предыдущая" onClick={() => onSelect(current - 1)} className="join-item" />
            ) : null}

            {range(1, pagesNumber + 1).map((i) => (
                <Button key={i} text={i} disabled={current === i} onClick={() => onSelect(i)} className="join-item" />
            ))}

            {current < pagesNumber ? (
                <Button text="Следующая &nbsp;&rarr;" onClick={() => onSelect(current + 1)} className="join-item" />
            ) : null}
        </div>
    )
}
