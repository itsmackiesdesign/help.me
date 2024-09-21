import { ReactNode } from "react"
import { clsx } from "clsx"

const gridCols = {
    "1": "grid-cols-1",
    "2": "grid-cols-2",
    "3": "grid-cols-3",
    "4": "grid-cols-4",
    "5": "grid-cols-5",
    "6": "grid-cols-6",
    "7": "grid-cols-7",
    "8": "grid-cols-8",
    "9": "grid-cols-9",
    "10": "grid-cols-10",
    "11": "grid-cols-11",
    "12": "grid-cols-12",
}

export type Props = {
    children: ReactNode
    className?: string
    cols: keyof typeof gridCols
}

export default function Grid({ children, className, cols }: Props) {
    return <div className={clsx("grid", gridCols[cols], className)}>{children}</div>
}
