import { clsx } from "clsx"
import { ReactNode } from "react"

export type Props = {
    title?: string
    children?: ReactNode
    actions?: ReactNode
    className?: string
    header?: ReactNode
}

export default function Card({ title, children, className, actions, header }: Props) {
    return (
        <div className={clsx("card card-bordered bg-base-100 shadow-md overflow-hidden", className)}>
            {header}
            <div className="card-body p-3">
                {actions && <div className="card-actions justify-end">{actions}</div>}

                {title && <h2 className="card-title">{title}</h2>}
                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </div>
    )
}
