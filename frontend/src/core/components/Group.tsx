import { ReactNode } from "react"
import { clsx } from "clsx"

const gaps = ["gap-0", "gap-2", "gap-3", "gap-4", "gap-5", "gap-6", "gap-7", "gap-8"]
export type Props = {
    children: ReactNode
    gap?: keyof typeof gaps
    className?: string
}

export default function Group({ children, gap = 3, className }: Props) {
    return <div className={clsx("flex", gaps[gap], className)}>{children}</div>
}
