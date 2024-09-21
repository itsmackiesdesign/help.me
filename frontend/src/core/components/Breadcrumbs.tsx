import { ReactNode } from "react"
import Icon from "./Icon"
import { IconType } from "@core/types"
import { clsx } from "clsx"
import { Link } from "react-router-dom"

export type Props = {
    className?: string
    children: ReactNode
}

export default function Breadcrumbs({ className, children }: Props) {
    return (
        <div className={clsx("text-sm breadcrumbs h-8", className)}>
            <ul>{children}</ul>
        </div>
    )
}

export type BreadcrumbsItemProps = {
    to?: string
    icon?: IconType
    text?: ReactNode
}

export function BreadcrumbsItem({ text = "", to, icon }: BreadcrumbsItemProps) {
    text = (
        <>
            <Icon icon={icon} />
            {text}
        </>
    )
    text = to ? <Link to={to}>{text}</Link> : text

    return <li>{text}</li>
}
