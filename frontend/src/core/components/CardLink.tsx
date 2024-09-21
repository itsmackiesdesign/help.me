import { ReactNode } from "react"
import { clsx } from "clsx"
import { Link } from "react-router-dom"

export type Props = {
    to: string
    title?: string
    children?: ReactNode
    actions?: ReactNode
    className?: string
    header?: ReactNode
}

export default function CardLink({ to, title, children, className, actions, header }: Props) {
    return (
        <Link to={to} className={clsx("card card-bordered bg-base-100 shadow-md overflow-hidden", className)}>
            {header}
            <div className="card-body p-3">
                {actions && <div className="card-actions justify-end">{actions}</div>}

                {title && <h2 className="card-title">{title}</h2>}
                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </Link>
    )
}
