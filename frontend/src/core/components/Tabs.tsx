import { clsx } from "clsx"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

export type Props = {
    type?: keyof typeof types
    size?: keyof typeof sizes
    children?: ReactNode
    className?: string
}

const types = { bordered: "tabs-bordered", lifted: "tabs-lifted", boxed: "tabs-boxed" }
const sizes = { xs: "tabs-xs", sm: "tabs-sm", lg: "tabs-lg" }

export default function Tabs({ children, className, type, size }: Props) {
    const typeClass = type ? types[type] : undefined
    const sizeClass = size ? sizes[size] : undefined

    return <div className={clsx("tabs", className, typeClass, sizeClass)}>{children}</div>
}

export type ItemProps = {
    active?: boolean
    title: ReactNode
    className?: string
    onClick?: () => void
    to?: string
}

export function TabItem({ active, title, onClick, to }: ItemProps) {
    const classes = clsx("tab", { "tab-active": active })

    return to ? (
        <Link to={to} className={classes}>
            {title}
        </Link>
    ) : (
        <a className={classes} onClick={onClick}>
            {title}
        </a>
    )
}
