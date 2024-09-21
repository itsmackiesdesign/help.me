import Loader from "@core/components/Loader.tsx"
import Icon from "@core/components/Icon.tsx"
import { clsx } from "clsx"
import { FC, MouseEventHandler, ReactNode } from "react"
import { Link } from "react-router-dom"

export type Props = {
    loading?: boolean
    disabled?: boolean
    outline?: boolean
    active?: boolean
    circle?: boolean
    block?: boolean
    submit?: boolean
    wide?: boolean
    color?: keyof typeof colors
    size?: keyof typeof sizes
    className?: string
    to?: string
    icon?: FC<{ className?: string }>
    iconEnd?: FC<{ className?: string }>
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined
} & (
    | {
          text?: never
          children?: ReactNode
      }
    | {
          text?: ReactNode
          children?: never
      }
)

const colors = {
    "": "",
    neutral: "btn-neutral",
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
    link: "btn-link",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
}

const sizes = { lg: "btn-lg", sm: "btn-sm", xs: "btn-xs" }

export default function Button({
    to,
    text,
    children,
    size,
    color,
    icon,
    iconEnd,
    outline,
    active,
    onClick,
    className = "",
    wide = false,
    block = false,
    circle = false,
    submit = false,
    loading = false,
    disabled = false,
}: Props) {
    const colorClass = color ? colors[color] : ""
    const sizeClass = size ? sizes[size] : ""

    const classes = clsx(
        ["btn", sizeClass, colorClass],
        {
            "btn-active": active,
            "btn-outline": outline,
            "btn-circle": circle,
            "btn-block": block,
            "btn-wide": wide,
        },
        className
    )

    const attrs = { disabled: disabled || loading, onClick }
    const content = (
        <>
            {loading && <Loader />}
            {!loading && <Icon icon={icon} />}
            {children ?? text}
            {!loading && <Icon icon={iconEnd} />}
        </>
    )

    if (to) {
        return (
            <Link className={classes} to={to} {...attrs}>
                {content}
            </Link>
        )
    }

    return (
        <button className={classes} type={submit ? "submit" : "button"} {...attrs}>
            {content}
        </button>
    )
}
