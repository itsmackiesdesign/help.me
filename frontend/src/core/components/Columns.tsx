import { ReactNode } from "react"
import { clsx } from "clsx"
import { mdGaps } from "@core/utils/classnames"

export type Props = {
    children: ReactNode
    gap?: keyof typeof mdGaps
    className?: string
}

export function Columns({ children, gap = "1", className }: Props) {
    const classes = clsx("flex flex-wrap md:flex-nowrap", className, mdGaps[gap])
    return <div className={classes}>{children}</div>
}

const basis = {
    "1": "md:basis-1/12",
    "2": "md:basis-2/12",
    "3": "md:basis-3/12",
    "4": "md:basis-4/12",
    "5": "md:basis-5/12",
    "6": "md:basis-6/12",
    "7": "md:basis-7/12",
    "8": "md:basis-8/12",
    "9": "md:basis-9/12",
    "10": "md:basis-10/12",
    "11": "md:basis-11/12",
    "12": "md:basis-12/12",
}

const offsets = {
    "1": "md:ml-[8.333333333%]",
    "2": "md:ml-[16.6666666666%]",
    "3": "md:ml-[25%]",
    "4": "md:ml-[33.3333333333%]",
    "5": "md:ml-[41.6666666666%]",
    "6": "md:ml-[50%]",
    "7": "md:ml-[58.333333333%]",
    "8": "md:ml-[66.6666666666%]",
    "9": "md:ml-[75%]",
    "10": "md:ml-[83.3333333333%]",
    "11": "md:ml-[91.6666666666%]",
}

export type ColProps = {
    children: ReactNode
    span?: keyof typeof basis
    offset?: keyof typeof offsets
    narrow?: boolean
    className?: string
}

export function Col({ children, span, offset, narrow = false, className }: ColProps) {
    const classes = clsx(
        "basis-full",
        span ? basis[span] : null,
        offset ? offsets[offset] : null,
        { "md:basis-0": narrow },
        className
    )

    return <div className={classes}>{children}</div>
}
