import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    children: ReactNode
    className?: string
    defaultPadding?: boolean
}

export default function Container({ children, className, defaultPadding = true }: Props) {
    return <div className={clsx("container mx-auto", defaultPadding && "p-4", className)}>{children}</div>
}
