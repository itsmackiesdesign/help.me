import Icon from "./Icon"
import Badge, { Props as BadgeProp } from "./Badge"
import { clsx } from "clsx"
import { MouseEvent, ReactNode } from "react"
import { Link } from "react-router-dom"
import { IconType } from "@core/types.ts"

export type Props = {
    className?: string
    children: ReactNode
    horizontal?: boolean
}

export default function Menu({ className, children, horizontal }: Props) {
    return (
        <ul tabIndex={0} className={clsx("menu", className, { "menu-horizontal": horizontal })}>
            {children}
        </ul>
    )
}

export type MenuItemProps = {
    className?: string
    text: ReactNode
    icon?: IconType
    badge?: string | number
    badgeColor?: BadgeProp["color"]
    active?: boolean
    to?: string
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
    blurOnClick?: boolean
}

export function MenuItem({
    className,
    active,
    badge,
    badgeColor = "ghost",
    text,
    icon,
    to,
    onClick,
    blurOnClick = true,
}: MenuItemProps) {
    const classes = clsx(className, { active })
    const content = (
        <>
            <Icon icon={icon} />
            {text}
            {badge !== undefined ? <Badge content={badge} color={badgeColor} /> : ""}
        </>
    )

    // Close on click
    function handleClick(element: MouseEvent<HTMLAnchorElement>) {
        if (!onClick) return

        onClick(element)

        if (blurOnClick) {
            const active = document.activeElement as HTMLAnchorElement
            active?.blur()
        }
    }

    return (
        <li>
            {to ? (
                <Link to={to} className={classes}>
                    {content}
                </Link>
            ) : (
                <span className={classes} onClick={handleClick}>
                    {content}
                </span>
            )}
        </li>
    )
}

export type MenuParentProps = {
    text: string
    children: ReactNode
}

export function MenuParent({ children, text }: MenuParentProps) {
    return (
        <li>
            <details>
                <summary>{text}</summary>
                <ul className="min-w-max">{children}</ul>
            </details>
        </li>
    )
}
