import { clsx } from "clsx"
import { ReactNode } from "react"

export type Props = {
    size?: keyof typeof sizes
    hint?: string | ReactNode
    children?: ReactNode
    className?: string
}

const sizes = { xs: "text-xs", sm: "text-sm", lg: "text-lg", xl: "text-xl", xl2: "text-2xl" }

export default function Heading({ children, size = "lg", hint, className }: Props) {
    return (
        <>
            <div className={clsx(sizes[size], className)}>{children}</div>
            {hint && <div className="text-dim text-sm mt-1">{hint}</div>}
        </>
    )
}
