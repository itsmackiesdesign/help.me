import { ReactNode } from "react"
import { clsx } from "clsx"

export type Props = {
    className?: string
    content?: ReactNode
    color?: keyof typeof colors
    size?: keyof typeof sizes
}

const sizes = { lg: "badge-lg", md: "", sm: "badge-sm", xs: "badge-xs" }
const colors = {
    neutral: "badge-neutral",
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    ghost: "badge-ghost",
    link: "badge-link",
    info: "badge-info",

    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
}

export default function Badge({ className, size, color, content }: Props) {
    return <span className={clsx("badge", className, sizes[size ?? "md"], colors[color ?? "neutral"])}>{content}</span>
}
