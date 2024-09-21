import Heading from "@core/components/Heading.tsx"
import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    children: ReactNode
    text?: string
    className?: string
}

export default function Label({ children, text, className }: Props) {
    return (
        <label className={clsx(className)}>
            <Heading size="sm">{text}</Heading>
            {children}
        </label>
    )
}
