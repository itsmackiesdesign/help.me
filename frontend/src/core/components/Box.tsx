import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    children: ReactNode
    className?: string
}

export default function Box({ children, className }: Props) {
    return <div className={clsx("w-full shadow-md p-4 rounded-2xl", className)}>{children}</div>
}
