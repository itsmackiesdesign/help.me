import { clsx } from "clsx"
import { range } from "lodash"
import { randomlyPick } from "@core/utils/helpers.ts"

export type Props = {
    className?: string
    rounded?: keyof typeof radius
}

const radius = {
    "": "rounded",
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
}

export default function Skeleton({ className, rounded = "" }: Props) {
    const classes = clsx("skeleton", className ?? "h-3 w-60", radius[rounded])

    return <div className={classes}></div>
}

const textWidths = ["w-32", "w-24", "w-full", "w-80", "w-52"]
const maxWidths = ["max-w-[480px]", "max-w-[400px]", "max-w-[300px]", "max-w-[440px]", "max-w-[360px]"]
const opacity = ["opacity-50", "opacity-70", "opacity-100"]

type TextSkeletonProps = {
    rows?: number
    words?: number
    wrapperClassName?: string
    className?: string
}

export function TextSkeleton({ rows = 6, words = 3, wrapperClassName, className }: TextSkeletonProps) {
    return (
        <div role="status" className="space-y-2.5 max-w-lg">
            {range(1, rows).map((i) => (
                <div
                    key={i}
                    className={clsx("flex items-center w-full space-x-2", randomlyPick(maxWidths), wrapperClassName)}
                >
                    {range(1, words).map((j) => (
                        <Skeleton
                            key={j}
                            rounded="full"
                            className={clsx(
                                "h-2.5",
                                randomlyPick(opacity),
                                randomlyPick(textWidths),
                                randomlyPick(opacity),
                                className
                            )}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export type TableSkeletonProps = {
    rows: number
    columns: number
}

const cellWidths = ["w-16", "w-18", "w-20", "w-24", "w-28"]

export function TableSkeleton({ columns, rows }: TableSkeletonProps) {
    return range(0, rows).map((r) => (
        <tr key={r}>
            {range(0, columns).map((c) => (
                <td key={c} className={c == 1 || c == columns ? "md:w-1" : undefined}>
                    <Skeleton
                        className={clsx(
                            "h-4 my-2",
                            randomlyPick(opacity),
                            c == 1 || c == columns ? "w-7" : randomlyPick(cellWidths)
                        )}
                        rounded="md"
                    />
                </td>
            ))}
        </tr>
    ))
}
